using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Emails;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Emails;
using CRM.Enterprise.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.EmailsView)]
[ApiController]
[Route("api/emails")]
public class EmailsController : ControllerBase
{
    private readonly IEmailService _emailService;

    public EmailsController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    // ============ EMAIL LOG ENDPOINTS ============

    [HttpGet]
    public async Task<ActionResult<EmailSearchResponse>> Search(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? relatedEntityType,
        [FromQuery] Guid? relatedEntityId,
        [FromQuery] Guid? senderId,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 25,
        CancellationToken cancellationToken = default)
    {
        EmailStatus? statusEnum = null;
        if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<EmailStatus>(status, true, out var parsedStatus))
        {
            statusEnum = parsedStatus;
        }

        EmailRelationType? relatedTypeEnum = null;
        if (!string.IsNullOrWhiteSpace(relatedEntityType) && Enum.TryParse<EmailRelationType>(relatedEntityType, true, out var parsedRelatedType))
        {
            relatedTypeEnum = parsedRelatedType;
        }

        var result = await _emailService.SearchAsync(
            new Application.Emails.EmailSearchRequest(
                page, pageSize, search, statusEnum, relatedTypeEnum, relatedEntityId, 
                senderId, fromDate, toDate),
            cancellationToken);

        var items = result.Items.Select(e => new EmailListItem(
            e.Id, e.ToEmail, e.ToName, e.Subject, e.Status,
            e.CreatedAtUtc, e.SentAtUtc, e.DeliveredAtUtc, e.OpenedAtUtc,
            e.RelatedEntityType, e.RelatedEntityId, e.SenderId, e.SenderName
        ));

        return Ok(new EmailSearchResponse(items, result.Total, result.Page, result.PageSize));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<EmailDetailResponse>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var email = await _emailService.GetAsync(id, cancellationToken);
        if (email == null) return NotFound();

