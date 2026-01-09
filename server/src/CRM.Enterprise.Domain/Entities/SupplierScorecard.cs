using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupplierScorecard : AuditableEntity
{
    public Guid SupplierId { get; set; }
    public Supplier? Supplier { get; set; }

    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }

    public decimal QualityScore { get; set; }
    public decimal DeliveryScore { get; set; }
    public decimal CostScore { get; set; }
    public decimal OverallScore { get; set; }

    public string? Notes { get; set; }
}
