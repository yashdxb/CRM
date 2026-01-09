using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class Shipment : AuditableEntity
{
    public string ShipmentNumber { get; set; } = string.Empty;
    public string Status { get; set; } = "Planned";
    public Guid CarrierId { get; set; }
    public Guid? PurchaseOrderId { get; set; }
    public DateTime? ShippedDate { get; set; }
    public DateTime? ExpectedDeliveryDate { get; set; }
    public string? TrackingNumber { get; set; }
    public string? Mode { get; set; }
    public string? Origin { get; set; }
    public string? Destination { get; set; }
    public string? Notes { get; set; }

    public Carrier? Carrier { get; set; }
    public PurchaseOrder? PurchaseOrder { get; set; }
    public List<ShipmentLine> Lines { get; set; } = new();
}
