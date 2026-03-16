using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class CurrencyLookupService : ICurrencyLookupService
{
    private readonly CrmDbContext _db;

    public CurrencyLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<CurrencyLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.Currencies.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Code)
            .Select(x => new CurrencyLookupDto(x.Id, x.Code, x.Name, x.Symbol, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<CurrencyLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.Currencies.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new CurrencyLookupDto(x.Id, x.Code, x.Name, x.Symbol, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<CurrencyLookupDto> CreateAsync(UpsertCurrencyRequest request, CancellationToken ct = default)
    {
        var entity = new CurrencyDefinition
        {
            Code = request.Code,
            Name = request.Name,
            Symbol = request.Symbol,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.Currencies.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new CurrencyLookupDto(entity.Id, entity.Code, entity.Name, entity.Symbol, entity.IsActive, entity.SortOrder);
    }

    public async Task<CurrencyLookupDto?> UpdateAsync(Guid id, UpsertCurrencyRequest request, CancellationToken ct = default)
    {
        var entity = await _db.Currencies.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.Symbol = request.Symbol;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new CurrencyLookupDto(entity.Id, entity.Code, entity.Name, entity.Symbol, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.Currencies.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.Currencies.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
