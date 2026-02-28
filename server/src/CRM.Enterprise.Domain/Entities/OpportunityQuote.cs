using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class OpportunityQuote : AuditableEntity
{
    public Guid OpportunityId { get; set; }
    public Opportunity? Opportunity { get; set; }

    public string QuoteNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Status { get; set; } = "Draft";

    public Guid? PriceListId { get; set; }
    public PriceList? PriceList { get; set; }

    public string Currency { get; set; } = "USD";
    public decimal Subtotal { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Notes { get; set; }

    public ICollection<OpportunityQuoteLine> Lines { get; set; } = new List<OpportunityQuoteLine>();
}
