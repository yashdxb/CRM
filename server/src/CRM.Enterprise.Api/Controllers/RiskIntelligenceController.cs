using System.Security.Claims;
using CRM.Enterprise.Api.Contracts.RiskIntelligence;
using CRM.Enterprise.Application.RiskIntelligence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.DashboardView)]
[ApiController]
[Route("api/risk-intelligence")]
public class RiskIntelligenceController : ControllerBase
{
    private readonly IRiskIntelligenceReadService _riskIntelligenceReadService;

    public RiskIntelligenceController(IRiskIntelligenceReadService riskIntelligenceReadService)
    {
        _riskIntelligenceReadService = riskIntelligenceReadService;
    }

    [HttpGet("workspace")]
    public async Task<ActionResult<RiskIntelligenceWorkspaceResponse>> GetWorkspace(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var workspace = await _riskIntelligenceReadService.GetWorkspaceAsync(userId.Value, cancellationToken);
        return Ok(new RiskIntelligenceWorkspaceResponse(
            new RiskIntelligenceSummaryItem(
                workspace.Summary.TotalOpenRisks,
                workspace.Summary.ImmediateRisks,
                workspace.Summary.SoonRisks,
                workspace.Summary.StalePipelineCount,
                workspace.Summary.OverdueApprovals),
            workspace.PriorityRisks.Select(item => new RiskGuidanceItem(
                item.Id,
                item.RiskType,
                item.AffectedModule,
                item.EntityType,
                item.EntityId,
                item.EntityLabel,
                item.Owner,
                item.Score,
                item.Urgency,
                item.ReasonSummary,
                item.RecommendedAction,
                item.SourceSurface,
                item.DrillRoute,
                item.Evidence)).ToList(),
            workspace.Watchlist.Select(item => new RiskWatchlistItem(
                item.Label,
                item.Count,
                item.Severity,
                item.Context,
                item.Route)).ToList(),
            workspace.GeneratedAtUtc));
    }

    private Guid? GetCurrentUserId()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        return Guid.TryParse(id, out var parsed) ? parsed : null;
    }
}
