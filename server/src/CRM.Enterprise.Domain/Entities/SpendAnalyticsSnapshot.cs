using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class SpendAnalyticsSnapshot : AuditableEntity
{
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    public Guid? SupplierId { get; set; }
    public string? Category { get; set; }
    public string Currency { get; set; } = "USD";
    public decimal TotalSpend { get; set; }
    public decimal Savings { get; set; }
    public int PurchaseOrderCount { get; set; }
    public decimal? AvgLeadTimeDays { get; set; }
    public string? Notes { get; set; }

    public Supplier? Supplier { get; set; }
}
