namespace CRM.Enterprise.Application.Dashboard;

public record DashboardCardDimensions(int Width, int Height);

public record DashboardLayoutState(
    IReadOnlyList<string> CardOrder,
    IReadOnlyDictionary<string, string> Sizes,
    IReadOnlyDictionary<string, DashboardCardDimensions> Dimensions,
    IReadOnlyList<string> HiddenCards);
