using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using DomainPermissions = CRM.Enterprise.Security.Permissions;

namespace CRM.Enterprise.Api.Authorization;

/// <summary>
/// Requirement for accessing the Report Designer.
/// The required permission is configurable via workspace settings in the database.
/// </summary>
public class ReportDesignerRequirement : IAuthorizationRequirement
{
}

/// <summary>
/// Handles authorization for the Report Designer based on configured permission.
/// Reads the required permission from the tenant's workspace settings in the database,
/// falling back to appsettings.json, then to AdministrationManage if not configured.
/// </summary>
public class ReportDesignerAuthorizationHandler : AuthorizationHandler<ReportDesignerRequirement>
{
    private readonly IConfiguration _configuration;
    private readonly IServiceProvider _serviceProvider;

    public ReportDesignerAuthorizationHandler(IConfiguration configuration, IServiceProvider serviceProvider)
    {
        _configuration = configuration;
        _serviceProvider = serviceProvider;
    }

    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ReportDesignerRequirement requirement)
    {
        string? requiredPermission = null;

        // Try to get permission from tenant workspace settings in DB
        try
        {
            using var scope = _serviceProvider.CreateScope();
            var tenantProvider = scope.ServiceProvider.GetService<ITenantProvider>();
            var dbContext = scope.ServiceProvider.GetService<CrmDbContext>();

            if (tenantProvider is not null && dbContext is not null)
            {
                var tenant = await dbContext.Tenants
                    .AsNoTracking()
                    .FirstOrDefaultAsync(t => t.Id == tenantProvider.TenantId);

                requiredPermission = tenant?.ReportDesignerRequiredPermission;
            }
        }
        catch
        {
            // Fallback to configuration if DB access fails
        }

        // Fall back to appsettings.json if not set in DB
        requiredPermission ??= _configuration["Reporting:DesignerRequiredPermission"];

        // Default to AdministrationManage if nothing is configured
        requiredPermission ??= DomainPermissions.Policies.AdministrationManage;

        // Check if user has the required permission claim
        if (context.User.HasClaim(DomainPermissions.ClaimType, requiredPermission))
        {
            context.Succeed(requirement);
        }
    }
}
