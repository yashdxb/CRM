using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Emails;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Emails;

public sealed class EmailConnectionService : IEmailConnectionService
{
    private readonly CrmDbContext _dbContext;
    private readonly IDataProtector _protector;
    private readonly EmailOAuthOptions _options;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<EmailConnectionService> _logger;

    private const string DataProtectionPurpose = "EmailOAuthTokens";

    public EmailConnectionService(
        CrmDbContext dbContext,
        IDataProtectionProvider dataProtectionProvider,
        IOptions<EmailOAuthOptions> options,
        IHttpClientFactory httpClientFactory,
        ILogger<EmailConnectionService> logger)
    {
        _dbContext = dbContext;
        _protector = dataProtectionProvider.CreateProtector(DataProtectionPurpose);
        _options = options.Value;
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    // ============ QUERY OPERATIONS ============

    public async Task<IReadOnlyList<EmailConnectionDto>> GetConnectionsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var connections = await _dbContext.UserEmailConnections
            .AsNoTracking()
            .Where(c => c.UserId == userId && !c.IsDeleted)
            .OrderByDescending(c => c.IsPrimary)
            .ThenByDescending(c => c.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        return connections.Select(MapToDto).ToList();
    }

    public async Task<EmailConnectionDto?> GetConnectionAsync(Guid connectionId, CancellationToken cancellationToken = default)
    {
        var connection = await _dbContext.UserEmailConnections
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == connectionId && !c.IsDeleted, cancellationToken);

        return connection is null ? null : MapToDto(connection);
    }

    // ============ OAUTH FLOW ============

    public Task<OAuthStartResult> StartOAuthAsync(Guid userId, EmailProvider provider, string redirectUri, CancellationToken cancellationToken = default)
    {
        // Generate a state parameter to prevent CSRF
        var state = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
        
        string authorizationUrl;

        if (provider == EmailProvider.Microsoft365)
        {
            var config = _options.Microsoft;
            var scopes = Uri.EscapeDataString(string.Join(" ", config.Scopes));
            
            authorizationUrl = $"https://login.microsoftonline.com/{config.TenantId}/oauth2/v2.0/authorize?" +
                $"client_id={Uri.EscapeDataString(config.ClientId)}" +
                $"&response_type=code" +
                $"&redirect_uri={Uri.EscapeDataString(redirectUri)}" +
                $"&scope={scopes}" +
                $"&state={Uri.EscapeDataString(state)}" +
                $"&prompt=consent";
        }
        else // Gmail
        {
            var config = _options.Google;
            var scopes = Uri.EscapeDataString(string.Join(" ", config.Scopes));
            
            authorizationUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
                $"client_id={Uri.EscapeDataString(config.ClientId)}" +
                $"&response_type=code" +
                $"&redirect_uri={Uri.EscapeDataString(redirectUri)}" +
                $"&scope={scopes}" +
                $"&state={Uri.EscapeDataString(state)}" +
                $"&access_type=offline" +
                $"&prompt=consent";
        }

        return Task.FromResult(new OAuthStartResult(authorizationUrl, state));
    }

    public async Task<EmailConnectionDto> CompleteOAuthAsync(
        Guid userId, 
        EmailProvider provider, 
        string authorizationCode, 
        string redirectUri, 
        CancellationToken cancellationToken = default)
    {
        // Exchange authorization code for tokens
        var tokenResponse = await ExchangeCodeForTokensAsync(provider, authorizationCode, redirectUri, cancellationToken);

        // Get user profile info
        var (email, displayName) = await GetUserProfileAsync(provider, tokenResponse.AccessToken, cancellationToken);

        // Check if connection already exists for this email
        var existing = await _dbContext.UserEmailConnections
            .FirstOrDefaultAsync(c => c.UserId == userId && c.Provider == provider && c.EmailAddress == email && !c.IsDeleted, cancellationToken);

        if (existing is not null)
        {
            // Update existing connection
            existing.AccessTokenEncrypted = _protector.Protect(tokenResponse.AccessToken);
            existing.RefreshTokenEncrypted = _protector.Protect(tokenResponse.RefreshToken);
            existing.TokenExpiresAtUtc = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn);
            existing.Scopes = tokenResponse.Scope;
            existing.DisplayName = displayName ?? email;
            existing.IsActive = true;
            existing.LastError = null;
            existing.FailureCount = 0;
            existing.LastSyncAtUtc = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync(cancellationToken);
            return MapToDto(existing);
        }

