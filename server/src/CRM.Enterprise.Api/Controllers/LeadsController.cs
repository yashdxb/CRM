using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Leads;
using ApiLeadConversionRequest = CRM.Enterprise.Api.Contracts.Leads.LeadConversionRequest;
using ApiLeadCadenceTouchRequest = CRM.Enterprise.Api.Contracts.Leads.LeadCadenceTouchRequest;
using ApiLeadDuplicateCheckRequest = CRM.Enterprise.Api.Contracts.Leads.LeadDuplicateCheckRequest;
using AppLeadConversionRequest = CRM.Enterprise.Application.Leads.LeadConversionRequest;
using AppLeadCadenceTouchRequest = CRM.Enterprise.Application.Leads.LeadCadenceTouchRequest;
using AppLeadDuplicateCheckRequest = CRM.Enterprise.Application.Leads.LeadDuplicateCheckRequest;
using CRM.Enterprise.Api.Contracts.Audit;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Api.Contracts.Imports;
using CRM.Enterprise.Application.Qualifications;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Tenants;
// using CRM.Enterprise.Api.Jobs; // Removed Hangfire
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.LeadsView)]
[ApiController]
[Route("api/leads")]
public class LeadsController : ControllerBase
{
    private readonly ILeadService _leadService;
    private readonly ILeadImportService _leadImportService;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ITenantProvider _tenantProvider;
    private readonly ILeadConversationSummarizer _conversationSummarizer;

    public LeadsController(
        ILeadService leadService,
        ILeadImportService leadImportService,
        ICrmRealtimePublisher realtimePublisher,
        ITenantProvider tenantProvider,
        ILeadConversationSummarizer conversationSummarizer)
    {
        _leadService = leadService;
        _leadImportService = leadImportService;
        _realtimePublisher = realtimePublisher;
        _tenantProvider = tenantProvider;
        _conversationSummarizer = conversationSummarizer;
    }

