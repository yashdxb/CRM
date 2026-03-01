using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

/// <summary>
/// Stores a user's connected email account (Microsoft 365, Gmail) for sending and receiving emails.
/// </summary>
public class UserEmailConnection : AuditableEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    
    public EmailProvider Provider { get; set; }
    public string EmailAddress { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    
    /// <summary>
    /// Encrypted OAuth access token.
    /// </summary>
    public string AccessTokenEncrypted { get; set; } = string.Empty;
    
    /// <summary>
    /// Encrypted OAuth refresh token.
    /// </summary>
    public string RefreshTokenEncrypted { get; set; } = string.Empty;
    
    /// <summary>
    /// When the current access token expires.
    /// </summary>
    public DateTime TokenExpiresAtUtc { get; set; }
    
    /// <summary>
    /// OAuth scopes granted by the user.
    /// </summary>
    public string Scopes { get; set; } = string.Empty;
    
    /// <summary>
    /// Whether this is the user's primary/default email account for sending.
    /// </summary>
    public bool IsPrimary { get; set; }
    
    /// <summary>
    /// Whether the connection is currently active and working.
    /// </summary>
    public bool IsActive { get; set; } = true;
    
    /// <summary>
    /// Last successful sync timestamp.
    /// </summary>
    public DateTime? LastSyncAtUtc { get; set; }
    
    /// <summary>
    /// Last error message if sync failed.
    /// </summary>
    public string? LastError { get; set; }
    
    /// <summary>
    /// Number of consecutive sync failures.
    /// </summary>
    public int FailureCount { get; set; }
}

public enum EmailProvider
{
    Microsoft365 = 0,
    Gmail = 1
}
