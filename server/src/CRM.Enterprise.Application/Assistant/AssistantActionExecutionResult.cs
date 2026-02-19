namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantActionExecutionResult(
    string Status,
    string Message,
    bool RequiresReview,
    Guid? CreatedActivityId,
    Guid? CreatedApprovalId);