    [HttpGet]
    [ProducesResponseType(typeof(LeadSearchResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<LeadSearchResponse>> GetLeads(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? conversationView,
        [FromQuery] string? sortBy,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var userId = Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var uid) ? uid : (Guid?)null;
        var result = await _leadService.SearchAsync(new LeadSearchRequest(search, status, conversationView, sortBy, page, pageSize, userId), cancellationToken);
        var items = result.Items.Select(ToApiItem);
        return Ok(new LeadSearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(LeadListItem), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LeadListItem>> GetLead(Guid id, CancellationToken cancellationToken)
    {
        var lead = await _leadService.GetAsync(id, cancellationToken);
        if (lead is null) return NotFound();
        return Ok(ToApiItem(lead));
    }

    [HttpGet("disposition-report")]
    [ProducesResponseType(typeof(LeadDispositionReportResponse), StatusCodes.Status200OK)]
    public async Task<ActionResult<LeadDispositionReportResponse>> GetDispositionReport(CancellationToken cancellationToken)
    {
        var report = await _leadService.GetDispositionReportAsync(cancellationToken);
        return Ok(new LeadDispositionReportResponse(
            new LeadDispositionTotalsItem(
                report.Totals.Disqualified,
                report.Totals.Lost,
                report.Totals.InNurture,
                report.Totals.RecycledLast30Days),
            report.DisqualificationReasons.Select(item => new LeadDispositionReasonCountItem(item.Reason, item.Count)),
            report.LossReasons.Select(item => new LeadDispositionReasonCountItem(item.Reason, item.Count)),
            report.OwnerRollups.Select(item => new LeadDispositionOwnerRollupItem(
                item.OwnerId,
                item.OwnerName,
                item.Disqualified,
                item.Lost,
                item.RecycledToNurture)),
            report.SourceRollups.Select(item => new LeadDispositionSourceRollupItem(
                item.Source,
                item.Disqualified,
                item.Lost,
                item.RecycledToNurture)),
            report.Trend.Select(item => new LeadDispositionTrendPointItem(
                item.PeriodStartUtc,
                item.Disqualified,
                item.Lost,
                item.RecycledToNurture))));
    }

    [HttpGet("{id:guid}/status-history")]
    [ProducesResponseType(typeof(IEnumerable<LeadStatusHistoryItem>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<LeadStatusHistoryItem>>> GetLeadStatusHistory(Guid id, CancellationToken cancellationToken)
    {
        var history = await _leadService.GetStatusHistoryAsync(id, cancellationToken);
        if (history is null) return NotFound();
        var items = history.Select(h => new LeadStatusHistoryItem(h.Id, h.Status, h.ChangedAtUtc, h.ChangedBy, h.Notes, h.Reason));
        return Ok(items);
    }

    [HttpGet("{id:guid}/cadence-touches")]
    [ProducesResponseType(typeof(IEnumerable<LeadCadenceTouchItem>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<LeadCadenceTouchItem>>> GetCadenceTouches(Guid id, CancellationToken cancellationToken)
    {
        var touches = await _leadService.GetCadenceTouchesAsync(id, cancellationToken);
        if (touches is null) return NotFound();
        var items = touches.Select(t => new LeadCadenceTouchItem(
            t.ActivityId,
            t.Channel,
            t.Outcome,
            t.CompletedAtUtc,
            t.NextStepDueAtUtc,
            t.OwnerName));
        return Ok(items);
    }

    [HttpGet("cadence-channels")]
    [ProducesResponseType(typeof(IEnumerable<LeadCadenceChannelItem>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LeadCadenceChannelItem>>> GetCadenceChannels(CancellationToken cancellationToken)
    {
        var channels = await _leadService.GetCadenceChannelsAsync(cancellationToken);
        var items = channels.Select(c => new LeadCadenceChannelItem(
            c.Id,
            c.Name,
            c.Order,
            c.IsDefault,
            c.IsActive));
        return Ok(items);
    }

    [HttpGet("evidence-sources")]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<string>>> GetEvidenceSources(CancellationToken cancellationToken)
    {
        var items = await _leadService.GetEvidenceSourcesAsync(cancellationToken);
        return Ok(items);
    }

    [HttpGet("qualification-policy")]
    [ProducesResponseType(typeof(QualificationPolicy), StatusCodes.Status200OK)]
    public async Task<ActionResult<QualificationPolicy>> GetQualificationPolicy(CancellationToken cancellationToken)
    {
        var policy = await _leadService.GetQualificationPolicyAsync(cancellationToken);
        return Ok(policy);
    }

    [HttpPost("duplicate-check")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(typeof(LeadDuplicateCheckResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LeadDuplicateCheckResponse>> CheckDuplicates(
        [FromBody] ApiLeadDuplicateCheckRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.FirstName) || string.IsNullOrWhiteSpace(request.LastName))
        {
            return BadRequest("First name and last name are required.");
        }

        var result = await _leadService.CheckDuplicatesAsync(
            new AppLeadDuplicateCheckRequest(
                request.FirstName,
                request.LastName,
                request.Email,
                request.Phone,
                request.CompanyName,
                request.ExcludeLeadId),
            cancellationToken);

        return Ok(ToApiDuplicateCheck(result));
    }

    [HttpPost("{id:guid}/cadence-touch")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(typeof(LeadCadenceTouchItem), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LeadCadenceTouchItem>> LogCadenceTouch(Guid id, [FromBody] ApiLeadCadenceTouchRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Channel) || string.IsNullOrWhiteSpace(request.Outcome))
        {
            return BadRequest("Channel and outcome are required.");
        }

        var result = await _leadService.LogCadenceTouchAsync(
            id,
            new AppLeadCadenceTouchRequest(request.Channel, request.Outcome, request.NextStepDueAtUtc),
            GetActor(),
            cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var value = result.Value!;
        return Ok(new LeadCadenceTouchItem(
            value.ActivityId,
            value.Channel,
            value.Outcome,
            value.CompletedAtUtc,
            value.NextStepDueAtUtc,
            value.OwnerName));
    }

    [HttpGet("{id:guid}/audit")]
    [ProducesResponseType(typeof(IEnumerable<AuditEventItem>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<AuditEventItem>>> GetLeadAudit(Guid id, CancellationToken cancellationToken)
    {
        var audit = await _leadService.GetAuditAsync(id, cancellationToken);
        if (audit is null) return NotFound();
        var items = audit.Select(a => new AuditEventItem(
            a.Id,
            a.EntityType,
            a.EntityId,
            a.Action,
            a.Field,
            a.OldValue,
            a.NewValue,
            a.ChangedByUserId,
            a.ChangedByName,
            a.CreatedAtUtc));
        return Ok(items);
    }

    [HttpPost("{id:guid}/ai-score")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(typeof(LeadAiScoreResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LeadAiScoreResponse>> ScoreLead(Guid id, CancellationToken cancellationToken)
    {
        var result = await _leadService.ScoreAsync(id, cancellationToken);
        if (result is null) return NotFound();
        return Ok(new LeadAiScoreResponse(result.Score, result.Confidence, result.Rationale, result.ScoredAtUtc));
    }

    [HttpPost("{id:guid}/conversation-summary")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(typeof(LeadConversationSummaryResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LeadConversationSummaryResponse>> GenerateConversationSummary(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _conversationSummarizer.SummarizeAsync(id, cancellationToken);
            return Ok(new LeadConversationSummaryResponse(result.Summary, result.Sentiment, result.NextAction, result.GeneratedAtUtc));
        }
        catch (InvalidOperationException ex) when (ex.Message.Contains("not found"))
        {
            return NotFound();
        }
    }

    [HttpPost("{id:guid}/recycle-to-nurture")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RecycleToNurture(Guid id, CancellationToken cancellationToken)
    {
        var result = await _leadService.RecycleToNurtureAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(typeof(LeadListItem), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<LeadListItem>> Create([FromBody] UpsertLeadRequest request, CancellationToken cancellationToken)
    {
        var result = await _leadService.CreateAsync(MapUpsertRequest(request), GetActor(), cancellationToken);
        if (!result.Success)
        {
            return BadRequest(result.Error);
        }

        await PublishLeadRealtimeAsync("created", result.Value!.Id, result.Value.Status, cancellationToken);
        return CreatedAtAction(nameof(GetLead), new { id = result.Value!.Id }, ToApiItem(result.Value!));
    }

    [HttpPost("import")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(typeof(CsvImportResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CsvImportResult>> Import([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        await using var stream = file.OpenReadStream();
        var result = await _leadImportService.ImportAsync(stream, GetActor(), cancellationToken);
        var errors = result.Errors.Select(error => new CsvImportError(error.RowNumber, error.Message)).ToList();
        return Ok(new CsvImportResult(result.Total, result.Imported, result.Failed, errors));
    }

    [HttpPost("import/queue")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(typeof(ImportJobResponse), StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ImportJobResponse>> QueueImport([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        await using var stream = file.OpenReadStream();
        var result = await _leadImportService.QueueImportAsync(stream, file.FileName, GetActor(), cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        var value = result.Value!;
        await PublishImportProgressAsync(value.ImportJobId, value.EntityType, value.Status, 0, 0, 0, 0, null, cancellationToken);
        return Accepted(new ImportJobResponse(value.ImportJobId, value.EntityType, value.Status));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertLeadRequest request, CancellationToken cancellationToken)
    {
        var before = await _leadService.GetAsync(id, cancellationToken);
        var result = await _leadService.UpdateAsync(id, MapUpsertRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var after = await _leadService.GetAsync(id, cancellationToken);
        if (after is not null)
        {
            if (!string.Equals(before?.Status, after.Status, StringComparison.OrdinalIgnoreCase))
            {
                await PublishLeadMovedRealtimeAsync(after.Id, before?.Status, after.Status, cancellationToken);
            }
            await PublishLeadRealtimeAsync("updated", after.Id, after.Status, cancellationToken);
        }
        return NoContent();
    }

    [HttpPost("{id:guid}/convert")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(typeof(LeadConversionResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<LeadConversionResponse>> Convert(Guid id, [FromBody] ApiLeadConversionRequest request, CancellationToken cancellationToken)
    {
        var result = await _leadService.ConvertAsync(id, MapConversionRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var value = result.Value!;
        await PublishLeadMovedRealtimeAsync(id, "Qualified", "Converted", cancellationToken);
        await PublishLeadRealtimeAsync("updated", id, "Converted", cancellationToken);
        return Ok(new LeadConversionResponse(value.LeadId, value.AccountId, value.ContactId, value.OpportunityId));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var result = await _leadService.DeleteAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishLeadRealtimeAsync("deleted", id, null, cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id:guid}/owner")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateOwner(Guid id, [FromBody] UpdateOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var result = await _leadService.UpdateOwnerAsync(id, request.OwnerId, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPatch("{id:guid}/status")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Status is required.");
        }

        var before = await _leadService.GetAsync(id, cancellationToken);
        var result = await _leadService.UpdateStatusAsync(id, request.Status, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var after = await _leadService.GetAsync(id, cancellationToken);
        if (after is not null)
        {
            await PublishLeadMovedRealtimeAsync(id, before?.Status, after.Status, cancellationToken);
            await PublishLeadRealtimeAsync("updated", id, after.Status, cancellationToken);
        }
        return NoContent();
    }

    [HttpPost("bulk-assign-owner")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> BulkAssignOwner([FromBody] BulkAssignOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No lead ids provided.");
        }

        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var result = await _leadService.BulkAssignOwnerAsync(request.Ids, request.OwnerId, cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost("bulk-update-status")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> BulkUpdateStatus([FromBody] BulkUpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No lead ids provided.");
        }

        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Status is required.");
        }

        var result = await _leadService.BulkUpdateStatusAsync(request.Ids, request.Status, cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    private static LeadListItem ToApiItem(LeadListItemDto dto)
    {
        return new LeadListItem(
            dto.Id,
            dto.LeadNumber,
            dto.Name,
            dto.CompanyName,
            dto.LeadSummary,
            dto.Status,
            dto.Email,
            dto.Phone,
            dto.PhoneTypeId,
            dto.OwnerId,
            dto.OwnerName,
            dto.Score,
            dto.CreatedAtUtc,
            dto.Source,
            dto.RoutingReason,
            dto.Territory,
            dto.JobTitle,
            dto.AccountId,
            dto.ContactId,
            dto.ConvertedOpportunityId,
            dto.DisqualificationReasonId,
            dto.LossReasonId,
            dto.LossCompetitor,
            dto.LossNotes,
            dto.NurtureFollowUpAtUtc,
            dto.QualifiedNotes,
            dto.BuyerType,
            dto.MotivationUrgency,
            dto.FinancingReadiness,
            dto.PreApprovalStatus,
            dto.PreferredArea,
            dto.PreferredPropertyType,
            dto.BudgetBand,
            dto.FirstTouchDueAtUtc,
            dto.FirstTouchedAtUtc,
            dto.BudgetAvailability,
            dto.BudgetEvidence,
            dto.ReadinessToSpend,
            dto.ReadinessEvidence,
            dto.BuyingTimeline,
            dto.TimelineEvidence,
            dto.ProblemSeverity,
            dto.ProblemEvidence,
            dto.EconomicBuyer,
            dto.EconomicBuyerEvidence,
            dto.IcpFit,
            dto.IcpFitEvidence,
            dto.CustomQualificationFactors.Select(item => new CustomQualificationFactorItem(item.Key, item.Value, item.Evidence)),
            dto.QualificationConfidence,
            dto.QualificationConfidenceLabel,
            dto.TruthCoverage,
            dto.AssumptionsOutstanding,
            dto.WeakestSignal,
            dto.WeakestState,
            dto.NextEvidenceSuggestions,
            dto.ScoreBreakdown.Select(item => new CRM.Enterprise.Api.Contracts.Leads.LeadScoreBreakdownItem(item.Factor, item.Score, item.MaxScore)),
            dto.RiskFlags,
            dto.ConversationScore,
            dto.ConversationScoreLabel,
            dto.ConversationScoreReasons,
            dto.ConversationScoreUpdatedAtUtc,
            dto.ConversationSignalAvailable,
            dto.ConversationAiDimensionScore,
            dto.ConversationAiToneLabel,
            dto.ConversationAiSentiment,
            dto.ConversationAiBuyingReadiness,
            dto.ConversationAiSemanticIntent,
            dto.ConversationAiToneJustification,
            dto.IsConverted,
            new LeadConversionReadinessItem(
                dto.ConversionReadiness.Score,
                dto.ConversionReadiness.Label,
                dto.ConversionReadiness.Summary,
                dto.ConversionReadiness.QualificationSignalScore,
                dto.ConversionReadiness.ConversationSignalScore,
                dto.ConversionReadiness.ConversationSignalAvailable,
                dto.ConversionReadiness.ManagerReviewRecommended,
                dto.ConversionReadiness.PrimaryGap,
                dto.ConversionReadiness.Reasons),
            dto.LastActivityAtUtc);
    }

    private async Task PublishLeadRealtimeAsync(string action, Guid leadId, string? status, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return;
        }

        await _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            $"pipeline.lead.{action}",
            new
            {
                leadId,
                action,
                status,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);

        await _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "entity.crud.changed",
            new
            {
                entityType = "Lead",
                entityId = leadId,
                action,
                changedFields = status is null ? Array.Empty<string>() : new[] { "Status" },
                actorUserId = GetActor().UserId,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);

        await _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "dashboard.metrics.delta",
            new
            {
                source = "lead",
                leadId,
                action,
                status,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);
    }

    private Task PublishLeadMovedRealtimeAsync(Guid leadId, string? fromStatus, string? toStatus, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty || string.IsNullOrWhiteSpace(toStatus) || string.Equals(fromStatus, toStatus, StringComparison.OrdinalIgnoreCase))
        {
            return Task.CompletedTask;
        }

        return _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "pipeline.lead.moved",
            new
            {
                leadId,
                fromStatus,
                toStatus,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);
    }

    private Task PublishImportProgressAsync(
        Guid jobId,
        string entityType,
        string status,
        int processed,
        int total,
        int succeeded,
        int failed,
        string? errorSummary,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "import.job.progress",
            new
            {
                jobId,
                entityType,
                status,
                processed,
                total,
                succeeded,
                failed,
                startedAtUtc = DateTime.UtcNow,
                finishedAtUtc = status is "Completed" or "Failed" ? DateTime.UtcNow : (DateTime?)null,
                errorSummary
            },
            cancellationToken);
    }

    private static LeadUpsertRequest MapUpsertRequest(UpsertLeadRequest request)
    {
        return new LeadUpsertRequest(
            request.FirstName,
            request.LastName,
            request.Email,
            request.Phone,
            request.PhoneTypeId,
            request.CompanyName,
            request.LeadSummary,
            request.JobTitle,
            request.Status,
            request.OwnerId,
            request.AssignmentStrategy,
            request.Source,
            request.Territory,
            request.AutoScore,
            request.Score,
            request.AccountId,
            request.ContactId,
            request.DisqualificationReasonId,
            request.LossReasonId,
            request.LossCompetitor,
            request.LossNotes,
            request.NurtureFollowUpAtUtc,
            request.QualifiedNotes,
            request.BuyerType,
            request.MotivationUrgency,
            request.FinancingReadiness,
            request.PreApprovalStatus,
            request.PreferredArea,
            request.PreferredPropertyType,
            request.BudgetBand,
            request.BudgetAvailability,
            request.BudgetEvidence,
            request.ReadinessToSpend,
            request.ReadinessEvidence,
            request.BuyingTimeline,
            request.TimelineEvidence,
            request.ProblemSeverity,
            request.ProblemEvidence,
            request.EconomicBuyer,
            request.EconomicBuyerEvidence,
            request.IcpFit,
            request.IcpFitEvidence,
            request.CustomQualificationFactors?.Select(item => new CRM.Enterprise.Application.Leads.LeadCustomQualificationFactorValue(
                item.Key,
                item.Value,
                item.Evidence)).ToArray());
    }

    private static LeadDuplicateCheckResponse ToApiDuplicateCheck(LeadDuplicateCheckResultDto result)
    {
        return new LeadDuplicateCheckResponse(
            result.Decision,
            result.IsBlocked,
            result.HasWarnings,
            result.Matches.Select(match => new LeadDuplicateCheckCandidate(
                match.LeadId,
                match.Name,
                match.CompanyName,
                match.Email,
                match.Phone,
                match.LeadScore,
                match.MatchScore,
                match.MatchLevel,
                match.MatchedSignals)));
    }

    private static AppLeadConversionRequest MapConversionRequest(ApiLeadConversionRequest request)
    {
        return new CRM.Enterprise.Application.Leads.LeadConversionRequest(
            request.CreateAccount,
            request.AccountName,
            request.CreateContact,
            request.CreateOpportunity,
            request.OpportunityName,
            request.Amount,
            request.ExpectedCloseDate,
            request.DealType,
            request.Segment,
            request.Stage,
            request.IsCompetitive,
            request.HasExecutiveChampion,
            request.IsStrategic,
            request.Velocity,
            request.ManagerApproved,
            request.OverrideReason);
    }

    private LeadActor GetActor()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(id, out var parsed) ? parsed : Guid.Empty;
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new LeadActor(userId, name);
    }

}
