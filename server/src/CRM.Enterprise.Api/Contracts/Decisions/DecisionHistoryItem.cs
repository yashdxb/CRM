namespace CRM.Enterprise.Api.Contracts.Decisions;

public sealed record DecisionHistoryItem(
    Guid ActionLogId,
    Guid DecisionId,
    string Action,
    DateTime ActionAtUtc,
    string? ActorName,
    Guid? ActorUserId,
    string DecisionType,
    string WorkflowType,
    string EntityType,
    Guid EntityId,
    string EntityName,
    string Status,
    string? Priority,
    string? RiskLevel,
    string? Notes,
    string? PolicyReason,
    bool IsEscalated);
