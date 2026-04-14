namespace CRM.Enterprise.Application.Qualifications;

public sealed record QualificationPolicy(
    int DefaultThreshold,
    int ManagerApprovalBelow,
    int BlockBelow,
    bool AllowOverrides,
    bool RequireOverrideReason,
    bool ShowCqvsInLeadList,
    bool RequireEvidenceBeforeQualified,
    int MinimumEvidenceCoveragePercent,
    IReadOnlyList<QualificationFactorDefinition> Factors,
    IReadOnlyList<QualificationFactorEvidenceRule> FactorEvidenceRules,
    IReadOnlyList<QualificationThresholdRule> ThresholdRules,
    IReadOnlyList<QualificationModifierRule> Modifiers,
    IReadOnlyList<QualificationExposureWeight> ExposureWeights,
    IReadOnlyList<QualificationLeadDataWeight> LeadDataWeights,
    IReadOnlyList<string> EvidenceSources,
    QualificationLifecycleScoreWeights? LifecycleScoreWeights = null);

public sealed record QualificationLifecycleScoreWeights(
    decimal QualificationWeight,
    decimal LeadDataQualityWeight,
    decimal ConversationWeight,
    decimal HistoryWeight);

public sealed record QualificationFactorDefinition(
    string Key,
    string DisplayLabel,
    bool IsActive,
    bool IsRequired,
    int Order,
    string FactorType,
    string ValueType,
    bool IncludeInScore,
    IReadOnlyList<string> Options);

public static class QualificationFactorTypes
{
    public const string System = "system";
    public const string Custom = "custom";
}

public static class QualificationFactorValueTypes
{
    public const string SingleSelect = "singleSelect";
    public const string Text = "text";
}

public sealed record QualificationFactorEvidenceRule(
    string FactorKey,
    bool RequireEvidence,
    IReadOnlyList<string> AllowedEvidenceSources);

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

public sealed record QualificationLeadDataWeight(
    string Key,
    decimal Weight);

public static class QualificationPolicyDefaults
{
    private static readonly QualificationFactorDefinition[] DefaultFactorsCatalog =
    [
        new("budget", "Budget availability", true, true, 10, QualificationFactorTypes.System, QualificationFactorValueTypes.SingleSelect, true, Array.Empty<string>()),
        new("readiness", "Readiness to spend", true, false, 20, QualificationFactorTypes.System, QualificationFactorValueTypes.SingleSelect, true, Array.Empty<string>()),
        new("timeline", "Buying timeline", true, true, 30, QualificationFactorTypes.System, QualificationFactorValueTypes.SingleSelect, true, Array.Empty<string>()),
        new("problem", "Problem severity", true, true, 40, QualificationFactorTypes.System, QualificationFactorValueTypes.SingleSelect, true, Array.Empty<string>()),
        new("economicBuyer", "Economic buyer", true, true, 50, QualificationFactorTypes.System, QualificationFactorValueTypes.SingleSelect, true, Array.Empty<string>()),
        new("icpFit", "ICP fit", true, false, 60, QualificationFactorTypes.System, QualificationFactorValueTypes.SingleSelect, true, Array.Empty<string>())
    ];

