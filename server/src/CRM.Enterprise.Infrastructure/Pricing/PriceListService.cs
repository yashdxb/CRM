using CRM.Enterprise.Application.Pricing;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Pricing;

public sealed class PriceListService : IPriceListService
{
    private readonly CrmDbContext _dbContext;

    public PriceListService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PriceListSearchResponse> SearchAsync(PriceListSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.PriceLists
            .AsNoTracking()
            .Where(p => !p.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim().ToLower();
            query = query.Where(p => p.Name.ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            query = query.Where(p => p.Status == request.Status);
        }

        if (!string.IsNullOrWhiteSpace(request.Currency))
        {
            query = query.Where(p => p.Currency == request.Currency);
        }

        var total = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderBy(p => p.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new PriceListListItemDto(
                p.Id,
                p.Name,
                p.Currency,
                p.Status,
                p.ValidFrom,
                p.ValidTo,
                p.Items.Count(i => !i.IsDeleted)))
            .ToListAsync(cancellationToken);

        return new PriceListSearchResponse(items, total);
    }

    public async Task<PriceListDetailDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var priceList = await _dbContext.PriceLists
            .AsNoTracking()
            .Include(p => p.Items)
            .ThenInclude(i => i.ItemMaster)
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);

        return priceList is null ? null : MapToDetail(priceList);
    }

    public async Task<PriceListDetailDto> CreateAsync(CreatePriceListRequest request, CancellationToken cancellationToken = default)
    {
        var priceList = new PriceList
        {
            Name = request.Name.Trim(),
            Currency = request.Currency.Trim(),
            Status = request.Status.Trim(),
            ValidFrom = request.ValidFrom,
            ValidTo = request.ValidTo,
            Notes = request.Notes?.Trim()
        };

        foreach (var item in request.Items)
        {
            priceList.Items.Add(new PriceListItem
            {
                ItemMasterId = item.ItemMasterId,
                Uom = item.Uom?.Trim(),
                UnitPrice = item.UnitPrice,
                MinQty = item.MinQty,
                MaxQty = item.MaxQty,
                LeadTimeDays = item.LeadTimeDays,
                IsActive = item.IsActive
            });
        }

        _dbContext.PriceLists.Add(priceList);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(priceList.Id, cancellationToken)
            ?? MapToDetail(priceList);
    }

    public async Task<PriceListDetailDto?> UpdateAsync(Guid id, UpdatePriceListRequest request, CancellationToken cancellationToken = default)
    {
        var priceList = await _dbContext.PriceLists
            .Include(p => p.Items)
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);

        if (priceList is null)
        {
            return null;
        }

        priceList.Name = request.Name.Trim();
        priceList.Currency = request.Currency.Trim();
        priceList.Status = request.Status.Trim();
        priceList.ValidFrom = request.ValidFrom;
        priceList.ValidTo = request.ValidTo;
        priceList.Notes = request.Notes?.Trim();

        priceList.Items.Clear();
        foreach (var item in request.Items)
        {
            priceList.Items.Add(new PriceListItem
            {
                ItemMasterId = item.ItemMasterId,
                Uom = item.Uom?.Trim(),
                UnitPrice = item.UnitPrice,
                MinQty = item.MinQty,
                MaxQty = item.MaxQty,
                LeadTimeDays = item.LeadTimeDays,
                IsActive = item.IsActive
            });
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(priceList.Id, cancellationToken);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var priceList = await _dbContext.PriceLists
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted, cancellationToken);

        if (priceList is null)
        {
            return false;
        }

        priceList.IsDeleted = true;
        priceList.DeletedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static PriceListDetailDto MapToDetail(PriceList priceList)
    {
        var items = priceList.Items
            .Where(i => !i.IsDeleted)
            .Select(i => new PriceListItemDto(
                i.Id,
                i.ItemMasterId,
                i.ItemMaster?.Name,
                i.Uom,
                i.UnitPrice,
                i.MinQty,
                i.MaxQty,
                i.LeadTimeDays,
                i.IsActive))
            .ToList();

        return new PriceListDetailDto(
            priceList.Id,
            priceList.Name,
            priceList.Currency,
            priceList.Status,
            priceList.ValidFrom,
            priceList.ValidTo,
            priceList.Notes,
            items);
    }
}
