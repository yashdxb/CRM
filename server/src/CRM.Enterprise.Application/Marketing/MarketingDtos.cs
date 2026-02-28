namespace CRM.Enterprise.Application.Marketing;

public sealed record CampaignListItemDto(
    Guid Id,
    string Name,
    string Type,
    string Channel,
    string Status,
    Guid OwnerUserId,
    string OwnerName,
    DateTime? StartDateUtc,
    DateTime? EndDateUtc,
    decimal BudgetPlanned,
    decimal BudgetActual,
    string? Objective,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record CampaignSearchResultDto(IReadOnlyList<CampaignListItemDto> Items, int Total);

public sealed record CampaignMemberItemDto(
    Guid Id,
    Guid CampaignId,
    string EntityType,
    Guid EntityId,
    string EntityName,
    string ResponseStatus,
    DateTime AddedUtc,
    DateTime? UpdatedAtUtc);

public sealed record CampaignAttributedOpportunityDto(
    Guid OpportunityId,
    string OpportunityName,
    string AccountName,
    string Stage,
    decimal Amount,
    string Currency,
    bool IsClosed,
    bool IsWon,
    DateTime? ExpectedCloseDate,
    DateTime AttributedUtc);

public sealed record CampaignPerformanceDto(
    Guid CampaignId,
    int MemberCount,
    int InfluencedOpportunities,
    decimal InfluencedPipelineAmount,
    decimal WonRevenue,
    decimal ConversionRate,
    IReadOnlyList<CampaignAttributedOpportunityDto> Opportunities);

public sealed record AttributionSummaryItemDto(
    Guid CampaignId,
    string CampaignName,
    string Status,
    int InfluencedOpportunities,
    decimal InfluencedPipelineAmount,
    decimal WonRevenue,
    decimal ConversionRate,
    Guid? SampleOpportunityId);

public sealed record CampaignDetailDto(
    CampaignListItemDto Campaign,
    IReadOnlyList<CampaignMemberItemDto> Members,
    CampaignPerformanceDto Performance);

public sealed record CampaignHealthMetricsDto(
    int InfluencedOpportunities,
    decimal InfluencedPipelineAmount,
    decimal WonRevenue,
    int OpenAgingOver21Count,
    decimal WinRate,
    decimal BudgetVariancePct);

public sealed record CampaignHealthScoreDto(
    Guid CampaignId,
    int Score,
    string Trend,
    int CalculationWindowDays,
    DateTime ComputedUtc,
    IReadOnlyList<string> ReasonChips,
    CampaignHealthMetricsDto Metrics);

public sealed record CampaignRecommendationDto(
    Guid Id,
    Guid CampaignId,
    string Type,
    string Severity,
    string Title,
    string Description,
    decimal ImpactEstimate,
    decimal Confidence,
    string Status,
    DateTime GeneratedUtc,
    DateTime? ExpiresUtc,
    DateTime? DecidedUtc,
    string? DecisionReason,
    IReadOnlyList<string> Evidence);

public sealed record AttributionExplainabilityCandidateDto(
    string EntityType,
    Guid EntityId,
    string EntityName,
    Guid CampaignId,
    string CampaignName,
    DateTime MemberAddedUtc);

public sealed record AttributionExplainabilityDto(
    Guid OpportunityId,
    Guid? CampaignId,
    string Model,
    DateTime? AttributedUtc,
    string? RuleVersion,
    string? SourceEntityType,
    Guid? SourceEntityId,
    DateTime? MemberAddedUtc,
    IReadOnlyList<string> Evidence,
    IReadOnlyList<AttributionExplainabilityCandidateDto> Candidates);

public sealed record RecommendationPilotMetricsDto(
    int ActiveRecommendations,
    int AcceptedCount,
    int DismissedCount,
    int SnoozedCount,
    int ActionTasksCreated,
    int ImpactWorklistClicks,
    decimal AcceptanceRatePct,
    decimal AvgDecisionHours,
    DateTime WindowStartUtc,
    DateTime WindowEndUtc);

public sealed record MarketingOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static MarketingOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static MarketingOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static MarketingOperationResult<T> NotFoundResult() => new(false, default, null, true);
}
