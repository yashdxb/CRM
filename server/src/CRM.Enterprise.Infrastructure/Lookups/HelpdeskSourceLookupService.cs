using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class HelpdeskSourceLookupService : IHelpdeskSourceLookupService
{
    private readonly CrmDbContext _db;

    public HelpdeskSourceLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<HelpdeskSourceLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.HelpdeskSources.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new HelpdeskSourceLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<HelpdeskSourceLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.HelpdeskSources.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new HelpdeskSourceLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<HelpdeskSourceLookupDto> CreateAsync(UpsertHelpdeskSourceRequest request, CancellationToken ct = default)
    {
        var entity = new HelpdeskSourceDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.HelpdeskSources.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new HelpdeskSourceLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<HelpdeskSourceLookupDto?> UpdateAsync(Guid id, UpsertHelpdeskSourceRequest request, CancellationToken ct = default)
    {
        var entity = await _db.HelpdeskSources.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new HelpdeskSourceLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.HelpdeskSources.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.HelpdeskSources.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
