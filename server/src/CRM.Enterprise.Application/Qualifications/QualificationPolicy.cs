namespace CRM.Enterprise.Application.Qualifications;

public sealed record QualificationPolicy(
    int DefaultThreshold,
    int ManagerApprovalBelow,
    int BlockBelow,
    bool AllowOverrides,
    bool RequireOverrideReason,
    IReadOnlyList<QualificationThresholdRule> ThresholdRules,
    IReadOnlyList<QualificationModifierRule> Modifiers,
    IReadOnlyList<QualificationExposureWeight> ExposureWeights,
    IReadOnlyList<string> EvidenceSources);

public sealed record QualificationThresholdRule(
    string Segment,
    string DealType,
    string Stage,
    int Threshold);

public sealed record QualificationModifierRule(
    string Key,
    int Delta);

public sealed record QualificationExposureWeight(
    string Key,
    decimal Weight);

public static class QualificationPolicyDefaults
{
    private static readonly string[] DefaultEvidenceSourcesCatalog =
    [
        "No evidence yet",
        "Customer call",
        "Call notes",
        "Call recap",
        "Follow-up call notes",
        "Discovery call notes",
        "Discovery meeting notes",
        "Meeting notes",
        "Email confirmation",
        "Email from buyer",
        "Buyer email",
        "Written confirmation",
        "Chat transcript",
        "Proposal feedback",
        "Internal plan mention",
        "Ops review notes",
        "Org chart reference",
        "Account research",
        "Third-party confirmation",
        "Historical / prior deal",
        "Inferred from context"
    ];

    public static IReadOnlyList<string> DefaultEvidenceSources => DefaultEvidenceSourcesCatalog;

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
            },
            ExposureWeights: new[]
            {
                new QualificationExposureWeight("budget", 25),
                new QualificationExposureWeight("timeline", 20),
                new QualificationExposureWeight("economicBuyer", 20),
                new QualificationExposureWeight("problem", 15),
                new QualificationExposureWeight("readiness", 10),
                new QualificationExposureWeight("icpFit", 10)
            },
            EvidenceSources: DefaultEvidenceSourcesCatalog);
    }

    public static QualificationPolicy Normalize(QualificationPolicy? policy)
    {
        var baseline = CreateDefault();
        if (policy is null)
        {
            return baseline;
        }

        var thresholdRules = policy.ThresholdRules ?? Array.Empty<QualificationThresholdRule>();
        var modifiers = policy.Modifiers ?? baseline.Modifiers;
        var exposureWeights = policy.ExposureWeights ?? baseline.ExposureWeights;

        var evidenceSources = (policy.EvidenceSources ?? Array.Empty<string>())
            .Where(static value => !string.IsNullOrWhiteSpace(value))
            .Select(static value => value.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (!evidenceSources.Any(static value => string.Equals(value, "No evidence yet", StringComparison.OrdinalIgnoreCase)))
        {
            evidenceSources.Insert(0, "No evidence yet");
        }
        else
        {
            var idx = evidenceSources.FindIndex(static value => string.Equals(value, "No evidence yet", StringComparison.OrdinalIgnoreCase));
            if (idx > 0)
            {
                var sentinel = evidenceSources[idx];
                evidenceSources.RemoveAt(idx);
                evidenceSources.Insert(0, sentinel);
            }
        }

        if (evidenceSources.Count == 0)
        {
            evidenceSources = DefaultEvidenceSourcesCatalog.ToList();
        }

        return policy with
        {
            ThresholdRules = thresholdRules,
            Modifiers = modifiers,
            ExposureWeights = exposureWeights,
            EvidenceSources = evidenceSources
        };
    }
}
