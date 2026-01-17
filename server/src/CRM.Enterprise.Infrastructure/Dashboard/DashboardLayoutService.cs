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

    public async Task<DashboardLayoutState> GetLayoutAsync(Guid userId, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null || string.IsNullOrWhiteSpace(user.CommandCenterLayoutJson))
        {
            return new DashboardLayoutState(DefaultOrder, new Dictionary<string, string>(), new Dictionary<string, DashboardCardDimensions>(), new List<string>());
        }

        try
        {
            var document = JsonSerializer.Deserialize<LayoutPayload>(user.CommandCenterLayoutJson);
            if (document is not null)
            {
                return NormalizePayload(document);
            }
        }
        catch (JsonException)
        {
            // Fall through to legacy array handling.
        }

        try
        {
            var stored = JsonSerializer.Deserialize<List<string>>(user.CommandCenterLayoutJson);
            return new DashboardLayoutState(
                NormalizeOrder(stored, Array.Empty<string>()),
                new Dictionary<string, string>(),
                new Dictionary<string, DashboardCardDimensions>(),
                new List<string>());
        }
        catch (JsonException)
        {
            return new DashboardLayoutState(DefaultOrder, new Dictionary<string, string>(), new Dictionary<string, DashboardCardDimensions>(), new List<string>());
        }
    }

    public async Task<DashboardLayoutState> UpdateLayoutAsync(
        Guid userId,
        DashboardLayoutState layout,
        CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null)
        {
            return new DashboardLayoutState(DefaultOrder, new Dictionary<string, string>(), new Dictionary<string, DashboardCardDimensions>(), new List<string>());
        }

        var normalized = NormalizePayload(new LayoutPayload(
            layout.CardOrder,
            layout.Sizes,
            layout.Dimensions,
            layout.HiddenCards));
        user.CommandCenterLayoutJson = JsonSerializer.Serialize(new LayoutPayload(
            normalized.CardOrder,
            normalized.Sizes,
            normalized.Dimensions,
            normalized.HiddenCards));
        user.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return normalized;
    }

    private static DashboardLayoutState NormalizePayload(LayoutPayload payload)
    {
        var hidden = payload.HiddenCards?.Where(AllowedIds.Contains).Distinct().ToList() ?? new List<string>();
        var order = NormalizeOrder(payload.CardOrder, hidden);
        var sizes = payload.Sizes?
            .Where(item => AllowedIds.Contains(item.Key))
            .ToDictionary(item => item.Key, item => item.Value) ?? new Dictionary<string, string>();
        var dimensions = payload.Dimensions?
            .Where(item => AllowedIds.Contains(item.Key))
            .ToDictionary(item => item.Key, item => item.Value) ?? new Dictionary<string, DashboardCardDimensions>();

        return new DashboardLayoutState(order, sizes, dimensions, hidden);
    }

    private static IReadOnlyList<string> NormalizeOrder(IEnumerable<string>? candidate, IReadOnlyCollection<string> hidden)
    {
        if (candidate is null)
        {
            return DefaultOrder.Where(id => !hidden.Contains(id)).ToList();
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
            if (hidden.Contains(id))
            {
                continue;
            }
            if (seen.Add(id))
            {
                normalized.Add(id);
            }
        }

        return normalized;
    }

    private sealed record LayoutPayload(
        IReadOnlyList<string>? CardOrder,
        IReadOnlyDictionary<string, string>? Sizes,
        IReadOnlyDictionary<string, DashboardCardDimensions>? Dimensions,
        IReadOnlyList<string>? HiddenCards);
}
