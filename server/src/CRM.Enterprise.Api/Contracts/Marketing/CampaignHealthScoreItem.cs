namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record CampaignHealthMetricsItem(
    int InfluencedOpportunities,
    decimal InfluencedPipelineAmount,
    decimal WonRevenue,
    int OpenAgingOver21Count,
    decimal WinRate,
    decimal BudgetVariancePct);

public sealed record CampaignHealthScoreItem(
    Guid CampaignId,
    int Score,
    string Trend,
    int CalculationWindowDays,
    DateTime ComputedUtc,
    IEnumerable<string> ReasonChips,
    CampaignHealthMetricsItem Metrics);
