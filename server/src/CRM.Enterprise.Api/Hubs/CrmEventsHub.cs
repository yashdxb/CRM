using System.Security.Claims;
using CRM.Enterprise.Application.Tenants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CRM.Enterprise.Api.Hubs;

[Authorize]
public sealed class CrmEventsHub : Hub
{
    private readonly ITenantProvider _tenantProvider;

    public CrmEventsHub(ITenantProvider tenantProvider)
    {
        _tenantProvider = tenantProvider;
    }

    public override async Task OnConnectedAsync()
    {
        var tenantId = _tenantProvider.TenantId;
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

    internal static string BuildTenantGroup(Guid tenantId) => $"tenant:{tenantId:D}";

    internal static string BuildUserGroup(Guid tenantId, Guid userId) => $"tenant:{tenantId:D}:user:{userId:D}";
}
