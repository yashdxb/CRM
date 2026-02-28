using System.Security.Claims;
using CRM.Enterprise.Api.Contracts.Opportunities;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.OpportunitiesView)]
[ApiController]
public sealed class OpportunityReviewChecklistController : ControllerBase
{
    private readonly IOpportunityReviewChecklistService _service;

    public OpportunityReviewChecklistController(IOpportunityReviewChecklistService service)
    {
        _service = service;
    }

    [HttpGet("api/opportunities/{id:guid}/review-checklist")]
    public async Task<ActionResult<IEnumerable<OpportunityReviewChecklistItem>>> Get(Guid id, [FromQuery] string? type, CancellationToken cancellationToken)
    {
        var items = await _service.GetAsync(id, type, cancellationToken);
        if (items is null)
        {
            return NotFound();
        }

        return Ok(items.Select(MapItem));
    }

    [HttpPost("api/opportunities/{id:guid}/review-checklist")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityReviewChecklistItem>> Create(
        Guid id,
        [FromBody] UpsertOpportunityReviewChecklistItemRequest request,
        CancellationToken cancellationToken)
    {
        OpportunityReviewChecklistItemDto? created;
        try
        {
            created = await _service.CreateAsync(
                id,
                new OpportunityReviewChecklistCreateRequest(
                    request.Type ?? "Security",
                    request.Title,
                    request.Status,
                    request.Notes),
                GetActor(),
                cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }

        if (created is null)
        {
            return NotFound();
        }

        return Ok(MapItem(created));
    }

    [HttpPatch("api/opportunity-review-checklist/{itemId:guid}")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityReviewChecklistItem>> Update(
        Guid itemId,
        [FromBody] UpsertOpportunityReviewChecklistItemRequest request,
        CancellationToken cancellationToken)
    {
        OpportunityReviewChecklistItemDto? updated;
        try
        {
            updated = await _service.UpdateAsync(
                itemId,
                new OpportunityReviewChecklistUpdateRequest(
                    request.Title,
                    request.Status,
                    request.Notes),
                GetActor(),
                cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }

        if (updated is null)
        {
            return NotFound();
        }

        return Ok(MapItem(updated));
    }

    [HttpDelete("api/opportunity-review-checklist/{itemId:guid}")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<IActionResult> Delete(Guid itemId, CancellationToken cancellationToken)
    {
        bool deleted;
        try
        {
            deleted = await _service.DeleteAsync(itemId, GetActor(), cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private static OpportunityReviewChecklistItem MapItem(OpportunityReviewChecklistItemDto dto)
    {
        return new OpportunityReviewChecklistItem(
            dto.Id,
            dto.OpportunityId,
            dto.Type,
            dto.Title,
            dto.Status,
            dto.Notes,
            dto.CompletedAtUtc);
    }

    private ActorContext GetActor()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(subject, out var parsed) ? parsed : (Guid?)null;
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new ActorContext(userId, name);
    }
}
