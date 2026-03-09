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

// ── Campaign Email DTOs ────────────────────────────────────────

public sealed record CampaignEmailListItemDto(
    Guid Id,
    Guid CampaignId,
    string CampaignName,
    string Subject,
    string Status,
    string FromName,
    DateTime? ScheduledAtUtc,
    DateTime? SentAtUtc,
    int RecipientCount,
    int SentCount,
    int DeliveredCount,
    int OpenCount,
    int ClickCount,
    int BounceCount,
    int UnsubscribeCount,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record CampaignEmailSearchResultDto(IReadOnlyList<CampaignEmailListItemDto> Items, int Total);

public sealed record CampaignEmailDetailDto(
    Guid Id,
    Guid CampaignId,
    string CampaignName,
    Guid? TemplateId,
    string Subject,
    string HtmlBody,
    string? TextBody,
    string FromName,
    string? ReplyTo,
    string Status,
    DateTime? ScheduledAtUtc,
    DateTime? SentAtUtc,
    int RecipientCount,
    int SentCount,
    int DeliveredCount,
    int OpenCount,
    int ClickCount,
    int BounceCount,
    int UnsubscribeCount,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record CampaignEmailRecipientDto(
    Guid Id,
    string Email,
    string? Name,
    string Status,
    string? SkipReason,
    DateTime? SentAtUtc,
    DateTime? DeliveredAtUtc,
    DateTime? OpenedAtUtc,
    DateTime? ClickedAtUtc);

public sealed record CampaignEmailRecipientSearchResultDto(IReadOnlyList<CampaignEmailRecipientDto> Items, int Total);

// ── Email Preference DTOs ──────────────────────────────────────

public sealed record EmailPreferenceDto(
    Guid Id,
    string Email,
    string EntityType,
    Guid EntityId,
    bool IsSubscribed,
    DateTime? UnsubscribedAtUtc,
    string? UnsubscribeReason,
    string UnsubscribeSource,
    int HardBounceCount,
    DateTime? LastBounceAtUtc);

public sealed record MarketingOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static MarketingOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static MarketingOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static MarketingOperationResult<T> NotFoundResult() => new(false, default, null, true);
    public static MarketingOperationResult<T> NotFoundWithError(string error) => new(false, default, error, true);
}
