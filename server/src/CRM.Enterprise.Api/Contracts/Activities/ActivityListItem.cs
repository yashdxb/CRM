using System;

namespace CRM.Enterprise.Api.Contracts.Activities;

public record ActivityListItem(
    Guid Id,
    string Subject,
    string Type,
    string? Description,
    string? Outcome,
    string? TemplateKey,
    string? Priority,
    Guid? RelatedEntityId,
    string? RelatedEntityName,
    string? RelatedEntityType,
    DateTime? DueDateUtc,
    DateTime? CompletedDateUtc,
    string Status,
    Guid? OwnerId,
    string? OwnerName,
    DateTime CreatedAtUtc);
