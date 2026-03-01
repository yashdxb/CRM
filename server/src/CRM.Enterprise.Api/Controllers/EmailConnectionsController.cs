using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Emails;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Emails;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Emails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

/// <summary>
/// Manages user email account connections (Microsoft 365, Gmail) for send-as-user functionality.
/// </summary>
[Authorize]
[ApiController]
[Route("api/email-connections")]
public class EmailConnectionsController : ControllerBase
{
    private readonly IEmailConnectionService _connectionService;
    private readonly ILogger<EmailConnectionsController> _logger;
    private readonly EmailOAuthOptions _oauthOptions;

    public EmailConnectionsController(
        IEmailConnectionService connectionService,
        ILogger<EmailConnectionsController> logger,
        IOptions<EmailOAuthOptions> oauthOptions)
    {
        _connectionService = connectionService;
        _logger = logger;
        _oauthOptions = oauthOptions.Value;
    }
    
    /// <summary>
    /// [DEV ONLY] Check OAuth config status.
    /// </summary>
    [HttpGet("diagnostics/config")]
    [AllowAnonymous]
    public IActionResult GetConfigDiagnostics()
    {
        var msConfig = _oauthOptions.Microsoft;
        return Ok(new
        {
            Microsoft = new
            {
                ClientId = msConfig.ClientId,
                ClientSecretSet = !string.IsNullOrEmpty(msConfig.ClientSecret),
                ClientSecretLength = msConfig.ClientSecret?.Length ?? 0,
                TenantId = msConfig.TenantId,
                Scopes = msConfig.Scopes
            },
            Google = new
            {
                ClientId = _oauthOptions.Google.ClientId,
                ClientSecretSet = !string.IsNullOrEmpty(_oauthOptions.Google.ClientSecret)
            }
        });
    }

    /// <summary>
    /// Gets all email accounts connected by the current user.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<EmailConnectionListResponse>> GetConnections(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var connections = await _connectionService.GetConnectionsAsync(userId.Value, cancellationToken);

        var items = connections.Select(c => new EmailConnectionItem(
            c.Id, c.Provider.ToString(), c.ProviderName, c.EmailAddress, c.DisplayName,
            c.IsPrimary, c.IsActive, c.LastSyncAtUtc, c.LastError, c.CreatedAtUtc
        ));

