using CRM.Enterprise.Api.Contracts.Lookups;
using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/lookups/phone-types")]
public class PhoneTypeLookupController : ControllerBase
{
    private readonly IPhoneTypeLookupService _svc;
    public PhoneTypeLookupController(IPhoneTypeLookupService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] bool includeInactive = false, CancellationToken ct = default)
    {
        var items = await _svc.GetAllAsync(includeInactive, ct);
        return Ok(items.Select(p => new PhoneTypeItem(p.Id, p.Name, p.IsActive, p.SortOrder, p.IsDefault)));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var item = await _svc.GetByIdAsync(id, ct);
        if (item is null) return NotFound();
        return Ok(new PhoneTypeItem(item.Id, item.Name, item.IsActive, item.SortOrder, item.IsDefault));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UpsertPhoneTypeBody body, CancellationToken ct)
    {
        var dto = await _svc.CreateAsync(
            new UpsertPhoneTypeRequest(body.Name, body.IsActive, body.SortOrder, body.IsDefault), ct);
        return CreatedAtAction(nameof(GetById), new { id = dto.Id },
            new PhoneTypeItem(dto.Id, dto.Name, dto.IsActive, dto.SortOrder, dto.IsDefault));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertPhoneTypeBody body, CancellationToken ct)
    {
        var dto = await _svc.UpdateAsync(id,
            new UpsertPhoneTypeRequest(body.Name, body.IsActive, body.SortOrder, body.IsDefault), ct);
        if (dto is null) return NotFound();
        return Ok(new PhoneTypeItem(dto.Id, dto.Name, dto.IsActive, dto.SortOrder, dto.IsDefault));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var ok = await _svc.DeleteAsync(id, ct);
        if (!ok) return NotFound();
        return NoContent();
    }
}
