using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Opportunities;

public interface IOpportunityService
{
    Task<OpportunitySearchResultDto> SearchAsync(OpportunitySearchRequest request, CancellationToken cancellationToken = default);
    Task<OpportunityListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<OpportunityStageHistoryDto>?> GetHistoryAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<OpportunityAuditEventDto>?> GetAuditAsync(Guid id, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<OpportunityListItemDto>> CreateAsync(OpportunityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<bool>> UpdateAsync(Guid id, OpportunityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<bool>> UpdateOwnerAsync(Guid id, Guid ownerId, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<bool>> UpdateStageAsync(Guid id, string stageName, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<Guid>> CoachAsync(Guid id, OpportunityCoachingRequest request, ActorContext actor, CancellationToken cancellationToken = default);
}
