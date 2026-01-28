namespace CRM.Enterprise.Application.Opportunities;

public sealed record OpportunitySearchRequest(
    string? Search,
    string? Stage,
    Guid? AccountId,
    int Page,
    int PageSize);

public sealed record OpportunityUpsertRequest(
    string Name,
    Guid? AccountId,
    Guid? PrimaryContactId,
    Guid? StageId,
    string? StageName,
    Guid? OwnerId,
    decimal Amount,
    string Currency,
    decimal Probability,
    DateTime? ExpectedCloseDate,
    DateTime? ContractStartDateUtc,
    DateTime? ContractEndDateUtc,
    string? ForecastCategory,
    string? OpportunityType,
    string? Summary,
    decimal? DiscountPercent,
    decimal? DiscountAmount,
    string? PricingNotes,
    string? SecurityReviewStatus,
    string? SecurityNotes,
    string? LegalReviewStatus,
    string? LegalNotes,
    Guid? DeliveryOwnerId,
    string? DeliveryHandoffScope,
    string? DeliveryHandoffRisks,
    string? DeliveryHandoffTimeline,
    string? DeliveryStatus,
    DateTime? DeliveryCompletedAtUtc,
    bool IsClosed,
    bool IsWon,
    string? WinLossReason);

public sealed record OpportunityReviewOutcomeRequest(
    string Outcome,
    string? Comment,
    DateTime? AcknowledgmentDueAtUtc);

public sealed record OpportunityTeamMemberRequest(Guid UserId, string Role);

public sealed record OpportunityOnboardingCreateRequest(
    string Type,
    string Title,
    string? Status,
    DateTime? DueDateUtc,
    string? Notes);

public sealed record OpportunityOnboardingUpdateRequest(
    string? Title,
    string? Status,
    DateTime? DueDateUtc,
    string? Notes);
