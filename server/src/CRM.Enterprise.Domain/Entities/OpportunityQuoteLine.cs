using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class OpportunityQuoteLine : AuditableEntity
{
    public Guid OpportunityQuoteId { get; set; }
    public OpportunityQuote? OpportunityQuote { get; set; }

    public Guid ItemMasterId { get; set; }
    public ItemMaster? ItemMaster { get; set; }

    public string? Description { get; set; }
    public decimal Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal DiscountPercent { get; set; }
    public decimal LineTotal { get; set; }
}
