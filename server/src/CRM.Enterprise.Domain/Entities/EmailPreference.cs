using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class EmailPreference : AuditableEntity
{
    public string EntityType { get; set; } = string.Empty;
    public Guid EntityId { get; set; }
    public string Email { get; set; } = string.Empty;
    public bool IsSubscribed { get; set; } = true;
    public DateTime? UnsubscribedAtUtc { get; set; }
    public string? UnsubscribeReason { get; set; }
    public string UnsubscribeSource { get; set; } = "Manual";
    public int HardBounceCount { get; set; }
    public DateTime? LastBounceAtUtc { get; set; }
}
