using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Opportunities;

public interface IOpportunityReviewChecklistService
{
    Task<IReadOnlyList<OpportunityReviewChecklistItemDto>?> GetAsync(Guid opportunityId, string? type, CancellationToken cancellationToken = default);
    Task<OpportunityReviewChecklistItemDto?> CreateAsync(Guid opportunityId, OpportunityReviewChecklistCreateRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityReviewChecklistItemDto?> UpdateAsync(Guid itemId, OpportunityReviewChecklistUpdateRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid itemId, ActorContext actor, CancellationToken cancellationToken = default);
}
