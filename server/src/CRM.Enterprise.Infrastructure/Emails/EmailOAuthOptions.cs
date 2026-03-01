namespace CRM.Enterprise.Infrastructure.Emails;

/// <summary>
/// Configuration options for OAuth providers (Microsoft 365, Gmail) used for user email connections.
/// </summary>
public class EmailOAuthOptions
{
    public const string SectionName = "EmailOAuth";
    
    public MicrosoftOAuthConfig Microsoft { get; set; } = new();
    public GoogleOAuthConfig Google { get; set; } = new();
}

public class MicrosoftOAuthConfig
{
    /// <summary>
    /// Azure AD Application (client) ID.
    /// </summary>
    public string ClientId { get; set; } = string.Empty;
    
    /// <summary>
    /// Azure AD Client Secret.
    /// </summary>
    public string ClientSecret { get; set; } = string.Empty;
    
    /// <summary>
    /// Azure AD Tenant ID (use "common" for multi-tenant).
    /// </summary>
    public string TenantId { get; set; } = "common";
    
    /// <summary>
    /// OAuth scopes to request for email access.
    /// </summary>
    public string[] Scopes { get; set; } = new[]
    {
        "openid",
        "profile",
        "email",
        "offline_access",
        "Mail.Read",
        "Mail.Send"
    };
}

public class GoogleOAuthConfig
{
    /// <summary>
    /// Google OAuth Client ID.
    /// </summary>
    public string ClientId { get; set; } = string.Empty;
    
    /// <summary>
    /// Google OAuth Client Secret.
    /// </summary>
    public string ClientSecret { get; set; } = string.Empty;
    
    /// <summary>
    /// OAuth scopes to request for Gmail access.
    /// </summary>
    public string[] Scopes { get; set; } = new[]
    {
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send"
    };
}
