using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Api.Contracts.Agents;

public record AgentActivityItem(
    Guid Id,
    string Subject,
    ActivityType Type,
    DateTime? DueDateUtc,
    DateTime? CompletedDateUtc,
    ActivityRelationType RelatedEntityType,
    Guid RelatedEntityId,
    string? OwnerName,
    string? Outcome);
