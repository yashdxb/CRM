namespace CRM.Enterprise.Application.Approvals;

public sealed record ApprovalWorkflowPolicy(
    bool Enabled,
    IReadOnlyList<ApprovalWorkflowStep> Steps)
{
    public static ApprovalWorkflowPolicy Disabled() => new(false, Array.Empty<ApprovalWorkflowStep>());
}

public sealed record ApprovalWorkflowStep(
    int Order,
    string ApproverRole,
    decimal? AmountThreshold,
    string? Purpose);

public static class ApprovalWorkflowPolicyDefaults
{
    public static ApprovalWorkflowPolicy FromTenantDefaults(decimal? approvalAmountThreshold, string? approvalApproverRole)
    {
        if (string.IsNullOrWhiteSpace(approvalApproverRole))
        {
            return ApprovalWorkflowPolicy.Disabled();
        }

        return new ApprovalWorkflowPolicy(
            true,
            new[]
            {
                new ApprovalWorkflowStep(1, approvalApproverRole.Trim(), approvalAmountThreshold, null)
            });
    }
}
