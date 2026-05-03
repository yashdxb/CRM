using MediatR;

namespace CRM.Enterprise.Application.Dashboard;

public record GetSalesTeamPerformanceQuery(
    Guid? UserId,
    string? Period = null,
    DateTime? FromUtc = null,
    DateTime? ToUtc = null) : IRequest<SalesTeamPerformanceDto>;

public class GetSalesTeamPerformanceHandler : IRequestHandler<GetSalesTeamPerformanceQuery, SalesTeamPerformanceDto>
{
    private readonly IDashboardReadService _dashboardReadService;

    public GetSalesTeamPerformanceHandler(IDashboardReadService dashboardReadService)
    {
        _dashboardReadService = dashboardReadService;
    }

    public Task<SalesTeamPerformanceDto> Handle(GetSalesTeamPerformanceQuery request, CancellationToken cancellationToken)
    {
        return _dashboardReadService.GetSalesTeamPerformanceAsync(
            request.UserId,
            request.Period,
            request.FromUtc,
            request.ToUtc,
            cancellationToken);
    }
}
