using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class AccountTypeLookupService : IAccountTypeLookupService
{
    private readonly CrmDbContext _db;

    public AccountTypeLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<AccountTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.AccountTypes.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new AccountTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<AccountTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.AccountTypes.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new AccountTypeLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<AccountTypeLookupDto> CreateAsync(UpsertAccountTypeRequest request, CancellationToken ct = default)
    {
        var entity = new AccountTypeDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.AccountTypes.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new AccountTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<AccountTypeLookupDto?> UpdateAsync(Guid id, UpsertAccountTypeRequest request, CancellationToken ct = default)
    {
        var entity = await _db.AccountTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new AccountTypeLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.AccountTypes.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.AccountTypes.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
