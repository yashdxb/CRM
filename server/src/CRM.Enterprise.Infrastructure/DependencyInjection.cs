using System;
using CRM.Enterprise.Infrastructure.Auth;
using CRM.Enterprise.Infrastructure.Audit;
using CRM.Enterprise.Infrastructure.Dashboard;
using CRM.Enterprise.Infrastructure.Tenants;
using CRM.Enterprise.Infrastructure.Suppliers;
using CRM.Enterprise.Infrastructure.Catalog;
using CRM.Enterprise.Infrastructure.Pricing;
using CRM.Enterprise.Infrastructure.Sourcing;
using CRM.Enterprise.Application.Auth;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Application.Suppliers;
using CRM.Enterprise.Application.Catalog;
using CRM.Enterprise.Application.Pricing;
using CRM.Enterprise.Application.Sourcing;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Infrastructure.Notifications;
using CRM.Enterprise.Infrastructure.Leads;
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
            options.UseSqlServer(connectionString, sql =>
                sql.EnableRetryOnFailure(3, TimeSpan.FromSeconds(2), null)));
        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
        services.AddScoped<IDatabaseInitializer, DatabaseInitializer>();
        services.AddScoped<ITenantProvider, TenantProvider>();
        services.AddScoped<ITenantProvisioningService, TenantProvisioningService>();
        services.AddScoped<IDashboardReadService, DashboardReadService>();
        services.AddScoped<IDashboardLayoutService, DashboardLayoutService>();
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.Configure<GraphMailOptions>(configuration.GetSection(GraphMailOptions.SectionName));
        services.AddScoped<IAuthService, AuthService>();
        services.AddHttpContextAccessor();
        services.AddHttpClient<LoginLocationService>();
        services.AddScoped<LoginLocationService>();
        services.AddHttpClient<GraphEmailSender>();
        services.AddScoped<IEmailSender, GraphEmailSender>();
        services.Configure<OpenAiOptions>(configuration.GetSection(OpenAiOptions.SectionName));
        services.AddHttpClient<OpenAiLeadScoringService>((sp, client) =>
        {
            var options = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<OpenAiOptions>>().Value;
            if (!string.IsNullOrWhiteSpace(options.BaseUrl))
            {
                client.BaseAddress = new Uri(options.BaseUrl);
            }
        });
        services.AddScoped<ILeadScoringService>(sp => sp.GetRequiredService<OpenAiLeadScoringService>());
        services.AddScoped<IAuditEventService, AuditEventService>();
        services.AddScoped<ISupplierService, SupplierService>();
        services.AddScoped<IItemMasterService, ItemMasterService>();
        services.AddScoped<IPriceListService, PriceListService>();
        services.AddScoped<IRfqReadService, RfqReadService>();
        services.AddScoped<IRfqService, RfqService>();
        services.AddScoped<ISupplierQuoteReadService, SupplierQuoteReadService>();
        services.AddScoped<IRfqAwardReadService, RfqAwardReadService>();
        services.AddScoped<IRfqAwardService, RfqAwardService>();

        return services;
    }
}
