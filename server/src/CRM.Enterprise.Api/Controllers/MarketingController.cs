using CRM.Enterprise.Api.Contracts.Marketing;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Marketing;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.MarketingView)]
[ApiController]
[Route("api/marketing")]
public sealed class MarketingController : ControllerBase
{
    private readonly IMarketingService _marketingService;
    private readonly IAuditEventService _auditEvents;
    private readonly IConfiguration _configuration;
    private readonly ITenantProvider _tenantProvider;

    public MarketingController(
        IMarketingService marketingService,
        IAuditEventService auditEvents,
        IConfiguration configuration,
        ITenantProvider tenantProvider)
    {
        _marketingService = marketingService;
        _auditEvents = auditEvents;
        _configuration = configuration;
        _tenantProvider = tenantProvider;
    }

    [HttpGet("campaigns")]
    public async Task<ActionResult<CampaignSearchResponse>> GetCampaigns(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? channel,
        [FromQuery] Guid? ownerUserId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var result = await _marketingService.SearchCampaignsAsync(
            new CampaignSearchRequest(search, status, channel, ownerUserId, page, pageSize),
            cancellationToken);

        return Ok(new CampaignSearchResponse(result.Items.Select(ToCampaignItem), result.Total));
    }

    [HttpGet("campaigns/{id:guid}")]
    public async Task<ActionResult<CampaignDetailResponse>> GetCampaign(Guid id, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var result = await _marketingService.GetCampaignAsync(id, cancellationToken);
        if (result is null)
        {
            return NotFound();
        }

        return Ok(new CampaignDetailResponse(
            ToCampaignItem(result.Campaign),
            result.Members.Select(ToCampaignMemberItem),
            ToPerformance(result.Performance)));
    }

    [HttpPost("campaigns")]
    [Authorize(Policy = Permissions.Policies.MarketingManage)]
    public async Task<ActionResult<CampaignListItem>> CreateCampaign([FromBody] UpsertCampaignRequest request, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var validationResult = ValidateCampaignRequest(request);
        if (validationResult is not null)
        {
            return validationResult;
        }

        var result = await _marketingService.CreateCampaignAsync(
            new CampaignUpsertRequest(
                request.Name,
                request.Type,
                request.Channel,
                request.Status,
                request.OwnerUserId,
                request.StartDateUtc,
                request.EndDateUtc,
                request.BudgetPlanned,
                request.BudgetActual,
                request.Objective),
            cancellationToken);

        if (!result.Success || result.Value is null)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "Campaign",
                result.Value.Id,
                "Created",
                null,
                null,
                null,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return CreatedAtAction(nameof(GetCampaign), new { id = result.Value.Id }, ToCampaignItem(result.Value));
    }

    [HttpPut("campaigns/{id:guid}")]
    [Authorize(Policy = Permissions.Policies.MarketingManage)]
    public async Task<IActionResult> UpdateCampaign(Guid id, [FromBody] UpsertCampaignRequest request, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var validationResult = ValidateCampaignRequest(request);
        if (validationResult is not null)
        {
            return validationResult;
        }

        var result = await _marketingService.UpdateCampaignAsync(
            id,
            new CampaignUpsertRequest(
                request.Name,
                request.Type,
                request.Channel,
                request.Status,
                request.OwnerUserId,
                request.StartDateUtc,
                request.EndDateUtc,
                request.BudgetPlanned,
                request.BudgetActual,
                request.Objective),
            cancellationToken);

        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "Campaign",
                id,
                "Updated",
                null,
                null,
                null,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("campaigns/{id:guid}/archive")]
    [Authorize(Policy = Permissions.Policies.MarketingManage)]
    public async Task<IActionResult> ArchiveCampaign(Guid id, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var result = await _marketingService.ArchiveCampaignAsync(id, cancellationToken);
        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "Campaign",
                id,
                "Archived",
                "Status",
                "Active",
                "Archived",
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return NoContent();
    }

