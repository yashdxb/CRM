using CRM.Enterprise.Api.Contracts.Decisions;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Decisions;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.OpportunitiesView)]
[ApiController]
public class DecisionsController : ControllerBase
{
    private readonly IDecisionInboxService _decisionInboxService;

    public DecisionsController(IDecisionInboxService decisionInboxService)
    {
        _decisionInboxService = decisionInboxService;
    }

    [HttpGet("api/decisions/inbox")]
    public async Task<ActionResult<IEnumerable<DecisionInboxItem>>> GetInbox(
        [FromQuery] string? status,
        [FromQuery] string? purpose,
        CancellationToken cancellationToken)
    {
        var items = await _decisionInboxService.GetInboxAsync(status, purpose, cancellationToken);
        return Ok(items.Select(Map));
    }

    [HttpGet("api/decisions/history")]
    public async Task<ActionResult<IEnumerable<DecisionHistoryItem>>> GetHistory(
        [FromQuery] string? action,
        [FromQuery] string? status,
        [FromQuery] string? decisionType,
        [FromQuery] string? search,
        [FromQuery] int take = 200,
        CancellationToken cancellationToken = default)
    {
        var items = await _decisionInboxService.GetHistoryAsync(
            action,
            status,
            decisionType,
            search,
            take,
            cancellationToken);

        return Ok(items.Select(item => new DecisionHistoryItem(
            item.ActionLogId,
            item.DecisionId,
            item.Action,
            item.ActionAtUtc,
            item.ActorName,
            item.ActorUserId,
            item.DecisionType,
            item.WorkflowType,
            item.EntityType,
            item.EntityId,
            item.EntityName,
            item.Status,
            item.Priority,
            item.RiskLevel,
            item.Notes,
            item.PolicyReason,
            item.IsEscalated)));
    }

