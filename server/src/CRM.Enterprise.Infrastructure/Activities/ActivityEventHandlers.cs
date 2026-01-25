using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Activities;
using MediatR;

namespace CRM.Enterprise.Infrastructure.Activities;

public sealed class ActivityCompletedEventHandler : INotificationHandler<ActivityCompletedEvent>
{
    private const string ActivityEntityType = "Activity";
    private readonly IAuditEventService _auditEvents;

    public ActivityCompletedEventHandler(IAuditEventService auditEvents)
    {
        _auditEvents = auditEvents;
    }

    public Task Handle(ActivityCompletedEvent notification, CancellationToken cancellationToken)
    {
        var details = $"RelatedEntityType={notification.RelatedEntityType};RelatedEntityId={notification.RelatedEntityId}";
        return _auditEvents.TrackAsync(
            new AuditEventEntry(
                ActivityEntityType,
                notification.ActivityId,
                "EventEmitted",
                "ActivityCompleted",
                notification.CompletedAtUtc.ToString("u"),
                details,
                notification.ChangedByUserId,
                null),
            cancellationToken);
    }
}
