namespace CRM.Enterprise.Application.Leads;

public sealed record LeadDispositionPolicy(
    IReadOnlyList<string> DisqualificationReasons,
    IReadOnlyList<string> LossReasons);

public static class LeadDispositionPolicyCatalog
{
    public static LeadDispositionPolicy Normalize(LeadDispositionPolicy? policy)
    {
        var disqualificationReasons = NormalizeCatalog(policy?.DisqualificationReasons);
        var lossReasons = NormalizeCatalog(policy?.LossReasons);

        return new LeadDispositionPolicy(disqualificationReasons, lossReasons);
    }

    private static IReadOnlyList<string> NormalizeCatalog(IReadOnlyList<string>? values)
    {
        var normalized = (values ?? Array.Empty<string>())
            .Where(static value => !string.IsNullOrWhiteSpace(value))
            .Select(static value => value.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        return normalized;
    }
}
