namespace CRM.Enterprise.Application.Dashboard;

public interface IDashboardLayoutService
{
    Task<IReadOnlyList<string>> GetLayoutAsync(Guid userId, CancellationToken cancellationToken);
    Task<IReadOnlyList<string>> UpdateLayoutAsync(Guid userId, IReadOnlyList<string> cardOrder, CancellationToken cancellationToken);
}
