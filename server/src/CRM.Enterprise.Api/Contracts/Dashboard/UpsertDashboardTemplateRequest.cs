namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record UpsertDashboardTemplateRequest(
    string Name,
    string? Description,
    IReadOnlyList<string> CardOrder,
    IReadOnlyDictionary<string, string>? Sizes,
    IReadOnlyDictionary<string, DashboardCardDimensions>? Dimensions,
    IReadOnlyList<string>? HiddenCards,
    bool? IsDefault);
