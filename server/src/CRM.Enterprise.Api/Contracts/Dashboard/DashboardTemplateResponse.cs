using CRM.Enterprise.Api.Contracts.Dashboard;

namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record DashboardTemplateResponse(
    Guid Id,
    string Name,
    string? Description,
    bool IsDefault,
    IReadOnlyList<string> CardOrder,
    IReadOnlyDictionary<string, string>? Sizes,
    IReadOnlyDictionary<string, DashboardCardDimensions>? Dimensions,
    IReadOnlyList<string>? HiddenCards);
