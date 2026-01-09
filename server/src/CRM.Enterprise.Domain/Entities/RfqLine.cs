using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class RfqLine : AuditableEntity
{
    public Guid RfqId { get; set; }
    public Guid? ItemMasterId { get; set; }
    public int LineNumber { get; set; }
    public string? Description { get; set; }
    public string? Uom { get; set; }
    public decimal Quantity { get; set; }
    public decimal? TargetPrice { get; set; }

    public Rfq? Rfq { get; set; }
    public ItemMaster? ItemMaster { get; set; }
}
