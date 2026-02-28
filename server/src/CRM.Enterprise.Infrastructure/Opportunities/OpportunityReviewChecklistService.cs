using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityReviewChecklistService : IOpportunityReviewChecklistService
{
    private const string EntityType = "OpportunityReviewChecklist";
    private const string RiskRegisterEntityType = "OpportunityRiskRegister";
    private const string RiskRegisterOutcomeOpen = "Risk Register Open";
    private const string RiskRegisterOutcomeClosed = "Risk Register Closed";
    private readonly CrmDbContext _dbContext;
    private readonly IAuditEventService _auditEvents;

    public OpportunityReviewChecklistService(CrmDbContext dbContext, IAuditEventService auditEvents)
    {
        _dbContext = dbContext;
        _auditEvents = auditEvents;
    }

    public async Task<IReadOnlyList<OpportunityReviewChecklistItemDto>?> GetAsync(Guid opportunityId, string? type, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Opportunities
            .AsNoTracking()
            .AnyAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (!exists)
        {
            return null;
        }

        var query = _dbContext.OpportunityReviewChecklistItems
            .AsNoTracking()
            .Where(i => !i.IsDeleted && i.OpportunityId == opportunityId);

        if (!string.IsNullOrWhiteSpace(type))
        {
            query = query.Where(i => i.Type == type);
        }

        var items = await query
            .OrderBy(i => i.CreatedAtUtc)
            .Select(i => new OpportunityReviewChecklistItemDto(
                i.Id,
                i.OpportunityId,
                i.Type,
                i.Title,
                i.Status,
                i.Notes,
                i.CompletedAtUtc))
            .ToListAsync(cancellationToken);

        return items;
    }

    public async Task<OpportunityReviewChecklistItemDto?> CreateAsync(
        Guid opportunityId,
        OpportunityReviewChecklistCreateRequest request,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            return null;
        }

        var lockViolation = await OpportunityApprovalLockPolicy.GetLockViolationAsync(
            _dbContext,
            opportunityId,
            actor.UserId,
            cancellationToken);
        if (lockViolation is not null)
        {
            throw new InvalidOperationException(lockViolation);
        }

        var type = NormalizeType(request.Type);
        var title = request.Title?.Trim() ?? string.Empty;
        if (string.IsNullOrWhiteSpace(title))
        {
            return null;
        }

        var status = string.IsNullOrWhiteSpace(request.Status) ? "Pending" : request.Status.Trim();
        var now = DateTime.UtcNow;
        var item = new OpportunityReviewChecklistItem
        {
            OpportunityId = opportunityId,
            Type = type,
            Title = title,
            Status = status,
            Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim(),
            CompletedAtUtc = IsChecklistResolved(status) ? DateTime.UtcNow : null,
            CreatedAtUtc = now
        };

        _dbContext.OpportunityReviewChecklistItems.Add(item);
        await SyncRiskRegisterAsync(item, opportunity.OwnerId, actor, now, cancellationToken);
        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                item.Id,
                "Created",
                null,
                null,
                null,
                actor.UserId,
                actor.UserName),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new OpportunityReviewChecklistItemDto(
            item.Id,
            item.OpportunityId,
            item.Type,
            item.Title,
            item.Status,
            item.Notes,
            item.CompletedAtUtc);
    }

    public async Task<OpportunityReviewChecklistItemDto?> UpdateAsync(
        Guid itemId,
        OpportunityReviewChecklistUpdateRequest request,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var item = await _dbContext.OpportunityReviewChecklistItems
            .FirstOrDefaultAsync(i => i.Id == itemId && !i.IsDeleted, cancellationToken);
        if (item is null)
        {
            return null;
        }

        var lockViolation = await OpportunityApprovalLockPolicy.GetLockViolationAsync(
            _dbContext,
            item.OpportunityId,
            actor.UserId,
            cancellationToken);
        if (lockViolation is not null)
        {
            throw new InvalidOperationException(lockViolation);
        }

        if (request.Title is not null)
        {
            item.Title = request.Title.Trim();
        }

        if (request.Status is not null)
        {
            item.Status = request.Status.Trim();
            item.CompletedAtUtc = IsChecklistResolved(item.Status)
                ? DateTime.UtcNow
                : null;
        }

        if (request.Notes is not null)
        {
            item.Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim();
        }

        item.UpdatedAtUtc = DateTime.UtcNow;
        var opportunityOwnerId = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => o.Id == item.OpportunityId && !o.IsDeleted)
            .Select(o => o.OwnerId)
            .FirstOrDefaultAsync(cancellationToken);
        if (opportunityOwnerId != Guid.Empty)
        {
            await SyncRiskRegisterAsync(item, opportunityOwnerId, actor, item.UpdatedAtUtc.Value, cancellationToken);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                item.Id,
                "Updated",
                null,
                null,
                null,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new OpportunityReviewChecklistItemDto(
            item.Id,
            item.OpportunityId,
            item.Type,
            item.Title,
            item.Status,
            item.Notes,
            item.CompletedAtUtc);
    }

    public async Task<bool> DeleteAsync(Guid itemId, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var item = await _dbContext.OpportunityReviewChecklistItems
            .FirstOrDefaultAsync(i => i.Id == itemId && !i.IsDeleted, cancellationToken);
        if (item is null)
        {
            return false;
        }

        var lockViolation = await OpportunityApprovalLockPolicy.GetLockViolationAsync(
            _dbContext,
            item.OpportunityId,
            actor.UserId,
            cancellationToken);
        if (lockViolation is not null)
        {
            throw new InvalidOperationException(lockViolation);
        }

        item.IsDeleted = true;
        item.DeletedAtUtc = DateTime.UtcNow;

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                item.Id,
                "Deleted",
                null,
                null,
                null,
                actor.UserId,
                actor.UserName),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static string NormalizeType(string? type)
    {
        if (string.Equals(type, "Legal", StringComparison.OrdinalIgnoreCase))
        {
            return "Legal";
        }
        if (string.Equals(type, "Technical", StringComparison.OrdinalIgnoreCase))
        {
            return "Technical";
        }
        return "Security";
    }

    private async Task SyncRiskRegisterAsync(
        OpportunityReviewChecklistItem item,
        Guid ownerId,
        ActorContext actor,
        DateTime now,
        CancellationToken cancellationToken)
    {
        var externalReference = BuildRiskExternalReference(item.Id);
        var linkedRisk = await _dbContext.Activities
            .FirstOrDefaultAsync(a =>
                    !a.IsDeleted
                    && a.RelatedEntityType == ActivityRelationType.Opportunity
                    && a.RelatedEntityId == item.OpportunityId
                    && a.ExternalReference == externalReference,
                cancellationToken);

        if (IsChecklistFailure(item.Status))
        {
            if (linkedRisk is null)
            {
                linkedRisk = new Activity
                {
                    Subject = BuildRiskSubject(item.Type, item.Title),
                    Description = BuildRiskDescription(item, isClosed: false),
                    Outcome = RiskRegisterOutcomeOpen,
                    Type = ActivityType.Task,
                    RelatedEntityType = ActivityRelationType.Opportunity,
                    RelatedEntityId = item.OpportunityId,
                    OwnerId = ownerId,
                    Priority = "High",
                    DueDateUtc = now.AddDays(7),
                    ExternalReference = externalReference,
                    CreatedAtUtc = now
                };
                _dbContext.Activities.Add(linkedRisk);
            }
            else
            {
                linkedRisk.Subject = BuildRiskSubject(item.Type, item.Title);
                linkedRisk.Description = BuildRiskDescription(item, isClosed: false);
                linkedRisk.Outcome = RiskRegisterOutcomeOpen;
                linkedRisk.CompletedDateUtc = null;
                linkedRisk.OwnerId = ownerId;
                linkedRisk.UpdatedAtUtc = now;
            }

            await _auditEvents.TrackAsync(
                new AuditEventEntry(
                    RiskRegisterEntityType,
                    linkedRisk.Id,
                    "Upserted",
                    null,
                    null,
                    null,
                    actor.UserId,
                    actor.UserName),
                cancellationToken);
            return;
        }

        if (linkedRisk is null)
        {
            return;
        }

        if (IsChecklistResolved(item.Status))
        {
            if (string.IsNullOrWhiteSpace(item.Notes))
            {
                throw new InvalidOperationException("Checklist evidence is required before closing a linked risk.");
            }

            linkedRisk.Description = BuildRiskDescription(item, isClosed: true);
            linkedRisk.Outcome = RiskRegisterOutcomeClosed;
            linkedRisk.CompletedDateUtc = now;
            linkedRisk.UpdatedAtUtc = now;
            await _auditEvents.TrackAsync(
                new AuditEventEntry(
                    RiskRegisterEntityType,
                    linkedRisk.Id,
                    "Closed",
                    null,
                    null,
                    null,
                    actor.UserId,
                    actor.UserName),
                cancellationToken);
            return;
        }

        linkedRisk.Description = BuildRiskDescription(item, isClosed: false);
        linkedRisk.Outcome = RiskRegisterOutcomeOpen;
        linkedRisk.CompletedDateUtc = null;
        linkedRisk.UpdatedAtUtc = now;
        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                RiskRegisterEntityType,
                linkedRisk.Id,
                "Updated",
                null,
                null,
                null,
                actor.UserId,
                actor.UserName),
            cancellationToken);
    }

    private static bool IsChecklistFailure(string? status)
        => string.Equals(status?.Trim(), "Blocked", StringComparison.OrdinalIgnoreCase);

    private static bool IsChecklistResolved(string? status)
        => string.Equals(status?.Trim(), "Approved", StringComparison.OrdinalIgnoreCase)
           || string.Equals(status?.Trim(), "Completed", StringComparison.OrdinalIgnoreCase);

    private static string BuildRiskExternalReference(Guid checklistItemId)
        => $"opportunity-checklist-risk:{checklistItemId}";

    private static string BuildRiskSubject(string type, string title)
        => $"Risk: {type} checklist - {title}";

    private static string BuildRiskDescription(OpportunityReviewChecklistItem item, bool isClosed)
    {
        var status = item.Status?.Trim() ?? "Pending";
        var evidence = string.IsNullOrWhiteSpace(item.Notes) ? "Not provided" : item.Notes.Trim();
        return isClosed
            ? $"Closed from checklist. Type={item.Type}; Status={status}; Evidence={evidence}"
            : $"Linked from checklist failure. Type={item.Type}; Status={status}; Evidence={evidence}";
    }
}
