using CRM.Enterprise.Infrastructure.Auth;
using CRM.Enterprise.Infrastructure.Dashboard;
using CRM.Enterprise.Infrastructure.Tenants;
using CRM.Enterprise.Application.Auth;
using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CRM.Enterprise.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("SqlServer")
            ?? throw new InvalidOperationException("Connection string 'SqlServer' was not found.");

        services.AddDbContext<CrmDbContext>(options =>
            options.UseSqlServer(connectionString));
        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
        services.AddScoped<IDatabaseInitializer, DatabaseInitializer>();
        services.AddScoped<ITenantProvider, TenantProvider>();
        services.AddScoped<ITenantProvisioningService, TenantProvisioningService>();
        services.AddScoped<IDashboardReadService, DashboardReadService>();
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}
