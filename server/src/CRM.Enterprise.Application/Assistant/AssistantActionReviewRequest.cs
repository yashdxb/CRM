namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantActionReviewRequest(
    string ActionId,
    string ActionType,
    string RiskTier,
    string? EntityType,
    Guid? EntityId,
    bool Approved,
    string? ReviewNote);
