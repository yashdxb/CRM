using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class CampaignEmail : AuditableEntity
{
    public Guid CampaignId { get; set; }
    public Guid? TemplateId { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string HtmlBody { get; set; } = string.Empty;
    public string? TextBody { get; set; }
    public string FromName { get; set; } = string.Empty;
    public string? ReplyTo { get; set; }
    public CampaignEmailStatus Status { get; set; } = CampaignEmailStatus.Draft;
    public DateTime? ScheduledAtUtc { get; set; }
    public DateTime? SentAtUtc { get; set; }
    public int RecipientCount { get; set; }
    public int SentCount { get; set; }
    public int DeliveredCount { get; set; }
    public int OpenCount { get; set; }
    public int ClickCount { get; set; }
    public int BounceCount { get; set; }
    public int UnsubscribeCount { get; set; }

    public Campaign? Campaign { get; set; }
    public EmailTemplate? Template { get; set; }
    public ICollection<CampaignEmailRecipient> Recipients { get; set; } = new List<CampaignEmailRecipient>();
}

public enum CampaignEmailStatus
{
    Draft = 0,
    Scheduled = 1,
    Sending = 2,
    Sent = 3,
    Failed = 4,
    Cancelled = 5
}
