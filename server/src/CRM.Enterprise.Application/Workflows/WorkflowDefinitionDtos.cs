namespace CRM.Enterprise.Application.Workflows;

public sealed record WorkflowDefinitionDto(
    string Key,
    string Name,
    bool IsActive,
    string DefinitionJson,
    DateTime? UpdatedAtUtc,
    string? PublishedDefinitionJson,
    DateTime? PublishedAtUtc,
    string? PublishedBy);

public sealed record WorkflowValidationResultDto(
    bool IsValid,
    IReadOnlyList<string> Errors);

public sealed record WorkflowExecutionStatusDto(
    Guid? CurrentExecutionId,
    int PendingApprovals,
    int RunningExecutions,
    int CompletedToday,
    DateTime? LastUpdatedAtUtc,
    Guid? CurrentOpportunityId,
    string? CurrentOpportunityName,
    string? CurrentPurpose,
    int? CurrentStepOrder,
    int? CurrentTotalSteps,
    string? CurrentPendingApproverRole,
    string? CurrentPendingApproverName,
    Guid? CurrentDecisionRequestId,
    string? CurrentDecisionStatus);

public sealed record WorkflowExecutionHistoryItemDto(
    Guid ExecutionId,
    Guid OpportunityId,
    string OpportunityName,
    string WorkflowName,
    int WorkflowVersion,
    string Purpose,
    string Status,
    string TriggeredBy,
    int CurrentStepOrder,
    int TotalSteps,
    string? PendingApproverRole,
    string? PendingApproverName,
    Guid? DecisionRequestId,
    string? DecisionStatus,
    DateTime StartedAtUtc,
    DateTime? CompletedAtUtc,
    string Summary);
