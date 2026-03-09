namespace CRM.Enterprise.Application.Leads;

public sealed record LeadDispositionPolicy(
    IReadOnlyList<string> DisqualificationReasons,
    IReadOnlyList<string> LossReasons);

public static class LeadDispositionPolicyDefaults
{
    private static readonly string[] DefaultDisqualificationReasonsCatalog =
    [
        "No budget / funding",
        "No clear need",
        "No decision-maker access",
        "Outside ICP / poor fit",
        "Timeline not active",
        "Duplicate / already managed",
        "No response after repeated follow-up",
        "Went with internal solution",
        "Invalid contact / bad data",
        "Other"
    ];

    private static readonly string[] DefaultLossReasonsCatalog =
    [
        "Lost to competitor",
        "No decision / stalled",
        "Priority changed",
        "Budget withdrawn",
        "Timing pushed",
        "Internal solution chosen",
        "Value not compelling enough",
        "Procurement / legal blocker",
        "Relationship lost",
        "Other"
    ];

    public static LeadDispositionPolicy CreateDefault()
    {
        return new LeadDispositionPolicy(DefaultDisqualificationReasonsCatalog, DefaultLossReasonsCatalog);
    }

    public static LeadDispositionPolicy Normalize(LeadDispositionPolicy? policy)
    {
        if (policy is null)
        {
            return CreateDefault();
        }

        var disqualificationReasons = NormalizeCatalog(policy.DisqualificationReasons, DefaultDisqualificationReasonsCatalog);
        var lossReasons = NormalizeCatalog(policy.LossReasons, DefaultLossReasonsCatalog);

        return new LeadDispositionPolicy(disqualificationReasons, lossReasons);
    }

    private static IReadOnlyList<string> NormalizeCatalog(
        IReadOnlyList<string>? values,
        IReadOnlyList<string> fallback)
    {
        var normalized = (values ?? Array.Empty<string>())
            .Where(static value => !string.IsNullOrWhiteSpace(value))
            .Select(static value => value.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (normalized.Count == 0)
        {
            normalized = fallback.ToList();
        }

        if (!normalized.Any(static value => string.Equals(value, "Other", StringComparison.OrdinalIgnoreCase)))
        {
            normalized.Add("Other");
        }

        return normalized;
    }
}
