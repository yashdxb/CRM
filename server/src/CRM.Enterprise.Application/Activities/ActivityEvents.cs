using CRM.Enterprise.Domain.Enums;
using MediatR;

namespace CRM.Enterprise.Application.Activities;

public sealed record ActivityCompletedEvent(
    Guid ActivityId,
    ActivityRelationType RelatedEntityType,
    Guid RelatedEntityId,
    Guid OwnerId,
    DateTime CompletedAtUtc,
    Guid? ChangedByUserId,
    DateTime OccurredAtUtc) : INotification;
