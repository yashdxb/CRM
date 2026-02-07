namespace CRM.Enterprise.Application.Qualifications;

public sealed record QualificationPolicy(
    int DefaultThreshold,
    int ManagerApprovalBelow,
    int BlockBelow,
    bool AllowOverrides,
    bool RequireOverrideReason,
    IReadOnlyList<QualificationThresholdRule> ThresholdRules,
    IReadOnlyList<QualificationModifierRule> Modifiers);

public sealed record QualificationThresholdRule(
    string Segment,
    string DealType,
    string Stage,
    int Threshold);

public sealed record QualificationModifierRule(
    string Key,
    int Delta);

public static class QualificationPolicyDefaults
{
    public static QualificationPolicy CreateDefault()
    {
        return new QualificationPolicy(
            DefaultThreshold: 75,
            ManagerApprovalBelow: 50,
            BlockBelow: 25,
            AllowOverrides: true,
            RequireOverrideReason: true,
            ThresholdRules: Array.Empty<QualificationThresholdRule>(),
            Modifiers: new[]
            {
                new QualificationModifierRule("competitive", 10),
                new QualificationModifierRule("executiveChampion", -15),
                new QualificationModifierRule("strategic", -15),
                new QualificationModifierRule("fastVelocity", -10),
                new QualificationModifierRule("slowVelocity", 10)
            });
    }
}
