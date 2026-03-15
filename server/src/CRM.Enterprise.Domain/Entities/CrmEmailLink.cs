using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Domain.Entities;

/// <summary>
/// Lightweight reference linking an external email (Graph/Gmail) to a CRM entity.
/// Stores only metadata — the full email body is fetched on-demand from the provider.
/// </summary>
public class CrmEmailLink : AuditableEntity
{
    /// <summary>
    /// The email connection this message belongs to.
    /// </summary>
    public Guid ConnectionId { get; set; }
    public UserEmailConnection? Connection { get; set; }

    /// <summary>
    /// Provider-specific message ID (Graph messageId or Gmail messageId).
    /// </summary>
    public string ExternalMessageId { get; set; } = string.Empty;

    /// <summary>
    /// Thread/conversation ID for grouping related emails.
    /// </summary>
    public string? ConversationId { get; set; }

    /// <summary>
    /// Email subject line.
    /// </summary>
    public string Subject { get; set; } = string.Empty;

    /// <summary>
    /// Sender email address.
    /// </summary>
    public string FromEmail { get; set; } = string.Empty;

    /// <summary>
    /// Sender display name.
    /// </summary>
    public string? FromName { get; set; }

    /// <summary>
    /// When the email was received.
    /// </summary>
    public DateTime ReceivedAtUtc { get; set; }

    /// <summary>
    /// Email provider for this message.
    /// </summary>
    public EmailProvider Provider { get; set; }

    /// <summary>
    /// The CRM entity type this email is linked to (Lead, Contact, Account, Opportunity).
    /// </summary>
    public ActivityRelationType RelatedEntityType { get; set; }

    /// <summary>
    /// The ID of the CRM entity this email is linked to.
    /// </summary>
    public Guid RelatedEntityId { get; set; }

    /// <summary>
    /// The user who pinned/linked this email to the CRM entity.
    /// </summary>
    public Guid LinkedByUserId { get; set; }
    public User? LinkedByUser { get; set; }

    /// <summary>
    /// Optional note from the user about why this email was linked.
    /// </summary>
    public string? Note { get; set; }
}
