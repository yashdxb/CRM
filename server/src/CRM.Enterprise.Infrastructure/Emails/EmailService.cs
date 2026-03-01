using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Emails;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Emails;

public sealed class EmailService : IEmailService
{
    private readonly CrmDbContext _dbContext;
    private readonly IEmailSender _emailSender;

    public EmailService(CrmDbContext dbContext, IEmailSender emailSender)
    {
        _dbContext = dbContext;
        _emailSender = emailSender;
    }

    // ============ EMAIL LOG OPERATIONS ============

    public async Task<EmailSearchResult> SearchAsync(EmailSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.EmailLogs.AsNoTracking()
            .Include(e => e.Sender)
            .Where(e => !e.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(e =>
                e.ToEmail.ToLower().Contains(term) ||
                (e.ToName ?? string.Empty).ToLower().Contains(term) ||
                e.Subject.ToLower().Contains(term));
        }

        if (request.Status.HasValue)
        {
            query = query.Where(e => e.Status == request.Status.Value);
        }

        if (request.RelatedEntityType.HasValue)
        {
            query = query.Where(e => e.RelatedEntityType == request.RelatedEntityType.Value);
        }

        if (request.RelatedEntityId.HasValue)
        {
            query = query.Where(e => e.RelatedEntityId == request.RelatedEntityId.Value);
        }

        if (request.SenderId.HasValue)
        {
            query = query.Where(e => e.SenderId == request.SenderId.Value);
        }

        if (request.FromDate.HasValue)
        {
            query = query.Where(e => e.CreatedAtUtc >= request.FromDate.Value);
        }

        if (request.ToDate.HasValue)
        {
            query = query.Where(e => e.CreatedAtUtc <= request.ToDate.Value);
        }

        var total = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(e => e.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(e => new EmailListItemDto(
                e.Id,
                e.ToEmail,
                e.ToName,
                e.Subject,
                e.Status.ToString(),
                e.CreatedAtUtc,
                e.SentAtUtc,
                e.DeliveredAtUtc,
                e.OpenedAtUtc,
                e.RelatedEntityType.HasValue ? e.RelatedEntityType.Value.ToString() : null,
                e.RelatedEntityId,
                e.SenderId,
                e.Sender != null ? e.Sender.FullName : null
            ))
            .ToListAsync(cancellationToken);

        return new EmailSearchResult(items, total, page, pageSize);
    }

    public async Task<EmailDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var email = await _dbContext.EmailLogs.AsNoTracking()
            .Include(e => e.Sender)
            .Include(e => e.Template)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted, cancellationToken);

        if (email == null) return null;