        // Check if this is the user's first connection (make it primary)
        var hasConnections = await _dbContext.UserEmailConnections
            .AnyAsync(c => c.UserId == userId && !c.IsDeleted, cancellationToken);

        // Create new connection
        var connection = new UserEmailConnection
        {
            UserId = userId,
            Provider = provider,
            EmailAddress = email,
            DisplayName = displayName ?? email,
            AccessTokenEncrypted = _protector.Protect(tokenResponse.AccessToken),
            RefreshTokenEncrypted = _protector.Protect(tokenResponse.RefreshToken),
            TokenExpiresAtUtc = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn),
            Scopes = tokenResponse.Scope,
            IsPrimary = !hasConnections, // First connection is primary
            IsActive = true,
            LastSyncAtUtc = DateTime.UtcNow
        };

        _dbContext.UserEmailConnections.Add(connection);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("User {UserId} connected {Provider} email account: {Email}", userId, provider, email);

        return MapToDto(connection);
    }

    // ============ TOKEN MANAGEMENT ============

    public async Task<string?> GetAccessTokenAsync(Guid connectionId, CancellationToken cancellationToken = default)
    {
        var connection = await _dbContext.UserEmailConnections
            .FirstOrDefaultAsync(c => c.Id == connectionId && c.IsActive && !c.IsDeleted, cancellationToken);

        if (connection is null)
            return null;

        // Check if token is expired or expiring soon (within 5 minutes)
        if (connection.TokenExpiresAtUtc <= DateTime.UtcNow.AddMinutes(5))
        {
            var refreshed = await RefreshTokenInternalAsync(connection, cancellationToken);
            if (!refreshed)
                return null;
        }

        try
        {
            return _protector.Unprotect(connection.AccessTokenEncrypted);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to decrypt access token for connection {ConnectionId}", connectionId);
            return null;
        }
    }

    public async Task<bool> RefreshTokenAsync(Guid connectionId, CancellationToken cancellationToken = default)
    {
        var connection = await _dbContext.UserEmailConnections
            .FirstOrDefaultAsync(c => c.Id == connectionId && !c.IsDeleted, cancellationToken);

        if (connection is null)
            return false;

        return await RefreshTokenInternalAsync(connection, cancellationToken);
    }

    private async Task<bool> RefreshTokenInternalAsync(UserEmailConnection connection, CancellationToken cancellationToken)
    {
        try
        {
            var refreshToken = _protector.Unprotect(connection.RefreshTokenEncrypted);
            var tokenResponse = await RefreshAccessTokenAsync(connection.Provider, refreshToken, cancellationToken);

            connection.AccessTokenEncrypted = _protector.Protect(tokenResponse.AccessToken);
            if (!string.IsNullOrEmpty(tokenResponse.RefreshToken))
            {
                connection.RefreshTokenEncrypted = _protector.Protect(tokenResponse.RefreshToken);
            }
            connection.TokenExpiresAtUtc = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn);
            connection.LastError = null;
            connection.FailureCount = 0;

            await _dbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to refresh token for connection {ConnectionId}", connection.Id);
            
            connection.FailureCount++;
            connection.LastError = ex.Message;
            
            // Deactivate after 3 consecutive failures
            if (connection.FailureCount >= 3)
            {
                connection.IsActive = false;
                _logger.LogWarning("Connection {ConnectionId} deactivated after {FailureCount} consecutive failures", 
                    connection.Id, connection.FailureCount);
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
            return false;
        }
    }

    // ============ CONNECTION MANAGEMENT ============

    public async Task<bool> SetPrimaryAsync(Guid userId, Guid connectionId, CancellationToken cancellationToken = default)
    {
        var connections = await _dbContext.UserEmailConnections
            .Where(c => c.UserId == userId && !c.IsDeleted)
            .ToListAsync(cancellationToken);

        var targetConnection = connections.FirstOrDefault(c => c.Id == connectionId);
        if (targetConnection is null)
            return false;

        // Clear primary flag from all and set on target
        foreach (var conn in connections)
        {
            conn.IsPrimary = conn.Id == connectionId;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DisconnectAsync(Guid connectionId, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var connection = await _dbContext.UserEmailConnections
            .FirstOrDefaultAsync(c => c.Id == connectionId && !c.IsDeleted, cancellationToken);

        if (connection is null)
            return false;

        connection.IsDeleted = true;
        connection.UpdatedAtUtc = DateTime.UtcNow;

        // Clear sensitive data
        connection.AccessTokenEncrypted = string.Empty;
        connection.RefreshTokenEncrypted = string.Empty;

        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("User {UserId} disconnected {Provider} email account: {Email}", 
            connection.UserId, connection.Provider, connection.EmailAddress);

        return true;
    }

    public async Task<ConnectionTestResult> TestConnectionAsync(Guid connectionId, CancellationToken cancellationToken = default)
    {
        var token = await GetAccessTokenAsync(connectionId, cancellationToken);
        if (token is null)
        {
            return new ConnectionTestResult(false, "Unable to obtain access token", null);
        }

        var connection = await _dbContext.UserEmailConnections
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == connectionId, cancellationToken);

        if (connection is null)
        {
            return new ConnectionTestResult(false, "Connection not found", null);
        }

        try
        {
            int inboxCount;
            
            if (connection.Provider == EmailProvider.Microsoft365)
            {
                inboxCount = await TestMicrosoftConnectionAsync(token, cancellationToken);
            }
            else
            {
                inboxCount = await TestGmailConnectionAsync(token, cancellationToken);
            }

            return new ConnectionTestResult(true, null, inboxCount);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Connection test failed for {ConnectionId}", connectionId);
            return new ConnectionTestResult(false, ex.Message, null);
        }
    }

    // ============ HELPER METHODS ============

    private async Task<OAuthTokenResponse> ExchangeCodeForTokensAsync(
        EmailProvider provider, 
        string code, 
        string redirectUri,
        CancellationToken cancellationToken)
    {
        using var client = _httpClientFactory.CreateClient();
        
        HttpResponseMessage response;
        
        if (provider == EmailProvider.Microsoft365)
        {
            var config = _options.Microsoft;
            var content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["client_id"] = config.ClientId,
                ["client_secret"] = config.ClientSecret,
                ["code"] = code,
                ["redirect_uri"] = redirectUri,
                ["grant_type"] = "authorization_code",
                ["scope"] = string.Join(" ", config.Scopes)
            });

            response = await client.PostAsync(
                $"https://login.microsoftonline.com/{config.TenantId}/oauth2/v2.0/token",
                content,
                cancellationToken);
        }
        else
        {
            var config = _options.Google;
            var content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["client_id"] = config.ClientId,
                ["client_secret"] = config.ClientSecret,
                ["code"] = code,
                ["redirect_uri"] = redirectUri,
                ["grant_type"] = "authorization_code"
            });

            response = await client.PostAsync(
                "https://oauth2.googleapis.com/token",
                content,
                cancellationToken);
        }

        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync(cancellationToken);
            _logger.LogError("OAuth token exchange failed. Status: {StatusCode}, Body: {ErrorBody}, RedirectUri: {RedirectUri}", 
                response.StatusCode, errorBody, redirectUri);
            
            // Parse Microsoft/Google error format to extract user-friendly message
            string userFriendlyError = $"Token exchange failed ({response.StatusCode})";
            try
            {
                var errorJson = JsonDocument.Parse(errorBody);
                if (errorJson.RootElement.TryGetProperty("error_description", out var desc))
                {
                    userFriendlyError = desc.GetString() ?? userFriendlyError;
                }
                else if (errorJson.RootElement.TryGetProperty("error", out var err))
                {
                    userFriendlyError = err.GetString() ?? userFriendlyError;
                }
            }
            catch
            {
                // Keep the default error if parsing fails
            }
            
            throw new HttpRequestException(userFriendlyError);
        }
        
        var json = await response.Content.ReadFromJsonAsync<JsonElement>(cancellationToken);
        
        return new OAuthTokenResponse(
            AccessToken: json.GetProperty("access_token").GetString()!,
            RefreshToken: json.TryGetProperty("refresh_token", out var rt) ? rt.GetString() ?? "" : "",
            ExpiresIn: json.GetProperty("expires_in").GetInt32(),
            Scope: json.TryGetProperty("scope", out var scope) ? scope.GetString() ?? "" : "",
            Email: null,
            DisplayName: null
        );
    }

    private async Task<OAuthTokenResponse> RefreshAccessTokenAsync(
        EmailProvider provider, 
        string refreshToken,
        CancellationToken cancellationToken)
    {
        using var client = _httpClientFactory.CreateClient();
        
        HttpResponseMessage response;
        
        if (provider == EmailProvider.Microsoft365)
        {
            var config = _options.Microsoft;
            var content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["client_id"] = config.ClientId,
                ["client_secret"] = config.ClientSecret,
                ["refresh_token"] = refreshToken,
                ["grant_type"] = "refresh_token",
                ["scope"] = string.Join(" ", config.Scopes)
            });

            response = await client.PostAsync(
                $"https://login.microsoftonline.com/{config.TenantId}/oauth2/v2.0/token",
                content,
                cancellationToken);
        }
        else
        {
            var config = _options.Google;
            var content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["client_id"] = config.ClientId,
                ["client_secret"] = config.ClientSecret,
                ["refresh_token"] = refreshToken,
                ["grant_type"] = "refresh_token"
            });

            response = await client.PostAsync(
                "https://oauth2.googleapis.com/token",
                content,
                cancellationToken);
        }

        response.EnsureSuccessStatusCode();
        
        var json = await response.Content.ReadFromJsonAsync<JsonElement>(cancellationToken);
        
        return new OAuthTokenResponse(
            AccessToken: json.GetProperty("access_token").GetString()!,
            RefreshToken: json.TryGetProperty("refresh_token", out var rt) ? rt.GetString() ?? "" : "",
            ExpiresIn: json.GetProperty("expires_in").GetInt32(),
            Scope: json.TryGetProperty("scope", out var scope) ? scope.GetString() ?? "" : "",
            Email: null,
            DisplayName: null
        );
    }

    private async Task<(string Email, string? DisplayName)> GetUserProfileAsync(
        EmailProvider provider, 
        string accessToken,
        CancellationToken cancellationToken)
    {
        using var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
        
        if (provider == EmailProvider.Microsoft365)
        {
            var response = await client.GetFromJsonAsync<JsonElement>(
                "https://graph.microsoft.com/v1.0/me",
                cancellationToken);
            
            var email = response.TryGetProperty("mail", out var mail) ? mail.GetString() : null;
            if (string.IsNullOrEmpty(email))
            {
                email = response.TryGetProperty("userPrincipalName", out var upn) ? upn.GetString() : "unknown@unknown.com";
            }
            var displayName = response.TryGetProperty("displayName", out var dn) ? dn.GetString() : null;
            
            return (email!, displayName);
        }
        else
        {
            var response = await client.GetFromJsonAsync<JsonElement>(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                cancellationToken);
            
            var email = response.GetProperty("email").GetString()!;
            var displayName = response.TryGetProperty("name", out var name) ? name.GetString() : null;
            
            return (email, displayName);
        }
    }

    private async Task<int> TestMicrosoftConnectionAsync(string accessToken, CancellationToken cancellationToken)
    {
        using var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
        
        var response = await client.GetFromJsonAsync<JsonElement>(
            "https://graph.microsoft.com/v1.0/me/mailFolders/inbox?$select=totalItemCount",
            cancellationToken);
        
        return response.GetProperty("totalItemCount").GetInt32();
    }

    private async Task<int> TestGmailConnectionAsync(string accessToken, CancellationToken cancellationToken)
    {
        using var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
        
        var response = await client.GetFromJsonAsync<JsonElement>(
            "https://gmail.googleapis.com/gmail/v1/users/me/labels/INBOX",
            cancellationToken);
        
        return response.TryGetProperty("messagesTotal", out var total) ? total.GetInt32() : 0;
    }

    private static EmailConnectionDto MapToDto(UserEmailConnection connection)
    {
        return new EmailConnectionDto(
            Id: connection.Id,
            Provider: connection.Provider,
            ProviderName: connection.Provider == EmailProvider.Microsoft365 ? "Microsoft 365" : "Gmail",
            EmailAddress: connection.EmailAddress,
            DisplayName: connection.DisplayName,
            IsPrimary: connection.IsPrimary,
            IsActive: connection.IsActive,
            LastSyncAtUtc: connection.LastSyncAtUtc,
            LastError: connection.LastError,
            CreatedAtUtc: connection.CreatedAtUtc
        );
    }
}
