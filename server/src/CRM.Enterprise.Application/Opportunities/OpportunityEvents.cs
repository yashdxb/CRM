using MediatR;

namespace CRM.Enterprise.Application.Opportunities;

public sealed record OpportunityStageChangedEvent(
    Guid OpportunityId,
    string? PreviousStage,
    string? NewStage,
    Guid? ChangedByUserId,
    DateTime OccurredAtUtc) : INotification;
