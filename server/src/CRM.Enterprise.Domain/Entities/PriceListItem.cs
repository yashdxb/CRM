using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class PriceListItem : AuditableEntity
{
    public Guid PriceListId { get; set; }
    public PriceList? PriceList { get; set; }

    public Guid ItemMasterId { get; set; }
    public ItemMaster? ItemMaster { get; set; }

    public string? Uom { get; set; }
    public decimal UnitPrice { get; set; }
    public int? MinQty { get; set; }
    public int? MaxQty { get; set; }
    public int? LeadTimeDays { get; set; }
    public bool IsActive { get; set; } = true;
}
