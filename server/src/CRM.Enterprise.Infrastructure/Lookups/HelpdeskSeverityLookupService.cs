using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class HelpdeskSeverityLookupService : IHelpdeskSeverityLookupService
{
    private readonly CrmDbContext _db;

    public HelpdeskSeverityLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<HelpdeskSeverityLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.HelpdeskSeverities.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new HelpdeskSeverityLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<HelpdeskSeverityLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.HelpdeskSeverities.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new HelpdeskSeverityLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<HelpdeskSeverityLookupDto> CreateAsync(UpsertHelpdeskSeverityRequest request, CancellationToken ct = default)
    {
        var entity = new HelpdeskSeverityDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.HelpdeskSeverities.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new HelpdeskSeverityLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<HelpdeskSeverityLookupDto?> UpdateAsync(Guid id, UpsertHelpdeskSeverityRequest request, CancellationToken ct = default)
    {
        var entity = await _db.HelpdeskSeverities.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new HelpdeskSeverityLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.HelpdeskSeverities.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.HelpdeskSeverities.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
