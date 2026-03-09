using CRM.Enterprise.Application.Marketing;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Marketing;

public sealed class EmailCampaignService : IEmailCampaignService
{
    private const string UnsubscribeFooter = """
        <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#9ca3af;">
          <p>You received this email because you are a member of a campaign.</p>
          <p><a href="{{unsubscribeUrl}}" style="color:#6b7280;">Unsubscribe</a></p>
        </div>
        """;

    private readonly CrmDbContext _dbContext;
    private readonly IEmailComplianceService _complianceService;
    private readonly IEmailSender _emailSender;

    public EmailCampaignService(CrmDbContext dbContext, IEmailComplianceService complianceService, IEmailSender emailSender)
    {
        _dbContext = dbContext;
        _complianceService = complianceService;
        _emailSender = emailSender;
    }

    public async Task<CampaignEmailSearchResultDto> SearchEmailsAsync(CampaignEmailSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.CampaignEmails
            .AsNoTracking()
            .Include(e => e.Campaign)
            .Where(e => !e.IsDeleted);

        if (request.CampaignId is Guid campaignId && campaignId != Guid.Empty)
        {
            query = query.Where(e => e.CampaignId == campaignId);
        }

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (Enum.TryParse<CampaignEmailStatus>(request.Status, true, out var status))
            {
                query = query.Where(e => e.Status == status);
            }
        }

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim().ToLower();
            query = query.Where(e => e.Subject.ToLower().Contains(term));
        }

        var total = await query.CountAsync(cancellationToken);

        var rows = await query
            .OrderByDescending(e => e.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(e => new CampaignEmailListItemDto(
                e.Id,
                e.CampaignId,
                e.Campaign != null ? e.Campaign.Name : string.Empty,
                e.Subject,
                e.Status.ToString(),
                e.FromName,
                e.ScheduledAtUtc,
                e.SentAtUtc,
                e.RecipientCount,
                e.SentCount,
                e.DeliveredCount,
                e.OpenCount,
                e.ClickCount,
                e.BounceCount,
                e.UnsubscribeCount,
                e.CreatedAtUtc,
                e.UpdatedAtUtc))
            .ToListAsync(cancellationToken);

        return new CampaignEmailSearchResultDto(rows, total);
    }

    public async Task<CampaignEmailDetailDto?> GetEmailAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.CampaignEmails
            .AsNoTracking()
            .Include(e => e.Campaign)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted, cancellationToken);

        if (entity is null) return null;

        return new CampaignEmailDetailDto(
            entity.Id, entity.CampaignId,
            entity.Campaign?.Name ?? string.Empty,
            entity.TemplateId, entity.Subject, entity.HtmlBody, entity.TextBody,
            entity.FromName, entity.ReplyTo,
            entity.Status.ToString(),
            entity.ScheduledAtUtc, entity.SentAtUtc,
            entity.RecipientCount, entity.SentCount, entity.DeliveredCount,
            entity.OpenCount, entity.ClickCount, entity.BounceCount, entity.UnsubscribeCount,
            entity.CreatedAtUtc, entity.UpdatedAtUtc);
    }

    public async Task<MarketingOperationResult<CampaignEmailDetailDto>> CreateDraftAsync(CampaignEmailUpsertRequest request, CancellationToken cancellationToken = default)
    {
        var campaign = await _dbContext.Campaigns
            .FirstOrDefaultAsync(c => c.Id == request.CampaignId && !c.IsDeleted, cancellationToken);

        if (campaign is null)
            return MarketingOperationResult<CampaignEmailDetailDto>.NotFoundResult();

        var entity = new CampaignEmail
        {
            CampaignId = request.CampaignId,
            TemplateId = request.TemplateId,
            Subject = request.Subject,
            HtmlBody = request.HtmlBody,
            TextBody = request.TextBody,
            FromName = request.FromName,
            ReplyTo = request.ReplyTo,
            Status = CampaignEmailStatus.Draft
        };

        _dbContext.CampaignEmails.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        entity.Campaign = campaign;
        return MarketingOperationResult<CampaignEmailDetailDto>.Ok(ToDetailDto(entity));
    }

    public async Task<MarketingOperationResult<CampaignEmailDetailDto>> UpdateDraftAsync(Guid id, CampaignEmailUpsertRequest request, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.CampaignEmails
            .Include(e => e.Campaign)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted, cancellationToken);

        if (entity is null)
            return MarketingOperationResult<CampaignEmailDetailDto>.NotFoundResult();

        if (entity.Status != CampaignEmailStatus.Draft)
            return MarketingOperationResult<CampaignEmailDetailDto>.Fail("Only draft emails can be edited.");

        entity.CampaignId = request.CampaignId;
        entity.TemplateId = request.TemplateId;
        entity.Subject = request.Subject;
        entity.HtmlBody = request.HtmlBody;
        entity.TextBody = request.TextBody;
        entity.FromName = request.FromName;
        entity.ReplyTo = request.ReplyTo;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return MarketingOperationResult<CampaignEmailDetailDto>.Ok(ToDetailDto(entity));
    }

    public async Task<MarketingOperationResult<CampaignEmailDetailDto>> SendAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.CampaignEmails
            .Include(e => e.Campaign)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted, cancellationToken);

        if (entity is null)
            return MarketingOperationResult<CampaignEmailDetailDto>.NotFoundResult();

        if (entity.Status is not CampaignEmailStatus.Draft and not CampaignEmailStatus.Scheduled)
            return MarketingOperationResult<CampaignEmailDetailDto>.Fail("Email must be in Draft or Scheduled status to send.");

        // Resolve recipients from campaign members
        var members = await _dbContext.CampaignMembers
            .AsNoTracking()
            .Where(m => m.CampaignId == entity.CampaignId && !m.IsDeleted && m.ResponseStatus != "Unsubscribed")
            .ToListAsync(cancellationToken);

        if (members.Count == 0)
            return MarketingOperationResult<CampaignEmailDetailDto>.Fail("No eligible campaign members to send to.");

        // Resolve email addresses from leads/contacts
        var recipientEmails = new List<(Guid memberId, string email, string name)>();
        var leadIds = members.Where(m => m.EntityType == "Lead").Select(m => m.EntityId).ToList();
        var contactIds = members.Where(m => m.EntityType == "Contact").Select(m => m.EntityId).ToList();

        if (leadIds.Count > 0)
        {
            var leads = await _dbContext.Leads
                .AsNoTracking()
                .Where(l => leadIds.Contains(l.Id) && !l.IsDeleted && !string.IsNullOrEmpty(l.Email))
                .Select(l => new { l.Id, l.Email, Name = (l.FirstName + " " + l.LastName).Trim() })
                .ToListAsync(cancellationToken);

            foreach (var lead in leads)
            {
                var member = members.First(m => m.EntityType == "Lead" && m.EntityId == lead.Id);
                recipientEmails.Add((member.Id, lead.Email, lead.Name));
            }
        }

        if (contactIds.Count > 0)
        {
            var contacts = await _dbContext.Contacts
                .AsNoTracking()
                .Where(c => contactIds.Contains(c.Id) && !c.IsDeleted && !string.IsNullOrEmpty(c.Email))
                .Select(c => new { c.Id, c.Email, Name = (c.FirstName + " " + c.LastName).Trim() })
                .ToListAsync(cancellationToken);

            foreach (var contact in contacts)
            {
                var member = members.First(m => m.EntityType == "Contact" && m.EntityId == contact.Id);
                recipientEmails.Add((member.Id, contact.Email, contact.Name));
            }
        }

        if (recipientEmails.Count == 0)
            return MarketingOperationResult<CampaignEmailDetailDto>.Fail("No members have valid email addresses.");

        // Filter by compliance
        var allEmails = recipientEmails.Select(r => r.email).ToList();
        var eligible = await _complianceService.FilterEligibleRecipientsAsync(allEmails, entity.TenantId, cancellationToken);
        var eligibleSet = new HashSet<string>(eligible, StringComparer.OrdinalIgnoreCase);

        // Create recipient records
        var recipients = new List<CampaignEmailRecipient>();
        foreach (var (memberId, email, name) in recipientEmails)
        {
            var isEligible = eligibleSet.Contains(email);
            recipients.Add(new CampaignEmailRecipient
            {
                CampaignEmailId = entity.Id,
                CampaignMemberId = memberId,
                Email = email,
                Name = name,
                Status = isEligible ? CampaignEmailRecipientStatus.Queued : CampaignEmailRecipientStatus.Skipped,
                SkipReason = isEligible ? null : "Unsubscribed or bounce-suppressed"
            });
        }

        _dbContext.CampaignEmailRecipients.AddRange(recipients);

        entity.Status = CampaignEmailStatus.Sending;
        entity.RecipientCount = recipients.Count;
        entity.SentAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        // Send to eligible recipients
        var queuedRecipients = recipients.Where(r => r.Status == CampaignEmailRecipientStatus.Queued).ToList();
        var sentCount = 0;

        foreach (var recipient in queuedRecipients)
        {
            try
            {
                var htmlWithUnsubscribe = entity.HtmlBody + UnsubscribeFooter
                    .Replace("{{unsubscribeUrl}}", $"/public/unsubscribe?email={Uri.EscapeDataString(recipient.Email)}&tenant={entity.TenantId}");

                await _emailSender.SendAsync(recipient.Email, entity.Subject, htmlWithUnsubscribe, entity.TextBody, cancellationToken);

                recipient.Status = CampaignEmailRecipientStatus.Sent;
                recipient.SentAtUtc = DateTime.UtcNow;
                sentCount++;
            }
            catch
            {
                recipient.Status = CampaignEmailRecipientStatus.Failed;
            }
        }

        entity.SentCount = sentCount;
        entity.Status = CampaignEmailStatus.Sent;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return MarketingOperationResult<CampaignEmailDetailDto>.Ok(ToDetailDto(entity));
    }

    public async Task<MarketingOperationResult<CampaignEmailDetailDto>> ScheduleAsync(Guid id, DateTime scheduledAtUtc, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.CampaignEmails
            .Include(e => e.Campaign)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted, cancellationToken);

        if (entity is null)
            return MarketingOperationResult<CampaignEmailDetailDto>.NotFoundResult();

        if (entity.Status != CampaignEmailStatus.Draft)
            return MarketingOperationResult<CampaignEmailDetailDto>.Fail("Only draft emails can be scheduled.");

        if (scheduledAtUtc <= DateTime.UtcNow)
            return MarketingOperationResult<CampaignEmailDetailDto>.Fail("Scheduled time must be in the future.");

        entity.Status = CampaignEmailStatus.Scheduled;
        entity.ScheduledAtUtc = scheduledAtUtc;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return MarketingOperationResult<CampaignEmailDetailDto>.Ok(ToDetailDto(entity));
    }

    public async Task<MarketingOperationResult<CampaignEmailDetailDto>> CancelAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.CampaignEmails
            .Include(e => e.Campaign)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted, cancellationToken);

        if (entity is null)
            return MarketingOperationResult<CampaignEmailDetailDto>.NotFoundResult();

        if (entity.Status is not CampaignEmailStatus.Draft and not CampaignEmailStatus.Scheduled)
            return MarketingOperationResult<CampaignEmailDetailDto>.Fail("Only Draft or Scheduled emails can be cancelled.");

        entity.Status = CampaignEmailStatus.Cancelled;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return MarketingOperationResult<CampaignEmailDetailDto>.Ok(ToDetailDto(entity));
    }

    public async Task<CampaignEmailRecipientSearchResultDto> GetRecipientsAsync(Guid emailId, string? status = null, int page = 1, int pageSize = 20, CancellationToken cancellationToken = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _dbContext.CampaignEmailRecipients
            .AsNoTracking()
            .Where(r => r.CampaignEmailId == emailId && !r.IsDeleted);

        if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<CampaignEmailRecipientStatus>(status, true, out var recipientStatus))
        {
            query = query.Where(r => r.Status == recipientStatus);
        }

        var total = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(r => r.SentAtUtc ?? r.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new CampaignEmailRecipientDto(
                r.Id, r.Email, r.Name, r.Status.ToString(), r.SkipReason,
                r.SentAtUtc, r.DeliveredAtUtc, r.OpenedAtUtc, r.ClickedAtUtc))
            .ToListAsync(cancellationToken);

        return new CampaignEmailRecipientSearchResultDto(items, total);
    }

    private static CampaignEmailDetailDto ToDetailDto(CampaignEmail entity)
        => new(entity.Id, entity.CampaignId,
            entity.Campaign?.Name ?? string.Empty,
            entity.TemplateId, entity.Subject, entity.HtmlBody, entity.TextBody,
            entity.FromName, entity.ReplyTo,
            entity.Status.ToString(),
            entity.ScheduledAtUtc, entity.SentAtUtc,
            entity.RecipientCount, entity.SentCount, entity.DeliveredCount,
            entity.OpenCount, entity.ClickCount, entity.BounceCount, entity.UnsubscribeCount,
            entity.CreatedAtUtc, entity.UpdatedAtUtc);
}
