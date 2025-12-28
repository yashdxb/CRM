using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class RolePermission : AuditableEntity
{
    public Guid RoleId { get; set; }
    public string Permission { get; set; } = string.Empty;

    public Role? Role { get; set; }
}
