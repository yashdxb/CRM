using CRM.Enterprise.Api.Contracts.Reports;
using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Security;
using CRM.Enterprise.Infrastructure.Reporting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.ReportsView)]
[ApiController]
[Route("api/reports")]
public class ReportsController : ControllerBase
{
    private readonly IDashboardReadService _dashboardReadService;
    private readonly ReportingOptions _reportingOptions;

    public ReportsController(
        IDashboardReadService dashboardReadService,
        IOptions<ReportingOptions> reportingOptions)
    {
        _dashboardReadService = dashboardReadService;
        _reportingOptions = reportingOptions.Value;
    }

    [HttpGet("embed-config")]
    public ActionResult<ReportsEmbedConfigResponse> GetEmbedConfig()
    {
        // When Report Server is configured, point the viewer there
        if (_reportingOptions.UseReportServer)
        {
            return Ok(new ReportsEmbedConfigResponse(
                true,
                "report-server",
                "/api/report-server/proxy/api/reports",
                null));
        }

        var serviceUrl = "/api/telerik-reports";
        var pipelineByStageReportSource = "CRM.Enterprise.Api.Reporting.PipelineByStageTelerikReport, CRM.Enterprise.Api";
        var enabled = _reportingOptions.EnableEmbeddedViewer;

        return Ok(new ReportsEmbedConfigResponse(
            enabled,
            "telerik-rest-service",
            serviceUrl,
            pipelineByStageReportSource));
    }

    [HttpGet("pipeline-by-stage")]
    public async Task<ActionResult<PipelineByStageReportResponse>> GetPipelineByStage(CancellationToken cancellationToken)
    {
        var summary = await _dashboardReadService.GetSummaryAsync(GetCurrentUserId(), cancellationToken);
        var totalValue = summary.PipelineValueTotal <= 0m
            ? summary.PipelineValue.Sum(stage => stage.Value)
            : summary.PipelineValueTotal;

        var rows = summary.PipelineValue
            .OrderByDescending(stage => stage.Value)
            .ThenBy(stage => stage.Stage)
            .Select(stage => new PipelineByStageRowResponse(
                stage.Stage,
                stage.Count,
                stage.Value,
                totalValue <= 0m ? 0m : Math.Round((stage.Value / totalValue) * 100m, 2)))
            .ToList();

        return Ok(new PipelineByStageReportResponse(
            DateTime.UtcNow,
            summary.OpenOpportunities,
            totalValue,
            rows));
    }

    private Guid? GetCurrentUserId()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var userId) ? userId : null;
    }

}
