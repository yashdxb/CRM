using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Contacts;

public interface IContactService
{
    Task<ContactSearchResultDto> SearchAsync(ContactSearchRequest request, CancellationToken cancellationToken = default);
    Task<ContactDetailDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ContactOperationResult<ContactDetailDto>> CreateAsync(ContactUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<ContactOperationResult<bool>> UpdateAsync(Guid id, ContactUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<ContactOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default);
    Task<ContactOperationResult<bool>> UpdateOwnerAsync(Guid id, Guid ownerId, ActorContext actor, CancellationToken cancellationToken = default);
    Task<ContactOperationResult<bool>> UpdateLifecycleAsync(Guid id, string lifecycle, ActorContext actor, CancellationToken cancellationToken = default);
    Task<ContactOperationResult<int>> BulkAssignOwnerAsync(IReadOnlyCollection<Guid> ids, Guid ownerId, CancellationToken cancellationToken = default);
    Task<ContactOperationResult<int>> BulkUpdateLifecycleAsync(IReadOnlyCollection<Guid> ids, string lifecycle, CancellationToken cancellationToken = default);
}
