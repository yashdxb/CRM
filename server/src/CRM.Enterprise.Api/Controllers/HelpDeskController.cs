using System.Security.Claims;
using CRM.Enterprise.Api.Contracts.HelpDesk;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.HelpDesk;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.HelpDeskView)]
[ApiController]
[Route("api/helpdesk")]
public sealed class HelpDeskController : ControllerBase
{
    private readonly ISupportCaseService _cases;
    private readonly ISupportQueueService _queues;
    private readonly ISupportSlaService _sla;
    private readonly ISupportReportService _reports;
    private readonly ISupportEmailIntakeService _emailIntake;
    private readonly IAuditEventService _auditEvents;

    public HelpDeskController(
        ISupportCaseService cases,
        ISupportQueueService queues,
        ISupportSlaService sla,
        ISupportReportService reports,
        ISupportEmailIntakeService emailIntake,
        IAuditEventService auditEvents)
    {
        _cases = cases;
        _queues = queues;
        _sla = sla;
        _reports = reports;
        _emailIntake = emailIntake;
        _auditEvents = auditEvents;
    }

    [HttpGet("cases")]
    public async Task<ActionResult<SupportCaseSearchResponse>> SearchCases(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? priority,
        [FromQuery] string? severity,
        [FromQuery] Guid? queueId,
        [FromQuery] Guid? ownerUserId,
        [FromQuery] string? source,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var result = await _cases.SearchCasesAsync(
            new SupportCaseSearchRequest(search, status, priority, severity, queueId, ownerUserId, source, page, pageSize),
            cancellationToken);

        return Ok(new SupportCaseSearchResponse(result.Items.Select(ToCaseItem).ToList(), result.Total));
    }

    [HttpGet("cases/{id:guid}")]
    public async Task<ActionResult<SupportCaseDetailResponse>> GetCase(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _cases.GetCaseAsync(id, cancellationToken);
        if (result is null)
        {
            return NotFound();
        }

        return Ok(new SupportCaseDetailResponse(
            ToCaseItem(result.Case),
            result.Comments.Select(ToCommentItem).ToList(),
            result.Escalations.Select(ToEscalationItem).ToList()));
    }

    [HttpPost("cases")]
    [Authorize(Policy = Permissions.Policies.HelpDeskManage)]
    public async Task<ActionResult<SupportCaseItem>> CreateCase([FromBody] SupportCaseUpsertRequest request, CancellationToken cancellationToken = default)
    {
        var validationResult = ValidateCaseRequest(request);
        if (validationResult is not null)
        {
            return validationResult;
        }

        var result = await _cases.CreateCaseAsync(
            new SupportCaseCreateRequest(
                request.Subject,
                request.Description,
                request.Priority,
                request.Severity,
                request.Category,
                request.Subcategory,
                request.Source,
                request.AccountId,
                request.ContactId,
                request.QueueId,
                request.OwnerUserId,
                request.ClosureReason,
                request.CsatScore,
                request.CsatFeedback),
            cancellationToken);

        if (!result.Success || result.Value is null)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "SupportCase",
                result.Value.Id,
                "Created",
                null,
                null,
                null,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return CreatedAtAction(nameof(GetCase), new { id = result.Value.Id }, ToCaseItem(result.Value));
    }

    [HttpPut("cases/{id:guid}")]
    [Authorize(Policy = Permissions.Policies.HelpDeskManage)]
    public async Task<IActionResult> UpdateCase(Guid id, [FromBody] SupportCaseUpsertRequest request, CancellationToken cancellationToken = default)
    {
        var validationResult = ValidateCaseRequest(request);
        if (validationResult is not null)
        {
            return validationResult;
        }

        var result = await _cases.UpdateCaseAsync(
            id,
            new SupportCaseUpdateRequest(
                request.Subject,
                request.Description,
                request.Priority,
                request.Severity,
                request.Category,
                request.Subcategory,
                request.AccountId,
                request.ContactId,
                request.QueueId,
                request.OwnerUserId,
                request.ClosureReason,
                request.CsatScore,
                request.CsatFeedback),
            cancellationToken);

        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "SupportCase",
                id,
                "Updated",
                null,
                null,
                null,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("cases/{id:guid}/assign")]
    [Authorize(Policy = Permissions.Policies.HelpDeskManage)]
    public async Task<IActionResult> AssignCase(Guid id, [FromBody] SupportCaseAssignApiRequest request, CancellationToken cancellationToken = default)
    {
        var result = await _cases.AssignCaseAsync(id, new SupportCaseAssignRequest(request.QueueId, request.OwnerUserId), cancellationToken);
        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "SupportCase",
                id,
                "Assigned",
                null,
                null,
                null,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("cases/{id:guid}/status")]
    [Authorize(Policy = Permissions.Policies.HelpDeskManage)]
    public async Task<IActionResult> ChangeStatus(Guid id, [FromBody] SupportCaseStatusApiRequest request, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest(new { message = "Status is required." });
        }

