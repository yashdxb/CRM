namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantActionUndoRequest(
    Guid CreatedActivityId,
    string? ActionType);
