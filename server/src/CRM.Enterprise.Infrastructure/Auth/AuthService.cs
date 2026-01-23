using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CRM.Enterprise.Application.Auth;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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

    public AuthService(
        CrmDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        IOptions<JwtOptions> options,
        ITenantProvider tenantProvider,
        IConfiguration configuration,
        LoginLocationService loginLocationService)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _options = options.Value;
        _tenantProvider = tenantProvider;
        _defaultTenantKey = configuration["Tenant:DefaultKey"] ?? "default";
        _loginLocationService = loginLocationService;
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
            tenantId = await ResolveDefaultTenantIdAsync(cancellationToken);
            if (tenantId == Guid.Empty)
            {
                return null;
            }

            _tenantProvider.SetTenant(tenantId, _defaultTenantKey);
        }

        var user = await _dbContext.Users
            .IgnoreQueryFilters()
            .Where(u =>
                u.TenantId == tenantId &&
                u.IsActive &&
                !u.IsDeleted &&
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

        return await BuildAuthResultAsync(user, cancellationToken);
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

    private Task<Guid> ResolveDefaultTenantIdAsync(CancellationToken cancellationToken)
    {
        return _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Key == _defaultTenantKey)
            .Select(t => t.Id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<AuthResult> BuildAuthResultAsync(User user, CancellationToken cancellationToken)
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
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new AuthResult(accessToken, expiresAtUtc, user.Email, user.FullName, roleNames, permissionKeys, tenantKey, user.MustChangePassword);
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
