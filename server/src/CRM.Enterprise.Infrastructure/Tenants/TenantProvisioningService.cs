using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Tenants;

public sealed class TenantProvisioningService : ITenantProvisioningService
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IPasswordHasher<User> _passwordHasher;

    public TenantProvisioningService(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IPasswordHasher<User> passwordHasher)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _passwordHasher = passwordHasher;
    }

    public async Task<Guid> ProvisionTenantAsync(
        string key,
        string name,
        string adminName,
        string adminEmail,
        string adminPassword,
        string? timeZone,
        string? currency,
        string? industryPreset,
        IReadOnlyList<string>? industryModules,
        CancellationToken cancellationToken = default)
    {
        var normalizedKey = key.Trim();
        var normalizedName = name.Trim();

        if (await _dbContext.Tenants.AnyAsync(t => t.Key == normalizedKey, cancellationToken))
        {
            throw new InvalidOperationException("Tenant key already exists.");
        }

        var tenant = new Tenant
        {
            Key = normalizedKey,
            Name = normalizedName,
            TimeZone = string.IsNullOrWhiteSpace(timeZone) ? "UTC" : timeZone.Trim(),
            Currency = string.IsNullOrWhiteSpace(currency) ? "USD" : currency.Trim(),
            IndustryPreset = string.IsNullOrWhiteSpace(industryPreset) ? "CoreCRM" : industryPreset.Trim(),
            IndustryModules = industryModules is { Count: > 0 } ? string.Join(',', industryModules) : null,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Tenants.Add(tenant);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var originalTenantId = _tenantProvider.TenantId;
        var originalTenantKey = _tenantProvider.TenantKey;

        try
        {
            _tenantProvider.SetTenant(tenant.Id, tenant.Key);
            await SeedDefaultsAsync(adminName, adminEmail, adminPassword, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
        finally
        {
            _tenantProvider.SetTenant(originalTenantId, originalTenantKey);
        }

        return tenant.Id;
    }

    private async Task SeedDefaultsAsync(
        string adminName,
        string adminEmail,
        string adminPassword,
        CancellationToken cancellationToken)
    {
        if (!await _dbContext.Roles.AnyAsync(cancellationToken))
        {
            var adminRole = new Role
            {
                Name = Permissions.RoleNames.Admin,
                Description = "System administrator"
            };

            _dbContext.Roles.Add(adminRole);
            foreach (var permission in Permissions.WorkspaceAdminKeys)
            {
                _dbContext.RolePermissions.Add(new RolePermission
                {
                    Role = adminRole,
                    Permission = permission
                });
            }

            var adminUser = new User
            {
                FullName = adminName.Trim(),
                Email = adminEmail.Trim(),
                TimeZone = "UTC",
                Locale = "en-US",
                IsActive = true
            };
            adminUser.PasswordHash = _passwordHasher.HashPassword(adminUser, adminPassword);
            _dbContext.Users.Add(adminUser);
            _dbContext.UserRoles.Add(new UserRole
            {
                User = adminUser,
                Role = adminRole
            });
        }

        if (!await _dbContext.LeadAssignmentRules.AnyAsync(cancellationToken))
        {
            _dbContext.LeadAssignmentRules.Add(new LeadAssignmentRule
            {
                Name = "Default Round Robin",
                Type = "RoundRobin",
                IsActive = true,
                CreatedAtUtc = DateTime.UtcNow
            });
        }

        if (!await _dbContext.OpportunityStages.AnyAsync(cancellationToken))
        {
            var now = DateTime.UtcNow;
            _dbContext.OpportunityStages.AddRange(new[]
            {
                new OpportunityStage { Name = "Prospecting", Order = 1, IsClosedStage = false, ForecastCategory = "Pipeline", CreatedAtUtc = now },
                new OpportunityStage { Name = "Qualification", Order = 2, IsClosedStage = false, ForecastCategory = "Pipeline", CreatedAtUtc = now },
                new OpportunityStage { Name = "Proposal", Order = 3, IsClosedStage = false, ForecastCategory = "Best Case", CreatedAtUtc = now },
                new OpportunityStage { Name = "Negotiation", Order = 4, IsClosedStage = false, ForecastCategory = "Commit", CreatedAtUtc = now },
                new OpportunityStage { Name = "Closed Won", Order = 5, IsClosedStage = true, ForecastCategory = "Closed", CreatedAtUtc = now },
                new OpportunityStage { Name = "Closed Lost", Order = 6, IsClosedStage = true, ForecastCategory = "Omitted", CreatedAtUtc = now }
            });
        }
    }
}
