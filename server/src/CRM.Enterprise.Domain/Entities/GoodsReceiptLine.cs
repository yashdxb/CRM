using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class GoodsReceiptLine : AuditableEntity
{
    public Guid GoodsReceiptId { get; set; }
    public Guid? ItemMasterId { get; set; }
    public int LineNumber { get; set; }
    public string? Description { get; set; }
    public string? Uom { get; set; }
    public decimal QuantityReceived { get; set; }

    public GoodsReceipt? GoodsReceipt { get; set; }
    public ItemMaster? ItemMaster { get; set; }
}
