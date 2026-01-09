using CRM.Enterprise.Application.Suppliers;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Suppliers;

/// <summary>
/// Implementation of ISupplierService.
/// Handles all database operations for Suppliers.
/// </summary>
public class SupplierService : ISupplierService
{
    private readonly CrmDbContext _dbContext;

    public SupplierService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<SupplierSearchResponse> SearchAsync(SupplierSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Suppliers
            .AsNoTracking()
            .Where(s => !s.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(s =>
                s.Name.ToLower().Contains(term) ||
                (s.Category ?? string.Empty).ToLower().Contains(term) ||
                (s.Country ?? string.Empty).ToLower().Contains(term) ||
                (s.ContactEmail ?? string.Empty).ToLower().Contains(term) ||
                (s.ContactName ?? string.Empty).ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            query = query.Where(s => s.Status == request.Status);
        }

        var total = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderBy(s => s.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(s => new SupplierListItemDto(
                s.Id,
                s.Name,
                s.Category,
                s.Status ?? "Draft",
                s.Country,
                s.ContactName,
                s.ContactEmail))
            .ToListAsync(cancellationToken);

        return new SupplierSearchResponse(items, total);
    }

    public async Task<SupplierDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var supplier = await _dbContext.Suppliers
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted, cancellationToken);

        if (supplier is null)
        {
            return null;
        }

        return MapToDto(supplier);
    }

    public async Task<SupplierDto> CreateAsync(CreateSupplierRequest request, CancellationToken cancellationToken = default)
    {
        var supplier = new Supplier
        {
            Name = request.Name.Trim(),
            Category = request.Category?.Trim(),
            Status = request.Status?.Trim() ?? "Draft",
            Country = request.Country?.Trim(),
            Website = request.Website?.Trim(),
            ContactName = request.ContactName?.Trim(),
            ContactEmail = request.ContactEmail?.Trim(),
            ContactPhone = request.ContactPhone?.Trim(),
            Notes = request.Notes?.Trim(),
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Suppliers.Add(supplier);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToDto(supplier);
    }

    public async Task<SupplierDto?> UpdateAsync(Guid id, UpdateSupplierRequest request, CancellationToken cancellationToken = default)
    {
        var supplier = await _dbContext.Suppliers
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted, cancellationToken);

        if (supplier is null)
        {
            return null;
        }

        supplier.Name = request.Name.Trim();
        supplier.Category = request.Category?.Trim();
        supplier.Status = request.Status?.Trim();
        supplier.Country = request.Country?.Trim();
        supplier.Website = request.Website?.Trim();
        supplier.ContactName = request.ContactName?.Trim();
        supplier.ContactEmail = request.ContactEmail?.Trim();
        supplier.ContactPhone = request.ContactPhone?.Trim();
        supplier.Notes = request.Notes?.Trim();
        supplier.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToDto(supplier);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var supplier = await _dbContext.Suppliers
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted, cancellationToken);

        if (supplier is null)
        {
            return false;
        }

        supplier.IsDeleted = true;
        supplier.DeletedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static SupplierDto MapToDto(Supplier supplier)
    {
        return new SupplierDto(
            supplier.Id,
            supplier.Name,
            supplier.Category,
            supplier.Status ?? "Draft",
            supplier.Country,
            supplier.Website,
            supplier.ContactName,
            supplier.ContactEmail,
            supplier.ContactPhone,
            supplier.Notes
        );
    }
}
