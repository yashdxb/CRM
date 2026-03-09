namespace CRM.Enterprise.Api.Contracts.Tenants;

public record TenantContextResponse(
    Guid Id,
    string Key,
    string Name,
    string? IndustryPreset,
    CRM.Enterprise.Application.Tenants.VerticalPresetConfiguration VerticalPresetConfiguration,
    IReadOnlyList<string> IndustryModules,
    IReadOnlyDictionary<string, bool> FeatureFlags);
