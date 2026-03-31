namespace CRM.Enterprise.Api.Contracts.RiskIntelligence;

public sealed record RiskIntelligenceWorkspaceResponse(
    RiskIntelligenceSummaryItem Summary,
    IReadOnlyList<RiskGuidanceItem> PriorityRisks,
    IReadOnlyList<RiskWatchlistItem> Watchlist,
    DateTime GeneratedAtUtc);

public sealed record RiskIntelligenceSummaryItem(
    int TotalOpenRisks,
    int ImmediateRisks,
    int SoonRisks,
    int StalePipelineCount,
    int OverdueApprovals);

public sealed record RiskGuidanceItem(
    string Id,
    string RiskType,
    string AffectedModule,
    string? EntityType,
    Guid? EntityId,
    string EntityLabel,
    string Owner,
    int Score,
    string Urgency,
    string ReasonSummary,
    string RecommendedAction,
    string SourceSurface,
    string DrillRoute,
    IReadOnlyList<string> Evidence);

public sealed record RiskWatchlistItem(
    string Label,
    int Count,
    string Severity,
    string Context,
    string Route);
