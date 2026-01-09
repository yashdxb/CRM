using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class PurchaseOrderApproval : AuditableEntity
{
    public Guid PurchaseOrderId { get; set; }
    public PurchaseOrder? PurchaseOrder { get; set; }

    public string ApproverRole { get; set; } = string.Empty;
    public Guid? ApproverUserId { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime RequestedOn { get; set; } = DateTime.UtcNow;
    public DateTime? DecisionOn { get; set; }
    public string? Notes { get; set; }
}
