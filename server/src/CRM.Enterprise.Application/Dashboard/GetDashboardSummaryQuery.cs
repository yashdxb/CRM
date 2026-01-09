using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace CRM.Enterprise.Application.Dashboard;

public record GetDashboardSummaryQuery(Guid? UserId) : IRequest<DashboardSummaryDto>;

public class GetDashboardSummaryHandler : IRequestHandler<GetDashboardSummaryQuery, DashboardSummaryDto>
{
    private readonly IDashboardReadService _dashboardReadService;

    public GetDashboardSummaryHandler(IDashboardReadService dashboardReadService)
    {
        _dashboardReadService = dashboardReadService;
    }

    public Task<DashboardSummaryDto> Handle(GetDashboardSummaryQuery request, CancellationToken cancellationToken)
        => _dashboardReadService.GetSummaryAsync(request.UserId, cancellationToken);
}
