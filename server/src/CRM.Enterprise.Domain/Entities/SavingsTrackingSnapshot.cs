using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class SavingsTrackingSnapshot : AuditableEntity
{
    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }
    public Guid? SupplierId { get; set; }
    public string? Category { get; set; }
    public string Currency { get; set; } = "USD";
    public decimal BaselineSpend { get; set; }
    public decimal ActualSpend { get; set; }
    public decimal SavingsAmount { get; set; }
    public decimal SavingsRate { get; set; }
    public string? Initiative { get; set; }
    public string? Notes { get; set; }

    public Supplier? Supplier { get; set; }
}
