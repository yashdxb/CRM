using System.ComponentModel.DataAnnotations;
using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class User : AuditableEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? EmailNormalized { get; set; }
    public string? PasswordHash { get; set; }
    public string? TimeZone { get; set; }
    public string? Locale { get; set; }
    public string? NotificationPreferencesJson { get; set; }
    public string? CommandCenterLayoutJson { get; set; }
    // Forces a password update after invitation or admin reset.
    public bool MustChangePassword { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? LastLoginAtUtc { get; set; }
    [MaxLength(64)]
    public string? LastLoginIp { get; set; }
    [MaxLength(256)]
    public string? LastLoginLocation { get; set; }

    public ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
}
