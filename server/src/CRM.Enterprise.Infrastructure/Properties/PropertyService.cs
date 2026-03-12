using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Properties;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Properties;

public sealed class PropertyService : IPropertyService
{
    private readonly CrmDbContext _dbContext;

    public PropertyService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PropertySearchResultDto> SearchAsync(PropertySearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Properties
            .Include(p => p.Account)
            .Include(p => p.PrimaryContact)
            .AsNoTracking()
            .Where(p => !p.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(p =>
                p.Address.ToLower().Contains(term) ||
                (p.MlsNumber ?? string.Empty).ToLower().Contains(term) ||
                (p.City ?? string.Empty).ToLower().Contains(term) ||
                (p.Neighborhood ?? string.Empty).ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(request.Status) && Enum.TryParse<PropertyStatus>(request.Status, true, out var statusFilter))
        {
            query = query.Where(p => p.Status == statusFilter);
        }

        if (!string.IsNullOrWhiteSpace(request.PropertyType) && Enum.TryParse<PropertyType>(request.PropertyType, true, out var typeFilter))
        {
            query = query.Where(p => p.PropertyType == typeFilter);
        }

        if (!string.IsNullOrWhiteSpace(request.City))
        {
            var city = request.City.ToLower();
            query = query.Where(p => (p.City ?? string.Empty).ToLower().Contains(city));
        }

        var total = await query.CountAsync(cancellationToken);

        var sortedQuery = (request.SortBy ?? "newest").Trim().ToLowerInvariant() switch
        {
            "price_asc" => query.OrderBy(p => p.ListPrice).ThenByDescending(p => p.CreatedAtUtc),
            "price_desc" => query.OrderByDescending(p => p.ListPrice).ThenByDescending(p => p.CreatedAtUtc),
            "address" => query.OrderBy(p => p.Address).ThenByDescending(p => p.CreatedAtUtc),
            _ => query.OrderByDescending(p => p.CreatedAtUtc)
        };

        var items = await sortedQuery
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new
            {
                p.Id,
                p.MlsNumber,
                p.Address,
                p.City,
                p.Province,
                p.PostalCode,
                p.ListPrice,
                p.SalePrice,
                p.Currency,
                p.ListingDateUtc,
                p.SoldDateUtc,
                Status = p.Status.ToString(),
                PropertyType = p.PropertyType.ToString(),
                p.Bedrooms,
                p.Bathrooms,
                p.SquareFeet,
                p.LotSizeSqFt,
                p.YearBuilt,
                p.GarageSpaces,
                p.Description,
                p.Features,
                p.PhotoUrls,
                p.VirtualTourUrl,
                p.OwnerId,
                p.AccountId,
                AccountName = p.Account != null ? p.Account.Name : null,
                p.PrimaryContactId,
                PrimaryContactName = p.PrimaryContact != null
                    ? (p.PrimaryContact.FirstName + " " + p.PrimaryContact.LastName)
                    : null,
                p.OpportunityId,
                p.Neighborhood,
                p.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var ownerIds = items.Select(i => i.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var result = items.Select(i =>
        {
            var ownerName = owners.FirstOrDefault(o => o.Id == i.OwnerId)?.FullName ?? "Unassigned";
            return new PropertyListItemDto(
                i.Id,
                i.MlsNumber,
                i.Address,
                i.City,
                i.Province,
                i.PostalCode,
                i.ListPrice,
                i.SalePrice,
                i.Currency,
                i.ListingDateUtc,
                i.SoldDateUtc,
                i.Status,
                i.PropertyType,
                i.Bedrooms,
                i.Bathrooms,
                i.SquareFeet,
                i.LotSizeSqFt,
                i.YearBuilt,
                i.GarageSpaces,
                i.Description,
                i.Features,
                i.PhotoUrls,
                i.VirtualTourUrl,
                i.OwnerId,
                ownerName,
                i.AccountId,
                i.AccountName,
                i.PrimaryContactId,
                i.PrimaryContactName,
                i.OpportunityId,
                i.Neighborhood,
                i.CreatedAtUtc);
        }).ToList();

        return new PropertySearchResultDto(result, total);
    }

    public async Task<PropertyListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var property = await _dbContext.Properties
            .Include(p => p.Account)
            .Include(p => p.PrimaryContact)
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);

        if (property is null)
            return null;

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == property.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        return new PropertyListItemDto(
            property.Id,
            property.MlsNumber,
            property.Address,
            property.City,
            property.Province,
            property.PostalCode,
            property.ListPrice,
            property.SalePrice,
            property.Currency,
            property.ListingDateUtc,
            property.SoldDateUtc,
            property.Status.ToString(),
            property.PropertyType.ToString(),
            property.Bedrooms,
            property.Bathrooms,
            property.SquareFeet,
            property.LotSizeSqFt,
            property.YearBuilt,
            property.GarageSpaces,
            property.Description,
            property.Features,
            property.PhotoUrls,
            property.VirtualTourUrl,
            property.OwnerId,
            ownerName,
            property.AccountId,
            property.Account?.Name,
            property.PrimaryContactId,
            property.PrimaryContact != null
                ? (property.PrimaryContact.FirstName + " " + property.PrimaryContact.LastName)
                : null,
            property.OpportunityId,
            property.Neighborhood,
            property.CreatedAtUtc);
    }

    public async Task<PropertyOperationResult<PropertyListItemDto>> CreateAsync(PropertyUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var ownerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);

        var property = new Property
        {
            MlsNumber = request.MlsNumber,
            Address = request.Address,
            City = request.City,
            Province = request.Province,
            PostalCode = request.PostalCode,
            Country = request.Country,
            ListPrice = request.ListPrice,
            SalePrice = request.SalePrice,
            Currency = request.Currency ?? "CAD",
            ListingDateUtc = request.ListingDateUtc,
            SoldDateUtc = request.SoldDateUtc,
            Status = ParseStatus(request.Status),
            PropertyType = ParsePropertyType(request.PropertyType),
            Bedrooms = request.Bedrooms,
            Bathrooms = request.Bathrooms,
            SquareFeet = request.SquareFeet,
            LotSizeSqFt = request.LotSizeSqFt,
            YearBuilt = request.YearBuilt,
            GarageSpaces = request.GarageSpaces,
            Description = request.Description,
            Features = request.Features,
            PhotoUrls = request.PhotoUrls,
            VirtualTourUrl = request.VirtualTourUrl,
            OwnerId = ownerId,
            AccountId = request.AccountId,
            PrimaryContactId = request.PrimaryContactId,
            OpportunityId = request.OpportunityId,
            Neighborhood = request.Neighborhood,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Properties.Add(property);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = await GetAsync(property.Id, cancellationToken);
        return PropertyOperationResult<PropertyListItemDto>.Ok(dto!);
    }

    public async Task<PropertyOperationResult<bool>> UpdateAsync(Guid id, PropertyUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var property = await _dbContext.Properties.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);
        if (property is null)
            return PropertyOperationResult<bool>.NotFoundResult();

        property.MlsNumber = request.MlsNumber;
        property.Address = request.Address;
        property.City = request.City;
        property.Province = request.Province;
        property.PostalCode = request.PostalCode;
        property.Country = request.Country;
        property.ListPrice = request.ListPrice;
        property.SalePrice = request.SalePrice;
        property.Currency = request.Currency ?? property.Currency;
        property.ListingDateUtc = request.ListingDateUtc;
        property.SoldDateUtc = request.SoldDateUtc;
        property.Status = ParseStatus(request.Status);
        property.PropertyType = ParsePropertyType(request.PropertyType);
        property.Bedrooms = request.Bedrooms;
        property.Bathrooms = request.Bathrooms;
        property.SquareFeet = request.SquareFeet;
        property.LotSizeSqFt = request.LotSizeSqFt;
        property.YearBuilt = request.YearBuilt;
        property.GarageSpaces = request.GarageSpaces;
        property.Description = request.Description;
        property.Features = request.Features;
        property.PhotoUrls = request.PhotoUrls;
        property.VirtualTourUrl = request.VirtualTourUrl;
        property.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        property.AccountId = request.AccountId;
        property.PrimaryContactId = request.PrimaryContactId;
        property.OpportunityId = request.OpportunityId;
        property.Neighborhood = request.Neighborhood;
        property.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return PropertyOperationResult<bool>.Ok(true);
    }

