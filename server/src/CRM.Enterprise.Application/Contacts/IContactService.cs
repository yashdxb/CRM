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

    // C15: Duplicate detection
    Task<DuplicateCheckResultDto> CheckDuplicatesAsync(DuplicateCheckRequest request, CancellationToken cancellationToken = default);

    // C16: Contact merge
    Task<ContactOperationResult<ContactMergeResultDto>> MergeAsync(ContactMergeRequest request, ActorContext actor, CancellationToken cancellationToken = default);

    // C17: Tags
    Task<IReadOnlyList<string>> GetAllTagsAsync(CancellationToken cancellationToken = default);
    Task<ContactOperationResult<bool>> UpdateTagsAsync(Guid contactId, IReadOnlyList<string> tags, CancellationToken cancellationToken = default);

    // C19: Relationships
    Task<IReadOnlyList<ContactRelationshipDto>> GetRelationshipsAsync(Guid contactId, CancellationToken cancellationToken = default);
}
