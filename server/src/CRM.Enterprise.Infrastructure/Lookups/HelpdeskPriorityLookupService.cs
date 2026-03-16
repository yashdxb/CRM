using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class HelpdeskPriorityLookupService : IHelpdeskPriorityLookupService
{
    private readonly CrmDbContext _db;

    public HelpdeskPriorityLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<HelpdeskPriorityLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.HelpdeskPriorities.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new HelpdeskPriorityLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<HelpdeskPriorityLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.HelpdeskPriorities.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new HelpdeskPriorityLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<HelpdeskPriorityLookupDto> CreateAsync(UpsertHelpdeskPriorityRequest request, CancellationToken ct = default)
    {
        var entity = new HelpdeskPriorityDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.HelpdeskPriorities.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new HelpdeskPriorityLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<HelpdeskPriorityLookupDto?> UpdateAsync(Guid id, UpsertHelpdeskPriorityRequest request, CancellationToken ct = default)
    {
        var entity = await _db.HelpdeskPriorities.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new HelpdeskPriorityLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.HelpdeskPriorities.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.HelpdeskPriorities.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
