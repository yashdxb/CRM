namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record AttributionExplainabilityCandidateItem(
    string EntityType,
    Guid EntityId,
    string EntityName,
    Guid CampaignId,
    string CampaignName,
    DateTime MemberAddedUtc);

public sealed record AttributionExplainabilityResponse(
    Guid OpportunityId,
    Guid? CampaignId,
    string Model,
    DateTime? AttributedUtc,
    string? RuleVersion,
    string? SourceEntityType,
    Guid? SourceEntityId,
    DateTime? MemberAddedUtc,
    IEnumerable<string> Evidence,
    IEnumerable<AttributionExplainabilityCandidateItem> Candidates);
