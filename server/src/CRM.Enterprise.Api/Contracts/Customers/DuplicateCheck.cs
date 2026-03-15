namespace CRM.Enterprise.Api.Contracts.Customers;

public sealed record DuplicateCheckRequest(
    string? Name = null,
    string? AccountNumber = null,
    string? Website = null,
    string? Phone = null,
    Guid? ExcludeId = null);

public sealed record DuplicateCheckResponse(
    bool IsDuplicate,
    Guid? MatchId = null,
    string? MatchName = null);