    [HttpPost("campaigns/{id:guid}/members")]
    [Authorize(Policy = Permissions.Policies.MarketingManage)]
    public async Task<ActionResult<CampaignMemberItem>> AddMember(Guid id, [FromBody] UpsertCampaignMemberRequest request, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var validationResult = ValidateCampaignMemberRequest(request);
        if (validationResult is not null)
        {
            return validationResult;
        }

        var result = await _marketingService.AddMemberAsync(
            id,
            new CampaignMemberUpsertRequest(request.EntityType, request.EntityId, request.ResponseStatus),
            cancellationToken);

        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success || result.Value is null)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "CampaignMember",
                result.Value.Id,
                "Created",
                "CampaignId",
                null,
                id.ToString(),
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return Ok(ToCampaignMemberItem(result.Value));
    }

    [HttpDelete("campaigns/{id:guid}/members/{memberId:guid}")]
    [Authorize(Policy = Permissions.Policies.MarketingManage)]
    public async Task<IActionResult> RemoveMember(Guid id, Guid memberId, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var result = await _marketingService.RemoveMemberAsync(id, memberId, cancellationToken);
        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return SafeBadRequest(result.Error);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "CampaignMember",
                memberId,
                "Deleted",
                "CampaignId",
                id.ToString(),
                null,
                GetCurrentUserId(),
                GetCurrentUserName()),
            cancellationToken);

        return NoContent();
    }

    [HttpGet("campaigns/{id:guid}/performance")]
    public async Task<ActionResult<CampaignPerformanceResponse>> GetPerformance(Guid id, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var result = await _marketingService.GetPerformanceAsync(id, cancellationToken);
        if (result is null)
        {
            return NotFound();
        }

        return Ok(ToPerformance(result));
    }

    [HttpGet("campaigns/{id:guid}/health-score")]
    public async Task<ActionResult<CampaignHealthScoreItem>> GetHealthScore(Guid id, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var result = await _marketingService.GetCampaignHealthScoreAsync(id, cancellationToken);
        if (result is null)
        {
            return NotFound();
        }

        return Ok(ToCampaignHealthScoreItem(result));
    }

    [HttpGet("campaigns/{id:guid}/recommendations")]
    public async Task<ActionResult<IEnumerable<CampaignRecommendationItem>>> GetRecommendations(Guid id, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var result = await _marketingService.GetCampaignRecommendationsAsync(id, cancellationToken);
        return Ok(result.Select(ToCampaignRecommendationItem));
    }

    [HttpGet("attribution/summary")]
    public async Task<ActionResult<IEnumerable<AttributionSummaryItem>>> GetAttributionSummary(CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var items = await _marketingService.GetAttributionSummaryAsync(cancellationToken);
        return Ok(items.Select(item => new AttributionSummaryItem(
            item.CampaignId,
            item.CampaignName,
            item.Status,
            item.InfluencedOpportunities,
            item.InfluencedPipelineAmount,
            item.WonRevenue,
            item.ConversionRate,
            item.SampleOpportunityId)));
    }

    [HttpPost("recommendations/{id:guid}/decision")]
    [Authorize(Policy = Permissions.Policies.MarketingManage)]
    public async Task<ActionResult<CampaignRecommendationItem>> ApplyRecommendationDecision(Guid id, [FromBody] RecommendationDecisionBody request, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        if (request is null)
        {
            return SafeBadRequest("Request body is required.");
        }

        var decision = request.Decision?.Trim().ToLowerInvariant();
        if (decision is not ("accept" or "dismiss" or "snooze"))
        {
            return SafeBadRequest("Decision must be accept, dismiss, or snooze.");
        }

        var result = await _marketingService.ApplyRecommendationDecisionAsync(
            id,
            new RecommendationDecisionRequest(decision, request.Reason, request.ApplyActions),
            GetCurrentUserId(),
            cancellationToken);

        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success || result.Value is null)
        {
            return SafeBadRequest(result.Error);
        }

        return Ok(ToCampaignRecommendationItem(result.Value));
    }

    [HttpGet("attribution/opportunities/{opportunityId:guid}/explain")]
    public async Task<ActionResult<AttributionExplainabilityResponse>> ExplainOpportunityAttribution(Guid opportunityId, CancellationToken cancellationToken)
    {
        if (!IsMarketingCampaignsEnabled())
        {
            return FeatureDisabled();
        }

        var result = await _marketingService.GetAttributionExplainabilityAsync(opportunityId, cancellationToken);
        if (result is null)
        {
            return NotFound();
        }

        return Ok(ToExplainabilityResponse(result));
    }

    private static CampaignListItem ToCampaignItem(CampaignListItemDto dto)
        => new(
            dto.Id,
            dto.Name,
            dto.Type,
            dto.Channel,
            dto.Status,
            dto.OwnerUserId,
            dto.OwnerName,
            dto.StartDateUtc,
            dto.EndDateUtc,
            dto.BudgetPlanned,
            dto.BudgetActual,
            dto.Objective,
            dto.CreatedAtUtc,
            dto.UpdatedAtUtc);

    private static CampaignMemberItem ToCampaignMemberItem(CampaignMemberItemDto dto)
        => new(
            dto.Id,
            dto.CampaignId,
            dto.EntityType,
            dto.EntityId,
            dto.EntityName,
            dto.ResponseStatus,
            dto.AddedUtc,
            dto.UpdatedAtUtc);

    private static CampaignPerformanceResponse ToPerformance(CampaignPerformanceDto dto)
        => new(
            dto.CampaignId,
            dto.MemberCount,
            dto.InfluencedOpportunities,
            dto.InfluencedPipelineAmount,
            dto.WonRevenue,
            dto.ConversionRate,
            dto.Opportunities.Select(o => new CampaignAttributedOpportunityItem(
                o.OpportunityId,
                o.OpportunityName,
                o.AccountName,
                o.Stage,
                o.Amount,
                o.Currency,
                o.IsClosed,
                o.IsWon,
                o.ExpectedCloseDate,
                o.AttributedUtc)));

    private static CampaignHealthScoreItem ToCampaignHealthScoreItem(CampaignHealthScoreDto dto)
        => new(
            dto.CampaignId,
            dto.Score,
            dto.Trend,
            dto.CalculationWindowDays,
            dto.ComputedUtc,
            dto.ReasonChips,
            new CampaignHealthMetricsItem(
                dto.Metrics.InfluencedOpportunities,
                dto.Metrics.InfluencedPipelineAmount,
                dto.Metrics.WonRevenue,
                dto.Metrics.OpenAgingOver21Count,
                dto.Metrics.WinRate,
                dto.Metrics.BudgetVariancePct));

    private static CampaignRecommendationItem ToCampaignRecommendationItem(CampaignRecommendationDto dto)
        => new(
            dto.Id,
            dto.CampaignId,
            dto.Type,
            dto.Severity,
            dto.Title,
            dto.Description,
            dto.ImpactEstimate,
            dto.Confidence,
            dto.Status,
            dto.GeneratedUtc,
            dto.ExpiresUtc,
            dto.DecidedUtc,
            dto.DecisionReason,
            dto.Evidence);

    private static AttributionExplainabilityResponse ToExplainabilityResponse(AttributionExplainabilityDto dto)
        => new(
            dto.OpportunityId,
            dto.CampaignId,
            dto.Model,
            dto.AttributedUtc,
            dto.RuleVersion,
            dto.SourceEntityType,
            dto.SourceEntityId,
            dto.MemberAddedUtc,
            dto.Evidence,
            dto.Candidates.Select(c => new AttributionExplainabilityCandidateItem(
                c.EntityType,
                c.EntityId,
                c.EntityName,
                c.CampaignId,
                c.CampaignName,
                c.MemberAddedUtc)));

    private bool IsMarketingCampaignsEnabled()
    {
        var defaultEnabled = _configuration.GetValue<bool?>("Features:Marketing:Campaigns:EnabledByDefault") ?? false;
        if (defaultEnabled)
        {
            return true;
        }

        var enabledTenants = _configuration
            .GetSection("Features:Marketing:Campaigns:EnabledTenants")
            .Get<string[]>() ?? Array.Empty<string>();
        return enabledTenants.Contains(_tenantProvider.TenantKey, StringComparer.OrdinalIgnoreCase);
    }

    private ActionResult FeatureDisabled()
        => NotFound(new
        {
            code = "feature_disabled",
            message = "Marketing Campaign Management is not enabled for this tenant."
        });

    private ActionResult SafeBadRequest(string? error)
        => BadRequest(new
        {
            code = "validation_error",
            message = string.IsNullOrWhiteSpace(error) ? "Request validation failed." : error
        });

    private ActionResult? ValidateCampaignRequest(UpsertCampaignRequest request)
    {
        if (request is null)
        {
            return SafeBadRequest("Request body is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return SafeBadRequest("Campaign name is required.");
        }

        if (request.OwnerUserId == Guid.Empty)
        {
            return SafeBadRequest("Owner user is required.");
        }

        if (request.StartDateUtc.HasValue && request.EndDateUtc.HasValue && request.EndDateUtc < request.StartDateUtc)
        {
            return SafeBadRequest("End date cannot be before start date.");
        }

        if (request.BudgetPlanned < 0 || request.BudgetActual < 0)
        {
            return SafeBadRequest("Budgets must be zero or greater.");
        }

        return null;
    }

    private ActionResult? ValidateCampaignMemberRequest(UpsertCampaignMemberRequest request)
    {
        if (request is null)
        {
            return SafeBadRequest("Request body is required.");
        }

        if (request.EntityId == Guid.Empty)
        {
            return SafeBadRequest("Member entity id is required.");
        }

        var validEntityType = request.EntityType is "Lead" or "Contact";
        if (!validEntityType)
        {
            return SafeBadRequest("Entity type must be Lead or Contact.");
        }

        var validResponseStatus = request.ResponseStatus is "Sent" or "Responded" or "Qualified" or "Unsubscribed";
        if (!validResponseStatus)
        {
            return SafeBadRequest("Response status must be Sent, Responded, Qualified, or Unsubscribed.");
        }

        return null;
    }

    private Guid? GetCurrentUserId()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var parsed) ? parsed : null;
    }

    private string? GetCurrentUserName()
        => User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
}
