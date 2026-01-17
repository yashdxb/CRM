using System.Collections.Generic;

namespace CRM.Enterprise.Infrastructure.Presence;

public interface IPresenceTracker
{
    bool UserConnected(string userId, string connectionId);
    bool UserDisconnected(string userId, string connectionId);
    IReadOnlyCollection<string> GetOnlineUsers();
}
