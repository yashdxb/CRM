using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class ShipmentLine : AuditableEntity
{
    public Guid ShipmentId { get; set; }
    public Guid? ItemMasterId { get; set; }
    public int LineNumber { get; set; }
    public string? Description { get; set; }
    public string? Uom { get; set; }
    public decimal Quantity { get; set; }

    public Shipment? Shipment { get; set; }
    public ItemMaster? ItemMaster { get; set; }
}
