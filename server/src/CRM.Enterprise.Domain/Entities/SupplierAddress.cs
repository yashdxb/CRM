using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupplierAddress : AuditableEntity
{
    public Guid SupplierId { get; set; }
    public Supplier? Supplier { get; set; }

    public string Label { get; set; } = "Main";
    public string Line1 { get; set; } = string.Empty;
    public string? Line2 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? PostalCode { get; set; }
    public string? Country { get; set; }
    public bool IsPrimary { get; set; }
    public string? Notes { get; set; }
}
