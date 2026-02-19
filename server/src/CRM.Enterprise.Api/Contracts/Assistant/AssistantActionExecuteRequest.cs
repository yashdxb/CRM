namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantActionExecuteRequest(
    string ActionId,
    string ActionType,
    string RiskTier,
    string? EntityType,
    Guid? EntityId,
    string? Note);
