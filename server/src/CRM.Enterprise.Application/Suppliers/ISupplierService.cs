namespace CRM.Enterprise.Application.Suppliers;

/// <summary>
/// Service interface for Supplier operations.
/// Implementation lives in Infrastructure layer.
/// </summary>
public interface ISupplierService
{
    /// <summary>
    /// Search suppliers with filtering and pagination.
    /// </summary>
    Task<SupplierSearchResponse> SearchAsync(SupplierSearchRequest request, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Get a supplier by ID.
    /// </summary>
    Task<SupplierDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Create a new supplier.
    /// </summary>
    Task<SupplierDto> CreateAsync(CreateSupplierRequest request, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Update an existing supplier.
    /// </summary>
    Task<SupplierDto?> UpdateAsync(Guid id, UpdateSupplierRequest request, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Soft-delete a supplier.
    /// </summary>
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
