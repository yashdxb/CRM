using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class PendingWorkflowDelay : AuditableEntity
{
    public Guid OpportunityId { get; set; }
    public Guid ApprovalChainId { get; set; }
    public int ResumeFromSequence { get; set; }
    public int? ApprovalStepOrder { get; set; }
    public string NodeId { get; set; } = string.Empty;
    public DateTime ResumeAfterUtc { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? CompletedAtUtc { get; set; }
    public string ExecutionPlanJson { get; set; } = "[]";
    public Guid? RequestedByUserId { get; set; }
}
