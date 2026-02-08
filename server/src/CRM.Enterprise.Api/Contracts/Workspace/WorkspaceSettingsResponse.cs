namespace CRM.Enterprise.Api.Contracts.Workspace;

using CRM.Enterprise.Application.Approvals;
using CRM.Enterprise.Application.Qualifications;

public record WorkspaceSettingsResponse(
    Guid Id,
    string Key,
    string Name,
    string TimeZone,
    string Currency,
    decimal? ApprovalAmountThreshold,
    string? ApprovalApproverRole,
    ApprovalWorkflowPolicy ApprovalWorkflowPolicy,
    QualificationPolicy QualificationPolicy);
