using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Application.Activities;

public sealed record ActivitySearchRequest(
    string? Status,
    string? Search,
    Guid? OwnerId,
    ActivityType? Type,
    ActivityRelationType? RelatedEntityType,
    Guid? RelatedEntityId,
    int Page,
    int PageSize);

public sealed record ActivityUpsertRequest(
    string Subject,
    string? Description,
    string? Outcome,
    ActivityType Type,
    string? Priority,
    DateTime? DueDateUtc,
    DateTime? CompletedDateUtc,
    string? NextStepSubject,
    DateTime? NextStepDueDateUtc,
    ActivityRelationType? RelatedEntityType,
    Guid? RelatedEntityId,
    Guid? OwnerId);
