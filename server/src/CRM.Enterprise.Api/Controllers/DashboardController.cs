using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Activities;
using CRM.Enterprise.Api.Contracts.Customers;
using CRM.Enterprise.Api.Contracts.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.DashboardView)]
[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly IMediator _mediator;

    public DashboardController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummaryResponse>> GetSummary(CancellationToken cancellationToken)
    {
        var summary = await _mediator.Send(new GetDashboardSummaryQuery(), cancellationToken);

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
                rc.CreatedAtUtc))
            .ToList();

        var activitiesNextWeek = summary.ActivitiesNextWeek
            .Select(a => new ActivityListItem(
                a.Id,
                a.Subject,
                a.Type,
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
            recentCustomers,
            activitiesNextWeek,
            summary.PipelineValue.Select(stage => new PipelineStageSummary(stage.Stage, stage.Count, stage.Value)).ToList(),
            summary.RevenueByMonth.Select(point => new ChartDataPoint(point.Label, point.Value)).ToList(),
            summary.CustomerGrowth.Select(point => new ChartDataPoint(point.Label, point.Value)).ToList(),
            summary.ActivityBreakdown.Select(item => new ActivityBreakdownItem(item.Type, item.Count, item.Percentage)).ToList(),
            summary.ConversionTrend.Select(point => new ChartDataPoint(point.Label, point.Value)).ToList(),
            summary.TopPerformers.Select(p => new PerformerSummary(p.Name, p.Deals, p.Revenue, p.Avatar)).ToList(),
            summary.AvgDealSize,
            summary.WinRate,
            summary.AvgSalesCycle,
            summary.MonthlyRecurringRevenue,
            summary.CustomerLifetimeValue,
            summary.ChurnRate);

        return Ok(response);
    }
}
