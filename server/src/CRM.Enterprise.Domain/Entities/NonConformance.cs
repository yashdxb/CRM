using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class NonConformance : AuditableEntity
{
    public string ReferenceNumber { get; set; } = string.Empty;
    public string Status { get; set; } = "Open";
    public string Severity { get; set; } = "Medium";
    public DateTime ReportedDate { get; set; }
    public string? ReportedBy { get; set; }
    public Guid? SupplierId { get; set; }
    public Guid? ItemMasterId { get; set; }
    public Guid? InspectionId { get; set; }
    public Guid? PurchaseOrderId { get; set; }
    public Guid? GoodsReceiptId { get; set; }
    public string? Description { get; set; }
    public string? Disposition { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? ClosedDate { get; set; }
    public string? Notes { get; set; }

    public Supplier? Supplier { get; set; }
    public ItemMaster? ItemMaster { get; set; }
    public Inspection? Inspection { get; set; }
    public PurchaseOrder? PurchaseOrder { get; set; }
    public GoodsReceipt? GoodsReceipt { get; set; }
}
