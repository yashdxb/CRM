using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupportEmailBinding : AuditableEntity
{
    public string ExternalThreadKey { get; set; } = string.Empty;
    public Guid CaseId { get; set; }
    public DateTime LastMessageUtc { get; set; }

    public SupportCase Case { get; set; } = null!;
}
