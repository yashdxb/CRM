namespace CRM.Enterprise.Application.Customers;

public sealed record CustomerListItemDto(
    Guid Id,
    string Name,
    string DisplayName,
    string? Email,
    string? Phone,
    string Status,
    Guid OwnerId,
    string OwnerName,
    Guid? ParentAccountId,
    string? ParentAccountName,
    DateTime CreatedAtUtc,
    string? Industry = null,
    string? Territory = null,
    int ActivityScore = 0,
    string? Website = null,
    string? AccountNumber = null,
    decimal? AnnualRevenue = null,
    int? NumberOfEmployees = null,
    string? AccountType = null,
    string? Rating = null,
    string? AccountSource = null);

public sealed record CustomerDetailDto(
    Guid Id,
    string Name,
    string? AccountNumber,
    string? Industry,
    string? Website,
    string? Phone,
    string Status,
    Guid OwnerId,
    string OwnerName,
    Guid? ParentAccountId,
    string? ParentAccountName,
    string? Territory,
    string? Description,
    int ActivityScore,
    int HealthScore,
    DateTime? LastActivityAtUtc,
    DateTime? LastViewedAtUtc,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc,
    decimal? AnnualRevenue,
    int? NumberOfEmployees,
    string? AccountType,
    string? Rating,
    string? AccountSource,
    string? BillingStreet,
    string? BillingCity,
    string? BillingState,
    string? BillingPostalCode,
    string? BillingCountry,
    string? ShippingStreet,
    string? ShippingCity,
    string? ShippingState,
    string? ShippingPostalCode,
    string? ShippingCountry,
    int ContactCount,
    int OpportunityCount,
    int LeadCount,
    int SupportCaseCount,
    IReadOnlyList<AccountTeamMemberDto> TeamMembers,
    // Renewal / contract tracking (#14)
    DateTime? RenewalDateUtc = null,
    DateTime? ContractEndDateUtc = null,
    DateTime? NearestOpportunityRenewalUtc = null,
    // Revenue tracking / aggregation (#12)
    decimal OpenPipelineValue = 0,
    decimal ClosedWonRevenue = 0,
    decimal WeightedForecast = 0);

public sealed record AccountTeamMemberDto(
    Guid Id,
    Guid UserId,
    string UserName,
    string Role,
    DateTime CreatedAtUtc);

public sealed record CustomerSearchResultDto(IReadOnlyList<CustomerListItemDto> Items, int Total);

public sealed record DuplicateCheckResult(bool IsDuplicate, Guid? MatchId = null, string? MatchName = null);

// Multi-match duplicate detection (#11)
public sealed record DuplicateMatchDto(Guid Id, string Name, string? AccountNumber, string? Website, string? Phone, int MatchScore);

// Merge result (#11)
public sealed record MergeAccountResult(bool Success, Guid SurvivorId, int ContactsMoved, int OpportunitiesMoved, int LeadsMoved, int CasesMoved, string? Error = null);

// Account hierarchy (#13)
public sealed record AccountHierarchyNodeDto(
    Guid Id,
    string Name,
    string? Industry,
    string? LifecycleStage,
    Guid OwnerId,
    string OwnerName,
    int Depth,
    IReadOnlyList<AccountHierarchyNodeDto> Children);

// Communication timeline (#15)
public sealed record AccountTimelineEntryDto(
    Guid Id,
    string Type,       // "Call", "Email", "Meeting", "Task", "Note", "FollowUp", "InboundEmail"
    string? Subject,
    string? Description,
    string? Outcome,
    DateTime OccurredAtUtc,
    string? OwnerName,
    string? FromEmail,
    string? Direction);  // "Inbound", "Outbound", or null

public sealed record CustomerOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static CustomerOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static CustomerOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static CustomerOperationResult<T> NotFoundResult() => new(false, default, null, true);
}
