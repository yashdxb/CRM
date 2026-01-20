using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

// Stores the canonical list of supported time zones for UI dropdowns.
public class TimeZoneDefinition : Entity
{
    public string IanaId { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public int UtcOffsetMinutes { get; set; }
    public string FlagCode { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
}
