using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class ContactBuyingRoleLookupService : IContactBuyingRoleLookupService
{
    private readonly CrmDbContext _db;

    public ContactBuyingRoleLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<ContactBuyingRoleLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.ContactBuyingRoles.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new ContactBuyingRoleLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<ContactBuyingRoleLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.ContactBuyingRoles.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new ContactBuyingRoleLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<ContactBuyingRoleLookupDto> CreateAsync(UpsertContactBuyingRoleRequest request, CancellationToken ct = default)
    {
        var entity = new ContactBuyingRoleDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.ContactBuyingRoles.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new ContactBuyingRoleLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<ContactBuyingRoleLookupDto?> UpdateAsync(Guid id, UpsertContactBuyingRoleRequest request, CancellationToken ct = default)
    {
        var entity = await _db.ContactBuyingRoles.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new ContactBuyingRoleLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.ContactBuyingRoles.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.ContactBuyingRoles.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
