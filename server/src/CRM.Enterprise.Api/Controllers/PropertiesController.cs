using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Properties;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Properties;
using CRM.Enterprise.Application.Tenants;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ApiUpsertPropertyRequest = CRM.Enterprise.Api.Contracts.Properties.UpsertPropertyRequest;
using AppPropertyUpsertRequest = CRM.Enterprise.Application.Properties.PropertyUpsertRequest;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.PropertiesView)]
[ApiController]
[Route("api/properties")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ITenantProvider _tenantProvider;

    public PropertiesController(
        IPropertyService propertyService,
        ICrmRealtimePublisher realtimePublisher,
        ITenantProvider tenantProvider)
    {
        _propertyService = propertyService;
        _realtimePublisher = realtimePublisher;
        _tenantProvider = tenantProvider;
    }

    [HttpGet]
    public async Task<ActionResult<PropertySearchResponse>> GetProperties(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? propertyType,
        [FromQuery] string? city,
        [FromQuery] string? sortBy,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var result = await _propertyService.SearchAsync(
            new PropertySearchRequest(search, status, propertyType, city, sortBy, page, pageSize),
            cancellationToken);
        var items = result.Items.Select(ToApiItem);
        return Ok(new PropertySearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PropertyListItem>> GetProperty(Guid id, CancellationToken cancellationToken)
    {
        var property = await _propertyService.GetAsync(id, cancellationToken);
        if (property is null) return NotFound();
        return Ok(ToApiItem(property));
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<PropertyListItem>> Create([FromBody] ApiUpsertPropertyRequest request, CancellationToken cancellationToken)
    {
        var result = await _propertyService.CreateAsync(MapUpsertRequest(request), GetActor(), cancellationToken);
        if (!result.Success)
        {
            return BadRequest(result.Error);
        }

        await PublishPropertyRealtimeAsync("created", result.Value!.Id, cancellationToken);
        return CreatedAtAction(nameof(GetProperty), new { id = result.Value!.Id }, ToApiItem(result.Value!));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<IActionResult> Update(Guid id, [FromBody] ApiUpsertPropertyRequest request, CancellationToken cancellationToken)
    {
        var result = await _propertyService.UpdateAsync(id, MapUpsertRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishPropertyRealtimeAsync("updated", id, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var result = await _propertyService.DeleteAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishPropertyRealtimeAsync("deleted", id, cancellationToken);
        return NoContent();
    }

    private static PropertyListItem ToApiItem(PropertyListItemDto dto)
    {
        return new PropertyListItem(
            dto.Id,
            dto.MlsNumber,
            dto.Address,
            dto.City,
            dto.Province,
            dto.PostalCode,
            dto.ListPrice,
            dto.SalePrice,
            dto.Currency,
            dto.ListingDateUtc,
            dto.SoldDateUtc,
            dto.Status,
            dto.PropertyType,
            dto.Bedrooms,
            dto.Bathrooms,
            dto.SquareFeet,
            dto.LotSizeSqFt,
            dto.YearBuilt,
            dto.GarageSpaces,
            dto.Description,
            dto.Features,
            dto.PhotoUrls,
            dto.VirtualTourUrl,
            dto.OwnerId,
            dto.OwnerName,
            dto.AccountId,
            dto.AccountName,
            dto.PrimaryContactId,
            dto.PrimaryContactName,
            dto.OpportunityId,
            dto.Neighborhood,
            dto.CreatedAtUtc);
    }

    private static AppPropertyUpsertRequest MapUpsertRequest(ApiUpsertPropertyRequest request)
    {
        return new AppPropertyUpsertRequest(
            request.MlsNumber,
            request.Address,
            request.City,
            request.Province,
            request.PostalCode,
            null,
            request.ListPrice,
            request.SalePrice,
            request.Currency,
            request.ListingDateUtc,
            request.SoldDateUtc,
            request.Status,
            request.PropertyType,
            request.Bedrooms,
            request.Bathrooms,
            request.SquareFeet,
            request.LotSizeSqFt,
            request.YearBuilt,
            request.GarageSpaces,
            request.Description,
            request.Features,
            request.PhotoUrls,
            request.VirtualTourUrl,
            request.OwnerId,
            request.AccountId,
            request.PrimaryContactId,
            request.OpportunityId,
            request.Neighborhood);
    }

    private ActorContext GetActor()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var name = User.FindFirstValue(ClaimTypes.Name);
        var parsed = Guid.TryParse(id, out var value) ? value : (Guid?)null;
        return new ActorContext(parsed, name);
    }

    private Task PublishPropertyRealtimeAsync(string action, Guid propertyId, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "entity.crud.changed",
            new
            {
                entityType = "Property",
                entityId = propertyId,
                action,
                changedFields = Array.Empty<string>(),
                actorUserId = GetActor().UserId,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);
    }
}
