using CRM.Enterprise.Api.Hubs;
using CRM.Enterprise.Application.Common;
using Microsoft.AspNetCore.SignalR;

namespace CRM.Enterprise.Api.Realtime;

public sealed class SignalRCrmRealtimePublisher : ICrmRealtimePublisher
{
    private readonly IHubContext<CrmEventsHub> _hubContext;
    private readonly ILogger<SignalRCrmRealtimePublisher> _logger;

    public SignalRCrmRealtimePublisher(
        IHubContext<CrmEventsHub> hubContext,
        ILogger<SignalRCrmRealtimePublisher> logger)
    {
        _hubContext = hubContext;
        _logger = logger;
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
        var envelope = new CrmRealtimeEventEnvelope(
            eventType,
            tenantId,
            DateTime.UtcNow,
            payload);

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

    private static string BuildTenantGroup(Guid tenantId) => $"tenant:{tenantId:D}";

    private static string BuildUserGroup(Guid tenantId, Guid userId) => $"tenant:{tenantId:D}:user:{userId:D}";
}
