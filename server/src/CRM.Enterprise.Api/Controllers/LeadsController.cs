using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Leads;
using ApiLeadConversionRequest = CRM.Enterprise.Api.Contracts.Leads.LeadConversionRequest;
using AppLeadConversionRequest = CRM.Enterprise.Application.Leads.LeadConversionRequest;
using CRM.Enterprise.Api.Contracts.Audit;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Api.Utilities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Api.Contracts.Imports;
// using CRM.Enterprise.Api.Jobs; // Removed Hangfire
using Microsoft.AspNetCore.Hosting;
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
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IWebHostEnvironment _environment;

    public LeadsController(
        ILeadService leadService,
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IWebHostEnvironment environment)
    {
        _leadService = leadService;
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _environment = environment;
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

        var rows = await CsvImportHelper.ReadAsync(file, cancellationToken);
        if (rows.Count == 0)
        {
            return Ok(new CsvImportResult(0, 0, 0, Array.Empty<CsvImportError>()));
        }

        var errors = new List<CsvImportError>();
        var imported = 0;

        for (var i = 0; i < rows.Count; i++)
        {
            var row = rows[i];
            var fullName = CsvImportHelper.ReadValue(row, "name", "fullname", "full_name");
            var firstName = CsvImportHelper.ReadValue(row, "firstname", "first_name");
            var lastName = CsvImportHelper.ReadValue(row, "lastname", "last_name");
            if (string.IsNullOrWhiteSpace(firstName) && string.IsNullOrWhiteSpace(lastName) && !string.IsNullOrWhiteSpace(fullName))
            {
                (firstName, lastName) = CsvImportHelper.SplitName(fullName);
            }

            if (string.IsNullOrWhiteSpace(firstName) && string.IsNullOrWhiteSpace(lastName))
            {
                errors.Add(new CsvImportError(i + 2, "Lead name is required."));
                continue;
            }

            var ownerEmail = CsvImportHelper.ReadValue(row, "owner", "owneremail", "owner_email");
            var ownerId = await ResolveOwnerIdFromEmailAsync(ownerEmail, cancellationToken);
            var assignmentStrategy = CsvImportHelper.ReadValue(row, "assignment", "assignmentstrategy");
            var territory = CsvImportHelper.ReadValue(row, "territory");

            var statusName = CsvImportHelper.ReadValue(row, "status");
            var status = await ResolveLeadStatusAsync(statusName, cancellationToken);

            var request = new UpsertLeadRequest
            {
                FirstName = firstName ?? string.Empty,
                LastName = lastName ?? string.Empty,
                Email = CsvImportHelper.ReadValue(row, "email"),
                Phone = CsvImportHelper.ReadValue(row, "phone"),
                CompanyName = CsvImportHelper.ReadValue(row, "company", "companyname"),
                JobTitle = CsvImportHelper.ReadValue(row, "jobtitle", "title"),
                Status = statusName,
                OwnerId = ownerId,
                AssignmentStrategy = assignmentStrategy,
                Source = CsvImportHelper.ReadValue(row, "source"),
                Territory = territory,
                AutoScore = CsvImportHelper.ReadBool(row, "autoscore"),
                Score = CsvImportHelper.ReadInt(row, "score") ?? 0
            };

            var resolvedOwnerId = await ResolveOwnerIdAsync(ownerId, territory, assignmentStrategy, cancellationToken);
            var score = ResolveLeadScore(request);

            var lead = new Lead
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Phone = request.Phone,
                CompanyName = request.CompanyName,
                JobTitle = request.JobTitle,
                LeadStatusId = status.Id,
                OwnerId = resolvedOwnerId,
                Source = request.Source,
                Territory = territory,
                Score = score,
                CreatedAtUtc = DateTime.UtcNow
            };

            // Attach the status entity so the FK is valid even when the status is created on demand.
            lead.Status = status;

            _dbContext.Leads.Add(lead);
            var resolvedStatusName = await ResolveLeadStatusNameAsync(status.Id, cancellationToken);
            ApplyStatusSideEffects(lead, resolvedStatusName);
            AddStatusHistory(lead, status.Id, "Imported lead");
            imported++;
        }

        if (imported > 0)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return Ok(new CsvImportResult(rows.Count, imported, rows.Count - imported, errors));
    }

    [HttpPost("import/queue")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<ActionResult<ImportJobResponse>> QueueImport([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        var tenantKey = _tenantProvider.TenantKey;
        var storageRoot = Path.Combine(_environment.ContentRootPath, "uploads", "imports", tenantKey.ToLowerInvariant());
        Directory.CreateDirectory(storageRoot);

        var safeName = Path.GetFileName(file.FileName);
        var importJob = new ImportJob
        {
            EntityType = "Leads",
            FileName = safeName,
            Status = "Queued",
            RequestedById = GetUserId()
        };
        _dbContext.ImportJobs.Add(importJob);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var storedName = $"{importJob.Id:N}_{safeName}";
        var storagePath = Path.Combine(storageRoot, storedName);
        await using (var stream = System.IO.File.Create(storagePath))
        {
            await file.CopyToAsync(stream, cancellationToken);
        }

        importJob.FilePath = storagePath;
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Hangfire removed: import jobs must be processed directly or via another mechanism if needed

        return Accepted(new ImportJobResponse(importJob.Id, importJob.EntityType, importJob.Status));
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
            dto.ConvertedOpportunityId);
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
            request.ContactId);
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

    private async Task<LeadStatus> ResolveLeadStatusAsync(string? statusName, CancellationToken cancellationToken)
    {
        var name = string.IsNullOrWhiteSpace(statusName) ? "New" : statusName;
        var status = await _dbContext.LeadStatuses.FirstOrDefaultAsync(s => s.Name == name, cancellationToken)
                     ?? await _dbContext.LeadStatuses.OrderBy(s => s.Order).FirstOrDefaultAsync(cancellationToken);
        if (status is not null)
        {
            return status;
        }

        // Seed a default status on the fly if the tenant has no lead statuses yet.
        status = new LeadStatus
        {
            Name = "New",
            Order = 1,
            IsDefault = true,
            IsClosed = false
        };
        _dbContext.LeadStatuses.Add(status);
        return status;
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, string? territory, string? assignmentStrategy, CancellationToken cancellationToken)
    {
        var strategy = string.IsNullOrWhiteSpace(assignmentStrategy) ? string.Empty : assignmentStrategy.Trim();

        if (string.Equals(strategy, "Manual", StringComparison.OrdinalIgnoreCase) || string.IsNullOrWhiteSpace(strategy))
        {
            if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
            {
                var exists = await _dbContext.Users.AnyAsync(u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted, cancellationToken);
                if (exists) return requestedOwnerId.Value;
            }
        }

        if (string.Equals(strategy, "Territory", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrWhiteSpace(territory))
        {
            var territoryRule = await _dbContext.LeadAssignmentRules
                .FirstOrDefaultAsync(r => r.IsActive && r.Type == "Territory" && r.Territory == territory, cancellationToken);

            if (territoryRule?.AssignedUserId is Guid territoryOwner && territoryOwner != Guid.Empty)
            {
                var exists = await _dbContext.Users.AnyAsync(u => u.Id == territoryOwner && u.IsActive && !u.IsDeleted, cancellationToken);
                if (exists) return territoryOwner;
            }
        }

        if (string.Equals(strategy, "RoundRobin", StringComparison.OrdinalIgnoreCase)
            || string.Equals(strategy, "Territory", StringComparison.OrdinalIgnoreCase)
            || string.IsNullOrWhiteSpace(strategy))
        {
            var rule = await _dbContext.LeadAssignmentRules
                .FirstOrDefaultAsync(r => r.IsActive && r.Type == "RoundRobin", cancellationToken);

            var activeUsers = await _dbContext.Users
                .Where(u => u.IsActive && !u.IsDeleted)
                .OrderBy(u => u.CreatedAtUtc)
                .Select(u => u.Id)
                .ToListAsync(cancellationToken);

            if (activeUsers.Count > 0)
            {
                var nextOwner = activeUsers[0];
                if (rule?.LastAssignedUserId is Guid lastAssigned && activeUsers.Contains(lastAssigned))
                {
                    var index = activeUsers.IndexOf(lastAssigned);
                    nextOwner = activeUsers[(index + 1) % activeUsers.Count];
                }

                if (rule is not null)
                {
                    rule.LastAssignedUserId = nextOwner;
                }

                return nextOwner;
            }
        }

        var fallbackUserId = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallbackUserId == Guid.Empty ? Guid.NewGuid() : fallbackUserId;
    }

    private async Task<Guid?> ResolveOwnerIdFromEmailAsync(string? ownerEmail, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrWhiteSpace(ownerEmail))
        {
            var ownerId = await _dbContext.Users
                .Where(u => u.Email == ownerEmail && u.IsActive && !u.IsDeleted)
                .Select(u => u.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (ownerId != Guid.Empty)
            {
                return ownerId;
            }
        }

        return null;
    }

    private async Task<Guid> ResolveOpportunityStageIdAsync(CancellationToken cancellationToken)
    {
        var stage = await _dbContext.OpportunityStages.OrderBy(s => s.Order).FirstOrDefaultAsync(cancellationToken);
        return stage?.Id ?? Guid.NewGuid();
    }

    private void AddStatusHistory(Lead lead, Guid statusId, string? notes)
    {
        _dbContext.LeadStatusHistories.Add(new LeadStatusHistory
        {
            LeadId = lead.Id,
            LeadStatusId = statusId,
            ChangedAtUtc = DateTime.UtcNow,
            ChangedBy = User?.Identity?.Name ?? "system",
            Notes = notes
        });
    }

    private async Task AddAutoContactedHistoryAsync(
        Lead lead,
        Guid previousStatusId,
        Guid targetStatusId,
        string? targetStatusName,
        CancellationToken cancellationToken)
    {
        if (previousStatusId == targetStatusId)
        {
            return;
        }

        var previousName = await ResolveLeadStatusNameAsync(previousStatusId, cancellationToken);
        if (!string.Equals(previousName, "New", StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        if (string.Equals(targetStatusName, "New", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(targetStatusName, "Contacted", StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        if (!string.Equals(targetStatusName, "Qualified", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(targetStatusName, "Converted", StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        var contactedId = await _dbContext.LeadStatuses
            .Where(s => s.Name == "Contacted")
            .Select(s => s.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (contactedId == Guid.Empty)
        {
            return;
        }

        var alreadyLogged = await _dbContext.LeadStatusHistories
            .AnyAsync(h => h.LeadId == lead.Id && h.LeadStatusId == contactedId, cancellationToken);

        if (alreadyLogged)
        {
            return;
        }

        AddStatusHistory(lead, contactedId, "Auto: Contacted");
    }

    private async Task<string?> ResolveLeadStatusNameAsync(Guid statusId, CancellationToken cancellationToken)
    {
        var status = await _dbContext.LeadStatuses
            .Where(s => s.Id == statusId)
            .Select(s => s.Name)
            .FirstOrDefaultAsync(cancellationToken);
        return status;
    }

    private void ApplyStatusSideEffects(Lead lead, string? statusName)
    {
        if (string.Equals(statusName, "Qualified", StringComparison.OrdinalIgnoreCase))
        {
            lead.QualifiedAtUtc = DateTime.UtcNow;
        }

        if (string.Equals(statusName, "Converted", StringComparison.OrdinalIgnoreCase))
        {
            lead.ConvertedAtUtc = DateTime.UtcNow;
        }
    }

    private static int ResolveLeadScore(UpsertLeadRequest request, int? currentScore = null)
    {
        var autoScore = request.AutoScore ?? true;
        if (!autoScore)
        {
            return Math.Clamp(request.Score, 0, 100);
        }

        var score = 20;
        if (!string.IsNullOrWhiteSpace(request.Email)) score += 20;
        if (!string.IsNullOrWhiteSpace(request.Phone)) score += 15;
        if (!string.IsNullOrWhiteSpace(request.CompanyName)) score += 10;
        if (!string.IsNullOrWhiteSpace(request.JobTitle)) score += 10;
        if (!string.IsNullOrWhiteSpace(request.Source)) score += 10;
        if (!string.IsNullOrWhiteSpace(request.Territory)) score += 5;
        if (request.AccountId.HasValue) score += 5;
        if (request.ContactId.HasValue) score += 5;

        if (score == 20 && currentScore.HasValue && currentScore.Value > 0)
        {
            return currentScore.Value;
        }

        return Math.Clamp(score, 0, 100);
    }

    private static bool HasAiSignals(UpsertLeadRequest request)
    {
        var signals = 0;
        if (!string.IsNullOrWhiteSpace(request.Email)) signals++;
        if (!string.IsNullOrWhiteSpace(request.Phone)) signals++;
        if (!string.IsNullOrWhiteSpace(request.CompanyName)) signals++;
        if (!string.IsNullOrWhiteSpace(request.JobTitle)) signals++;
        if (!string.IsNullOrWhiteSpace(request.Source)) signals++;
        if (!string.IsNullOrWhiteSpace(request.Territory)) signals++;
        if (request.AccountId.HasValue) signals++;
        if (request.ContactId.HasValue) signals++;

        return signals >= 2;
    }

    private static bool HasAiSignalChanges(Lead lead, UpsertLeadRequest request)
    {
        return !string.Equals(Normalize(lead.Email), Normalize(request.Email), StringComparison.OrdinalIgnoreCase)
               || !string.Equals(Normalize(lead.Phone), Normalize(request.Phone), StringComparison.OrdinalIgnoreCase)
               || !string.Equals(Normalize(lead.CompanyName), Normalize(request.CompanyName), StringComparison.OrdinalIgnoreCase)
               || !string.Equals(Normalize(lead.JobTitle), Normalize(request.JobTitle), StringComparison.OrdinalIgnoreCase)
               || !string.Equals(Normalize(lead.Source), Normalize(request.Source), StringComparison.OrdinalIgnoreCase)
               || !string.Equals(Normalize(lead.Territory), Normalize(request.Territory), StringComparison.OrdinalIgnoreCase)
               || lead.AccountId != request.AccountId
               || lead.ContactId != request.ContactId;
    }

    private static string? Normalize(string? value)
    {
        return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    }

    private Guid GetUserId()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(id, out var parsed) ? parsed : Guid.Empty;
    }

    
}
