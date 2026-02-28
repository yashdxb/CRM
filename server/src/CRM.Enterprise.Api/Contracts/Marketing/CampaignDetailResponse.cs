namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record CampaignDetailResponse(
    CampaignListItem Campaign,
    IEnumerable<CampaignMemberItem> Members,
    CampaignPerformanceResponse Performance);
