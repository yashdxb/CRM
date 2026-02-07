using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Application.Activities;

public sealed record ActivityListItemDto(
    Guid Id,
    string Subject,
    string Type,
    string? Description,
    string? Outcome,
    string? NextStepSubject,
    DateTime? NextStepDueDateUtc,
    string? TemplateKey,
    string? Priority,
    Guid? RelatedEntityId,
    string RelatedEntityName,
    string RelatedEntityType,
    DateTime? DueDateUtc,
    DateTime? CompletedDateUtc,
    string Status,
    Guid? OwnerId,
    string? OwnerName,
    DateTime CreatedAtUtc);

public sealed record ActivitySearchResultDto(IReadOnlyList<ActivityListItemDto> Items, int Total);

public sealed record ActivityAuditEventDto(
    Guid Id,
    string EntityType,
    Guid EntityId,
    string Action,
    string? Field,
    string? OldValue,
    string? NewValue,
    Guid? ChangedByUserId,
    string? ChangedByName,
    DateTime CreatedAtUtc);

public sealed record ActivityOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static ActivityOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static ActivityOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static ActivityOperationResult<T> NotFoundResult() => new(false, default, null, true);
}
