using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class PropertyAlertRule : AuditableEntity
{
    public Guid PropertyId { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string ClientEmail { get; set; } = string.Empty;
    public string CriteriaJson { get; set; } = "{}";
    public string Frequency { get; set; } = "Daily";
    public bool IsActive { get; set; } = true;
    public int MatchCount { get; set; }
    public DateTime? LastNotifiedAtUtc { get; set; }

    public Property? Property { get; set; }
}
