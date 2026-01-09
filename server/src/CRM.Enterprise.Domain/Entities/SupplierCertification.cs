using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupplierCertification : AuditableEntity
{
    public Guid SupplierId { get; set; }
    public Supplier? Supplier { get; set; }

    public string Name { get; set; } = string.Empty;
    public string? Issuer { get; set; }
    public DateTime? IssuedOn { get; set; }
    public DateTime? ExpiresOn { get; set; }
    public string Status { get; set; } = "Active";
    public string? Notes { get; set; }
}
