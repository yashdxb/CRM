using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Activities;
using CRM.Enterprise.Api.Contracts.Customers;
using CRM.Enterprise.Api.Contracts.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Security.Claims;
using DashboardCardDimensionsResponse = CRM.Enterprise.Api.Contracts.Dashboard.DashboardCardDimensions;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.DashboardView)]
[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IDashboardLayoutService _layoutService;

    public DashboardController(IMediator mediator, IDashboardLayoutService layoutService)
    {
        _mediator = mediator;
        _layoutService = layoutService;
    }

    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummaryResponse>> GetSummary(CancellationToken cancellationToken)
    {
        var summary = await _mediator.Send(new GetDashboardSummaryQuery(GetCurrentUserId()), cancellationToken);

        var recentCustomers = summary.RecentAccounts
            .Select(rc => new CustomerListItem(
                rc.Id,
                rc.Name,
                rc.Name,
                rc.Email,
                rc.Phone,
                rc.Status,
                rc.OwnerId,
                rc.OwnerName,
                null,
                null,
                rc.CreatedAtUtc))
            .ToList();

        var activitiesNextWeek = summary.ActivitiesNextWeek
            .Select(a => new ActivityListItem(
                a.Id,
                a.Subject,
                a.Type,
                null,
                null,
                null,
                a.RelatedEntityId,
                a.RelatedEntityName,
                a.RelatedEntityType,
                a.DueDateUtc,
                a.CompletedDateUtc,
                a.Status,
                null,
                null,
                a.DueDateUtc ?? DateTime.UtcNow))
            .ToList();

        var myTasks = summary.MyTasks
            .Select(a => new ActivityListItem(
                a.Id,
                a.Subject,
                a.Type,
                null,
                null,
                null,
                a.RelatedEntityId,
                a.RelatedEntityName,
                a.RelatedEntityType,
                a.DueDateUtc,
                a.CompletedDateUtc,
                a.Status,
                null,
                null,
                a.DueDateUtc ?? DateTime.UtcNow))
            .ToList();

        var response = new DashboardSummaryResponse(
            summary.TotalCustomers,
            summary.Leads,
            summary.Prospects,
            summary.ActiveCustomers,
            summary.OpenOpportunities,
            summary.PipelineValueTotal,
            summary.TasksDueToday,
            summary.UpcomingActivities,
            summary.OverdueActivities,
            summary.AtRiskOpportunities,
            summary.OpportunitiesWithoutNextStep,
            recentCustomers,
            activitiesNextWeek,
            myTasks,
            summary.TeamMonthlyKpis.Select(kpi => new TeamMonthlyKpiSummary(
                kpi.OwnerId,
                kpi.OwnerName,
                kpi.LeadsCreated,
                kpi.LeadsQualified,
                kpi.OpportunitiesCreated,
                kpi.DealsWon,
                kpi.RevenueWon)).ToList(),
            summary.PipelineValue.Select(stage => new PipelineStageSummary(stage.Stage, stage.Count, stage.Value)).ToList(),
            summary.RevenueByMonth.Select(point => new ChartDataPoint(point.Label, point.Value)).ToList(),
            summary.CustomerGrowth.Select(point => new ChartDataPoint(point.Label, point.Value)).ToList(),
            summary.ActivityBreakdown.Select(item => new ActivityBreakdownItem(item.Type, item.Count, item.Percentage)).ToList(),
            summary.ConversionTrend.Select(point => new ChartDataPoint(point.Label, point.Value)).ToList(),
            summary.TopPerformers.Select(p => new PerformerSummary(p.Name, p.Deals, p.Revenue, p.Avatar)).ToList(),
            summary.NewlyAssignedLeads.Select(l => new DashboardLeadItem(
                l.Id,
                l.Name,
                l.Company,
                l.Status,
                l.Email,
                l.CreatedAtUtc)).ToList(),
            summary.AtRiskDeals.Select(d => new DashboardOpportunityItem(
                d.Id,
                d.Name,
                d.AccountName,
                d.Stage,
                d.Amount,
                d.Reason,
                d.NextStepDueAtUtc,
                d.LastActivityAtUtc)).ToList(),
            summary.AvgDealSize,
            summary.WinRate,
            summary.AvgSalesCycle,
            summary.MonthlyRecurringRevenue,
            summary.CustomerLifetimeValue,
            summary.ChurnRate);

        return Ok(response);
    }

    [HttpGet("manager/pipeline-health")]
    public async Task<ActionResult<ManagerPipelineHealthResponse>> GetManagerPipelineHealth(CancellationToken cancellationToken)
    {
        var health = await _mediator.Send(new GetManagerPipelineHealthQuery(), cancellationToken);
        var response = new ManagerPipelineHealthResponse(
            health.OpenOpportunities,
            health.PipelineValueTotal,
            health.MissingNextStepCount,
            health.NextStepOverdueCount,
            health.NoRecentActivityCount,
            health.CloseDateOverdueCount,
            health.StuckStageCount,
            health.PipelineByStage.Select(stage => new PipelineStageSummary(stage.Stage, stage.Count, stage.Value)).ToList(),
            health.ReviewQueue.Select(item => new ManagerReviewDealItem(
                item.Id,
                item.Name,
                item.AccountName,
                item.Stage,
                item.Amount,
                item.OwnerName,
                item.Reason,
                item.NextStepDueAtUtc,
                item.LastActivityAtUtc,
                item.ExpectedCloseDate)).ToList());

        return Ok(response);
    }

    [HttpGet("layout")]
    public async Task<ActionResult<DashboardLayoutResponse>> GetLayout(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var layout = await _layoutService.GetLayoutAsync(userId.Value, cancellationToken);
        var dimensions = layout.Dimensions.ToDictionary(
            item => item.Key,
            item => new DashboardCardDimensionsResponse(item.Value.Width, item.Value.Height));
        return Ok(new DashboardLayoutResponse(layout.CardOrder, layout.Sizes, dimensions, layout.HiddenCards));
    }

    [HttpPut("layout")]
    public async Task<ActionResult<DashboardLayoutResponse>> UpdateLayout(
        [FromBody] UpdateDashboardLayoutRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var sizes = request.Sizes ?? new Dictionary<string, string>();
        var dimensions = request.Dimensions?
            .ToDictionary(item => item.Key, item => new Application.Dashboard.DashboardCardDimensions(item.Value.Width, item.Value.Height))
            ?? new Dictionary<string, Application.Dashboard.DashboardCardDimensions>();
        var hidden = request.HiddenCards ?? new List<string>();
        var state = new Application.Dashboard.DashboardLayoutState(request.CardOrder, sizes, dimensions, hidden);
        var updated = await _layoutService.UpdateLayoutAsync(userId.Value, state, cancellationToken);
        var responseDimensions = updated.Dimensions.ToDictionary(
            item => item.Key,
            item => new DashboardCardDimensionsResponse(item.Value.Width, item.Value.Height));
        return Ok(new DashboardLayoutResponse(updated.CardOrder, updated.Sizes, responseDimensions, updated.HiddenCards));
    }

    private Guid? GetCurrentUserId()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var userId) ? userId : null;
    }
}
