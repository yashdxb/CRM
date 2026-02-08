using MediatR;

namespace CRM.Enterprise.Application.Dashboard;

public record GetManagerPipelineHealthQuery(Guid? UserId) : IRequest<ManagerPipelineHealthDto>;

public class GetManagerPipelineHealthHandler : IRequestHandler<GetManagerPipelineHealthQuery, ManagerPipelineHealthDto>
{
    private readonly IDashboardReadService _dashboardReadService;

    public GetManagerPipelineHealthHandler(IDashboardReadService dashboardReadService)
    {
        _dashboardReadService = dashboardReadService;
    }

    public Task<ManagerPipelineHealthDto> Handle(GetManagerPipelineHealthQuery request, CancellationToken cancellationToken)
    {
        return _dashboardReadService.GetManagerPipelineHealthAsync(request.UserId, cancellationToken);
    }
}
