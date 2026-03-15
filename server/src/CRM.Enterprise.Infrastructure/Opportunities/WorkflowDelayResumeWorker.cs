using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class WorkflowDelayResumeWorker : BackgroundService
{
    private static readonly TimeSpan Interval = TimeSpan.FromMinutes(1);
    private static readonly TimeSpan StartupDelay = TimeSpan.FromSeconds(45);
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<WorkflowDelayResumeWorker> _logger;

    public WorkflowDelayResumeWorker(
        IServiceScopeFactory scopeFactory,
        ILogger<WorkflowDelayResumeWorker> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
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
                await ProcessPendingDelaysAsync(stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Workflow delay resume worker failed.");
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

    private async Task ProcessPendingDelaysAsync(CancellationToken cancellationToken)
    {
        await using var scope = _scopeFactory.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
        var approvalService = scope.ServiceProvider.GetRequiredService<IOpportunityApprovalService>();

        var expiredDelays = await dbContext.Set<PendingWorkflowDelay>()
            .Where(d => !d.IsCompleted && !d.IsDeleted && d.ResumeAfterUtc <= DateTime.UtcNow)
            .OrderBy(d => d.ResumeAfterUtc)
            .Take(20)
            .ToListAsync(cancellationToken);

        foreach (var delay in expiredDelays)
        {
            try
            {
                _logger.LogInformation(
                    "Resuming workflow for opportunity {OpportunityId} after delay node {NodeId}",
                    delay.OpportunityId, delay.NodeId);

                var chain = await dbContext.OpportunityApprovalChains
                    .FirstOrDefaultAsync(c => c.Id == delay.ApprovalChainId, cancellationToken);

                if (chain is null || chain.Status is "Approved" or "Rejected")
                {
                    delay.IsCompleted = true;
                    delay.CompletedAtUtc = DateTime.UtcNow;
                    await dbContext.SaveChangesAsync(cancellationToken);
                    continue;
                }

                if (chain.Status == "Delayed")
                {
                    chain.Status = "Pending";
                }

                var opportunity = await dbContext.Opportunities
                    .FirstOrDefaultAsync(o => o.Id == delay.OpportunityId && !o.IsDeleted, cancellationToken);

                if (opportunity is null)
                {
                    _logger.LogWarning("Opportunity {OpportunityId} not found for delayed workflow resume.", delay.OpportunityId);
                    delay.IsCompleted = true;
                    delay.CompletedAtUtc = DateTime.UtcNow;
                    await dbContext.SaveChangesAsync(cancellationToken);
                    continue;
                }

                var tenantProvider = scope.ServiceProvider.GetRequiredService<ITenantProvider>();
                var tenant = await dbContext.Set<Tenant>()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(t => t.Id == delay.TenantId, cancellationToken);
                tenantProvider.SetTenant(delay.TenantId, tenant?.Key ?? "default");

                await approvalService.ResumeAfterDelayAsync(
                    delay.OpportunityId,
                    delay.ApprovalChainId,
                    delay.ExecutionPlanJson,
                    delay.ResumeFromSequence,
                    delay.RequestedByUserId,
                    cancellationToken);

                delay.IsCompleted = true;
                delay.CompletedAtUtc = DateTime.UtcNow;
                await dbContext.SaveChangesAsync(cancellationToken);

                _logger.LogInformation(
                    "Successfully resumed workflow for opportunity {OpportunityId} after delay.",
                    delay.OpportunityId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Failed to resume workflow for opportunity {OpportunityId} after delay node {NodeId}.",
                    delay.OpportunityId, delay.NodeId);
            }
        }
    }
}
