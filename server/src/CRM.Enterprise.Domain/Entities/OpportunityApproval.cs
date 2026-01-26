using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class OpportunityApproval : AuditableEntity
{
    public Guid OpportunityId { get; set; }
    public Opportunity? Opportunity { get; set; }

    public string ApproverRole { get; set; } = string.Empty;
    public Guid? ApproverUserId { get; set; }
    public Guid? RequestedByUserId { get; set; }
    public string Status { get; set; } = "Pending";
    public string Purpose { get; set; } = "Close";
    public DateTime RequestedOn { get; set; } = DateTime.UtcNow;
    public DateTime? DecisionOn { get; set; }
    public string? Notes { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "USD";
}
