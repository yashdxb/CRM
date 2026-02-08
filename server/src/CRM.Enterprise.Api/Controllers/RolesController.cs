using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Enterprise.Api.Contracts.Roles;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/roles")]
[Authorize(Policy = Permissions.Policies.AdministrationView)]
public class RolesController : ControllerBase
{
    private static readonly StringComparer NameComparer = StringComparer.OrdinalIgnoreCase;

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
            .Include(r => r.SecurityLevel)
            .OrderBy(r => r.Name)
            .ToListAsync(cancellationToken);

        var defaultSecurity = await ResolveDefaultSecurityLevelAsync(cancellationToken);
        var responses = new List<RoleResponse>();
        foreach (var role in roles)
        {
            var inherited = await ResolveInheritedPermissionsAsync(role, cancellationToken);
            responses.Add(ToRoleResponse(role, defaultSecurity, inherited));
        }
        return Ok(responses);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RoleResponse>> GetRole(Guid id, CancellationToken cancellationToken)
    {
        var role = await FindRoleAsync(id, cancellationToken);
        if (role is null)
        {
            return NotFound();
        }

        var defaultSecurity = await ResolveDefaultSecurityLevelAsync(cancellationToken);
        var inherited = await ResolveInheritedPermissionsAsync(role, cancellationToken);
        return Ok(ToRoleResponse(role, defaultSecurity, inherited));
    }

    [HttpGet("permissions")]
    public async Task<ActionResult<IReadOnlyList<PermissionDefinitionResponse>>> GetPermissionDefinitions(CancellationToken cancellationToken)
    {
        var catalog = await _dbContext.PermissionCatalogEntries
            .ToListAsync(cancellationToken);
        var definitions = Permissions.Definitions
            .ToDictionary(definition => definition.Key, definition => definition, NameComparer);

        var changed = false;
        foreach (var definition in definitions.Values)
        {
            var entry = catalog.FirstOrDefault(item => NameComparer.Equals(item.Key, definition.Key));
            if (entry is null)
            {
                catalog.Add(new PermissionCatalogEntry
                {
                    Id = Guid.NewGuid(),
                    Key = definition.Key,
                    Label = definition.Label,
                    Description = definition.Description
                });
                changed = true;
                continue;
            }

            if (string.IsNullOrWhiteSpace(entry.Label) || string.IsNullOrWhiteSpace(entry.Description))
            {
                entry.Label = definition.Label;
                entry.Description = definition.Description;
                changed = true;
            }
        }

        if (changed)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        var permissions = catalog
            .OrderBy(entry => entry.Label)
            .Select(entry =>
            {
                var capability = definitions.TryGetValue(entry.Key, out var definition)
                    ? definition.Capability
                    : "General";
                return new PermissionDefinitionResponse(entry.Key, entry.Label, entry.Description, capability);
            })
            .ToList();

        return Ok(permissions);
    }

    [HttpGet("intent-packs")]
    public ActionResult<IReadOnlyList<RoleIntentDefinition>> GetRoleIntentPacks()
    {
        return Ok(Permissions.RoleIntents);
    }

