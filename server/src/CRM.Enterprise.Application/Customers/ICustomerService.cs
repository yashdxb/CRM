using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Customers;

public interface ICustomerService
{
    Task<CustomerSearchResultDto> SearchAsync(CustomerSearchRequest request, CancellationToken cancellationToken = default);
    Task<CustomerListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);
    Task<CustomerDetailDto?> GetDetailAsync(Guid id, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<CustomerListItemDto>> CreateAsync(CustomerUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<bool>> UpdateAsync(Guid id, CustomerUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<bool>> UpdateOwnerAsync(Guid id, Guid ownerId, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<bool>> UpdateLifecycleAsync(Guid id, string lifecycle, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<int>> BulkAssignOwnerAsync(IReadOnlyCollection<Guid> ids, Guid ownerId, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<int>> BulkUpdateLifecycleAsync(IReadOnlyCollection<Guid> ids, string lifecycle, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<CustomerListItemDto>> GetRelatedAccountsAsync(Guid accountId, CancellationToken cancellationToken = default);
    Task<DuplicateCheckResult> CheckDuplicateAsync(string? name, string? accountNumber, string? website, string? phone, Guid? excludeId = null, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<AccountTeamMemberDto>> GetTeamMembersAsync(Guid accountId, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<AccountTeamMemberDto>> AddTeamMemberAsync(Guid accountId, Guid userId, string role, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<bool>> RemoveTeamMemberAsync(Guid accountId, Guid memberId, CancellationToken cancellationToken = default);

    // #11 Account merge
    Task<IReadOnlyList<DuplicateMatchDto>> FindDuplicatesAsync(Guid accountId, CancellationToken cancellationToken = default);
    Task<MergeAccountResult> MergeAccountsAsync(Guid survivorId, Guid duplicateId, CancellationToken cancellationToken = default);

    // #13 Account hierarchy
    Task<AccountHierarchyNodeDto?> GetAccountHierarchyAsync(Guid accountId, CancellationToken cancellationToken = default);

    // #15 Communication history
    Task<IReadOnlyList<AccountTimelineEntryDto>> GetAccountTimelineAsync(Guid accountId, int take = 50, CancellationToken cancellationToken = default);
}
