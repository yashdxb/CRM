using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Enterprise.Api.Contracts.Roles;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/roles")]
[Authorize(Policy = Permissions.Policies.AdministrationManage)]
public class RolesController : ControllerBase
{
    private static readonly StringComparer NameComparer = StringComparer.OrdinalIgnoreCase;
    private static readonly HashSet<string> PermissionKeys = new(Permissions.AllKeys, StringComparer.OrdinalIgnoreCase);

    private readonly CrmDbContext _dbContext;

    public RolesController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<RoleResponse>>> GetRoles(CancellationToken cancellationToken)
    {
        var roles = await _dbContext.Roles
            .AsNoTracking()
            .Where(r => !r.IsDeleted)
            .Include(r => r.Permissions)
            .OrderBy(r => r.Name)
            .ToListAsync(cancellationToken);

        var responses = roles.Select(ToRoleResponse).ToList();
        return Ok(responses);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RoleResponse>> GetRole(Guid id, CancellationToken cancellationToken)
    {
        var role = await FindRoleAsync(id, cancellationToken);
        return role is null ? NotFound() : Ok(ToRoleResponse(role));
    }

    [HttpGet("permissions")]
    public ActionResult<IReadOnlyList<PermissionDefinitionResponse>> GetPermissionDefinitions()
    {
        var permissions = Permissions.Definitions
            .Select(def => new PermissionDefinitionResponse(def.Key, def.Label, def.Description))
            .ToList();
        return Ok(permissions);
    }

    [HttpPost]
    public async Task<ActionResult<RoleResponse>> CreateRole([FromBody] UpsertRoleRequest request, CancellationToken cancellationToken)
    {
        var validationError = ValidateRoleRequest(request);
        if (validationError is not null)
        {
            return BadRequest(validationError);
        }

        var normalizedName = request.Name.Trim();
        var normalizedLower = normalizedName.ToLowerInvariant();

        var exists = await _dbContext.Roles
            .AnyAsync(r => !r.IsDeleted && r.Name.ToLower() == normalizedLower, cancellationToken);

        if (exists)
        {
            return Conflict("A role with that name already exists.");
        }

        var role = new Role
        {
            Name = normalizedName,
            Description = NormalizeDescription(request.Description)
        };

        _dbContext.Roles.Add(role);
        await _dbContext.SaveChangesAsync(cancellationToken);

        await SyncRolePermissionsAsync(role.Id, request.Permissions, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var refreshed = await FindRoleAsync(role.Id, cancellationToken);
        return refreshed is null
            ? StatusCode(500, "Unable to materialize the created role.")
            : CreatedAtAction(nameof(GetRole), new { id = refreshed.Id }, ToRoleResponse(refreshed));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RoleResponse>> UpdateRole(Guid id, [FromBody] UpsertRoleRequest request, CancellationToken cancellationToken)
    {
        var validationError = ValidateRoleRequest(request);
        if (validationError is not null)
        {
            return BadRequest(validationError);
        }

        var role = await _dbContext.Roles.FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted, cancellationToken);
        if (role is null)
        {
            return NotFound();
        }

        var normalizedName = request.Name.Trim();
        var normalizedLower = normalizedName.ToLowerInvariant();

        var duplicate = await _dbContext.Roles
            .AnyAsync(r => r.Id != id && !r.IsDeleted && r.Name.ToLower() == normalizedLower, cancellationToken);
        if (duplicate)
        {
            return Conflict("Another role already uses that name.");
        }

        var isSystem = IsSystemRole(role.Name);
        if (isSystem && !NameComparer.Equals(role.Name, normalizedName))
        {
            return BadRequest("System role names cannot be changed.");
        }

        role.Name = normalizedName;
        role.Description = NormalizeDescription(request.Description);

        await SyncRolePermissionsAsync(role.Id, request.Permissions, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var refreshed = await FindRoleAsync(role.Id, cancellationToken);
        return refreshed is null ? NotFound() : Ok(ToRoleResponse(refreshed));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteRole(Guid id, CancellationToken cancellationToken)
    {
        var role = await _dbContext.Roles.FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted, cancellationToken);
        if (role is null)
        {
            return NotFound();
        }

        if (IsSystemRole(role.Name))
        {
            return BadRequest("System roles cannot be removed.");
        }

        var links = await _dbContext.UserRoles.Where(ur => ur.RoleId == id).ToListAsync(cancellationToken);
        if (links.Count > 0)
        {
            _dbContext.UserRoles.RemoveRange(links);
        }

        var permissions = await _dbContext.RolePermissions.Where(rp => rp.RoleId == id).ToListAsync(cancellationToken);
        if (permissions.Count > 0)
        {
            _dbContext.RolePermissions.RemoveRange(permissions);
        }

        role.IsDeleted = true;
        role.DeletedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private static string? ValidateRoleRequest(UpsertRoleRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return "Role name is required.";
        }

        if (request.Permissions is null || request.Permissions.Count == 0)
        {
            return "Assign at least one permission.";
        }

        var invalid = request.Permissions
            .Where(permission => string.IsNullOrWhiteSpace(permission) || !PermissionKeys.Contains(permission))
            .ToList();
        if (invalid.Count > 0)
        {
            return $"Unknown permission(s): {string.Join(", ", invalid)}";
        }

        return null;
    }

    private static string? NormalizeDescription(string? description)
        => string.IsNullOrWhiteSpace(description) ? null : description.Trim();

    private static bool IsSystemRole(string name)
        => Permissions.SystemRoleNames.Any(system => NameComparer.Equals(system, name));

    private async Task SyncRolePermissionsAsync(Guid roleId, IReadOnlyCollection<string> permissions, CancellationToken cancellationToken)
    {
        var desired = permissions
            ?.Where(permission => !string.IsNullOrWhiteSpace(permission) && PermissionKeys.Contains(permission))
            .Select(permission => permission.Trim())
            .ToHashSet(NameComparer) ?? new HashSet<string>(NameComparer);

        var existing = await _dbContext.RolePermissions
            .Where(rp => rp.RoleId == roleId)
            .ToListAsync(cancellationToken);

        var stale = existing.Where(rp => !desired.Contains(rp.Permission)).ToList();
        if (stale.Count > 0)
        {
            _dbContext.RolePermissions.RemoveRange(stale);
        }

        foreach (var permission in desired)
        {
            var alreadyAssigned = existing.Any(rp => NameComparer.Equals(rp.Permission, permission));
            if (!alreadyAssigned)
            {
                _dbContext.RolePermissions.Add(new RolePermission
                {
                    RoleId = roleId,
                    Permission = permission
                });
            }
        }
    }

    private async Task<Role?> FindRoleAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Roles
            .AsNoTracking()
            .Where(r => r.Id == id && !r.IsDeleted)
            .Include(r => r.Permissions)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private static RoleResponse ToRoleResponse(Role role)
    {
        var permissions = role.Permissions
            .Where(rp => !rp.IsDeleted && !string.IsNullOrWhiteSpace(rp.Permission))
            .Select(rp => rp.Permission.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(permission => permission)
            .ToList();

        return new RoleResponse(
            role.Id,
            role.Name,
            role.Description,
            IsSystemRole(role.Name),
            permissions);
    }
}
