using CRM.Enterprise.Api.Contracts.Lookups;
using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/lookups/opportunity-stages")]
[OutputCache(PolicyName = "TenantLookup")]
public class OpportunityStagesController : ControllerBase
{
    private readonly IOpportunityStageLookupService _svc;
    public OpportunityStagesController(IOpportunityStageLookupService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var items = await _svc.GetAllAsync(ct);
        return Ok(items.Select(s => new OpportunityStageItem(s.Id, s.Name, s.Order, s.IsClosedStage, s.ForecastCategory)));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var item = await _svc.GetByIdAsync(id, ct);
        if (item is null) return NotFound();
        return Ok(new OpportunityStageItem(item.Id, item.Name, item.Order, item.IsClosedStage, item.ForecastCategory));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UpsertOpportunityStageBody body, CancellationToken ct)
    {
        var dto = await _svc.CreateAsync(
            new UpsertOpportunityStageRequest(body.Name, body.Order, body.IsClosedStage, body.ForecastCategory), ct);
        return CreatedAtAction(nameof(GetById), new { id = dto.Id },
            new OpportunityStageItem(dto.Id, dto.Name, dto.Order, dto.IsClosedStage, dto.ForecastCategory));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertOpportunityStageBody body, CancellationToken ct)
    {
        var dto = await _svc.UpdateAsync(id,
            new UpsertOpportunityStageRequest(body.Name, body.Order, body.IsClosedStage, body.ForecastCategory), ct);
        if (dto is null) return NotFound();
        return Ok(new OpportunityStageItem(dto.Id, dto.Name, dto.Order, dto.IsClosedStage, dto.ForecastCategory));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var ok = await _svc.DeleteAsync(id, ct);
        if (!ok) return Conflict(new { message = "Cannot delete a stage that is in use." });
        return NoContent();
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPost("reorder")]
    public async Task<IActionResult> Reorder([FromBody] ReorderBody body, CancellationToken ct)
    {
        await _svc.ReorderAsync(body.OrderedIds, ct);
        return NoContent();
    }
}