        return new EmailDto(
            email.Id,
            email.ToEmail,
            email.ToName,
            email.CcEmails,
            email.BccEmails,
            email.Subject,
            email.HtmlBody,
            email.TextBody,
            email.Status.ToString(),
            email.MessageId,
            email.ErrorMessage,
            email.RetryCount,
            email.CreatedAtUtc,
            email.SentAtUtc,
            email.DeliveredAtUtc,
            email.OpenedAtUtc,
            email.ClickedAtUtc,
            email.BouncedAtUtc,
            email.BounceReason,
            email.RelatedEntityType?.ToString(),
            email.RelatedEntityId,
            email.TemplateId,
            email.Template?.Name,
            email.SenderId,
            email.Sender?.FullName
        );
    }

    public async Task<EmailDto> SendAsync(SendEmailRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var subject = request.Subject;
        var htmlBody = request.HtmlBody;
        var textBody = request.TextBody;

        // If template is used, render it
        EmailTemplate? template = null;
        if (request.TemplateId.HasValue)
        {
            template = await _dbContext.EmailTemplates
                .FirstOrDefaultAsync(t => t.Id == request.TemplateId.Value && !t.IsDeleted, cancellationToken);

            if (template != null)
            {
                subject = RenderTemplate(template.Subject, request.TemplateVariables);
                htmlBody = RenderTemplate(template.HtmlBody, request.TemplateVariables);
                textBody = template.TextBody != null 
                    ? RenderTemplate(template.TextBody, request.TemplateVariables) 
                    : null;

                // Update template usage stats
                template.UsageCount++;
                template.LastUsedAtUtc = DateTime.UtcNow;
            }
        }

        var emailLog = new EmailLog
        {
            ToEmail = request.ToEmail,
            ToName = request.ToName,
            CcEmails = request.CcEmails,
            BccEmails = request.BccEmails,
            Subject = subject,
            HtmlBody = htmlBody,
            TextBody = textBody,
            Status = EmailStatus.Pending,
            RelatedEntityType = request.RelatedEntityType,
            RelatedEntityId = request.RelatedEntityId,
            TemplateId = request.TemplateId,
            SenderId = actor.UserId ?? Guid.Empty
        };

        _dbContext.EmailLogs.Add(emailLog);
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Inject tracking if enabled and base URL is provided
        var trackedHtmlBody = htmlBody;
        if (request.EnableTracking && !string.IsNullOrWhiteSpace(request.TrackingBaseUrl))
        {
            trackedHtmlBody = InjectTracking(htmlBody, emailLog.Id, request.TrackingBaseUrl);
            emailLog.HtmlBody = trackedHtmlBody; // Store the tracked version
        }

        if (request.SendImmediately)
        {
            try
            {
                emailLog.Status = EmailStatus.Queued;
                await _dbContext.SaveChangesAsync(cancellationToken);

                await _emailSender.SendAsync(
                    request.ToEmail, 
                    subject, 
                    trackedHtmlBody, 
                    textBody, 
                    cancellationToken);

                emailLog.Status = EmailStatus.Sent;
                emailLog.SentAtUtc = DateTime.UtcNow;
            }
            catch (Exception ex)
            {
                emailLog.Status = EmailStatus.Failed;
                emailLog.ErrorMessage = ex.Message;
                emailLog.RetryCount++;
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        // Reload with sender info
        var sender = await _dbContext.Users
            .Where(u => u.Id == emailLog.SenderId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken);

        return new EmailDto(
            emailLog.Id,
            emailLog.ToEmail,
            emailLog.ToName,
            emailLog.CcEmails,
            emailLog.BccEmails,
            emailLog.Subject,
            emailLog.HtmlBody,
            emailLog.TextBody,
            emailLog.Status.ToString(),
            emailLog.MessageId,
            emailLog.ErrorMessage,
            emailLog.RetryCount,
            emailLog.CreatedAtUtc,
            emailLog.SentAtUtc,
            emailLog.DeliveredAtUtc,
            emailLog.OpenedAtUtc,
            emailLog.ClickedAtUtc,
            emailLog.BouncedAtUtc,
            emailLog.BounceReason,
            emailLog.RelatedEntityType?.ToString(),
            emailLog.RelatedEntityId,
            emailLog.TemplateId,
            template?.Name,
            emailLog.SenderId,
            sender
        );
    }

    public async Task<bool> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var email = await _dbContext.EmailLogs.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
        if (email == null) return false;

        email.IsDeleted = true;
        email.DeletedAtUtc = DateTime.UtcNow;
        email.DeletedBy = actor.UserName;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<EmailStatsDto> GetStatsAsync(CancellationToken cancellationToken = default)
    {
        var stats = await _dbContext.EmailLogs.AsNoTracking()
            .Where(e => !e.IsDeleted)
            .GroupBy(e => 1)
            .Select(g => new
            {
                TotalSent = g.Count(e => e.Status >= EmailStatus.Sent),
                TotalDelivered = g.Count(e => e.Status >= EmailStatus.Delivered),
                TotalOpened = g.Count(e => e.Status >= EmailStatus.Opened),
                TotalClicked = g.Count(e => e.Status >= EmailStatus.Clicked),
                TotalBounced = g.Count(e => e.Status == EmailStatus.Bounced),
                TotalFailed = g.Count(e => e.Status == EmailStatus.Failed),
                PendingCount = g.Count(e => e.Status == EmailStatus.Pending || e.Status == EmailStatus.Queued)
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (stats == null)
        {
            return new EmailStatsDto(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }

        var openRate = stats.TotalDelivered > 0 
            ? Math.Round((double)stats.TotalOpened / stats.TotalDelivered * 100, 2) 
            : 0;
        var clickRate = stats.TotalOpened > 0 
            ? Math.Round((double)stats.TotalClicked / stats.TotalOpened * 100, 2) 
            : 0;
        var bounceRate = stats.TotalSent > 0 
            ? Math.Round((double)stats.TotalBounced / stats.TotalSent * 100, 2) 
            : 0;

        return new EmailStatsDto(
            stats.TotalSent,
            stats.TotalDelivered,
            stats.TotalOpened,
            stats.TotalClicked,
            stats.TotalBounced,
            stats.TotalFailed,
            stats.PendingCount,
            openRate,
            clickRate,
            bounceRate
        );
    }

    // ============ TEMPLATE OPERATIONS ============

    public async Task<TemplateSearchResult> SearchTemplatesAsync(TemplateSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.EmailTemplates.AsNoTracking()
            .Where(t => !t.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(t =>
                t.Name.ToLower().Contains(term) ||
                t.Subject.ToLower().Contains(term) ||
                (t.Description ?? string.Empty).ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(request.Category))
        {
            query = query.Where(t => t.Category == request.Category);
        }

        if (request.IsActive.HasValue)
        {
            query = query.Where(t => t.IsActive == request.IsActive.Value);
        }

        var total = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderBy(t => t.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new EmailTemplateListItemDto(
                t.Id,
                t.Name,
                t.Category,
                t.Subject,
                t.IsActive,
                t.IsSystem,
                t.UsageCount,
                t.LastUsedAtUtc,
                t.CreatedAtUtc
            ))
            .ToListAsync(cancellationToken);

        return new TemplateSearchResult(items, total, page, pageSize);
    }

    public async Task<EmailTemplateDto?> GetTemplateAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var template = await _dbContext.EmailTemplates.AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted, cancellationToken);

        if (template == null) return null;

        return new EmailTemplateDto(
            template.Id,
            template.Name,
            template.Description,
            template.Subject,
            template.HtmlBody,
            template.TextBody,
            template.Category,
            template.IsActive,
            template.IsSystem,
            template.Variables,
            template.UsageCount,
            template.LastUsedAtUtc,
            template.CreatedAtUtc,
            template.UpdatedAtUtc
        );
    }

    public async Task<EmailTemplateDto> CreateTemplateAsync(UpsertTemplateRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var template = new EmailTemplate
        {
            Name = request.Name,
            Description = request.Description,
            Subject = request.Subject,
            HtmlBody = request.HtmlBody,
            TextBody = request.TextBody,
            Category = request.Category,
            IsActive = request.IsActive,
            Variables = request.Variables
        };

        _dbContext.EmailTemplates.Add(template);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new EmailTemplateDto(
            template.Id,
            template.Name,
            template.Description,
            template.Subject,
            template.HtmlBody,
            template.TextBody,
            template.Category,
            template.IsActive,
            template.IsSystem,
            template.Variables,
            template.UsageCount,
            template.LastUsedAtUtc,
            template.CreatedAtUtc,
            template.UpdatedAtUtc
        );
    }

    public async Task<EmailTemplateDto?> UpdateTemplateAsync(Guid id, UpsertTemplateRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var template = await _dbContext.EmailTemplates
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted, cancellationToken);

        if (template == null) return null;

        // Don't allow editing system templates
        if (template.IsSystem) return null;

        template.Name = request.Name;
        template.Description = request.Description;
        template.Subject = request.Subject;
        template.HtmlBody = request.HtmlBody;
        template.TextBody = request.TextBody;
        template.Category = request.Category;
        template.IsActive = request.IsActive;
        template.Variables = request.Variables;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new EmailTemplateDto(
            template.Id,
            template.Name,
            template.Description,
            template.Subject,
            template.HtmlBody,
            template.TextBody,
            template.Category,
            template.IsActive,
            template.IsSystem,
            template.Variables,
            template.UsageCount,
            template.LastUsedAtUtc,
            template.CreatedAtUtc,
            template.UpdatedAtUtc
        );
    }

    public async Task<bool> DeleteTemplateAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var template = await _dbContext.EmailTemplates
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);

        if (template == null || template.IsSystem) return false;

        template.IsDeleted = true;
        template.DeletedAtUtc = DateTime.UtcNow;
        template.DeletedBy = actor.UserName;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    // ============ WEBHOOK OPERATION ============

    public async Task UpdateDeliveryStatusAsync(string messageId, string status, string? details = null, CancellationToken cancellationToken = default)
    {
        var email = await _dbContext.EmailLogs
            .FirstOrDefaultAsync(e => e.MessageId == messageId, cancellationToken);

        if (email == null) return;

        var normalizedStatus = status.ToLowerInvariant();

        switch (normalizedStatus)
        {
            case "delivered":
                email.Status = EmailStatus.Delivered;
                email.DeliveredAtUtc = DateTime.UtcNow;
                break;
            case "opened":
                email.Status = EmailStatus.Opened;
                email.OpenedAtUtc = DateTime.UtcNow;
                break;
            case "clicked":
                email.Status = EmailStatus.Clicked;
                email.ClickedAtUtc = DateTime.UtcNow;
                break;
            case "bounced":
            case "bounce":
                email.Status = EmailStatus.Bounced;
                email.BouncedAtUtc = DateTime.UtcNow;
                email.BounceReason = details;
                break;
            case "failed":
            case "dropped":
                email.Status = EmailStatus.Failed;
                email.ErrorMessage = details;
                break;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    // ============ TRACKING OPERATIONS ============

    public async Task<bool> TrackOpenAsync(Guid emailId, CancellationToken cancellationToken = default)
    {
        var email = await _dbContext.EmailLogs
            .FirstOrDefaultAsync(e => e.Id == emailId && !e.IsDeleted, cancellationToken);

        if (email == null) return false;

        // Only track first open (don't overwrite status if already clicked)
        if (email.OpenedAtUtc == null)
        {
            email.OpenedAtUtc = DateTime.UtcNow;
            if (email.Status < EmailStatus.Opened)
            {
                email.Status = EmailStatus.Opened;
            }
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return true;
    }

    public async Task<string?> TrackClickAsync(Guid emailId, string linkId, CancellationToken cancellationToken = default)
    {
        // Decode the original URL from base64 linkId
        string originalUrl;
        try
        {
            var decodedBytes = Convert.FromBase64String(linkId);
            originalUrl = System.Text.Encoding.UTF8.GetString(decodedBytes);
        }
        catch
        {
            return null;
        }

        var email = await _dbContext.EmailLogs
            .FirstOrDefaultAsync(e => e.Id == emailId && !e.IsDeleted, cancellationToken);

        if (email == null) return originalUrl; // Still redirect even if email not found

        // Only track first click (don't overwrite timestamp)
        if (email.ClickedAtUtc == null)
        {
            email.ClickedAtUtc = DateTime.UtcNow;
            if (email.Status < EmailStatus.Clicked)
            {
                email.Status = EmailStatus.Clicked;
            }
            // Ensure opened is also set
            if (email.OpenedAtUtc == null)
            {
                email.OpenedAtUtc = DateTime.UtcNow;
            }
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return originalUrl;
    }

    // ============ HELPERS ============

    private static string RenderTemplate(string template, Dictionary<string, string>? variables)
    {
        if (variables == null || variables.Count == 0) return template;

        var result = template;
        foreach (var (key, value) in variables)
        {
            result = result.Replace($"{{{{{key}}}}}", value);
        }
        return result;
    }

    private static string InjectTracking(string htmlBody, Guid emailId, string trackingBaseUrl)
    {
        var baseUrl = trackingBaseUrl.TrimEnd('/');
        var result = htmlBody;

        // 1. Wrap all links with click tracking
        // Match href="..." or href='...' patterns (excluding tracking URLs and anchors)
        var linkPattern = new System.Text.RegularExpressions.Regex(
            @"href\s*=\s*[""'](?<url>https?://[^""']+)[""']",
            System.Text.RegularExpressions.RegexOptions.IgnoreCase);

        result = linkPattern.Replace(result, match =>
        {
            var originalUrl = match.Groups["url"].Value;
            // Don't wrap our own tracking URLs
            if (originalUrl.Contains("/api/emails/track/")) return match.Value;
            
            var encodedUrl = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(originalUrl));
            var trackingUrl = $"{baseUrl}/api/emails/track/click/{emailId}?url={Uri.EscapeDataString(encodedUrl)}";
            return $"href=\"{trackingUrl}\"";
        });

        // 2. Inject open tracking pixel before closing </body> or at end
        var trackingPixel = $"<img src=\"{baseUrl}/api/emails/track/open/{emailId}\" width=\"1\" height=\"1\" style=\"display:none;border:0;\" alt=\"\" />";
        
        if (result.Contains("</body>", StringComparison.OrdinalIgnoreCase))
        {
            result = System.Text.RegularExpressions.Regex.Replace(
                result,
                @"</body>",
                $"{trackingPixel}</body>",
                System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        }
        else
        {
            // No body tag, append at end
            result += trackingPixel;
        }

        return result;
    }
}
