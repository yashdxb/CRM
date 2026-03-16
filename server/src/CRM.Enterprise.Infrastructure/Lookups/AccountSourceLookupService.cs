using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class AccountSourceLookupService : IAccountSourceLookupService
{
    private readonly CrmDbContext _db;

    public AccountSourceLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<AccountSourceLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.AccountSources.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new AccountSourceLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<AccountSourceLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.AccountSources.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new AccountSourceLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<AccountSourceLookupDto> CreateAsync(UpsertAccountSourceRequest request, CancellationToken ct = default)
    {
        var entity = new AccountSourceDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.AccountSources.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new AccountSourceLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<AccountSourceLookupDto?> UpdateAsync(Guid id, UpsertAccountSourceRequest request, CancellationToken ct = default)
    {
        var entity = await _db.AccountSources.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new AccountSourceLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.AccountSources.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.AccountSources.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
