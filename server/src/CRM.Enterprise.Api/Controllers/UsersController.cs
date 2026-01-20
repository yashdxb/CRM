using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading;
using CRM.Enterprise.Api.Contracts.Users;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Application.Auth;
using CRM.Enterprise.Application.Tenants;
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
    private readonly ITenantProvider _tenantProvider;
    private readonly string? _brandLogoUrl;
    private readonly string? _brandWebsiteUrl;

    public UsersController(
        CrmDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        IEmailSender emailSender,
        IConfiguration configuration,
        ITenantProvider tenantProvider,
        ILogger<UsersController> logger,
        CRM.Enterprise.Infrastructure.Presence.IPresenceTracker presenceTracker)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _emailSender = emailSender;
        _brandLogoUrl = configuration["Branding:LogoUrl"];
        _brandWebsiteUrl = configuration["Branding:WebsiteUrl"];
        _tenantProvider = tenantProvider;
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
        var inviteToken = InviteTokenHelper.GenerateToken();
        user.InviteTokenHash = InviteTokenHelper.HashToken(inviteToken);
        user.InviteTokenExpiresAtUtc = DateTime.UtcNow.AddHours(24);

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        await AssignRolesAsync(user, roleIds, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        await SendInviteEmailAsync(user, password, inviteToken, cancellationToken);

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

    [HttpPost("{id:guid}/resend-invite")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<IActionResult> ResendInvite(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted, cancellationToken);
        if (user is null)
        {
            return NotFound();
        }

        if (!user.IsActive)
        {
            return BadRequest("User is inactive. Reactivate before resending the invite.");
        }

        var password = PasswordGenerator.CreateStrongPassword();
        user.PasswordHash = _passwordHasher.HashPassword(user, password);
        user.MustChangePassword = true;
        var inviteToken = InviteTokenHelper.GenerateToken();
        user.InviteTokenHash = InviteTokenHelper.HashToken(inviteToken);
        user.InviteTokenExpiresAtUtc = DateTime.UtcNow.AddHours(24);
        await _dbContext.SaveChangesAsync(cancellationToken);

        await SendInviteEmailAsync(user, password, inviteToken, cancellationToken);
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

    private async Task SendInviteEmailAsync(User user, string temporaryPassword, string inviteToken, CancellationToken cancellationToken)
    {
        var origin = Request.Headers.Origin.FirstOrDefault();
        var baseUrl = string.IsNullOrWhiteSpace(origin)
            ? $"{Request.Scheme}://{Request.Host}"
            : origin;
        var loginUrl = $"{baseUrl.TrimEnd('/')}/login";
        var inviteUrl = $"{baseUrl.TrimEnd('/')}/accept-invite?token={Uri.EscapeDataString(inviteToken)}";
        var websiteUrl = string.IsNullOrWhiteSpace(_brandWebsiteUrl) ? baseUrl : _brandWebsiteUrl;
        var logoUrl = string.IsNullOrWhiteSpace(_brandLogoUrl) ? null : _brandLogoUrl;
        var encodedWebsiteUrl = System.Net.WebUtility.HtmlEncode(websiteUrl);
        var encodedLogoUrl = logoUrl is null ? null : System.Net.WebUtility.HtmlEncode(logoUrl);
        var tenantName = "your workspace";
        if (_tenantProvider.TenantId != Guid.Empty)
        {
            var tenant = await _dbContext.Tenants
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, cancellationToken);
            if (!string.IsNullOrWhiteSpace(tenant?.Name))
            {
                tenantName = tenant.Name.Trim();
            }
        }
        var encodedTenantName = System.Net.WebUtility.HtmlEncode(tenantName);
        var logoSection = encodedLogoUrl is null
            ? $@"
                <tr>
                  <td style=""padding:0 0 18px;"">
                    <a href=""{encodedWebsiteUrl}"" style=""display:inline-block; text-decoration:none; color:#0f172a; font-size:18px; font-weight:700;"">
                      North Edge CRM
                    </a>
                  </td>
                </tr>"
            : $@"
                <tr>
                  <td style=""padding:0 0 18px;"">
                    <a href=""{encodedWebsiteUrl}"" style=""display:inline-block; text-decoration:none;"">
                      <img src=""{encodedLogoUrl}"" alt=""North Edge CRM"" style=""height:68px; display:block; border:0;"" />
                    </a>
                  </td>
                </tr>";

        var subject = $"You're invited to join {tenantName} on North Edge CRM";
        // Keep the invite template self-contained so it renders consistently across email clients.
        var htmlBody = $@"
            <div style=""font-family: 'Segoe UI', Arial, sans-serif; background:radial-gradient(1200px 640px at 15% -20%, #e0eaff 0%, #e6f2ff 38%, #f8fafc 75%); padding:36px 16px;"">
              <table role=""presentation"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width:660px; margin:0 auto;"">
                <tr>
                  <td style=""padding:0 0 14px;"">
                    <div style=""height:8px; width:100%; border-radius:999px; background:linear-gradient(90deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%);""></div>
                  </td>
                </tr>
                <tr>
                  <td style=""background:rgba(255,255,255,0.84); border:1px solid rgba(255,255,255,0.6); border-radius:20px; box-shadow:0 18px 50px rgba(15, 23, 42, 0.16); padding:32px 36px 28px;"">
                    <table role=""presentation"" cellpadding=""0"" cellspacing=""0"" width=""100%"">
                      {logoSection}
                      <tr>
                        <td style=""padding:0 0 8px;"">
                          <div style=""font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:#64748b;"">Invitation</div>
                          <h1 style=""margin:8px 0 0; font-size:24px; color:#0f172a;"">Join {encodedTenantName} on North Edge CRM</h1>
                          <p style=""margin:10px 0 0; color:#475569; font-size:14px;"">
                            Dear {System.Net.WebUtility.HtmlEncode(user.FullName)},<br />
                            You are invited to join the {encodedTenantName} workspace. Activate your access and complete your profile to get started.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style=""padding:18px 0 0;"">
                          <div style=""background:linear-gradient(140deg, rgba(59, 130, 246, 0.08), rgba(14, 165, 233, 0.16)); border:1px solid rgba(148, 163, 184, 0.35); border-radius:16px; padding:16px 18px; font-size:14px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.7), 0 10px 24px rgba(15, 23, 42, 0.06);"">
                            <table role=""presentation"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse:separate; border-spacing:0 10px;"">
                              <tr>
                                <td style=""width:32px;"">
                                  <div style=""width:28px; height:28px; border-radius:8px; background:rgba(37,99,235,0.12); border:1px solid rgba(37,99,235,0.35); text-align:center; line-height:28px; font-weight:700; color:#2563eb;"">
                                    E
                                  </div>
                                </td>
                                <td style=""font-weight:600; color:#0f172a; width:90px;"">Email</td>
                                <td style=""color:#0f172a;"">{System.Net.WebUtility.HtmlEncode(user.Email)}</td>
                              </tr>
                            </table>
                            <div style=""margin-top:8px; color:#475569; font-size:12px;"">This invite link expires in <strong>24 hours</strong>.</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style=""padding:20px 0 0;"">
                          <table role=""presentation"" cellpadding=""0"" cellspacing=""0"">
                            <tr>
                              <td style=""background:#2563eb; border-radius:10px;"">
                                <a href=""{inviteUrl}"" style=""display:inline-block; padding:12px 20px; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600;"">Join workspace</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style=""padding:18px 0 0;"">
                          <p style=""margin:0; color:#64748b; font-size:12px;"">If you did not expect this invitation, you can ignore this message.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style=""padding:20px 0 0;"">
                          <p style=""margin:0 0 10px; color:#475569; font-size:13px;"">Need help? Reply to this email or contact your workspace administrator.</p>
                          <p style=""margin:0 0 4px; color:#94a3b8; font-size:12px;"">
                            <a href=""https://northedgesystem.com"" style=""color:#2563eb; text-decoration:none;"">North Edge System</a>
                          </p>
                          <p style=""margin:0 0 4px; color:#94a3b8; font-size:12px;"">Toronto, ON, Canada</p>
                          <p style=""margin:0; color:#94a3b8; font-size:12px;"">
                            <a href=""mailto:contact@northedgesystem.com"" style=""color:#2563eb; text-decoration:none;"">contact@northedgesystem.com</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style=""padding:14px 8px 0; text-align:center; color:#94a3b8; font-size:11px;"">
                    North Edge CRM • Secure workspace invite
                  </td>
                </tr>
              </table>
            </div>";
        var textBody = $"Dear {user.FullName},\n\n" +
                       $"You are invited to join the {tenantName} workspace on North Edge CRM.\n\n" +
                       $"Email: {user.Email}\n" +
                       "This invite link expires in 24 hours.\n\n" +
                       $"Join workspace: {inviteUrl}\n\n" +
                       "Need help? Reply to this email or contact your workspace administrator.\n" +
                       "North Edge System\n" +
                       "Toronto, ON, Canada\n" +
                       "contact@northedgesystem.com\n\n" +
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
