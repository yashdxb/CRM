using System;
using CRM.Enterprise.Infrastructure.Auth;
using CRM.Enterprise.Infrastructure.Presence;
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
using CRM.Enterprise.Application.Customers;
using CRM.Enterprise.Application.Contacts;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Activities;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Infrastructure.Notifications;
using CRM.Enterprise.Infrastructure.Leads;
using CRM.Enterprise.Infrastructure.Activities;
using CRM.Enterprise.Infrastructure.Opportunities;
using CRM.Enterprise.Infrastructure.Customers;
using CRM.Enterprise.Infrastructure.Contacts;
using CRM.Enterprise.Infrastructure.Approvals;
using MediatR;
using Azure.Messaging.ServiceBus;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CRM.Enterprise.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddMediatR(typeof(LeadQualifiedEventHandler).Assembly);

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
        services.Configure<AcsEmailOptions>(configuration.GetSection(AcsEmailOptions.SectionName));
        services.Configure<ApprovalQueueOptions>(configuration.GetSection(ApprovalQueueOptions.SectionName));
        services.AddScoped<IAuthService, AuthService>();
        services.AddHttpContextAccessor();
        services.AddSingleton<IPresenceTracker, PresenceTracker>();
        services.AddHttpClient<LoginLocationService>();
        services.AddScoped<LoginLocationService>();
        services.AddHttpClient<GraphEmailSender>();
        services.AddSingleton<AcsEmailSender>();
        services.AddSingleton<ServiceBusClient?>(sp =>
        {
            var options = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<AcsEmailOptions>>().Value;
            if (string.IsNullOrWhiteSpace(options.ServiceBusConnectionString))
            {
                return null;
            }

            return new ServiceBusClient(options.ServiceBusConnectionString);
        });
        services.AddSingleton<ServiceBusEmailQueue>();
        services.AddSingleton<ServiceBusApprovalQueue>();
        services.AddHostedService<EmailQueueWorker>();
        services.AddSingleton<IEmailSender>(sp =>
        {
            var options = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<AcsEmailOptions>>().Value;
            if (options.UseQueue && !string.IsNullOrWhiteSpace(options.ServiceBusConnectionString))
            {
                return new QueuedEmailSender(sp.GetRequiredService<ServiceBusEmailQueue>());
            }

            return sp.GetRequiredService<AcsEmailSender>();
        });
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
        services.AddScoped<ILeadService, LeadService>();
        services.AddScoped<ILeadImportService, LeadImportService>();
        services.AddScoped<IActivityService, ActivityService>();
        services.AddScoped<IOpportunityService, OpportunityService>();
        services.AddScoped<IOpportunityApprovalService, OpportunityApprovalService>();
        services.AddScoped<ICustomerService, CustomerService>();
        services.AddScoped<ICustomerImportService, CustomerImportService>();
        services.AddScoped<IContactService, ContactService>();
        services.AddScoped<IContactImportService, ContactImportService>();
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