        return Ok(new EmailDetailResponse(
            email.Id, email.ToEmail, email.ToName, email.CcEmails, email.BccEmails,
            email.Subject, email.HtmlBody, email.TextBody, email.Status, email.MessageId,
            email.ErrorMessage, email.RetryCount, email.CreatedAtUtc, email.SentAtUtc,
            email.DeliveredAtUtc, email.OpenedAtUtc, email.ClickedAtUtc, email.BouncedAtUtc,
            email.BounceReason, email.RelatedEntityType, email.RelatedEntityId,
            email.TemplateId, email.TemplateName, email.SenderId, email.SenderName
        ));
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.EmailsManage)]
    public async Task<ActionResult<EmailDetailResponse>> Send(
        [FromBody] Contracts.Emails.SendEmailRequest request,
        CancellationToken cancellationToken)
    {
        EmailRelationType? relatedTypeEnum = null;
        if (!string.IsNullOrWhiteSpace(request.RelatedEntityType) && 
            Enum.TryParse<EmailRelationType>(request.RelatedEntityType, true, out var parsedRelatedType))
        {
            relatedTypeEnum = parsedRelatedType;
        }

        var appRequest = new Application.Emails.SendEmailRequest(
            request.ToEmail,
            request.ToName,
            request.CcEmails,
            request.BccEmails,
            request.Subject ?? string.Empty,
            request.HtmlBody ?? string.Empty,
            request.TextBody,
            request.TemplateId,
            request.TemplateVariables,
            relatedTypeEnum,
            request.RelatedEntityId,
            request.SendImmediately
        );

        var email = await _emailService.SendAsync(appRequest, GetActor(), cancellationToken);

        return CreatedAtAction(nameof(GetById), new { id = email.Id }, new EmailDetailResponse(
            email.Id, email.ToEmail, email.ToName, email.CcEmails, email.BccEmails,
            email.Subject, email.HtmlBody, email.TextBody, email.Status, email.MessageId,
            email.ErrorMessage, email.RetryCount, email.CreatedAtUtc, email.SentAtUtc,
            email.DeliveredAtUtc, email.OpenedAtUtc, email.ClickedAtUtc, email.BouncedAtUtc,
            email.BounceReason, email.RelatedEntityType, email.RelatedEntityId,
            email.TemplateId, email.TemplateName, email.SenderId, email.SenderName
        ));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.EmailsManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _emailService.DeleteAsync(id, GetActor(), cancellationToken);
        if (!deleted) return NotFound();
        return NoContent();
    }

    [HttpGet("stats")]
    public async Task<ActionResult<EmailStatsResponse>> GetStats(CancellationToken cancellationToken)
    {
        var stats = await _emailService.GetStatsAsync(cancellationToken);
        return Ok(new EmailStatsResponse(
            stats.TotalSent, stats.TotalDelivered, stats.TotalOpened, stats.TotalClicked,
            stats.TotalBounced, stats.TotalFailed, stats.PendingCount,
            stats.OpenRate, stats.ClickRate, stats.BounceRate
        ));
    }

    // ============ TEMPLATE ENDPOINTS ============

    [HttpGet("templates")]
    public async Task<ActionResult<TemplateSearchResponse>> SearchTemplates(
        [FromQuery] string? search,
        [FromQuery] string? category,
        [FromQuery] bool? isActive,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 25,
        CancellationToken cancellationToken = default)
    {
        var result = await _emailService.SearchTemplatesAsync(
            new TemplateSearchRequest(page, pageSize, search, category, isActive),
            cancellationToken);

        var items = result.Items.Select(t => new Contracts.Emails.EmailTemplateListItem(
            t.Id, t.Name, t.Category, t.Subject, t.IsActive, t.IsSystem,
            t.UsageCount, t.LastUsedAtUtc, t.CreatedAtUtc
        ));

        return Ok(new TemplateSearchResponse(items, result.Total, result.Page, result.PageSize));
    }

    [HttpGet("templates/{id:guid}")]
    public async Task<ActionResult<EmailTemplateDetailResponse>> GetTemplate(Guid id, CancellationToken cancellationToken)
    {
        var template = await _emailService.GetTemplateAsync(id, cancellationToken);
        if (template == null) return NotFound();

        return Ok(new EmailTemplateDetailResponse(
            template.Id, template.Name, template.Description, template.Subject,
            template.HtmlBody, template.TextBody, template.Category, template.IsActive,
            template.IsSystem, template.Variables, template.UsageCount,
            template.LastUsedAtUtc, template.CreatedAtUtc, template.UpdatedAtUtc
        ));
    }

    [HttpPost("templates")]
    [Authorize(Policy = Permissions.Policies.EmailsManage)]
    public async Task<ActionResult<EmailTemplateDetailResponse>> CreateTemplate(
        [FromBody] Contracts.Emails.UpsertTemplateRequest request,
        CancellationToken cancellationToken)
    {
        var appRequest = new Application.Emails.UpsertTemplateRequest(
            request.Name,
            request.Description,
            request.Subject ?? string.Empty,
            request.HtmlBody ?? string.Empty,
            request.TextBody,
            request.Category,
            request.IsActive,
            request.Variables
        );

        var template = await _emailService.CreateTemplateAsync(appRequest, GetActor(), cancellationToken);

        return CreatedAtAction(nameof(GetTemplate), new { id = template.Id }, new EmailTemplateDetailResponse(
            template.Id, template.Name, template.Description, template.Subject,
            template.HtmlBody, template.TextBody, template.Category, template.IsActive,
            template.IsSystem, template.Variables, template.UsageCount,
            template.LastUsedAtUtc, template.CreatedAtUtc, template.UpdatedAtUtc
        ));
    }

    [HttpPut("templates/{id:guid}")]
    [Authorize(Policy = Permissions.Policies.EmailsManage)]
    public async Task<ActionResult<EmailTemplateDetailResponse>> UpdateTemplate(
        Guid id,
        [FromBody] Contracts.Emails.UpsertTemplateRequest request,
        CancellationToken cancellationToken)
    {
        var appRequest = new Application.Emails.UpsertTemplateRequest(
            request.Name,
            request.Description,
            request.Subject ?? string.Empty,
            request.HtmlBody ?? string.Empty,
            request.TextBody,
            request.Category,
            request.IsActive,
            request.Variables
        );

        var template = await _emailService.UpdateTemplateAsync(id, appRequest, GetActor(), cancellationToken);
        if (template == null) return NotFound();

        return Ok(new EmailTemplateDetailResponse(
            template.Id, template.Name, template.Description, template.Subject,
            template.HtmlBody, template.TextBody, template.Category, template.IsActive,
            template.IsSystem, template.Variables, template.UsageCount,
            template.LastUsedAtUtc, template.CreatedAtUtc, template.UpdatedAtUtc
        ));
    }

    [HttpDelete("templates/{id:guid}")]
    [Authorize(Policy = Permissions.Policies.EmailsManage)]
    public async Task<IActionResult> DeleteTemplate(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _emailService.DeleteTemplateAsync(id, GetActor(), cancellationToken);
        if (!deleted) return NotFound();
        return NoContent();
    }

    // ============ WEBHOOK ENDPOINT ============

    [HttpPost("webhook")]
    [AllowAnonymous]
    public async Task<IActionResult> Webhook([FromBody] EmailWebhookPayload payload, CancellationToken cancellationToken)
    {
        await _emailService.UpdateDeliveryStatusAsync(payload.MessageId, payload.Status, payload.Details, cancellationToken);
        return Ok();
    }

    // ============ HELPERS ============

    private ActorContext GetActor()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = User.FindFirst(ClaimTypes.Name)?.Value ?? User.Identity?.Name;
        return new ActorContext(
            Guid.TryParse(userId, out var uid) ? uid : null,
            userName
        );
    }
}
