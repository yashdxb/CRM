namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantInsightsAction(
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
