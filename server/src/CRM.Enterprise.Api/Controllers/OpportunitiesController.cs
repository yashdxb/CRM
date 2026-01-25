using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Opportunities;
using ApiOpportunityUpsertRequest = CRM.Enterprise.Api.Contracts.Opportunities.UpsertOpportunityRequest;
using AppOpportunityUpsertRequest = CRM.Enterprise.Application.Opportunities.OpportunityUpsertRequest;
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
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var result = await _opportunityService.SearchAsync(
            new OpportunitySearchRequest(search, stage, accountId, page, pageSize),
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
            request.Summary,
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
}
