using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class PhoneTypeLookupService : IPhoneTypeLookupService
{
    private readonly CrmDbContext _db;

    public PhoneTypeLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<PhoneTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.PhoneTypes.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new PhoneTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder, x.IsDefault))
            .ToListAsync(ct);

    public async Task<PhoneTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.PhoneTypes.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new PhoneTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder, x.IsDefault))
            .FirstOrDefaultAsync(ct);

    public async Task<PhoneTypeLookupDto> CreateAsync(UpsertPhoneTypeRequest request, CancellationToken ct = default)
    {
        if (request.IsDefault)
            await ClearDefaultAsync(ct);

        var entity = new PhoneTypeDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder,
            IsDefault = request.IsDefault
        };
        _db.PhoneTypes.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new PhoneTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder, entity.IsDefault);
    }

    public async Task<PhoneTypeLookupDto?> UpdateAsync(Guid id, UpsertPhoneTypeRequest request, CancellationToken ct = default)
    {
        var entity = await _db.PhoneTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        if (request.IsDefault && !entity.IsDefault)
            await ClearDefaultAsync(ct);

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;
        entity.IsDefault = request.IsDefault;

        await _db.SaveChangesAsync(ct);
        return new PhoneTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder, entity.IsDefault);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.PhoneTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.PhoneTypes.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }

    private async Task ClearDefaultAsync(CancellationToken ct)
    {
        var defaults = await _db.PhoneTypes.Where(x => x.IsDefault).ToListAsync(ct);
        foreach (var d in defaults) d.IsDefault = false;
    }
}
