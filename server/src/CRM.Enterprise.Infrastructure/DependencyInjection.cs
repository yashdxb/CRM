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
using CRM.Enterprise.Application.Decisions;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Marketing;
using CRM.Enterprise.Application.Emails;
using CRM.Enterprise.Application.DirectChat;
using CRM.Enterprise.Application.HelpDesk;
using CRM.Enterprise.Application.Workflows;
using CRM.Enterprise.Application.Properties;
using CRM.Enterprise.Application.DocuSign;
using CRM.Enterprise.Infrastructure.DocuSign;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Infrastructure.Notifications;
using CRM.Enterprise.Infrastructure.Leads;
using CRM.Enterprise.Infrastructure.AI;
using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Infrastructure.Activities;
using CRM.Enterprise.Infrastructure.Decisions;
using CRM.Enterprise.Infrastructure.Opportunities;
using CRM.Enterprise.Infrastructure.Marketing;
using CRM.Enterprise.Infrastructure.Customers;
using CRM.Enterprise.Infrastructure.Contacts;
using CRM.Enterprise.Infrastructure.DirectChat;
using CRM.Enterprise.Infrastructure.HelpDesk;
using CRM.Enterprise.Infrastructure.Approvals;
using CRM.Enterprise.Infrastructure.Properties;
using CRM.Enterprise.Infrastructure.Emails;
using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Infrastructure.Lookups;
using CRM.Enterprise.Application.Reporting;
using CRM.Enterprise.Infrastructure.Reporting;
using CRM.Enterprise.Infrastructure.Workflows;
using MediatR;
using Azure.Messaging.ServiceBus;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

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
        services.AddScoped<IIndustryPresetService, IndustryPresetService>();
        services.AddScoped<IDashboardReadService, DashboardReadService>();
        services.AddScoped<IDashboardLayoutService, DashboardLayoutService>();
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.Configure<EntraIdOptions>(configuration.GetSection(EntraIdOptions.SectionName));
        services.Configure<GraphMailOptions>(configuration.GetSection(GraphMailOptions.SectionName));
        services.Configure<AcsEmailOptions>(configuration.GetSection(AcsEmailOptions.SectionName));
        services.Configure<ApprovalQueueOptions>(configuration.GetSection(ApprovalQueueOptions.SectionName));
        services.Configure<ReportingOptions>(configuration.GetSection(ReportingOptions.SectionName));
        services.AddHttpClient<ReportServerClient>()
            .ConfigurePrimaryHttpMessageHandler(sp => CreateReportServerHttpHandler(sp));
        services.AddHttpClient("ReportServerProxy")
            .ConfigurePrimaryHttpMessageHandler(sp => CreateReportServerHttpHandler(sp));
        services.AddSingleton<IReportServerClient>(sp => sp.GetRequiredService<ReportServerClient>());
        services.AddScoped<IReportLibraryService, ReportLibraryService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddSingleton<IEntraTokenValidator, EntraTokenValidator>();
        services.AddHttpContextAccessor();
        services.AddSingleton<IPresenceTracker, PresenceTracker>();
        services.AddHttpClient<LoginLocationService>(client =>
        {
            // Login flow should not block on external geo-IP lookups.
            client.Timeout = TimeSpan.FromSeconds(2);
        });
        services.AddScoped<LoginLocationService>();
        services.AddHttpClient<GraphEmailSender>();
        services.AddSingleton<AcsEmailSender>();
        services.AddSingleton(sp =>
        {
            var options = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<AcsEmailOptions>>().Value;
            var client = string.IsNullOrWhiteSpace(options.ServiceBusConnectionString)
                ? null
                : new ServiceBusClient(options.ServiceBusConnectionString);
            return new ServiceBusClientProvider(client);
        });
        services.AddSingleton<ServiceBusEmailQueue>();
        services.AddSingleton<ServiceBusApprovalQueue>();
        services.AddHostedService<EmailQueueWorker>();
        var alertsEnabled = configuration.GetValue("Notifications:AlertsEnabled", true);
        if (alertsEnabled)
        {
            services.AddHostedService<NotificationAlertWorker>();
        }
        services.AddHostedService<RenewalAutomationWorker>();
        services.AddHostedService<DecisionSlaEscalationWorker>();
        services.AddHostedService<HelpDeskSlaEscalationWorker>();
        services.AddHostedService<WorkflowDelayResumeWorker>();
        services.AddSingleton<IEmailSender>(sp =>
        {
            var options = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<AcsEmailOptions>>().Value;
            if (options.UseQueue && !string.IsNullOrWhiteSpace(options.ServiceBusConnectionString))
            {
                return new QueuedEmailSender(
                    sp.GetRequiredService<ServiceBusEmailQueue>(),
                    sp.GetRequiredService<IHttpContextAccessor>());
            }

            return sp.GetRequiredService<AcsEmailSender>();
        });
        services.Configure<AzureOpenAiOptions>(configuration.GetSection(AzureOpenAiOptions.SectionName));
        services.Configure<OpenAiOptions>(configuration.GetSection(OpenAiOptions.SectionName));
        services.AddHttpClient<AzureOpenAiLeadScoringService>((sp, client) =>
        {
            var options = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<AzureOpenAiOptions>>().Value;
            if (!string.IsNullOrWhiteSpace(options.Endpoint))
            {
                client.BaseAddress = new Uri(options.Endpoint.TrimEnd('/') + "/");
            }
        });
        services.AddHttpClient<OpenAiLeadScoringService>((sp, client) =>
        {
            var options = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<OpenAiOptions>>().Value;
            if (!string.IsNullOrWhiteSpace(options.BaseUrl))
            {
                client.BaseAddress = new Uri(options.BaseUrl);
            }
        });
        services.AddScoped<ILeadScoringService>(sp =>
        {
            var azureOptions = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<AzureOpenAiOptions>>().Value;
            if (!string.IsNullOrWhiteSpace(azureOptions.ApiKey) && !string.IsNullOrWhiteSpace(azureOptions.Deployment))
            {
                return sp.GetRequiredService<AzureOpenAiLeadScoringService>();
            }

            var openAiOptions = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<OpenAiOptions>>().Value;
            if (!string.IsNullOrWhiteSpace(openAiOptions.ApiKey))
            {
                return sp.GetRequiredService<OpenAiLeadScoringService>();
            }

            return new RuleBasedLeadScoringService();
        });
        services.AddScoped<ILeadConversationScoreService, LeadConversationScoreService>();
        services.AddScoped<ILeadInteractionSummaryService, LeadInteractionSummaryService>();
        services.AddScoped<ILeadConversationSummarizer, LeadConversationSummarizer>();
        services.Configure<FoundryAgentOptions>(configuration.GetSection(FoundryAgentOptions.SectionName));
        services.Configure<AzureSearchKnowledgeOptions>(configuration.GetSection(AzureSearchKnowledgeOptions.SectionName));
        services.AddSingleton(sp =>
            sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<FoundryAgentOptions>>().Value);
        services.AddSingleton(sp =>
            sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<AzureSearchKnowledgeOptions>>().Value);
        services.AddHttpClient<FoundryAgentClient>((sp, client) =>
        {
            var options = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<FoundryAgentOptions>>().Value;
            if (!string.IsNullOrWhiteSpace(options.Endpoint))
            {
                client.BaseAddress = new Uri(options.Endpoint.TrimEnd('/') + "/");
            }
        });
        services.AddHttpClient<AzureSearchKnowledgeClient>((sp, client) =>
        {
            var options = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<AzureSearchKnowledgeOptions>>().Value;
            if (!string.IsNullOrWhiteSpace(options.Endpoint))
            {
                client.BaseAddress = new Uri(options.Endpoint.TrimEnd('/') + "/");
            }
        });
        services.AddScoped<IAssistantChatService, AssistantChatService>();
        services.AddScoped<ILeadService, LeadService>();
        services.AddScoped<ILeadImportService, LeadImportService>();
        services.AddScoped<IActivityService, ActivityService>();
        services.AddScoped<IOpportunityService, OpportunityService>();
        services.AddScoped<IMarketingService, MarketingService>();
        services.AddScoped<ICampaignAttributionService, MarketingService>();
        services.AddScoped<IEmailCampaignService, EmailCampaignService>();
        services.AddScoped<IEmailComplianceService, EmailComplianceService>();
        services.AddScoped<IOpportunityApprovalService, OpportunityApprovalService>();
        services.AddScoped<IDecisionInboxService, DecisionInboxService>();
        services.AddScoped<IOpportunityReviewChecklistService, OpportunityReviewChecklistService>();
        services.AddScoped<IOpportunityOnboardingService, OpportunityOnboardingService>();
        services.AddScoped<IOpportunityQuoteService, OpportunityQuoteService>();
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
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IDirectChatService, DirectChatService>();
        services.AddScoped<ISupportCaseService, HelpDeskService>();
        services.AddScoped<ISupportQueueService, HelpDeskService>();
        services.AddScoped<ISupportSlaService, HelpDeskService>();
        services.AddScoped<ISupportReportService, HelpDeskService>();
        services.AddScoped<ISupportEmailIntakeService, HelpDeskService>();
        services.AddScoped<IWorkflowDefinitionService, WorkflowDefinitionService>();
        services.AddScoped<IWorkflowExecutionService, WorkflowExecutionService>();
        services.AddScoped<IPropertyService, Infrastructure.Properties.PropertyService>();
        
        // DocuSign integration
        services.Configure<DocuSignOptions>(configuration.GetSection(DocuSignOptions.SectionName));
        services.AddHttpClient<DocuSignService>();
        services.AddScoped<IDocuSignService, DocuSignService>();

        // Email OAuth connection service
        services.Configure<EmailOAuthOptions>(configuration.GetSection(EmailOAuthOptions.SectionName));
        services.AddHttpClient<EmailConnectionService>();
        services.AddScoped<IEmailConnectionService, EmailConnectionService>();

        // Mailbox sync service for connected email accounts
        services.AddHttpClient<MailboxSyncService>();
        services.AddScoped<IMailboxSyncService, MailboxSyncService>();

        // Mailbox proxy service (live provider queries, no local sync)
        services.AddHttpClient<MailboxProxyService>();
        services.AddScoped<IMailboxProxyService, MailboxProxyService>();

        // CRM email link service (pin external emails to CRM entities)
        services.AddScoped<ICrmEmailLinkService, CrmEmailLinkService>();

        // Lookup / Picklist CRUD services
        services.AddScoped<ILeadStatusLookupService, LeadStatusLookupService>();
        services.AddScoped<IOpportunityStageLookupService, OpportunityStageLookupService>();
        services.AddScoped<ICurrencyLookupService, CurrencyLookupService>();
        services.AddScoped<IPhoneTypeLookupService, PhoneTypeLookupService>();
        services.AddScoped<ICadenceChannelLookupService, CadenceChannelLookupService>();
        services.AddScoped<IAccountTypeLookupService, AccountTypeLookupService>();
        services.AddScoped<IAccountSourceLookupService, AccountSourceLookupService>();
        services.AddScoped<ICustomerRatingLookupService, CustomerRatingLookupService>();
        services.AddScoped<IContactBuyingRoleLookupService, ContactBuyingRoleLookupService>();
        services.AddScoped<IActivityTypeLookupService, ActivityTypeLookupService>();
        services.AddScoped<IActivityPriorityLookupService, ActivityPriorityLookupService>();
        services.AddScoped<IHelpdeskCaseStatusLookupService, HelpdeskCaseStatusLookupService>();
        services.AddScoped<IHelpdeskPriorityLookupService, HelpdeskPriorityLookupService>();
        services.AddScoped<IHelpdeskSeverityLookupService, HelpdeskSeverityLookupService>();
        services.AddScoped<IHelpdeskSourceLookupService, HelpdeskSourceLookupService>();
        services.AddScoped<IPropertyStatusLookupService, PropertyStatusLookupService>();
        services.AddScoped<IPropertyTypeLookupService, PropertyTypeLookupService>();
        services.AddScoped<IDealTypeLookupService, DealTypeLookupService>();
        services.AddScoped<IDealSegmentLookupService, DealSegmentLookupService>();
        services.AddScoped<IDocumentCategoryLookupService, DocumentCategoryLookupService>();
        services.AddScoped<ILeadDisqualificationReasonLookupService, LeadDisqualificationReasonLookupService>();
        services.AddScoped<ILeadLossReasonLookupService, LeadLossReasonLookupService>();

        return services;
    }

    private static HttpClientHandler CreateReportServerHttpHandler(IServiceProvider sp)
    {
        var options = sp.GetRequiredService<IOptions<ReportingOptions>>().Value;
        var handler = new HttpClientHandler();

        if (options.IgnoreInvalidTlsCertificate)
        {
            handler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
        }

        return handler;
    }
}
