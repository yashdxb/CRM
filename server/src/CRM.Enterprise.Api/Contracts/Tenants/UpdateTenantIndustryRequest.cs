namespace CRM.Enterprise.Api.Contracts.Tenants;

public record UpdateTenantIndustryRequest(
    string? IndustryPreset,
    IReadOnlyList<string>? IndustryModules);
