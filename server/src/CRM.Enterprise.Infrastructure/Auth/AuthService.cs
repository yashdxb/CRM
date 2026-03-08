using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CRM.Enterprise.Application.Auth;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CRM.Enterprise.Infrastructure.Auth;

public class AuthService : IAuthService
{
    private readonly CrmDbContext _dbContext;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly JwtOptions _options;
    private readonly ITenantProvider _tenantProvider;
    private readonly string _defaultTenantKey;
    private readonly LoginLocationService _loginLocationService;
    private readonly IEntraTokenValidator _entraTokenValidator;
    private readonly IAuditEventService _auditEventService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        CrmDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        IOptions<JwtOptions> options,
        ITenantProvider tenantProvider,
        IConfiguration configuration,
        LoginLocationService loginLocationService,
        IEntraTokenValidator entraTokenValidator,
        IAuditEventService auditEventService,
        ILogger<AuthService> logger)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _options = options.Value;
        _tenantProvider = tenantProvider;
        _configuration = configuration;
        _defaultTenantKey = configuration["Tenant:DefaultKey"] ?? "default";
        _loginLocationService = loginLocationService;
        _entraTokenValidator = entraTokenValidator;
        _auditEventService = auditEventService;
        _logger = logger;
    }

    public async Task<AuthResult?> SignInAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = NormalizeEmail(email);
        if (string.IsNullOrWhiteSpace(normalizedEmail))
        {
            return null;
        }

        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            var resolvedTenant = await ResolveTenantForLoginAsync(normalizedEmail, cancellationToken);
            tenantId = resolvedTenant.TenantId;
            if (tenantId == Guid.Empty && resolvedTenant.HasMatches)
            {
                return null;
            }

            if (tenantId == Guid.Empty)
            {
                tenantId = await ResolveDefaultTenantIdAsync(cancellationToken);
                if (tenantId == Guid.Empty)
                {
                    return null;
                }

                _tenantProvider.SetTenant(tenantId, _defaultTenantKey);
            }
        }

        var user = await _dbContext.Users
            .IgnoreQueryFilters()
            .Where(u =>
                u.TenantId == tenantId &&
                u.IsActive &&
                !u.IsDeleted &&
                u.Audience != UserAudience.External &&
                (u.EmailNormalized == normalizedEmail ||
                 (u.EmailNormalized == null && u.Email.ToLower() == normalizedEmail)))
            .FirstOrDefaultAsync(cancellationToken);
        if (user is null || string.IsNullOrWhiteSpace(user.PasswordHash))
        {
            return null;
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        if (!string.Equals(user.Email, normalizedEmail, StringComparison.Ordinal))
        {
            user.Email = normalizedEmail;
        }
        if (!string.Equals(user.EmailNormalized, normalizedEmail, StringComparison.Ordinal))
        {
            user.EmailNormalized = normalizedEmail;
        }

        return await BuildAuthResultAsync(user, "local", cancellationToken);
    }

    public async Task<EntraSignInResult> SignInWithEntraIdTokenAsync(string idToken, CancellationToken cancellationToken = default)
    {
        var identity = await _entraTokenValidator.ValidateIdTokenAsync(idToken, cancellationToken);
        if (identity is null)
        {
            return EntraSignInResult.Failure("token_invalid", "Microsoft sign-in token validation failed.");
        }

        var normalizedEmail = NormalizeEmail(identity.Email);
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            var resolvedTenant = await ResolveTenantForEntraLoginAsync(identity, normalizedEmail, cancellationToken);
            tenantId = resolvedTenant.TenantId;
            if (tenantId == Guid.Empty && resolvedTenant.HasMatches)
            {
                _logger.LogInformation(
                    "Entra login failed to resolve tenant for oid {ObjectId}; email {Email}; tenant candidates existed.",
                    identity.ObjectId,
                    normalizedEmail);
                return EntraSignInResult.Failure("email_conflict", "Multiple tenant matches were found for this Microsoft account.");
            }

            if (tenantId == Guid.Empty)
            {
                tenantId = await ResolveDefaultTenantIdAsync(cancellationToken);
                if (tenantId == Guid.Empty)
                {
                    _logger.LogWarning("Entra login failed because no default tenant was available for oid {ObjectId}.", identity.ObjectId);
                    return EntraSignInResult.Failure("tenant_mismatch", "No CRM tenant could be resolved for this Microsoft account.");
                }

                _tenantProvider.SetTenant(tenantId, _defaultTenantKey);
            }
        }

        var user = await _dbContext.Users
            .IgnoreQueryFilters()
            .Where(u =>
                u.TenantId == tenantId &&
                u.IsActive &&
                !u.IsDeleted &&
                u.Audience != UserAudience.External &&
                u.EntraObjectId == identity.ObjectId &&
                u.EntraTenantId == identity.TenantId)
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null && string.IsNullOrWhiteSpace(normalizedEmail))
        {
            _logger.LogInformation(
                "Entra login rejected for oid {ObjectId}; no bound CRM user and no email claim was present.",
                identity.ObjectId);
            return EntraSignInResult.Failure("identity_not_linked", "This Microsoft account is not linked to a CRM user.");
        }

        var firstTimeBind = false;
        if (user is null)
        {
            var boundTenantIds = await _dbContext.Users
                .IgnoreQueryFilters()
                .Where(u =>
                    u.IsActive &&
                    !u.IsDeleted &&
                    u.Audience != UserAudience.External &&
                    u.EntraObjectId == identity.ObjectId &&
                    u.EntraTenantId == identity.TenantId)
                .Select(u => u.TenantId)
                .Distinct()
                .ToListAsync(cancellationToken);

            if (boundTenantIds.Count > 0)
            {
                _logger.LogInformation(
                    "Entra login tenant mismatch for oid {ObjectId}; requested tenant {TenantId}; bound tenants {BoundTenantIds}.",
                    identity.ObjectId,
                    tenantId,
                    string.Join(',', boundTenantIds));
                return EntraSignInResult.Failure("tenant_mismatch", "This Microsoft account is linked to a different CRM tenant.");
            }

            var matchingUsers = await _dbContext.Users
                .IgnoreQueryFilters()
                .Where(u =>
                    u.TenantId == tenantId &&
                    u.IsActive &&
                    !u.IsDeleted &&
                    u.Audience != UserAudience.External &&
                    (u.EmailNormalized == normalizedEmail ||
                     (u.EmailNormalized == null && u.Email.ToLower() == normalizedEmail)))
                .ToListAsync(cancellationToken);

            if (matchingUsers.Count == 0)
            {
                var externalMatches = await _dbContext.Users
                    .IgnoreQueryFilters()
                    .Where(u =>
                        u.TenantId == tenantId &&
                        u.IsActive &&
                        !u.IsDeleted &&
                        u.Audience == UserAudience.External &&
                        (u.EmailNormalized == normalizedEmail ||
                         (u.EmailNormalized == null && u.Email.ToLower() == normalizedEmail)))
                    .AnyAsync(cancellationToken);

                if (externalMatches)
                {
                    _logger.LogInformation(
                        "Entra login rejected for oid {ObjectId}; tenant {TenantId}; external audience match for email {Email}.",
                        identity.ObjectId,
                        tenantId,
                        normalizedEmail);
                    return EntraSignInResult.Failure("external_audience_blocked", "External users cannot sign in to the internal CRM workspace.");
                }

                _logger.LogInformation(
                    "Entra login rejected for oid {ObjectId}; tenant {TenantId}; no CRM user matched email {Email}.",
                    identity.ObjectId,
                    tenantId,
                    normalizedEmail);
                return EntraSignInResult.Failure("identity_not_linked", "This Microsoft account is not linked to a CRM user.");
            }

            if (matchingUsers.Count > 1)
            {
                _logger.LogInformation(
                    "Entra login rejected for oid {ObjectId}; tenant {TenantId}; multiple CRM users matched email {Email}.",
                    identity.ObjectId,
                    tenantId,
                    normalizedEmail);
                return EntraSignInResult.Failure("email_conflict", "Multiple CRM users match this Microsoft account email.");
            }

            user = matchingUsers[0];
            if (!string.IsNullOrWhiteSpace(user.EntraObjectId) || !string.IsNullOrWhiteSpace(user.EntraTenantId))
            {
                _logger.LogInformation(
                    "Entra login rejected for oid {ObjectId}; CRM user {UserId} already linked to a different Microsoft identity.",
                    identity.ObjectId,
                    user.Id);
                return EntraSignInResult.Failure("identity_not_linked", "This CRM user is already linked to another Microsoft identity.");
            }

            user.EntraObjectId = identity.ObjectId;
            user.EntraTenantId = identity.TenantId;
            user.EntraUpn = NormalizeOptionalValue(identity.UserPrincipalName ?? identity.Email);
            firstTimeBind = true;
        }

        if (user.Audience == UserAudience.External)
        {
            _logger.LogInformation(
                "Entra login rejected for oid {ObjectId}; CRM user {UserId} is external audience.",
                identity.ObjectId,
                user.Id);
            return EntraSignInResult.Failure("external_audience_blocked", "External users cannot sign in to the internal CRM workspace.");
        }

        if (!string.Equals(user.Email, normalizedEmail, StringComparison.Ordinal) && !string.IsNullOrWhiteSpace(normalizedEmail))
        {
            user.Email = normalizedEmail;
        }
        if (!string.Equals(user.EmailNormalized, normalizedEmail, StringComparison.Ordinal) && !string.IsNullOrWhiteSpace(normalizedEmail))
        {
            user.EmailNormalized = normalizedEmail;
        }
        user.EntraObjectId = identity.ObjectId;
        user.EntraTenantId = identity.TenantId;
        user.EntraUpn = NormalizeOptionalValue(identity.UserPrincipalName ?? identity.Email);

        if (firstTimeBind)
        {
            await _auditEventService.TrackAsync(
                new AuditEventEntry(
                    nameof(User),
                    user.Id,
                    "EntraBound",
                    "EntraObjectId",
                    null,
                    identity.ObjectId,
                    user.Id,
                    user.FullName),
                cancellationToken);
        }

        var authResult = await BuildAuthResultAsync(user, "entra", cancellationToken);
        return EntraSignInResult.Success(authResult);
    }

    public Task<PublicAuthConfig> GetPublicAuthConfigAsync(string? origin, CancellationToken cancellationToken = default)
    {
        var localLoginEnabled = _configuration.GetValue<bool?>("EntraId:LocalLoginEnabled") ?? true;
        var entraEnabled = ResolveEntraAvailabilityForTenant();
        var clientId = _configuration["EntraId:ClientId"] ?? string.Empty;
        var authority = ResolveEntraAuthority();
        var redirectUri = ResolveRedirectUri(origin);

        return Task.FromResult(new PublicAuthConfig(
            localLoginEnabled,
            new PublicEntraAuthConfig(entraEnabled, clientId, authority, redirectUri)));
    }

    public async Task<PasswordChangeResult?> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword, CancellationToken cancellationToken = default)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (user is null || string.IsNullOrWhiteSpace(user.PasswordHash))
        {
            return null;
        }

        var currentCheck = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, currentPassword);
        if (currentCheck == PasswordVerificationResult.Failed)
        {
            return null;
        }

        user.PasswordHash = _passwordHasher.HashPassword(user, newPassword);
        // Clear the change-password flag so the user can access the app normally.
        user.MustChangePassword = false;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new PasswordChangeResult(user.Email, user.FullName);
    }

    public async Task<bool> AcceptInviteAsync(string token, string newPassword, CancellationToken cancellationToken = default)
    {
        var normalizedToken = token?.Trim();
        if (string.IsNullOrWhiteSpace(normalizedToken) || string.IsNullOrWhiteSpace(newPassword))
        {
            return false;
        }

        var tokenHash = InviteTokenHelper.HashToken(normalizedToken);
        var now = DateTime.UtcNow;
        var user = await _dbContext.Users
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(u =>
                    !u.IsDeleted &&
                    u.InviteTokenHash == tokenHash &&
                    u.InviteTokenExpiresAtUtc != null &&
                    u.InviteTokenExpiresAtUtc > now,
                cancellationToken);
        if (user is null || string.IsNullOrWhiteSpace(user.PasswordHash))
        {
            return false;
        }

        user.PasswordHash = _passwordHasher.HashPassword(user, newPassword);
        user.MustChangePassword = false;
        user.InviteTokenHash = null;
        user.InviteTokenExpiresAtUtc = null;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<InviteTokenStatus> GetInviteStatusAsync(string token, CancellationToken cancellationToken = default)
    {
        var normalizedToken = token?.Trim();
        if (string.IsNullOrWhiteSpace(normalizedToken))
        {
            return InviteTokenStatus.Invalid;
        }

        var tokenHash = InviteTokenHelper.HashToken(normalizedToken);
        var user = await _dbContext.Users
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(u => !u.IsDeleted && u.InviteTokenHash == tokenHash, cancellationToken);
        if (user is null || user.InviteTokenExpiresAtUtc is null)
        {
            return InviteTokenStatus.Invalid;
        }

        return user.InviteTokenExpiresAtUtc > DateTime.UtcNow
            ? InviteTokenStatus.Valid
            : InviteTokenStatus.Expired;
    }

    private static string NormalizeEmail(string? email)
    {
        return (email ?? string.Empty).Trim().ToLowerInvariant();
    }

    private static string? NormalizeOptionalValue(string? value)
    {
        var normalized = value?.Trim();
        return string.IsNullOrWhiteSpace(normalized) ? null : normalized;
    }

    private Task<Guid> ResolveDefaultTenantIdAsync(CancellationToken cancellationToken)
    {
        return _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Key == _defaultTenantKey)
            .Select(t => t.Id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<(Guid TenantId, bool HasMatches)> ResolveTenantForLoginAsync(string normalizedEmail, CancellationToken cancellationToken)
    {
        var tenantIds = await _dbContext.Users
            .IgnoreQueryFilters()
            .Where(u =>
                u.IsActive &&
                !u.IsDeleted &&
                (u.EmailNormalized == normalizedEmail ||
                 (u.EmailNormalized == null && u.Email.ToLower() == normalizedEmail)))
            .Select(u => u.TenantId)
            .Distinct()
            .ToListAsync(cancellationToken);

        if (tenantIds.Count == 0)
        {
            return (Guid.Empty, false);
        }

        if (tenantIds.Count != 1)
        {
            return (Guid.Empty, true);
        }

        var resolvedTenantId = tenantIds[0];
        var resolvedTenantKey = await _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == resolvedTenantId)
            .Select(t => t.Key)
            .FirstOrDefaultAsync(cancellationToken);

        if (string.IsNullOrWhiteSpace(resolvedTenantKey))
        {
            return (Guid.Empty, true);
        }

        _tenantProvider.SetTenant(resolvedTenantId, resolvedTenantKey);
        return (resolvedTenantId, true);
    }

    private async Task<(Guid TenantId, bool HasMatches)> ResolveTenantForEntraLoginAsync(
        EntraIdentity identity,
        string normalizedEmail,
        CancellationToken cancellationToken)
    {
        var boundTenantIds = await _dbContext.Users
            .IgnoreQueryFilters()
            .Where(u =>
                u.IsActive &&
                !u.IsDeleted &&
                u.Audience != UserAudience.External &&
                u.EntraObjectId == identity.ObjectId &&
                u.EntraTenantId == identity.TenantId)
            .Select(u => u.TenantId)
            .Distinct()
            .ToListAsync(cancellationToken);

        if (boundTenantIds.Count == 1)
        {
            var boundTenantKey = await _dbContext.Tenants
                .AsNoTracking()
                .Where(t => t.Id == boundTenantIds[0])
                .Select(t => t.Key)
                .FirstOrDefaultAsync(cancellationToken);

            if (!string.IsNullOrWhiteSpace(boundTenantKey))
            {
                _tenantProvider.SetTenant(boundTenantIds[0], boundTenantKey);
                return (boundTenantIds[0], true);
            }
        }

        if (!string.IsNullOrWhiteSpace(normalizedEmail))
        {
            return await ResolveTenantForLoginAsync(normalizedEmail, cancellationToken);
        }

        return (Guid.Empty, false);
    }

    private async Task<AuthResult> BuildAuthResultAsync(User user, string authMethod, CancellationToken cancellationToken)
    {
        var userRoles = await _dbContext.UserRoles
            .IgnoreQueryFilters()
            .Where(ur => ur.UserId == user.Id)
            .ToListAsync(cancellationToken);

        var roleIds = userRoles.Select(ur => ur.RoleId).Distinct().ToList();

        var roles = await _dbContext.Roles
            .IgnoreQueryFilters()
            .Where(r => roleIds.Contains(r.Id) && !r.IsDeleted)
            .ToListAsync(cancellationToken);

        var rolePermissions = await _dbContext.RolePermissions
            .IgnoreQueryFilters()
            .Where(rp => roleIds.Contains(rp.RoleId) && !rp.IsDeleted)
            .ToListAsync(cancellationToken);

        var needsSave = false;
        foreach (var link in userRoles.Where(ur => ur.TenantId == Guid.Empty))
        {
            link.TenantId = user.TenantId;
            needsSave = true;
        }
        foreach (var role in roles.Where(r => r.TenantId == Guid.Empty))
        {
            role.TenantId = user.TenantId;
            needsSave = true;
        }
        foreach (var perm in rolePermissions.Where(rp => rp.TenantId == Guid.Empty))
        {
            perm.TenantId = user.TenantId;
            needsSave = true;
        }

        if (needsSave)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        var roleNames = roles
            .Select(role => role.Name)
            .Distinct()
            .ToList();

        var permissionKeys = rolePermissions
            .Where(rp => !string.IsNullOrWhiteSpace(rp.Permission))
            .Select(rp => rp.Permission)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var expiresAtUtc = DateTime.UtcNow.AddMinutes(_options.ExpiresMinutes);
        var accessToken = CreateToken(user, roleNames, permissionKeys, expiresAtUtc);
        var tenantKey = await _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == user.TenantId)
            .Select(t => t.Key)
            .FirstOrDefaultAsync(cancellationToken) ?? string.Empty;

        var loginInfo = await _loginLocationService.ResolveAsync(cancellationToken);
        user.LastLoginAtUtc = DateTime.UtcNow;
        user.LastLoginIp = loginInfo.Ip;
        user.LastLoginLocation = loginInfo.Location;
        user.LastLoginDeviceType = loginInfo.DeviceType;
        user.LastLoginPlatform = loginInfo.Platform;
        await _auditEventService.TrackAsync(
            new AuditEventEntry(
                nameof(User),
                user.Id,
                authMethod.Equals("entra", StringComparison.OrdinalIgnoreCase) ? "EntraLoginSucceeded" : "LocalLoginSucceeded",
                "AuthMethod",
                null,
                authMethod,
                user.Id,
                user.FullName),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new AuthResult(accessToken, expiresAtUtc, user.Email, user.FullName, roleNames, permissionKeys, tenantKey, user.MustChangePassword);
    }

    private bool ResolveEntraAvailabilityForTenant()
    {
        var globalEnabled = _configuration.GetValue<bool?>("EntraId:Enabled") ?? false;
        if (!globalEnabled)
        {
            return false;
        }

        var tenantKey = _tenantProvider.TenantKey;
        if (_tenantProvider.TenantId == Guid.Empty || string.IsNullOrWhiteSpace(tenantKey))
        {
            return string.Equals(_defaultTenantKey, "default", StringComparison.OrdinalIgnoreCase);
        }

        var tenant = _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefault(t => t.Id == _tenantProvider.TenantId);
        if (tenant is null || string.IsNullOrWhiteSpace(tenant.FeatureFlagsJson))
        {
            return string.Equals(tenantKey, "default", StringComparison.OrdinalIgnoreCase);
        }

        try
        {
            var flags = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, bool>>(tenant.FeatureFlagsJson);
            if (flags is not null && flags.TryGetValue("auth.entra", out var enabled))
            {
                return enabled;
            }
        }
        catch (System.Text.Json.JsonException)
        {
        }

        return string.Equals(tenantKey, "default", StringComparison.OrdinalIgnoreCase);
    }

    private string ResolveEntraAuthority()
    {
        var configuredAuthority = _configuration["EntraId:Authority"];
        if (!string.IsNullOrWhiteSpace(configuredAuthority))
        {
            return configuredAuthority;
        }

        var tenantId = _configuration["EntraId:TenantId"];
        if (string.IsNullOrWhiteSpace(tenantId))
        {
            tenantId = "organizations";
        }

        return $"https://login.microsoftonline.com/{tenantId}";
    }

    private string ResolveRedirectUri(string? origin)
    {
        var trimmedOrigin = origin?.Trim().TrimEnd('/');
        if (!string.IsNullOrWhiteSpace(trimmedOrigin))
        {
            return $"{trimmedOrigin}/login";
        }

        var configuredOrigin = _configuration["Frontend:BaseUrl"]?.Trim().TrimEnd('/');
        if (!string.IsNullOrWhiteSpace(configuredOrigin))
        {
            return $"{configuredOrigin}/login";
        }

        return "/login";
    }

    private string CreateToken(User user, IReadOnlyCollection<string> roles, IReadOnlyCollection<string> permissions, DateTime expiresAtUtc)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.UniqueName, user.FullName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        foreach (var permission in permissions)
        {
            claims.Add(new Claim(Permissions.ClaimType, permission));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _options.Issuer,
            audience: _options.Audience,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: expiresAtUtc,
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
