using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class PropertyPriceChange : AuditableEntity
{
    public Guid PropertyId { get; set; }
    public decimal PreviousPrice { get; set; }
    public decimal NewPrice { get; set; }
    public DateTime ChangedAtUtc { get; set; }
    public string? ChangedBy { get; set; }
    public string? Reason { get; set; }

    public Property? Property { get; set; }
}
