using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupplierKpi : AuditableEntity
{
    public Guid SupplierId { get; set; }
    public Supplier? Supplier { get; set; }

    public DateTime PeriodStart { get; set; }
    public DateTime PeriodEnd { get; set; }

    public decimal? OnTimeDeliveryRate { get; set; }
    public decimal? DefectRate { get; set; }
    public decimal? FillRate { get; set; }
    public decimal? CostVariance { get; set; }
    public decimal? LeadTimeDays { get; set; }
    public decimal? ResponsivenessScore { get; set; }

    public string? Notes { get; set; }
}
