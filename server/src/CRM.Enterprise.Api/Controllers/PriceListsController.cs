using CRM.Enterprise.Api.Contracts.Pricing;
using CRM.Enterprise.Application.Pricing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/supply-chain/price-lists")]
public sealed class PriceListsController : ControllerBase
{
    private readonly IPriceListService _priceListService;

    public PriceListsController(IPriceListService priceListService)
    {
        _priceListService = priceListService;
    }

    [HttpGet]
    public async Task<ActionResult<CRM.Enterprise.Api.Contracts.Pricing.PriceListSearchResponse>> GetPriceLists(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? currency,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var request = new PriceListSearchRequest(search, status, currency, page, pageSize);
        var result = await _priceListService.SearchAsync(request, cancellationToken);

        var items = result.Items.Select(i => new PriceListListItem(
            i.Id,
            i.Name,
            i.Currency,
            i.Status,
            i.ValidFrom,
            i.ValidTo,
            i.ItemCount)).ToList();

        return Ok(new CRM.Enterprise.Api.Contracts.Pricing.PriceListSearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PriceListDetail>> GetPriceList(Guid id, CancellationToken cancellationToken)
    {
        var result = await _priceListService.GetByIdAsync(id, cancellationToken);
        if (result is null)
        {
            return NotFound();
        }

        return Ok(MapDetail(result));
    }

    [HttpPost]
    public async Task<ActionResult<PriceListDetail>> CreatePriceList(
        [FromBody] UpsertPriceListRequest request,
        CancellationToken cancellationToken)
    {
        var createRequest = new CreatePriceListRequest(
            request.Name,
            request.Currency,
            request.Status,
            request.ValidFrom,
            request.ValidTo,
            request.Notes,
            request.Items.Select(MapItemRequest).ToList()
        );

        var created = await _priceListService.CreateAsync(createRequest, cancellationToken);
        return CreatedAtAction(nameof(GetPriceList), new { id = created.Id }, MapDetail(created));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<PriceListDetail>> UpdatePriceList(
        Guid id,
        [FromBody] UpsertPriceListRequest request,
        CancellationToken cancellationToken)
    {
        var updateRequest = new UpdatePriceListRequest(
            request.Name,
            request.Currency,
            request.Status,
            request.ValidFrom,
            request.ValidTo,
            request.Notes,
            request.Items.Select(MapItemRequest).ToList()
        );

        var updated = await _priceListService.UpdateAsync(id, updateRequest, cancellationToken);
        if (updated is null)
        {
            return NotFound();
        }

        return Ok(MapDetail(updated));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeletePriceList(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _priceListService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private static PriceListItemRequest MapItemRequest(PriceListItem item)
    {
        return new PriceListItemRequest(
            item.ItemMasterId,
            item.Uom,
            item.UnitPrice,
            item.MinQty,
            item.MaxQty,
            item.LeadTimeDays,
            item.IsActive
        );
    }

    private static PriceListDetail MapDetail(PriceListDetailDto dto)
    {
        var items = dto.Items.Select(i => new PriceListItem(
            i.ItemMasterId,
            i.Uom,
            i.UnitPrice,
            i.MinQty,
            i.MaxQty,
            i.LeadTimeDays,
            i.IsActive)).ToList();

        return new PriceListDetail(
            dto.Id,
            dto.Name,
            dto.Currency,
            dto.Status,
            dto.ValidFrom,
            dto.ValidTo,
            dto.Notes,
            items
        );
    }
}
