using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class CadenceChannelLookupService : ICadenceChannelLookupService
{
    private readonly CrmDbContext _db;

    public CadenceChannelLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<CadenceChannelDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.LeadCadenceChannels.AsNoTracking()
            .Where(x => !x.IsDeleted && (includeInactive || x.IsActive))
            .OrderBy(x => x.Order)
            .Select(x => new CadenceChannelDto(x.Id, x.Name, x.Order, x.IsActive, x.IsDefault))
            .ToListAsync(ct);

    public async Task<CadenceChannelDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.LeadCadenceChannels.AsNoTracking()
            .Where(x => x.Id == id && !x.IsDeleted)
            .Select(x => new CadenceChannelDto(x.Id, x.Name, x.Order, x.IsActive, x.IsDefault))
            .FirstOrDefaultAsync(ct);

    public async Task<CadenceChannelDto> CreateAsync(UpsertCadenceChannelRequest request, CancellationToken ct = default)
    {
        if (request.IsDefault)
            await ClearDefaultAsync(ct);

        var entity = new LeadCadenceChannel
        {
            Name = request.Name,
            Order = request.Order,
            IsActive = request.IsActive,
            IsDefault = request.IsDefault
        };
        _db.LeadCadenceChannels.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new CadenceChannelDto(entity.Id, entity.Name, entity.Order, entity.IsActive, entity.IsDefault);
    }

    public async Task<CadenceChannelDto?> UpdateAsync(Guid id, UpsertCadenceChannelRequest request, CancellationToken ct = default)
    {
        var entity = await _db.LeadCadenceChannels.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);
        if (entity is null) return null;

        if (request.IsDefault && !entity.IsDefault)
            await ClearDefaultAsync(ct);

        entity.Name = request.Name;
        entity.Order = request.Order;
        entity.IsActive = request.IsActive;
        entity.IsDefault = request.IsDefault;

        await _db.SaveChangesAsync(ct);
        return new CadenceChannelDto(entity.Id, entity.Name, entity.Order, entity.IsActive, entity.IsDefault);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.LeadCadenceChannels.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);
        if (entity is null) return false;

        entity.IsDeleted = true;
        entity.DeletedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<bool> ReorderAsync(IReadOnlyList<Guid> orderedIds, CancellationToken ct = default)
    {
        var entities = await _db.LeadCadenceChannels.Where(x => !x.IsDeleted).ToListAsync(ct);
        for (var i = 0; i < orderedIds.Count; i++)
        {
            var entity = entities.FirstOrDefault(x => x.Id == orderedIds[i]);
            if (entity is not null) entity.Order = i;
        }
        await _db.SaveChangesAsync(ct);
        return true;
    }

    private async Task ClearDefaultAsync(CancellationToken ct)
    {
        var defaults = await _db.LeadCadenceChannels.Where(x => x.IsDefault && !x.IsDeleted).ToListAsync(ct);
        foreach (var d in defaults) d.IsDefault = false;
    }
}
