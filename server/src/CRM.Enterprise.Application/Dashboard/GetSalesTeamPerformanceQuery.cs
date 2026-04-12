using MediatR;

namespace CRM.Enterprise.Application.Dashboard;

public record GetSalesTeamPerformanceQuery(Guid? UserId) : IRequest<SalesTeamPerformanceDto>;

public class GetSalesTeamPerformanceHandler : IRequestHandler<GetSalesTeamPerformanceQuery, SalesTeamPerformanceDto>
{
    private readonly IDashboardReadService _dashboardReadService;

    public GetSalesTeamPerformanceHandler(IDashboardReadService dashboardReadService)
    {
        _dashboardReadService = dashboardReadService;
    }

    public Task<SalesTeamPerformanceDto> Handle(GetSalesTeamPerformanceQuery request, CancellationToken cancellationToken)
    {
        return _dashboardReadService.GetSalesTeamPerformanceAsync(request.UserId, cancellationToken);
    }
}
