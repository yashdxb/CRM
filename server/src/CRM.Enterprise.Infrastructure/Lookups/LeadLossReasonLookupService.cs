using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class LeadLossReasonLookupService : ILeadLossReasonLookupService
{
    private readonly CrmDbContext _db;

    public LeadLossReasonLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<LeadLossReasonLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.LeadLossReasons.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new LeadLossReasonLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<LeadLossReasonLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.LeadLossReasons.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new LeadLossReasonLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<LeadLossReasonLookupDto> CreateAsync(UpsertLeadLossReasonRequest request, CancellationToken ct = default)
    {
        var entity = new LeadLossReasonDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.LeadLossReasons.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new LeadLossReasonLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<LeadLossReasonLookupDto?> UpdateAsync(Guid id, UpsertLeadLossReasonRequest request, CancellationToken ct = default)
    {
        var entity = await _db.LeadLossReasons.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new LeadLossReasonLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.LeadLossReasons.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.LeadLossReasons.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
