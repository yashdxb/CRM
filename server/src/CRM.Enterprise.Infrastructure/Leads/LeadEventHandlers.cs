using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Leads;
using MediatR;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class LeadQualifiedEventHandler : INotificationHandler<LeadQualifiedEvent>
{
    private const string LeadEntityType = "Lead";
    private readonly IAuditEventService _auditEvents;

    public LeadQualifiedEventHandler(IAuditEventService auditEvents)
    {
        _auditEvents = auditEvents;
    }

    public Task Handle(LeadQualifiedEvent notification, CancellationToken cancellationToken)
    {
        return _auditEvents.TrackAsync(
            new AuditEventEntry(
                LeadEntityType,
                notification.LeadId,
                "EventEmitted",
                "LeadQualified",
                null,
                null,
                notification.ChangedByUserId,
                null),
            cancellationToken);
    }
}

public sealed class LeadConvertedEventHandler : INotificationHandler<LeadConvertedEvent>
{
    private const string LeadEntityType = "Lead";
    private readonly IAuditEventService _auditEvents;

    public LeadConvertedEventHandler(IAuditEventService auditEvents)
    {
        _auditEvents = auditEvents;
    }

    public Task Handle(LeadConvertedEvent notification, CancellationToken cancellationToken)
    {
        var details = $"AccountId={notification.AccountId};ContactId={notification.ContactId};OpportunityId={notification.OpportunityId}";
        return _auditEvents.TrackAsync(
            new AuditEventEntry(
                LeadEntityType,
                notification.LeadId,
                "EventEmitted",
                "LeadConverted",
                null,
                details,
                notification.ChangedByUserId,
                null),
            cancellationToken);
    }
}

public sealed class LeadOwnerChangedEventHandler : INotificationHandler<LeadOwnerChangedEvent>
{
    private const string LeadEntityType = "Lead";
    private readonly IAuditEventService _auditEvents;

    public LeadOwnerChangedEventHandler(IAuditEventService auditEvents)
    {
        _auditEvents = auditEvents;
    }

    public Task Handle(LeadOwnerChangedEvent notification, CancellationToken cancellationToken)
    {
        return _auditEvents.TrackAsync(
            new AuditEventEntry(
                LeadEntityType,
                notification.LeadId,
                "EventEmitted",
                "LeadOwnerChanged",
                notification.PreviousOwnerId.ToString(),
                notification.NewOwnerId.ToString(),
                notification.ChangedByUserId,
                null),
            cancellationToken);
    }
}
