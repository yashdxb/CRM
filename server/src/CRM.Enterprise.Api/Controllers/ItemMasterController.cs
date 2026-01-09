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
    public async Task<ActionResult<IReadOnlyList<ItemMasterListItem>>> GetAll(CancellationToken cancellationToken)
    {
        var items = await _itemMasterService.GetAllAsync(cancellationToken);
        var response = items.Select(item => new ItemMasterListItem(
            item.Id,
            item.Sku,
            item.Name,
            item.Description,
            item.CategoryName,
            item.DefaultUom,
            item.IsActive)).ToList();

        return Ok(response);
    }
}
