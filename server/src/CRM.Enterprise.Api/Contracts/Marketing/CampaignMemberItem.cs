namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record CampaignMemberItem(
    Guid Id,
    Guid CampaignId,
    string EntityType,
    Guid EntityId,
    string EntityName,
    string ResponseStatus,
    DateTime AddedUtc,
    DateTime? UpdatedAtUtc);
