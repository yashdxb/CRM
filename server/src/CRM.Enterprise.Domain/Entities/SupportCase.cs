using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupportCase : AuditableEntity
{
    public string CaseNumber { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "New";
    public string Priority { get; set; } = "Medium";
    public string Severity { get; set; } = "S3";
    public string Category { get; set; } = "General";
    public string? Subcategory { get; set; }
    public string Source { get; set; } = "Manual";
    public Guid? AccountId { get; set; }
    public Guid? ContactId { get; set; }
    public Guid? QueueId { get; set; }
    public Guid? OwnerUserId { get; set; }
    public Guid SlaPolicyId { get; set; }
    public DateTime FirstResponseDueUtc { get; set; }
    public DateTime ResolutionDueUtc { get; set; }
    public DateTime? FirstRespondedUtc { get; set; }
    public DateTime? ResolvedUtc { get; set; }
    public DateTime? ClosedUtc { get; set; }
    public string? ClosureReason { get; set; }
    public int? CsatScore { get; set; }
    public string? CsatFeedback { get; set; }

    public Account? Account { get; set; }
    public Contact? Contact { get; set; }
    public SupportQueue? Queue { get; set; }
    public User? OwnerUser { get; set; }
    public SupportSlaPolicy SlaPolicy { get; set; } = null!;
    public ICollection<SupportCaseComment> Comments { get; set; } = new List<SupportCaseComment>();
    public ICollection<SupportCaseEscalationEvent> EscalationEvents { get; set; } = new List<SupportCaseEscalationEvent>();
    public ICollection<SupportEmailBinding> EmailBindings { get; set; } = new List<SupportEmailBinding>();
}
