using System;
using System.Threading;
using System.Threading.Tasks;

namespace CRM.Enterprise.Application.Dashboard;

public interface IDashboardReadService
{
    Task<DashboardSummaryDto> GetSummaryAsync(
        Guid? userId,
        string? period = null,
        DateTime? fromUtc = null,
        DateTime? toUtc = null,
        CancellationToken cancellationToken = default);
    Task<ManagerPipelineHealthDto> GetManagerPipelineHealthAsync(Guid? userId, CancellationToken cancellationToken);
    Task<SalesTeamPerformanceDto> GetSalesTeamPerformanceAsync(
        Guid? userId,
        string? period = null,
        DateTime? fromUtc = null,
        DateTime? toUtc = null,
        CancellationToken cancellationToken = default);
}
