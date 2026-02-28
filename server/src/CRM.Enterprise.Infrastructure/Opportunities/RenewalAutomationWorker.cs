using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class RenewalAutomationWorker : BackgroundService
{
    private static readonly TimeSpan Interval = TimeSpan.FromHours(12);
    private static readonly TimeSpan StartupDelay = TimeSpan.FromSeconds(30);
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<RenewalAutomationWorker> _logger;
    private readonly ICrmRealtimePublisher _realtimePublisher;

    public RenewalAutomationWorker(
        IServiceScopeFactory scopeFactory,
        ILogger<RenewalAutomationWorker> logger,
        ICrmRealtimePublisher realtimePublisher)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
        _realtimePublisher = realtimePublisher;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        try
        {
            await Task.Delay(StartupDelay, stoppingToken);
        }
        catch (OperationCanceledException)
        {
            return;
        }

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await RunOnceAsync(stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Renewal automation worker failed.");
            }

            try
            {
                await Task.Delay(Interval, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }
    }

    private async Task RunOnceAsync(CancellationToken cancellationToken)
    {
        List<(Guid Id, string Key)> tenants;
        using (var scope = _scopeFactory.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
            tenants = await context.Tenants
                .IgnoreQueryFilters()
                .AsNoTracking()
                .Select(t => new ValueTuple<Guid, string>(t.Id, t.Key))
                .ToListAsync(cancellationToken);
        }

        foreach (var tenant in tenants)
        {
            using var tenantScope = _scopeFactory.CreateScope();
            var tenantProvider = tenantScope.ServiceProvider.GetRequiredService<ITenantProvider>();
            tenantProvider.SetTenant(tenant.Id, tenant.Key);
            var opportunityService = tenantScope.ServiceProvider.GetRequiredService<IOpportunityService>();
            var actor = new ActorContext(null, "System Renewal Automation");
            var result = await opportunityService.RunRenewalAutomationAsync(actor, cancellationToken);
            if (result.RenewalsCreated > 0 || result.ReminderTasksCreated > 0)
            {
                _logger.LogInformation(
                    "Renewal automation: tenant {TenantKey} created {Renewals} renewals and {Tasks} tasks.",
                    tenant.Key,
                    result.RenewalsCreated,
                    result.ReminderTasksCreated);

                await _realtimePublisher.PublishTenantEventAsync(
                    tenant.Id,
                    "renewal.automation.completed",
                    new
                    {
                        renewalsCreated = result.RenewalsCreated,
                        reminderTasksCreated = result.ReminderTasksCreated,
                        processedAtUtc = DateTime.UtcNow
                    },
                    cancellationToken);
            }
        }
    }
}
