namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record CampaignPerformanceResponse(
    Guid CampaignId,
    int MemberCount,
    int InfluencedOpportunities,
    decimal InfluencedPipelineAmount,
    decimal WonRevenue,
    decimal ConversionRate,
    IEnumerable<CampaignAttributedOpportunityItem> Opportunities);
