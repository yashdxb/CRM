namespace CRM.Enterprise.Api.Contracts.Workspace;

using CRM.Enterprise.Application.Approvals;
using CRM.Enterprise.Application.Qualifications;

public record UpdateWorkspaceSettingsRequest(
    string Name,
    string TimeZone,
    string Currency,
    int? LeadFirstTouchSlaHours,
    int? DefaultContractTermMonths,
    Guid? DefaultDeliveryOwnerRoleId,
    decimal? ApprovalAmountThreshold,
    string? ApprovalApproverRole,
    ApprovalWorkflowPolicy? ApprovalWorkflowPolicy,
    QualificationPolicy? QualificationPolicy);
