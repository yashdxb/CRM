using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class DealSegmentLookupService : IDealSegmentLookupService
{
    private readonly CrmDbContext _db;

    public DealSegmentLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<DealSegmentLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.DealSegments.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new DealSegmentLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<DealSegmentLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.DealSegments.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new DealSegmentLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<DealSegmentLookupDto> CreateAsync(UpsertDealSegmentRequest request, CancellationToken ct = default)
    {
        var entity = new DealSegmentDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.DealSegments.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new DealSegmentLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<DealSegmentLookupDto?> UpdateAsync(Guid id, UpsertDealSegmentRequest request, CancellationToken ct = default)
    {
        var entity = await _db.DealSegments.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new DealSegmentLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.DealSegments.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.DealSegments.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
