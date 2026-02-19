namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantActionExecutionRequest(
    string ActionId,
    string ActionType,
    string RiskTier,
    string? EntityType,
    Guid? EntityId,
    string? Note);
