using System.Security.Claims;
using CRM.Enterprise.Infrastructure.Presence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CRM.Enterprise.Api.Hubs;

[Authorize]
public sealed class PresenceHub : Hub
{
    private readonly IPresenceTracker _presenceTracker;

    public PresenceHub(IPresenceTracker presenceTracker)
    {
        _presenceTracker = presenceTracker;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrWhiteSpace(userId))
        {
            var isFirstConnection = _presenceTracker.UserConnected(userId, Context.ConnectionId);
            var onlineUsers = _presenceTracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("presenceSnapshot", onlineUsers);
            if (isFirstConnection)
            {
                await Clients.Others.SendAsync("presenceChanged", userId, true);
            }
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrWhiteSpace(userId))
        {
            var isLastConnection = _presenceTracker.UserDisconnected(userId, Context.ConnectionId);
            if (isLastConnection)
            {
                await Clients.Others.SendAsync("presenceChanged", userId, false);
            }
        }

        await base.OnDisconnectedAsync(exception);
    }
}
