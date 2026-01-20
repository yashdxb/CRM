using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading;
using CRM.Enterprise.Api.Contracts.Users;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/users")]
[Authorize(Policy = Permissions.Policies.AdministrationView)]
public class UsersController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IEmailSender _emailSender;
    private readonly ILogger<UsersController> _logger;
    private readonly CRM.Enterprise.Infrastructure.Presence.IPresenceTracker _presenceTracker;
    private readonly string? _brandLogoUrl;
    private readonly string? _brandWebsiteUrl;

    public UsersController(
        CrmDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        IEmailSender emailSender,
        IConfiguration configuration,
        ILogger<UsersController> logger,
        CRM.Enterprise.Infrastructure.Presence.IPresenceTracker presenceTracker)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _emailSender = emailSender;
        _brandLogoUrl = configuration["Branding:LogoUrl"];
        _brandWebsiteUrl = configuration["Branding:WebsiteUrl"];
        _logger = logger;
        _presenceTracker = presenceTracker;
    }

    [HttpGet]
    public async Task<ActionResult<UserSearchResponse>> SearchUsers(
        [FromQuery] string? search,
        [FromQuery] bool includeInactive = false,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 25,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _dbContext.Users
            .AsNoTracking()
            .Where(u => !u.IsDeleted);

        if (!includeInactive)
        {
            query = query.Where(u => u.IsActive);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(u =>
                u.FullName.Contains(term) ||
                u.Email.Contains(term));
        }

        var total = await query.CountAsync(cancellationToken);

        var data = await query
            .OrderByDescending(u => u.IsActive)
            .ThenBy(u => u.FullName)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(u => new
            {
                u.Id,
                u.FullName,
                u.Email,
                u.IsActive,
                u.CreatedAtUtc,
                u.LastLoginAtUtc,
                u.LastLoginLocation,
                u.LastLoginIp,
                u.TimeZone,
                Roles = u.Roles.Where(ur => ur.Role != null).Select(ur => ur.Role!.Name)
            })
            .ToListAsync(cancellationToken);

        var onlineUsers = new HashSet<string>(_presenceTracker.GetOnlineUsers(), StringComparer.OrdinalIgnoreCase);
        var items = data.Select(u => new UserListItem(
            u.Id,
            u.FullName,
            u.Email,
            u.Roles.Where(r => !string.IsNullOrWhiteSpace(r)).ToList(),
            u.IsActive,
            u.CreatedAtUtc,
            u.LastLoginAtUtc,
            u.TimeZone,
            u.LastLoginLocation,
            u.LastLoginIp,
            onlineUsers.Contains(u.Id.ToString()))).ToList();

        return Ok(new UserSearchResponse(items, total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<UserDetailResponse>> GetUser(Guid id, CancellationToken cancellationToken = default)
    {
        var detail = await BuildDetailResponseAsync(id, cancellationToken);
        return detail is null ? NotFound() : Ok(detail);
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<UserDetailResponse>> CreateUser([FromBody] UpsertUserRequest request, CancellationToken cancellationToken = default)
    {
        var roleIds = request.RoleIds?.ToList() ?? new List<Guid>();
        if (!IsRoleSelectionValid(roleIds))
        {
            return BadRequest("At least one role must be assigned.");
        }

        var normalizedEmail = NormalizeEmail(request.Email);
        if (string.IsNullOrWhiteSpace(normalizedEmail))
        {
            return BadRequest("Email is required.");
        }

        var exists = await _dbContext.Users
            .AnyAsync(u =>
                !u.IsDeleted &&
                (u.EmailNormalized == normalizedEmail ||
                 (u.EmailNormalized == null && u.Email.ToLower() == normalizedEmail)),
                cancellationToken);
        if (exists)
        {
            return Conflict("A user with that email already exists.");
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = normalizedEmail,
            EmailNormalized = normalizedEmail,
            TimeZone = string.IsNullOrWhiteSpace(request.TimeZone) ? "UTC" : request.TimeZone,
            Locale = string.IsNullOrWhiteSpace(request.Locale) ? "en-US" : request.Locale,
            IsActive = request.IsActive,
            // Invited users must replace the temporary password on first sign-in.
            MustChangePassword = true,
            CreatedAtUtc = DateTime.UtcNow
        };

        var password = string.IsNullOrWhiteSpace(request.TemporaryPassword)
            ? PasswordGenerator.CreateStrongPassword()
            : request.TemporaryPassword;
        user.PasswordHash = _passwordHasher.HashPassword(user, password);

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        await AssignRolesAsync(user, roleIds, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        await SendInviteEmailAsync(user, password, cancellationToken);

        var detail = await BuildDetailResponseAsync(user.Id, cancellationToken);
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, detail);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpsertUserRequest request, CancellationToken cancellationToken = default)
    {
        var roleIds = request.RoleIds?.ToList() ?? new List<Guid>();
        if (!IsRoleSelectionValid(roleIds))
        {
            return BadRequest("At least one role must be assigned.");
        }

        var normalizedEmail = NormalizeEmail(request.Email);
        if (string.IsNullOrWhiteSpace(normalizedEmail))
        {
            return BadRequest("Email is required.");
        }

        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted, cancellationToken);
        if (user is null)
        {
            return NotFound();
        }

        var exists = await _dbContext.Users
            .AnyAsync(u =>
                u.Id != user.Id &&
                !u.IsDeleted &&
                (u.EmailNormalized == normalizedEmail ||
                 (u.EmailNormalized == null && u.Email.ToLower() == normalizedEmail)),
                cancellationToken);
        if (exists)
        {
            return Conflict("A user with that email already exists.");
        }

        user.FullName = request.FullName;
        user.Email = normalizedEmail;
        user.EmailNormalized = normalizedEmail;
        user.TimeZone = request.TimeZone;
        user.Locale = request.Locale;
        user.IsActive = request.IsActive;

        await AssignRolesAsync(user, roleIds, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return NoContent();
    }

    [HttpPost("{id:guid}/reset-password")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<IActionResult> ResetPassword(Guid id, [FromBody] ResetPasswordRequest request, CancellationToken cancellationToken = default)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted, cancellationToken);
        if (user is null)
        {
            return NotFound();
        }

        var password = string.IsNullOrWhiteSpace(request.TemporaryPassword)
            ? PasswordGenerator.CreateStrongPassword()
            : request.TemporaryPassword;
        user.PasswordHash = _passwordHasher.HashPassword(user, password);
        // Enforce a reset on the next login when admins issue a temporary password.
        user.MustChangePassword = true;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPost("{id:guid}/activate")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<IActionResult> Activate(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted, cancellationToken);
        if (user is null)
        {
            return NotFound();
        }

        if (IsCurrentUser(user.Id))
        {
            return BadRequest("You cannot change your own status.");
        }

        user.IsActive = true;
        user.DeletedAtUtc = null;
        user.IsDeleted = false;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPost("{id:guid}/deactivate")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<IActionResult> Deactivate(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted, cancellationToken);
        if (user is null)
        {
            return NotFound();
        }

        if (IsCurrentUser(user.Id))
        {
            return BadRequest("You cannot change your own status.");
        }

        user.IsActive = false;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted, cancellationToken);
        if (user is null)
        {
            return NotFound();
        }

        if (IsCurrentUser(user.Id))
        {
            return BadRequest("You cannot remove your own account.");
        }

        user.IsDeleted = true;
        user.DeletedAtUtc = DateTime.UtcNow;
        user.IsActive = false;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private async Task AssignRolesAsync(User user, IReadOnlyCollection<Guid> roleIds, CancellationToken cancellationToken)
    {
        var existingLinks = await _dbContext.UserRoles.Where(ur => ur.UserId == user.Id).ToListAsync(cancellationToken);
        _dbContext.UserRoles.RemoveRange(existingLinks);

        if (roleIds.Count == 0)
        {
            return;
        }

        var validRoleIds = await _dbContext.Roles
            .Where(r => roleIds.Contains(r.Id) && !r.IsDeleted)
            .Select(r => r.Id)
            .ToListAsync(cancellationToken);

        foreach (var roleId in validRoleIds)
        {
            _dbContext.UserRoles.Add(new UserRole
            {
                UserId = user.Id,
                RoleId = roleId
            });
        }
    }

    private static bool IsRoleSelectionValid(IReadOnlyCollection<Guid>? roleIds)
        => roleIds is { Count: > 0 };

    private async Task<UserDetailResponse?> BuildDetailResponseAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Users
            .Where(u => u.Id == id && !u.IsDeleted)
            .Select(u => new UserDetailResponse(
                u.Id,
                u.FullName,
                u.Email,
                u.TimeZone,
                u.Locale,
                u.IsActive,
                u.CreatedAtUtc,
                u.LastLoginAtUtc,
                u.Roles.Where(ur => ur.Role != null).Select(ur => ur.RoleId).ToList(),
                u.Roles.Where(ur => ur.Role != null).Select(ur => ur.Role!.Name).ToList()))
            .FirstOrDefaultAsync(cancellationToken);
    }

    private static class PasswordGenerator
    {
        private const string Alphabet = "abcdefghijklmnopqrstuvwxyz";
        private const string Upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string Digits = "0123456789";
        private const string Symbols = "!@$?*#";

        public static string CreateStrongPassword(int length = 14)
        {
            var pool = Alphabet + Upper + Digits + Symbols;
            return new string(Enumerable.Range(0, length)
                .Select(_ => pool[RandomNumberGenerator.GetInt32(pool.Length)])
                .ToArray());
        }
    }

    private bool IsCurrentUser(Guid userId)
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var currentUserId) && currentUserId == userId;
    }

    private static string NormalizeEmail(string? email)
    {
        return (email ?? string.Empty).Trim().ToLowerInvariant();
    }

    private async Task SendInviteEmailAsync(User user, string temporaryPassword, CancellationToken cancellationToken)
    {
        var origin = Request.Headers.Origin.FirstOrDefault();
        var baseUrl = string.IsNullOrWhiteSpace(origin)
            ? $"{Request.Scheme}://{Request.Host}"
            : origin;
        var loginUrl = $"{baseUrl.TrimEnd('/')}/login";
        var websiteUrl = string.IsNullOrWhiteSpace(_brandWebsiteUrl) ? baseUrl : _brandWebsiteUrl;
        var logoUrl = string.IsNullOrWhiteSpace(_brandLogoUrl) ? null : _brandLogoUrl;
        var encodedWebsiteUrl = System.Net.WebUtility.HtmlEncode(websiteUrl);
        var encodedLogoUrl = logoUrl is null ? null : System.Net.WebUtility.HtmlEncode(logoUrl);
        var logoSection = encodedLogoUrl is null
            ? string.Empty
            : $@"
                <tr>
                  <td style=""padding:28px 32px 4px;"">
                    <a href=""{encodedWebsiteUrl}"" style=""display:inline-block; text-decoration:none;"">
                      <img src=""{encodedLogoUrl}"" alt=""CRM Enterprise"" style=""height:32px; display:block; border:0;"" />
                    </a>
                  </td>
                </tr>";

        var subject = "You're invited to CRM Enterprise";
        // Keep the invite template self-contained so it renders consistently across email clients.
        var htmlBody = $@"
            <div style=""font-family: 'Segoe UI', Arial, sans-serif; background:#f5f7fb; padding:24px;"">
              <table role=""presentation"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; box-shadow:0 8px 24px rgba(15,23,42,0.08);"">
                {logoSection}
                <tr>
                  <td style=""padding:28px 32px 12px;"">
                    <h2 style=""margin:0; font-size:22px; color:#111827;"">CRM Enterprise invite</h2>
                    <p style=""margin:8px 0 0; color:#6b7280; font-size:14px;"">Your workspace access is ready.</p>
                  </td>
                </tr>
                <tr>
                  <td style=""padding:8px 32px 0;"">
                    <p style=""margin:0 0 12px; color:#111827; font-size:15px;"">
                      Hi {System.Net.WebUtility.HtmlEncode(user.FullName)},
                    </p>
                    <p style=""margin:0 0 16px; color:#4b5563; font-size:14px;"">
                      You have been invited to CRM Enterprise. Use the credentials below to sign in:
                    </p>
                    <div style=""background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:14px 16px; font-size:14px;"">
                      <div style=""margin-bottom:8px;""><strong>Login:</strong> {System.Net.WebUtility.HtmlEncode(user.Email)}</div>
                      <div><strong>Temporary password:</strong> {System.Net.WebUtility.HtmlEncode(temporaryPassword)}</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style=""padding:20px 32px 8px;"">
                    <a href=""{loginUrl}"" style=""display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:8px; font-size:14px; font-weight:600;"">
                      Sign in to CRM Enterprise
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style=""padding:6px 32px 24px;"">
                    <p style=""margin:0; color:#6b7280; font-size:12px;"">
                      If you did not expect this invitation, you can ignore this message.
                    </p>
                  </td>
                </tr>
              </table>
            </div>";
        var textBody = $"Hi {user.FullName},\n\n" +
                       "You have been invited to CRM Enterprise. Use the credentials below to sign in:\n\n" +
                       $"Login: {user.Email}\n" +
                       $"Temporary password: {temporaryPassword}\n\n" +
                       $"Sign in: {loginUrl}\n\n" +
                       "If you did not expect this invitation, you can ignore this message.";

        try
        {
            await _emailSender.SendAsync(user.Email, subject, htmlBody, textBody, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to send invite email to {Email}.", user.Email);
        }
    }
}
