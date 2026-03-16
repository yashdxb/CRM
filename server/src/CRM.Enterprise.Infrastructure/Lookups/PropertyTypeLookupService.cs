using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class PropertyTypeLookupService : IPropertyTypeLookupService
{
    private readonly CrmDbContext _db;

    public PropertyTypeLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<PropertyTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.PropertyTypes.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new PropertyTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<PropertyTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.PropertyTypes.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new PropertyTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<PropertyTypeLookupDto> CreateAsync(UpsertPropertyTypeRequest request, CancellationToken ct = default)
    {
        var entity = new PropertyTypeDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.PropertyTypes.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new PropertyTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<PropertyTypeLookupDto?> UpdateAsync(Guid id, UpsertPropertyTypeRequest request, CancellationToken ct = default)
    {
        var entity = await _db.PropertyTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new PropertyTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.PropertyTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.PropertyTypes.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
