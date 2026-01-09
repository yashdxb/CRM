using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class InventoryItem : AuditableEntity
{
    public Guid WarehouseId { get; set; }
    public Guid ItemMasterId { get; set; }
    public decimal OnHandQty { get; set; }
    public decimal AvailableQty { get; set; }
    public decimal ReservedQty { get; set; }
    public decimal ReorderPoint { get; set; }
    public decimal SafetyStock { get; set; }
    public int LeadTimeDays { get; set; }
    public DateTime? LastCountedAt { get; set; }

    public Warehouse? Warehouse { get; set; }
    public ItemMaster? ItemMaster { get; set; }
}
