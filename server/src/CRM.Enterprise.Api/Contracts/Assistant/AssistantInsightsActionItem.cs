namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantInsightsActionItem(
    string Id,
    string Title,
    string Description,
    int Score,
    string RiskTier,
    string Urgency,
    string OwnerScope,
    string DueWindow,
    string ActionType,
    string? EntityType,
    Guid? EntityId,
    int Priority,
    IReadOnlyList<string> Reasons,
    IReadOnlyList<string> Entities,
    string ImpactEstimate,
    string ReviewGuidance);
