namespace CRM.Enterprise.Application.Dashboard;

public interface IDashboardLayoutService
{
    Task<DashboardLayoutState> GetLayoutAsync(Guid userId, CancellationToken cancellationToken);
    Task<DashboardLayoutState> UpdateLayoutAsync(Guid userId, DashboardLayoutState layout, CancellationToken cancellationToken);
    Task<DashboardLayoutState> GetDefaultLayoutAsync(Guid userId, CancellationToken cancellationToken);
    Task<DashboardLayoutState> GetDefaultLayoutForLevelAsync(int roleLevel, CancellationToken cancellationToken);
    Task<DashboardLayoutState> UpdateDefaultLayoutAsync(int roleLevel, DashboardLayoutState layout, CancellationToken cancellationToken);
    Task<DashboardLayoutState> ResetLayoutAsync(Guid userId, CancellationToken cancellationToken);
}
