using CRM.Enterprise.Api.Contracts.Lookups;
using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/lookups/lead-statuses")]
public class LeadStatusesController : ControllerBase
{
    private readonly ILeadStatusLookupService _svc;
    public LeadStatusesController(ILeadStatusLookupService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct)
    {
        var items = await _svc.GetAllAsync(ct);
        return Ok(items.Select(s => new LeadStatusItem(s.Id, s.Name, s.Order, s.IsDefault, s.IsClosed)));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var item = await _svc.GetByIdAsync(id, ct);
        if (item is null) return NotFound();
        return Ok(new LeadStatusItem(item.Id, item.Name, item.Order, item.IsDefault, item.IsClosed));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UpsertLeadStatusBody body, CancellationToken ct)
    {
        var dto = await _svc.CreateAsync(new UpsertLeadStatusRequest(body.Name, body.Order, body.IsDefault, body.IsClosed), ct);
        return CreatedAtAction(nameof(GetById), new { id = dto.Id },
            new LeadStatusItem(dto.Id, dto.Name, dto.Order, dto.IsDefault, dto.IsClosed));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertLeadStatusBody body, CancellationToken ct)
    {
        var dto = await _svc.UpdateAsync(id, new UpsertLeadStatusRequest(body.Name, body.Order, body.IsDefault, body.IsClosed), ct);
        if (dto is null) return NotFound();
        return Ok(new LeadStatusItem(dto.Id, dto.Name, dto.Order, dto.IsDefault, dto.IsClosed));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var ok = await _svc.DeleteAsync(id, ct);
        if (!ok) return Conflict(new { message = "Cannot delete a status that is in use." });
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
