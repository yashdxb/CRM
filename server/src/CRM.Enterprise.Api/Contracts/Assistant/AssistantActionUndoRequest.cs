namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantActionUndoRequest(
    Guid CreatedActivityId,
    string? ActionType);
