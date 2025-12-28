using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CRM.Enterprise.Application.Auth;
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

    public AuthService(CrmDbContext dbContext, IPasswordHasher<User> passwordHasher, IOptions<JwtOptions> options)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _options = options.Value;
    }

    public async Task<AuthResult?> SignInAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        var user = await _dbContext.Users
            .Include(u => u.Roles)
                .ThenInclude(ur => ur.Role)
                    .ThenInclude(role => role!.Permissions)
            .FirstOrDefaultAsync(u => u.Email == email && u.IsActive && !u.IsDeleted, cancellationToken);
        if (user is null || string.IsNullOrWhiteSpace(user.PasswordHash))
        {
            return null;
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        var roleNames = user.Roles
            .Where(ur => ur.Role is not null && !ur.Role.IsDeleted)
            .Select(ur => ur.Role!.Name)
            .Distinct()
            .ToList();

        var permissionKeys = user.Roles
            .Where(ur => ur.Role is not null && !ur.Role.IsDeleted)
            .SelectMany(ur => ur.Role!.Permissions)
            .Where(rp => !rp.IsDeleted && !string.IsNullOrWhiteSpace(rp.Permission))
            .Select(rp => rp.Permission)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var expiresAtUtc = DateTime.UtcNow.AddMinutes(_options.ExpiresMinutes);
        var token = CreateToken(user, roleNames, permissionKeys, expiresAtUtc);
        user.LastLoginAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new AuthResult(token, expiresAtUtc, user.Email, user.FullName, roleNames, permissionKeys);
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
