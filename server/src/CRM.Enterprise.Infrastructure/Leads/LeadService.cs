using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class LeadService : ILeadService
{
    private const string LeadEntityType = "Lead";
    private static readonly TimeSpan FirstTouchSla = TimeSpan.FromHours(24);
    private readonly CrmDbContext _dbContext;
    private readonly ILeadScoringService _leadScoringService;
    private readonly IAuditEventService _auditEvents;
    private readonly IMediator _mediator;

    public LeadService(
        CrmDbContext dbContext,
        ILeadScoringService leadScoringService,
        IAuditEventService auditEvents,
        IMediator mediator)
    {
        _dbContext = dbContext;
        _leadScoringService = leadScoringService;
        _auditEvents = auditEvents;
        _mediator = mediator;
    }

    public async Task<LeadSearchResultDto> SearchAsync(LeadSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Leads
            .Include(l => l.Status)
            .AsNoTracking()
            .Where(l => !l.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(l =>
                (l.FirstName + " " + l.LastName).ToLower().Contains(term) ||
                (l.Email ?? string.Empty).ToLower().Contains(term) ||
                (l.Phone ?? string.Empty).ToLower().Contains(term) ||
                (l.CompanyName ?? string.Empty).ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            query = query.Where(l => l.Status != null && l.Status.Name == request.Status);
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
                l.ConvertedOpportunityId,
                l.DisqualifiedReason,
                l.NurtureFollowUpAtUtc,
                l.QualifiedNotes,
                l.FirstTouchDueAtUtc,
                l.FirstTouchedAtUtc
            })
            .ToListAsync(cancellationToken);

        var ownerIds = leads.Select(l => l.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var items = leads.Select(l => new LeadListItemDto(
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
            l.ConvertedOpportunityId,
            l.DisqualifiedReason,
            l.NurtureFollowUpAtUtc,
            l.QualifiedNotes,
            l.FirstTouchDueAtUtc,
            l.FirstTouchedAtUtc));

        return new LeadSearchResultDto(items.ToList(), total);
    }

    public async Task<LeadListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var lead = await _dbContext.Leads
            .Include(l => l.Status)
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (lead is null)
        {
            return null;
        }

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == lead.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        return new LeadListItemDto(
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
            lead.ConvertedOpportunityId,
            lead.DisqualifiedReason,
            lead.NurtureFollowUpAtUtc,
            lead.QualifiedNotes,
            lead.FirstTouchDueAtUtc,
            lead.FirstTouchedAtUtc);
    }

    public async Task<IReadOnlyList<LeadStatusHistoryDto>?> GetStatusHistoryAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Leads
            .AsNoTracking()
            .AnyAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (!exists)
        {
            return null;
        }

        var history = await _dbContext.LeadStatusHistories
            .AsNoTracking()
            .Include(h => h.LeadStatus)
            .Where(h => h.LeadId == id)
            .OrderByDescending(h => h.ChangedAtUtc)
            .Select(h => new LeadStatusHistoryDto(
                h.Id,
                h.LeadStatus != null ? h.LeadStatus.Name : "Unknown",
                h.ChangedAtUtc,
                h.ChangedBy,
                h.Notes))
            .ToListAsync(cancellationToken);

        return history;
    }

    public async Task<IReadOnlyList<LeadAuditEventDto>?> GetAuditAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Leads
            .AsNoTracking()
            .AnyAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (!exists)
        {
            return null;
        }

        var items = await _dbContext.AuditEvents
            .AsNoTracking()
            .Where(a => a.EntityType == LeadEntityType && a.EntityId == id)
            .OrderByDescending(a => a.CreatedAtUtc)
            .Select(a => new LeadAuditEventDto(
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

        return items;
    }

    public async Task<LeadAiScoreResultDto?> ScoreAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var lead = await _dbContext.Leads
            .Include(l => l.Status)
            .FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (lead is null)
        {
            return null;
        }

        var score = await _leadScoringService.ScoreAsync(lead, cancellationToken);
        lead.AiScore = score.Score;
        lead.AiConfidence = score.Confidence;
        lead.AiRationale = score.Rationale;
        lead.AiScoredAtUtc = DateTime.UtcNow;
        lead.Score = score.Score;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new LeadAiScoreResultDto(score.Score, score.Confidence, score.Rationale, lead.AiScoredAtUtc.Value);
    }

    public async Task<LeadOperationResult<LeadListItemDto>> CreateAsync(LeadUpsertRequest request, LeadActor actor, CancellationToken cancellationToken = default)
    {
        var ownerId = await ResolveOwnerIdAsync(request.OwnerId, request.Territory, request.AssignmentStrategy, cancellationToken);
        var status = await ResolveLeadStatusAsync(request.Status, cancellationToken);
        var ownerExists = await _dbContext.Users.AnyAsync(u => u.Id == ownerId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (!ownerExists)
        {
            return LeadOperationResult<LeadListItemDto>.Fail("Unable to assign an active owner for this lead. Please select a valid owner.");
        }

        var statusNameForValidation = await ResolveLeadStatusNameAsync(status.Id, cancellationToken) ?? "New";
        var validationError = ValidateOutcome(statusNameForValidation, request);
        if (validationError is not null)
        {
            return LeadOperationResult<LeadListItemDto>.Fail(validationError);
        }

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
            OwnerId = ownerId,
            Source = request.Source,
            Territory = request.Territory,
            Score = score,
            AccountId = request.AccountId,
            ContactId = request.ContactId,
            DisqualifiedReason = request.DisqualifiedReason,
            NurtureFollowUpAtUtc = request.NurtureFollowUpAtUtc,
            QualifiedNotes = request.QualifiedNotes,
            CreatedAtUtc = DateTime.UtcNow
        };

        lead.Status = status;

        _dbContext.Leads.Add(lead);
        var resolvedStatusName = statusNameForValidation;
        ApplyStatusSideEffects(lead, resolvedStatusName);
        AddStatusHistory(lead, status.Id, null, actor);
        await _auditEvents.TrackAsync(
            CreateAuditEntry(lead.Id, "Created", null, null, null, actor),
            cancellationToken);

        await EnsureFirstTouchTaskAsync(lead, actor, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        if (HasAiSignals(request))
        {
            // Hangfire removed: scoring jobs must be triggered directly or via another mechanism if needed
        }

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == ownerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        var dto = new LeadListItemDto(
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
            lead.ConvertedOpportunityId,
            lead.DisqualifiedReason,
            lead.NurtureFollowUpAtUtc,
            lead.QualifiedNotes,
            lead.FirstTouchDueAtUtc,
            lead.FirstTouchedAtUtc);

        return LeadOperationResult<LeadListItemDto>.Ok(dto);
    }

    public async Task<LeadOperationResult<bool>> UpdateAsync(Guid id, LeadUpsertRequest request, LeadActor actor, CancellationToken cancellationToken = default)
    {
        var lead = await _dbContext.Leads.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null)
        {
            return LeadOperationResult<bool>.NotFoundResult();
        }

        var previousStatusId = lead.LeadStatusId;
        var previousOwnerId = lead.OwnerId;
        var shouldAiScore = HasAiSignalChanges(lead, request);

        lead.FirstName = request.FirstName;
        lead.LastName = request.LastName;
        lead.Email = request.Email;
        lead.Phone = request.Phone;
        lead.CompanyName = request.CompanyName;
        lead.JobTitle = request.JobTitle;
        var status = await ResolveLeadStatusAsync(request.Status, cancellationToken);
        lead.LeadStatusId = status.Id;
        lead.Status = status;
        var statusName = await ResolveLeadStatusNameAsync(lead.LeadStatusId, cancellationToken);
        var requestedOwnerId = request.OwnerId ?? lead.OwnerId;
        lead.OwnerId = await ResolveOwnerIdAsync(requestedOwnerId, request.Territory, request.AssignmentStrategy, cancellationToken);
        lead.Source = request.Source;
        lead.Territory = request.Territory;
        lead.Score = ResolveLeadScore(request, lead.Score);
        lead.AccountId = request.AccountId;
        lead.ContactId = request.ContactId;
        lead.DisqualifiedReason = request.DisqualifiedReason;
        lead.NurtureFollowUpAtUtc = request.NurtureFollowUpAtUtc;
        lead.QualifiedNotes = request.QualifiedNotes;
        lead.UpdatedAtUtc = DateTime.UtcNow;

        var validationError = ValidateOutcome(statusName ?? "New", request);
        if (validationError is not null)
        {
            return LeadOperationResult<bool>.Fail(validationError);
        }

        var statusChanged = lead.LeadStatusId != previousStatusId;
        if (statusChanged)
        {
            ApplyStatusSideEffects(lead, statusName);
            await AddAutoContactedHistoryAsync(lead, previousStatusId, lead.LeadStatusId, statusName, actor, cancellationToken);
            AddStatusHistory(lead, lead.LeadStatusId, null, actor);

            var oldStatusName = await ResolveLeadStatusNameAsync(previousStatusId, cancellationToken);
            await _auditEvents.TrackAsync(
                CreateAuditEntry(lead.Id, "StatusChanged", "Status", oldStatusName, statusName, actor),
                cancellationToken);
        }

        var ownerChanged = previousOwnerId != lead.OwnerId;
        if (ownerChanged)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(lead.Id, "OwnerChanged", "OwnerId", previousOwnerId.ToString(), lead.OwnerId.ToString(), actor),
                cancellationToken);
            await EnsureFirstTouchTaskAsync(lead, actor, cancellationToken);
        }

        await _auditEvents.TrackAsync(
            CreateAuditEntry(lead.Id, "Updated", null, null, null, actor),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        if (ownerChanged)
        {
            await _mediator.Publish(new LeadOwnerChangedEvent(
                lead.Id,
                previousOwnerId,
                lead.OwnerId,
                actor.UserId == Guid.Empty ? null : actor.UserId,
                DateTime.UtcNow), cancellationToken);
        }

        if (statusChanged && string.Equals(statusName, "Qualified", StringComparison.OrdinalIgnoreCase))
        {
            await _mediator.Publish(new LeadQualifiedEvent(
                lead.Id,
                lead.OwnerId,
                actor.UserId == Guid.Empty ? null : actor.UserId,
                DateTime.UtcNow), cancellationToken);
        }

        if (statusChanged && string.Equals(statusName, "Converted", StringComparison.OrdinalIgnoreCase))
        {
            await _mediator.Publish(new LeadConvertedEvent(
                lead.Id,
                lead.AccountId,
                lead.ContactId,
                lead.ConvertedOpportunityId,
                lead.OwnerId,
                actor.UserId == Guid.Empty ? null : actor.UserId,
                DateTime.UtcNow), cancellationToken);
        }

        if (shouldAiScore && HasAiSignals(request))
        {
            // Hangfire removed: scoring jobs must be triggered directly or via another mechanism if needed
        }

        return LeadOperationResult<bool>.Ok(true);
    }

    public async Task<LeadOperationResult<LeadConversionResultDto>> ConvertAsync(Guid id, LeadConversionRequest request, LeadActor actor, CancellationToken cancellationToken = default)
    {
        var lead = await _dbContext.Leads
            .Include(l => l.Status)
            .FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);

        if (lead is null)
        {
            return LeadOperationResult<LeadConversionResultDto>.NotFoundResult();
        }

        if (lead.Status?.Name == "Converted")
        {
            return LeadOperationResult<LeadConversionResultDto>.Fail("Lead is already converted.");
        }

        var ownerId = await ResolveOwnerIdAsync(lead.OwnerId, lead.Territory, "Manual", cancellationToken);
        var now = DateTime.UtcNow;

        Guid? accountId = lead.AccountId;
        if (request.CreateOpportunity && accountId is null && !request.CreateAccount)
        {
            return LeadOperationResult<LeadConversionResultDto>.Fail("Account is required to create an opportunity.");
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
        var convertedStatus = await ResolveLeadStatusAsync("Converted", cancellationToken);
        lead.LeadStatusId = convertedStatus.Id;
        lead.Status = convertedStatus;
        lead.ConvertedAtUtc = now;
        lead.UpdatedAtUtc = now;

        ApplyStatusSideEffects(lead, "Converted");
        await AddAutoContactedHistoryAsync(lead, previousStatusId, lead.LeadStatusId, "Converted", actor, cancellationToken);
        AddStatusHistory(lead, lead.LeadStatusId, "Converted lead", actor);

        await _auditEvents.TrackAsync(
            CreateAuditEntry(
                lead.Id,
                "Converted",
                null,
                null,
                $"AccountId={accountId};ContactId={contactId};OpportunityId={opportunityId}",
                actor),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        await _mediator.Publish(new LeadConvertedEvent(
            lead.Id,
            accountId,
            contactId,
            opportunityId,
            lead.OwnerId,
            actor.UserId == Guid.Empty ? null : actor.UserId,
            DateTime.UtcNow), cancellationToken);

        return LeadOperationResult<LeadConversionResultDto>.Ok(new LeadConversionResultDto(lead.Id, accountId, contactId, opportunityId));
    }

    public async Task<LeadOperationResult<bool>> DeleteAsync(Guid id, LeadActor actor, CancellationToken cancellationToken = default)
    {
        var lead = await _dbContext.Leads.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null)
        {
            return LeadOperationResult<bool>.NotFoundResult();
        }

        lead.IsDeleted = true;
        lead.DeletedAtUtc = DateTime.UtcNow;
        await _auditEvents.TrackAsync(
            CreateAuditEntry(lead.Id, "Deleted", null, null, null, actor),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return LeadOperationResult<bool>.Ok(true);
    }

    public async Task<LeadOperationResult<bool>> UpdateOwnerAsync(Guid id, Guid ownerId, LeadActor actor, CancellationToken cancellationToken = default)
    {
        var lead = await _dbContext.Leads.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null)
        {
            return LeadOperationResult<bool>.NotFoundResult();
        }

        var previousOwnerId = lead.OwnerId;
        lead.OwnerId = await ResolveOwnerIdAsync(ownerId, lead.Territory, null, cancellationToken);
        lead.UpdatedAtUtc = DateTime.UtcNow;

        if (previousOwnerId != lead.OwnerId)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(lead.Id, "OwnerChanged", "OwnerId", previousOwnerId.ToString(), lead.OwnerId.ToString(), actor),
                cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return LeadOperationResult<bool>.Ok(true);
    }

    public async Task<LeadOperationResult<bool>> UpdateStatusAsync(Guid id, string statusName, LeadActor actor, CancellationToken cancellationToken = default)
    {
        if (RequiresOutcome(statusName))
        {
            return LeadOperationResult<bool>.Fail("Status requires outcome details. Update the lead from the full edit form.");
        }

        var lead = await _dbContext.Leads.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null)
        {
            return LeadOperationResult<bool>.NotFoundResult();
        }

        var previousStatusId = lead.LeadStatusId;
        var status = await ResolveLeadStatusAsync(statusName, cancellationToken);
        lead.LeadStatusId = status.Id;
        lead.Status = status;
        var resolvedStatusName = await ResolveLeadStatusNameAsync(lead.LeadStatusId, cancellationToken);
        lead.UpdatedAtUtc = DateTime.UtcNow;

        var statusChanged = lead.LeadStatusId != previousStatusId;
        if (statusChanged)
        {
            ApplyStatusSideEffects(lead, resolvedStatusName);
            await AddAutoContactedHistoryAsync(lead, previousStatusId, lead.LeadStatusId, resolvedStatusName, actor, cancellationToken);
            AddStatusHistory(lead, lead.LeadStatusId, null, actor);

            var oldStatusName = await ResolveLeadStatusNameAsync(previousStatusId, cancellationToken);
            await _auditEvents.TrackAsync(
                CreateAuditEntry(lead.Id, "StatusChanged", "Status", oldStatusName, resolvedStatusName, actor),
                cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        if (statusChanged && string.Equals(resolvedStatusName, "Qualified", StringComparison.OrdinalIgnoreCase))
        {
            await _mediator.Publish(new LeadQualifiedEvent(
                lead.Id,
                lead.OwnerId,
                actor.UserId == Guid.Empty ? null : actor.UserId,
                DateTime.UtcNow), cancellationToken);
        }

        if (statusChanged && string.Equals(resolvedStatusName, "Converted", StringComparison.OrdinalIgnoreCase))
        {
            await _mediator.Publish(new LeadConvertedEvent(
                lead.Id,
                lead.AccountId,
                lead.ContactId,
                lead.ConvertedOpportunityId,
                lead.OwnerId,
                actor.UserId == Guid.Empty ? null : actor.UserId,
                DateTime.UtcNow), cancellationToken);
        }

        return LeadOperationResult<bool>.Ok(true);
    }

    public async Task<LeadOperationResult<int>> BulkAssignOwnerAsync(IReadOnlyCollection<Guid> ids, Guid ownerId, CancellationToken cancellationToken = default)
    {
        var ownerExists = await _dbContext.Users
            .AnyAsync(u => u.Id == ownerId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (!ownerExists)
        {
            return LeadOperationResult<int>.Fail("Owner not found.");
        }

        var leads = await _dbContext.Leads
            .Where(l => ids.Contains(l.Id) && !l.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var lead in leads)
        {
            lead.OwnerId = ownerId;
            lead.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return LeadOperationResult<int>.Ok(leads.Count);
    }

    public async Task<LeadOperationResult<int>> BulkUpdateStatusAsync(IReadOnlyCollection<Guid> ids, string statusName, CancellationToken cancellationToken = default)
    {
        if (RequiresOutcome(statusName))
        {
            return LeadOperationResult<int>.Fail("Bulk status updates are not allowed for statuses that require outcome details. Update leads individually.");
        }

        var leads = await _dbContext.Leads
            .Where(l => ids.Contains(l.Id) && !l.IsDeleted)
            .ToListAsync(cancellationToken);

        var status = await ResolveLeadStatusAsync(statusName, cancellationToken);
        var resolvedStatusName = await ResolveLeadStatusNameAsync(status.Id, cancellationToken);

        foreach (var lead in leads)
        {
            var previousStatusId = lead.LeadStatusId;
            lead.LeadStatusId = status.Id;
            lead.Status = status;
            lead.UpdatedAtUtc = DateTime.UtcNow;

            if (lead.LeadStatusId != previousStatusId)
            {
                ApplyStatusSideEffects(lead, resolvedStatusName);
                await AddAutoContactedHistoryAsync(lead, previousStatusId, lead.LeadStatusId, resolvedStatusName, LeadActor.System, cancellationToken);
                AddStatusHistory(lead, lead.LeadStatusId, "Bulk status update", LeadActor.System);
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return LeadOperationResult<int>.Ok(leads.Count);
    }

    private async Task<LeadStatus> ResolveLeadStatusAsync(string? statusName, CancellationToken cancellationToken)
    {
        var name = string.IsNullOrWhiteSpace(statusName) ? "New" : statusName;
        var status = await _dbContext.LeadStatuses.FirstOrDefaultAsync(s => s.Name == name, cancellationToken);
        if (status is not null)
        {
            return status;
        }

        if (!string.IsNullOrWhiteSpace(statusName))
        {
            var maxOrder = await _dbContext.LeadStatuses.MaxAsync(s => (int?)s.Order, cancellationToken) ?? 0;
            status = new LeadStatus
            {
                Name = name,
                Order = maxOrder + 1,
                IsDefault = false,
                IsClosed = string.Equals(name, "Lost", StringComparison.OrdinalIgnoreCase)
                           || string.Equals(name, "Disqualified", StringComparison.OrdinalIgnoreCase)
                           || string.Equals(name, "Converted", StringComparison.OrdinalIgnoreCase)
            };
            _dbContext.LeadStatuses.Add(status);
            return status;
        }

        status = await _dbContext.LeadStatuses.OrderBy(s => s.Order).FirstOrDefaultAsync(cancellationToken);
        if (status is not null)
        {
            return status;
        }

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

    private async Task<Guid> ResolveOpportunityStageIdAsync(CancellationToken cancellationToken)
    {
        var stage = await _dbContext.OpportunityStages.OrderBy(s => s.Order).FirstOrDefaultAsync(cancellationToken);
        return stage?.Id ?? Guid.NewGuid();
    }

    private void AddStatusHistory(Lead lead, Guid statusId, string? notes, LeadActor actor)
    {
        _dbContext.LeadStatusHistories.Add(new LeadStatusHistory
        {
            LeadId = lead.Id,
            LeadStatusId = statusId,
            ChangedAtUtc = DateTime.UtcNow,
            ChangedBy = string.IsNullOrWhiteSpace(actor.UserName) ? "system" : actor.UserName,
            Notes = notes
        });
    }

    private async Task AddAutoContactedHistoryAsync(
        Lead lead,
        Guid previousStatusId,
        Guid targetStatusId,
        string? targetStatusName,
        LeadActor actor,
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

        AddStatusHistory(lead, contactedId, "Auto: Contacted", actor);
    }

    private async Task<string?> ResolveLeadStatusNameAsync(Guid statusId, CancellationToken cancellationToken)
    {
        var status = await _dbContext.LeadStatuses
            .Where(s => s.Id == statusId)
            .Select(s => s.Name)
            .FirstOrDefaultAsync(cancellationToken);
        return status;
    }

    private static bool RequiresOutcome(string statusName)
    {
        return string.Equals(statusName, "Disqualified", StringComparison.OrdinalIgnoreCase)
               || string.Equals(statusName, "Lost", StringComparison.OrdinalIgnoreCase)
               || string.Equals(statusName, "Nurture", StringComparison.OrdinalIgnoreCase)
               || string.Equals(statusName, "Qualified", StringComparison.OrdinalIgnoreCase);
    }

    private static string? ValidateOutcome(string statusName, LeadUpsertRequest request)
    {
        if (string.Equals(statusName, "Disqualified", StringComparison.OrdinalIgnoreCase)
            || string.Equals(statusName, "Lost", StringComparison.OrdinalIgnoreCase))
        {
            return string.IsNullOrWhiteSpace(request.DisqualifiedReason)
                ? "Disqualified reason is required when closing a lead."
                : null;
        }

        if (string.Equals(statusName, "Nurture", StringComparison.OrdinalIgnoreCase))
        {
            return request.NurtureFollowUpAtUtc.HasValue
                ? null
                : "Nurture follow-up date is required when setting a lead to Nurture.";
        }

        if (string.Equals(statusName, "Qualified", StringComparison.OrdinalIgnoreCase))
        {
            return string.IsNullOrWhiteSpace(request.QualifiedNotes)
                ? "Qualification notes are required when qualifying a lead."
                : null;
        }

        return null;
    }

    private async Task EnsureFirstTouchTaskAsync(Lead lead, LeadActor actor, CancellationToken cancellationToken)
    {
        if (lead.FirstTouchedAtUtc.HasValue)
        {
            return;
        }

        if (!lead.FirstTouchDueAtUtc.HasValue)
        {
            lead.FirstTouchDueAtUtc = DateTime.UtcNow.Add(FirstTouchSla);
        }

        var existingTask = await _dbContext.Activities
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Lead
                        && a.RelatedEntityId == lead.Id
                        && !a.CompletedDateUtc.HasValue
                        && a.Subject.StartsWith("First touch", StringComparison.OrdinalIgnoreCase))
            .FirstOrDefaultAsync(cancellationToken);

        if (existingTask is not null)
        {
            if (existingTask.OwnerId != lead.OwnerId)
            {
                existingTask.OwnerId = lead.OwnerId;
                existingTask.UpdatedAtUtc = DateTime.UtcNow;
            }

            if (!existingTask.DueDateUtc.HasValue)
            {
                existingTask.DueDateUtc = lead.FirstTouchDueAtUtc;
            }

            return;
        }

        var fullName = $"{lead.FirstName} {lead.LastName}".Trim();
        var subject = string.IsNullOrWhiteSpace(fullName) ? "First touch" : $"First touch: {fullName}";

        _dbContext.Activities.Add(new Activity
        {
            Subject = subject,
            Type = ActivityType.Task,
            RelatedEntityType = ActivityRelationType.Lead,
            RelatedEntityId = lead.Id,
            OwnerId = lead.OwnerId,
            DueDateUtc = lead.FirstTouchDueAtUtc,
            Priority = "High",
            CreatedAtUtc = DateTime.UtcNow
        });
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

    private static int ResolveLeadScore(LeadUpsertRequest request, int? currentScore = null)
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

    private static bool HasAiSignals(LeadUpsertRequest request)
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

    private static bool HasAiSignalChanges(Lead lead, LeadUpsertRequest request)
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

    private static AuditEventEntry CreateAuditEntry(
        Guid entityId,
        string action,
        string? field,
        string? oldValue,
        string? newValue,
        LeadActor actor)
    {
        var userId = actor.UserId == Guid.Empty ? (Guid?)null : actor.UserId;
        return new AuditEventEntry(
            LeadEntityType,
            entityId,
            action,
            field,
            oldValue,
            newValue,
            userId,
            actor.UserName);
    }
}
