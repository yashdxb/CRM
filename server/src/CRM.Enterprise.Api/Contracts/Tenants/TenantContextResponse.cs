namespace CRM.Enterprise.Api.Contracts.Tenants;

public record TenantContextResponse(
    Guid Id,
    string Key,
    string Name,
    string? IndustryPreset,
    IReadOnlyList<string> IndustryModules,
    IReadOnlyDictionary<string, bool> FeatureFlags);
