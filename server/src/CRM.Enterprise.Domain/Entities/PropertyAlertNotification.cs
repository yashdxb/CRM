using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class PropertyAlertNotification : AuditableEntity
{
    public Guid PropertyId { get; set; }
    public Guid RuleId { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string ClientEmail { get; set; } = string.Empty;
    public int MatchedProperties { get; set; }
    public DateTime SentAtUtc { get; set; }
    public string Status { get; set; } = "Sent";
    public string? TriggeredBy { get; set; }

    public Property? Property { get; set; }
    public PropertyAlertRule? Rule { get; set; }
}
