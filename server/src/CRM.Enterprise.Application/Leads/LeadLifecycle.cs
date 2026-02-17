using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Enterprise.Application.Leads;

public static class LeadLifecycle
{
    public const string New = "New";
    public const string Contacted = "Contacted";
    public const string Nurture = "Nurture";
    public const string Qualified = "Qualified";
    public const string Converted = "Converted";
    public const string Lost = "Lost";
    public const string Disqualified = "Disqualified";

    public static readonly IReadOnlyList<string> OrderedStatuses =
    [
        New,
        Contacted,
        Nurture,
        Qualified,
        Converted,
        Lost,
        Disqualified
    ];

    private static readonly HashSet<string> ClosedStatuses = new(StringComparer.OrdinalIgnoreCase)
    {
        Converted,
        Lost,
        Disqualified
    };

    private static readonly Dictionary<string, HashSet<string>> AllowedTransitions = new(StringComparer.OrdinalIgnoreCase)
    {
        [New] = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { New, Contacted, Nurture, Qualified, Lost, Disqualified },
        [Contacted] = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { Contacted, Nurture, Qualified, Lost, Disqualified },
        [Nurture] = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { Nurture, Contacted, Qualified, Lost, Disqualified },
        [Qualified] = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { Qualified, Nurture, Lost, Disqualified, Converted },
        [Lost] = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { Lost, Contacted, Nurture, Qualified },
        [Disqualified] = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { Disqualified, Contacted, Nurture, Qualified },
        [Converted] = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { Converted }
    };

    public static bool TryNormalize(string? statusName, out string normalized)
    {
        var raw = (statusName ?? string.Empty).Trim();
        var match = OrderedStatuses.FirstOrDefault(s => string.Equals(s, raw, StringComparison.OrdinalIgnoreCase));
        normalized = match ?? string.Empty;
        return match is not null;
    }

    public static string NormalizeOrDefault(string? statusName)
    {
        return TryNormalize(statusName, out var normalized) ? normalized : New;
    }

    public static bool IsClosed(string statusName)
    {
        return ClosedStatuses.Contains(statusName);
    }

    public static int GetOrder(string statusName)
    {
        if (!TryNormalize(statusName, out var normalized))
        {
            return 1;
        }

        for (var i = 0; i < OrderedStatuses.Count; i++)
        {
            if (string.Equals(OrderedStatuses[i], normalized, StringComparison.OrdinalIgnoreCase))
            {
                return i + 1;
            }
        }

        return 1;
    }

    public static bool IsValidTransition(string? previousStatusName, string targetStatusName)
    {
        var previous = NormalizeOrDefault(previousStatusName);
        if (!TryNormalize(targetStatusName, out var target))
        {
            return false;
        }

        return AllowedTransitions.TryGetValue(previous, out var allowed) && allowed.Contains(target);
    }
}
