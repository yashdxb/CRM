using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Opportunities;
using ApiOpportunityCoachingRequest = CRM.Enterprise.Api.Contracts.Opportunities.OpportunityCoachingRequest;
using ApiOpportunityReviewOutcomeRequest = CRM.Enterprise.Api.Contracts.Opportunities.OpportunityReviewOutcomeRequest;
using ApiOpportunityUpsertRequest = CRM.Enterprise.Api.Contracts.Opportunities.UpsertOpportunityRequest;
using ApiOpportunityTeamRequest = CRM.Enterprise.Api.Contracts.Opportunities.UpdateOpportunityTeamRequest;
using AppOpportunityUpsertRequest = CRM.Enterprise.Application.Opportunities.OpportunityUpsertRequest;
using AppOpportunityCoachingRequest = CRM.Enterprise.Application.Opportunities.OpportunityCoachingRequest;
using AppOpportunityReviewOutcomeRequest = CRM.Enterprise.Application.Opportunities.OpportunityReviewOutcomeRequest;
using AppOpportunityTeamMemberRequest = CRM.Enterprise.Application.Opportunities.OpportunityTeamMemberRequest;
using CRM.Enterprise.Api.Contracts.Audit;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
// using CRM.Enterprise.Api.Jobs; // Removed Hangfire
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.OpportunitiesView)]
[ApiController]
[Route("api/opportunities")]
public class OpportunitiesController : ControllerBase
{
    private readonly IOpportunityService _opportunityService;

    public OpportunitiesController(
        IOpportunityService opportunityService)
    {
        _opportunityService = opportunityService;
    }

