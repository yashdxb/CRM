using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class ActivityPriorityLookupService : IActivityPriorityLookupService
{
    private readonly CrmDbContext _db;

    public ActivityPriorityLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<ActivityPriorityLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.ActivityPriorities.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new ActivityPriorityLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<ActivityPriorityLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.ActivityPriorities.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new ActivityPriorityLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<ActivityPriorityLookupDto> CreateAsync(UpsertActivityPriorityRequest request, CancellationToken ct = default)
    {
        var entity = new ActivityPriorityDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.ActivityPriorities.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new ActivityPriorityLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<ActivityPriorityLookupDto?> UpdateAsync(Guid id, UpsertActivityPriorityRequest request, CancellationToken ct = default)
    {
        var entity = await _db.ActivityPriorities.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new ActivityPriorityLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.ActivityPriorities.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.ActivityPriorities.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
