namespace CRM.Enterprise.Application.Leads;

public sealed record LeadSearchRequest(string? Search, string? Status, int Page, int PageSize);

public sealed record LeadUpsertRequest(
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    string? CompanyName,
    string? JobTitle,
    string? Status,
    Guid? OwnerId,
    string? AssignmentStrategy,
    string? Source,
    string? Territory,
    bool? AutoScore,
    int Score,
    Guid? AccountId,
    Guid? ContactId,
    string? DisqualifiedReason,
    DateTime? NurtureFollowUpAtUtc,
    string? QualifiedNotes,
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
    string? IcpFitEvidence);

public sealed record LeadConversionRequest(
    bool CreateAccount,
    string? AccountName,
    bool CreateContact,
    bool CreateOpportunity,
    string? OpportunityName,
    decimal? Amount,
    DateTime? ExpectedCloseDate,
    string? DealType,
    string? Segment,
    string? Stage,
    bool? IsCompetitive,
    bool? HasExecutiveChampion,
    bool? IsStrategic,
    string? Velocity,
    bool? ManagerApproved,
    string? OverrideReason);

public sealed record LeadCadenceTouchRequest(
    string Channel,
    string Outcome,
    DateTime? NextStepDueAtUtc);
