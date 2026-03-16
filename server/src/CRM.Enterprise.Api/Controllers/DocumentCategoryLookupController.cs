using CRM.Enterprise.Api.Contracts.Lookups;
using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/lookups/document-categories")]
public class DocumentCategoryLookupController : ControllerBase
{
    private readonly IDocumentCategoryLookupService _svc;
    public DocumentCategoryLookupController(IDocumentCategoryLookupService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] bool includeInactive = false, CancellationToken ct = default)
    {
        var items = await _svc.GetAllAsync(includeInactive, ct);
        return Ok(items.Select(i => new DocumentCategoryItem(i.Id, i.Name, i.IsActive, i.SortOrder)));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var item = await _svc.GetByIdAsync(id, ct);
        if (item is null) return NotFound();
        return Ok(new DocumentCategoryItem(item.Id, item.Name, item.IsActive, item.SortOrder));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UpsertDocumentCategoryBody body, CancellationToken ct)
    {
        var dto = await _svc.CreateAsync(
            new UpsertDocumentCategoryRequest(body.Name, body.IsActive, body.SortOrder), ct);
        return CreatedAtAction(nameof(GetById), new { id = dto.Id },
            new DocumentCategoryItem(dto.Id, dto.Name, dto.IsActive, dto.SortOrder));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertDocumentCategoryBody body, CancellationToken ct)
    {
        var dto = await _svc.UpdateAsync(id,
            new UpsertDocumentCategoryRequest(body.Name, body.IsActive, body.SortOrder), ct);
        if (dto is null) return NotFound();
        return Ok(new DocumentCategoryItem(dto.Id, dto.Name, dto.IsActive, dto.SortOrder));
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
