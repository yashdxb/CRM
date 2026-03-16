using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class ActivityTypeLookupService : IActivityTypeLookupService
{
    private readonly CrmDbContext _db;

    public ActivityTypeLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<ActivityTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.ActivityTypes.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new ActivityTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<ActivityTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.ActivityTypes.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new ActivityTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<ActivityTypeLookupDto> CreateAsync(UpsertActivityTypeRequest request, CancellationToken ct = default)
    {
        var entity = new ActivityTypeDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.ActivityTypes.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new ActivityTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<ActivityTypeLookupDto?> UpdateAsync(Guid id, UpsertActivityTypeRequest request, CancellationToken ct = default)
    {
        var entity = await _db.ActivityTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new ActivityTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.ActivityTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.ActivityTypes.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
