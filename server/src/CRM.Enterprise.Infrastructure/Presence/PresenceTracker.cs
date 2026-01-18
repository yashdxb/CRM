using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Enterprise.Infrastructure.Presence;

public sealed class PresenceTracker : IPresenceTracker
{
    private readonly ConcurrentDictionary<string, HashSet<string>> _connections = new();
    private readonly object _lock = new();

    public bool UserConnected(string userId, string connectionId)
    {
        if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(connectionId))
        {
            return false;
        }

        lock (_lock)
        {
            if (!_connections.TryGetValue(userId, out var set))
            {
                set = new HashSet<string>();
                _connections[userId] = set;
            }

            var wasEmpty = set.Count == 0;
            set.Add(connectionId);
            return wasEmpty;
        }
    }

    public bool UserDisconnected(string userId, string connectionId)
    {
        if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(connectionId))
        {
            return false;
        }

        lock (_lock)
        {
            if (!_connections.TryGetValue(userId, out var set))
            {
                return false;
            }

            set.Remove(connectionId);
            if (set.Count > 0)
            {
                return false;
            }

            _connections.TryRemove(userId, out _);
            return true;
        }
    }

    public IReadOnlyCollection<string> GetOnlineUsers()
    {
        return _connections.Keys.ToArray();
    }
}
