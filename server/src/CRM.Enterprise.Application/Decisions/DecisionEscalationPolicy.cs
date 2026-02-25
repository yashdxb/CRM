namespace CRM.Enterprise.Application.Decisions;

public sealed record DecisionEscalationPolicy(
    bool Enabled,
    bool SendEmailNotifications,
    bool NotifyCurrentAssignee,
    bool NotifyPendingStepRole,
    string FallbackRoleName)
{
    public static DecisionEscalationPolicy CreateDefault() =>
        new(
            Enabled: true,
            SendEmailNotifications: true,
            NotifyCurrentAssignee: true,
            NotifyPendingStepRole: true,
            FallbackRoleName: "Sales Manager");
}

public static class DecisionEscalationPolicyDefaults
{
    public static DecisionEscalationPolicy CreateDefault() => DecisionEscalationPolicy.CreateDefault();

    public static DecisionEscalationPolicy Normalize(DecisionEscalationPolicy? policy)
    {
        var fallback = CreateDefault();
        if (policy is null)
        {
            return fallback;
        }

        return new DecisionEscalationPolicy(
            policy.Enabled,
            policy.SendEmailNotifications,
            policy.NotifyCurrentAssignee,
            policy.NotifyPendingStepRole,
            string.IsNullOrWhiteSpace(policy.FallbackRoleName) ? fallback.FallbackRoleName : policy.FallbackRoleName.Trim());
    }
}
