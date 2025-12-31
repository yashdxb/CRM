using Hangfire;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Api.Jobs;

[AutomaticRetry(Attempts = 2, DelaysInSeconds = new[] { 30, 60 })]
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
