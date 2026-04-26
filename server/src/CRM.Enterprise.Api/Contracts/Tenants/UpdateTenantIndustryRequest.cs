namespace CRM.Enterprise.Api.Contracts.Tenants;

public record UpdateTenantIndustryRequest(
    string? IndustryPreset,
    IReadOnlyList<string>? IndustryModules,
    IReadOnlyDictionary<string, bool>? FeatureFlags = null,
    string? ReportDesignerRequiredPermission = null,
    bool ResetExisting = false);
