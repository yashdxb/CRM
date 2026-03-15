using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class AccountTeamMember : AuditableEntity
{
    public Guid AccountId { get; set; }
    public Guid UserId { get; set; }
    public string Role { get; set; } = string.Empty;

    public Account Account { get; set; } = null!;
    public User User { get; set; } = null!;
}
