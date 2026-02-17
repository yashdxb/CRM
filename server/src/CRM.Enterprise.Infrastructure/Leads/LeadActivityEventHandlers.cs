using CRM.Enterprise.Application.Activities;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class LeadActivityCompletedEventHandler : INotificationHandler<ActivityCompletedEvent>
{
    private const string LeadEntityType = "Lead";
    private readonly CrmDbContext _dbContext;
    private readonly IAuditEventService _auditEvents;

    public LeadActivityCompletedEventHandler(CrmDbContext dbContext, IAuditEventService auditEvents)
    {
        _dbContext = dbContext;
        _auditEvents = auditEvents;
    }

    public async Task Handle(ActivityCompletedEvent notification, CancellationToken cancellationToken)
    {
        if (notification.RelatedEntityType != ActivityRelationType.Lead || notification.RelatedEntityId == Guid.Empty)
        {
            return;
        }

        var activity = await _dbContext.Activities
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == notification.ActivityId && !a.IsDeleted, cancellationToken);

        var lead = await _dbContext.Leads
            .Include(l => l.Status)
            .FirstOrDefaultAsync(l => l.Id == notification.RelatedEntityId && !l.IsDeleted, cancellationToken);
        if (lead is null)
        {
            return;
        }

        var updated = false;
        if (!lead.FirstTouchedAtUtc.HasValue)
        {
            lead.FirstTouchedAtUtc = notification.CompletedAtUtc;
            updated = true;
            await _auditEvents.TrackAsync(
                new AuditEventEntry(
                    LeadEntityType,
                    lead.Id,
                    "FirstTouched",
                    "FirstTouchedAtUtc",
                    null,
                    notification.CompletedAtUtc.ToString("u"),
                    notification.ChangedByUserId,
                    null),
                cancellationToken);
        }

        var statusName = lead.Status?.Name ?? string.Empty;
        if (string.Equals(statusName, "New", StringComparison.OrdinalIgnoreCase))
        {
            var contactedStatus = await ResolveLeadStatusAsync(LeadLifecycle.Contacted, cancellationToken);
            if (contactedStatus is not null && lead.LeadStatusId != contactedStatus.Id)
            {
                lead.LeadStatusId = contactedStatus.Id;
                lead.Status = contactedStatus;
                lead.UpdatedAtUtc = DateTime.UtcNow;
                _dbContext.LeadStatusHistories.Add(new LeadStatusHistory
                {
                    LeadId = lead.Id,
                    LeadStatusId = contactedStatus.Id,
                    ChangedAtUtc = DateTime.UtcNow,
                    ChangedBy = "system",
                    Notes = "Auto: Contacted (first touch)"
                });
                await _auditEvents.TrackAsync(
                    new AuditEventEntry(
                        LeadEntityType,
                        lead.Id,
                        "StatusChanged",
                        "Status",
                        statusName,
                        LeadLifecycle.Contacted,
                        notification.ChangedByUserId,
                        null),
                    cancellationToken);
                updated = true;
            }
        }

        if (!string.IsNullOrWhiteSpace(activity?.Outcome))
        {
            var outcomeStatus = ResolveOutcomeStatus(activity.Outcome);
            if (!string.IsNullOrWhiteSpace(outcomeStatus))
            {
                var targetStatus = await ResolveLeadStatusAsync(outcomeStatus, cancellationToken);
                if (targetStatus is not null && lead.LeadStatusId != targetStatus.Id)
                {
                    var previousStatus = lead.Status?.Name ?? string.Empty;
                    lead.LeadStatusId = targetStatus.Id;
                    lead.Status = targetStatus;
                    lead.UpdatedAtUtc = DateTime.UtcNow;
                    _dbContext.LeadStatusHistories.Add(new LeadStatusHistory
                    {
                        LeadId = lead.Id,
                        LeadStatusId = targetStatus.Id,
                        ChangedAtUtc = DateTime.UtcNow,
                        ChangedBy = "system",
                        Notes = $"Auto: {activity.Outcome}"
                    });
                    await _auditEvents.TrackAsync(
                        new AuditEventEntry(
                            LeadEntityType,
                            lead.Id,
                            "StatusChanged",
                            "Status",
                            previousStatus,
                            targetStatus.Name,
                            notification.ChangedByUserId,
                            null),
                        cancellationToken);
                    updated = true;
                }
            }
        }

        if (updated)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }

    private static string? ResolveOutcomeStatus(string outcome)
    {
        var normalized = outcome.Trim().ToLowerInvariant();
        if (normalized == "connected")
        {
            return LeadLifecycle.Contacted;
        }

        return null;
    }

    private async Task<LeadStatus?> ResolveLeadStatusAsync(string statusName, CancellationToken cancellationToken)
    {
        if (!LeadLifecycle.TryNormalize(statusName, out var normalized))
        {
            return null;
        }

        var existing = await _dbContext.LeadStatuses.FirstOrDefaultAsync(s => s.Name == normalized, cancellationToken);
        if (existing is not null)
        {
            return existing;
        }

        var status = new LeadStatus
        {
            Name = normalized,
            Order = LeadLifecycle.GetOrder(normalized),
            IsDefault = string.Equals(normalized, LeadLifecycle.New, StringComparison.OrdinalIgnoreCase),
            IsClosed = LeadLifecycle.IsClosed(normalized),
            CreatedAtUtc = DateTime.UtcNow
        };
        _dbContext.LeadStatuses.Add(status);
        return status;
    }
}
