using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

// Stores the canonical list of supported phone types for UI dropdowns.
public class PhoneTypeDefinition : Entity
{
    public string Name { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
    public bool IsDefault { get; set; }
}
