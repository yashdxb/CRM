namespace CRM.Enterprise.Application.Marketing;

public interface IEmailComplianceService
{
    Task<bool> IsEligibleForEmailAsync(string email, Guid tenantId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<string>> FilterEligibleRecipientsAsync(IReadOnlyList<string> emails, Guid tenantId, CancellationToken cancellationToken = default);
    Task ProcessUnsubscribeAsync(string email, Guid tenantId, string source, string? reason = null, CancellationToken cancellationToken = default);
    Task ProcessBounceAsync(string email, string? bounceReason, Guid tenantId, CancellationToken cancellationToken = default);
    Task<EmailPreferenceDto?> GetPreferenceAsync(string email, Guid tenantId, CancellationToken cancellationToken = default);
    Task<EmailPreferenceDto> UpdatePreferenceAsync(string email, Guid tenantId, bool isSubscribed, string source, CancellationToken cancellationToken = default);
}