    [HttpGet("permission-packs")]
    public ActionResult<IReadOnlyList<PermissionPackPresetDefinition>> GetPermissionPackPresets()
    {
        return Ok(Permissions.PermissionPackPresets);
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<RoleResponse>> CreateRole([FromBody] UpsertRoleRequest request, CancellationToken cancellationToken)
    {
        var validationError = await ValidateRoleRequestAsync(request, cancellationToken);
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
            Description = NormalizeDescription(request.Description),
            ParentRoleId = request.ParentRoleId,
            VisibilityScope = ParseVisibilityScope(request.VisibilityScope),
            SecurityLevelId = await ResolveSecurityLevelIdAsync(request.SecurityLevelId, cancellationToken),
            BasePermissionsJson = SerializePermissions(request.Permissions),
            BasePermissionsUpdatedAtUtc = DateTime.UtcNow,
            DriftNotes = string.IsNullOrWhiteSpace(request.DriftNotes) ? null : request.DriftNotes.Trim()
        };

        _dbContext.Roles.Add(role);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var parentRole = await ResolveParentRoleAsync(request.ParentRoleId, cancellationToken);
        await UpdateHierarchyAsync(role, parentRole, cancellationToken);

        await SyncRolePermissionsAsync(role.Id, request.Permissions, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var refreshed = await FindRoleAsync(role.Id, cancellationToken);
        if (refreshed is null)
        {
            return StatusCode(500, "Unable to materialize the created role.");
        }

        var createdInherited = await ResolveInheritedPermissionsAsync(refreshed, cancellationToken);
        return CreatedAtAction(
            nameof(GetRole),
            new { id = refreshed.Id },
            ToRoleResponse(refreshed, await ResolveDefaultSecurityLevelAsync(cancellationToken), createdInherited));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<RoleResponse>> UpdateRole(Guid id, [FromBody] UpsertRoleRequest request, CancellationToken cancellationToken)
    {
        var validationError = await ValidateRoleRequestAsync(request, cancellationToken);
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

        var parentRole = await ResolveParentRoleAsync(request.ParentRoleId, cancellationToken);
        if (request.ParentRoleId.HasValue && request.ParentRoleId.Value == role.Id)
        {
            return BadRequest("Role cannot be its own parent.");
        }

        if (parentRole is not null && parentRole.HierarchyPath is not null)
        {
            var parentPathParts = parentRole.HierarchyPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
            if (parentPathParts.Any(part => Guid.TryParse(part, out var parsed) && parsed == role.Id))
            {
                return BadRequest("Role hierarchy cannot be circular.");
            }
        }

        var previousParent = role.ParentRoleId;
        role.Name = normalizedName;
        role.Description = NormalizeDescription(request.Description);
        role.ParentRoleId = request.ParentRoleId;
        role.VisibilityScope = ParseVisibilityScope(request.VisibilityScope, role.VisibilityScope);
        role.SecurityLevelId = await ResolveSecurityLevelIdAsync(request.SecurityLevelId, cancellationToken);
        var actorName = User?.Identity?.Name ?? "system";
        if (string.IsNullOrWhiteSpace(role.BasePermissionsJson))
        {
            role.BasePermissionsJson = SerializePermissions(request.Permissions);
            role.BasePermissionsUpdatedAtUtc = DateTime.UtcNow;
        }
        if (!string.IsNullOrWhiteSpace(request.DriftNotes))
        {
            role.DriftNotes = request.DriftNotes.Trim();
        }

        if (previousParent != role.ParentRoleId)
        {
            await UpdateHierarchyAsync(role, parentRole, cancellationToken);
        }

        await SyncRolePermissionsAsync(role.Id, request.Permissions, cancellationToken);
        if (request.AcceptDrift == true)
        {
            role.BasePermissionsJson = SerializePermissions(request.Permissions);
            role.BasePermissionsUpdatedAtUtc = DateTime.UtcNow;
            role.DriftAcceptedAtUtc = DateTime.UtcNow;
            role.DriftAcceptedBy = actorName;
        }
        await _dbContext.SaveChangesAsync(cancellationToken);

        var refreshed = await FindRoleAsync(role.Id, cancellationToken);
        if (refreshed is null)
        {
            return NotFound();
        }

        var updatedInherited = await ResolveInheritedPermissionsAsync(refreshed, cancellationToken);
        return Ok(ToRoleResponse(refreshed, await ResolveDefaultSecurityLevelAsync(cancellationToken), updatedInherited));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
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

    private async Task<string?> ValidateRoleRequestAsync(UpsertRoleRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return "Role name is required.";
        }

        if (request.ParentRoleId.HasValue)
        {
            var parentExists = await _dbContext.Roles
                .AnyAsync(r => r.Id == request.ParentRoleId.Value && !r.IsDeleted, cancellationToken);
            if (!parentExists)
            {
                return "Parent role does not exist.";
            }
        }

        if (!string.IsNullOrWhiteSpace(request.VisibilityScope)
            && !Enum.TryParse<RoleVisibilityScope>(request.VisibilityScope, true, out _))
        {
            return "Visibility scope must be Self, Team, or All.";
        }

        if (request.SecurityLevelId.HasValue)
        {
            var exists = await _dbContext.SecurityLevelDefinitions
                .AnyAsync(s => s.Id == request.SecurityLevelId.Value && !s.IsDeleted, cancellationToken);
            if (!exists)
            {
                return "Security level does not exist.";
            }
        }

        if (request.Permissions is null || request.Permissions.Count == 0)
        {
            return "Assign at least one permission.";
        }

        var allowedKeys = await _dbContext.PermissionCatalogEntries
            .AsNoTracking()
            .Select(entry => entry.Key)
            .ToListAsync(cancellationToken);
        var allowedSet = new HashSet<string>(allowedKeys, NameComparer);
        var invalid = request.Permissions
            .Where(permission => string.IsNullOrWhiteSpace(permission) || !allowedSet.Contains(permission))
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
        var allowedKeys = await _dbContext.PermissionCatalogEntries
            .AsNoTracking()
            .Select(entry => entry.Key)
            .ToListAsync(cancellationToken);
        var allowedSet = new HashSet<string>(allowedKeys, NameComparer);
        var desired = permissions
            ?.Where(permission => !string.IsNullOrWhiteSpace(permission) && allowedSet.Contains(permission))
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
            .Include(r => r.SecurityLevel)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private RoleResponse ToRoleResponse(Role role, SecurityLevelDefinition? defaultSecurity, IReadOnlyList<string>? inheritedPermissions = null)
    {
        var permissions = role.Permissions
            .Where(rp => !rp.IsDeleted && !string.IsNullOrWhiteSpace(rp.Permission))
            .Select(rp => rp.Permission.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(permission => permission)
            .ToList();
        var basePermissions = DeserializePermissions(role.BasePermissionsJson);
        var inherited = inheritedPermissions ?? Array.Empty<string>();

        return new RoleResponse(
            role.Id,
            role.Name,
            role.Description,
            IsSystemRole(role.Name),
            role.ParentRoleId,
            role.HierarchyLevel,
            role.HierarchyPath,
            role.VisibilityScope.ToString(),
            role.SecurityLevelId ?? defaultSecurity?.Id,
            role.SecurityLevel?.Name ?? defaultSecurity?.Name,
            permissions,
            inherited,
            basePermissions,
            role.BasePermissionsUpdatedAtUtc,
            role.DriftNotes,
            role.DriftAcceptedAtUtc,
            role.DriftAcceptedBy);
    }

    private static List<string> DeserializePermissions(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return new List<string>();
        }

        try
        {
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }
        catch
        {
            return new List<string>();
        }
    }

    private static string SerializePermissions(IReadOnlyCollection<string> permissions)
    {
        var normalized = permissions
            .Where(permission => !string.IsNullOrWhiteSpace(permission))
            .Select(permission => permission.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(permission => permission)
            .ToList();
        return JsonSerializer.Serialize(normalized);
    }

    private async Task<IReadOnlyList<string>> ResolveInheritedPermissionsAsync(Role role, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(role.HierarchyPath))
        {
            return Array.Empty<string>();
        }

        var parts = role.HierarchyPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length <= 1)
        {
            return Array.Empty<string>();
        }

        var ancestorIds = parts
            .Select(part => Guid.TryParse(part, out var parsed) ? parsed : Guid.Empty)
            .Where(id => id != Guid.Empty && id != role.Id)
            .ToList();

        if (ancestorIds.Count == 0)
        {
            return Array.Empty<string>();
        }

        var ancestors = await _dbContext.Roles
            .AsNoTracking()
            .Where(r => ancestorIds.Contains(r.Id) && !r.IsDeleted)
            .Include(r => r.Permissions)
            .ToListAsync(cancellationToken);

        var inherited = ancestors
            .SelectMany(r => r.Permissions)
            .Where(rp => !rp.IsDeleted && !string.IsNullOrWhiteSpace(rp.Permission))
            .Select(rp => rp.Permission.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(permission => permission)
            .ToList();

        return inherited;
    }

    private static RoleVisibilityScope ParseVisibilityScope(string? scope, RoleVisibilityScope? fallback = null)
    {
        if (string.IsNullOrWhiteSpace(scope))
        {
            return fallback ?? RoleVisibilityScope.Team;
        }

        return Enum.TryParse<RoleVisibilityScope>(scope, true, out var parsed)
            ? parsed
            : fallback ?? RoleVisibilityScope.Team;
    }

    private async Task<SecurityLevelDefinition?> ResolveDefaultSecurityLevelAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.SecurityLevelDefinitions
            .AsNoTracking()
            .Where(s => !s.IsDeleted && s.IsDefault)
            .OrderByDescending(s => s.UpdatedAtUtc ?? s.CreatedAtUtc)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<Guid?> ResolveSecurityLevelIdAsync(Guid? securityLevelId, CancellationToken cancellationToken)
    {
        if (securityLevelId.HasValue)
        {
            return securityLevelId.Value;
        }

        var defaultSecurity = await ResolveDefaultSecurityLevelAsync(cancellationToken);
        return defaultSecurity?.Id;
    }

    private async Task<Role?> ResolveParentRoleAsync(Guid? parentRoleId, CancellationToken cancellationToken)
    {
        if (!parentRoleId.HasValue)
        {
            return null;
        }

        return await _dbContext.Roles
            .FirstOrDefaultAsync(r => r.Id == parentRoleId.Value && !r.IsDeleted, cancellationToken);
    }

    private async Task UpdateHierarchyAsync(Role role, Role? parentRole, CancellationToken cancellationToken)
    {
        var oldPath = role.HierarchyPath;
        var oldLevel = role.HierarchyLevel ?? 1;

        var newLevel = parentRole?.HierarchyLevel.HasValue == true
            ? parentRole.HierarchyLevel.Value + 1
            : 1;
        var newPath = parentRole?.HierarchyPath is { Length: > 0 }
            ? $"{parentRole.HierarchyPath}/{role.Id}"
            : role.Id.ToString();

        role.HierarchyLevel = newLevel;
        role.HierarchyPath = newPath;
        await _dbContext.SaveChangesAsync(cancellationToken);

        if (string.IsNullOrWhiteSpace(oldPath) || oldPath == newPath)
        {
            return;
        }

        var prefix = oldPath + "/";
        var descendants = await _dbContext.Roles
            .Where(r => !r.IsDeleted && r.HierarchyPath != null && r.HierarchyPath.StartsWith(prefix))
            .ToListAsync(cancellationToken);

        if (descendants.Count == 0)
        {
            return;
        }

        var levelDelta = newLevel - oldLevel;
        foreach (var descendant in descendants)
        {
            descendant.HierarchyPath = newPath + descendant.HierarchyPath!.Substring(oldPath.Length);
            if (descendant.HierarchyLevel.HasValue)
            {
                descendant.HierarchyLevel = descendant.HierarchyLevel.Value + levelDelta;
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
