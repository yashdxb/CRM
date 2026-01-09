using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class ReorderRule : AuditableEntity
{
    public Guid ItemMasterId { get; set; }
    public Guid? SupplierId { get; set; }
    public Guid? WarehouseId { get; set; }
    public decimal ReorderPoint { get; set; }
    public decimal TargetStock { get; set; }
    public decimal SafetyStock { get; set; }
    public int LeadTimeDays { get; set; }
    public bool IsActive { get; set; }
    public string? Notes { get; set; }

    public ItemMaster? ItemMaster { get; set; }
    public Supplier? Supplier { get; set; }
    public Warehouse? Warehouse { get; set; }
}
