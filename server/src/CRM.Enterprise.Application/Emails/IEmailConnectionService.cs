using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Application.Emails;

/// <summary>
/// Service for managing user email account connections (OAuth integration with Microsoft 365, Gmail).
/// </summary>
public interface IEmailConnectionService
{
    /// <summary>
    /// Gets all email connections for the current user.
    /// </summary>
    Task<IReadOnlyList<EmailConnectionDto>> GetConnectionsAsync(Guid userId, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Gets a specific email connection.
    /// </summary>
    Task<EmailConnectionDto?> GetConnectionAsync(Guid connectionId, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Generates an OAuth authorization URL for the specified provider.
    /// </summary>
    Task<OAuthStartResult> StartOAuthAsync(Guid userId, EmailProvider provider, string redirectUri, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Completes the OAuth flow by exchanging the authorization code for tokens.
    /// </summary>
    Task<EmailConnectionDto> CompleteOAuthAsync(Guid userId, EmailProvider provider, string authorizationCode, string redirectUri, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Refreshes the access token for a connection if it's expired or about to expire.
    /// </summary>
    Task<bool> RefreshTokenAsync(Guid connectionId, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Gets a valid access token for the connection, refreshing if necessary.
    /// </summary>
    Task<string?> GetAccessTokenAsync(Guid connectionId, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Sets a connection as the user's primary/default sending account.
    /// </summary>
    Task<bool> SetPrimaryAsync(Guid userId, Guid connectionId, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Disconnects/removes an email connection.
    /// </summary>
    Task<bool> DisconnectAsync(Guid connectionId, ActorContext actor, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Tests the connection by attempting to read the user's inbox.
    /// </summary>
    Task<ConnectionTestResult> TestConnectionAsync(Guid connectionId, CancellationToken cancellationToken = default);
}

// ============ EMAIL CONNECTION DTOs ============

public record EmailConnectionDto(
    Guid Id,
    EmailProvider Provider,
    string ProviderName,
    string EmailAddress,
    string DisplayName,
    bool IsPrimary,
    bool IsActive,
    DateTime? LastSyncAtUtc,
    string? LastError,
    DateTime CreatedAtUtc
);

public record OAuthStartResult(
    string AuthorizationUrl,
    string State
);

public record ConnectionTestResult(
    bool Success,
    string? ErrorMessage,
    int? InboxCount
);

public record OAuthTokenResponse(
    string AccessToken,
    string RefreshToken,
    int ExpiresIn,
    string Scope,
    string? Email,
    string? DisplayName
);
