using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Activities;
using CRM.Enterprise.Api.Contracts.Customers;
using CRM.Enterprise.Api.Contracts.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Security.Claims;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using DashboardCardDimensionsResponse = CRM.Enterprise.Api.Contracts.Dashboard.DashboardCardDimensions;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.DashboardView)]
[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private const string RoleLevelTemplatePrefix = "role-level-default:";
    private readonly IMediator _mediator;
    private readonly IDashboardLayoutService _layoutService;
    private readonly CrmDbContext _dbContext;

    public DashboardController(IMediator mediator, IDashboardLayoutService layoutService, CrmDbContext dbContext)
    {
        _mediator = mediator;
        _layoutService = layoutService;
        _dbContext = dbContext;
    }

    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummaryResponse>> GetSummary(
        [FromQuery] string? period,
        [FromQuery] DateTime? fromUtc,
        [FromQuery] DateTime? toUtc,
        CancellationToken cancellationToken)
    {
        var summary = await _mediator.Send(
            new GetDashboardSummaryQuery(GetCurrentUserId(), period, fromUtc, toUtc),
            cancellationToken);

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
                l.CreatedAtUtc,
                l.FirstTouchDueAtUtc)).ToList(),
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
            summary.ChurnRate,
            summary.AvgQualificationConfidence,
            summary.AvgTruthCoverage,
            summary.AvgTimeToTruthDays,
            summary.RiskRegisterCount,
            summary.RiskIntelligence.Select(item => new RiskIntelligenceItem(
                item.Key,
                item.Label,
                item.Count,
                item.Severity,
                item.Impact,
                item.RecommendedAction,
                item.Route)).ToList(),
            summary.TopRiskFlags.Select(flag => new RiskFlagSummaryItem(flag.Label, flag.Count)).ToList(),
            summary.ConfidenceWeightedPipelineValue,
            summary.CostOfNotKnowingValue,
            summary.CostOfNotKnowingDeals,
            summary.CostOfNotKnowingBreakdown.Select(deal => new CostOfNotKnowingDealItem(
                deal.OpportunityId,
                deal.OpportunityName,
                deal.AccountName,
                deal.Stage,
                deal.Amount,
                deal.CostOfNotKnowingValue,
                deal.TopFactors.Select(factor => new CostOfNotKnowingFactorItem(
                    factor.Key,
                    factor.Label,
                    factor.Weight,
                    factor.Contribution,
                    factor.State)).ToList())).ToList(),
            summary.CostOfNotKnowingTrend.Select(point => new ChartDataPoint(point.Label, point.Value)).ToList(),
            summary.ConfidenceCalibrationScore,
            summary.ConfidenceCalibrationSample,
            summary.MyPipelineValueTotal,
            summary.MyConfidenceWeightedPipelineValue,
            summary.MyQuotaTarget,
            summary.ForecastScenarios.Select(scenario => new ForecastScenarioItem(
                scenario.Key,
                scenario.Label,
                scenario.Value,
                scenario.DealCount,
                scenario.DeltaFromBase)).ToList());

        return Ok(response);
    }

    [HttpGet("manager/pipeline-health")]
    public async Task<ActionResult<ManagerPipelineHealthResponse>> GetManagerPipelineHealth(CancellationToken cancellationToken)
    {
        var health = await _mediator.Send(new GetManagerPipelineHealthQuery(GetCurrentUserId()), cancellationToken);
        var response = new ManagerPipelineHealthResponse(
            health.OpenOpportunities,
            health.PipelineValueTotal,
            health.MissingNextStepCount,
            health.NextStepOverdueCount,
            health.NoRecentActivityCount,
            health.CloseDateOverdueCount,
            health.StuckStageCount,
            health.CoachingOpenCount,
            health.CoachingOverdueCount,
            health.CoachingEscalationsLast7Days,
            health.ApprovalPendingCount,
            health.ApprovalCycleAvgHours,
            health.ReviewNeedsWorkCount,
            health.ReviewEscalatedCount,
            health.ReviewAckOverdueCount,
            health.ReviewAckAvgHours,
            health.PipelineByStage.Select(stage => new PipelineStageSummary(stage.Stage, stage.Count, stage.Value)).ToList(),
            health.TopTruthGaps.Select(flag => new RiskFlagSummaryItem(flag.Label, flag.Count)).ToList(),
            health.ReviewQueue.Select(item => new ManagerReviewDealItem(
                item.Id,
                item.Name,
                item.AccountName,
                item.Stage,
                item.Amount,
                item.OwnerName,
                item.Reason,
                item.TruthCoverage,
                item.TimeToTruthDays,
                item.NextStepDueAtUtc,
                item.LastActivityAtUtc,
                item.ExpectedCloseDate)).ToList());

        return Ok(response);
    }

    [HttpGet("manager/team-performance")]
    public async Task<ActionResult<SalesTeamPerformanceResponse>> GetSalesTeamPerformance(
        [FromQuery] string? period,
        [FromQuery] DateTime? fromUtc,
        [FromQuery] DateTime? toUtc,
        CancellationToken cancellationToken)
    {
        var perf = await _mediator.Send(
            new GetSalesTeamPerformanceQuery(GetCurrentUserId(), period, fromUtc, toUtc),
            cancellationToken);
        var response = new SalesTeamPerformanceResponse(
            perf.TeamRevenue,
            perf.DealsClosed,
            perf.WinRate,
            perf.AvgCycleDays,
            perf.TeamRevenuePrevious,
            perf.DealsClosedPrevious,
            perf.WinRatePrevious,
            perf.AvgCycleDaysPrevious,
            perf.Reps.Select(r => new RepPerformanceItem(
                r.UserId,
                r.Name,
                r.DealsClosed,
                r.Revenue,
                r.WinRate,
                r.AvgCycleDays,
                r.ActivitiesCount)).ToList());

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

        var roleLevel = await GetCurrentUserRoleLevelAsync(userId.Value, cancellationToken);
        var packName = await ResolveDashboardPackNameAsync(userId.Value, roleLevel, cancellationToken);
        var layout = await _layoutService.GetLayoutAsync(userId.Value, cancellationToken);
        var dimensions = layout.Dimensions.ToDictionary(
            item => item.Key,
            item => new DashboardCardDimensionsResponse(item.Value.Width, item.Value.Height));
        return Ok(new DashboardLayoutResponse(layout.CardOrder, layout.Sizes, dimensions, layout.HiddenCards, layout.KpiOrder, roleLevel, packName));
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
        var state = new Application.Dashboard.DashboardLayoutState(request.CardOrder, sizes, dimensions, hidden, request.KpiOrder);
        var updated = await _layoutService.UpdateLayoutAsync(userId.Value, state, cancellationToken);
        var responseDimensions = updated.Dimensions.ToDictionary(
            item => item.Key,
            item => new DashboardCardDimensionsResponse(item.Value.Width, item.Value.Height));
        var roleLevel = await GetCurrentUserRoleLevelAsync(userId.Value, cancellationToken);
        var packName = await ResolveDashboardPackNameAsync(userId.Value, roleLevel, cancellationToken);
        return Ok(new DashboardLayoutResponse(updated.CardOrder, updated.Sizes, responseDimensions, updated.HiddenCards, updated.KpiOrder, roleLevel, packName));
    }

    [HttpGet("layout/default")]
    public async Task<ActionResult<DashboardLayoutResponse>> GetDefaultLayout([FromQuery] int? level, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var roleLevel = await GetCurrentUserRoleLevelAsync(userId.Value, cancellationToken);
        var targetLevel = level.HasValue && level.Value > 0 ? level.Value : roleLevel;
        var layout = level.HasValue && level.Value > 0
            ? await _layoutService.GetDefaultLayoutForLevelAsync(targetLevel, cancellationToken)
            : await _layoutService.GetDefaultLayoutAsync(userId.Value, cancellationToken);
        var packName = level.HasValue && level.Value > 0
            ? $"H{targetLevel} Pack"
            : await ResolveDashboardPackNameAsync(userId.Value, targetLevel, cancellationToken);
        var dimensions = layout.Dimensions.ToDictionary(
            item => item.Key,
            item => new DashboardCardDimensionsResponse(item.Value.Width, item.Value.Height));
        return Ok(new DashboardLayoutResponse(layout.CardOrder, layout.Sizes, dimensions, layout.HiddenCards, layout.KpiOrder, targetLevel, packName));
    }

    [HttpPut("layout/default")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<DashboardLayoutResponse>> UpdateDefaultLayout(
        [FromBody] UpdateDashboardDefaultLayoutRequest request,
        CancellationToken cancellationToken)
    {
        if (request.RoleLevel < 1)
        {
            return BadRequest("Hierarchy level must be H1 or higher.");
        }

        var sizes = request.Sizes ?? new Dictionary<string, string>();
        var dimensions = request.Dimensions?
            .ToDictionary(item => item.Key, item => new Application.Dashboard.DashboardCardDimensions(item.Value.Width, item.Value.Height))
            ?? new Dictionary<string, Application.Dashboard.DashboardCardDimensions>();
        var hidden = request.HiddenCards ?? new List<string>();
        var state = new Application.Dashboard.DashboardLayoutState(request.CardOrder, sizes, dimensions, hidden, request.KpiOrder);
        var updated = await _layoutService.UpdateDefaultLayoutAsync(request.RoleLevel, state, cancellationToken);
        var packName = string.IsNullOrWhiteSpace(request.PackName)
            ? $"H{request.RoleLevel} Pack"
            : request.PackName.Trim();
        await UpsertRoleLevelTemplateAsync(request.RoleLevel, packName, updated, cancellationToken);
        var responseDimensions = updated.Dimensions.ToDictionary(
            item => item.Key,
            item => new DashboardCardDimensionsResponse(item.Value.Width, item.Value.Height));
        return Ok(new DashboardLayoutResponse(updated.CardOrder, updated.Sizes, responseDimensions, updated.HiddenCards, updated.KpiOrder, request.RoleLevel, packName));
    }

    [HttpPost("layout/reset")]
    public async Task<ActionResult<DashboardLayoutResponse>> ResetLayout(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var layout = await _layoutService.ResetLayoutAsync(userId.Value, cancellationToken);
        var roleLevel = await GetCurrentUserRoleLevelAsync(userId.Value, cancellationToken);
        var packName = $"H{Math.Max(1, roleLevel)} Pack";
        var dimensions = layout.Dimensions.ToDictionary(
            item => item.Key,
            item => new DashboardCardDimensionsResponse(item.Value.Width, item.Value.Height));
        return Ok(new DashboardLayoutResponse(layout.CardOrder, layout.Sizes, dimensions, layout.HiddenCards, layout.KpiOrder, roleLevel, packName));
    }

    [HttpGet("templates")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<IReadOnlyList<DashboardTemplateResponse>>> GetTemplates(CancellationToken cancellationToken)
    {
        var templates = await _layoutService.GetTemplatesAsync(cancellationToken);
        var responses = templates.Select(ToTemplateResponse).ToList();
        return Ok(responses);
    }

    [HttpPost("templates")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<DashboardTemplateResponse>> CreateTemplate(
        [FromBody] UpsertDashboardTemplateRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest("Template name is required.");
        }

        var state = new Application.Dashboard.DashboardTemplateState(
            Guid.Empty,
            request.Name.Trim(),
            request.Description,
            request.IsDefault ?? false,
            new Application.Dashboard.DashboardLayoutState(
                request.CardOrder ?? Array.Empty<string>(),
                request.Sizes ?? new Dictionary<string, string>(),
                request.Dimensions?.ToDictionary(
                    item => item.Key,
                    item => new Application.Dashboard.DashboardCardDimensions(item.Value.Width, item.Value.Height))
                ?? new Dictionary<string, Application.Dashboard.DashboardCardDimensions>(),
                request.HiddenCards ?? new List<string>(),
                request.KpiOrder));

        var created = await _layoutService.CreateTemplateAsync(state, cancellationToken);
        return CreatedAtAction(nameof(GetTemplates), new { id = created.Id }, ToTemplateResponse(created));
    }

    [HttpPut("templates/{id:guid}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<DashboardTemplateResponse>> UpdateTemplate(
        Guid id,
        [FromBody] UpsertDashboardTemplateRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest("Template name is required.");
        }

        var state = new Application.Dashboard.DashboardTemplateState(
            id,
            request.Name.Trim(),
            request.Description,
            request.IsDefault ?? false,
            new Application.Dashboard.DashboardLayoutState(
                request.CardOrder ?? Array.Empty<string>(),
                request.Sizes ?? new Dictionary<string, string>(),
                request.Dimensions?.ToDictionary(
                    item => item.Key,
                    item => new Application.Dashboard.DashboardCardDimensions(item.Value.Width, item.Value.Height))
                ?? new Dictionary<string, Application.Dashboard.DashboardCardDimensions>(),
                request.HiddenCards ?? new List<string>(),
                request.KpiOrder));

        var updated = await _layoutService.UpdateTemplateAsync(id, state, cancellationToken);
        return Ok(ToTemplateResponse(updated));
    }

    [HttpPost("templates/{id:guid}/default")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<DashboardTemplateResponse>> SetDefaultTemplate(Guid id, CancellationToken cancellationToken)
    {
        var updated = await _layoutService.SetDefaultTemplateAsync(id, cancellationToken);
        return Ok(ToTemplateResponse(updated));
    }

    private Guid? GetCurrentUserId()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var userId) ? userId : null;
    }

    private async Task<int> GetCurrentUserRoleLevelAsync(Guid userId, CancellationToken cancellationToken)
    {
        var levels = await _dbContext.UserRoles
            .Where(ur => ur.UserId == userId)
            .Select(ur => ur.Role != null ? ur.Role.HierarchyLevel : null)
            .ToListAsync(cancellationToken);

        return levels.Where(level => level.HasValue).Select(level => level!.Value).DefaultIfEmpty(1).Max();
    }

    private async Task<string> ResolveDashboardPackNameAsync(Guid userId, int fallbackRoleLevel, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == userId && !u.IsDeleted)
            .Select(u => u.CommandCenterLayoutJson)
            .FirstOrDefaultAsync(cancellationToken);

        if (string.IsNullOrWhiteSpace(user))
        {
            return $"H{fallbackRoleLevel} Pack";
        }

        try
        {
            var payload = System.Text.Json.JsonSerializer.Deserialize<UserLayoutSourcePayload>(user);
            if (payload is null)
            {
                return $"H{fallbackRoleLevel} Pack";
            }

            if (string.Equals(payload.SourceType, "role-default", StringComparison.OrdinalIgnoreCase))
            {
                var level = payload.SourceRoleLevel.GetValueOrDefault(fallbackRoleLevel);
                level = Math.Max(1, level);
                return string.IsNullOrWhiteSpace(payload.SourceName) ? $"H{level} Pack" : payload.SourceName!;
            }

            if (string.Equals(payload.SourceType, "custom", StringComparison.OrdinalIgnoreCase))
            {
                if (!string.IsNullOrWhiteSpace(payload.SourceName))
                {
                    return payload.SourceName!;
                }

                if (payload.SourceTemplateId.HasValue && payload.SourceTemplateId.Value != Guid.Empty)
                {
                    var templateName = await _dbContext.DashboardTemplates
                        .AsNoTracking()
                        .Where(t => !t.IsDeleted && t.Id == payload.SourceTemplateId.Value)
                        .Select(t => t.Name)
                        .FirstOrDefaultAsync(cancellationToken);

                    if (!string.IsNullOrWhiteSpace(templateName))
                    {
                        return templateName;
                    }
                }

                return "Custom Pack";
            }
        }
        catch (System.Text.Json.JsonException)
        {
            // Ignore payload parse issues and fallback to role default label.
        }

        return $"H{fallbackRoleLevel} Pack";
    }

    private async Task UpsertRoleLevelTemplateAsync(
        int roleLevel,
        string packName,
        DashboardLayoutState layout,
        CancellationToken cancellationToken)
    {
        var marker = $"{RoleLevelTemplatePrefix}{roleLevel}";
        var existingTemplateId = await _dbContext.DashboardTemplates
            .AsNoTracking()
            .Where(t => !t.IsDeleted && t.Description != null && t.Description.ToLower() == marker)
            .Select(t => (Guid?)t.Id)
            .FirstOrDefaultAsync(cancellationToken);

        var templateState = new DashboardTemplateState(
            existingTemplateId ?? Guid.Empty,
            packName,
            marker,
            false,
            layout);

        if (existingTemplateId.HasValue)
        {
            await _layoutService.UpdateTemplateAsync(existingTemplateId.Value, templateState, cancellationToken);
            return;
        }

        await _layoutService.CreateTemplateAsync(templateState, cancellationToken);
    }

    private sealed record UserLayoutSourcePayload(
        IReadOnlyList<string>? CardOrder,
        IReadOnlyDictionary<string, string>? Sizes,
        IReadOnlyDictionary<string, Application.Dashboard.DashboardCardDimensions>? Dimensions,
        IReadOnlyList<string>? HiddenCards,
        string? SourceKey,
        string? SourceName,
        string? SourceType,
        Guid? SourceTemplateId,
        int? SourceRoleLevel);

    private static DashboardTemplateResponse ToTemplateResponse(Application.Dashboard.DashboardTemplateState template)
    {
        var dimensions = template.Layout.Dimensions.ToDictionary(
            item => item.Key,
            item => new DashboardCardDimensionsResponse(item.Value.Width, item.Value.Height));

        return new DashboardTemplateResponse(
            template.Id,
            template.Name,
            template.Description,
            template.IsDefault,
            template.Layout.CardOrder,
            template.Layout.Sizes,
            dimensions,
            template.Layout.HiddenCards,
            template.Layout.KpiOrder);
    }
}
