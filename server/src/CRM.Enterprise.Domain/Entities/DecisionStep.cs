using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

// Generic decision engine skeleton entity (future persistence rollout).
public class DecisionStep : AuditableEntity
{
    public Guid DecisionRequestId { get; set; }
    public DecisionRequest? DecisionRequest { get; set; }
    public int StepOrder { get; set; }
    public string StepType { get; set; } = "Approval";
    public string Status { get; set; } = "Pending";
    public string? ApproverRole { get; set; }
    public Guid? AssigneeUserId { get; set; }
    public DateTime? DueAtUtc { get; set; }
    public DateTime? CompletedAtUtc { get; set; }
    public string? Notes { get; set; }
    public string? AssigneeNameSnapshot { get; set; }
}
