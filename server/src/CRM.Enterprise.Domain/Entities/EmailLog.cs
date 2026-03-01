using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class EmailLog : AuditableEntity
{
    public string ToEmail { get; set; } = string.Empty;
    public string? ToName { get; set; }
    public string? CcEmails { get; set; }
    public string? BccEmails { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string HtmlBody { get; set; } = string.Empty;
    public string? TextBody { get; set; }
    public EmailStatus Status { get; set; } = EmailStatus.Pending;
    public string? MessageId { get; set; }
    public string? ExternalId { get; set; }
    public string? ErrorMessage { get; set; }
    public int RetryCount { get; set; }
    public DateTime? SentAtUtc { get; set; }
    public DateTime? DeliveredAtUtc { get; set; }
    public DateTime? OpenedAtUtc { get; set; }
    public DateTime? ClickedAtUtc { get; set; }
    public DateTime? BouncedAtUtc { get; set; }
    public string? BounceReason { get; set; }
    
    // Related entity linkage
    public EmailRelationType? RelatedEntityType { get; set; }
    public Guid? RelatedEntityId { get; set; }
    
    // Template reference
    public Guid? TemplateId { get; set; }
    public EmailTemplate? Template { get; set; }
    
    // Sender
    public Guid SenderId { get; set; }
    public User? Sender { get; set; }
}

public enum EmailStatus
{
    Pending = 0,
    Queued = 1,
    Sent = 2,
    Delivered = 3,
    Opened = 4,
    Clicked = 5,
    Bounced = 6,
    Failed = 7
}

public enum EmailRelationType
{
    Lead = 0,
    Contact = 1,
    Customer = 2,
    Opportunity = 3,
    Activity = 4
}
