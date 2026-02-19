namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantActionReviewRequest(
    string ActionId,
    string ActionType,
    string RiskTier,
    string? EntityType,
    Guid? EntityId,
    bool Approved,
    string? ReviewNote);
