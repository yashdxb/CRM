using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record DashboardLayoutResponse(
    IReadOnlyList<string> CardOrder,
    IReadOnlyDictionary<string, string>? Sizes = null,
    IReadOnlyDictionary<string, DashboardCardDimensions>? Dimensions = null,
    IReadOnlyList<string>? HiddenCards = null,
    int? RoleLevel = null,
    string? PackName = null);
