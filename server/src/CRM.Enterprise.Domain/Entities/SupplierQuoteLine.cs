using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class SupplierQuoteLine : AuditableEntity
{
    public Guid SupplierQuoteId { get; set; }
    public Guid? RfqLineId { get; set; }
    public Guid? ItemMasterId { get; set; }
    public int LineNumber { get; set; }
    public string? Description { get; set; }
    public string? Uom { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal LineTotal { get; set; }

    public SupplierQuote? SupplierQuote { get; set; }
    public RfqLine? RfqLine { get; set; }
    public ItemMaster? ItemMaster { get; set; }
}
