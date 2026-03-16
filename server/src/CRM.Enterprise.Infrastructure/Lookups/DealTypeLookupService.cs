using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class DealTypeLookupService : IDealTypeLookupService
{
    private readonly CrmDbContext _db;

    public DealTypeLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<DealTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.DealTypes.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new DealTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<DealTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.DealTypes.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new DealTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<DealTypeLookupDto> CreateAsync(UpsertDealTypeRequest request, CancellationToken ct = default)
    {
        var entity = new DealTypeDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.DealTypes.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new DealTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<DealTypeLookupDto?> UpdateAsync(Guid id, UpsertDealTypeRequest request, CancellationToken ct = default)
    {
        var entity = await _db.DealTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new DealTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.DealTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.DealTypes.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
