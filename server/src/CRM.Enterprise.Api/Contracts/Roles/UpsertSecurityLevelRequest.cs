namespace CRM.Enterprise.Api.Contracts.Roles;

public record UpsertSecurityLevelRequest(
    string Name,
    string? Description,
    int Rank,
    bool? IsDefault);
