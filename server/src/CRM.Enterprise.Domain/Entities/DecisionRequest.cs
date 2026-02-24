using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

// Generic decision engine skeleton entity (future persistence rollout).
public class DecisionRequest : AuditableEntity
{
    public Guid? LegacyApprovalId { get; set; }
    public Guid? LegacyApprovalChainId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string EntityType { get; set; } = string.Empty;
    public Guid EntityId { get; set; }
    public string Status { get; set; } = "Submitted";
    public string? Priority { get; set; }
    public string? RiskLevel { get; set; }
    public Guid? RequestedByUserId { get; set; }
    public DateTime RequestedOnUtc { get; set; }
    public DateTime? DueAtUtc { get; set; }
    public DateTime? CompletedAtUtc { get; set; }
    public string? PolicyReason { get; set; }
    public string? PayloadJson { get; set; }
    public string? PolicySnapshotJson { get; set; }
    public ICollection<DecisionStep> Steps { get; set; } = new List<DecisionStep>();
    public ICollection<DecisionActionLog> ActionLogs { get; set; } = new List<DecisionActionLog>();
}
