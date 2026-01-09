using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class SupplierQuote : AuditableEntity
{
    public Guid RfqId { get; set; }
    public Guid SupplierId { get; set; }
    public string QuoteNumber { get; set; } = string.Empty;
    public string Status { get; set; } = "Submitted";
    public DateTime SubmittedDate { get; set; }
    public string? Currency { get; set; }
    public decimal? TotalAmount { get; set; }
    public string? Notes { get; set; }

    public Rfq? Rfq { get; set; }
    public Supplier? Supplier { get; set; }
    public List<SupplierQuoteLine> Lines { get; set; } = new();
}
