using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Leads;
using CRM.Enterprise.Api.Contracts.Audit;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Api.Utilities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Api.Contracts.Imports;
using CRM.Enterprise.Api.Jobs;
using Hangfire;
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
    private const string LeadEntityType = "Lead";
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IWebHostEnvironment _environment;
    private readonly IBackgroundJobClient _backgroundJobs;
    private readonly ILeadScoringService _leadScoringService;
    private readonly IAuditEventService _auditEvents;

    public LeadsController(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IWebHostEnvironment environment,
        IBackgroundJobClient backgroundJobs,
        ILeadScoringService leadScoringService,
        IAuditEventService auditEvents)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _environment = environment;
        _backgroundJobs = backgroundJobs;
        _leadScoringService = leadScoringService;
        _auditEvents = auditEvents;
    }

    [HttpGet]
    public async Task<ActionResult<LeadSearchResponse>> GetLeads(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _dbContext.Leads
            .Include(l => l.Status)
            .AsNoTracking()
            .Where(l => !l.IsDeleted);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(l =>
                (l.FirstName + " " + l.LastName).ToLower().Contains(term) ||
                (l.Email ?? string.Empty).ToLower().Contains(term) ||
                (l.Phone ?? string.Empty).ToLower().Contains(term) ||
                (l.CompanyName ?? string.Empty).ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(l => l.Status != null && l.Status.Name == status);
        }

        var total = await query.CountAsync(cancellationToken);

        var leads = await query
            .OrderByDescending(l => l.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(l => new
            {
                l.Id,
                l.FirstName,
                l.LastName,
                l.CompanyName,
                Status = l.Status != null ? l.Status.Name : "New",
                l.Email,
                l.Phone,
                l.OwnerId,
                l.Score,
                l.CreatedAtUtc,
                l.Source,
                l.Territory,
                l.JobTitle,
                l.AccountId,
                l.ContactId,
                l.ConvertedOpportunityId
            })
            .ToListAsync(cancellationToken);

        var ownerIds = leads.Select(l => l.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var items = leads.Select(l => new LeadListItem(
            l.Id,
            $"{l.FirstName} {l.LastName}".Trim(),
            l.CompanyName ?? string.Empty,
            l.Status,
            l.Email,
            l.Phone,
            l.OwnerId,
            owners.FirstOrDefault(o => o.Id == l.OwnerId)?.FullName ?? "Unassigned",
            l.Score,
            l.CreatedAtUtc,
            l.Source,
            l.Territory,
            l.JobTitle,
            l.AccountId,
            l.ContactId,
            l.ConvertedOpportunityId));

        return Ok(new LeadSearchResponse(items, total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<LeadListItem>> GetLead(Guid id, CancellationToken cancellationToken)
    {
        var lead = await _dbContext.Leads
            .Include(l => l.Status)
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (lead is null) return NotFound();

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == lead.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        var item = new LeadListItem(
            lead.Id,
            $"{lead.FirstName} {lead.LastName}".Trim(),
            lead.CompanyName ?? string.Empty,
            lead.Status?.Name ?? "New",
            lead.Email,
            lead.Phone,
            lead.OwnerId,
            ownerName,
            lead.Score,
            lead.CreatedAtUtc,
            lead.Source,
            lead.Territory,
            lead.JobTitle,
            lead.AccountId,
            lead.ContactId,
            lead.ConvertedOpportunityId);

        return Ok(item);
    }

    [HttpGet("{id:guid}/status-history")]
    public async Task<ActionResult<IEnumerable<LeadStatusHistoryItem>>> GetLeadStatusHistory(Guid id, CancellationToken cancellationToken)
    {
        var exists = await _dbContext.Leads
            .AsNoTracking()
            .AnyAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (!exists)
        {
            return NotFound();
        }

        var history = await _dbContext.LeadStatusHistories
            .AsNoTracking()
            .Include(h => h.LeadStatus)
            .Where(h => h.LeadId == id)
            .OrderByDescending(h => h.ChangedAtUtc)
            .Select(h => new LeadStatusHistoryItem(
                h.Id,
                h.LeadStatus != null ? h.LeadStatus.Name : "Unknown",
                h.ChangedAtUtc,
                h.ChangedBy,
                h.Notes))
            .ToListAsync(cancellationToken);

        return Ok(history);
    }

    [HttpGet("{id:guid}/audit")]
    public async Task<ActionResult<IEnumerable<AuditEventItem>>> GetLeadAudit(Guid id, CancellationToken cancellationToken)
    {
        var exists = await _dbContext.Leads
            .AsNoTracking()
            .AnyAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (!exists)
        {
            return NotFound();
        }

        var items = await _dbContext.AuditEvents
            .AsNoTracking()
            .Where(a => a.EntityType == LeadEntityType && a.EntityId == id)
            .OrderByDescending(a => a.CreatedAtUtc)
            .Select(a => new AuditEventItem(
                a.Id,
                a.EntityType,
                a.EntityId,
                a.Action,
                a.Field,
                a.OldValue,
                a.NewValue,
                a.ChangedByUserId,
                a.ChangedByName,
                a.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return Ok(items);
    }

    [HttpPost("{id:guid}/ai-score")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<ActionResult<LeadAiScoreResponse>> ScoreLead(Guid id, CancellationToken cancellationToken)
    {
        var lead = await _dbContext.Leads
            .Include(l => l.Status)
            .FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (lead is null)
        {
            return NotFound();
        }

        var score = await _leadScoringService.ScoreAsync(lead, cancellationToken);
        lead.AiScore = score.Score;
        lead.AiConfidence = score.Confidence;
        lead.AiRationale = score.Rationale;
        lead.AiScoredAtUtc = DateTime.UtcNow;
        lead.Score = score.Score;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new LeadAiScoreResponse(score.Score, score.Confidence, score.Rationale, lead.AiScoredAtUtc.Value));
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<ActionResult<LeadListItem>> Create([FromBody] UpsertLeadRequest request, CancellationToken cancellationToken)
    {
        var ownerId = await ResolveOwnerIdAsync(request.OwnerId, request.Territory, request.AssignmentStrategy, cancellationToken);
        var statusId = await ResolveLeadStatusIdAsync(request.Status, cancellationToken);

        var score = ResolveLeadScore(request);
        var lead = new Lead
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Phone = request.Phone,
            CompanyName = request.CompanyName,
            JobTitle = request.JobTitle,
            LeadStatusId = statusId,
            OwnerId = ownerId,
            Source = request.Source,
            Territory = request.Territory,
            Score = score,
            AccountId = request.AccountId,
            ContactId = request.ContactId,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Leads.Add(lead);
        var resolvedStatusName = await ResolveLeadStatusNameAsync(statusId, cancellationToken);
        ApplyStatusSideEffects(lead, resolvedStatusName);
        AddStatusHistory(lead, statusId, null);
        await _auditEvents.TrackAsync(
            CreateAuditEntry(lead.Id, "Created", null, null, null),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        if (HasAiSignals(request))
        {
            _backgroundJobs.Enqueue<LeadAiScoringJobs>(job => job.ScoreLeadAsync(lead.Id, CancellationToken.None));
        }

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == ownerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        var dto = new LeadListItem(
            lead.Id,
            $"{lead.FirstName} {lead.LastName}".Trim(),
            lead.CompanyName ?? string.Empty,
            resolvedStatusName ?? "New",
            lead.Email,
            lead.Phone,
            ownerId,
            ownerName,
            lead.Score,
            lead.CreatedAtUtc,
            lead.Source,
            lead.Territory,
            lead.JobTitle,
            lead.AccountId,
            lead.ContactId,
            lead.ConvertedOpportunityId);

        return CreatedAtAction(nameof(GetLead), new { id = lead.Id }, dto);
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
            var statusId = await ResolveLeadStatusIdAsync(statusName, cancellationToken);

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
                LeadStatusId = statusId,
                OwnerId = resolvedOwnerId,
                Source = request.Source,
                Territory = territory,
                Score = score,
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.Leads.Add(lead);
            var resolvedStatusName = await ResolveLeadStatusNameAsync(statusId, cancellationToken);
            ApplyStatusSideEffects(lead, resolvedStatusName);
            AddStatusHistory(lead, statusId, "Imported lead");
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

        _backgroundJobs.Enqueue<CsvImportJobs>(job => job.ProcessLeadsAsync(importJob.Id));

        return Accepted(new ImportJobResponse(importJob.Id, importJob.EntityType, importJob.Status));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertLeadRequest request, CancellationToken cancellationToken)
    {
        var lead = await _dbContext.Leads.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null) return NotFound();

        var previousStatusId = lead.LeadStatusId;
        var previousOwnerId = lead.OwnerId;
        var shouldAiScore = HasAiSignalChanges(lead, request);

        lead.FirstName = request.FirstName;
        lead.LastName = request.LastName;
        lead.Email = request.Email;
        lead.Phone = request.Phone;
        lead.CompanyName = request.CompanyName;
        lead.JobTitle = request.JobTitle;
        lead.LeadStatusId = await ResolveLeadStatusIdAsync(request.Status, cancellationToken);
        var statusName = await ResolveLeadStatusNameAsync(lead.LeadStatusId, cancellationToken);
        var requestedOwnerId = request.OwnerId ?? lead.OwnerId;
        lead.OwnerId = await ResolveOwnerIdAsync(requestedOwnerId, request.Territory, request.AssignmentStrategy, cancellationToken);
        lead.Source = request.Source;
        lead.Territory = request.Territory;
        lead.Score = ResolveLeadScore(request, lead.Score);
        lead.AccountId = request.AccountId;
        lead.ContactId = request.ContactId;
        lead.UpdatedAtUtc = DateTime.UtcNow;

        if (lead.LeadStatusId != previousStatusId)
        {
            ApplyStatusSideEffects(lead, statusName);
            await AddAutoContactedHistoryAsync(lead, previousStatusId, lead.LeadStatusId, statusName, cancellationToken);
            AddStatusHistory(lead, lead.LeadStatusId, null);

            var oldStatusName = await ResolveLeadStatusNameAsync(previousStatusId, cancellationToken);
            await _auditEvents.TrackAsync(
                CreateAuditEntry(lead.Id, "StatusChanged", "Status", oldStatusName, statusName),
                cancellationToken);
        }

        if (previousOwnerId != lead.OwnerId)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(lead.Id, "OwnerChanged", "OwnerId", previousOwnerId.ToString(), lead.OwnerId.ToString()),
                cancellationToken);
        }

        await _auditEvents.TrackAsync(
            CreateAuditEntry(lead.Id, "Updated", null, null, null),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        if (shouldAiScore && HasAiSignals(request))
        {
            _backgroundJobs.Enqueue<LeadAiScoringJobs>(job => job.ScoreLeadAsync(lead.Id, CancellationToken.None));
        }

        return NoContent();
    }

    [HttpPost("{id:guid}/convert")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<ActionResult<LeadConversionResponse>> Convert(Guid id, [FromBody] LeadConversionRequest request, CancellationToken cancellationToken)
    {
        var lead = await _dbContext.Leads
            .Include(l => l.Status)
            .FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (lead is null) return NotFound();

        if (lead.Status?.Name == "Converted")
        {
            return BadRequest("Lead is already converted.");
        }

        var ownerId = await ResolveOwnerIdAsync(lead.OwnerId, lead.Territory, "Manual", cancellationToken);
        var now = DateTime.UtcNow;

        Guid? accountId = lead.AccountId;
        if (request.CreateOpportunity && accountId is null && !request.CreateAccount)
        {
            return BadRequest("Account is required to create an opportunity.");
        }

        if (request.CreateAccount && accountId is null)
        {
            var accountName = string.IsNullOrWhiteSpace(request.AccountName)
                ? (string.IsNullOrWhiteSpace(lead.CompanyName) ? $"{lead.FirstName} {lead.LastName}".Trim() : lead.CompanyName)
                : request.AccountName;

            var account = new Account
            {
                Name = accountName ?? $"{lead.FirstName} {lead.LastName}".Trim(),
                Phone = lead.Phone,
                LifecycleStage = "Customer",
                OwnerId = ownerId,
                Territory = lead.Territory,
                CreatedAtUtc = now
            };

            _dbContext.Accounts.Add(account);
            accountId = account.Id;
        }

        Guid? contactId = lead.ContactId;
        if (request.CreateContact && contactId is null)
        {
            var contact = new Contact
            {
                FirstName = lead.FirstName,
                LastName = lead.LastName,
                Email = lead.Email,
                Phone = lead.Phone,
                JobTitle = lead.JobTitle,
                AccountId = accountId,
                OwnerId = ownerId,
                LifecycleStage = "Customer",
                CreatedAtUtc = now
            };

            _dbContext.Contacts.Add(contact);
            contactId = contact.Id;
        }

        Guid? opportunityId = lead.ConvertedOpportunityId;
        if (request.CreateOpportunity && opportunityId is null)
        {
            var stageId = await ResolveOpportunityStageIdAsync(cancellationToken);
            var oppName = string.IsNullOrWhiteSpace(request.OpportunityName)
                ? $"{(lead.CompanyName ?? lead.FirstName)} Opportunity"
                : request.OpportunityName;

            var opportunity = new Opportunity
            {
                Name = oppName,
                AccountId = accountId ?? Guid.NewGuid(),
                PrimaryContactId = contactId,
                StageId = stageId,
                OwnerId = ownerId,
                Amount = request.Amount ?? 0,
                Currency = "USD",
                Probability = 0,
                ExpectedCloseDate = request.ExpectedCloseDate,
                CreatedAtUtc = now
            };

            _dbContext.Opportunities.Add(opportunity);
            opportunityId = opportunity.Id;
        }

        lead.AccountId = accountId;
        lead.ContactId = contactId;
        lead.ConvertedOpportunityId = opportunityId;
        var previousStatusId = lead.LeadStatusId;
        lead.LeadStatusId = await ResolveLeadStatusIdAsync("Converted", cancellationToken);
        lead.ConvertedAtUtc = now;
        lead.UpdatedAtUtc = now;

        ApplyStatusSideEffects(lead, "Converted");
        await AddAutoContactedHistoryAsync(lead, previousStatusId, lead.LeadStatusId, "Converted", cancellationToken);
        AddStatusHistory(lead, lead.LeadStatusId, "Converted lead");

        await _auditEvents.TrackAsync(
            CreateAuditEntry(
                lead.Id,
                "Converted",
                null,
                null,
                $"AccountId={accountId};ContactId={contactId};OpportunityId={opportunityId}"),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new LeadConversionResponse(lead.Id, accountId, contactId, opportunityId));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.LeadsManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var lead = await _dbContext.Leads.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null) return NotFound();

        lead.IsDeleted = true;
        lead.DeletedAtUtc = DateTime.UtcNow;
        await _auditEvents.TrackAsync(
            CreateAuditEntry(lead.Id, "Deleted", null, null, null),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id:guid}/owner")]
    public async Task<IActionResult> UpdateOwner(Guid id, [FromBody] UpdateOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var lead = await _dbContext.Leads.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null) return NotFound();

        var previousOwnerId = lead.OwnerId;
        lead.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, lead.Territory, null, cancellationToken);
        lead.UpdatedAtUtc = DateTime.UtcNow;

        if (previousOwnerId != lead.OwnerId)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(lead.Id, "OwnerChanged", "OwnerId", previousOwnerId.ToString(), lead.OwnerId.ToString()),
                cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Status is required.");
        }

        var lead = await _dbContext.Leads.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null) return NotFound();

        var previousStatusId = lead.LeadStatusId;
        lead.LeadStatusId = await ResolveLeadStatusIdAsync(request.Status, cancellationToken);
        var statusName = await ResolveLeadStatusNameAsync(lead.LeadStatusId, cancellationToken);
        lead.UpdatedAtUtc = DateTime.UtcNow;

        if (lead.LeadStatusId != previousStatusId)
        {
            ApplyStatusSideEffects(lead, statusName);
            await AddAutoContactedHistoryAsync(lead, previousStatusId, lead.LeadStatusId, statusName, cancellationToken);
            AddStatusHistory(lead, lead.LeadStatusId, null);

            var oldStatusName = await ResolveLeadStatusNameAsync(previousStatusId, cancellationToken);
            await _auditEvents.TrackAsync(
                CreateAuditEntry(lead.Id, "StatusChanged", "Status", oldStatusName, statusName),
                cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
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

        var ownerExists = await _dbContext.Users
            .AnyAsync(u => u.Id == request.OwnerId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (!ownerExists)
        {
            return BadRequest("Owner not found.");
        }

        var leads = await _dbContext.Leads
            .Where(l => request.Ids.Contains(l.Id) && !l.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var lead in leads)
        {
            lead.OwnerId = request.OwnerId;
            lead.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
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

        var leads = await _dbContext.Leads
            .Where(l => request.Ids.Contains(l.Id) && !l.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var lead in leads)
        {
            var previousStatusId = lead.LeadStatusId;
            lead.LeadStatusId = await ResolveLeadStatusIdAsync(request.Status, cancellationToken);
            var statusName = await ResolveLeadStatusNameAsync(lead.LeadStatusId, cancellationToken);
            lead.UpdatedAtUtc = DateTime.UtcNow;

            if (lead.LeadStatusId != previousStatusId)
            {
                ApplyStatusSideEffects(lead, statusName);
                await AddAutoContactedHistoryAsync(lead, previousStatusId, lead.LeadStatusId, statusName, cancellationToken);
                AddStatusHistory(lead, lead.LeadStatusId, "Bulk status update");
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private async Task<Guid> ResolveLeadStatusIdAsync(string? statusName, CancellationToken cancellationToken)
    {
        var name = string.IsNullOrWhiteSpace(statusName) ? "New" : statusName;
        var status = await _dbContext.LeadStatuses.FirstOrDefaultAsync(s => s.Name == name, cancellationToken)
                     ?? await _dbContext.LeadStatuses.OrderBy(s => s.Order).FirstOrDefaultAsync(cancellationToken);
        return status?.Id ?? Guid.NewGuid();
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

    private AuditEventEntry CreateAuditEntry(
        Guid entityId,
        string action,
        string? field,
        string? oldValue,
        string? newValue)
    {
        var userId = GetUserId();
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new AuditEventEntry(
            LeadEntityType,
            entityId,
            action,
            field,
            oldValue,
            newValue,
            userId == Guid.Empty ? null : userId,
            name);
    }
}
