namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record CampaignRecommendationItem(
    Guid Id,
    Guid CampaignId,
    string Type,
    string Severity,
    string Title,
    string Description,
    decimal ImpactEstimate,
    decimal Confidence,
    string Status,
    DateTime GeneratedUtc,
    DateTime? ExpiresUtc,
    DateTime? DecidedUtc,
    string? DecisionReason,
    IEnumerable<string> Evidence);
