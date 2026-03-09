namespace CRM.Enterprise.Api.Contracts.Workspace;

using CRM.Enterprise.Application.Approvals;
using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Application.Decisions;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Qualifications;
using CRM.Enterprise.Application.Tenants;

public record UpdateWorkspaceSettingsRequest(
    string Name,
    string TimeZone,
    string Currency,
    string? IndustryPreset,
    int? LeadFirstTouchSlaHours,
    int? DefaultContractTermMonths,
    Guid? DefaultDeliveryOwnerRoleId,
    decimal? ApprovalAmountThreshold,
    string? ApprovalApproverRole,
    ApprovalWorkflowPolicy? ApprovalWorkflowPolicy,
    QualificationPolicy? QualificationPolicy,
    LeadDispositionPolicy? LeadDispositionPolicy,
    AssistantActionScoringPolicy? AssistantActionScoringPolicy,
    DecisionEscalationPolicy? DecisionEscalationPolicy,
    SupportingDocumentPolicy? SupportingDocumentPolicy,
    IReadOnlyDictionary<string, bool>? FeatureFlags = null,
    string? ReportDesignerRequiredPermission = null);

public record ApplyVerticalPresetRequest(
    string PresetId,
    bool ResetExisting = false);
