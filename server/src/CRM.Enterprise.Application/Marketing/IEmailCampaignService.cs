namespace CRM.Enterprise.Application.Marketing;

public interface IEmailCampaignService
{
    Task<CampaignEmailSearchResultDto> SearchEmailsAsync(CampaignEmailSearchRequest request, CancellationToken cancellationToken = default);
    Task<CampaignEmailDetailDto?> GetEmailAsync(Guid id, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<CampaignEmailDetailDto>> CreateDraftAsync(CampaignEmailUpsertRequest request, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<CampaignEmailDetailDto>> UpdateDraftAsync(Guid id, CampaignEmailUpsertRequest request, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<CampaignEmailDetailDto>> SendAsync(Guid id, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<CampaignEmailDetailDto>> ScheduleAsync(Guid id, DateTime scheduledAtUtc, CancellationToken cancellationToken = default);
    Task<MarketingOperationResult<CampaignEmailDetailDto>> CancelAsync(Guid id, CancellationToken cancellationToken = default);
    Task<CampaignEmailRecipientSearchResultDto> GetRecipientsAsync(Guid emailId, string? status = null, int page = 1, int pageSize = 20, CancellationToken cancellationToken = default);
}
