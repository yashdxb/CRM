using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Activities;

public interface IActivityService
{
    Task<ActivitySearchResultDto> SearchAsync(ActivitySearchRequest request, CancellationToken cancellationToken = default);
    Task<ActivityListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<ActivityAuditEventDto>?> GetAuditAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ActivityOperationResult<ActivityListItemDto>> CreateAsync(ActivityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<ActivityOperationResult<bool>> UpdateAsync(Guid id, ActivityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<ActivityOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default);
}
