namespace CRM.Enterprise.Application.Marketing;

public interface ICampaignAttributionService
{
    Task RecomputeForOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken = default);
    Task RecomputeForEntityAsync(string entityType, Guid entityId, CancellationToken cancellationToken = default);
}
