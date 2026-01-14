using System.Text.Json;
using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Dashboard;

public class DashboardLayoutService : IDashboardLayoutService
{
    private static readonly IReadOnlyList<string> DefaultOrder =
    [
        "pipeline",
        "accounts",
        "activity-mix",
        "conversion",
        "top-performers",
        "my-tasks",
        "timeline",
        "health"
    ];

    private static readonly HashSet<string> AllowedIds = new(DefaultOrder);
    private readonly CrmDbContext _dbContext;

    public DashboardLayoutService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<string>> GetLayoutAsync(Guid userId, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null || string.IsNullOrWhiteSpace(user.CommandCenterLayoutJson))
        {
            return DefaultOrder;
        }

        try
        {
            var stored = JsonSerializer.Deserialize<List<string>>(user.CommandCenterLayoutJson);
            return NormalizeOrder(stored);
        }
        catch (JsonException)
        {
            return DefaultOrder;
        }
    }

    public async Task<IReadOnlyList<string>> UpdateLayoutAsync(
        Guid userId,
        IReadOnlyList<string> cardOrder,
        CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null)
        {
            return DefaultOrder;
        }

        var normalized = NormalizeOrder(cardOrder);
        user.CommandCenterLayoutJson = JsonSerializer.Serialize(normalized);
        user.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return normalized;
    }

    private static IReadOnlyList<string> NormalizeOrder(IEnumerable<string>? candidate)
    {
        if (candidate is null)
        {
            return DefaultOrder;
        }

        var normalized = new List<string>();
        var seen = new HashSet<string>();

        foreach (var id in candidate)
        {
            if (!AllowedIds.Contains(id))
            {
                continue;
            }

            if (seen.Add(id))
            {
                normalized.Add(id);
            }
        }

        foreach (var id in DefaultOrder)
        {
            if (seen.Add(id))
            {
                normalized.Add(id);
            }
        }

        return normalized;
    }
}
