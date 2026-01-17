namespace CRM.Enterprise.Application.Dashboard;

public interface IDashboardLayoutService
{
    Task<DashboardLayoutState> GetLayoutAsync(Guid userId, CancellationToken cancellationToken);
    Task<DashboardLayoutState> UpdateLayoutAsync(Guid userId, DashboardLayoutState layout, CancellationToken cancellationToken);
}
