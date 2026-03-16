using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class LeadDisqualificationReasonLookupService : ILeadDisqualificationReasonLookupService
{
    private readonly CrmDbContext _db;

    public LeadDisqualificationReasonLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<LeadDisqualificationReasonLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.LeadDisqualificationReasons.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new LeadDisqualificationReasonLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<LeadDisqualificationReasonLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.LeadDisqualificationReasons.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new LeadDisqualificationReasonLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<LeadDisqualificationReasonLookupDto> CreateAsync(UpsertLeadDisqualificationReasonRequest request, CancellationToken ct = default)
    {
        var entity = new LeadDisqualificationReasonDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.LeadDisqualificationReasons.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new LeadDisqualificationReasonLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<LeadDisqualificationReasonLookupDto?> UpdateAsync(Guid id, UpsertLeadDisqualificationReasonRequest request, CancellationToken ct = default)
    {
        var entity = await _db.LeadDisqualificationReasons.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new LeadDisqualificationReasonLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.LeadDisqualificationReasons.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.LeadDisqualificationReasons.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
