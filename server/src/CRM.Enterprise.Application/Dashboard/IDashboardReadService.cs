using System;
using System.Threading;
using System.Threading.Tasks;

namespace CRM.Enterprise.Application.Dashboard;

public interface IDashboardReadService
{
    Task<DashboardSummaryDto> GetSummaryAsync(Guid? userId, CancellationToken cancellationToken);
    Task<ManagerPipelineHealthDto> GetManagerPipelineHealthAsync(CancellationToken cancellationToken);
}
