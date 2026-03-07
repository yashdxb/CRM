namespace CRM.Enterprise.Application.Workflows;

public sealed record WorkflowDefinitionDto(
    string Key,
    string Name,
    bool IsActive,
    string DefinitionJson,
    DateTime? UpdatedAtUtc);

public sealed record WorkflowValidationResultDto(
    bool IsValid,
    IReadOnlyList<string> Errors);

public sealed record WorkflowExecutionStatusDto(
    Guid? CurrentExecutionId,
    int PendingApprovals,
    int RunningExecutions,
    int CompletedToday,
    DateTime? LastUpdatedAtUtc);

public sealed record WorkflowExecutionHistoryItemDto(
    Guid ExecutionId,
    string Status,
    string TriggeredBy,
    DateTime StartedAtUtc,
    DateTime? CompletedAtUtc,
    string Summary);
