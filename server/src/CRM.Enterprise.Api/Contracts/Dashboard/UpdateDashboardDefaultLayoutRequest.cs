using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record UpdateDashboardDefaultLayoutRequest(
    int RoleLevel,
    string? PackName,
    IReadOnlyList<string> CardOrder,
    IReadOnlyDictionary<string, string>? Sizes = null,
    IReadOnlyDictionary<string, DashboardCardDimensions>? Dimensions = null,
    IReadOnlyList<string>? HiddenCards = null,
    IReadOnlyList<string>? KpiOrder = null);
