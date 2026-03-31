using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class TenantRecordNumberCounter : AuditableEntity
{
    public string ModuleKey { get; set; } = string.Empty;
    public int NextValue { get; set; }
}
