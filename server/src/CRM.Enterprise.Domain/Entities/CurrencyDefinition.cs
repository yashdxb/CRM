using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

// Stores the canonical list of supported currencies for UI dropdowns.
public class CurrencyDefinition : Entity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Symbol { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
}
