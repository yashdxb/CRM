using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class DashboardTemplate : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string LayoutJson { get; set; } = string.Empty;
    public bool IsDefault { get; set; }
}