    private static readonly string[] LeadDataWeightKeys =
    [
        "firstNameLastName",
        "email",
        "phone",
        "companyName",
        "jobTitle",
        "source"
    ];

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
            ShowCqvsInLeadList: false,
            RequireEvidenceBeforeQualified: true,
            MinimumEvidenceCoveragePercent: 50,
            Factors: DefaultFactorsCatalog,
            FactorEvidenceRules: CreateDefaultFactorEvidenceRules(DefaultEvidenceSourcesCatalog),
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
            LeadDataWeights: new[]
            {
                new QualificationLeadDataWeight("firstNameLastName", 16),
                new QualificationLeadDataWeight("email", 24),
                new QualificationLeadDataWeight("phone", 24),
                new QualificationLeadDataWeight("companyName", 16),
                new QualificationLeadDataWeight("jobTitle", 12),
                new QualificationLeadDataWeight("source", 8)
            },
            EvidenceSources: DefaultEvidenceSourcesCatalog,
            LifecycleScoreWeights: new QualificationLifecycleScoreWeights(50m, 20m, 20m, 10m));
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
        var leadDataWeights = NormalizeLeadDataWeights(policy.LeadDataWeights, baseline.LeadDataWeights);
        var lifecycleScoreWeights = NormalizeLifecycleScoreWeights(policy.LifecycleScoreWeights, baseline.LifecycleScoreWeights);

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

        var factors = NormalizeFactors(policy.Factors, baseline.Factors);
        var factorEvidenceRules = NormalizeFactorEvidenceRules(policy.FactorEvidenceRules, factors, evidenceSources, baseline.FactorEvidenceRules);

        return policy with
        {
            RequireEvidenceBeforeQualified = policy.RequireEvidenceBeforeQualified,
            MinimumEvidenceCoveragePercent = Math.Clamp(policy.MinimumEvidenceCoveragePercent, 0, 100),
            Factors = factors,
            FactorEvidenceRules = factorEvidenceRules,
            ThresholdRules = thresholdRules,
            Modifiers = modifiers,
            ExposureWeights = exposureWeights,
            LeadDataWeights = leadDataWeights,
            EvidenceSources = evidenceSources,
            LifecycleScoreWeights = lifecycleScoreWeights
        };
    }

    private static QualificationLifecycleScoreWeights NormalizeLifecycleScoreWeights(
        QualificationLifecycleScoreWeights? input,
        QualificationLifecycleScoreWeights? baseline)
    {
        var resolved = input ?? baseline ?? new QualificationLifecycleScoreWeights(50m, 20m, 20m, 10m);

        var q = Math.Max(0m, resolved.QualificationWeight);
        var d = Math.Max(0m, resolved.LeadDataQualityWeight);
        var c = Math.Max(0m, resolved.ConversationWeight);
        var h = Math.Max(0m, resolved.HistoryWeight);
        var total = q + d + c + h;
        if (total <= 0m)
        {
            return baseline ?? new QualificationLifecycleScoreWeights(50m, 20m, 20m, 10m);
        }

        return new QualificationLifecycleScoreWeights(q, d, c, h);
    }

    private static IReadOnlyList<QualificationLeadDataWeight> NormalizeLeadDataWeights(
        IReadOnlyList<QualificationLeadDataWeight>? input,
        IReadOnlyList<QualificationLeadDataWeight> baseline)
    {
        var source = input ?? baseline;
        var byKey = source
            .Where(static item => !string.IsNullOrWhiteSpace(item.Key))
            .GroupBy(static item => item.Key.Trim(), StringComparer.OrdinalIgnoreCase)
            .ToDictionary(
                static group => group.Key,
                static group => Math.Max(0m, group.Last().Weight),
                StringComparer.OrdinalIgnoreCase);

        var normalized = new List<QualificationLeadDataWeight>(LeadDataWeightKeys.Length);
        foreach (var key in LeadDataWeightKeys)
        {
            var defaultWeight = baseline.First(item => string.Equals(item.Key, key, StringComparison.OrdinalIgnoreCase)).Weight;
            var weight = byKey.TryGetValue(key, out var configured) ? configured : defaultWeight;
            normalized.Add(new QualificationLeadDataWeight(key, weight));
        }

        var total = normalized.Sum(static item => item.Weight);
        if (total <= 0)
        {
            return baseline;
        }

        return normalized;
    }

    private static IReadOnlyList<QualificationFactorDefinition> NormalizeFactors(
        IReadOnlyList<QualificationFactorDefinition>? configured,
        IReadOnlyList<QualificationFactorDefinition> baseline)
    {
        var configuredByKey = (configured ?? Array.Empty<QualificationFactorDefinition>())
            .Where(static item => !string.IsNullOrWhiteSpace(item.Key))
            .GroupBy(static item => item.Key.Trim(), StringComparer.OrdinalIgnoreCase)
            .ToDictionary(static group => group.Key, static group => group.Last(), StringComparer.OrdinalIgnoreCase);

        var next = new List<QualificationFactorDefinition>(Math.Max(baseline.Count, configuredByKey.Count));
        foreach (var factor in baseline.OrderBy(static item => item.Order))
        {
            if (!configuredByKey.TryGetValue(factor.Key, out var overrideFactor))
            {
                next.Add(factor);
                continue;
            }

            var label = string.IsNullOrWhiteSpace(overrideFactor.DisplayLabel)
                ? factor.DisplayLabel
                : overrideFactor.DisplayLabel.Trim();

            next.Add(factor with
            {
                DisplayLabel = label,
                IsActive = overrideFactor.IsActive,
                IsRequired = overrideFactor.IsRequired,
                Order = overrideFactor.Order <= 0 ? factor.Order : overrideFactor.Order,
                ValueType = NormalizeValueType(overrideFactor.ValueType, factor.ValueType),
                IncludeInScore = factor.IncludeInScore,
                Options = NormalizeOptions(overrideFactor.Options)
            });
        }

        var nextOrder = next.Count == 0 ? 10 : next.Max(static item => item.Order) + 10;
        foreach (var configuredFactor in configuredByKey.Values.Where(factor =>
                     !baseline.Any(baseFactor => string.Equals(baseFactor.Key, factor.Key, StringComparison.OrdinalIgnoreCase))))
        {
            var normalizedKey = NormalizeCustomKey(configuredFactor.Key);
            if (string.IsNullOrWhiteSpace(normalizedKey))
            {
                continue;
            }

            var label = string.IsNullOrWhiteSpace(configuredFactor.DisplayLabel)
                ? HumanizeKey(normalizedKey)
                : configuredFactor.DisplayLabel.Trim();
            var valueType = NormalizeValueType(configuredFactor.ValueType, QualificationFactorValueTypes.SingleSelect);
            var options = NormalizeOptions(configuredFactor.Options);
            if (valueType == QualificationFactorValueTypes.SingleSelect && options.Count == 0)
            {
                options = ["Unknown / not assessed", "Observed", "Confirmed", "Blocked"];
            }

            next.Add(new QualificationFactorDefinition(
                normalizedKey,
                label,
                configuredFactor.IsActive,
                configuredFactor.IsRequired,
                configuredFactor.Order <= 0 ? nextOrder : configuredFactor.Order,
                QualificationFactorTypes.Custom,
                valueType,
                false,
                options));
            nextOrder += 10;
        }

        return next
            .OrderBy(static item => item.Order)
            .ThenBy(static item => item.DisplayLabel, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static IReadOnlyList<QualificationFactorEvidenceRule> NormalizeFactorEvidenceRules(
        IReadOnlyList<QualificationFactorEvidenceRule>? configured,
        IReadOnlyList<QualificationFactorDefinition> factors,
        IReadOnlyList<string> catalog,
        IReadOnlyList<QualificationFactorEvidenceRule> baseline)
    {
        var catalogLookup = new HashSet<string>(catalog, StringComparer.OrdinalIgnoreCase);
        var configuredByKey = (configured ?? Array.Empty<QualificationFactorEvidenceRule>())
            .Where(static item => !string.IsNullOrWhiteSpace(item.FactorKey))
            .GroupBy(static item => item.FactorKey.Trim(), StringComparer.OrdinalIgnoreCase)
            .ToDictionary(static group => group.Key, static group => group.Last(), StringComparer.OrdinalIgnoreCase);

        return factors.Select(factor =>
        {
            var baselineRule = baseline.FirstOrDefault(rule => string.Equals(rule.FactorKey, factor.Key, StringComparison.OrdinalIgnoreCase));
            if (!configuredByKey.TryGetValue(factor.Key, out var configuredRule))
            {
                if (baselineRule is not null)
                {
                    return baselineRule with
                    {
                        AllowedEvidenceSources = NormalizeAllowedEvidenceSources(baselineRule.AllowedEvidenceSources, catalogLookup, catalog)
                    };
                }

                return new QualificationFactorEvidenceRule(
                    factor.Key,
                    factor.IsRequired,
                    NormalizeAllowedEvidenceSources(catalog, catalogLookup, catalog));
            }

            return new QualificationFactorEvidenceRule(
                factor.Key,
                configuredRule.RequireEvidence,
                NormalizeAllowedEvidenceSources(configuredRule.AllowedEvidenceSources, catalogLookup, catalog));
        }).ToList();
    }

    private static IReadOnlyList<string> NormalizeAllowedEvidenceSources(
        IReadOnlyList<string>? allowed,
        IReadOnlySet<string> catalogLookup,
        IReadOnlyList<string> catalog)
    {
        var next = (allowed ?? Array.Empty<string>())
            .Where(static item => !string.IsNullOrWhiteSpace(item))
            .Select(static item => item.Trim())
            .Where(item => catalogLookup.Contains(item))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (!next.Any(static item => string.Equals(item, "No evidence yet", StringComparison.OrdinalIgnoreCase))
            && catalogLookup.Contains("No evidence yet"))
        {
            next.Insert(0, catalog.First(static item => string.Equals(item, "No evidence yet", StringComparison.OrdinalIgnoreCase)));
        }

        return next.Count > 0 ? next : ["No evidence yet"];
    }

    private static string NormalizeValueType(string? configured, string fallback)
    {
        var candidate = configured?.Trim();
        return candidate switch
        {
            QualificationFactorValueTypes.SingleSelect => QualificationFactorValueTypes.SingleSelect,
            QualificationFactorValueTypes.Text => QualificationFactorValueTypes.Text,
            _ => fallback
        };
    }

    private static List<string> NormalizeOptions(IReadOnlyList<string>? configured)
    {
        return (configured ?? Array.Empty<string>())
            .Where(static item => !string.IsNullOrWhiteSpace(item))
            .Select(static item => item.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static string NormalizeCustomKey(string? key)
    {
        if (string.IsNullOrWhiteSpace(key))
        {
            return string.Empty;
        }

        var chars = key.Trim()
            .Select(ch => char.IsLetterOrDigit(ch) ? char.ToLowerInvariant(ch) : '_')
            .ToArray();
        var normalized = new string(chars);
        while (normalized.Contains("__", StringComparison.Ordinal))
        {
            normalized = normalized.Replace("__", "_", StringComparison.Ordinal);
        }

        return normalized.Trim('_');
    }

    private static string HumanizeKey(string key)
    {
        if (string.IsNullOrWhiteSpace(key))
        {
            return "Custom factor";
        }

        return string.Join(' ', key
            .Split('_', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(static part => char.ToUpperInvariant(part[0]) + part[1..]));
    }

    private static IReadOnlyList<QualificationFactorEvidenceRule> CreateDefaultFactorEvidenceRules(IReadOnlyList<string> catalog)
    {
        IReadOnlyList<string> Pick(params string[] names)
            => catalog.Where(item => names.Any(name => string.Equals(name, item, StringComparison.OrdinalIgnoreCase))).ToList();

        return
        [
            new("budget", true, Pick("No evidence yet", "Customer call", "Call notes", "Discovery call notes", "Discovery meeting notes", "Email confirmation", "Buyer email", "Written confirmation", "Proposal feedback")),
            new("readiness", false, Pick("No evidence yet", "Customer call", "Call notes", "Discovery call notes", "Meeting notes", "Email confirmation", "Chat transcript", "Internal plan mention")),
            new("timeline", true, Pick("No evidence yet", "Customer call", "Call notes", "Discovery meeting notes", "Meeting notes", "Email confirmation", "Buyer email", "Written confirmation", "Proposal feedback")),
            new("problem", true, Pick("No evidence yet", "Customer call", "Call recap", "Discovery call notes", "Discovery meeting notes", "Meeting notes", "Ops review notes", "Chat transcript")),
            new("economicBuyer", true, Pick("No evidence yet", "Customer call", "Meeting notes", "Email from buyer", "Buyer email", "Written confirmation", "Org chart reference")),
            new("icpFit", false, Pick("No evidence yet", "Account research", "Org chart reference", "Third-party confirmation", "Historical / prior deal", "Customer call"))
        ];
    }
}
