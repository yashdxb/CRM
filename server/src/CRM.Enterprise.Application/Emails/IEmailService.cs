using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Emails;

public interface IEmailService
{
    // Email Log operations
    Task<EmailSearchResult> SearchAsync(EmailSearchRequest request, CancellationToken cancellationToken = default);
    Task<EmailDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);
    Task<EmailDto> SendAsync(SendEmailRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default);
    Task<EmailStatsDto> GetStatsAsync(CancellationToken cancellationToken = default);
    
    // Template operations
    Task<TemplateSearchResult> SearchTemplatesAsync(TemplateSearchRequest request, CancellationToken cancellationToken = default);
    Task<EmailTemplateDto?> GetTemplateAsync(Guid id, CancellationToken cancellationToken = default);
    Task<EmailTemplateDto> CreateTemplateAsync(UpsertTemplateRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<EmailTemplateDto?> UpdateTemplateAsync(Guid id, UpsertTemplateRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<bool> DeleteTemplateAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default);
    
    // Webhook for delivery status updates
    Task UpdateDeliveryStatusAsync(string messageId, string status, string? details = null, CancellationToken cancellationToken = default);
    
    // Tracking operations
    Task<bool> TrackOpenAsync(Guid emailId, CancellationToken cancellationToken = default);
    Task<string?> TrackClickAsync(Guid emailId, string linkId, CancellationToken cancellationToken = default);
}
