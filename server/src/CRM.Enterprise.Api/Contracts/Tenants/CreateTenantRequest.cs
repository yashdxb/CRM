namespace CRM.Enterprise.Api.Contracts.Tenants;

public record CreateTenantRequest(
    string Key,
    string Name,
    string AdminName,
    string AdminEmail,
    string AdminPassword,
    string? TimeZone,
    string? Currency,
    string? IndustryPreset,
    IReadOnlyList<string>? IndustryModules);
