namespace CRM.Enterprise.Api.Contracts.Tenants;

public record TenantSummaryResponse(
    Guid Id,
    string Key,
    string Name,
    DateTime CreatedAtUtc,
    string? IndustryPreset,
    IReadOnlyList<string> IndustryModules);
