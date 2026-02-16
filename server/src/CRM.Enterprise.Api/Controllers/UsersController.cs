using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json;
using System.Threading;
using CRM.Enterprise.Api.Contracts.Users;
using CRM.Enterprise.Application.Dashboard;
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
    private readonly IDashboardLayoutService _dashboardLayoutService;
    private readonly string? _brandLogoUrl;
    private readonly string? _brandWebsiteUrl;

    public UsersController(
        CrmDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        IEmailSender emailSender,
        IDashboardLayoutService dashboardLayoutService,
        IConfiguration configuration,
        ITenantProvider tenantProvider,
        ILogger<UsersController> logger,
        CRM.Enterprise.Infrastructure.Presence.IPresenceTracker presenceTracker)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _emailSender = emailSender;
        _dashboardLayoutService = dashboardLayoutService;
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

        var templates = await _dbContext.DashboardTemplates
            .AsNoTracking()
            .Where(t => !t.IsDeleted)
            .Select(t => new DashboardTemplateOptionProjection(t.Id, t.Name, t.Description))
            .ToListAsync(cancellationToken);
        var roleDefaultNameByLevel = BuildRoleDefaultNameByLevel(templates);
        var customNameByTemplateId = templates
            .Where(t => !IsRoleLevelTemplate(t.Description))
            .ToDictionary(t => t.Id, t => t.Name);

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
                u.LastInviteSentAtUtc,
                u.LastLoginLocation,
                u.LastLoginIp,
                u.CommandCenterLayoutJson,
                u.TimeZone
            })
            .ToListAsync(cancellationToken);

        var userIds = data.Select(u => u.Id).ToList();
        var roleRows = await _dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => userIds.Contains(ur.UserId) && !ur.IsDeleted && ur.Role != null && !ur.Role.IsDeleted)
            .Select(ur => new
            {
                ur.UserId,
                RoleName = ur.Role!.Name,
                ur.Role.HierarchyLevel
            })
            .ToListAsync(cancellationToken);

        var rolesByUserId = roleRows
            .GroupBy(r => r.UserId)
            .ToDictionary(
                group => group.Key,
                group => group
                    .Select(item => item.RoleName)
                    .Where(name => !string.IsNullOrWhiteSpace(name))
                    .Distinct(StringComparer.OrdinalIgnoreCase)
                    .OrderBy(name => name)
                    .ToList());

        var highestLevelByUserId = roleRows
            .GroupBy(r => r.UserId)
            .ToDictionary(
                group => group.Key,
                group => Math.Max(1, group
                    .Select(item => item.HierarchyLevel ?? 1)
                    .DefaultIfEmpty(1)
                    .Max()));

        var onlineUsers = new HashSet<string>(_presenceTracker.GetOnlineUsers(), StringComparer.OrdinalIgnoreCase);
        var items = data.Select(u =>
        {
            var highestRoleLevel = highestLevelByUserId.TryGetValue(u.Id, out var resolvedLevel)
                ? resolvedLevel
                : 1;
            var pack = ResolveDashboardPackSummary(
                u.CommandCenterLayoutJson,
                highestRoleLevel,
                roleDefaultNameByLevel,
                customNameByTemplateId);

            return new UserListItem(
                u.Id,
                u.FullName,
                u.Email,
                rolesByUserId.TryGetValue(u.Id, out var roleNames) ? roleNames : new List<string>(),
                highestRoleLevel,
                u.IsActive,
                u.CreatedAtUtc,
                u.LastLoginAtUtc,
                u.LastInviteSentAtUtc,
                u.TimeZone,
                u.LastLoginLocation,
                u.LastLoginIp,
                pack.Key,
                pack.Name,
                pack.Type,
                onlineUsers.Contains(u.Id.ToString()));
        }).ToList();

        return Ok(new UserSearchResponse(items, total));
    }

    [HttpGet("dashboard-packs/options")]
    public async Task<ActionResult<DashboardPackOptionsResponse>> GetDashboardPackOptions(CancellationToken cancellationToken = default)
    {
        var templates = await _dbContext.DashboardTemplates
            .AsNoTracking()
            .Where(t => !t.IsDeleted)
            .OrderBy(t => t.Name)
            .Select(t => new DashboardTemplateOptionProjection(t.Id, t.Name, t.Description))
            .ToListAsync(cancellationToken);

        var roleLevels = await _dbContext.Roles
            .AsNoTracking()
            .Where(r => !r.IsDeleted && r.HierarchyLevel.HasValue && r.HierarchyLevel.Value > 0)
            .Select(r => r.HierarchyLevel!.Value)
            .Distinct()
            .OrderBy(level => level)
            .ToListAsync(cancellationToken);

        if (roleLevels.Count == 0)
        {
            roleLevels.Add(1);
        }

        var roleDefaultNameByLevel = BuildRoleDefaultNameByLevel(templates);

        var roleDefaults = roleLevels
            .Select(level => new DashboardPackOptionItem(
                $"role-default:{level}",
                roleDefaultNameByLevel.TryGetValue(level, out var roleDefaultName)
                    ? roleDefaultName
                    : $"H{level} Pack",
                "role-default",
                level,
                null))
            .ToList();

        var customPacks = templates
            .Where(t => !IsRoleLevelTemplate(t.Description))
            .Select(t => new DashboardPackOptionItem(
                $"custom:{t.Id}",
                t.Name,
                "custom",
                null,
                t.Id))
            .ToList();

        return Ok(new DashboardPackOptionsResponse(roleDefaults, customPacks));
    }

    [HttpPut("{id:guid}/dashboard-pack")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<IActionResult> UpdateUserDashboardPack(
        Guid id,
        [FromBody] UpdateUserDashboardPackRequest request,
        CancellationToken cancellationToken = default)
    {
        var userExists = await _dbContext.Users.AnyAsync(u => u.Id == id && !u.IsDeleted, cancellationToken);
        if (!userExists)
        {
            return NotFound();
        }

        var sourceType = (request.SourceType ?? string.Empty).Trim().ToLowerInvariant();
        if (sourceType == "role-default")
        {
            var roleLevel = request.RoleLevel ?? await GetUserHighestRoleLevelAsync(id, cancellationToken);
            roleLevel = Math.Max(1, roleLevel);

            var roleDefaultName = await ResolveRoleDefaultNameAsync(roleLevel, cancellationToken);
            var layout = await _dashboardLayoutService.GetDefaultLayoutForLevelAsync(roleLevel, cancellationToken);
            await _dashboardLayoutService.UpdateLayoutAsync(id, layout, cancellationToken);
            await SaveUserDashboardPackSourceAsync(
                id,
                layout,
                $"role-default:{roleLevel}",
                roleDefaultName,
                "role-default",
                null,
                roleLevel,
                cancellationToken);

            return NoContent();
        }

        if (sourceType != "custom")
        {
            return BadRequest("Unsupported dashboard pack source type.");
        }

        if (!request.TemplateId.HasValue || request.TemplateId.Value == Guid.Empty)
        {
            return BadRequest("TemplateId is required for custom dashboard packs.");
        }

        var template = await _dashboardLayoutService.GetTemplatesAsync(cancellationToken);
        var selectedTemplate = template.FirstOrDefault(t => t.Id == request.TemplateId.Value);
        if (selectedTemplate is null)
        {
            return BadRequest("Dashboard pack template not found.");
        }

        await _dashboardLayoutService.UpdateLayoutAsync(id, selectedTemplate.Layout, cancellationToken);
        await SaveUserDashboardPackSourceAsync(
            id,
            selectedTemplate.Layout,
            $"custom:{selectedTemplate.Id}",
            selectedTemplate.Name,
            "custom",
            selectedTemplate.Id,
            null,
            cancellationToken);

        return NoContent();
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
            MonthlyQuota = NormalizeQuota(request.MonthlyQuota),
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
        user.LastInviteSentAtUtc = DateTime.UtcNow;

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
        user.MonthlyQuota = NormalizeQuota(request.MonthlyQuota);
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
        user.LastInviteSentAtUtc = DateTime.UtcNow;
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

    private async Task<int> GetUserHighestRoleLevelAsync(Guid userId, CancellationToken cancellationToken)
    {
        var levels = await _dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => ur.UserId == userId && ur.Role != null && ur.Role.HierarchyLevel.HasValue)
            .Select(ur => ur.Role!.HierarchyLevel!.Value)
            .ToListAsync(cancellationToken);

        return levels.Count == 0 ? 1 : Math.Max(1, levels.Max());
    }

    private static Dictionary<int, string> BuildRoleDefaultNameByLevel(IEnumerable<DashboardTemplateOptionProjection> templates)
    {
        var map = new Dictionary<int, string>();
        foreach (var template in templates)
        {
            var level = TryParseRoleLevelMarker(template.Description);
            if (!level.HasValue)
            {
                continue;
            }

            map[level.Value] = string.IsNullOrWhiteSpace(template.Name)
                ? $"H{level.Value} Pack"
                : template.Name;
        }

        return map;
    }

    private async Task<string> ResolveRoleDefaultNameAsync(int roleLevel, CancellationToken cancellationToken)
    {
        var marker = $"role-level-default:{roleLevel}";
        var templateName = await _dbContext.DashboardTemplates
            .AsNoTracking()
            .Where(t => !t.IsDeleted && t.Description != null && t.Description.ToLower() == marker)
            .Select(t => t.Name)
            .FirstOrDefaultAsync(cancellationToken);
        return string.IsNullOrWhiteSpace(templateName) ? $"H{roleLevel} Pack" : templateName;
    }

    private static bool IsRoleLevelTemplate(string? description)
        => !string.IsNullOrWhiteSpace(description) &&
           description.StartsWith("role-level-default:", StringComparison.OrdinalIgnoreCase);

    private static int? TryParseRoleLevelMarker(string? description)
    {
        if (!IsRoleLevelTemplate(description))
        {
            return null;
        }

        var tail = description!["role-level-default:".Length..];
        return int.TryParse(tail, out var level) ? level : null;
    }

    private static DashboardPackSummary ResolveDashboardPackSummary(
        string? commandCenterLayoutJson,
        int highestRoleLevel,
        IReadOnlyDictionary<int, string> roleDefaultNameByLevel,
        IReadOnlyDictionary<Guid, string> customNameByTemplateId)
    {
        var fallbackName = roleDefaultNameByLevel.TryGetValue(highestRoleLevel, out var roleDefaultName)
            ? roleDefaultName
            : $"H{highestRoleLevel} Pack";

        if (string.IsNullOrWhiteSpace(commandCenterLayoutJson))
        {
            return new DashboardPackSummary(
                $"role-default:{highestRoleLevel}",
                fallbackName,
                "role-default");
        }

        try
        {
            var payload = JsonSerializer.Deserialize<UserDashboardLayoutPayload>(commandCenterLayoutJson);
            if (payload is null || string.IsNullOrWhiteSpace(payload.SourceType))
            {
                return new DashboardPackSummary("custom-layout", "Custom Layout", "custom-layout");
            }

            if (string.Equals(payload.SourceType, "role-default", StringComparison.OrdinalIgnoreCase))
            {
                var level = payload.SourceRoleLevel ?? highestRoleLevel;
                var name = !string.IsNullOrWhiteSpace(payload.SourceName)
                    ? payload.SourceName
                    : (roleDefaultNameByLevel.TryGetValue(level, out var levelName) ? levelName : $"H{level} Pack");
                return new DashboardPackSummary(
                    $"role-default:{level}",
                    name,
                    "role-default");
            }

            if (string.Equals(payload.SourceType, "custom", StringComparison.OrdinalIgnoreCase))
            {
                var templateId = payload.SourceTemplateId;
                var customName = templateId.HasValue && customNameByTemplateId.TryGetValue(templateId.Value, out var name)
                    ? name
                    : (!string.IsNullOrWhiteSpace(payload.SourceName) ? payload.SourceName : "Custom Layout");
                var key = templateId.HasValue ? $"custom:{templateId.Value}" : "custom-layout";
                return new DashboardPackSummary(key, customName, "custom");
            }
        }
        catch (JsonException)
        {
            // Fall through to generic custom label.
        }

        return new DashboardPackSummary("custom-layout", "Custom Layout", "custom-layout");
    }

    private async Task SaveUserDashboardPackSourceAsync(
        Guid userId,
        DashboardLayoutState layout,
        string sourceKey,
        string sourceName,
        string sourceType,
        Guid? sourceTemplateId,
        int? sourceRoleLevel,
        CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted, cancellationToken);
        if (user is null)
        {
            return;
        }

        user.CommandCenterLayoutJson = JsonSerializer.Serialize(new UserDashboardLayoutPayload(
            layout.CardOrder,
            layout.Sizes,
            layout.Dimensions,
            layout.HiddenCards,
            sourceKey,
            sourceName,
            sourceType,
            sourceTemplateId,
            sourceRoleLevel));
        user.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private sealed record DashboardPackSummary(
        string Key,
        string Name,
        string Type);

    private sealed record UserDashboardLayoutPayload(
        IReadOnlyList<string>? CardOrder,
        IReadOnlyDictionary<string, string>? Sizes,
        IReadOnlyDictionary<string, DashboardCardDimensions>? Dimensions,
        IReadOnlyList<string>? HiddenCards,
        string? SourceKey,
        string? SourceName,
        string? SourceType,
        Guid? SourceTemplateId,
        int? SourceRoleLevel);

    private sealed record DashboardTemplateOptionProjection(
        Guid Id,
        string Name,
        string? Description);

    private async Task<UserDetailResponse?> BuildDetailResponseAsync(Guid id, CancellationToken cancellationToken)
    {
        var templates = await _dbContext.DashboardTemplates
            .AsNoTracking()
            .Where(t => !t.IsDeleted)
            .Select(t => new DashboardTemplateOptionProjection(t.Id, t.Name, t.Description))
            .ToListAsync(cancellationToken);
        var roleDefaultNameByLevel = BuildRoleDefaultNameByLevel(templates);
        var customNameByTemplateId = templates
            .Where(t => !IsRoleLevelTemplate(t.Description))
            .ToDictionary(t => t.Id, t => t.Name);

        var row = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == id && !u.IsDeleted)
            .Select(u => new
            {
                u.Id,
                u.FullName,
                u.Email,
                u.TimeZone,
                u.Locale,
                u.MonthlyQuota,
                u.IsActive,
                u.CreatedAtUtc,
                u.LastLoginAtUtc,
                u.LastInviteSentAtUtc,
                u.CommandCenterLayoutJson
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (row is null)
        {
            return null;
        }

        var roleRows = await _dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => ur.UserId == id && !ur.IsDeleted && ur.Role != null && !ur.Role.IsDeleted)
            .Select(ur => new
            {
                ur.RoleId,
                RoleName = ur.Role!.Name,
                ur.Role.HierarchyLevel
            })
            .ToListAsync(cancellationToken);

        var roleIds = roleRows
            .Select(item => item.RoleId)
            .Distinct()
            .ToList();
        var roleNames = roleRows
            .Select(item => item.RoleName)
            .Where(name => !string.IsNullOrWhiteSpace(name))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(name => name)
            .ToList();
        var highestRoleLevel = Math.Max(1, roleRows
            .Select(item => item.HierarchyLevel ?? 1)
            .DefaultIfEmpty(1)
            .Max());

        var pack = ResolveDashboardPackSummary(
            row.CommandCenterLayoutJson,
            highestRoleLevel,
            roleDefaultNameByLevel,
            customNameByTemplateId);

        return new UserDetailResponse(
            row.Id,
            row.FullName,
            row.Email,
            row.TimeZone,
            row.Locale,
            row.MonthlyQuota,
            row.IsActive,
            row.CreatedAtUtc,
            row.LastLoginAtUtc,
            row.LastInviteSentAtUtc,
            pack.Key,
            pack.Name,
            pack.Type,
            roleIds,
            roleNames);
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

    private static decimal? NormalizeQuota(decimal? value)
    {
        if (!value.HasValue)
        {
            return null;
        }

        return value.Value < 0 ? 0 : value.Value;
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
