using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Api.Jobs;

public class BackgroundJobs
{
    private readonly ILogger<BackgroundJobs> _logger;

    public BackgroundJobs(ILogger<BackgroundJobs> logger)
    {
        _logger = logger;
    }

    public Task HeartbeatAsync()
    {
        _logger.LogInformation("Hangfire heartbeat at {TimestampUtc}", DateTime.UtcNow);
        return Task.CompletedTask;
    }
}
