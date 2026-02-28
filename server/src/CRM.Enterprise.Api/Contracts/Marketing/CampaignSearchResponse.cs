namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record CampaignSearchResponse(IEnumerable<CampaignListItem> Items, int Total);
