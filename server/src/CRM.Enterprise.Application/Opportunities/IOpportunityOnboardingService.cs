using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Opportunities;

public interface IOpportunityOnboardingService
{
    Task<IReadOnlyList<OpportunityOnboardingItemDto>?> GetAsync(Guid opportunityId, string? type, CancellationToken cancellationToken = default);
    Task<OpportunityOnboardingItemDto?> CreateAsync(Guid opportunityId, OpportunityOnboardingCreateRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityOnboardingItemDto?> UpdateAsync(Guid itemId, OpportunityOnboardingUpdateRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid itemId, ActorContext actor, CancellationToken cancellationToken = default);
}
