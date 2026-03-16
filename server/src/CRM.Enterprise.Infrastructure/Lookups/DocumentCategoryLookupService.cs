using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class DocumentCategoryLookupService : IDocumentCategoryLookupService
{
    private readonly CrmDbContext _db;

    public DocumentCategoryLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<DocumentCategoryLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default) =>
        await _db.DocumentCategories.AsNoTracking()
            .Where(x => includeInactive || x.IsActive)
            .OrderBy(x => x.SortOrder).ThenBy(x => x.Name)
            .Select(x => new DocumentCategoryLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .ToListAsync(ct);

    public async Task<DocumentCategoryLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.DocumentCategories.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new DocumentCategoryLookupDto(x.Id, x.Name, x.IsActive, x.SortOrder))
            .FirstOrDefaultAsync(ct);

    public async Task<DocumentCategoryLookupDto> CreateAsync(UpsertDocumentCategoryRequest request, CancellationToken ct = default)
    {
        var entity = new DocumentCategoryDefinition
        {
            Name = request.Name,
            IsActive = request.IsActive,
            SortOrder = request.SortOrder
        };
        _db.DocumentCategories.Add(entity);
        await _db.SaveChangesAsync(ct);
        return new DocumentCategoryLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<DocumentCategoryLookupDto?> UpdateAsync(Guid id, UpsertDocumentCategoryRequest request, CancellationToken ct = default)
    {
        var entity = await _db.DocumentCategories.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.IsActive = request.IsActive;
        entity.SortOrder = request.SortOrder;

        await _db.SaveChangesAsync(ct);
        return new DocumentCategoryLookupDto(entity.Id, entity.Name, entity.IsActive, entity.SortOrder);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.DocumentCategories.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.DocumentCategories.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
