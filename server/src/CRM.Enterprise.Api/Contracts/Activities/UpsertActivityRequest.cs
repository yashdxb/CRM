using System;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Api.Contracts.Activities;

public record UpsertActivityRequest(
    string Subject,
    string? Description,
    ActivityType Type,
    string? Priority,
    DateTime? DueDateUtc,
    DateTime? CompletedDateUtc,
    ActivityRelationType? RelatedEntityType,
    Guid? RelatedEntityId,
    Guid? OwnerId);
