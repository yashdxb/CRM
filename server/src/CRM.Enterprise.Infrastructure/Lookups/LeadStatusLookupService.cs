using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class LeadStatusLookupService : ILeadStatusLookupService
{
    private readonly CrmDbContext _db;

    public LeadStatusLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<LeadStatusDto>> GetAllAsync(CancellationToken ct = default) =>
        await _db.LeadStatuses.AsNoTracking()
            .Where(x => !x.IsDeleted)
            .OrderBy(x => x.Order)
            .Select(x => new LeadStatusDto(x.Id, x.Name, x.Order, x.IsDefault, x.IsClosed))
            .ToListAsync(ct);

    public async Task<LeadStatusDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.LeadStatuses.AsNoTracking()
            .Where(x => x.Id == id && !x.IsDeleted)
            .Select(x => new LeadStatusDto(x.Id, x.Name, x.Order, x.IsDefault, x.IsClosed))
            .FirstOrDefaultAsync(ct);

    public async Task<LeadStatusDto> CreateAsync(UpsertLeadStatusRequest request, CancellationToken ct = default)
    {
        var entity = new LeadStatus
        {
            Name = request.Name,
            Order = request.Order,
            IsDefault = request.IsDefault,
            IsClosed = request.IsClosed
        };

        if (request.IsDefault)
            await ClearDefaultAsync(ct);

        _db.LeadStatuses.Add(entity);
        await _db.SaveChangesAsync(ct);

        return new LeadStatusDto(entity.Id, entity.Name, entity.Order, entity.IsDefault, entity.IsClosed);
    }

    public async Task<LeadStatusDto?> UpdateAsync(Guid id, UpsertLeadStatusRequest request, CancellationToken ct = default)
    {
        var entity = await _db.LeadStatuses.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);
        if (entity is null) return null;

        if (request.IsDefault && !entity.IsDefault)
            await ClearDefaultAsync(ct);

        entity.Name = request.Name;
        entity.Order = request.Order;
        entity.IsDefault = request.IsDefault;
        entity.IsClosed = request.IsClosed;

        await _db.SaveChangesAsync(ct);
        return new LeadStatusDto(entity.Id, entity.Name, entity.Order, entity.IsDefault, entity.IsClosed);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.LeadStatuses
            .Include(x => x.Leads)
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);
        if (entity is null) return false;

        if (entity.Leads.Any(l => !l.IsDeleted))
            return false; // cannot delete a status that is in use

        entity.IsDeleted = true;
        entity.DeletedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<bool> ReorderAsync(IReadOnlyList<Guid> orderedIds, CancellationToken ct = default)
    {
        var entities = await _db.LeadStatuses.Where(x => !x.IsDeleted).ToListAsync(ct);
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
        var defaults = await _db.LeadStatuses.Where(x => x.IsDefault && !x.IsDeleted).ToListAsync(ct);
        foreach (var d in defaults) d.IsDefault = false;
    }
}
