namespace CRM.Enterprise.Application.Leads;

public sealed record LeadSearchRequest(
    string? Search,
    string? Status,
    string? ConversationView,
    string? SortBy,
    int Page,
    int PageSize);

public sealed record LeadUpsertRequest(
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    Guid? PhoneTypeId,
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
    Guid? DisqualificationReasonId,
    Guid? LossReasonId,
    string? LossCompetitor,
    string? LossNotes,
    DateTime? NurtureFollowUpAtUtc,
    string? QualifiedNotes,
    string? BuyerType,
    string? MotivationUrgency,
    string? FinancingReadiness,
    string? PreApprovalStatus,
    string? PreferredArea,
    string? PreferredPropertyType,
    string? BudgetBand,
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
    IReadOnlyList<LeadCustomQualificationFactorValue>? CustomQualificationFactors);

public sealed record LeadCustomQualificationFactorValue(
    string Key,
    string? Value,
    string? Evidence);

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

public sealed record LeadDuplicateCheckRequest(
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    string? CompanyName,
    Guid? ExcludeLeadId);
