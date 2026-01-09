using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class PurchaseOrderChange : AuditableEntity
{
    public Guid PurchaseOrderId { get; set; }
    public PurchaseOrder? PurchaseOrder { get; set; }

    public string ChangeType { get; set; } = "Update";
    public string Reason { get; set; } = string.Empty;
    public decimal? PreviousTotal { get; set; }
    public decimal? NewTotal { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime RequestedOn { get; set; } = DateTime.UtcNow;
    public DateTime? ApprovedOn { get; set; }
    public string? ApprovedBy { get; set; }
    public string? Notes { get; set; }
}
