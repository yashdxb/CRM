using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class LeadStatus : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }
    public bool IsDefault { get; set; }
    public bool IsClosed { get; set; }

    public ICollection<Lead> Leads { get; set; } = new List<Lead>();
}
