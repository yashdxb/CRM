using CRM.Enterprise.Api.Contracts.Lookups;
using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/lookups/cadence-channels")]
public class CadenceChannelsController : ControllerBase
{
    private readonly ICadenceChannelLookupService _svc;
    public CadenceChannelsController(ICadenceChannelLookupService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] bool includeInactive = false, CancellationToken ct = default)
    {
        var items = await _svc.GetAllAsync(includeInactive, ct);
        return Ok(items.Select(c => new CadenceChannelItem(c.Id, c.Name, c.Order, c.IsActive, c.IsDefault)));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var item = await _svc.GetByIdAsync(id, ct);
        if (item is null) return NotFound();
        return Ok(new CadenceChannelItem(item.Id, item.Name, item.Order, item.IsActive, item.IsDefault));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UpsertCadenceChannelBody body, CancellationToken ct)
    {
        var dto = await _svc.CreateAsync(
            new UpsertCadenceChannelRequest(body.Name, body.Order, body.IsActive, body.IsDefault), ct);
        return CreatedAtAction(nameof(GetById), new { id = dto.Id },
            new CadenceChannelItem(dto.Id, dto.Name, dto.Order, dto.IsActive, dto.IsDefault));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertCadenceChannelBody body, CancellationToken ct)
    {
        var dto = await _svc.UpdateAsync(id,
            new UpsertCadenceChannelRequest(body.Name, body.Order, body.IsActive, body.IsDefault), ct);
        if (dto is null) return NotFound();
        return Ok(new CadenceChannelItem(dto.Id, dto.Name, dto.Order, dto.IsActive, dto.IsDefault));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var ok = await _svc.DeleteAsync(id, ct);
        if (!ok) return Conflict(new { message = "Cannot delete a channel that is in use." });
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
