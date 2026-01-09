using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class PriceList : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string Currency { get; set; } = "USD";
    public string Status { get; set; } = "Draft";
    public DateTime? ValidFrom { get; set; }
    public DateTime? ValidTo { get; set; }
    public string? Notes { get; set; }

    public ICollection<PriceListItem> Items { get; set; } = new List<PriceListItem>();
}
