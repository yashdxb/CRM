using CRM.Enterprise.Api.Contracts.Suppliers;
using CRM.Enterprise.Application.Suppliers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

/// <summary>
/// Suppliers API Controller.
/// Follows Clean Architecture - delegates all business logic to ISupplierService.
/// </summary>
[Authorize]
[ApiController]
[Route("api/supply-chain/suppliers")]
public class SuppliersController : ControllerBase
{
    private readonly ISupplierService _supplierService;

    public SuppliersController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }

    [HttpGet]
    public async Task<ActionResult<Contracts.Suppliers.SupplierSearchResponse>> GetSuppliers(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var request = new SupplierSearchRequest(search, status, page, pageSize);
        var result = await _supplierService.SearchAsync(request, cancellationToken);

        // Map Application DTOs to API Contracts
        var items = result.Items.Select(i => new SupplierListItem(
            i.Id, i.Name, i.Category, i.Status, i.Country, i.ContactName, i.ContactEmail
        )).ToList();

        return Ok(new Contracts.Suppliers.SupplierSearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<SupplierDetailResponse>> GetSupplier(Guid id, CancellationToken cancellationToken)
    {
        var supplier = await _supplierService.GetByIdAsync(id, cancellationToken);

        if (supplier is null)
        {
            return NotFound();
        }

        return Ok(MapToDetailResponse(supplier));
    }

    [HttpPost]
    public async Task<ActionResult<SupplierDetailResponse>> CreateSupplier(
        [FromBody] UpsertSupplierRequest request,
        CancellationToken cancellationToken)
    {
        var createRequest = new CreateSupplierRequest(
            request.Name,
            request.Category,
            request.Status,
            request.Country,
            request.Website,
            request.ContactName,
            request.ContactEmail,
            request.ContactPhone,
            request.Notes
        );

        var supplier = await _supplierService.CreateAsync(createRequest, cancellationToken);

        return CreatedAtAction(nameof(GetSupplier), new { id = supplier.Id }, MapToDetailResponse(supplier));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<SupplierDetailResponse>> UpdateSupplier(
        Guid id,
        [FromBody] UpsertSupplierRequest request,
        CancellationToken cancellationToken)
    {
        var updateRequest = new UpdateSupplierRequest(
            request.Name,
            request.Category,
            request.Status,
            request.Country,
            request.Website,
            request.ContactName,
            request.ContactEmail,
            request.ContactPhone,
            request.Notes
        );

        var supplier = await _supplierService.UpdateAsync(id, updateRequest, cancellationToken);

        if (supplier is null)
        {
            return NotFound();
        }

        return Ok(MapToDetailResponse(supplier));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteSupplier(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _supplierService.DeleteAsync(id, cancellationToken);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private static SupplierDetailResponse MapToDetailResponse(SupplierDto dto)
    {
        return new SupplierDetailResponse(
            dto.Id,
            dto.Name,
            dto.Category,
            dto.Status,
            dto.Country,
            dto.Website,
            dto.ContactName,
            dto.ContactEmail,
            dto.ContactPhone,
            dto.Notes
        );
    }
}
