using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class CampaignEmailRecipient : AuditableEntity
{
    public Guid CampaignEmailId { get; set; }
    public Guid? CampaignMemberId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? Name { get; set; }
    public CampaignEmailRecipientStatus Status { get; set; } = CampaignEmailRecipientStatus.Pending;
    public string? SkipReason { get; set; }
    public DateTime? SentAtUtc { get; set; }
    public DateTime? DeliveredAtUtc { get; set; }
    public DateTime? OpenedAtUtc { get; set; }
    public DateTime? ClickedAtUtc { get; set; }
    public Guid? EmailLogId { get; set; }

    public CampaignEmail? CampaignEmail { get; set; }
    public CampaignMember? CampaignMember { get; set; }
    public EmailLog? EmailLog { get; set; }
}

public enum CampaignEmailRecipientStatus
{
    Pending = 0,
    Skipped = 1,
    Queued = 2,
    Sent = 3,
    Delivered = 4,
    Opened = 5,
    Clicked = 6,
    Bounced = 7,
    Unsubscribed = 8,
    Failed = 9
}
