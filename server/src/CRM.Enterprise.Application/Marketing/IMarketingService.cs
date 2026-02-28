namespace CRM.Enterprise.Application.Marketing;

public interface IMarketingService
{
    Task<CampaignSearchResultDto> SearchCampaignsAsync(CampaignSearchRequest request, CancellationToken cancellationToken = default);
    Task<CampaignDetailDto?> GetCampaignAsync(Guid id, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<CampaignListItemDto>> CreateCampaignAsync(CampaignUpsertRequest request, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<bool>> UpdateCampaignAsync(Guid id, CampaignUpsertRequest request, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<bool>> ArchiveCampaignAsync(Guid id, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<CampaignMemberItemDto>> AddMemberAsync(Guid campaignId, CampaignMemberUpsertRequest request, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<bool>> RemoveMemberAsync(Guid campaignId, Guid memberId, CancellationToken cancellationToken = default);
    Task<CampaignPerformanceDto?> GetPerformanceAsync(Guid campaignId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<AttributionSummaryItemDto>> GetAttributionSummaryAsync(CancellationToken cancellationToken = default);
    Task<CampaignHealthScoreDto?> GetCampaignHealthScoreAsync(Guid campaignId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<CampaignRecommendationDto>> GetCampaignRecommendationsAsync(Guid campaignId, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<CampaignRecommendationDto>> ApplyRecommendationDecisionAsync(Guid recommendationId, RecommendationDecisionRequest request, Guid? decidedByUserId, CancellationToken cancellationToken = default);
    Task<AttributionExplainabilityDto?> GetAttributionExplainabilityAsync(Guid opportunityId, CancellationToken cancellationToken = default);
}
