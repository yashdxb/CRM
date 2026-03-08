namespace CRM.Enterprise.Api.Contracts.Workflows;

public sealed record WorkflowExecutionStatusResponse(
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

public sealed record WorkflowExecutionHistoryItemResponse(
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
