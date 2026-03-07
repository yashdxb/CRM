namespace CRM.Enterprise.Api.Contracts.Workflows;

public sealed record WorkflowExecutionStatusResponse(
    Guid? CurrentExecutionId,
    int PendingApprovals,
    int RunningExecutions,
    int CompletedToday,
    DateTime? LastUpdatedAtUtc);

public sealed record WorkflowExecutionHistoryItemResponse(
    Guid ExecutionId,
    string Status,
    string TriggeredBy,
    DateTime StartedAtUtc,
    DateTime? CompletedAtUtc,
    string Summary);
