using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Application.RiskIntelligence;

public sealed record RiskIntelligenceWorkspaceDto(
    RiskIntelligenceSummaryDto Summary,
    IReadOnlyList<RiskGuidanceItemDto> PriorityRisks,
    IReadOnlyList<RiskWatchlistItemDto> Watchlist,
    DateTime GeneratedAtUtc);

public sealed record RiskIntelligenceSummaryDto(
    int TotalOpenRisks,
    int ImmediateRisks,
    int SoonRisks,
    int StalePipelineCount,
    int OverdueApprovals);

public sealed record RiskGuidanceItemDto(
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

public sealed record RiskWatchlistItemDto(
    string Label,
    int Count,
    string Severity,
    string Context,
    string Route);
