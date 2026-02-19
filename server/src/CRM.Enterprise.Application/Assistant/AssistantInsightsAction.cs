namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantInsightsAction(
    string Id,
    string Title,
    string Description,
    string OwnerScope,
    string DueWindow,
    string ActionType,
    string? EntityType,
    Guid? EntityId,
    int Priority);
