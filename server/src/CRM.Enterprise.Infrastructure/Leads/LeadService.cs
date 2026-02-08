using CRM.Enterprise.Application.Activities;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Qualifications;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class LeadService : ILeadService
{
    private const string LeadEntityType = "Lead";
    private const int DefaultFirstTouchSlaHours = 24;
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly ILeadScoringService _leadScoringService;
    private readonly IAuditEventService _auditEvents;
    private readonly IMediator _mediator;
    private readonly IActivityService _activityService;
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public LeadService(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        ILeadScoringService leadScoringService,
        IAuditEventService auditEvents,
        IMediator mediator,
        IActivityService activityService)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _leadScoringService = leadScoringService;
        _auditEvents = auditEvents;
        _mediator = mediator;
        _activityService = activityService;
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
                l.RoutingReason,
                l.Territory,
                l.JobTitle,
                l.AccountId,
                l.ContactId,
                l.ConvertedOpportunityId,
                l.DisqualifiedReason,
                l.LossReason,
                l.LossCompetitor,
                l.LossNotes,
                l.NurtureFollowUpAtUtc,
                l.QualifiedNotes,
                l.FirstTouchDueAtUtc,
                l.FirstTouchedAtUtc,
                l.BudgetAvailability,
                l.BudgetEvidence,
                l.ReadinessToSpend,
                l.ReadinessEvidence,
                l.BuyingTimeline,
                l.TimelineEvidence,
                l.ProblemSeverity,
                l.ProblemEvidence,
                l.EconomicBuyer,
                l.EconomicBuyerEvidence,
                l.IcpFit,
                l.IcpFitEvidence,
                l.BudgetValidatedAtUtc,
                l.ReadinessValidatedAtUtc,
                l.BuyingTimelineValidatedAtUtc,
                l.ProblemSeverityValidatedAtUtc,
                l.EconomicBuyerValidatedAtUtc,
                l.IcpFitValidatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var ownerIds = leads.Select(l => l.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var items = leads.Select(l =>
        {
            var insights = BuildQualificationInsights(
                l.BudgetAvailability,
                l.BudgetEvidence,
                l.BudgetValidatedAtUtc,
                l.ReadinessToSpend,
                l.ReadinessEvidence,
                l.ReadinessValidatedAtUtc,
                l.BuyingTimeline,
                l.TimelineEvidence,
                l.BuyingTimelineValidatedAtUtc,
                l.ProblemSeverity,
                l.ProblemEvidence,
                l.ProblemSeverityValidatedAtUtc,
                l.EconomicBuyer,
                l.EconomicBuyerEvidence,
                l.EconomicBuyerValidatedAtUtc,
                l.IcpFit,
                l.IcpFitEvidence,
                l.IcpFitValidatedAtUtc);

            return new LeadListItemDto(
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
                l.RoutingReason,
                l.Territory,
                l.JobTitle,
                l.AccountId,
                l.ContactId,
                l.ConvertedOpportunityId,
                l.DisqualifiedReason,
                l.LossReason,
                l.LossCompetitor,
                l.LossNotes,
                l.NurtureFollowUpAtUtc,
                l.QualifiedNotes,
                l.FirstTouchDueAtUtc,
                l.FirstTouchedAtUtc,
                l.BudgetAvailability,
                l.BudgetEvidence,
                l.ReadinessToSpend,
                l.ReadinessEvidence,
                l.BuyingTimeline,
                l.TimelineEvidence,
                l.ProblemSeverity,
                l.ProblemEvidence,
                l.EconomicBuyer,
                l.EconomicBuyerEvidence,
                l.IcpFit,
                l.IcpFitEvidence,
                insights.Confidence,
                insights.ConfidenceLabel,
                insights.TruthCoverage,
                insights.AssumptionsOutstanding,
                insights.WeakestSignal,
                insights.WeakestState,
                insights.Breakdown,
                insights.RiskFlags);
        });

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

        var detailInsights = BuildQualificationInsights(
            lead.BudgetAvailability,
            lead.BudgetEvidence,
            lead.BudgetValidatedAtUtc,
            lead.ReadinessToSpend,
            lead.ReadinessEvidence,
            lead.ReadinessValidatedAtUtc,
            lead.BuyingTimeline,
            lead.TimelineEvidence,
            lead.BuyingTimelineValidatedAtUtc,
            lead.ProblemSeverity,
            lead.ProblemEvidence,
            lead.ProblemSeverityValidatedAtUtc,
            lead.EconomicBuyer,
            lead.EconomicBuyerEvidence,
            lead.EconomicBuyerValidatedAtUtc,
            lead.IcpFit,
            lead.IcpFitEvidence,
            lead.IcpFitValidatedAtUtc);

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
            lead.RoutingReason,
            lead.Territory,
            lead.JobTitle,
            lead.AccountId,
            lead.ContactId,
            lead.ConvertedOpportunityId,
            lead.DisqualifiedReason,
            lead.LossReason,
            lead.LossCompetitor,
            lead.LossNotes,
            lead.NurtureFollowUpAtUtc,
            lead.QualifiedNotes,
            lead.FirstTouchDueAtUtc,
            lead.FirstTouchedAtUtc,
            lead.BudgetAvailability,
            lead.BudgetEvidence,
            lead.ReadinessToSpend,
            lead.ReadinessEvidence,
            lead.BuyingTimeline,
            lead.TimelineEvidence,
            lead.ProblemSeverity,
            lead.ProblemEvidence,
            lead.EconomicBuyer,
            lead.EconomicBuyerEvidence,
            lead.IcpFit,
            lead.IcpFitEvidence,
            detailInsights.Confidence,
            detailInsights.ConfidenceLabel,
            detailInsights.TruthCoverage,
            detailInsights.AssumptionsOutstanding,
            detailInsights.WeakestSignal,
            detailInsights.WeakestState,
            detailInsights.Breakdown,
            detailInsights.RiskFlags);
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
        request = NormalizeEvidence(request);
        var assignment = await ResolveOwnerAssignmentAsync(request.OwnerId, request.Territory, request.AssignmentStrategy, cancellationToken);
        var status = await ResolveLeadStatusAsync(request.Status, cancellationToken);
        var ownerExists = await _dbContext.Users.AnyAsync(u => u.Id == assignment.OwnerId && u.IsActive && !u.IsDeleted, cancellationToken);
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
        var now = DateTime.UtcNow;
        var lead = new Lead
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Phone = request.Phone,
            CompanyName = request.CompanyName,
            JobTitle = request.JobTitle,
            LeadStatusId = status.Id,
            OwnerId = assignment.OwnerId,
            Source = request.Source,
            RoutingReason = assignment.RoutingReason,
            Territory = request.Territory,
            Score = score,
            AccountId = request.AccountId,
            ContactId = request.ContactId,
            DisqualifiedReason = request.DisqualifiedReason,
            LossReason = request.LossReason,
            LossCompetitor = request.LossCompetitor,
            LossNotes = request.LossNotes,
            NurtureFollowUpAtUtc = request.NurtureFollowUpAtUtc,
            QualifiedNotes = request.QualifiedNotes,
            BudgetAvailability = request.BudgetAvailability,
            BudgetEvidence = request.BudgetEvidence,
            ReadinessToSpend = request.ReadinessToSpend,
            ReadinessEvidence = request.ReadinessEvidence,
            BuyingTimeline = request.BuyingTimeline,
            TimelineEvidence = request.TimelineEvidence,
            ProblemSeverity = request.ProblemSeverity,
            ProblemEvidence = request.ProblemEvidence,
            EconomicBuyer = request.EconomicBuyer,
            EconomicBuyerEvidence = request.EconomicBuyerEvidence,
            IcpFit = request.IcpFit,
            IcpFitEvidence = request.IcpFitEvidence,
            CreatedAtUtc = now
        };

        ApplyQualificationValidationDates(lead, request, now);
        lead.Status = status;

        _dbContext.Leads.Add(lead);
        var resolvedStatusName = statusNameForValidation;
        ApplyStatusSideEffects(lead, resolvedStatusName);
        AddStatusHistory(lead, status.Id, null, actor);
        await _auditEvents.TrackAsync(
            CreateAuditEntry(lead.Id, "Created", null, null, null, actor),
            cancellationToken);

        await EnsureFirstTouchTaskAsync(lead, actor, cancellationToken);
        await EnsureNurtureFollowUpTaskAsync(lead, resolvedStatusName, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        if (HasAiSignals(request))
        {
            // Hangfire removed: scoring jobs must be triggered directly or via another mechanism if needed
        }

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == assignment.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        var createInsights = BuildQualificationInsights(
            lead.BudgetAvailability,
            lead.BudgetEvidence,
            lead.BudgetValidatedAtUtc,
            lead.ReadinessToSpend,
            lead.ReadinessEvidence,
            lead.ReadinessValidatedAtUtc,
            lead.BuyingTimeline,
            lead.TimelineEvidence,
            lead.BuyingTimelineValidatedAtUtc,
            lead.ProblemSeverity,
            lead.ProblemEvidence,
            lead.ProblemSeverityValidatedAtUtc,
            lead.EconomicBuyer,
            lead.EconomicBuyerEvidence,
            lead.EconomicBuyerValidatedAtUtc,
            lead.IcpFit,
            lead.IcpFitEvidence,
            lead.IcpFitValidatedAtUtc);

        var dto = new LeadListItemDto(
            lead.Id,
            $"{lead.FirstName} {lead.LastName}".Trim(),
            lead.CompanyName ?? string.Empty,
            resolvedStatusName ?? "New",
            lead.Email,
            lead.Phone,
            assignment.OwnerId,
            ownerName,
            lead.Score,
            lead.CreatedAtUtc,
            lead.Source,
            lead.RoutingReason,
            lead.Territory,
            lead.JobTitle,
            lead.AccountId,
            lead.ContactId,
            lead.ConvertedOpportunityId,
            lead.DisqualifiedReason,
            lead.LossReason,
            lead.LossCompetitor,
            lead.LossNotes,
            lead.NurtureFollowUpAtUtc,
            lead.QualifiedNotes,
            lead.FirstTouchDueAtUtc,
            lead.FirstTouchedAtUtc,
            lead.BudgetAvailability,
            lead.BudgetEvidence,
            lead.ReadinessToSpend,
            lead.ReadinessEvidence,
            lead.BuyingTimeline,
            lead.TimelineEvidence,
            lead.ProblemSeverity,
            lead.ProblemEvidence,
            lead.EconomicBuyer,
            lead.EconomicBuyerEvidence,
            lead.IcpFit,
            lead.IcpFitEvidence,
            createInsights.Confidence,
            createInsights.ConfidenceLabel,
            createInsights.TruthCoverage,
            createInsights.AssumptionsOutstanding,
            createInsights.WeakestSignal,
            createInsights.WeakestState,
            createInsights.Breakdown,
            createInsights.RiskFlags);

        return LeadOperationResult<LeadListItemDto>.Ok(dto);
    }

    public async Task<LeadOperationResult<bool>> UpdateAsync(Guid id, LeadUpsertRequest request, LeadActor actor, CancellationToken cancellationToken = default)
    {
        request = NormalizeEvidence(request);
        var lead = await _dbContext.Leads.FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null)
        {
            return LeadOperationResult<bool>.NotFoundResult();
        }

        var previousStatusId = lead.LeadStatusId;
        var previousOwnerId = lead.OwnerId;
        var shouldAiScore = HasAiSignalChanges(lead, request);
        var previousQualification = new QualificationSnapshot(
            lead.BudgetAvailability,
            lead.BudgetEvidence,
            lead.BudgetValidatedAtUtc,
            lead.ReadinessToSpend,
            lead.ReadinessEvidence,
            lead.ReadinessValidatedAtUtc,
            lead.BuyingTimeline,
            lead.TimelineEvidence,
            lead.BuyingTimelineValidatedAtUtc,
            lead.ProblemSeverity,
            lead.ProblemEvidence,
            lead.ProblemSeverityValidatedAtUtc,
            lead.EconomicBuyer,
            lead.EconomicBuyerEvidence,
            lead.EconomicBuyerValidatedAtUtc,
            lead.IcpFit,
            lead.IcpFitEvidence,
            lead.IcpFitValidatedAtUtc);

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
        var resolvedStatusName = statusName ?? request.Status ?? "New";
        var requestedOwnerId = request.OwnerId ?? lead.OwnerId;
        var assignment = await ResolveOwnerAssignmentAsync(requestedOwnerId, request.Territory, request.AssignmentStrategy, cancellationToken);
        lead.OwnerId = assignment.OwnerId;
        lead.RoutingReason = assignment.RoutingReason;
        lead.Source = request.Source;
        lead.Territory = request.Territory;
        lead.Score = ResolveLeadScore(request, lead.Score);
        lead.AccountId = request.AccountId;
        lead.ContactId = request.ContactId;
        lead.DisqualifiedReason = request.DisqualifiedReason;
        lead.LossReason = request.LossReason;
        lead.LossCompetitor = request.LossCompetitor;
        lead.LossNotes = request.LossNotes;
        lead.NurtureFollowUpAtUtc = request.NurtureFollowUpAtUtc;
        lead.QualifiedNotes = request.QualifiedNotes;
        lead.BudgetAvailability = request.BudgetAvailability;
        lead.BudgetEvidence = request.BudgetEvidence;
        lead.ReadinessToSpend = request.ReadinessToSpend;
        lead.ReadinessEvidence = request.ReadinessEvidence;
        lead.BuyingTimeline = request.BuyingTimeline;
        lead.TimelineEvidence = request.TimelineEvidence;
        lead.ProblemSeverity = request.ProblemSeverity;
        lead.ProblemEvidence = request.ProblemEvidence;
        lead.EconomicBuyer = request.EconomicBuyer;
        lead.EconomicBuyerEvidence = request.EconomicBuyerEvidence;
        lead.IcpFit = request.IcpFit;
        lead.IcpFitEvidence = request.IcpFitEvidence;
        var updatedAt = DateTime.UtcNow;
        lead.UpdatedAtUtc = updatedAt;
        UpdateQualificationValidationDates(lead, request, previousQualification, updatedAt);

        var validationError = ValidateOutcome(resolvedStatusName, request);
        if (validationError is not null)
        {
            return LeadOperationResult<bool>.Fail(validationError);
        }

        var statusChanged = lead.LeadStatusId != previousStatusId;
        if (statusChanged
            && actor.UserId != Guid.Empty
            && string.Equals(resolvedStatusName, "Qualified", StringComparison.OrdinalIgnoreCase))
        {
            var handoffError = await ValidateQualifiedHandoffAsync(lead.Id, lead.QualifiedNotes, cancellationToken);
            if (handoffError is not null)
            {
                return LeadOperationResult<bool>.Fail(handoffError);
            }
        }

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

        var ownerChanged = previousOwnerId != lead.OwnerId;
        if (ownerChanged)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(lead.Id, "OwnerChanged", "OwnerId", previousOwnerId.ToString(), lead.OwnerId.ToString(), actor),
                cancellationToken);
            await EnsureFirstTouchTaskAsync(lead, actor, cancellationToken);
        }

        await EnsureNurtureFollowUpTaskAsync(lead, resolvedStatusName, cancellationToken);
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

        if (statusChanged && string.Equals(resolvedStatusName, "Qualified", StringComparison.OrdinalIgnoreCase))
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

        var qualificationDecision = await EvaluateConversionPolicyAsync(lead, request, cancellationToken);
        if (!qualificationDecision.Allowed)
        {
            return LeadOperationResult<LeadConversionResultDto>.Fail(qualificationDecision.Message);
        }

        var assignment = await ResolveOwnerAssignmentAsync(lead.OwnerId, lead.Territory, "Manual", cancellationToken);
        var ownerId = assignment.OwnerId;
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

        await TransferLeadActivitiesAsync(lead.Id, accountId, opportunityId, actor, now, cancellationToken);

        await _auditEvents.TrackAsync(
            CreateAuditEntry(
                lead.Id,
                "Converted",
                null,
                null,
                BuildConversionAuditNote(accountId, contactId, opportunityId, qualificationDecision),
                actor),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        await CreateConversionNoteActivityAsync(lead, accountId, contactId, opportunityId, actor, now, cancellationToken);

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

    private async Task CreateConversionNoteActivityAsync(
        Lead lead,
        Guid? accountId,
        Guid? contactId,
        Guid? opportunityId,
        LeadActor actor,
        DateTime now,
        CancellationToken cancellationToken)
    {
        ActivityRelationType? targetType = null;
        Guid targetId = Guid.Empty;

        if (opportunityId.HasValue)
        {
            targetType = ActivityRelationType.Opportunity;
            targetId = opportunityId.Value;
        }
        else if (accountId.HasValue)
        {
            targetType = ActivityRelationType.Account;
            targetId = accountId.Value;
        }

        if (targetType is null)
        {
            return;
        }

        var leadName = $"{lead.FirstName} {lead.LastName}".Trim();
        var subject = string.IsNullOrWhiteSpace(leadName)
            ? "Lead converted"
            : $"Lead converted: {leadName}";
        var description = $"Converted lead {lead.Id} to account {accountId?.ToString() ?? "none"}; contact {contactId?.ToString() ?? "none"}; opportunity {opportunityId?.ToString() ?? "none"}.";

        _ = await _activityService.CreateAsync(
            new ActivityUpsertRequest(
                subject,
                description,
                "Converted",
                null,
                ActivityType.Task,
                "Normal",
                now,
                now,
                "Post-conversion follow-up",
                now.AddDays(1),
                targetType,
                targetId,
                lead.OwnerId),
            new CRM.Enterprise.Application.Common.ActorContext(actor.UserId == Guid.Empty ? null : actor.UserId, actor.UserName),
            cancellationToken);
    }

    private async Task TransferLeadActivitiesAsync(
        Guid leadId,
        Guid? accountId,
        Guid? opportunityId,
        LeadActor actor,
        DateTime now,
        CancellationToken cancellationToken)
    {
        ActivityRelationType? targetType = null;
        Guid targetId = Guid.Empty;

        if (opportunityId.HasValue)
        {
            targetType = ActivityRelationType.Opportunity;
            targetId = opportunityId.Value;
        }
        else if (accountId.HasValue)
        {
            targetType = ActivityRelationType.Account;
            targetId = accountId.Value;
        }

        if (targetType is null)
        {
            return;
        }

        var activities = await _dbContext.Activities
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Lead
                        && a.RelatedEntityId == leadId)
            .ToListAsync(cancellationToken);

        if (activities.Count == 0)
        {
            return;
        }

        foreach (var activity in activities)
        {
            activity.RelatedEntityType = targetType.Value;
            activity.RelatedEntityId = targetId;
            activity.UpdatedAtUtc = now;
            activity.UpdatedBy = actor.UserName;
        }
    }

    private async Task<ConversionDecision> EvaluateConversionPolicyAsync(
        Lead lead,
        LeadConversionRequest request,
        CancellationToken cancellationToken)
    {
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == lead.TenantId, cancellationToken);
        var policy = ResolveQualificationPolicy(tenant);
        var score = lead.Score;
        var baseThreshold = ResolveThreshold(policy, request);
        var adjustedThreshold = ApplyModifiers(baseThreshold, policy, request);
        var requiresManagerApproval = score < policy.ManagerApprovalBelow;
        var belowBlock = score < policy.BlockBelow;
        var belowThreshold = score < adjustedThreshold;

        if (belowBlock && !policy.AllowOverrides)
        {
            return ConversionDecision.Fail($"Qualification score {score}/100 is below the minimum threshold ({policy.BlockBelow}).");
        }

        if (belowThreshold && !policy.AllowOverrides)
        {
            return ConversionDecision.Fail($"Qualification score {score}/100 is below the required threshold ({adjustedThreshold}).");
        }

        if ((belowThreshold || belowBlock) && policy.AllowOverrides)
        {
            if (requiresManagerApproval && request.ManagerApproved != true)
            {
                return ConversionDecision.Fail("Manager approval is required to convert at this score.");
            }

            if (policy.RequireOverrideReason && string.IsNullOrWhiteSpace(request.OverrideReason))
            {
                return ConversionDecision.Fail("Override reason is required to convert at this score.");
            }

            return ConversionDecision.Override(adjustedThreshold, requiresManagerApproval);
        }

        if (requiresManagerApproval && request.ManagerApproved != true)
        {
            return ConversionDecision.Fail("Manager approval is required to convert at this score.");
        }

        return ConversionDecision.Allow(adjustedThreshold);
    }

    private static string BuildConversionAuditNote(Guid? accountId, Guid? contactId, Guid? opportunityId, ConversionDecision decision)
    {
        var note = $"AccountId={accountId};ContactId={contactId};OpportunityId={opportunityId}";
        if (decision.IsOverride && !string.IsNullOrWhiteSpace(decision.Message))
        {
            note += $";Override={decision.Message}";
        }
        return note;
    }

    private static QualificationPolicy ResolveQualificationPolicy(Tenant? tenant)
    {
        if (tenant is null || string.IsNullOrWhiteSpace(tenant.QualificationPolicyJson))
        {
            return QualificationPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<QualificationPolicy>(tenant.QualificationPolicyJson, JsonOptions);
            return parsed ?? QualificationPolicyDefaults.CreateDefault();
        }
        catch (JsonException)
        {
            return QualificationPolicyDefaults.CreateDefault();
        }
    }

    private static int ResolveThreshold(QualificationPolicy policy, LeadConversionRequest request)
    {
        if (policy.ThresholdRules is null || policy.ThresholdRules.Count == 0)
        {
            return policy.DefaultThreshold;
        }

        var segment = request.Segment ?? "All";
        var dealType = request.DealType ?? "All";
        var stage = request.Stage ?? "All";

        QualificationThresholdRule? best = null;
        var bestScore = -1;
        foreach (var rule in policy.ThresholdRules)
        {
            var score = 0;
            if (!Matches(rule.Segment, segment)) continue;
            if (!Matches(rule.DealType, dealType)) continue;
            if (!Matches(rule.Stage, stage)) continue;
            if (!IsWildcard(rule.Segment)) score++;
            if (!IsWildcard(rule.DealType)) score++;
            if (!IsWildcard(rule.Stage)) score++;
            if (score > bestScore || (score == bestScore && rule.Threshold > (best?.Threshold ?? 0)))
            {
                best = rule;
                bestScore = score;
            }
        }

        return best?.Threshold ?? policy.DefaultThreshold;
    }

    private static int ApplyModifiers(int baseThreshold, QualificationPolicy policy, LeadConversionRequest request)
    {
        if (policy.Modifiers is null || policy.Modifiers.Count == 0)
        {
            return ClampScore(baseThreshold);
        }

        var adjusted = baseThreshold;
        foreach (var modifier in policy.Modifiers)
        {
            if (IsModifierActive(modifier.Key, request))
            {
                adjusted += modifier.Delta;
            }
        }

        return ClampScore(adjusted);
    }

    private static bool IsModifierActive(string key, LeadConversionRequest request)
    {
        var normalized = key?.Trim().ToLowerInvariant() ?? string.Empty;
        return normalized switch
        {
            "competitive" => request.IsCompetitive == true,
            "executivechampion" => request.HasExecutiveChampion == true,
            "strategic" => request.IsStrategic == true,
            "fastvelocity" => string.Equals(request.Velocity, "Fast", StringComparison.OrdinalIgnoreCase),
            "slowvelocity" => string.Equals(request.Velocity, "Slow", StringComparison.OrdinalIgnoreCase),
            _ => false
        };
    }

    private static bool Matches(string ruleValue, string actual)
    {
        if (IsWildcard(ruleValue)) return true;
        return string.Equals(ruleValue, actual, StringComparison.OrdinalIgnoreCase);
    }

    private static bool IsWildcard(string value)
    {
        return string.IsNullOrWhiteSpace(value) || value.Equals("All", StringComparison.OrdinalIgnoreCase);
    }

    private static int ClampScore(int value)
    {
        return Math.Min(100, Math.Max(0, value));
    }

    private sealed record ConversionDecision(bool Allowed, bool IsOverride, string Message, int Threshold, bool RequiresManagerApproval)
    {
        public static ConversionDecision Fail(string message) => new(false, false, message, 0, false);
        public static ConversionDecision Allow(int threshold) => new(true, false, string.Empty, threshold, false);
        public static ConversionDecision Override(int threshold, bool requiresManager) =>
            new(true, true, $"threshold={threshold};managerApproval={requiresManager}", threshold, requiresManager);
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


    public async Task<IReadOnlyList<LeadCadenceTouchDto>?> GetCadenceTouchesAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Leads
            .AsNoTracking()
            .AnyAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (!exists)
        {
            return null;
        }

        var touches = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Lead
                        && a.RelatedEntityId == id
                        && a.Subject != null
                        && EF.Functions.Like(a.Subject, "Cadence %")
                        && a.CompletedDateUtc.HasValue)
            .OrderByDescending(a => a.CompletedDateUtc)
            .Take(20)
            .Select(a => new
            {
                a.Id,
                a.Subject,
                a.Outcome,
                a.CompletedDateUtc,
                a.Description,
                a.OwnerId
            })
            .ToListAsync(cancellationToken);

        var ownerIds = touches.Select(t => t.OwnerId).Where(id => id != Guid.Empty).Distinct().ToList();
        var owners = ownerIds.Count == 0
            ? new Dictionary<Guid, string>()
            : await _dbContext.Users
                .AsNoTracking()
                .Where(u => ownerIds.Contains(u.Id))
                .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        return touches.Select(t => new LeadCadenceTouchDto(
                t.Id,
                ResolveCadenceChannel(t.Subject),
                string.IsNullOrWhiteSpace(t.Outcome) ? "Logged" : t.Outcome,
                t.CompletedDateUtc!.Value,
                TryParseNextStepDue(t.Description),
                owners.TryGetValue(t.OwnerId, out var ownerName) ? ownerName : "Unassigned"))
            .ToList();
    }

    public async Task<LeadOperationResult<LeadCadenceTouchDto>> LogCadenceTouchAsync(Guid id, LeadCadenceTouchRequest request, LeadActor actor, CancellationToken cancellationToken = default)
    {
        var lead = await _dbContext.Leads
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted, cancellationToken);
        if (lead is null)
        {
            return LeadOperationResult<LeadCadenceTouchDto>.NotFoundResult();
        }

        var channel = string.IsNullOrWhiteSpace(request.Channel) ? string.Empty : request.Channel.Trim();
        var outcome = string.IsNullOrWhiteSpace(request.Outcome) ? string.Empty : request.Outcome.Trim();
        if (string.IsNullOrWhiteSpace(channel) || string.IsNullOrWhiteSpace(outcome))
        {
            return LeadOperationResult<LeadCadenceTouchDto>.Fail("Channel and outcome are required.");
        }

        if (!request.NextStepDueAtUtc.HasValue)
        {
            return LeadOperationResult<LeadCadenceTouchDto>.Fail("Next step due date is required.");
        }

        var activityType = channel.ToLowerInvariant() switch
        {
            "call" => ActivityType.Call,
            "email" => ActivityType.Email,
            "linkedin" => ActivityType.Task,
            _ => ActivityType.Task
        };

        var leadName = ($"{lead.FirstName} {lead.LastName}").Trim();
        var subject = string.IsNullOrWhiteSpace(leadName)
            ? $"Cadence {channel}"
            : $"Cadence {channel}: {leadName}";
        var nextStepSubject = $"Follow-up ({channel})";
        var description = $"Cadence touch logged via SDR workflow.{Environment.NewLine}NextStepDueAtUtc={request.NextStepDueAtUtc.Value:o}";

        var activityResult = await _activityService.CreateAsync(
            new ActivityUpsertRequest(
                subject,
                description,
                outcome,
                null,
                activityType,
                "Medium",
                request.NextStepDueAtUtc,
                DateTime.UtcNow,
                nextStepSubject,
                request.NextStepDueAtUtc,
                ActivityRelationType.Lead,
                lead.Id,
                lead.OwnerId),
            new CRM.Enterprise.Application.Common.ActorContext(actor.UserId == Guid.Empty ? null : actor.UserId, actor.UserName),
            cancellationToken);

        if (!activityResult.Success || activityResult.Value is null)
        {
            return LeadOperationResult<LeadCadenceTouchDto>.Fail(activityResult.Error ?? "Unable to log cadence touch.");
        }

        await _auditEvents.TrackAsync(
            CreateAuditEntry(lead.Id, "CadenceTouchLogged", "Cadence", null, subject, actor),
            cancellationToken);

        var dto = new LeadCadenceTouchDto(
            activityResult.Value.Id,
            channel,
            outcome,
            activityResult.Value.CompletedDateUtc ?? DateTime.UtcNow,
            request.NextStepDueAtUtc,
            activityResult.Value.OwnerName ?? "Unassigned");
        return LeadOperationResult<LeadCadenceTouchDto>.Ok(dto);
    }

    private async Task<string?> ValidateQualifiedHandoffAsync(Guid leadId, string? qualifiedNotes, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(qualifiedNotes))
        {
            return "Qualified notes are required before handoff.";
        }

        var hasMeeting = await _dbContext.Activities
            .AsNoTracking()
            .AnyAsync(a => !a.IsDeleted
                           && a.RelatedEntityType == ActivityRelationType.Lead
                           && a.RelatedEntityId == leadId
                           && a.Type == ActivityType.Meeting
                           && (a.CompletedDateUtc.HasValue
                               || (a.DueDateUtc.HasValue && a.DueDateUtc.Value >= DateTime.UtcNow.AddDays(-1))),
                cancellationToken);
        return hasMeeting
            ? null
            : "Book or log a discovery meeting before qualifying this lead.";
    }

    private static string ResolveCadenceChannel(string subject)
    {
        var prefix = "Cadence ";
        if (!subject.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
        {
            return "Touch";
        }

        var remainder = subject.Substring(prefix.Length);
        var parts = remainder.Split(':', 2, StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);
        return parts.Length == 0 ? "Touch" : parts[0];
    }

    private static DateTime? TryParseNextStepDue(string? description)
    {
        if (string.IsNullOrWhiteSpace(description))
        {
            return null;
        }

        var marker = "NextStepDueAtUtc=";
        var start = description.IndexOf(marker, StringComparison.OrdinalIgnoreCase);
        if (start < 0)
        {
            return null;
        }

        var value = description.Substring(start + marker.Length).Trim();
        return DateTime.TryParse(value, out var parsed) ? parsed : null;
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

    private sealed record OwnerAssignmentResult(Guid OwnerId, string? RoutingReason);

    private async Task<OwnerAssignmentResult> ResolveOwnerAssignmentAsync(
        Guid? requestedOwnerId,
        string? territory,
        string? assignmentStrategy,
        CancellationToken cancellationToken)
    {
        var strategy = string.IsNullOrWhiteSpace(assignmentStrategy) ? string.Empty : assignmentStrategy.Trim();

        if (string.Equals(strategy, "Manual", StringComparison.OrdinalIgnoreCase) || string.IsNullOrWhiteSpace(strategy))
        {
            if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
            {
                var exists = await _dbContext.Users.AnyAsync(u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted, cancellationToken);
                if (exists) return new OwnerAssignmentResult(requestedOwnerId.Value, "Manual assignment");
            }
        }

        if (string.Equals(strategy, "Territory", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrWhiteSpace(territory))
        {
            var territoryRule = await _dbContext.LeadAssignmentRules
                .FirstOrDefaultAsync(r => r.IsActive && r.Type == "Territory" && r.Territory == territory, cancellationToken);

            if (territoryRule?.AssignedUserId is Guid territoryOwner && territoryOwner != Guid.Empty)
            {
                var exists = await _dbContext.Users.AnyAsync(u => u.Id == territoryOwner && u.IsActive && !u.IsDeleted, cancellationToken);
                if (exists) return new OwnerAssignmentResult(territoryOwner, $"Territory rule: {territory}");
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

                return new OwnerAssignmentResult(nextOwner, "Round-robin rule");
            }
        }

        var fallbackUserId = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return new OwnerAssignmentResult(
            fallbackUserId == Guid.Empty ? Guid.NewGuid() : fallbackUserId,
            "Fallback: first active user");
    }

    private async Task<Guid> ResolveOwnerIdAsync(
        Guid? requestedOwnerId,
        string? territory,
        string? assignmentStrategy,
        CancellationToken cancellationToken)
    {
        var assignment = await ResolveOwnerAssignmentAsync(requestedOwnerId, territory, assignmentStrategy, cancellationToken);
        return assignment.OwnerId;
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
        if (string.Equals(statusName, "Disqualified", StringComparison.OrdinalIgnoreCase))
        {
            return string.IsNullOrWhiteSpace(request.DisqualifiedReason)
                ? "Disqualified reason is required when closing a lead."
                : null;
        }

        if (string.Equals(statusName, "Lost", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(request.LossReason))
            {
                return "Loss reason is required when marking a lead as Lost.";
            }

            if (string.IsNullOrWhiteSpace(request.LossCompetitor))
            {
                return "Competitor is required when marking a lead as Lost.";
            }

            return string.IsNullOrWhiteSpace(request.LossNotes)
                ? "Loss notes are required when marking a lead as Lost."
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
            if (CountQualificationFactors(request) < 3)
            {
                return "At least 3 qualification factors are required to set a lead to Qualified.";
            }

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
            var sla = await ResolveFirstTouchSlaAsync(cancellationToken);
            lead.FirstTouchDueAtUtc = DateTime.UtcNow.Add(sla);
        }

        var existingTask = await _dbContext.Activities
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Lead
                        && a.RelatedEntityId == lead.Id
                        && !a.CompletedDateUtc.HasValue
                        && a.Subject != null
                        && EF.Functions.Like(a.Subject, "First touch%"))
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

    private async Task<TimeSpan> ResolveFirstTouchSlaAsync(CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return TimeSpan.FromHours(DefaultFirstTouchSlaHours);
        }

        var hours = await _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == tenantId)
            .Select(t => t.LeadFirstTouchSlaHours)
            .FirstOrDefaultAsync(cancellationToken);

        var resolved = hours.GetValueOrDefault(DefaultFirstTouchSlaHours);
        if (resolved <= 0)
        {
            resolved = DefaultFirstTouchSlaHours;
        }

        return TimeSpan.FromHours(resolved);
    }

    private async Task EnsureNurtureFollowUpTaskAsync(
        Lead lead,
        string? statusName,
        CancellationToken cancellationToken)
    {
        if (!string.Equals(statusName, "Nurture", StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        if (!lead.NurtureFollowUpAtUtc.HasValue)
        {
            return;
        }

        var existingTask = await _dbContext.Activities
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Lead
                        && a.RelatedEntityId == lead.Id
                        && !a.CompletedDateUtc.HasValue
                        && a.Subject != null
                        && EF.Functions.Like(a.Subject, "Nurture follow-up%"))
            .FirstOrDefaultAsync(cancellationToken);

        if (existingTask is not null)
        {
            if (existingTask.OwnerId != lead.OwnerId)
            {
                existingTask.OwnerId = lead.OwnerId;
                existingTask.UpdatedAtUtc = DateTime.UtcNow;
            }

            if (existingTask.DueDateUtc != lead.NurtureFollowUpAtUtc)
            {
                existingTask.DueDateUtc = lead.NurtureFollowUpAtUtc;
                existingTask.UpdatedAtUtc = DateTime.UtcNow;
            }

            return;
        }

        var fullName = $"{lead.FirstName} {lead.LastName}".Trim();
        var subject = string.IsNullOrWhiteSpace(fullName)
            ? "Nurture follow-up"
            : $"Nurture follow-up: {fullName}";

        _dbContext.Activities.Add(new Activity
        {
            Subject = subject,
            Type = ActivityType.Task,
            RelatedEntityType = ActivityRelationType.Lead,
            RelatedEntityId = lead.Id,
            OwnerId = lead.OwnerId,
            DueDateUtc = lead.NurtureFollowUpAtUtc,
            Priority = "Normal",
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
        if (TryComputeQualificationScore(request, out var qualificationScore))
        {
            return qualificationScore;
        }

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

    private static bool TryComputeQualificationScore(LeadUpsertRequest request, out int score)
    {
        if (CountQualificationFactors(request) == 0)
        {
            score = 0;
            return false;
        }

        score = GetBudgetScore(request.BudgetAvailability)
                + GetReadinessScore(request.ReadinessToSpend)
                + GetTimelineScore(request.BuyingTimeline)
                + GetProblemScore(request.ProblemSeverity)
                + GetEconomicBuyerScore(request.EconomicBuyer)
                + GetIcpFitScore(request.IcpFit);
        return true;
    }

    private static int CountQualificationFactors(LeadUpsertRequest request)
    {
        var count = 0;
        if (IsMeaningfulFactor(request.BudgetAvailability)) count++;
        if (IsMeaningfulFactor(request.ReadinessToSpend)) count++;
        if (IsMeaningfulFactor(request.BuyingTimeline)) count++;
        if (IsMeaningfulFactor(request.ProblemSeverity)) count++;
        if (IsMeaningfulFactor(request.EconomicBuyer)) count++;
        if (IsMeaningfulFactor(request.IcpFit)) count++;
        return count;
    }

    private static LeadUpsertRequest NormalizeEvidence(LeadUpsertRequest request)
    {
        return request with
        {
            BudgetEvidence = NormalizeEvidenceValue(request.BudgetAvailability, request.BudgetEvidence),
            ReadinessEvidence = NormalizeEvidenceValue(request.ReadinessToSpend, request.ReadinessEvidence),
            TimelineEvidence = NormalizeEvidenceValue(request.BuyingTimeline, request.TimelineEvidence),
            ProblemEvidence = NormalizeEvidenceValue(request.ProblemSeverity, request.ProblemEvidence),
            EconomicBuyerEvidence = NormalizeEvidenceValue(request.EconomicBuyer, request.EconomicBuyerEvidence),
            IcpFitEvidence = NormalizeEvidenceValue(request.IcpFit, request.IcpFitEvidence)
        };
    }

    private static string NormalizeEvidenceValue(string? factorValue, string? evidenceValue)
    {
        if (IsUnknown(factorValue))
        {
            return "No evidence yet";
        }

        if (string.IsNullOrWhiteSpace(evidenceValue))
        {
            return "No evidence yet";
        }

        return evidenceValue.Trim();
    }

    private static void ApplyQualificationValidationDates(Lead lead, LeadUpsertRequest request, DateTime now)
    {
        lead.BudgetValidatedAtUtc = ResolveValidationDate(request.BudgetAvailability, now);
        lead.ReadinessValidatedAtUtc = ResolveValidationDate(request.ReadinessToSpend, now);
        lead.BuyingTimelineValidatedAtUtc = ResolveValidationDate(request.BuyingTimeline, now);
        lead.ProblemSeverityValidatedAtUtc = ResolveValidationDate(request.ProblemSeverity, now);
        lead.EconomicBuyerValidatedAtUtc = ResolveValidationDate(request.EconomicBuyer, now);
        lead.IcpFitValidatedAtUtc = ResolveValidationDate(request.IcpFit, now);
    }

    private static void UpdateQualificationValidationDates(
        Lead lead,
        LeadUpsertRequest request,
        QualificationSnapshot previous,
        DateTime now)
    {
        lead.BudgetValidatedAtUtc = ResolveUpdatedValidationDate(
            previous.BudgetAvailability,
            previous.BudgetEvidence,
            previous.BudgetValidatedAtUtc,
            request.BudgetAvailability,
            request.BudgetEvidence,
            now);

        lead.ReadinessValidatedAtUtc = ResolveUpdatedValidationDate(
            previous.ReadinessToSpend,
            previous.ReadinessEvidence,
            previous.ReadinessValidatedAtUtc,
            request.ReadinessToSpend,
            request.ReadinessEvidence,
            now);

        lead.BuyingTimelineValidatedAtUtc = ResolveUpdatedValidationDate(
            previous.BuyingTimeline,
            previous.TimelineEvidence,
            previous.BuyingTimelineValidatedAtUtc,
            request.BuyingTimeline,
            request.TimelineEvidence,
            now);

        lead.ProblemSeverityValidatedAtUtc = ResolveUpdatedValidationDate(
            previous.ProblemSeverity,
            previous.ProblemEvidence,
            previous.ProblemSeverityValidatedAtUtc,
            request.ProblemSeverity,
            request.ProblemEvidence,
            now);

        lead.EconomicBuyerValidatedAtUtc = ResolveUpdatedValidationDate(
            previous.EconomicBuyer,
            previous.EconomicBuyerEvidence,
            previous.EconomicBuyerValidatedAtUtc,
            request.EconomicBuyer,
            request.EconomicBuyerEvidence,
            now);

        lead.IcpFitValidatedAtUtc = ResolveUpdatedValidationDate(
            previous.IcpFit,
            previous.IcpFitEvidence,
            previous.IcpFitValidatedAtUtc,
            request.IcpFit,
            request.IcpFitEvidence,
            now);
    }

    private static DateTime? ResolveValidationDate(string? value, DateTime now)
    {
        return IsMeaningfulFactor(value) ? now : null;
    }

    private static DateTime? ResolveUpdatedValidationDate(
        string? previousValue,
        string? previousEvidence,
        DateTime? previousValidatedAtUtc,
        string? nextValue,
        string? nextEvidence,
        DateTime now)
    {
        if (IsUnknown(nextValue))
        {
            return null;
        }

        var valueChanged = !string.Equals(Normalize(previousValue), Normalize(nextValue), StringComparison.OrdinalIgnoreCase);
        var evidenceChanged = !string.Equals(Normalize(previousEvidence), Normalize(nextEvidence), StringComparison.OrdinalIgnoreCase);

        if (valueChanged || evidenceChanged)
        {
            return now;
        }

        return previousValidatedAtUtc ?? now;
    }

    private static bool IsMeaningfulFactor(string? value)
    {
        return !string.IsNullOrWhiteSpace(value) && !IsUnknown(value);
    }

    private static bool IsUnknown(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return true;
        return value.Contains("unknown", StringComparison.OrdinalIgnoreCase);
    }

    private sealed record QualificationSnapshot(
        string? BudgetAvailability,
        string? BudgetEvidence,
        DateTime? BudgetValidatedAtUtc,
        string? ReadinessToSpend,
        string? ReadinessEvidence,
        DateTime? ReadinessValidatedAtUtc,
        string? BuyingTimeline,
        string? TimelineEvidence,
        DateTime? BuyingTimelineValidatedAtUtc,
        string? ProblemSeverity,
        string? ProblemEvidence,
        DateTime? ProblemSeverityValidatedAtUtc,
        string? EconomicBuyer,
        string? EconomicBuyerEvidence,
        DateTime? EconomicBuyerValidatedAtUtc,
        string? IcpFit,
        string? IcpFitEvidence,
        DateTime? IcpFitValidatedAtUtc);

    private static int GetBudgetScore(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return 0;
        return value.Trim().ToLowerInvariant() switch
        {
            "budget allocated and approved" => 25,
            "budget identified but unapproved" => 15,
            "indicative range mentioned" => 15,
            "no defined budget" => 5,
            "budget explicitly unavailable" => 0,
            _ => 0
        };
    }

    private static int GetReadinessScore(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return 0;
        return value.Trim().ToLowerInvariant() switch
        {
            "interest expressed, no urgency" => 8,
            "actively evaluating solutions" => 15,
            "internal decision in progress" => 20,
            "ready to proceed pending final step" => 20,
            "not planning to spend" => 0,
            _ => 0
        };
    }

    private static int GetTimelineScore(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return 0;
        return value.Trim().ToLowerInvariant() switch
        {
            "decision date confirmed internally" => 15,
            "target date verbally confirmed" => 12,
            "rough timeline mentioned" => 6,
            "date missed / repeatedly pushed" => 0,
            "no defined timeline" => 0,
            _ => 0
        };
    }

    private static int GetProblemScore(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return 0;
        return value.Trim().ToLowerInvariant() switch
        {
            "executive-level priority" => 20,
            "critical business impact" => 15,
            "recognized operational problem" => 8,
            "mild inconvenience" => 2,
            "problem acknowledged but deprioritized" => 0,
            _ => 0
        };
    }

    private static int GetEconomicBuyerScore(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return 0;
        return value.Trim().ToLowerInvariant() switch
        {
            "buyer engaged in discussion" => 10,
            "buyer verbally supportive" => 10,
            "buyer identified, not engaged" => 5,
            "influencer identified" => 5,
            "buyer explicitly not involved" => 0,
            _ => 0
        };
    }

    private static int GetIcpFitScore(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return 0;
        return value.Trim().ToLowerInvariant() switch
        {
            "strong icp fit" => 10,
            "partial icp fit" => 5,
            "out-of-profile but exploratory" => 5,
            "clearly out of icp" => 0,
            _ => 0
        };
    }

    private static QualificationInsights BuildQualificationInsights(
        string? budgetAvailability,
        string? budgetEvidence,
        DateTime? budgetValidatedAtUtc,
        string? readinessToSpend,
        string? readinessEvidence,
        DateTime? readinessValidatedAtUtc,
        string? buyingTimeline,
        string? timelineEvidence,
        DateTime? buyingTimelineValidatedAtUtc,
        string? problemSeverity,
        string? problemEvidence,
        DateTime? problemSeverityValidatedAtUtc,
        string? economicBuyer,
        string? economicBuyerEvidence,
        DateTime? economicBuyerValidatedAtUtc,
        string? icpFit,
        string? icpFitEvidence,
        DateTime? icpFitValidatedAtUtc)
    {
        var breakdown = new List<LeadScoreBreakdownItem>
        {
            new("Budget", GetBudgetScore(budgetAvailability), 25),
            new("Readiness", GetReadinessScore(readinessToSpend), 20),
            new("Timeline", GetTimelineScore(buyingTimeline), 15),
            new("Problem", GetProblemScore(problemSeverity), 20),
            new("Economic Buyer", GetEconomicBuyerScore(economicBuyer), 10),
            new("ICP Fit", GetIcpFitScore(icpFit), 10)
        };

        var factors = new List<EpistemicFactorInsight>
        {
            BuildFactorInsight("Budget availability", ResolveBudgetState(budgetAvailability), budgetEvidence, budgetValidatedAtUtc, true),
            BuildFactorInsight("Readiness to spend", ResolveReadinessState(readinessToSpend), readinessEvidence, readinessValidatedAtUtc, false),
            BuildFactorInsight("Buying timeline", ResolveTimelineState(buyingTimeline), timelineEvidence, buyingTimelineValidatedAtUtc, true),
            BuildFactorInsight("Problem severity", ResolveProblemState(problemSeverity), problemEvidence, problemSeverityValidatedAtUtc, false),
            BuildFactorInsight("Economic buyer", ResolveEconomicBuyerState(economicBuyer), economicBuyerEvidence, economicBuyerValidatedAtUtc, true),
            BuildFactorInsight("ICP fit", ResolveIcpFitState(icpFit), icpFitEvidence, icpFitValidatedAtUtc, false)
        };

        var confidence = factors.Count == 0 ? 0m : factors.Average(f => f.Confidence);
        var confidenceLabel = ConfidenceLabelFor(confidence);

        var truthCoverage = factors.Count == 0
            ? 0m
            : factors.Count(f => f.State == EpistemicState.Verified && f.Confidence >= 0.75m) / (decimal)factors.Count;

        var assumptionsOutstanding = factors.Count(f => f.IsHighImpact && (f.State == EpistemicState.Unknown || f.State == EpistemicState.Assumed));

        var weakest = factors.OrderBy(f => f.Confidence).FirstOrDefault();

        var riskFlags = new List<string>();
        if (!IsMeaningfulFactor(buyingTimeline))
        {
            riskFlags.Add("No buying timeline");
        }
        if (!IsMeaningfulFactor(economicBuyer)
            || string.Equals(economicBuyer, "Buyer identified, not engaged", StringComparison.OrdinalIgnoreCase)
            || string.Equals(economicBuyer, "Influencer identified", StringComparison.OrdinalIgnoreCase))
        {
            riskFlags.Add("Economic buyer not engaged");
        }
        if (string.Equals(budgetAvailability, "Budget allocated and approved", StringComparison.OrdinalIgnoreCase)
            && string.Equals(readinessToSpend, "Not planning to spend", StringComparison.OrdinalIgnoreCase))
        {
            riskFlags.Add("Budget confirmed but no initiative");
        }
        if (string.Equals(icpFit, "Clearly out of ICP", StringComparison.OrdinalIgnoreCase))
        {
            riskFlags.Add("Weak ICP fit");
        }
        if (!IsMeaningfulFactor(problemSeverity))
        {
            riskFlags.Add("Problem severity unclear");
        }

        foreach (var factor in factors)
        {
            if (factor.State == EpistemicState.Unknown || factor.State == EpistemicState.Assumed)
            {
                riskFlags.Add($"{factor.Label} needs validation");
            }
            if (factor.DecayLevel is DecayLevel.Moderate or DecayLevel.Strong)
            {
                riskFlags.Add($"{factor.Label} is stale");
            }
        }

        var dedupedFlags = riskFlags
            .Where(flag => !string.IsNullOrWhiteSpace(flag))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .Take(4)
            .ToList();

        return new QualificationInsights(
            confidence,
            confidenceLabel,
            truthCoverage,
            assumptionsOutstanding,
            weakest?.Label,
            weakest?.StateLabel,
            breakdown,
            dedupedFlags);
    }

    private sealed record QualificationInsights(
        decimal Confidence,
        string ConfidenceLabel,
        decimal TruthCoverage,
        int AssumptionsOutstanding,
        string? WeakestSignal,
        string? WeakestState,
        IReadOnlyList<LeadScoreBreakdownItem> Breakdown,
        IReadOnlyList<string> RiskFlags);

    private enum EpistemicState
    {
        Unknown,
        Assumed,
        Verified,
        Invalid
    }

    private enum DecayLevel
    {
        None,
        Light,
        Moderate,
        Strong
    }

    private sealed record EpistemicFactorInsight(
        string Label,
        EpistemicState State,
        string StateLabel,
        decimal Confidence,
        string ConfidenceLabel,
        string? Evidence,
        DateTime? ValidatedAtUtc,
        DecayLevel DecayLevel,
        bool IsHighImpact);

    private static EpistemicFactorInsight BuildFactorInsight(
        string label,
        EpistemicState state,
        string? evidence,
        DateTime? validatedAtUtc,
        bool isHighImpact)
    {
        var decayLevel = GetDecayLevel(validatedAtUtc);
        var confidence = ComputeFactorConfidence(state, evidence, decayLevel);
        var stateLabel = StateLabelFor(state);
        var confidenceLabel = ConfidenceLabelFor(confidence);
        return new EpistemicFactorInsight(
            label,
            state,
            stateLabel,
            confidence,
            confidenceLabel,
            evidence,
            validatedAtUtc,
            decayLevel,
            isHighImpact);
    }

    private static EpistemicState ResolveBudgetState(string? value) => ResolveState(value, BudgetStateMap);
    private static EpistemicState ResolveReadinessState(string? value) => ResolveState(value, ReadinessStateMap);
    private static EpistemicState ResolveTimelineState(string? value) => ResolveState(value, TimelineStateMap);
    private static EpistemicState ResolveProblemState(string? value) => ResolveState(value, ProblemStateMap);
    private static EpistemicState ResolveEconomicBuyerState(string? value) => ResolveState(value, EconomicBuyerStateMap);
    private static EpistemicState ResolveIcpFitState(string? value) => ResolveState(value, IcpFitStateMap);

    private static EpistemicState ResolveState(string? value, IReadOnlyDictionary<string, EpistemicState> map)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return EpistemicState.Unknown;
        }

        var normalized = value.Trim().ToLowerInvariant();
        if (map.TryGetValue(normalized, out var state))
        {
            return state;
        }

        return normalized.Contains("unknown", StringComparison.OrdinalIgnoreCase)
            ? EpistemicState.Unknown
            : EpistemicState.Assumed;
    }

    private static string StateLabelFor(EpistemicState state)
    {
        return state switch
        {
            EpistemicState.Verified => "Verified",
            EpistemicState.Assumed => "Assumed",
            EpistemicState.Invalid => "Invalid",
            _ => "Unknown"
        };
    }

    private static string ConfidenceLabelFor(decimal confidence)
    {
        if (confidence >= 0.75m) return "High";
        if (confidence >= 0.5m) return "Medium";
        if (confidence >= 0.2m) return "Neutral";
        return "Zero";
    }

    private static decimal ComputeFactorConfidence(EpistemicState state, string? evidence, DecayLevel decayLevel)
    {
        if (state == EpistemicState.Invalid)
        {
            return 0m;
        }

        var baseConfidence = state switch
        {
            EpistemicState.Verified => 0.8m,
            EpistemicState.Assumed => 0.55m,
            EpistemicState.Unknown => 0.4m,
            _ => 0.4m
        };

        var confidence = baseConfidence + EvidenceDelta(evidence) + DecayPenalty(decayLevel);

        if (state == EpistemicState.Verified && IsInferredEvidence(evidence))
        {
            confidence = Math.Min(confidence, 0.6m);
        }

        if (state == EpistemicState.Verified && IsNoEvidence(evidence))
        {
            confidence -= 0.05m;
        }

        return Math.Clamp(confidence, 0m, 1m);
    }

    private static decimal EvidenceDelta(string? evidence)
    {
        if (IsNoEvidence(evidence)) return -0.1m;

        var normalized = evidence!.Trim().ToLowerInvariant();
        return normalized switch
        {
            "written confirmation" => 0.2m,
            "direct buyer statement" => 0.2m,
            "observed behaviour" => 0.1m,
            "third-party confirmation" => 0.1m,
            "historical / prior deal" => -0.05m,
            "inferred from context" => -0.1m,
            _ => 0m
        };
    }

    private static bool IsNoEvidence(string? evidence)
    {
        return string.IsNullOrWhiteSpace(evidence)
               || string.Equals(evidence.Trim(), "No evidence yet", StringComparison.OrdinalIgnoreCase);
    }

    private static bool IsInferredEvidence(string? evidence)
    {
        if (string.IsNullOrWhiteSpace(evidence)) return false;
        return string.Equals(evidence.Trim(), "Inferred from context", StringComparison.OrdinalIgnoreCase);
    }

    private static DecayLevel GetDecayLevel(DateTime? validatedAtUtc)
    {
        if (!validatedAtUtc.HasValue) return DecayLevel.None;
        var days = (DateTime.UtcNow - validatedAtUtc.Value).TotalDays;
        if (days < 14) return DecayLevel.None;
        if (days < 30) return DecayLevel.Light;
        if (days < 60) return DecayLevel.Moderate;
        return DecayLevel.Strong;
    }

    private static decimal DecayPenalty(DecayLevel level)
    {
        return level switch
        {
            DecayLevel.Light => -0.05m,
            DecayLevel.Moderate => -0.1m,
            DecayLevel.Strong => -0.2m,
            _ => 0m
        };
    }

    private static readonly IReadOnlyDictionary<string, EpistemicState> BudgetStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not yet discussed"] = EpistemicState.Unknown,
        ["indicative range mentioned"] = EpistemicState.Assumed,
        ["budget allocated and approved"] = EpistemicState.Verified,
        ["budget identified but unapproved"] = EpistemicState.Assumed,
        ["no defined budget"] = EpistemicState.Invalid,
        ["budget explicitly unavailable"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> ReadinessStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / unclear"] = EpistemicState.Unknown,
        ["interest expressed, no urgency"] = EpistemicState.Assumed,
        ["actively evaluating solutions"] = EpistemicState.Assumed,
        ["internal decision in progress"] = EpistemicState.Verified,
        ["ready to proceed pending final step"] = EpistemicState.Verified,
        ["not planning to spend"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> TimelineStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not discussed"] = EpistemicState.Unknown,
        ["rough timeline mentioned"] = EpistemicState.Assumed,
        ["target date verbally confirmed"] = EpistemicState.Assumed,
        ["decision date confirmed internally"] = EpistemicState.Verified,
        ["date missed / repeatedly pushed"] = EpistemicState.Invalid,
        ["no defined timeline"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> ProblemStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not validated"] = EpistemicState.Unknown,
        ["mild inconvenience"] = EpistemicState.Assumed,
        ["recognized operational problem"] = EpistemicState.Assumed,
        ["critical business impact"] = EpistemicState.Verified,
        ["executive-level priority"] = EpistemicState.Verified,
        ["problem acknowledged but deprioritized"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> EconomicBuyerStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not identified"] = EpistemicState.Unknown,
        ["influencer identified"] = EpistemicState.Assumed,
        ["buyer identified, not engaged"] = EpistemicState.Assumed,
        ["buyer engaged in discussion"] = EpistemicState.Verified,
        ["buyer verbally supportive"] = EpistemicState.Verified,
        ["buyer explicitly not involved"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> IcpFitStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not assessed"] = EpistemicState.Unknown,
        ["partial icp fit"] = EpistemicState.Assumed,
        ["strong icp fit"] = EpistemicState.Verified,
        ["out-of-profile but exploratory"] = EpistemicState.Assumed,
        ["clearly out of icp"] = EpistemicState.Invalid
    };

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
