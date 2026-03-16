using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class HelpdeskCaseStatusDefinition : Entity
{
    public string Name { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
}
