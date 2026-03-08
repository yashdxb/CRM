using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Linq;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace CRM.Enterprise.Infrastructure.Auth;

public sealed class EntraTokenValidator : IEntraTokenValidator
{
    private readonly EntraIdOptions _options;
    private readonly ConfigurationManager<OpenIdConnectConfiguration>? _configManager;

    public EntraTokenValidator(IOptions<EntraIdOptions> options)
    {
        _options = options.Value;
        if (!_options.Enabled || string.IsNullOrWhiteSpace(_options.ClientId))
        {
            return;
        }

        var authority = ResolveAuthority(_options);
        var metadataAddress = $"{authority.TrimEnd('/')}/.well-known/openid-configuration";
        _configManager = new ConfigurationManager<OpenIdConnectConfiguration>(
            metadataAddress,
            new OpenIdConnectConfigurationRetriever(),
            new HttpDocumentRetriever { RequireHttps = true });
    }

    public async Task<EntraIdentity?> ValidateIdTokenAsync(string idToken, CancellationToken cancellationToken = default)
    {
        if (!_options.Enabled || _configManager is null || string.IsNullOrWhiteSpace(idToken))
        {
            return null;
        }

        var config = await _configManager.GetConfigurationAsync(cancellationToken);
        var validationParameters = BuildValidationParameters(config, _options);
        var handler = new JwtSecurityTokenHandler();

        try
        {
            var principal = handler.ValidateToken(idToken, validationParameters, out _);
            var oid = principal.FindFirstValue("oid");
            var tid = principal.FindFirstValue("tid");
            if (string.IsNullOrWhiteSpace(oid) || string.IsNullOrWhiteSpace(tid))
            {
                return null;
            }

            if (_options.AllowedTenantIds.Length > 0 &&
                !_options.AllowedTenantIds.Contains(tid, StringComparer.OrdinalIgnoreCase))
            {
                return null;
            }

            var upn = principal.FindFirstValue("preferred_username")
                ?? principal.FindFirstValue("upn");
            var email = upn
                ?? principal.FindFirstValue(ClaimTypes.Email)
                ?? principal.FindFirstValue("email");
            var displayName = principal.FindFirstValue("name") ?? principal.FindFirstValue(ClaimTypes.Name);
            var groupIds = principal.FindAll("groups")
                .Select(claim => claim.Value)
                .Where(value => !string.IsNullOrWhiteSpace(value))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToArray();
            return new EntraIdentity(oid, tid, email, displayName, upn, groupIds);
        }
        catch (SecurityTokenException)
        {
            return null;
        }
        catch (ArgumentException)
        {
            return null;
        }
    }

    private static string ResolveAuthority(EntraIdOptions options)
    {
        if (!string.IsNullOrWhiteSpace(options.Authority))
        {
            return options.Authority;
        }

        var tenantId = string.IsNullOrWhiteSpace(options.TenantId) ? "organizations" : options.TenantId;
        return $"https://login.microsoftonline.com/{tenantId}/v2.0";
    }

    private static TokenValidationParameters BuildValidationParameters(
        OpenIdConnectConfiguration config,
        EntraIdOptions options)
    {
        var authority = ResolveAuthority(options);
        var validIssuer = authority.TrimEnd('/');

        var validateIssuer = !string.Equals(options.TenantId, "common", StringComparison.OrdinalIgnoreCase) &&
                             !string.Equals(options.TenantId, "organizations", StringComparison.OrdinalIgnoreCase);

        return new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKeys = config.SigningKeys,
            ValidateIssuer = validateIssuer,
            ValidIssuer = validIssuer,
            ValidateAudience = true,
            ValidAudience = options.ClientId,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(2)
        };
    }
}