        return Ok(new EmailConnectionListResponse(items));
    }

    /// <summary>
    /// Gets a specific email connection.
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<EmailConnectionItem>> GetConnection(Guid id, CancellationToken cancellationToken)
    {
        var connection = await _connectionService.GetConnectionAsync(id, cancellationToken);
        if (connection == null) return NotFound();

        // Verify ownership
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        return Ok(new EmailConnectionItem(
            connection.Id, connection.Provider.ToString(), connection.ProviderName,
            connection.EmailAddress, connection.DisplayName, connection.IsPrimary,
            connection.IsActive, connection.LastSyncAtUtc, connection.LastError, connection.CreatedAtUtc
        ));
    }

    /// <summary>
    /// Initiates OAuth flow to connect an email provider.
    /// </summary>
    [HttpPost("authorize")]
    public async Task<ActionResult<StartOAuthResponse>> StartOAuth(
        [FromBody] StartOAuthRequest request,
        CancellationToken cancellationToken)
    {
        // Debug: Log all request headers and claims
        _logger.LogWarning("===== StartOAuth DEBUG =====");
        _logger.LogWarning("Authorization header present: {HasAuth}", Request.Headers.ContainsKey("Authorization"));
        if (Request.Headers.TryGetValue("Authorization", out var authHeader))
        {
            _logger.LogWarning("Authorization value: {Auth}", authHeader.ToString().Substring(0, Math.Min(50, authHeader.ToString().Length)) + "...");
        }
        _logger.LogWarning("User.Identity: Type={Type}, IsAuthenticated={IsAuth}, Name={Name}", 
            User.Identity?.GetType().Name, User.Identity?.IsAuthenticated, User.Identity?.Name);
        foreach (var claim in User.Claims.Take(10))
        {
            _logger.LogWarning("Claim: {Type} = {Value}", claim.Type, claim.Value);
        }
        _logger.LogWarning("===== END DEBUG =====");
        
        var userId = GetCurrentUserId();
        _logger.LogInformation("StartOAuth - UserId resolved: {UserId}, Provider: {Provider}", userId, request?.Provider);
        
        if (userId == null) return Unauthorized();

        if (!Enum.TryParse<EmailProvider>(request.Provider, true, out var provider))
        {
            return BadRequest(new { error = "Invalid provider. Valid values: Microsoft365, Gmail" });
        }

        var result = await _connectionService.StartOAuthAsync(userId.Value, provider, request.RedirectUri, cancellationToken);
        
        _logger.LogInformation("StartOAuth completed - AuthorizationUrl generated");
        return Ok(new StartOAuthResponse(result.AuthorizationUrl, result.State));
    }

    /// <summary>
    /// Completes OAuth flow by exchanging authorization code for tokens.
    /// </summary>
    [HttpPost("callback")]
    public async Task<ActionResult<EmailConnectionItem>> CompleteOAuth(
        [FromBody] CompleteOAuthRequest request,
        CancellationToken cancellationToken)
    {
        _logger.LogWarning("===== CompleteOAuth DEBUG =====");
        _logger.LogWarning("Request received - Provider: {Provider}, HasCode: {HasCode}, HasState: {HasState}, RedirectUri: {RedirectUri}",
            request?.Provider, !string.IsNullOrEmpty(request?.AuthorizationCode), !string.IsNullOrEmpty(request?.State), request?.RedirectUri);
        
        var userId = GetCurrentUserId();
        _logger.LogWarning("UserId resolved: {UserId}", userId);
        
        if (userId == null) return Unauthorized();

        if (!Enum.TryParse<EmailProvider>(request.Provider, true, out var provider))
        {
            _logger.LogWarning("Invalid provider: {Provider}", request.Provider);
            return BadRequest(new { error = "Invalid provider. Valid values: Microsoft365, Gmail" });
        }

        try
        {
            _logger.LogWarning("Calling CompleteOAuthAsync...");
            var connection = await _connectionService.CompleteOAuthAsync(
                userId.Value, provider, request.AuthorizationCode, request.RedirectUri, cancellationToken);

            return Ok(new EmailConnectionItem(
                connection.Id, connection.Provider.ToString(), connection.ProviderName,
                connection.EmailAddress, connection.DisplayName, connection.IsPrimary,
                connection.IsActive, connection.LastSyncAtUtc, connection.LastError, connection.CreatedAtUtc
            ));
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "OAuth token exchange failed for user {UserId} provider {Provider}: {Message}", 
                userId, provider, ex.Message);
            return BadRequest(new { error = $"OAuth failed: {ex.Message}" });
        }
    }

    /// <summary>
    /// Sets a connection as the user's primary/default email account.
    /// </summary>
    [HttpPost("{id:guid}/set-primary")]
    public async Task<IActionResult> SetPrimary(Guid id, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var success = await _connectionService.SetPrimaryAsync(userId.Value, id, cancellationToken);
        if (!success) return NotFound();

        return NoContent();
    }

    /// <summary>
    /// Tests a connection by attempting to read from the mailbox.
    /// </summary>
    [HttpPost("{id:guid}/test")]
    public async Task<ActionResult<ConnectionTestResponse>> TestConnection(Guid id, CancellationToken cancellationToken)
    {
        var result = await _connectionService.TestConnectionAsync(id, cancellationToken);
        return Ok(new ConnectionTestResponse(result.Success, result.ErrorMessage, result.InboxCount));
    }

    /// <summary>
    /// Disconnects/removes an email connection.
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Disconnect(Guid id, CancellationToken cancellationToken)
    {
        var actor = GetActor();
        var success = await _connectionService.DisconnectAsync(id, actor, cancellationToken);
        if (!success) return NotFound();

        return NoContent();
    }

    // ============ HELPER METHODS ============

    private Guid? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Guid.TryParse(userIdClaim, out var userId) ? userId : null;
    }

    private ActorContext GetActor()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = User.FindFirst(ClaimTypes.Name)?.Value;
        var userId = Guid.TryParse(userIdClaim, out var id) ? id : (Guid?)null;
        return new ActorContext(userId, userName);
    }
}
