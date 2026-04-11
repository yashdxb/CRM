using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Common;

public sealed class VisibilityResolver : IVisibilityResolver
{
    private readonly CrmDbContext _dbContext;

    public VisibilityResolver(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<VisibilityContext> ResolveAsync(Guid? userId, CancellationToken cancellationToken = default)
    {
        if (!userId.HasValue)
        {
            return new VisibilityContext(RoleVisibilityScope.All, null);
        }

        var userInfo = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == userId.Value)
            .Select(u => new { u.Id, u.TenantId })
            .FirstOrDefaultAsync(cancellationToken);

        if (userInfo is null)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId.Value });
        }

        var roleRows = await _dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => !ur.IsDeleted && ur.UserId == userId.Value)
            .Join(
                _dbContext.Roles
                    .AsNoTracking()
                    .Where(r => !r.IsDeleted && (r.TenantId == userInfo.TenantId || r.TenantId == Guid.Empty)),
                ur => ur.RoleId,
                r => r.Id,
                (ur, r) => new { r.Id, r.Name, r.HierarchyPath, r.VisibilityScope, r.TenantId })
            .ToListAsync(cancellationToken);

        if (roleRows.Count == 0)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId.Value });
        }

        // Admin roles always see everything
        if (roleRows.Any(r => string.Equals(r.Name, Permissions.RoleNames.SuperAdmin, StringComparison.OrdinalIgnoreCase)
                              || string.Equals(r.Name, Permissions.RoleNames.Admin, StringComparison.OrdinalIgnoreCase)
                              || string.Equals(r.Name, Permissions.RoleNames.InternalAdmin, StringComparison.OrdinalIgnoreCase)))
        {
            return new VisibilityContext(RoleVisibilityScope.All, null);
        }

        var effectiveScope = ResolveEffectiveScope(roleRows.Select(r => r.VisibilityScope));
        if (effectiveScope == RoleVisibilityScope.All)
        {
            return new VisibilityContext(RoleVisibilityScope.All, null);
        }

        if (effectiveScope == RoleVisibilityScope.Self)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId.Value });
        }

        // Team scope: find subordinates via hierarchy path
        var rolePaths = roleRows
            .Select(r => r.HierarchyPath)
            .Where(path => !string.IsNullOrWhiteSpace(path))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (rolePaths.Count == 0)
        {
            // No hierarchy paths → flat tenant; fall back to all active tenant users
            var tenantUserIds = await _dbContext.Users
                .AsNoTracking()
                .Where(u => u.TenantId == userInfo.TenantId && !u.IsDeleted && u.IsActive)
                .Select(u => u.Id)
                .ToListAsync(cancellationToken);

            if (!tenantUserIds.Contains(userId.Value))
            {
                tenantUserIds.Add(userId.Value);
            }

            return new VisibilityContext(RoleVisibilityScope.Team, tenantUserIds);
        }

        var descendantRoleIds = new HashSet<Guid>();
        var tenantRoles = await _dbContext.Roles
            .AsNoTracking()
            .Where(r => !r.IsDeleted
                        && (r.TenantId == userInfo.TenantId || r.TenantId == Guid.Empty)
                        && r.HierarchyPath != null)
            .Select(r => new { r.Id, r.HierarchyPath })
            .ToListAsync(cancellationToken);

        foreach (var role in tenantRoles)
        {
            if (role.HierarchyPath is null) continue;

            if (rolePaths.Any(path => !string.IsNullOrWhiteSpace(path)
                                      && role.HierarchyPath.StartsWith(path, StringComparison.OrdinalIgnoreCase)))
            {
                descendantRoleIds.Add(role.Id);
            }
        }

        if (descendantRoleIds.Count == 0)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId.Value });
        }

        var teamUserIds = await _dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => !ur.IsDeleted && descendantRoleIds.Contains(ur.RoleId))
            .Select(ur => ur.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);

        if (teamUserIds.Count <= 1)
        {
            // Only self or empty → fall back to all active tenant users
            teamUserIds = await _dbContext.Users
                .AsNoTracking()
                .Where(u => u.TenantId == userInfo.TenantId && !u.IsDeleted && u.IsActive)
                .Select(u => u.Id)
                .ToListAsync(cancellationToken);
        }

        if (!teamUserIds.Contains(userId.Value))
        {
            teamUserIds.Add(userId.Value);
        }

        return new VisibilityContext(RoleVisibilityScope.Team, teamUserIds);
    }

    private static RoleVisibilityScope ResolveEffectiveScope(IEnumerable<RoleVisibilityScope> scopes)
    {
        var scopeList = scopes.ToList();
        if (scopeList.Any(scope => scope == RoleVisibilityScope.All))
        {
            return RoleVisibilityScope.All;
        }

        if (scopeList.Any(scope => scope == RoleVisibilityScope.Team))
        {
            return RoleVisibilityScope.Team;
        }

        return RoleVisibilityScope.Self;
    }
}
