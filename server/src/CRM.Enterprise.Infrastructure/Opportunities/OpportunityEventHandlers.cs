using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Opportunities;
using MediatR;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityStageChangedEventHandler : INotificationHandler<OpportunityStageChangedEvent>
{
    private const string OpportunityEntityType = "Opportunity";
    private readonly IAuditEventService _auditEvents;

    public OpportunityStageChangedEventHandler(IAuditEventService auditEvents)
    {
        _auditEvents = auditEvents;
    }

    public Task Handle(OpportunityStageChangedEvent notification, CancellationToken cancellationToken)
    {
        return _auditEvents.TrackAsync(
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
    }
}
