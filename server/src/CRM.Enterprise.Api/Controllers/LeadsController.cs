using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Leads;
using ApiLeadConversionRequest = CRM.Enterprise.Api.Contracts.Leads.LeadConversionRequest;
using ApiLeadCadenceTouchRequest = CRM.Enterprise.Api.Contracts.Leads.LeadCadenceTouchRequest;
using AppLeadConversionRequest = CRM.Enterprise.Application.Leads.LeadConversionRequest;
using AppLeadCadenceTouchRequest = CRM.Enterprise.Application.Leads.LeadCadenceTouchRequest;
using CRM.Enterprise.Api.Contracts.Audit;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Api.Contracts.Imports;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
// using CRM.Enterprise.Api.Jobs; // Removed Hangfire
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.LeadsView)]
[ApiController]
[Route("api/leads")]
public class LeadsController : ControllerBase
{
    private readonly ILeadService _leadService;
    private readonly ILeadImportService _leadImportService;
    private readonly CrmDbContext _dbContext;

    public LeadsController(
        ILeadService leadService,
        ILeadImportService leadImportService,
        CrmDbContext dbContext)
    {
        _leadService = leadService;
        _leadImportService = leadImportService;
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<LeadSearchResponse>> GetLeads(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var result = await _leadService.SearchAsync(new LeadSearchRequest(search, status, page, pageSize), cancellationToken);
        var items = result.Items.Select(ToApiItem);
        return Ok(new LeadSearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<LeadListItem>> GetLead(Guid id, CancellationToken cancellationToken)
    {
        var lead = await _leadService.GetAsync(id, cancellationToken);
        if (lead is null) return NotFound();
        return Ok(ToApiItem(lead));
    }

    [HttpGet("{id:guid}/status-history")]
    public async Task<ActionResult<IEnumerable<LeadStatusHistoryItem>>> GetLeadStatusHistory(Guid id, CancellationToken cancellationToken)
    {
        var history = await _leadService.GetStatusHistoryAsync(id, cancellationToken);
        if (history is null) return NotFound();
        var items = history.Select(h => new LeadStatusHistoryItem(h.Id, h.Status, h.ChangedAtUtc, h.ChangedBy, h.Notes));
        return Ok(items);
    }

    [HttpGet("{id:guid}/cadence-touches")]
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
    public async Task<ActionResult<IEnumerable<LeadCadenceChannelItem>>> GetCadenceChannels(CancellationToken cancellationToken)
    {
        async Task<List<LeadCadenceChannelItem>> LoadAsync()
        {
            return await _dbContext.LeadCadenceChannels
                .AsNoTracking()
                .Where(c => c.IsActive && !c.IsDeleted)
                .OrderBy(c => c.Order)
                .ThenBy(c => c.Name)
                .Select(c => new LeadCadenceChannelItem(
                    c.Id,
                    c.Name,
                    c.Order,
                    c.IsDefault,
                    c.IsActive))
                .ToListAsync(cancellationToken);
        }

        var items = await LoadAsync();
        if (items.Count == 0)
        {
            var now = DateTime.UtcNow;
            _dbContext.LeadCadenceChannels.AddRange(new[]
            {
                new LeadCadenceChannel { Name = "Call", Order = 1, IsActive = true, IsDefault = true, CreatedAtUtc = now },
                new LeadCadenceChannel { Name = "Email", Order = 2, IsActive = true, CreatedAtUtc = now },
                new LeadCadenceChannel { Name = "LinkedIn", Order = 3, IsActive = true, CreatedAtUtc = now }
            });

            await _dbContext.SaveChangesAsync(cancellationToken);
            items = await LoadAsync();
        }

        return Ok(items);
    }

    [HttpPost("{id:guid}/cadence-touch")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
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
    public async Task<ActionResult<LeadAiScoreResponse>> ScoreLead(Guid id, CancellationToken cancellationToken)
    {
        var result = await _leadService.ScoreAsync(id, cancellationToken);
        if (result is null) return NotFound();
        return Ok(new LeadAiScoreResponse(result.Score, result.Confidence, result.Rationale, result.ScoredAtUtc));
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<ActionResult<LeadListItem>> Create([FromBody] UpsertLeadRequest request, CancellationToken cancellationToken)
    {
        var result = await _leadService.CreateAsync(MapUpsertRequest(request), GetActor(), cancellationToken);
        if (!result.Success)
        {
            return BadRequest(result.Error);
        }

        return CreatedAtAction(nameof(GetLead), new { id = result.Value!.Id }, ToApiItem(result.Value!));
    }

    [HttpPost("import")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
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
        return Accepted(new ImportJobResponse(value.ImportJobId, value.EntityType, value.Status));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertLeadRequest request, CancellationToken cancellationToken)
    {
        var result = await _leadService.UpdateAsync(id, MapUpsertRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost("{id:guid}/convert")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<ActionResult<LeadConversionResponse>> Convert(Guid id, [FromBody] ApiLeadConversionRequest request, CancellationToken cancellationToken)
    {
        var result = await _leadService.ConvertAsync(id, MapConversionRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var value = result.Value!;
        return Ok(new LeadConversionResponse(value.LeadId, value.AccountId, value.ContactId, value.OpportunityId));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var result = await _leadService.DeleteAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPatch("{id:guid}/owner")]
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
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Status is required.");
        }

        var result = await _leadService.UpdateStatusAsync(id, request.Status, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost("bulk-assign-owner")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
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
            dto.Name,
            dto.CompanyName,
            dto.Status,
            dto.Email,
            dto.Phone,
            dto.OwnerId,
            dto.OwnerName,
            dto.Score,
            dto.CreatedAtUtc,
            dto.Source,
            dto.Territory,
            dto.JobTitle,
            dto.AccountId,
            dto.ContactId,
            dto.ConvertedOpportunityId,
            dto.DisqualifiedReason,
            dto.NurtureFollowUpAtUtc,
            dto.QualifiedNotes,
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
            dto.QualificationConfidence,
            dto.QualificationConfidenceLabel,
            dto.TruthCoverage,
            dto.AssumptionsOutstanding,
            dto.WeakestSignal,
            dto.WeakestState,
            dto.ScoreBreakdown.Select(item => new CRM.Enterprise.Api.Contracts.Leads.LeadScoreBreakdownItem(item.Factor, item.Score, item.MaxScore)),
            dto.RiskFlags);
    }

    private static LeadUpsertRequest MapUpsertRequest(UpsertLeadRequest request)
    {
        return new LeadUpsertRequest(
            request.FirstName,
            request.LastName,
            request.Email,
            request.Phone,
            request.CompanyName,
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
            request.DisqualifiedReason,
            request.NurtureFollowUpAtUtc,
            request.QualifiedNotes,
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
            request.IcpFitEvidence);
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
            request.ExpectedCloseDate);
    }

    private LeadActor GetActor()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(id, out var parsed) ? parsed : Guid.Empty;
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new LeadActor(userId, name);
    }

}
