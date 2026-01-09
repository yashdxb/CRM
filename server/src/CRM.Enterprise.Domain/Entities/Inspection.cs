using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class Inspection : AuditableEntity
{
    public string InspectionNumber { get; set; } = string.Empty;
    public string Status { get; set; } = "Open";
    public DateTime InspectionDate { get; set; }
    public string? InspectorName { get; set; }
    public Guid? SupplierId { get; set; }
    public Guid? ItemMasterId { get; set; }
    public Guid? PurchaseOrderId { get; set; }
    public Guid? GoodsReceiptId { get; set; }
    public string? Result { get; set; }
    public string? Notes { get; set; }

    public Supplier? Supplier { get; set; }
    public ItemMaster? ItemMaster { get; set; }
    public PurchaseOrder? PurchaseOrder { get; set; }
    public GoodsReceipt? GoodsReceipt { get; set; }
}
