namespace CRM.Enterprise.Application.Tenants;

public sealed record SupportingDocumentPolicy(
    int MaxDocumentsPerRecord,
    int MaxFileSizeMb,
    IReadOnlyList<string> AllowedExtensions);

public static class SupportingDocumentPolicyDefaults
{
    private static readonly string[] DefaultAllowedExtensions =
    [
        ".pdf",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".png",
        ".jpg",
        ".jpeg",
        ".webp"
    ];

    public static SupportingDocumentPolicy CreateDefault()
    {
        return new SupportingDocumentPolicy(
            MaxDocumentsPerRecord: 10,
            MaxFileSizeMb: 10,
            AllowedExtensions: DefaultAllowedExtensions);
    }

    public static SupportingDocumentPolicy Normalize(SupportingDocumentPolicy? policy)
    {
        var baseline = CreateDefault();
        if (policy is null)
        {
            return baseline;
        }

        var extensions = (policy.AllowedExtensions ?? Array.Empty<string>())
            .Where(static value => !string.IsNullOrWhiteSpace(value))
            .Select(static value =>
            {
                var trimmed = value.Trim().ToLowerInvariant();
                return trimmed.StartsWith('.') ? trimmed : $".{trimmed}";
            })
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (extensions.Count == 0)
        {
            extensions = DefaultAllowedExtensions.ToList();
        }

        return new SupportingDocumentPolicy(
            MaxDocumentsPerRecord: Clamp(policy.MaxDocumentsPerRecord, 1, 100),
            MaxFileSizeMb: Clamp(policy.MaxFileSizeMb, 1, 100),
            AllowedExtensions: extensions);
    }

    private static int Clamp(int value, int min, int max) => Math.Min(max, Math.Max(min, value));
}
