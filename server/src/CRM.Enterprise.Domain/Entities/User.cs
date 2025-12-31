using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class User : AuditableEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PasswordHash { get; set; }
    public string? TimeZone { get; set; }
    public string? Locale { get; set; }
    public string? NotificationPreferencesJson { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? LastLoginAtUtc { get; set; }

    public ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
}
