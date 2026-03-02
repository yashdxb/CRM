using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

/// <summary>
/// Stores a synced email message from a user's connected mailbox (Microsoft 365, Gmail).
/// </summary>
public class UserMailMessage : AuditableEntity
{
    /// <summary>
    /// The email connection this message belongs to.
    /// </summary>
    public Guid ConnectionId { get; set; }
    public UserEmailConnection? Connection { get; set; }
    
    /// <summary>
    /// External provider message ID (Graph API messageId or Gmail messageId).
    /// </summary>
    public string ExternalId { get; set; } = string.Empty;
    
    /// <summary>
    /// Internet Message ID header.
    /// </summary>
    public string? InternetMessageId { get; set; }
    
    /// <summary>
    /// Conversation/thread ID for grouping related messages.
    /// </summary>
    public string? ConversationId { get; set; }
    
    /// <summary>
    /// Email subject line.
    /// </summary>
    public string Subject { get; set; } = string.Empty;
    
    /// <summary>
    /// First ~200 chars of body for preview.
    /// </summary>
    public string BodyPreview { get; set; } = string.Empty;
    
    /// <summary>
    /// Full HTML body (if available).
    /// </summary>
    public string? BodyHtml { get; set; }
    
    /// <summary>
    /// Plain text body.
    /// </summary>
    public string? BodyText { get; set; }
    
    /// <summary>
    /// Sender email address.
    /// </summary>
    public string FromEmail { get; set; } = string.Empty;
    
    /// <summary>
    /// Sender display name.
    /// </summary>
    public string? FromName { get; set; }
    
    /// <summary>
    /// JSON array of To recipients: [{"email": "...", "name": "..."}]
    /// </summary>
    public string ToRecipientsJson { get; set; } = "[]";
    
    /// <summary>
    /// JSON array of CC recipients.
    /// </summary>
    public string? CcRecipientsJson { get; set; }
    
    /// <summary>
    /// JSON array of BCC recipients.
    /// </summary>
    public string? BccRecipientsJson { get; set; }
    
    /// <summary>
    /// Which folder this message is in.
    /// </summary>
    public MailFolder Folder { get; set; } = MailFolder.Inbox;
    
    /// <summary>
    /// External folder ID (for custom folders).
    /// </summary>
    public string? ExternalFolderId { get; set; }
    
    /// <summary>
    /// Whether the email has been read.
    /// </summary>
    public bool IsRead { get; set; }
    
    /// <summary>
    /// Whether the email is starred/flagged.
    /// </summary>
    public bool IsStarred { get; set; }
    
    /// <summary>
    /// Whether the email has attachments.
    /// </summary>
    public bool HasAttachments { get; set; }
    
    /// <summary>
    /// JSON array of attachment metadata: [{"id": "...", "name": "...", "size": 123, "contentType": "..."}]
    /// </summary>
    public string? AttachmentsJson { get; set; }
    
    /// <summary>
    /// Message importance level.
    /// </summary>
    public MailImportance Importance { get; set; } = MailImportance.Normal;
    
    /// <summary>
    /// When the email was received (from provider).
    /// </summary>
    public DateTime ReceivedAtUtc { get; set; }
    
    /// <summary>
    /// When the email was sent (for outbound messages).
    /// </summary>
    public DateTime? SentAtUtc { get; set; }
    
    /// <summary>
    /// Whether the message is a draft.
    /// </summary>
    public bool IsDraft { get; set; }
    
    /// <summary>
    /// Last sync timestamp from provider.
    /// </summary>
    public DateTime LastSyncAtUtc { get; set; }
    
    /// <summary>
    /// Provider-specific change key for delta sync.
    /// </summary>
    public string? ChangeKey { get; set; }
}

public enum MailFolder
{
    Inbox = 0,
    Sent = 1,
    Drafts = 2,
    Archive = 3,
    Trash = 4,
    Spam = 5,
    Starred = 6,
    Other = 99
}

public enum MailImportance
{
    Low = 0,
    Normal = 1,
    High = 2
}
