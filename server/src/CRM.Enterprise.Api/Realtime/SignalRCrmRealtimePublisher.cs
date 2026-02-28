using CRM.Enterprise.Api.Hubs;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Concurrent;

namespace CRM.Enterprise.Api.Realtime;

public sealed class SignalRCrmRealtimePublisher : ICrmRealtimePublisher
{
    private static readonly HashSet<string> RealtimeFlaggedEventTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "dashboard.metrics.delta",
        "dashboard.metrics.refresh-requested",
        "pipeline.lead.moved",
        "pipeline.lead.created",
        "pipeline.lead.updated",
        "pipeline.lead.deleted",
        "entity.crud.changed",
        "import.job.progress",
        "record.presence.snapshot",
        "record.presence.changed",
        "assistant.chat.token",
        "assistant.chat.completed",
        "assistant.chat.failed"
    };

    private readonly IHubContext<CrmEventsHub> _hubContext;
    private readonly ILogger<SignalRCrmRealtimePublisher> _logger;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IConfiguration _configuration;
    private readonly ConcurrentDictionary<Guid, string> _tenantKeyCache = new();

    public SignalRCrmRealtimePublisher(
        IHubContext<CrmEventsHub> hubContext,
        ILogger<SignalRCrmRealtimePublisher> logger,
        IServiceScopeFactory scopeFactory,
        IConfiguration configuration)
    {
        _hubContext = hubContext;
        _logger = logger;
        _scopeFactory = scopeFactory;
        _configuration = configuration;
    }

    public Task PublishTenantEventAsync(
        Guid tenantId,
        string eventType,
        object payload,
        CancellationToken cancellationToken = default)
    {
        if (tenantId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return PublishToGroupAsync(BuildTenantGroup(tenantId), tenantId, eventType, payload, cancellationToken);
    }

    public Task PublishUserEventAsync(
        Guid tenantId,
        Guid userId,
        string eventType,
        object payload,
        CancellationToken cancellationToken = default)
    {
        if (tenantId == Guid.Empty || userId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return PublishToGroupAsync(BuildUserGroup(tenantId, userId), tenantId, eventType, payload, cancellationToken);
    }

    public Task PublishUsersEventAsync(
        Guid tenantId,
        IEnumerable<Guid> userIds,
        string eventType,
        object payload,
        CancellationToken cancellationToken = default)
    {
        if (tenantId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        var targets = userIds
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();

        if (targets.Count == 0)
        {
            return Task.CompletedTask;
        }

        return Task.WhenAll(targets.Select(id =>
            PublishToGroupAsync(BuildUserGroup(tenantId, id), tenantId, eventType, payload, cancellationToken)));
    }

    private async Task PublishToGroupAsync(
        string groupName,
        Guid tenantId,
        string eventType,
        object payload,
        CancellationToken cancellationToken)
    {
        if (!await IsEventEnabledAsync(tenantId, eventType, cancellationToken))
        {
            return;
        }

        var envelope = new CrmRealtimeEventEnvelope(
            eventType,
            tenantId,
            DateTime.UtcNow,
            payload,
            SchemaVersion: 1,
            CorrelationId: Guid.NewGuid().ToString("N"));

        try
        {
            await _hubContext.Clients.Group(groupName)
                .SendAsync("crmEvent", envelope, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to publish CRM realtime event {EventType} to {Group}.", eventType, groupName);
        }
    }

    private async Task<bool> IsEventEnabledAsync(Guid tenantId, string eventType, CancellationToken cancellationToken)
    {
        if (!RealtimeFlaggedEventTypes.Contains(eventType))
        {
            return true;
        }

        var defaultEnabled = _configuration.GetValue<bool?>("Features:Realtime:EnabledByDefault") ?? false;
        if (defaultEnabled)
        {
            return true;
        }

        var tenantKey = await ResolveTenantKeyAsync(tenantId, cancellationToken);
        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            return false;
        }

        var enabledTenants = _configuration
            .GetSection("Features:Realtime:EnabledTenants")
            .Get<string[]>() ?? Array.Empty<string>();

        var tenantEnabled = enabledTenants.Contains(tenantKey, StringComparer.OrdinalIgnoreCase);
        if (!tenantEnabled && enabledTenants.Length == 0)
        {
            tenantEnabled = string.Equals(tenantKey, "default", StringComparison.OrdinalIgnoreCase);
        }

        if (!tenantEnabled)
        {
            return false;
        }

        var flagName = EventTypeToFlag(eventType);
        if (string.IsNullOrWhiteSpace(flagName))
        {
            return true;
        }

        var normalizedFlagName = flagName.Replace("realtime.", string.Empty, StringComparison.OrdinalIgnoreCase);
        var flagDefault = _configuration.GetValue<bool?>($"Features:Realtime:Flags:{normalizedFlagName}:EnabledByDefault") ?? false;
        if (flagDefault)
        {
            return true;
        }

        var flagEnabledTenants = _configuration
            .GetSection($"Features:Realtime:Flags:{normalizedFlagName}:EnabledTenants")
            .Get<string[]>() ?? Array.Empty<string>();

        if (flagEnabledTenants.Length == 0)
        {
            return string.Equals(tenantKey, "default", StringComparison.OrdinalIgnoreCase);
        }

        return flagEnabledTenants.Contains(tenantKey, StringComparer.OrdinalIgnoreCase);
    }

    private async Task<string?> ResolveTenantKeyAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        if (tenantId == Guid.Empty)
        {
            return null;
        }

        if (_tenantKeyCache.TryGetValue(tenantId, out var cached))
        {
            return cached;
        }

        using var scope = _scopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
        var key = await dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == tenantId)
            .Select(t => t.Key)
            .FirstOrDefaultAsync(cancellationToken);

        if (!string.IsNullOrWhiteSpace(key))
        {
            _tenantKeyCache[tenantId] = key;
        }

        return key;
    }

    private static string? EventTypeToFlag(string eventType)
        => eventType switch
        {
            "dashboard.metrics.delta" or "dashboard.metrics.refresh-requested" => "realtime.dashboard",
            "pipeline.lead.moved" or "pipeline.lead.created" or "pipeline.lead.updated" or "pipeline.lead.deleted" => "realtime.pipeline",
            "entity.crud.changed" => "realtime.entityCrud",
            "import.job.progress" => "realtime.importProgress",
            "record.presence.snapshot" or "record.presence.changed" => "realtime.recordPresence",
            "assistant.chat.token" or "assistant.chat.completed" or "assistant.chat.failed" => "realtime.assistantStreaming",
            _ => null
        };

    private static string BuildTenantGroup(Guid tenantId) => $"tenant:{tenantId:D}";

    private static string BuildUserGroup(Guid tenantId, Guid userId) => $"tenant:{tenantId:D}:user:{userId:D}";
}
