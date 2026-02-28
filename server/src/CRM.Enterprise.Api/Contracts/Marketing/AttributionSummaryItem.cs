namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record AttributionSummaryItem(
    Guid CampaignId,
    string CampaignName,
    string Status,
    int InfluencedOpportunities,
    decimal InfluencedPipelineAmount,
    decimal WonRevenue,
    decimal ConversionRate,
    Guid? SampleOpportunityId);
