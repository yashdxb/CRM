using System.Collections.Concurrent;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Realtime;

public sealed class ImportJobRealtimeProgressWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ILogger<ImportJobRealtimeProgressWorker> _logger;
    private readonly ConcurrentDictionary<Guid, string> _lastStateByJob = new();

    public ImportJobRealtimeProgressWorker(
        IServiceScopeFactory scopeFactory,
        ICrmRealtimePublisher realtimePublisher,
        ILogger<ImportJobRealtimeProgressWorker> logger)
    {
        _scopeFactory = scopeFactory;
        _realtimePublisher = realtimePublisher;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await PublishImportProgressEventsAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Import realtime progress scan failed.");
            }

            try
            {
                await Task.Delay(TimeSpan.FromSeconds(2), stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
        }
    }

    private async Task PublishImportProgressEventsAsync(CancellationToken cancellationToken)
    {
        using var scope = _scopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CrmDbContext>();

        var sinceUtc = DateTime.UtcNow.AddHours(-12);
        var jobs = await dbContext.ImportJobs
            .AsNoTracking()
            .Where(job => !job.IsDeleted && (job.CompletedAtUtc == null || job.UpdatedAtUtc == null || job.UpdatedAtUtc >= sinceUtc))
            .Select(job => new ImportJobSnapshot(
                job.Id,
                job.TenantId,
                job.RequestedById,
                job.EntityType,
                job.Status,
                job.TotalRows,
                job.Imported,
                job.Skipped,
                job.CreatedAtUtc,
                job.CompletedAtUtc,
                job.ErrorMessage))
            .ToListAsync(cancellationToken);

        foreach (var job in jobs)
        {
            var state = BuildState(job);
            if (_lastStateByJob.TryGetValue(job.Id, out var previousState) && string.Equals(previousState, state, StringComparison.Ordinal))
            {
                continue;
            }

            _lastStateByJob[job.Id] = state;
            var payload = new
            {
                jobId = job.Id,
                entityType = job.EntityType,
                status = job.Status,
                processed = job.Imported + job.Skipped,
                total = job.TotalRows,
                succeeded = job.Imported,
                failed = job.Skipped,
                startedAtUtc = job.CreatedAtUtc,
                finishedAtUtc = job.CompletedAtUtc,
                errorSummary = job.ErrorMessage
            };

            if (job.RequestedById is Guid userId && userId != Guid.Empty)
            {
                await _realtimePublisher.PublishUserEventAsync(job.TenantId, userId, "import.job.progress", payload, cancellationToken);
            }
            else
            {
                await _realtimePublisher.PublishTenantEventAsync(job.TenantId, "import.job.progress", payload, cancellationToken);
            }
        }
    }

    private static string BuildState(ImportJobSnapshot snapshot)
    {
        return string.Join("|",
            snapshot.Status,
            snapshot.TotalRows,
            snapshot.Imported,
            snapshot.Skipped,
            snapshot.CompletedAtUtc?.Ticks ?? 0,
            snapshot.ErrorMessage ?? string.Empty);
    }

    private sealed record ImportJobSnapshot(
        Guid Id,
        Guid TenantId,
        Guid? RequestedById,
        string EntityType,
        string Status,
        int TotalRows,
        int Imported,
        int Skipped,
        DateTime CreatedAtUtc,
        DateTime? CompletedAtUtc,
        string? ErrorMessage);
}
