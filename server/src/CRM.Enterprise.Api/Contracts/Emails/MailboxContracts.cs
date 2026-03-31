namespace CRM.Enterprise.Api.Contracts.Emails;

// ============ MAILBOX SYNC CONTRACTS ============

/// <summary>
/// Response for mailbox message list queries.
/// </summary>
public record MailboxMessagesResponse(
    IEnumerable<MailboxMessageItem> Items,
    int Total,
    int Page,
    int PageSize
);

/// <summary>
/// Individual message item in list view.
/// </summary>
public record MailboxMessageItem(
    Guid Id,
    Guid ConnectionId,
    string? ConversationId,
    string Folder,
    string Subject,
    string? BodyPreview,
    string FromEmail,
    string? FromName,
    IEnumerable<string> ToRecipients,
    DateTime ReceivedAtUtc,
    DateTime? SentAtUtc,
    bool IsRead,
    bool IsStarred,
    bool HasAttachments,
    string Importance
);

/// <summary>
/// Full message detail including body HTML.
/// </summary>
public record MailboxMessageDetail(
    Guid Id,
    Guid ConnectionId,
    string ExternalId,
    string? ConversationId,
    string Folder,
    string Subject,
    string? BodyPreview,
    string? BodyHtml,
    string? BodyText,
    string FromEmail,
    string? FromName,
    IEnumerable<string> ToRecipients,
    IEnumerable<string>? CcRecipients,
    IEnumerable<string>? BccRecipients,
    DateTime ReceivedAtUtc,
    DateTime? SentAtUtc,
    bool IsRead,
    bool IsStarred,
    bool IsDraft,
    bool HasAttachments,
    IEnumerable<MailboxAttachmentItem>? Attachments,
    string Importance,
    DateTime SyncedAtUtc
);

public record MailboxAttachmentItem(
    string Id,
    string Name,
    long Size,
    string ContentType
);

/// <summary>
/// Mailbox folder statistics.
/// </summary>
public record MailboxStatsResponse(
    int TotalMessages,
    int UnreadCount,
    int InboxCount,
    int SentCount,
    int DraftsCount,
    int TrashCount,
    int SpamCount,
    int StarredCount,
    int ArchiveCount,
    DateTime? LastSyncAtUtc
);

/// <summary>
/// Request to sync mailbox from connected accounts.
/// </summary>
public record MailboxSyncRequest(
    Guid? ConnectionId = null,
    bool Force = false
);

/// <summary>
/// Response from sync operation.
/// </summary>
public record MailboxSyncResponse(
    int SyncedConnections,
    int TotalNewMessages,
    int TotalUpdatedMessages,
    IEnumerable<MailboxSyncConnectionResult> ConnectionResults
);

/// <summary>
/// Result per connection from sync.
/// </summary>
public record MailboxSyncConnectionResult(
    Guid ConnectionId,
    string Provider,
    string Email,
    bool Success,
    int NewMessages,
    int UpdatedMessages,
    string? Error
);

/// <summary>
/// Request to update message read/starred status.
/// </summary>
public record UpdateMessageRequest(
    bool? IsRead = null,
    bool? IsStarred = null,
    string? MoveToFolder = null
);

/// <summary>
/// Request to send an email.
/// </summary>
public record SendMailboxEmailRequest(
    Guid ConnectionId,
    IEnumerable<string> To,
    string Subject,
    string HtmlBody,
    IEnumerable<string>? Cc = null,
    IEnumerable<string>? Bcc = null,
    Guid? ReplyToMessageId = null
);

/// <summary>
/// Request to save a draft.
/// </summary>
public record SaveDraftMailRequest(
    Guid ConnectionId,
    IEnumerable<string>? To,
    string? Subject,
    string? HtmlBody,
    IEnumerable<string>? Cc = null,
    IEnumerable<string>? Bcc = null,
    Guid? ExistingDraftId = null
);

/// <summary>
/// Response after sending email.
/// </summary>
public record SendMailboxEmailResponse(
    bool Success,
    Guid? MessageId,
    string? Error
);

/// <summary>
/// Response after saving draft.
/// </summary>
public record SaveDraftMailResponse(
    bool Success,
    Guid? DraftId,
    string? Error
);

// ============ PROXY MAILBOX CONTRACTS ============

/// <summary>
/// List response for proxy (live) mailbox queries.
/// </summary>
public record ProxyMailboxMessagesResponse(
    IEnumerable<ProxyMailboxMessageItem> Items,
    int Total,
    int Page,
    int PageSize
);

/// <summary>
/// Proxy message item with string ExternalId (not internal Guid).
/// </summary>
public record ProxyMailboxMessageItem(
    string ExternalId,
    Guid ConnectionId,
    string? ConversationId,
    string Folder,
    string Subject,
    string? BodyPreview,
    string FromEmail,
    string? FromName,
    DateTime ReceivedAtUtc,
    bool IsRead,
    bool IsStarred,
    bool IsDraft,
    bool HasAttachments,
    string Importance
);

/// <summary>
/// Full proxy message detail including body.
/// </summary>
public record ProxyMailboxMessageDetail(
    string ExternalId,
    Guid ConnectionId,
    string? ConversationId,
    string Folder,
    string Subject,
    string? BodyPreview,
    string? BodyHtml,
    string? BodyText,
    string FromEmail,
    string? FromName,
    IEnumerable<string> ToRecipients,
    IEnumerable<string>? CcRecipients,
    IEnumerable<string>? BccRecipients,
    DateTime ReceivedAtUtc,
    DateTime? SentAtUtc,
    bool IsRead,
    bool IsStarred,
    bool IsDraft,
    bool HasAttachments,
    string Importance,
    IEnumerable<ProxyAttachmentItem>? Attachments,
    string? InternetMessageId
);

/// <summary>
/// Proxy attachment item.
/// </summary>
public record ProxyAttachmentItem(
    string Id,
    string Name,
    long Size,
    string ContentType
);

/// <summary>
/// Send response for proxy endpoints (uses string ExternalId).
/// </summary>
public record ProxySendMailResponse(
    bool Success,
    string? ExternalId,
    string? Error
);

/// <summary>
/// Draft response for proxy endpoints (uses string ExternalId).
/// </summary>
public record ProxySaveDraftResponse(
    bool Success,
    string? ExternalId,
    string? Error
);

// ============ CRM EMAIL LINK CONTRACTS ============

/// <summary>
/// Request to link an external email to a CRM entity.
/// </summary>
public record CrmEmailLinkRequest(
    Guid ConnectionId,
    string ExternalMessageId,
    string? ConversationId,
    string Subject,
    string FromEmail,
    string? FromName,
    DateTime ReceivedAtUtc,
    string RelatedEntityType,
    Guid RelatedEntityId,
    string? Note
);

/// <summary>
/// Response for a CRM email link.
/// </summary>
public record CrmEmailLinkResponse(
    Guid Id,
    Guid ConnectionId,
    string ExternalMessageId,
    string? ConversationId,
    string Subject,
    string FromEmail,
    string? FromName,
    DateTime ReceivedAtUtc,
    string Provider,
    string RelatedEntityType,
    Guid RelatedEntityId,
    Guid LinkedByUserId,
    string? Note,
    DateTime CreatedAtUtc
);

public record CrmRecordLookupItem(
    Guid Id,
    string Label,
    string? Subtitle
);