    [HttpPost("api/decisions/requests")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesApprovalsRequest)]
    public async Task<ActionResult<DecisionInboxItem>> Create(
        [FromBody] CreateDecisionRequest request,
        CancellationToken cancellationToken)
    {
        var actor = GetActor();
        var created = await _decisionInboxService.CreateAsync(
            new DecisionCreateRequestDto(
                request.DecisionType,
                request.WorkflowType,
                request.EntityType,
                request.EntityId,
                request.EntityName,
                request.ParentEntityName,
                request.Purpose,
                string.IsNullOrWhiteSpace(request.Status) ? "Submitted" : request.Status!,
                string.IsNullOrWhiteSpace(request.Priority) ? "normal" : request.Priority!,
                string.IsNullOrWhiteSpace(request.RiskLevel) ? "low" : request.RiskLevel!,
                string.IsNullOrWhiteSpace(request.SlaStatus) ? "on-track" : request.SlaStatus!,
                request.SlaDueAtUtc,
                request.PolicyReason ?? "Decision submitted.",
                request.BusinessImpactLabel ?? "unknown impact",
                request.Amount,
                request.Currency ?? "USD",
                request.RequestedByUserId ?? actor.UserId,
                request.RequestedByName ?? actor.UserName,
                request.AssigneeUserId,
                request.AssigneeName,
                request.RequestedOn ?? DateTime.UtcNow,
                request.CurrentStepOrder ?? 1,
                request.TotalSteps ?? (request.Steps?.Count ?? 1),
                request.StepRole,
                request.ChainStatus,
                request.PayloadJson,
                request.PolicySnapshotJson,
                (request.Steps ?? Array.Empty<CreateDecisionStepRequest>())
                    .Select(step => new DecisionCreateStepRequestDto(
                        step.StepOrder,
                        string.IsNullOrWhiteSpace(step.StepType) ? "Approval" : step.StepType!,
                        step.ApproverRole,
                        step.AssigneeUserId,
                        step.AssigneeName,
                        step.DueAtUtc))
                    .ToList()),
            cancellationToken);

        return Ok(Map(created));
    }

    [HttpPost("api/decisions/{id:guid}/assist-draft")]
    public async Task<ActionResult<DecisionAssistDraft>> GenerateAssistDraft(
        Guid id,
        CancellationToken cancellationToken)
    {
        try
        {
            var draft = await _decisionInboxService.GenerateAssistDraftAsync(id, cancellationToken);
            return Ok(new DecisionAssistDraft(
                draft.DecisionId,
                draft.Summary,
                draft.RecommendedAction,
                draft.ApprovalDraftNote,
                draft.RejectDraftNote,
                draft.RequestInfoDraftNote,
                draft.MissingEvidence,
                draft.Disclaimer));
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { message = "Decision item not found." });
        }
    }

    [HttpPatch("api/decisions/{id:guid}/decision")]
    public async Task<ActionResult<DecisionInboxItem>> Decide(
        Guid id,
        [FromBody] DecisionDecisionRequest request,
        CancellationToken cancellationToken)
    {
        if (!CanApprove())
        {
            return Forbid();
        }

        try
        {
            var updated = await _decisionInboxService.DecideAsync(
                id,
                new DecisionDecisionRequestDto(
                    request.Approved,
                    string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim(),
                    GetActor().UserId,
                    GetActor().UserName),
                cancellationToken);

            return Ok(Map(updated));
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { message = "Decision item not found." });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("api/decisions/{id:guid}/request-info")]
    public async Task<ActionResult<DecisionInboxItem>> RequestInfo(
        Guid id,
        [FromBody] DecisionRequestInfoRequest request,
        CancellationToken cancellationToken)
    {
        if (!CanApprove())
        {
            return Forbid();
        }

        var actor = GetActor();
        try
        {
            var updated = await _decisionInboxService.RequestInfoAsync(
                id,
                new DecisionRequestInfoDto(
                    string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim(),
                    actor.UserId,
                    actor.UserName),
                cancellationToken);
            return Ok(Map(updated));
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { message = "Decision item not found." });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("api/decisions/{id:guid}/delegate")]
    public async Task<ActionResult<DecisionInboxItem>> Delegate(
        Guid id,
        [FromBody] DecisionDelegateRequest request,
        CancellationToken cancellationToken)
    {
        if (!CanApprove())
        {
            return Forbid();
        }

        if (request.DelegateUserId == Guid.Empty)
        {
            return BadRequest(new { message = "Delegate user is required." });
        }

        var actor = GetActor();
        try
        {
            var updated = await _decisionInboxService.DelegateAsync(
                id,
                new DecisionDelegateRequestDto(
                    request.DelegateUserId,
                    string.IsNullOrWhiteSpace(request.DelegateUserName) ? null : request.DelegateUserName.Trim(),
                    string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim(),
                    actor.UserId,
                    actor.UserName),
                cancellationToken);
            return Ok(Map(updated));
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { message = "Decision item not found." });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    private static DecisionInboxItem Map(DecisionInboxItemDto dto)
    {
        return new DecisionInboxItem(
            dto.Id,
            dto.DecisionType,
            dto.WorkflowType,
            dto.EntityType,
            dto.EntityId,
            dto.EntityName,
            dto.ParentEntityName,
            dto.Status,
            dto.Purpose,
            dto.Priority,
            dto.RiskLevel,
            dto.SlaStatus,
            dto.SlaDueAtUtc,
            dto.IsEscalated,
            dto.RequestedAgeHours,
            dto.PolicyReason,
            dto.BusinessImpactLabel,
            dto.Amount,
            dto.Currency,
            dto.RequestedByUserId,
            dto.RequestedByName,
            dto.AssigneeUserId,
            dto.AssigneeName,
            dto.RequestedOn,
            dto.DecisionOn,
            dto.Notes,
            dto.CurrentStepOrder,
            dto.TotalSteps,
            dto.StepRole,
            dto.ChainStatus,
            dto.Steps.Select(step => new DecisionStepItem(
                step.StepOrder,
                step.StepType,
                step.Status,
                step.AssigneeUserId,
                step.AssigneeName,
                step.ApproverRole,
                step.DueAtUtc,
                step.CompletedAtUtc)).ToList());
    }

    private ActorContext GetActor()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(subject, out var parsed) ? parsed : (Guid?)null;
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new ActorContext(userId, name);
    }

    private bool CanApprove()
    {
        return HasPermission(Permissions.Policies.OpportunitiesApprovalsApprove)
               || HasPermission(Permissions.Policies.OpportunitiesApprovalsOverride);
    }

    private bool HasPermission(string permission)
    {
        return User.Claims.Any(claim =>
            string.Equals(claim.Type, Permissions.ClaimType, StringComparison.OrdinalIgnoreCase)
            && string.Equals(claim.Value, permission, StringComparison.OrdinalIgnoreCase));
    }
}
