using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Customers;

public interface ICustomerService
{
    Task<CustomerSearchResultDto> SearchAsync(CustomerSearchRequest request, CancellationToken cancellationToken = default);
    Task<CustomerListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<CustomerListItemDto>> CreateAsync(CustomerUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<bool>> UpdateAsync(Guid id, CustomerUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<bool>> UpdateOwnerAsync(Guid id, Guid ownerId, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<bool>> UpdateLifecycleAsync(Guid id, string lifecycle, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<int>> BulkAssignOwnerAsync(IReadOnlyCollection<Guid> ids, Guid ownerId, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<int>> BulkUpdateLifecycleAsync(IReadOnlyCollection<Guid> ids, string lifecycle, CancellationToken cancellationToken = default);
}
