using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class LeadCadenceChannel : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsDefault { get; set; }
}
