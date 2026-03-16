using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class CustomerRatingLookupService : ICustomerRatingLookupService
{
    private readonly CrmDbContext _db;

    public CustomerRatingLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<CustomerRatingLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.CustomerRatings.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new CustomerRatingLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<CustomerRatingLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.CustomerRatings.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new CustomerRatingLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<CustomerRatingLookupDto> CreateAsync(UpsertCustomerRatingRequest request, CancellationToken ct = default)
    {
        var entity = new CustomerRatingDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.CustomerRatings.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new CustomerRatingLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<CustomerRatingLookupDto?> UpdateAsync(Guid id, UpsertCustomerRatingRequest request, CancellationToken ct = default)
    {
        var entity = await _db.CustomerRatings.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new CustomerRatingLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.CustomerRatings.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.CustomerRatings.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
