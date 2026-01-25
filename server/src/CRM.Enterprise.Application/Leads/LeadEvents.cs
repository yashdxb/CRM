using MediatR;

namespace CRM.Enterprise.Application.Leads;

public sealed record LeadQualifiedEvent(
    Guid LeadId,
    Guid OwnerId,
    Guid? ChangedByUserId,
    DateTime OccurredAtUtc) : INotification;

public sealed record LeadConvertedEvent(
    Guid LeadId,
    Guid? AccountId,
    Guid? ContactId,
    Guid? OpportunityId,
    Guid OwnerId,
    Guid? ChangedByUserId,
    DateTime OccurredAtUtc) : INotification;

public sealed record LeadOwnerChangedEvent(
    Guid LeadId,
    Guid PreviousOwnerId,
    Guid NewOwnerId,
    Guid? ChangedByUserId,
    DateTime OccurredAtUtc) : INotification;
