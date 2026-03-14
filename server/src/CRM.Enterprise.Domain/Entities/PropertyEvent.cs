using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class PropertyEvent : AuditableEntity
{
    public Guid PropertyId { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Icon { get; set; } = string.Empty;
    public string Variant { get; set; } = string.Empty;
    public DateTime OccurredAtUtc { get; set; }

    public Property? Property { get; set; }
}
