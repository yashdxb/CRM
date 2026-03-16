using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class AccountContactRole : AuditableEntity
{
    public Guid AccountId { get; set; }
    public Account? Account { get; set; }
    public Guid ContactId { get; set; }
    public Contact? Contact { get; set; }
    public string Role { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public bool IsPrimary { get; set; }
}
