using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class PropertyTypeDefinition : Entity
{
    public string Name { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
}
