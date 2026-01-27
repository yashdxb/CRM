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
    bool IsClosed,
    bool IsWon,
    string? WinLossReason);
