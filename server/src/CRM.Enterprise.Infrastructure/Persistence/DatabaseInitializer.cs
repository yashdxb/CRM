using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Security;
using CRM.Enterprise.Application.Tenants;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace CRM.Enterprise.Infrastructure.Persistence;

public class DatabaseInitializer : IDatabaseInitializer
{
    private readonly CrmDbContext _dbContext;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly ITenantProvider _tenantProvider;
    private readonly IConfiguration _configuration;

    public DatabaseInitializer(
        CrmDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        ITenantProvider tenantProvider,
        IConfiguration configuration)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _tenantProvider = tenantProvider;
        _configuration = configuration;
    }

    private readonly (string Name, string Email, string TimeZone, string Locale, string[] Roles, string Password)[] _seedUsers =
    {
        ("Super Admin", "super.admin@crmenterprise.demo", "UTC", "en-US", new[] { Permissions.RoleNames.SuperAdmin }, "ChangeThisSuper!1"),
        ("Yasser Ahamed", "yasser.ahamed@live.com", "UTC", "en-US", new[] { "Admin" }, "ChangeThisAdmin!1"),
        ("Jordan Patel", "jordan.patel@crmenterprise.demo", "America/New_York", "en-US", new[] { "Sales Manager" }, "ChangeThisSales!1"),
        ("Ava Chen", "ava.chen@crmenterprise.demo", "America/Los_Angeles", "en-US", new[] { "Sales Rep" }, "ChangeThisRep!1"),
        ("Leo Martins", "leo.martins@crmenterprise.demo", "Europe/London", "en-GB", new[] { "Marketing Ops" }, "ChangeThisMops!1"),
        ("Priya Nair", "priya.nair@crmenterprise.demo", "Asia/Kolkata", "en-IN", new[] { "Customer Success" }, "ChangeThisCsm!1"),
        ("Nina Okafor", "nina.okafor@crmenterprise.demo", "America/Chicago", "en-US", new[] { "Support" }, "ChangeThisSup!1" )
    };

    private readonly (string Name, string Description, string[] Permissions)[] _roleDefinitions =
    {
        (Permissions.RoleNames.SuperAdmin, "Platform super administrator", Permissions.AllKeys.ToArray()),
        (Permissions.RoleNames.Admin, "System administrator", Permissions.WorkspaceAdminKeys.ToArray()),
        (
            Permissions.RoleNames.SalesManager,
            "Manages team pipeline and forecasts",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.CustomersView,
                Permissions.Policies.CustomersManage,
                Permissions.Policies.ContactsView,
                Permissions.Policies.ContactsManage,
                Permissions.Policies.LeadsView,
                Permissions.Policies.LeadsManage,
                Permissions.Policies.OpportunitiesView,
                Permissions.Policies.OpportunitiesManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        ),
        (
            Permissions.RoleNames.SalesRep,
            "Owns assigned accounts and opportunities",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.CustomersView,
                Permissions.Policies.CustomersManage,
                Permissions.Policies.ContactsView,
                Permissions.Policies.ContactsManage,
                Permissions.Policies.LeadsView,
                Permissions.Policies.LeadsManage,
                Permissions.Policies.OpportunitiesView,
                Permissions.Policies.OpportunitiesManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        ),
        (
            Permissions.RoleNames.MarketingOps,
            "Runs campaigns and lead intake",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.LeadsView,
                Permissions.Policies.LeadsManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        ),
        (
            Permissions.RoleNames.CustomerSuccess,
            "Manages onboarding and renewals",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.CustomersView,
                Permissions.Policies.CustomersManage,
                Permissions.Policies.ContactsView,
                Permissions.Policies.ContactsManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        ),
        (
            Permissions.RoleNames.Support,
            "Handles escalations and tickets",
            new[]
            {
                Permissions.Policies.DashboardView,
                Permissions.Policies.CustomersView,
                Permissions.Policies.CustomersManage,
                Permissions.Policies.ContactsView,
                Permissions.Policies.ContactsManage,
                Permissions.Policies.ActivitiesView,
                Permissions.Policies.ActivitiesManage
            }
        )
    };

    private static readonly HashSet<string> PermissionCatalog = new(Permissions.AllKeys, StringComparer.OrdinalIgnoreCase);

    public async Task InitializeAsync(CancellationToken cancellationToken = default)
    {
        await _dbContext.Database.MigrateAsync(cancellationToken);

        await SeedPermissionCatalogAsync(cancellationToken);

        var defaultTenant = await EnsureDefaultTenantAsync(cancellationToken);
        var seedTenants = await EnsureSeedTenantsAsync(defaultTenant.Key, cancellationToken);

        await BackfillTenantIdsAsync(defaultTenant.Id, cancellationToken);
        await SeedTenantDataAsync(defaultTenant, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        foreach (var tenant in seedTenants)
        {
            await SeedTenantDataAsync(tenant, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }

    private async Task SeedRolesAsync(CancellationToken cancellationToken)
    {
        foreach (var (name, description, permissions) in _roleDefinitions)
        {
            var role = await EnsureRoleAsync(name, description, cancellationToken);
            await SyncRolePermissionsAsync(role, permissions, cancellationToken);
        }
    }

    private async Task SeedPermissionCatalogAsync(CancellationToken cancellationToken)
    {
        var existingKeys = await _dbContext.PermissionCatalogEntries
            .Select(entry => entry.Key)
            .ToListAsync(cancellationToken);

        var existingKeySet = new HashSet<string>(existingKeys, StringComparer.OrdinalIgnoreCase);
        var entriesToAdd = Permissions.Definitions
            .Where(definition => !existingKeySet.Contains(definition.Key))
            .Select(definition => new PermissionCatalogEntry
            {
                Id = Guid.NewGuid(),
                Key = definition.Key,
                Label = definition.Label,
                Description = definition.Description
            })
            .ToList();

        if (entriesToAdd.Count == 0)
        {
            return;
        }

        _dbContext.PermissionCatalogEntries.AddRange(entriesToAdd);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task SeedUsersAsync(CancellationToken cancellationToken)
    {
        foreach (var (name, email, tz, locale, roles, password) in _seedUsers)
        {
            await EnsureDemoUserAsync(name, email, tz, locale, roles, password, cancellationToken);
        }
    }

    private async Task SeedLeadStatusesAsync(CancellationToken cancellationToken)
    {
        if (await _dbContext.LeadStatuses.AnyAsync(cancellationToken))
        {
            return;
        }

        var now = DateTime.UtcNow;
        var statuses = new[]
        {
            new LeadStatus { Name = "New", Order = 1, IsDefault = true, IsClosed = false, CreatedAtUtc = now },
            new LeadStatus { Name = "Qualified", Order = 2, IsClosed = false, CreatedAtUtc = now },
            new LeadStatus { Name = "Converted", Order = 3, IsClosed = true, CreatedAtUtc = now },
            new LeadStatus { Name = "Lost", Order = 4, IsClosed = true, CreatedAtUtc = now }
        };

        _dbContext.LeadStatuses.AddRange(statuses);
    }

    private async Task SeedLeadAssignmentRulesAsync(CancellationToken cancellationToken)
    {
        if (await _dbContext.LeadAssignmentRules.AnyAsync(cancellationToken))
        {
            return;
        }

        _dbContext.LeadAssignmentRules.Add(new LeadAssignmentRule
        {
            Name = "Default Round Robin",
            Type = "RoundRobin",
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow
        });
    }

    private async Task SeedOpportunityStagesAsync(CancellationToken cancellationToken)
    {
        if (await _dbContext.OpportunityStages.AnyAsync(cancellationToken))
        {
            return;
        }

        var now = DateTime.UtcNow;
        var stages = new[]
        {
            new OpportunityStage { Name = "Prospecting", Order = 1, IsClosedStage = false, ForecastCategory = "Pipeline", CreatedAtUtc = now },
            new OpportunityStage { Name = "Qualification", Order = 2, IsClosedStage = false, ForecastCategory = "Pipeline", CreatedAtUtc = now },
            new OpportunityStage { Name = "Proposal", Order = 3, IsClosedStage = false, ForecastCategory = "Best Case", CreatedAtUtc = now },
            new OpportunityStage { Name = "Negotiation", Order = 4, IsClosedStage = false, ForecastCategory = "Commit", CreatedAtUtc = now },
            new OpportunityStage { Name = "Closed Won", Order = 5, IsClosedStage = true, ForecastCategory = "Closed", CreatedAtUtc = now },
            new OpportunityStage { Name = "Closed Lost", Order = 6, IsClosedStage = true, ForecastCategory = "Omitted", CreatedAtUtc = now }
        };

        _dbContext.OpportunityStages.AddRange(stages);
    }

    private async Task SeedSampleDataAsync(CancellationToken cancellationToken)
    {
        if (await _dbContext.Accounts.AnyAsync(cancellationToken))
        {
            return;
        }

        var ownerEmails = new[] { "jordan.patel@crmenterprise.demo", "yasser.ahamed@live.com" };
        var owner = await _dbContext.Users.FirstOrDefaultAsync(u => ownerEmails.Contains(u.Email), cancellationToken)
            ?? await _dbContext.Users.FirstOrDefaultAsync(cancellationToken);

        if (owner is null)
        {
            return;
        }

        var now = DateTime.UtcNow;

        var cedar = new Account
        {
            Name = "Cedar Analytics",
            AccountNumber = "C-1001",
            Phone = "+1 555-0101",
            LifecycleStage = "Customer",
            Industry = "Analytics",
            OwnerId = owner.Id,
            Description = "Analytics platform customer",
            CreatedAtUtc = now.AddDays(-30)
        };

        var evergreen = new Account
        {
            Name = "Evergreen Foods",
            AccountNumber = "C-1002",
            Phone = "+1 555-0102",
            LifecycleStage = "Lead",
            Industry = "CPG",
            OwnerId = owner.Id,
            Description = "Food manufacturer lead",
            CreatedAtUtc = now.AddDays(-14)
        };

        var latitude = new Account
        {
            Name = "Latitude Ventures",
            AccountNumber = "C-1003",
            Phone = "+1 555-0103",
            LifecycleStage = "Prospect",
            Industry = "VC",
            OwnerId = owner.Id,
            Description = "Investment firm prospect",
            CreatedAtUtc = now.AddDays(-7)
        };

        _dbContext.Accounts.AddRange(cedar, evergreen, latitude);

        _dbContext.Contacts.AddRange(
            new Contact
            {
                FirstName = "Liam",
                LastName = "Murphy",
                Email = "liam.murphy@cedaranalytics.com",
                Phone = "+1 555-1101",
                Account = cedar,
                OwnerId = owner.Id,
                LifecycleStage = "Customer",
                CreatedAtUtc = now.AddDays(-28)
            },
            new Contact
            {
                FirstName = "Daniel",
                LastName = "Wu",
                Email = "daniel.wu@evergreenfoods.com",
                Phone = "+1 555-1102",
                Account = evergreen,
                OwnerId = owner.Id,
                LifecycleStage = "Lead",
                CreatedAtUtc = now.AddDays(-12)
            },
            new Contact
            {
                FirstName = "Carlos",
                LastName = "Mendes",
                Email = "carlos.mendes@latitude.vc",
                Phone = "+1 555-1103",
                Account = latitude,
                OwnerId = owner.Id,
                LifecycleStage = "Prospect",
                CreatedAtUtc = now.AddDays(-6)
            });

        _dbContext.Activities.AddRange(
            new Activity
            {
                Subject = "Renewal prep",
                Description = "Prep renewal deck for Cedar Analytics",
                Type = ActivityType.Meeting,
                RelatedEntityType = ActivityRelationType.Account,
                RelatedEntityId = cedar.Id,
                OwnerId = owner.Id,
                DueDateUtc = now.AddDays(1),
                Location = "Video call",
                Priority = "High",
                CreatedAtUtc = now
            },
            new Activity
            {
                Subject = "Lead qualification",
                Description = "Qualify Evergreen Foods lead",
                Type = ActivityType.Call,
                RelatedEntityType = ActivityRelationType.Account,
                RelatedEntityId = evergreen.Id,
                OwnerId = owner.Id,
                DueDateUtc = now.AddDays(2),
                Priority = "Normal",
                CreatedAtUtc = now
            },
            new Activity
            {
                Subject = "Send pricing sheet",
                Description = "Share pricing with Latitude Ventures",
                Type = ActivityType.Email,
                RelatedEntityType = ActivityRelationType.Account,
                RelatedEntityId = latitude.Id,
                OwnerId = owner.Id,
                DueDateUtc = now.AddDays(3),
                Priority = "Normal",
                CreatedAtUtc = now
            });
    }

    private async Task<Tenant> EnsureDefaultTenantAsync(CancellationToken cancellationToken)
    {
        var defaultKey = _configuration["Tenant:DefaultKey"] ?? "default";
        var tenant = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Key == defaultKey, cancellationToken);
        if (tenant is not null)
        {
            return tenant;
        }

        tenant = new Tenant
        {
            Key = defaultKey,
            Name = "Default Workspace",
            TimeZone = "UTC",
            Currency = "USD",
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Tenants.Add(tenant);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return tenant;
    }

    private async Task<IReadOnlyList<Tenant>> EnsureSeedTenantsAsync(string defaultKey, CancellationToken cancellationToken)
    {
        var seedKeys = _configuration.GetSection("Tenant:SeedKeys").Get<string[]>() ?? Array.Empty<string>();
        if (seedKeys.Length == 0)
        {
            return Array.Empty<Tenant>();
        }

        var tenants = new List<Tenant>();
        var added = false;
        foreach (var rawKey in seedKeys)
        {
            var key = rawKey?.Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(key) || string.Equals(key, defaultKey, StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            var existing = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Key == key, cancellationToken);
            if (existing is not null)
            {
                tenants.Add(existing);
                continue;
            }

            var name = char.ToUpperInvariant(key[0]) + key[1..] + " Workspace";
            var tenant = new Tenant
            {
                Key = key,
                Name = name,
                TimeZone = "UTC",
                Currency = "USD",
                CreatedAtUtc = DateTime.UtcNow
            };
            _dbContext.Tenants.Add(tenant);
            tenants.Add(tenant);
            added = true;
        }

        if (added)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return tenants;
    }

    private async Task SeedTenantDataAsync(Tenant tenant, CancellationToken cancellationToken)
    {
        var originalTenantId = _tenantProvider.TenantId;
        var originalTenantKey = _tenantProvider.TenantKey;

        try
        {
            _tenantProvider.SetTenant(tenant.Id, tenant.Key);
            await SeedRolesAsync(cancellationToken);
            await SeedUsersAsync(cancellationToken);
            await SeedLeadStatusesAsync(cancellationToken);
            await SeedLeadAssignmentRulesAsync(cancellationToken);
            await SeedOpportunityStagesAsync(cancellationToken);
            await SeedSampleDataAsync(cancellationToken);
        }
        finally
        {
            _tenantProvider.SetTenant(originalTenantId, originalTenantKey);
        }
    }

    private async Task BackfillTenantIdsAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        if (tenantId == Guid.Empty)
        {
            return;
        }

        await _dbContext.Users.IgnoreQueryFilters()
            .Where(u => u.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(u => u.TenantId, tenantId), cancellationToken);

        await _dbContext.Roles.IgnoreQueryFilters()
            .Where(r => r.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(r => r.TenantId, tenantId), cancellationToken);

        await _dbContext.UserRoles.IgnoreQueryFilters()
            .Where(ur => ur.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(ur => ur.TenantId, tenantId), cancellationToken);

        await _dbContext.RolePermissions.IgnoreQueryFilters()
            .Where(rp => rp.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(rp => rp.TenantId, tenantId), cancellationToken);

        await _dbContext.Accounts.IgnoreQueryFilters()
            .Where(a => a.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(a => a.TenantId, tenantId), cancellationToken);

        await _dbContext.Contacts.IgnoreQueryFilters()
            .Where(c => c.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.TenantId, tenantId), cancellationToken);

        await _dbContext.Leads.IgnoreQueryFilters()
            .Where(l => l.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(l => l.TenantId, tenantId), cancellationToken);

        await _dbContext.LeadStatuses.IgnoreQueryFilters()
            .Where(ls => ls.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(ls => ls.TenantId, tenantId), cancellationToken);

        await _dbContext.LeadStatusHistories.IgnoreQueryFilters()
            .Where(lsh => lsh.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(lsh => lsh.TenantId, tenantId), cancellationToken);

        await _dbContext.LeadAssignmentRules.IgnoreQueryFilters()
            .Where(rule => rule.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(rule => rule.TenantId, tenantId), cancellationToken);

        await _dbContext.Opportunities.IgnoreQueryFilters()
            .Where(o => o.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(o => o.TenantId, tenantId), cancellationToken);

        await _dbContext.OpportunityStages.IgnoreQueryFilters()
            .Where(os => os.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(os => os.TenantId, tenantId), cancellationToken);

        await _dbContext.OpportunityStageHistories.IgnoreQueryFilters()
            .Where(osh => osh.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(osh => osh.TenantId, tenantId), cancellationToken);

        await _dbContext.Activities.IgnoreQueryFilters()
            .Where(a => a.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(a => a.TenantId, tenantId), cancellationToken);

        await _dbContext.CustomFieldDefinitions.IgnoreQueryFilters()
            .Where(cfd => cfd.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(cfd => cfd.TenantId, tenantId), cancellationToken);

        await _dbContext.CustomFieldValues.IgnoreQueryFilters()
            .Where(cfv => cfv.TenantId == Guid.Empty)
            .ExecuteUpdateAsync(s => s.SetProperty(cfv => cfv.TenantId, tenantId), cancellationToken);
    }

    private async Task<User> EnsureDemoUserAsync(
        string fullName,
        string email,
        string timeZone,
        string locale,
        IEnumerable<string> roleNames,
        string defaultPassword,
        CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
        if (user is null)
        {
            user = new User
            {
                FullName = fullName,
                Email = email,
                TimeZone = timeZone,
                Locale = locale,
                IsActive = true
            };
            _dbContext.Users.Add(user);
        }
        else
        {
            user.FullName = fullName;
            user.Email = email;
            user.TimeZone = timeZone;
            user.Locale = locale;
            user.IsActive = true;
        }

        if (string.IsNullOrWhiteSpace(user.PasswordHash))
        {
            user.PasswordHash = _passwordHasher.HashPassword(user, defaultPassword);
        }

        await SyncRoleAssignmentsAsync(user, roleNames, cancellationToken);
        return user;
    }

    private async Task SyncRoleAssignmentsAsync(User user, IEnumerable<string> roleNames, CancellationToken cancellationToken)
    {
        var roleSet = roleNames.ToHashSet(StringComparer.OrdinalIgnoreCase);
        if (roleSet.Count == 0)
        {
            return;
        }

        var tenantId = _tenantProvider.TenantId;
        var roleIds = await _dbContext.Roles
            .IgnoreQueryFilters()
            .Where(r => roleSet.Contains(r.Name) && !r.IsDeleted && r.TenantId == tenantId)
            .Select(r => r.Id)
            .ToListAsync(cancellationToken);

        var existing = await _dbContext.UserRoles
            .IgnoreQueryFilters()
            .Where(ur => ur.UserId == user.Id && (ur.TenantId == tenantId || ur.TenantId == Guid.Empty))
            .ToListAsync(cancellationToken);
        foreach (var link in existing.Where(ur => ur.TenantId == Guid.Empty))
        {
            link.TenantId = tenantId;
        }

        var assigned = existing.Select(ur => ur.RoleId).ToHashSet();
        var staleLinks = existing.Where(ur => !roleIds.Contains(ur.RoleId)).ToList();
        if (staleLinks.Count > 0)
        {
            _dbContext.UserRoles.RemoveRange(staleLinks);
        }

        foreach (var roleId in roleIds)
        {
            if (!assigned.Contains(roleId))
            {
                _dbContext.UserRoles.Add(new UserRole
                {
                    UserId = user.Id,
                    RoleId = roleId,
                    CreatedAtUtc = DateTime.UtcNow
                });
            }
        }
    }

    private async Task SyncRolePermissionsAsync(Role role, IEnumerable<string> permissions, CancellationToken cancellationToken)
    {
        var desired = permissions
            .Where(permission => !string.IsNullOrWhiteSpace(permission) && PermissionCatalog.Contains(permission))
            .Select(permission => permission!.Trim())
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        var existing = await _dbContext.RolePermissions
            .IgnoreQueryFilters()
            .Where(rp => rp.RoleId == role.Id)
            .ToListAsync(cancellationToken);
        var tenantId = _tenantProvider.TenantId;
        foreach (var permission in existing.Where(rp => rp.TenantId != tenantId))
        {
            permission.TenantId = tenantId;
        }
        var local = _dbContext.RolePermissions.Local
            .Where(rp => rp.RoleId == role.Id)
            .Select(rp => rp.Permission)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        if (desired.Count == 0)
        {
            if (existing.Count > 0)
            {
                _dbContext.RolePermissions.RemoveRange(existing);
            }
            return;
        }

        var stale = existing
            .Where(rp => !desired.Contains(rp.Permission))
            .ToList();

        if (stale.Count > 0)
        {
            _dbContext.RolePermissions.RemoveRange(stale);
        }

        foreach (var permission in desired)
        {
            var alreadyAssigned = existing.Any(rp => string.Equals(rp.Permission, permission, StringComparison.OrdinalIgnoreCase));
            if (!alreadyAssigned && local.Contains(permission))
            {
                alreadyAssigned = true;
            }
            if (!alreadyAssigned)
            {
                _dbContext.RolePermissions.Add(new RolePermission
                {
                    RoleId = role.Id,
                    Permission = permission
                });
                local.Add(permission);
            }
        }
    }

    private async Task<Role> EnsureRoleAsync(string name, string description, CancellationToken cancellationToken)
    {
        var existing = await _dbContext.Roles.FirstOrDefaultAsync(r => r.Name == name, cancellationToken);
        if (existing is not null)
        {
            return existing;
        }

        var role = new Role
        {
            Name = name,
            Description = description,
            CreatedAtUtc = DateTime.UtcNow
        };
        _dbContext.Roles.Add(role);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return role;
    }
}