    [HttpGet]
    public async Task<ActionResult<OpportunitySearchResponse>> GetOpportunities(
        [FromQuery] string? search,
        [FromQuery] string? stage,
        [FromQuery] Guid? accountId,
        [FromQuery] bool? missingNextStep,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var result = await _opportunityService.SearchAsync(
            new OpportunitySearchRequest(search, stage, accountId, missingNextStep, page, pageSize),
            cancellationToken);
        var items = result.Items.Select(ToApiItem);
        return Ok(new OpportunitySearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<OpportunityListItem>> GetOpportunity(Guid id, CancellationToken cancellationToken)
    {
        var opp = await _opportunityService.GetAsync(id, cancellationToken);
        if (opp is null) return NotFound();
        return Ok(ToApiItem(opp));
    }

    [HttpGet("{id:guid}/history")]
    public async Task<ActionResult<IEnumerable<OpportunityStageHistoryItem>>> GetHistory(Guid id, CancellationToken cancellationToken)
    {
        var history = await _opportunityService.GetHistoryAsync(id, cancellationToken);
        if (history is null) return NotFound();
        var items = history.Select(h => new OpportunityStageHistoryItem(h.Id, h.Stage, h.ChangedAtUtc, h.ChangedBy, h.Notes));
        return Ok(items);
    }

    [HttpGet("{id:guid}/audit")]
    public async Task<ActionResult<IEnumerable<AuditEventItem>>> GetAudit(Guid id, CancellationToken cancellationToken)
    {
        var audit = await _opportunityService.GetAuditAsync(id, cancellationToken);
        if (audit is null) return NotFound();
        var items = audit.Select(a => new AuditEventItem(
            a.Id,
            a.EntityType,
            a.EntityId,
            a.Action,
            a.Field,
            a.OldValue,
            a.NewValue,
            a.ChangedByUserId,
            a.ChangedByName,
            a.CreatedAtUtc));
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityListItem>> Create([FromBody] ApiOpportunityUpsertRequest request, CancellationToken cancellationToken)
    {
        var result = await _opportunityService.CreateAsync(MapUpsertRequest(request), GetActor(), cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        return CreatedAtAction(nameof(GetOpportunity), new { id = result.Value!.Id }, ToApiItem(result.Value!));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<IActionResult> Update(Guid id, [FromBody] ApiOpportunityUpsertRequest request, CancellationToken cancellationToken)
    {
        var result = await _opportunityService.UpdateAsync(id, MapUpsertRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var result = await _opportunityService.DeleteAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPatch("{id:guid}/owner")]
    public async Task<IActionResult> UpdateOwner(Guid id, [FromBody] UpdateOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var result = await _opportunityService.UpdateOwnerAsync(id, request.OwnerId, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPatch("{id:guid}/stage")]
    public async Task<IActionResult> UpdateStage(Guid id, [FromBody] UpdateStageRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Stage))
        {
            return BadRequest("Stage is required.");
        }

        if (request.Stage.StartsWith("Closed", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest("Use the full edit flow to close opportunities.");
        }

        var result = await _opportunityService.UpdateStageAsync(id, request.Stage, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost("{id:guid}/coach")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityCoachingResponse>> Coach(Guid id, [FromBody] ApiOpportunityCoachingRequest request, CancellationToken cancellationToken)
    {
        if (!IsManagerActor())
        {
            return Forbid();
        }

        if (string.IsNullOrWhiteSpace(request.Comment))
        {
            return BadRequest("Coaching comment is required.");
        }

        var result = await _opportunityService.CoachAsync(
            id,
            new AppOpportunityCoachingRequest(request.Comment, request.DueDateUtc, request.Priority),
            GetActor(),
            cancellationToken);

        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return Ok(new OpportunityCoachingResponse(result.Value!));
    }

    [HttpGet("{id:guid}/review-thread")]
    public async Task<ActionResult<IReadOnlyList<OpportunityReviewThreadItem>>> GetReviewThread(Guid id, CancellationToken cancellationToken)
    {
        var thread = await _opportunityService.GetReviewThreadAsync(id, cancellationToken);
        if (thread is null) return NotFound();
        return Ok(thread.Select(ToReviewThreadItem).ToList());
    }

    [HttpPost("{id:guid}/review-outcome")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityReviewThreadItem>> AddReviewOutcome(Guid id, [FromBody] ApiOpportunityReviewOutcomeRequest request, CancellationToken cancellationToken)
    {
        if (!IsManagerActor())
        {
            return Forbid();
        }

        if (string.IsNullOrWhiteSpace(request.Outcome))
        {
            return BadRequest("Review outcome is required.");
        }

        var result = await _opportunityService.AddReviewOutcomeAsync(
            id,
            new AppOpportunityReviewOutcomeRequest(request.Outcome, request.Comment, request.AcknowledgmentDueAtUtc),
            GetActor(),
            cancellationToken);

        if (result.NotFound) return NotFound();
        if (!result.Success || result.Value is null) return BadRequest(result.Error);
        return Ok(ToReviewThreadItem(result.Value));
    }

    [HttpPost("{id:guid}/review-ack")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityReviewThreadItem>> AcknowledgeReview(Guid id, CancellationToken cancellationToken)
    {
        var result = await _opportunityService.AcknowledgeReviewAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success || result.Value is null) return BadRequest(result.Error);
        return Ok(ToReviewThreadItem(result.Value));
    }

    [HttpPost("renewal-automation")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<RenewalAutomationResponse>> RunRenewalAutomation(CancellationToken cancellationToken)
    {
        var result = await _opportunityService.RunRenewalAutomationAsync(GetActor(), cancellationToken);
        return Ok(new RenewalAutomationResponse(result.RenewalsCreated, result.ReminderTasksCreated));
    }

    [HttpGet("expansion-signals")]
    public async Task<ActionResult<IReadOnlyList<ExpansionSignalItem>>> GetExpansionSignals(CancellationToken cancellationToken)
    {
        var signals = await _opportunityService.GetExpansionSignalsAsync(cancellationToken);
        return Ok(signals.Select(ToExpansionSignalItem).ToList());
    }

    [HttpPost("{id:guid}/expansion")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityListItem>> CreateExpansion(Guid id, CancellationToken cancellationToken)
    {
        var result = await _opportunityService.CreateExpansionAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success || result.Value is null) return BadRequest(result.Error);
        return Ok(ToApiItem(result.Value));
    }

    [HttpGet("{id:guid}/team")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesView)]
    public async Task<ActionResult<IEnumerable<OpportunityTeamMemberItem>>> GetTeam(Guid id, CancellationToken cancellationToken)
    {
        var team = await _opportunityService.GetTeamAsync(id, cancellationToken);
        if (team is null) return NotFound();
        return Ok(team.Select(ToTeamItem));
    }

    [HttpPut("{id:guid}/team")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<IEnumerable<OpportunityTeamMemberItem>>> UpdateTeam(
        Guid id,
        [FromBody] ApiOpportunityTeamRequest request,
        CancellationToken cancellationToken)
    {
        var members = request.Members.Select(member => new AppOpportunityTeamMemberRequest(member.UserId, member.Role)).ToList();
        var result = await _opportunityService.UpdateTeamAsync(id, members, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success || result.Value is null) return BadRequest(result.Error);
        return Ok(result.Value.Select(ToTeamItem));
    }

    private static OpportunityListItem ToApiItem(OpportunityListItemDto dto)
    {
        return new OpportunityListItem(
            dto.Id,
            dto.Name,
            dto.AccountId,
            dto.AccountName,
            dto.Stage,
            dto.Amount,
            dto.Probability,
            dto.Currency,
            dto.ExpectedCloseDate,
            dto.ContractStartDateUtc,
            dto.ContractEndDateUtc,
            dto.ForecastCategory,
            dto.OpportunityType,
            dto.RenewalOfOpportunityId,
            dto.RenewalOpportunityId,
            dto.Requirements,
            dto.BuyingProcess,
            dto.SuccessCriteria,
            dto.DiscountPercent,
            dto.DiscountAmount,
            dto.PricingNotes,
            dto.SecurityReviewStatus,
            dto.SecurityNotes,
            dto.LegalReviewStatus,
            dto.LegalNotes,
            dto.DeliveryOwnerId,
            dto.DeliveryHandoffScope,
            dto.DeliveryHandoffRisks,
            dto.DeliveryHandoffTimeline,
            dto.DeliveryStatus,
            dto.DeliveryCompletedAtUtc,
            dto.OwnerId,
            dto.OwnerName,
            dto.Status,
            dto.WinLossReason,
            dto.CreatedAtUtc,
            dto.UpdatedAtUtc,
            dto.LastActivityAtUtc,
            dto.NextStepDueAtUtc,
            dto.IsAtRisk);
    }

    private static ExpansionSignalItem ToExpansionSignalItem(ExpansionSignalDto dto)
    {
        return new ExpansionSignalItem(
            dto.OpportunityId,
            dto.AccountId,
            dto.AccountName,
            dto.OpportunityName,
            dto.ContractEndDateUtc,
            dto.LastSignalAtUtc,
            dto.SignalCount,
            dto.HasExpansionOpportunity);
    }

    private static OpportunityReviewThreadItem ToReviewThreadItem(OpportunityReviewThreadItemDto dto)
    {
        return new OpportunityReviewThreadItem(
            dto.ActivityId,
            dto.Kind,
            dto.Outcome,
            dto.Subject,
            dto.Comment,
            dto.OwnerId,
            dto.OwnerName,
            dto.CreatedAtUtc,
            dto.DueDateUtc,
            dto.CompletedDateUtc,
            dto.RequiresAcknowledgment);
    }

    private static OpportunityTeamMemberItem ToTeamItem(OpportunityTeamMemberDto dto)
    {
        return new OpportunityTeamMemberItem(
            dto.UserId,
            dto.UserName,
            dto.Role,
            dto.CreatedAtUtc,
            dto.UpdatedAtUtc);
    }

    private static AppOpportunityUpsertRequest MapUpsertRequest(ApiOpportunityUpsertRequest request)
    {
        return new OpportunityUpsertRequest(
            request.Name,
            request.AccountId,
            request.PrimaryContactId,
            request.StageId,
            request.StageName,
            request.OwnerId,
            request.Amount,
            request.Currency,
            request.Probability,
            request.ExpectedCloseDate,
            request.ContractStartDateUtc,
            request.ContractEndDateUtc,
            request.ForecastCategory,
            request.OpportunityType,
            request.Summary,
            request.Requirements,
            request.BuyingProcess,
            request.SuccessCriteria,
            request.DiscountPercent,
            request.DiscountAmount,
            request.PricingNotes,
            request.SecurityReviewStatus,
            request.SecurityNotes,
            request.LegalReviewStatus,
            request.LegalNotes,
            request.DeliveryOwnerId,
            request.DeliveryHandoffScope,
            request.DeliveryHandoffRisks,
            request.DeliveryHandoffTimeline,
            request.DeliveryStatus,
            request.DeliveryCompletedAtUtc,
            request.IsClosed,
            request.IsWon,
            request.WinLossReason);
    }

    private ActorContext GetActor()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(subject, out var parsed) ? parsed : (Guid?)null;
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new ActorContext(userId, name);
    }

    private bool IsManagerActor()
    {
        var roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value);
        return roles.Any(role =>
            role.Contains("manager", StringComparison.OrdinalIgnoreCase)
            || role.Contains("admin", StringComparison.OrdinalIgnoreCase)
            || role.Contains("supervisor", StringComparison.OrdinalIgnoreCase)
            || role.Contains("lead", StringComparison.OrdinalIgnoreCase));
    }
}
