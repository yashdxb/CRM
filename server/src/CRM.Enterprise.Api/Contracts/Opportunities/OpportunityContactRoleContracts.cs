namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record OpportunityContactRoleItem(
    Guid Id,
    Guid ContactId,
    string ContactName,
    string? Email,
    string? JobTitle,
    string Role,
    string? Notes,
    bool IsPrimary,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record AddOpportunityContactRoleRequest(
    Guid ContactId,
    string Role,
    string? Notes,
    bool IsPrimary);
