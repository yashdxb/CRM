using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Activities;
using MediatR;
using System.Collections.Generic;

namespace CRM.Enterprise.Infrastructure.Activities;

public sealed class ActivityCompletedEventHandler : INotificationHandler<ActivityCompletedEvent>
{
    private const string ActivityEntityType = "Activity";
    private const string OpportunityEntityType = "Opportunity";
    private readonly IAuditEventService _auditEvents;

    public ActivityCompletedEventHandler(IAuditEventService auditEvents)
    {
        _auditEvents = auditEvents;
    }

    public Task Handle(ActivityCompletedEvent notification, CancellationToken cancellationToken)
    {
        var details = $"RelatedEntityType={notification.RelatedEntityType};RelatedEntityId={notification.RelatedEntityId}";
        var tasks = new List<Task>
        {
            _auditEvents.TrackAsync(
                new AuditEventEntry(
                    ActivityEntityType,
                    notification.ActivityId,
                    "EventEmitted",
                    "ActivityCompleted",
                    notification.CompletedAtUtc.ToString("u"),
                    details,
                    notification.ChangedByUserId,
                    null),
                cancellationToken)
        };

        if (notification.RelatedEntityType == CRM.Enterprise.Domain.Enums.ActivityRelationType.Opportunity
            && notification.RelatedEntityId != Guid.Empty)
        {
            tasks.Add(_auditEvents.TrackAsync(
                new AuditEventEntry(
                    OpportunityEntityType,
                    notification.RelatedEntityId,
                    "ActivityCompleted",
                    "LastActivityAtUtc",
                    null,
                    notification.CompletedAtUtc.ToString("u"),
                    notification.ChangedByUserId,
                    null),
                cancellationToken));
        }

        return Task.WhenAll(tasks);
    }
}
