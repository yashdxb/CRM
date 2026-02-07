using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record UpdateDashboardDefaultLayoutRequest(
    int RoleLevel,
    IReadOnlyList<string> CardOrder,
    IReadOnlyDictionary<string, string>? Sizes = null,
    IReadOnlyDictionary<string, DashboardCardDimensions>? Dimensions = null,
    IReadOnlyList<string>? HiddenCards = null);
