using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class HelpdeskCaseStatusLookupService : IHelpdeskCaseStatusLookupService
{
    private readonly CrmDbContext _db;

    public HelpdeskCaseStatusLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<HelpdeskCaseStatusLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.HelpdeskCaseStatuses.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new HelpdeskCaseStatusLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<HelpdeskCaseStatusLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.HelpdeskCaseStatuses.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new HelpdeskCaseStatusLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<HelpdeskCaseStatusLookupDto> CreateAsync(UpsertHelpdeskCaseStatusRequest request, CancellationToken ct = default)
    {
        var entity = new HelpdeskCaseStatusDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.HelpdeskCaseStatuses.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new HelpdeskCaseStatusLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<HelpdeskCaseStatusLookupDto?> UpdateAsync(Guid id, UpsertHelpdeskCaseStatusRequest request, CancellationToken ct = default)
    {
        var entity = await _db.HelpdeskCaseStatuses.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new HelpdeskCaseStatusLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.HelpdeskCaseStatuses.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.HelpdeskCaseStatuses.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
