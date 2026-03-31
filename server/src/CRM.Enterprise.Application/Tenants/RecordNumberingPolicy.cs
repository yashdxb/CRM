namespace CRM.Enterprise.Application.Tenants;

public sealed record RecordNumberingPolicy(
    string ModuleKey,
    string Prefix,
    bool Enabled,
    int Padding);

public static class RecordNumberingModules
{
    public const string Leads = "Leads";
    public const string Deals = "Deals";
    public const string Customers = "Customers";

    public static readonly string[] Ordered =
    [
        Leads,
        Deals,
        Customers
    ];
}

public static class RecordNumberingPolicyDefaults
{
    private const int DefaultPadding = 6;

    public static IReadOnlyList<RecordNumberingPolicy> CreateDefault() =>
    [
        new(RecordNumberingModules.Leads, "LEA-", true, DefaultPadding),
        new(RecordNumberingModules.Deals, "DEAL-", false, DefaultPadding),
        new(RecordNumberingModules.Customers, "CUS-", false, DefaultPadding)
    ];

    public static IReadOnlyList<RecordNumberingPolicy> Normalize(IEnumerable<RecordNumberingPolicy>? policies)
    {
        var incoming = (policies ?? [])
            .Where(policy => !string.IsNullOrWhiteSpace(policy.ModuleKey))
            .GroupBy(policy => policy.ModuleKey.Trim(), StringComparer.OrdinalIgnoreCase)
            .ToDictionary(
                group => group.Key,
                group => group.Last(),
                StringComparer.OrdinalIgnoreCase);

        return OrderedPolicies()
            .Select(defaultPolicy =>
            {
                if (!incoming.TryGetValue(defaultPolicy.ModuleKey, out var configured))
                {
                    return defaultPolicy;
                }

                var prefix = string.IsNullOrWhiteSpace(configured.Prefix)
                    ? defaultPolicy.Prefix
                    : configured.Prefix.Trim();

                return new RecordNumberingPolicy(
                    defaultPolicy.ModuleKey,
                    prefix,
                    configured.Enabled,
                    Math.Clamp(configured.Padding, 3, 10));
            })
            .ToList();
    }

    public static RecordNumberingPolicy Resolve(IEnumerable<RecordNumberingPolicy>? policies, string moduleKey)
    {
        return Normalize(policies)
            .First(policy => string.Equals(policy.ModuleKey, moduleKey, StringComparison.OrdinalIgnoreCase));
    }

    private static IEnumerable<RecordNumberingPolicy> OrderedPolicies() => CreateDefault();
}
