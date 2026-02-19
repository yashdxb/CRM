namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantActionExecutionResponse(
    string Status,
    string Message,
    bool RequiresReview,
    Guid? CreatedActivityId,
    Guid? CreatedApprovalId);
