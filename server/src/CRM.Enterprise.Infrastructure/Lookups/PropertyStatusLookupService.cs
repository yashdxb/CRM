using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class PropertyStatusLookupService : IPropertyStatusLookupService
{
    private readonly CrmDbContext _db;

    public PropertyStatusLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<PropertyStatusLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.PropertyStatuses.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new PropertyStatusLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<PropertyStatusLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.PropertyStatuses.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new PropertyStatusLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<PropertyStatusLookupDto> CreateAsync(UpsertPropertyStatusRequest request, CancellationToken ct = default)
    {
        var entity = new PropertyStatusDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.PropertyStatuses.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new PropertyStatusLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<PropertyStatusLookupDto?> UpdateAsync(Guid id, UpsertPropertyStatusRequest request, CancellationToken ct = default)
    {
        var entity = await _db.PropertyStatuses.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new PropertyStatusLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.PropertyStatuses.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.PropertyStatuses.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
