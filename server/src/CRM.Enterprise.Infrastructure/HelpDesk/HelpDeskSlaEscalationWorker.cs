using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.HelpDesk;

public sealed class HelpDeskSlaEscalationWorker : BackgroundService
{
    private static readonly TimeSpan PollInterval = TimeSpan.FromMinutes(2);
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<HelpDeskSlaEscalationWorker> _logger;
    private readonly ICrmRealtimePublisher _realtimePublisher;

    public HelpDeskSlaEscalationWorker(
        IServiceScopeFactory scopeFactory,
        ILogger<HelpDeskSlaEscalationWorker> logger,
        ICrmRealtimePublisher realtimePublisher)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
        _realtimePublisher = realtimePublisher;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Task.Delay(TimeSpan.FromSeconds(20), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await RunPassAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Help desk SLA escalation pass failed.");
            }

            await Task.Delay(PollInterval, stoppingToken);
        }
    }

    private async Task RunPassAsync(CancellationToken cancellationToken)
    {
        using var scope = _scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
        var tenantProvider = scope.ServiceProvider.GetRequiredService<ITenantProvider>();
        var tenants = await db.Tenants.AsNoTracking().ToListAsync(cancellationToken);

        foreach (var tenant in tenants)
        {
            tenantProvider.SetTenant(tenant.Id, tenant.Key);
            var count = await RunTenantPassAsync(db, tenant.Id, cancellationToken);
            if (count > 0)
            {
                _logger.LogInformation("Help desk SLA escalation generated {Count} event(s) for tenant {TenantKey}.", count, tenant.Key);
            }

            db.ChangeTracker.Clear();
        }
    }

    private async Task<int> RunTenantPassAsync(CrmDbContext db, Guid tenantId, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var openStatuses = new[] { "New", "Open", "Pending Customer", "Pending Internal" };
        var openCases = await db.SupportCases
            .AsNoTracking()
            .Where(c => c.TenantId == tenantId && !c.IsDeleted && openStatuses.Contains(c.Status))
            .Select(c => new { c.Id, c.ResolutionDueUtc, c.SlaPolicyId })
            .ToListAsync(cancellationToken);

        if (openCases.Count == 0)
        {
            return 0;
        }

        var policyIds = openCases.Select(c => c.SlaPolicyId).Distinct().ToList();
        var policies = await db.SupportSlaPolicies
            .AsNoTracking()
            .Where(p => p.TenantId == tenantId && policyIds.Contains(p.Id) && !p.IsDeleted)
            .ToDictionaryAsync(p => p.Id, cancellationToken);

        var existing = await db.SupportCaseEscalationEvents
            .Where(e => e.TenantId == tenantId && !e.IsDeleted)
            .Select(e => new { e.CaseId, e.Type })
            .ToListAsync(cancellationToken);
        var existingSet = existing.Select(x => $"{x.CaseId:N}:{x.Type}").ToHashSet(StringComparer.OrdinalIgnoreCase);

        var created = 0;
        foreach (var supportCase in openCases)
        {
            var keyPrefix = $"{supportCase.Id:N}:";
            var isBreached = supportCase.ResolutionDueUtc < now;
            var policy = policies.GetValueOrDefault(supportCase.SlaPolicyId);
            var escalationWindow = policy?.EscalationMinutes ?? 60;
            var isAtRisk = !isBreached && supportCase.ResolutionDueUtc <= now.AddMinutes(escalationWindow);

            var type = isBreached ? "Breached" : isAtRisk ? "AtRisk" : null;
            if (type is null)
            {
                continue;
            }

            var eventKey = keyPrefix + type;
            if (existingSet.Contains(eventKey))
            {
                continue;
            }

            var entity = new Domain.Entities.SupportCaseEscalationEvent
            {
                TenantId = tenantId,
                CaseId = supportCase.Id,
                Type = type,
                OccurredUtc = now,
                CreatedAtUtc = now,
                CreatedBy = "system"
            };
            db.SupportCaseEscalationEvents.Add(entity);
            existingSet.Add(eventKey);
            created++;

            await _realtimePublisher.PublishTenantEventAsync(
                tenantId,
                "helpdesk.case.escalated",
                new
                {
                    caseId = supportCase.Id,
                    escalationType = type,
                    occurredAtUtc = now
                },
                cancellationToken);
        }

        if (created > 0)
        {
            await db.SaveChangesAsync(cancellationToken);
        }

        return created;
    }
}
