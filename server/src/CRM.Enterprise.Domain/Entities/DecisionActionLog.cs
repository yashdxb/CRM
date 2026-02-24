using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

// Generic decision engine skeleton entity (future persistence rollout).
public class DecisionActionLog : AuditableEntity
{
    public Guid DecisionRequestId { get; set; }
    public string Action { get; set; } = string.Empty;
    public Guid? ActorUserId { get; set; }
    public string? ActorName { get; set; }
    public string? Notes { get; set; }
    public string? Field { get; set; }
    public string? OldValue { get; set; }
    public string? NewValue { get; set; }
    public DateTime ActionAtUtc { get; set; } = DateTime.UtcNow;
}
