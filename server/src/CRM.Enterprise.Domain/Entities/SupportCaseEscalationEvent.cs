using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupportCaseEscalationEvent : AuditableEntity
{
    public Guid CaseId { get; set; }
    public string Type { get; set; } = "AtRisk";
    public Guid? ActorUserId { get; set; }
    public string? Notes { get; set; }
    public DateTime OccurredUtc { get; set; }

    public SupportCase Case { get; set; } = null!;
    public User? ActorUser { get; set; }
}
