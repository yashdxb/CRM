using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class GoodsReceipt : AuditableEntity
{
    public string ReceiptNumber { get; set; } = string.Empty;
    public string Status { get; set; } = "Received";
    public Guid? PurchaseOrderId { get; set; }
    public Guid? ShipmentId { get; set; }
    public DateTime ReceivedDate { get; set; }
    public string? ReceivedBy { get; set; }
    public string? Notes { get; set; }

    public PurchaseOrder? PurchaseOrder { get; set; }
    public Shipment? Shipment { get; set; }
    public List<GoodsReceiptLine> Lines { get; set; } = new();
}
