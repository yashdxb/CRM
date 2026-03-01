using System.Security.Claims;
using CRM.Enterprise.Application.Tenants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace CRM.Enterprise.Api.Hubs;

[Authorize]
public sealed class CrmEventsHub : Hub
{
    private sealed class PresenceConnectionState
    {
        public Guid UserId { get; init; }
        public string DisplayName { get; init; } = "User";
        public bool IsEditing { get; set; }
    }

    private static readonly ConcurrentDictionary<string, ConcurrentDictionary<string, PresenceConnectionState>> RecordPresenceByGroup = new(StringComparer.OrdinalIgnoreCase);
    private static readonly ConcurrentDictionary<string, HashSet<string>> ConnectionGroups = new(StringComparer.OrdinalIgnoreCase);

    private readonly ITenantProvider _tenantProvider;

    public CrmEventsHub(ITenantProvider tenantProvider)
    {
        _tenantProvider = tenantProvider;
    }

    public override async Task OnConnectedAsync()
    {
        var tenantId = ResolveTenantId();
        if (tenantId != Guid.Empty)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, BuildTenantGroup(tenantId));
        }

        var userIdText = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (Guid.TryParse(userIdText, out var userId) && userId != Guid.Empty)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, BuildUserGroup(tenantId, userId));
        }

        await base.OnConnectedAsync();
    }

    public async Task JoinRecordPresence(string entityType, Guid recordId)
    {
        var tenantId = ResolveTenantId();
        if (tenantId == Guid.Empty || string.IsNullOrWhiteSpace(entityType) || recordId == Guid.Empty)
        {
            return;
        }

        var userIdText = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdText, out var userId) || userId == Guid.Empty)
        {
            return;
        }

        var displayName = Context.User?.FindFirstValue("name")
                          ?? Context.User?.FindFirstValue(ClaimTypes.Name)
                          ?? Context.User?.FindFirstValue(ClaimTypes.Email)
                          ?? "User";

        var normalizedEntityType = entityType.Trim().ToLowerInvariant();
        var groupName = BuildRecordGroup(tenantId, normalizedEntityType, recordId);
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        var members = RecordPresenceByGroup.GetOrAdd(groupName, _ => new ConcurrentDictionary<string, PresenceConnectionState>(StringComparer.OrdinalIgnoreCase));
        members[Context.ConnectionId] = new PresenceConnectionState
        {
            UserId = userId,
            DisplayName = displayName,
            IsEditing = false
        };

        var connectionGroups = ConnectionGroups.GetOrAdd(Context.ConnectionId, _ => []);
        lock (connectionGroups)
        {
            connectionGroups.Add(groupName);
        }

        var snapshot = members.Values
            .GroupBy(m => m.UserId)
            .Select(group => new
            {
                userId = group.Key,
                displayName = group.First().DisplayName,
                isEditing = group.Any(item => item.IsEditing)
            })
            .ToList();

        await Clients.Caller.SendAsync("crmEvent", new
        {
            eventType = "record.presence.snapshot",
            tenantId,
            occurredAtUtc = DateTime.UtcNow,
            schemaVersion = 1,
            correlationId = Guid.NewGuid().ToString("N"),
            payload = new
            {
                entityType = normalizedEntityType,
                recordId,
                users = snapshot
            }
        });

        await Clients.OthersInGroup(groupName).SendAsync("crmEvent", new
        {
            eventType = "record.presence.changed",
            tenantId,
            occurredAtUtc = DateTime.UtcNow,
            schemaVersion = 1,
            correlationId = Guid.NewGuid().ToString("N"),
            payload = new
            {
                entityType = normalizedEntityType,
                recordId,
                action = "joined",
                userId,
                displayName,
                isEditing = false
            }
        });
    }

    public async Task SetRecordEditingState(string entityType, Guid recordId, bool isEditing)
    {
        var tenantId = ResolveTenantId();
        if (tenantId == Guid.Empty || string.IsNullOrWhiteSpace(entityType) || recordId == Guid.Empty)
        {
            return;
        }

        var userIdText = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdText, out var userId) || userId == Guid.Empty)
        {
            return;
        }

        var normalizedEntityType = entityType.Trim().ToLowerInvariant();
        var groupName = BuildRecordGroup(tenantId, normalizedEntityType, recordId);
        if (!RecordPresenceByGroup.TryGetValue(groupName, out var members) ||
            !members.TryGetValue(Context.ConnectionId, out var member))
        {
            return;
        }

        if (member.IsEditing == isEditing)
        {
            return;
        }

        member.IsEditing = isEditing;
        var action = isEditing ? "editing_started" : "editing_stopped";
        await Clients.Group(groupName).SendAsync("crmEvent", new
        {
            eventType = "record.presence.changed",
            tenantId,
            occurredAtUtc = DateTime.UtcNow,
            schemaVersion = 1,
            correlationId = Guid.NewGuid().ToString("N"),
            payload = new
            {
                entityType = normalizedEntityType,
                recordId,
                action,
                userId,
                displayName = member.DisplayName,
                isEditing
            }
        });
    }

    public async Task LeaveRecordPresence(string entityType, Guid recordId)
    {
        var tenantId = ResolveTenantId();
        if (tenantId == Guid.Empty || string.IsNullOrWhiteSpace(entityType) || recordId == Guid.Empty)
        {
            return;
        }

        var normalizedEntityType = entityType.Trim().ToLowerInvariant();
        var groupName = BuildRecordGroup(tenantId, normalizedEntityType, recordId);
        await RemovePresenceConnectionFromGroupAsync(groupName, normalizedEntityType, recordId, tenantId);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (ConnectionGroups.TryRemove(Context.ConnectionId, out var groups))
        {
            List<string> snapshot;
            lock (groups)
            {
                snapshot = [.. groups];
            }

            foreach (var groupName in snapshot)
            {
                if (TryParseRecordGroup(groupName, out var entityType, out var recordId, out var tenantId))
                {
                    await RemovePresenceConnectionFromGroupAsync(groupName, entityType, recordId, tenantId);
                }
            }
        }

        await base.OnDisconnectedAsync(exception);
    }

    private async Task RemovePresenceConnectionFromGroupAsync(string groupName, string entityType, Guid recordId, Guid tenantId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        if (!RecordPresenceByGroup.TryGetValue(groupName, out var members))
        {
            return;
        }

        if (!members.TryRemove(Context.ConnectionId, out var removed))
        {
            return;
        }

        if (members.IsEmpty)
        {
            RecordPresenceByGroup.TryRemove(groupName, out _);
        }

        await Clients.OthersInGroup(groupName).SendAsync("crmEvent", new
        {
            eventType = "record.presence.changed",
            tenantId,
            occurredAtUtc = DateTime.UtcNow,
            schemaVersion = 1,
            correlationId = Guid.NewGuid().ToString("N"),
            payload = new
            {
                entityType,
                recordId,
                action = "left",
                userId = removed.UserId,
                displayName = removed.DisplayName,
                isEditing = false
            }
        });
    }

    internal static string BuildRecordGroup(Guid tenantId, string entityType, Guid recordId)
        => $"tenant:{tenantId:D}:record:{entityType}:{recordId:D}";

    private Guid ResolveTenantId()
    {
        if (_tenantProvider.TenantId != Guid.Empty)
        {
            return _tenantProvider.TenantId;
        }

        var contextTenant = Context.GetHttpContext()?.Items.TryGetValue("TenantId", out var tenantValue) == true
            ? tenantValue
            : null;
        if (contextTenant is Guid tenantId && tenantId != Guid.Empty)
        {
            return tenantId;
        }

        if (contextTenant is string tenantText &&
            Guid.TryParse(tenantText, out var parsedTenant) &&
            parsedTenant != Guid.Empty)
        {
            return parsedTenant;
        }

        return Guid.Empty;
    }

    private static bool TryParseRecordGroup(string groupName, out string entityType, out Guid recordId, out Guid tenantId)
    {
        entityType = string.Empty;
        recordId = Guid.Empty;
        tenantId = Guid.Empty;
        var parts = groupName.Split(':', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        if (parts.Length != 5 || !parts[0].Equals("tenant", StringComparison.OrdinalIgnoreCase) || !parts[2].Equals("record", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        if (!Guid.TryParse(parts[1], out tenantId) || !Guid.TryParse(parts[4], out recordId))
        {
            return false;
        }

        entityType = parts[3];
        return true;
    }

    internal static string BuildTenantGroup(Guid tenantId) => $"tenant:{tenantId:D}";

    internal static string BuildUserGroup(Guid tenantId, Guid userId) => $"tenant:{tenantId:D}:user:{userId:D}";
}
