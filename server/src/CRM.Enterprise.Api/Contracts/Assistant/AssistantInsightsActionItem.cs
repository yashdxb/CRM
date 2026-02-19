namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantInsightsActionItem(
    string Id,
    string Title,
    string Description,
    string OwnerScope,
    string DueWindow,
    string ActionType,
    string? EntityType,
    Guid? EntityId,
    int Priority);
