using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Application.Emails;

/// <summary>
/// Service for syncing and managing emails from connected mailbox accounts.
/// </summary>
public interface IMailboxSyncService
{
    // ============ SYNC OPERATIONS ============

    /// <summary>
    /// Performs a full sync of emails from all connected accounts for a user.
    /// </summary>
    Task<SyncResult> SyncAllAsync(Guid userId, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Performs a delta sync of a specific connection.
    /// </summary>
    Task<SyncResult> SyncConnectionAsync(Guid connectionId, CancellationToken cancellationToken = default);
    
    // ============ QUERY OPERATIONS ============

    /// <summary>
    /// Searches mailbox messages for the current user.
    /// </summary>
    Task<MailboxSearchResponse> SearchAsync(MailboxSearchRequest request, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Gets a single message with full body content.
    /// </summary>
    Task<MailMessageDto?> GetMessageAsync(Guid messageId, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Gets folder statistics for the user.
    /// </summary>
    Task<MailboxStatsDto> GetStatsAsync(Guid userId, CancellationToken cancellationToken = default);
    
    // ============ MESSAGE ACTIONS ============

    /// <summary>
    /// Marks a message as read/unread.
    /// </summary>
    Task<bool> SetReadStatusAsync(Guid messageId, bool isRead, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Stars/unstars a message.
    /// </summary>
    Task<bool> SetStarredAsync(Guid messageId, bool isStarred, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Moves a message to a different folder.
    /// </summary>
    Task<bool> MoveToFolderAsync(Guid messageId, MailFolder folder, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Permanently deletes a message.
    /// </summary>
    Task<bool> DeleteAsync(Guid messageId, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Sends an email via the user's connected account.
    /// </summary>
    Task<MailMessageDto?> SendAsync(SendMailRequest request, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Saves an email as draft.
    /// </summary>
    Task<MailMessageDto?> SaveDraftAsync(SaveDraftRequest request, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Downloads an attachment.
    /// </summary>
    Task<AttachmentDownloadResult?> GetAttachmentAsync(Guid messageId, string attachmentId, CancellationToken cancellationToken = default);
}

// ============ REQUEST/RESPONSE DTOs ============

public record MailboxSearchRequest(
    Guid UserId,
    MailFolder? Folder,
    string? Search,
    bool? IsRead,
    bool? IsStarred,
    DateTime? FromDate,
    DateTime? ToDate,
    int Page = 1,
    int PageSize = 50
);

public record MailboxSearchResponse(
    IEnumerable<MailMessageSummaryDto> Items,
    int Total,
    int Page,
    int PageSize
);

public record MailMessageSummaryDto(
    Guid Id,
    Guid ConnectionId,
    string FromEmail,
    string? FromName,
    string Subject,
    string BodyPreview,
    MailFolder Folder,
    bool IsRead,
    bool IsStarred,
    bool HasAttachments,
    MailImportance Importance,
    DateTime ReceivedAtUtc,
    DateTime? SentAtUtc
);

public record MailMessageDto(
    Guid Id,
    Guid ConnectionId,
    string ExternalId,
    string? ConversationId,
    string FromEmail,
    string? FromName,
    List<MailRecipientDto> ToRecipients,
    List<MailRecipientDto>? CcRecipients,
    List<MailRecipientDto>? BccRecipients,
    string Subject,
    string BodyPreview,
    string? BodyHtml,
    string? BodyText,
    MailFolder Folder,
    bool IsRead,
    bool IsStarred,
    bool IsDraft,
    bool HasAttachments,
    List<MailAttachmentDto>? Attachments,
    MailImportance Importance,
    DateTime ReceivedAtUtc,
    DateTime? SentAtUtc
);

public record MailRecipientDto(string Email, string? Name);
public record MailAttachmentDto(string Id, string Name, long Size, string ContentType);

public record MailboxStatsDto(
    int TotalInbox,
    int UnreadInbox,
    int TotalSent,
    int TotalDrafts,
    int TotalStarred,
    int TotalArchive,
    int TotalTrash,
    int TotalSpam
);

public record SendMailRequest(
    Guid ConnectionId,
    List<MailRecipientDto> To,
    List<MailRecipientDto>? Cc,
    List<MailRecipientDto>? Bcc,
    string Subject,
    string BodyHtml,
    string? BodyText,
    MailImportance Importance = MailImportance.Normal,
    Guid? ReplyToMessageId = null
);

public record SaveDraftRequest(
    Guid ConnectionId,
    Guid? ExistingDraftId,
    List<MailRecipientDto>? To,
    List<MailRecipientDto>? Cc,
    List<MailRecipientDto>? Bcc,
    string? Subject,
    string? BodyHtml,
    string? BodyText
);

public record SyncResult(
    bool Success,
    int NewMessages,
    int UpdatedMessages,
    int DeletedMessages,
    string? ErrorMessage
);

public record AttachmentDownloadResult(
    string FileName,
    string ContentType,
    byte[] Content
);
