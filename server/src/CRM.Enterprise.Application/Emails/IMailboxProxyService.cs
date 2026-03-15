using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Application.Emails;

/// <summary>
/// Proxy service that fetches email data directly from the provider (Graph/Gmail)
/// instead of syncing to the local database. Results are cached in-memory.
/// </summary>
public interface IMailboxProxyService
{
    Task<ProxyMessageListResponse> ListMessagesAsync(MailboxSearchRequest request, CancellationToken ct = default);
    Task<ProxyMessageDetail?> GetMessageAsync(Guid connectionId, string externalMessageId, CancellationToken ct = default);
    Task<MailboxStatsDto> GetStatsAsync(Guid userId, CancellationToken ct = default);
    Task<bool> SetReadStatusAsync(Guid connectionId, string externalMessageId, bool isRead, CancellationToken ct = default);
    Task<bool> SetStarredAsync(Guid connectionId, string externalMessageId, bool isStarred, CancellationToken ct = default);
    Task<bool> MoveToFolderAsync(Guid connectionId, string externalMessageId, MailFolder folder, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid connectionId, string externalMessageId, CancellationToken ct = default);
    Task<ProxyMessageDetail?> SendAsync(SendMailRequest request, CancellationToken ct = default);
    Task<ProxyMessageDetail?> SaveDraftAsync(SaveDraftRequest request, CancellationToken ct = default);
    Task<AttachmentDownloadResult?> GetAttachmentAsync(Guid connectionId, string externalMessageId, string attachmentId, CancellationToken ct = default);
}

// ============ PROXY-SPECIFIC DTOs ============

public record ProxyMessageSummary(
    string ExternalId,
    Guid ConnectionId,
    string? ConversationId,
    string Subject,
    string BodyPreview,
    string FromEmail,
    string? FromName,
    MailFolder Folder,
    bool IsRead,
    bool IsStarred,
    bool IsDraft,
    bool HasAttachments,
    MailImportance Importance,
    DateTime ReceivedAtUtc,
    DateTime? SentAtUtc
);

public record ProxyMessageDetail(
    string ExternalId,
    Guid ConnectionId,
    string? ConversationId,
    string Subject,
    string? BodyHtml,
    string? BodyText,
    string BodyPreview,
    string FromEmail,
    string? FromName,
    List<MailRecipientDto> ToRecipients,
    List<MailRecipientDto>? CcRecipients,
    List<MailRecipientDto>? BccRecipients,
    MailFolder Folder,
    bool IsRead,
    bool IsStarred,
    bool IsDraft,
    bool HasAttachments,
    MailImportance Importance,
    DateTime ReceivedAtUtc,
    DateTime? SentAtUtc,
    List<MailAttachmentDto> Attachments,
    string? InternetMessageId
);

public record ProxyMessageListResponse(
    IReadOnlyList<ProxyMessageSummary> Items,
    int Total,
    int Page,
    int PageSize
);
