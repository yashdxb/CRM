using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class UserRole : AuditableEntity
{
    public Guid UserId { get; set; }
    public Guid RoleId { get; set; }

    public User? User { get; set; }
    public Role? Role { get; set; }
}
