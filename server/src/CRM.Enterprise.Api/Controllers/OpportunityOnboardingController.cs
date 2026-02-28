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
public sealed class OpportunityOnboardingController : ControllerBase
{
    private readonly IOpportunityOnboardingService _service;

    public OpportunityOnboardingController(IOpportunityOnboardingService service)
    {
        _service = service;
    }

    [HttpGet("api/opportunities/{id:guid}/onboarding")]
    public async Task<ActionResult<IEnumerable<OpportunityOnboardingItem>>> Get(Guid id, [FromQuery] string? type, CancellationToken cancellationToken)
    {
        var items = await _service.GetAsync(id, type, cancellationToken);
        if (items is null)
        {
            return NotFound();
        }

        return Ok(items.Select(MapItem));
    }

    [HttpPost("api/opportunities/{id:guid}/onboarding")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityOnboardingItem>> Create(
        Guid id,
        [FromBody] UpsertOpportunityOnboardingItemRequest request,
        CancellationToken cancellationToken)
    {
        OpportunityOnboardingItemDto? created;
        try
        {
            created = await _service.CreateAsync(
                id,
                new OpportunityOnboardingCreateRequest(
                    request.Type,
                    request.Title,
                    request.Status,
                    request.DueDateUtc,
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

    [HttpPatch("api/opportunity-onboarding/{itemId:guid}")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityOnboardingItem>> Update(
        Guid itemId,
        [FromBody] UpsertOpportunityOnboardingItemRequest request,
        CancellationToken cancellationToken)
    {
        OpportunityOnboardingItemDto? updated;
        try
        {
            updated = await _service.UpdateAsync(
                itemId,
                new OpportunityOnboardingUpdateRequest(
                    request.Title,
                    request.Status,
                    request.DueDateUtc,
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

    [HttpDelete("api/opportunity-onboarding/{itemId:guid}")]
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

    private static OpportunityOnboardingItem MapItem(OpportunityOnboardingItemDto dto)
    {
        return new OpportunityOnboardingItem(
            dto.Id,
            dto.OpportunityId,
            dto.Type,
            dto.Title,
            dto.Status,
            dto.DueDateUtc,
            dto.CompletedAtUtc,
            dto.Notes);
    }

    private ActorContext GetActor()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(subject, out var parsed) ? parsed : (Guid?)null;
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new ActorContext(userId, name);
    }
}
