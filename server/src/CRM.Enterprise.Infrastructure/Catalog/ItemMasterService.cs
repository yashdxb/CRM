using CRM.Enterprise.Application.Catalog;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Catalog;

public sealed class ItemMasterService : IItemMasterService
{
    private readonly CrmDbContext _dbContext;

    public ItemMasterService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ItemMasterSearchResponse> SearchAsync(ItemMasterSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.ItemMasters
            .AsNoTracking()
            .Where(item => !item.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim().ToLowerInvariant();
            query = query.Where(item =>
                item.Name.ToLower().Contains(term) ||
                item.Sku.ToLower().Contains(term) ||
                (item.Description != null && item.Description.ToLower().Contains(term)) ||
                (item.CategoryName != null && item.CategoryName.ToLower().Contains(term)));
        }

        if (!string.IsNullOrWhiteSpace(request.Category))
        {
            var category = request.Category.Trim().ToLowerInvariant();
            query = query.Where(item => item.CategoryName != null && item.CategoryName.ToLower() == category);
        }

        if (request.IsActive is not null)
        {
            query = query.Where(item => item.IsActive == request.IsActive.Value);
        }

        var total = await query.CountAsync(cancellationToken);
        var items = await query
            .OrderBy(item => item.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(item => new ItemMasterDto(item.Id, item.Sku, item.Name, item.Description, item.CategoryName, item.DefaultUom, item.IsActive, null, null))
            .ToListAsync(cancellationToken);

        await PopulateDefaultPricesAsync(items, cancellationToken);
        return new ItemMasterSearchResponse(items, total);
    }

    public async Task<ItemMasterDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.ItemMasters
            .AsNoTracking()
            .Where(item => item.Id == id && !item.IsDeleted)
            .Select(item => new ItemMasterDto(item.Id, item.Sku, item.Name, item.Description, item.CategoryName, item.DefaultUom, item.IsActive, null, null))
            .FirstOrDefaultAsync(cancellationToken);

        if (entity is null)
        {
            return null;
        }

        var list = new List<ItemMasterDto> { entity };
        await PopulateDefaultPricesAsync(list, cancellationToken);
        return list[0];
    }

    public async Task<ItemMasterDto> CreateAsync(ItemMasterUpsertRequest request, CancellationToken cancellationToken = default)
    {
        ValidateRequest(request);
        var normalizedSku = request.Sku.Trim().ToUpperInvariant();
        var hasDuplicate = await _dbContext.ItemMasters
            .AnyAsync(item => !item.IsDeleted && item.Sku.ToUpper() == normalizedSku, cancellationToken);
        if (hasDuplicate)
        {
            throw new InvalidOperationException("SKU already exists.");
        }

        var entity = new ItemMaster
        {
            Sku = normalizedSku,
            Name = request.Name.Trim(),
            Description = NormalizeOptional(request.Description),
            CategoryName = NormalizeOptional(request.CategoryName),
            DefaultUom = NormalizeOptional(request.DefaultUom),
            IsActive = request.IsActive
        };

        _dbContext.ItemMasters.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(entity.Id, cancellationToken)
            ?? throw new InvalidOperationException("Item was created but could not be loaded.");
    }

    public async Task<ItemMasterDto?> UpdateAsync(Guid id, ItemMasterUpsertRequest request, CancellationToken cancellationToken = default)
    {
        ValidateRequest(request);
        var entity = await _dbContext.ItemMasters
            .FirstOrDefaultAsync(item => item.Id == id && !item.IsDeleted, cancellationToken);
        if (entity is null)
        {
            return null;
        }

        var normalizedSku = request.Sku.Trim().ToUpperInvariant();
        var hasDuplicate = await _dbContext.ItemMasters
            .AnyAsync(item => item.Id != id && !item.IsDeleted && item.Sku.ToUpper() == normalizedSku, cancellationToken);
        if (hasDuplicate)
        {
            throw new InvalidOperationException("SKU already exists.");
        }

        entity.Sku = normalizedSku;
        entity.Name = request.Name.Trim();
        entity.Description = NormalizeOptional(request.Description);
        entity.CategoryName = NormalizeOptional(request.CategoryName);
        entity.DefaultUom = NormalizeOptional(request.DefaultUom);
        entity.IsActive = request.IsActive;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(id, cancellationToken);
    }

    public async Task<ItemMasterDto?> ToggleActiveAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.ItemMasters
            .FirstOrDefaultAsync(item => item.Id == id && !item.IsDeleted, cancellationToken);
        if (entity is null)
        {
            return null;
        }

        entity.IsActive = !entity.IsActive;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(id, cancellationToken);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.ItemMasters
            .FirstOrDefaultAsync(item => item.Id == id && !item.IsDeleted, cancellationToken);
        if (entity is null)
        {
            return false;
        }

        entity.IsDeleted = true;
        entity.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private async Task PopulateDefaultPricesAsync(List<ItemMasterDto> items, CancellationToken cancellationToken)
    {
        if (items.Count == 0)
        {
            return;
        }

        var itemIds = items.Select(item => item.Id).ToHashSet();
        var mapped = await _dbContext.PriceListItems
            .AsNoTracking()
            .Where(priceItem =>
                !priceItem.IsDeleted &&
                priceItem.IsActive &&
                itemIds.Contains(priceItem.ItemMasterId) &&
                priceItem.PriceList != null &&
                !priceItem.PriceList.IsDeleted &&
                priceItem.PriceList.Status == "Active")
            .Select(priceItem => new
            {
                priceItem.ItemMasterId,
                priceItem.UnitPrice,
                PriceListName = priceItem.PriceList!.Name,
                ValidFrom = priceItem.PriceList!.ValidFrom,
                PriceListCreatedAtUtc = priceItem.PriceList!.CreatedAtUtc,
                PriceItemCreatedAtUtc = priceItem.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var defaults = mapped
            .GroupBy(item => item.ItemMasterId)
            .ToDictionary(
                group => group.Key,
                group => group
                    .OrderByDescending(item => item.ValidFrom ?? DateTime.MinValue)
                    .ThenByDescending(item => item.PriceListCreatedAtUtc)
                    .ThenByDescending(item => item.PriceItemCreatedAtUtc)
                    .First());

        for (var index = 0; index < items.Count; index++)
        {
            var item = items[index];
            if (!defaults.TryGetValue(item.Id, out var price))
            {
                continue;
            }

            items[index] = item with
            {
                DefaultUnitPrice = price.UnitPrice,
                DefaultPriceListName = price.PriceListName
            };
        }
    }

    private static void ValidateRequest(ItemMasterUpsertRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Sku))
        {
            throw new InvalidOperationException("SKU is required.");
        }

        if (request.Sku.Trim().Length > 60)
        {
            throw new InvalidOperationException("SKU must be 60 characters or fewer.");
        }

        if (string.IsNullOrWhiteSpace(request.Name))
        {
            throw new InvalidOperationException("Name is required.");
        }

        if (request.Name.Trim().Length > 200)
        {
            throw new InvalidOperationException("Name must be 200 characters or fewer.");
        }
    }

    private static string? NormalizeOptional(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return value.Trim();
    }
}
