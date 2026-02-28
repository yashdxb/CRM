using CRM.Enterprise.Api.Contracts.Catalog;
using CRM.Enterprise.Application.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/supply-chain/item-master")]
public sealed class ItemMasterController : ControllerBase
{
    private readonly IItemMasterService _itemMasterService;

    public ItemMasterController(IItemMasterService itemMasterService)
    {
        _itemMasterService = itemMasterService;
    }

    [HttpGet]
    public async Task<ActionResult<CRM.Enterprise.Api.Contracts.Catalog.ItemMasterSearchResponse>> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? category,
        [FromQuery] bool? isActive,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 25,
        CancellationToken cancellationToken = default)
    {
        var result = await _itemMasterService.SearchAsync(
            new CRM.Enterprise.Application.Catalog.ItemMasterSearchRequest(search, category, isActive, page, pageSize),
            cancellationToken);

        return Ok(new CRM.Enterprise.Api.Contracts.Catalog.ItemMasterSearchResponse(result.Items.Select(MapItem).ToList(), result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ItemMasterListItem>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var item = await _itemMasterService.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return NotFound();
        }

        return Ok(MapItem(item));
    }

    [HttpPost]
    public async Task<ActionResult<ItemMasterListItem>> Create(
        [FromBody] CRM.Enterprise.Api.Contracts.Catalog.ItemMasterUpsertRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var created = await _itemMasterService.CreateAsync(MapRequest(request), cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, MapItem(created));
        }
        catch (InvalidOperationException ex)
        {
            return SafeBadRequest(ex.Message);
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ItemMasterListItem>> Update(
        Guid id,
        [FromBody] CRM.Enterprise.Api.Contracts.Catalog.ItemMasterUpsertRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var updated = await _itemMasterService.UpdateAsync(id, MapRequest(request), cancellationToken);
            if (updated is null)
            {
                return NotFound();
            }

            return Ok(MapItem(updated));
        }
        catch (InvalidOperationException ex)
        {
            return SafeBadRequest(ex.Message);
        }
    }

    [HttpPost("{id:guid}/toggle-active")]
    public async Task<ActionResult<ItemMasterListItem>> ToggleActive(Guid id, CancellationToken cancellationToken)
    {
        var updated = await _itemMasterService.ToggleActiveAsync(id, cancellationToken);
        if (updated is null)
        {
            return NotFound();
        }

        return Ok(MapItem(updated));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _itemMasterService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private static ItemMasterListItem MapItem(CRM.Enterprise.Application.Catalog.ItemMasterDto item)
        => new(
            item.Id,
            item.Sku,
            item.Name,
            item.Description,
            item.CategoryName,
            item.DefaultUom,
            item.IsActive,
            item.DefaultUnitPrice,
            item.DefaultPriceListName);

    private static CRM.Enterprise.Application.Catalog.ItemMasterUpsertRequest MapRequest(CRM.Enterprise.Api.Contracts.Catalog.ItemMasterUpsertRequest request)
        => new(
            request.Sku,
            request.Name,
            request.Description,
            request.CategoryName,
            request.DefaultUom,
            request.IsActive);

    private ActionResult SafeBadRequest(string? error)
        => BadRequest(new
        {
            message = string.IsNullOrWhiteSpace(error) ? "Item master request is invalid." : error.Trim()
        });
}
