namespace CRM.Enterprise.Api.Contracts.Workspace;

public record WorkspaceSettingsResponse(
    Guid Id,
    string Key,
    string Name,
    string TimeZone,
    string Currency,
    decimal? ApprovalAmountThreshold,
    string? ApprovalApproverRole);
