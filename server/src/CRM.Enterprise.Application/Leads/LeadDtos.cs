namespace CRM.Enterprise.Application.Leads;

public sealed record LeadListItemDto(
    Guid Id,
    string Name,
    string CompanyName,
    string Status,
    string? Email,
    string? Phone,
    Guid OwnerId,
    string OwnerName,
    int Score,
    DateTime CreatedAtUtc,
    string? Source,
    string? RoutingReason,
    string? Territory,
    string? JobTitle,
    Guid? AccountId,
    Guid? ContactId,
    Guid? ConvertedOpportunityId,
    string? DisqualifiedReason,
    string? LossReason,
    string? LossCompetitor,
    string? LossNotes,
    DateTime? NurtureFollowUpAtUtc,
    string? QualifiedNotes,
    DateTime? FirstTouchDueAtUtc,
    DateTime? FirstTouchedAtUtc,
    string? BudgetAvailability,
    string? BudgetEvidence,
    string? ReadinessToSpend,
    string? ReadinessEvidence,
    string? BuyingTimeline,
    string? TimelineEvidence,
    string? ProblemSeverity,
    string? ProblemEvidence,
    string? EconomicBuyer,
    string? EconomicBuyerEvidence,
    string? IcpFit,
    string? IcpFitEvidence,
    decimal QualificationConfidence,
    string QualificationConfidenceLabel,
    decimal TruthCoverage,
    int AssumptionsOutstanding,
    string? WeakestSignal,
    string? WeakestState,
    IReadOnlyList<string> NextEvidenceSuggestions,
    IReadOnlyList<LeadScoreBreakdownItem> ScoreBreakdown,
    IReadOnlyList<string> RiskFlags);

public sealed record LeadSearchResultDto(IReadOnlyList<LeadListItemDto> Items, int Total);

public sealed record LeadStatusHistoryDto(
    Guid Id,
    string Status,
    DateTime ChangedAtUtc,
    string? ChangedBy,
    string? Notes);

public sealed record LeadAuditEventDto(
    Guid Id,
    string EntityType,
    Guid EntityId,
    string Action,
    string? Field,
    string? OldValue,
    string? NewValue,
    Guid? ChangedByUserId,
    string? ChangedByName,
    DateTime CreatedAtUtc);

public sealed record LeadAiScoreResultDto(
    int Score,
    decimal Confidence,
    string Rationale,
    DateTime ScoredAtUtc);

public sealed record LeadConversionResultDto(
    Guid LeadId,
    Guid? AccountId,
    Guid? ContactId,
    Guid? OpportunityId);

public sealed record LeadCadenceTouchDto(
    Guid ActivityId,
    string Channel,
    string Outcome,
    DateTime CompletedAtUtc,
    DateTime? NextStepDueAtUtc,
    string OwnerName);

public sealed record LeadScoreBreakdownItem(
    string Factor,
    int Score,
    int MaxScore);

public sealed record LeadOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static LeadOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static LeadOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static LeadOperationResult<T> NotFoundResult() => new(false, default, null, true);
}
