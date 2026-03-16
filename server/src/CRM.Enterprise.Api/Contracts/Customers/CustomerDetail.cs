namespace CRM.Enterprise.Api.Contracts.Customers;

public record CustomerDetail(
    Guid Id,
    string Name,
    string? AccountNumber,
    string? Industry,
    string? Website,
    string? Phone,
    string Status,
    Guid OwnerId,
    string Owner,
    Guid? ParentAccountId,
    string? ParentAccountName,
    string? Territory,
    string? Description,
    int ActivityScore,
    int HealthScore,
    DateTime? LastActivityAt,
    DateTime? LastViewedAt,
    DateTime CreatedAt,
    DateTime? UpdatedAt,
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
    IEnumerable<AccountTeamMemberItem> TeamMembers,
    // Renewal / contract tracking (#14)
    DateTime? RenewalDate = null,
    DateTime? ContractEndDate = null,
    DateTime? NearestOpportunityRenewal = null,
    // Revenue tracking (#12)
    decimal OpenPipelineValue = 0,
    decimal ClosedWonRevenue = 0,
    decimal WeightedForecast = 0,
    AccountRelatedRecordsResponse? RelatedRecords = null);

public record AccountTeamMemberItem(
    Guid Id,
    Guid UserId,
    string UserName,
    string Role,
    DateTime CreatedAt);

public record AddTeamMemberRequest(Guid UserId, string Role);

public sealed record AccountContactRoleItem(
    Guid Id,
    Guid ContactId,
    string ContactName,
    string? Email,
    string? JobTitle,
    string Role,
    string? Notes,
    bool IsPrimary,
    DateTime CreatedAt,
    DateTime? UpdatedAt);

public sealed record AddAccountContactRoleRequest(
    Guid ContactId,
    string Role,
    string? Notes,
    bool IsPrimary);

public sealed record RelatedRecordResponse(
    Guid Id,
    string Label,
    string? Subtitle);

public sealed record AccountRelatedRecordsResponse(
    IReadOnlyList<RelatedRecordResponse> Contacts,
    IReadOnlyList<RelatedRecordResponse> Opportunities,
    IReadOnlyList<RelatedRecordResponse> Leads,
    IReadOnlyList<RelatedRecordResponse> SupportCases);
