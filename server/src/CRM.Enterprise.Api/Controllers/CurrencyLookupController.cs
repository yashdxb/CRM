using CRM.Enterprise.Api.Contracts.Lookups;
using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/lookups/currencies")]
[OutputCache(PolicyName = "TenantLookup")]
public class CurrencyLookupController : ControllerBase
{
    private readonly ICurrencyLookupService _svc;
    public CurrencyLookupController(ICurrencyLookupService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] bool includeInactive = false, CancellationToken ct = default)
    {
        var items = await _svc.GetAllAsync(includeInactive, ct);
        return Ok(items.Select(c => new CurrencyItem(c.Id, c.Code, c.Name, c.Symbol, c.IsActive, c.SortOrder)));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var item = await _svc.GetByIdAsync(id, ct);
        if (item is null) return NotFound();
        return Ok(new CurrencyItem(item.Id, item.Code, item.Name, item.Symbol, item.IsActive, item.SortOrder));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UpsertCurrencyBody body, CancellationToken ct)
    {
        var dto = await _svc.CreateAsync(
            new UpsertCurrencyRequest(body.Code, body.Name, body.Symbol, body.IsActive, body.SortOrder), ct);
        return CreatedAtAction(nameof(GetById), new { id = dto.Id },
            new CurrencyItem(dto.Id, dto.Code, dto.Name, dto.Symbol, dto.IsActive, dto.SortOrder));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertCurrencyBody body, CancellationToken ct)
    {
        var dto = await _svc.UpdateAsync(id,
            new UpsertCurrencyRequest(body.Code, body.Name, body.Symbol, body.IsActive, body.SortOrder), ct);
        if (dto is null) return NotFound();
        return Ok(new CurrencyItem(dto.Id, dto.Code, dto.Name, dto.Symbol, dto.IsActive, dto.SortOrder));
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
