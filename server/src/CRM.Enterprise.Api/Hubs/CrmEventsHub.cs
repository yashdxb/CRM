using System.Security.Claims;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

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
    private readonly CrmDbContext _dbContext;
    private readonly ILogger<CrmEventsHub> _logger;

    public CrmEventsHub(ITenantProvider tenantProvider, CrmDbContext dbContext, ILogger<CrmEventsHub> logger)
    {
        _tenantProvider = tenantProvider;
        _dbContext = dbContext;
        _logger = logger;
    }

    public override async Task OnConnectedAsync()
    {
        var tenantId = await ResolveTenantIdAsync();
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

    public async Task SendDirectMessage(Guid recipientUserId, string message)
    {
        var tenantId = await ResolveTenantIdAsync();
        if (tenantId == Guid.Empty || recipientUserId == Guid.Empty || string.IsNullOrWhiteSpace(message))
        {
            return;
        }

        if (!TryResolveCurrentUser(out var senderUserId, out var senderDisplayName) || senderUserId == Guid.Empty)
        {
            return;
        }

        var trimmed = message.Trim();
        if (trimmed.Length == 0)
        {
            return;
        }

        if (trimmed.Length > 2000)
        {
            trimmed = trimmed[..2000];
        }

        var messageId = Guid.NewGuid();
        var occurredAtUtc = DateTime.UtcNow;

        var envelope = new
        {
            eventType = "chat.direct.message",
            tenantId,
            occurredAtUtc,
            schemaVersion = 1,
            correlationId = messageId.ToString("N"),
            payload = new
            {
                messageId,
                senderUserId,
                senderDisplayName,
                recipientUserId,
                content = trimmed,
                sentAtUtc = occurredAtUtc
            }
        };

        var senderGroup = BuildUserGroup(tenantId, senderUserId);
        var recipientGroup = BuildUserGroup(tenantId, recipientUserId);

        await Clients.Group(senderGroup).SendAsync("crmEvent", envelope);
        if (recipientUserId != senderUserId)
        {
            await Clients.Group(recipientGroup).SendAsync("crmEvent", envelope);
        }
    }

    public async Task JoinRecordPresence(string entityType, Guid recordId)
    {
        var tenantId = await ResolveTenantIdAsync();
        if (tenantId == Guid.Empty || string.IsNullOrWhiteSpace(entityType) || recordId == Guid.Empty)
        {
            _logger.LogWarning("[CrmEventsHub] JoinRecordPresence skipped. tenantId={TenantId}, entityType={EntityType}, recordId={RecordId}, connectionId={ConnectionId}",
                tenantId, entityType, recordId, Context.ConnectionId);
            return;
        }

        var userIdText = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdText, out var userId) || userId == Guid.Empty)
        {
            _logger.LogWarning("[CrmEventsHub] JoinRecordPresence skipped due to invalid user claim. userIdText={UserIdText}, connectionId={ConnectionId}",
                userIdText, Context.ConnectionId);
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

        _logger.LogInformation("[CrmEventsHub] JoinRecordPresence emitted snapshot/changed. tenantId={TenantId}, entityType={EntityType}, recordId={RecordId}, userId={UserId}, connectionId={ConnectionId}, snapshotCount={SnapshotCount}",
            tenantId, normalizedEntityType, recordId, userId, Context.ConnectionId, snapshot.Count);
    }

    public async Task SetRecordEditingState(string entityType, Guid recordId, bool isEditing)
    {
        var tenantId = await ResolveTenantIdAsync();
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
        var tenantId = await ResolveTenantIdAsync();
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

    private async Task<Guid> ResolveTenantIdAsync()
    {
        if (_tenantProvider.TenantId != Guid.Empty)
        {
            _logger.LogDebug("[CrmEventsHub] ResolveTenantId via provider. tenantId={TenantId}, connectionId={ConnectionId}",
                _tenantProvider.TenantId, Context.ConnectionId);
            return _tenantProvider.TenantId;
        }

        var contextTenant = Context.GetHttpContext()?.Items.TryGetValue("TenantId", out var tenantValue) == true
            ? tenantValue
            : null;
        if (contextTenant is Guid tenantId && tenantId != Guid.Empty)
        {
            _logger.LogDebug("[CrmEventsHub] ResolveTenantId via HttpContext.Items Guid. tenantId={TenantId}, connectionId={ConnectionId}",
                tenantId, Context.ConnectionId);
            return tenantId;
        }

        if (contextTenant is string tenantText &&
            Guid.TryParse(tenantText, out var parsedTenant) &&
            parsedTenant != Guid.Empty)
        {
            _logger.LogDebug("[CrmEventsHub] ResolveTenantId via HttpContext.Items string. tenantId={TenantId}, connectionId={ConnectionId}",
                parsedTenant, Context.ConnectionId);
            return parsedTenant;
        }

        var httpContext = Context.GetHttpContext();
        var tenantKey = httpContext?.Request.Query["tenantKey"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            tenantKey = httpContext?.Request.Headers["X-Tenant-Key"].FirstOrDefault();
        }
        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            tenantKey = "default";
        }

        var resolvedTenantId = await _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Key == tenantKey)
            .Select(t => t.Id)
            .FirstOrDefaultAsync();

        if (resolvedTenantId != Guid.Empty)
        {
            _tenantProvider.SetTenant(resolvedTenantId, tenantKey);
            _logger.LogInformation("[CrmEventsHub] ResolveTenantId via fallback tenant key. tenantKey={TenantKey}, tenantId={TenantId}, connectionId={ConnectionId}",
                tenantKey, resolvedTenantId, Context.ConnectionId);
            return resolvedTenantId;
        }

        _logger.LogWarning("[CrmEventsHub] ResolveTenantId failed. tenantKey={TenantKey}, connectionId={ConnectionId}",
            tenantKey, Context.ConnectionId);

        return Guid.Empty;
    }

    private bool TryResolveCurrentUser(out Guid userId, out string displayName)
    {
        userId = Guid.Empty;
        displayName = "User";

        var userIdText = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdText, out userId) || userId == Guid.Empty)
        {
            return false;
        }

        displayName = Context.User?.FindFirstValue("name")
                      ?? Context.User?.FindFirstValue(ClaimTypes.Name)
                      ?? Context.User?.FindFirstValue(ClaimTypes.Email)
                      ?? "User";

        return true;
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
