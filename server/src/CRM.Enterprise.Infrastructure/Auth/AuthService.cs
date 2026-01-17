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
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CRM.Enterprise.Infrastructure.Auth;

public class AuthService : IAuthService
{
    private readonly CrmDbContext _dbContext;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly JwtOptions _options;
    private readonly ITenantProvider _tenantProvider;
    private readonly LoginLocationService _loginLocationService;

    public AuthService(
        CrmDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        IOptions<JwtOptions> options,
        ITenantProvider tenantProvider,
        LoginLocationService loginLocationService)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _options = options.Value;
        _tenantProvider = tenantProvider;
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
        var query = _dbContext.Users
            .IgnoreQueryFilters()
            .Where(u => u.IsActive && !u.IsDeleted);

        if (tenantId != Guid.Empty)
        {
            query = query.Where(u => u.TenantId == tenantId);
        }

        var user = await query.FirstOrDefaultAsync(u =>
                    (u.EmailNormalized == normalizedEmail ||
                     (u.EmailNormalized == null && u.Email.ToLower() == normalizedEmail)) &&
                    u.IsActive && !u.IsDeleted,
                cancellationToken);
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
        var token = CreateToken(user, roleNames, permissionKeys, expiresAtUtc);
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

        return new AuthResult(token, expiresAtUtc, user.Email, user.FullName, roleNames, permissionKeys, tenantKey);
    }

    private static string NormalizeEmail(string? email)
    {
        return (email ?? string.Empty).Trim().ToLowerInvariant();
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
