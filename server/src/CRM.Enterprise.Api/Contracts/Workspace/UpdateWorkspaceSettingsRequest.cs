namespace CRM.Enterprise.Api.Contracts.Workspace;

public record UpdateWorkspaceSettingsRequest(
    string Name,
    string TimeZone,
    string Currency,
    decimal? ApprovalAmountThreshold,
    string? ApprovalApproverRole);