    public async Task<PropertyOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var property = await _dbContext.Properties.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);
        if (property is null)
            return PropertyOperationResult<bool>.NotFoundResult();

        property.IsDeleted = true;
        property.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return PropertyOperationResult<bool>.Ok(true);
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, ActorContext actor, CancellationToken cancellationToken)
    {
        if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
        {
            var exists = await _dbContext.Users.AnyAsync(u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted, cancellationToken);
            if (exists)
                return requestedOwnerId.Value;
        }

        if (actor.UserId.HasValue && actor.UserId.Value != Guid.Empty)
            return actor.UserId.Value;

        var fallbackUserId = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallbackUserId == Guid.Empty ? Guid.NewGuid() : fallbackUserId;
    }

    private static PropertyStatus ParseStatus(string? status)
    {
        if (string.IsNullOrWhiteSpace(status))
            return PropertyStatus.Draft;
        return Enum.TryParse<PropertyStatus>(status, true, out var result) ? result : PropertyStatus.Draft;
    }

    private static PropertyType ParsePropertyType(string? propertyType)
    {
        if (string.IsNullOrWhiteSpace(propertyType))
            return PropertyType.Detached;
        return Enum.TryParse<PropertyType>(propertyType, true, out var result) ? result : PropertyType.Detached;
    }
}