        var result = await _cases.ChangeStatusAsync(id, new SupportCaseStatusRequest(request.Status, request.Note), cancellationToken);
        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "SupportCase",
                id,
                "StatusChanged",
                "Status",
                null,
                request.Status,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("cases/{id:guid}/comments")]
    [Authorize(Policy = Permissions.Policies.HelpDeskManage)]
    public async Task<ActionResult<SupportCaseCommentItem>> AddComment(Guid id, [FromBody] SupportCaseCommentApiRequest request, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.Body))
        {
            return BadRequest(new { message = "Comment body is required." });
        }

        var userId = GetCurrentUserId();
        if (!userId.HasValue || userId.Value == Guid.Empty)
        {
            return Unauthorized(new { message = "User context is required." });
        }

        var result = await _cases.AddCommentAsync(
            id,
            new SupportCaseCommentCreateRequest(
                request.Body,
                request.IsInternal,
                userId.Value,
                GetCurrentUserName() ?? "Unknown user",
                request.AttachmentIds),
            cancellationToken);

        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success || result.Value is null)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "SupportCaseComment",
                result.Value.Id,
                "Created",
                "CaseId",
                null,
                id.ToString(),
                userId,
                GetCurrentUserName()),
            cancellationToken);

        return Ok(ToCommentItem(result.Value));
    }

    [HttpGet("queues")]
    public async Task<ActionResult<IReadOnlyList<SupportQueueItem>>> ListQueues(CancellationToken cancellationToken = default)
    {
        var rows = await _queues.ListQueuesAsync(cancellationToken);
        return Ok(rows.Select(ToQueueItem).ToList());
    }

    [HttpPost("queues")]
    [Authorize(Policy = Permissions.Policies.HelpDeskAdmin)]
    public async Task<ActionResult<SupportQueueItem>> CreateQueue([FromBody] SupportQueueUpsertApiRequest request, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { message = "Queue name is required." });
        }

        var result = await _queues.CreateQueueAsync(
            new SupportQueueUpsertRequest(request.Name, request.Description, request.IsActive, request.MemberUserIds),
            cancellationToken);
        if (!result.Success || result.Value is null)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "SupportQueue",
                result.Value.Id,
                "Created",
                null,
                null,
                null,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return Ok(ToQueueItem(result.Value));
    }

    [HttpPut("queues/{id:guid}")]
    [Authorize(Policy = Permissions.Policies.HelpDeskAdmin)]
    public async Task<IActionResult> UpdateQueue(Guid id, [FromBody] SupportQueueUpsertApiRequest request, CancellationToken cancellationToken = default)
    {
        var result = await _queues.UpdateQueueAsync(
            id,
            new SupportQueueUpsertRequest(request.Name, request.Description, request.IsActive, request.MemberUserIds),
            cancellationToken);
        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "SupportQueue",
                id,
                "Updated",
                null,
                null,
                null,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return NoContent();
    }

    [HttpGet("sla-policies")]
    public async Task<ActionResult<IReadOnlyList<SupportSlaPolicyItem>>> ListSlaPolicies(CancellationToken cancellationToken = default)
    {
        var rows = await _sla.ListPoliciesAsync(cancellationToken);
        return Ok(rows.Select(ToSlaItem).ToList());
    }

    [HttpPut("sla-policies/{id:guid}")]
    [Authorize(Policy = Permissions.Policies.HelpDeskAdmin)]
    public async Task<IActionResult> UpdateSlaPolicy(Guid id, [FromBody] SupportSlaPolicyUpdateApiRequest request, CancellationToken cancellationToken = default)
    {
        var result = await _sla.UpdatePolicyAsync(
            id,
            new SupportSlaPolicyUpdateRequest(
                request.Name,
                request.Priority,
                request.Severity,
                request.FirstResponseTargetMinutes,
                request.ResolutionTargetMinutes,
                request.EscalationMinutes,
                request.BusinessHoursJson,
                request.IsActive),
            cancellationToken);

        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "SupportSlaPolicy",
                id,
                "Updated",
                null,
                null,
                null,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return NoContent();
    }

    [HttpGet("reports/summary")]
    public async Task<ActionResult<HelpDeskSummaryResponse>> GetSummary(CancellationToken cancellationToken = default)
    {
        var summary = await _reports.GetSummaryAsync(cancellationToken);
        return Ok(new HelpDeskSummaryResponse(
            summary.OpenCount,
            summary.AtRiskCount,
            summary.BreachedCount,
            summary.ResolvedTodayCount,
            summary.AverageCsatScore,
            summary.RatedCaseCount,
            summary.TopClosureReasons.Select(r => new HelpDeskClosureReasonCountItem(r.Reason, r.Count)).ToList()));
    }

    [HttpPost("email/intake/webhook")]
    [AllowAnonymous]
    public async Task<IActionResult> ProcessEmailWebhook([FromBody] HelpDeskEmailWebhookRequest request, CancellationToken cancellationToken = default)
    {
        var result = await _emailIntake.ProcessInboundAsync(
            new HelpDeskEmailIntakeRequest(
                request.MessageId,
                request.ThreadKey,
                request.Subject,
                request.Body,
                request.FromEmail,
                request.ReceivedAtUtc),
            cancellationToken);

        if (!result.Success)
        {
            return SafeBadRequest(result.Error);
        }

        return Accepted();
    }

    private ActionResult? ValidateCaseRequest(SupportCaseUpsertRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Subject))
        {
            return BadRequest(new { message = "Subject is required." });
        }

        if (request.Subject.Length > 240)
        {
            return BadRequest(new { message = "Subject must be 240 characters or fewer." });
        }

        if (request.CsatScore.HasValue && (request.CsatScore.Value < 1 || request.CsatScore.Value > 5))
        {
            return BadRequest(new { message = "CSAT score must be between 1 and 5." });
        }

        return null;
    }

    private ActionResult SafeBadRequest(string? error)
        => BadRequest(new { message = string.IsNullOrWhiteSpace(error) ? "Request could not be completed." : error });

    private Guid? GetCurrentUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        return Guid.TryParse(claim, out var parsed) ? parsed : null;
    }

    private string? GetCurrentUserName()
        => User.FindFirstValue("name")
           ?? User.FindFirstValue(ClaimTypes.Name)
           ?? User.FindFirstValue(ClaimTypes.Email);

    private static SupportCaseItem ToCaseItem(SupportCaseListItemDto dto)
        => new(
            dto.Id,
            dto.CaseNumber,
            dto.Subject,
            dto.Description,
            dto.Status,
            dto.Priority,
            dto.Severity,
            dto.Category,
            dto.Subcategory,
            dto.Source,
            dto.AccountId,
            dto.AccountName,
            dto.ContactId,
            dto.ContactName,
            dto.QueueId,
            dto.QueueName,
            dto.OwnerUserId,
            dto.OwnerUserName,
            dto.FirstResponseDueUtc,
            dto.ResolutionDueUtc,
            dto.FirstRespondedUtc,
            dto.ResolvedUtc,
            dto.ClosedUtc,
            dto.ClosureReason,
            dto.CsatScore,
            dto.CsatFeedback,
            dto.CreatedAtUtc,
            dto.UpdatedAtUtc);

    private static SupportCaseCommentItem ToCommentItem(SupportCaseCommentDto dto)
        => new(
            dto.Id,
            dto.CaseId,
            dto.AuthorUserId,
            dto.AuthorUserName,
            dto.Body,
            dto.IsInternal,
            dto.CreatedAtUtc,
            dto.Attachments
                .Select(a => new SupportCaseCommentAttachmentItem(
                    a.AttachmentId,
                    a.FileName,
                    a.ContentType,
                    a.Size,
                    $"/api/attachments/{a.AttachmentId}/download"))
                .ToList());

    private static SupportCaseEscalationItem ToEscalationItem(SupportCaseEscalationEventDto dto)
        => new(dto.Id, dto.CaseId, dto.Type, dto.OccurredUtc, dto.ActorUserId, dto.ActorUserName, dto.Notes);

    private static SupportQueueItem ToQueueItem(SupportQueueDto dto)
        => new(
            dto.Id,
            dto.Name,
            dto.Description,
            dto.IsActive,
            dto.ActiveMemberCount,
            dto.Members.Select(m => new SupportQueueMemberItem(m.UserId, m.UserName)).ToList());

    private static SupportSlaPolicyItem ToSlaItem(SupportSlaPolicyDto dto)
        => new(
            dto.Id,
            dto.Name,
            dto.Priority,
            dto.Severity,
            dto.FirstResponseTargetMinutes,
            dto.ResolutionTargetMinutes,
            dto.EscalationMinutes,
            dto.BusinessHoursJson,
            dto.IsActive);
}
