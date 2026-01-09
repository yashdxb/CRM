using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading;
using CRM.Enterprise.Api.Contracts.Users;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/users")]
[Authorize(Policy = Permissions.Policies.AdministrationView)]
public class UsersController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly IPasswordHasher<User> _passwordHasher;

    public UsersController(CrmDbContext dbContext, IPasswordHasher<User> passwordHasher)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
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
                Roles = u.Roles.Where(ur => ur.Role != null).Select(ur => ur.Role!.Name)
            })
            .ToListAsync(cancellationToken);

        var items = data.Select(u => new UserListItem(
            u.Id,
            u.FullName,
            u.Email,
            u.Roles.Where(r => !string.IsNullOrWhiteSpace(r)).ToList(),
            u.IsActive,
            u.CreatedAtUtc,
            u.LastLoginAtUtc)).ToList();

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
            .IgnoreQueryFilters()
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
            .IgnoreQueryFilters()
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
}
