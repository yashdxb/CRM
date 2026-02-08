using System;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityStageChangedEventHandler : INotificationHandler<OpportunityStageChangedEvent>
{
    private const string OpportunityEntityType = "Opportunity";
    private readonly IAuditEventService _auditEvents;
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public OpportunityStageChangedEventHandler(
        IAuditEventService auditEvents,
        CrmDbContext dbContext,
        ITenantProvider tenantProvider)
    {
        _auditEvents = auditEvents;
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    public async Task Handle(OpportunityStageChangedEvent notification, CancellationToken cancellationToken)
    {
        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                OpportunityEntityType,
                notification.OpportunityId,
                "EventEmitted",
                "OpportunityStageChanged",
                notification.PreviousStage,
                notification.NewStage,
                notification.ChangedByUserId,
                null),
            cancellationToken);

        await CreateAutomationTasksAsync(notification, cancellationToken);
    }

    private async Task CreateAutomationTasksAsync(OpportunityStageChangedEvent notification, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return;
        }

        var stageName = notification.NewStage?.Trim();
        if (string.IsNullOrWhiteSpace(stageName))
        {
            return;
        }

        var rules = await _dbContext.OpportunityStageAutomationRules
            .AsNoTracking()
            .Where(rule => !rule.IsDeleted && rule.IsActive && rule.TenantId == tenantId)
            .ToListAsync(cancellationToken);

        rules = rules
            .Where(rule => string.Equals(rule.StageName, "Any", StringComparison.OrdinalIgnoreCase)
                           || string.Equals(rule.StageName, stageName, StringComparison.OrdinalIgnoreCase))
            .ToList();

        if (rules.Count == 0)
        {
            return;
        }

        var opportunity = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => o.Id == notification.OpportunityId)
            .Select(o => new { o.Id, o.Name, o.OwnerId })
            .FirstOrDefaultAsync(cancellationToken);

        if (opportunity is null)
        {
            return;
        }

        var ruleIds = rules.Select(r => r.Id.ToString()).ToList();
        var existingReferences = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Opportunity
                        && a.RelatedEntityId == notification.OpportunityId
                        && a.ExternalReference != null
                        && ruleIds.Contains(a.ExternalReference))
            .Select(a => a.ExternalReference!)
            .ToListAsync(cancellationToken);

        foreach (var rule in rules)
        {
            if (existingReferences.Contains(rule.Id.ToString()))
            {
                continue;
            }

            var subject = rule.TaskSubject.Replace("{Opportunity}", opportunity.Name ?? "Opportunity");
            var description = string.IsNullOrWhiteSpace(rule.TaskDescription)
                ? $"Auto task from rule \"{rule.Name}\" on stage {stageName}."
                : rule.TaskDescription.Replace("{Opportunity}", opportunity.Name ?? "Opportunity");
            var dueDateUtc = DateTime.UtcNow.AddDays(Math.Max(0, rule.DueInDays));

            _dbContext.Activities.Add(new Activity
            {
                Subject = subject,
                Description = description,
                Type = ActivityType.Task,
                RelatedEntityType = ActivityRelationType.Opportunity,
                RelatedEntityId = opportunity.Id,
                OwnerId = opportunity.OwnerId,
                DueDateUtc = dueDateUtc,
                Priority = string.IsNullOrWhiteSpace(rule.Priority) ? "Medium" : rule.Priority,
                ExternalReference = rule.Id.ToString(),
                CreatedAtUtc = DateTime.UtcNow
            });
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
