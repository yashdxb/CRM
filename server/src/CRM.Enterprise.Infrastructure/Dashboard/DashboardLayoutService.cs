using System.Text.Json;
using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Dashboard;

public class DashboardLayoutService : IDashboardLayoutService
{
    private static readonly IReadOnlyList<string> DefaultOrder =
    [
        "pipeline",
        "truth-metrics",
        "risk-register",
        "risk-checklist",
        "execution-guide",
        "confidence-forecast",
        "forecast-scenarios",
        "my-forecast",
        "accounts",
        "manager-health",
        "activity-mix",
        "conversion",
        "top-performers",
        "my-tasks",
        "timeline",
        "health"
    ];

    private static readonly IReadOnlyList<string> ChartIds =
    [
        "revenue",
        "growth"
    ];

    private static readonly HashSet<string> AllowedCardIds = new(DefaultOrder);
    private static readonly HashSet<string> AllowedIds = new(DefaultOrder.Concat(ChartIds));
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public DashboardLayoutService(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    public async Task<DashboardLayoutState> GetLayoutAsync(Guid userId, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null || string.IsNullOrWhiteSpace(user.CommandCenterLayoutJson))
        {
            return await GetDefaultLayoutAsync(userId, cancellationToken);
        }

        try
        {
            var document = JsonSerializer.Deserialize<LayoutPayload>(user.CommandCenterLayoutJson);
            if (document is not null)
            {
                var normalized = NormalizePayload(document);
                if (IsLegacyFullDefault(normalized))
                {
                    return await GetDefaultLayoutAsync(userId, cancellationToken);
                }
                return normalized;
            }
        }
        catch (JsonException)
        {
            // Fall through to legacy array handling.
        }

        try
        {
            var stored = JsonSerializer.Deserialize<List<string>>(user.CommandCenterLayoutJson);
            var normalized = new DashboardLayoutState(
                NormalizeOrder(stored, Array.Empty<string>()),
                new Dictionary<string, string>(),
                new Dictionary<string, DashboardCardDimensions>(),
                new List<string>());
            if (IsLegacyFullDefault(normalized))
            {
                return await GetDefaultLayoutAsync(userId, cancellationToken);
            }
            return normalized;
        }
        catch (JsonException)
        {
            return await GetDefaultLayoutAsync(userId, cancellationToken);
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
            return await GetDefaultLayoutAsync(userId, cancellationToken);
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

    public async Task<DashboardLayoutState> GetDefaultLayoutAsync(Guid userId, CancellationToken cancellationToken)
    {
        var roleLevel = await GetUserRoleLevelAsync(userId, cancellationToken);
        var tenantDefaults = await LoadTenantDefaultsAsync(cancellationToken);
        var resolved = ResolveDefaultLayout(tenantDefaults, roleLevel);
        if (resolved is null)
        {
            var template = await GetDefaultTemplatePayloadAsync(cancellationToken);
            resolved = template ?? new LayoutPayload(DefaultOrder, null, null, null);
        }
        return NormalizePayload(resolved);
    }

    public async Task<DashboardLayoutState> GetDefaultLayoutForLevelAsync(int roleLevel, CancellationToken cancellationToken)
    {
        var tenantDefaults = await LoadTenantDefaultsAsync(cancellationToken);
        var resolved = ResolveDefaultLayout(tenantDefaults, roleLevel);
        if (resolved is null)
        {
            var template = await GetDefaultTemplatePayloadAsync(cancellationToken);
            resolved = template ?? new LayoutPayload(DefaultOrder, null, null, null);
        }
        return NormalizePayload(resolved);
    }

    public async Task<DashboardLayoutState> UpdateDefaultLayoutAsync(
        int roleLevel,
        DashboardLayoutState layout,
        CancellationToken cancellationToken)
    {
        if (roleLevel < 1)
        {
            return NormalizePayload(new LayoutPayload(DefaultOrder, null, null, null));
        }

        var tenantId = _tenantProvider.TenantId;
        var tenant = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);
        if (tenant is null)
        {
            return NormalizePayload(new LayoutPayload(DefaultOrder, null, null, null));
        }

        var defaults = await LoadTenantDefaultsAsync(cancellationToken);
        defaults.RemoveAll(item => item.RoleLevel == roleLevel);
        defaults.Add(new RoleDefaultLayout(roleLevel, layout.CardOrder, layout.Sizes, layout.Dimensions, layout.HiddenCards));
        tenant.DashboardLayoutDefaultsJson = JsonSerializer.Serialize(defaults);
        tenant.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        var updated = ResolveDefaultLayout(defaults, roleLevel) ?? new LayoutPayload(DefaultOrder, null, null, null);
        return NormalizePayload(updated);
    }

    public async Task<DashboardLayoutState> ResetLayoutAsync(Guid userId, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
        if (user is null)
        {
            return await GetDefaultLayoutAsync(userId, cancellationToken);
        }

        var defaultLayout = await GetDefaultLayoutAsync(userId, cancellationToken);
        user.CommandCenterLayoutJson = JsonSerializer.Serialize(new LayoutPayload(
            defaultLayout.CardOrder,
            defaultLayout.Sizes,
            defaultLayout.Dimensions,
            defaultLayout.HiddenCards));
        user.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return defaultLayout;
    }

    public async Task<IReadOnlyList<DashboardTemplateState>> GetTemplatesAsync(CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var templates = await _dbContext.DashboardTemplates
            .AsNoTracking()
            .Where(t => !t.IsDeleted && t.TenantId == tenantId)
            .OrderBy(t => t.Name)
            .ToListAsync(cancellationToken);

        return templates
            .Select(template => ToTemplateState(template))
            .ToList();
    }

    public async Task<DashboardTemplateState> CreateTemplateAsync(
        DashboardTemplateState template,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var entity = new Domain.Entities.DashboardTemplate
        {
            TenantId = tenantId,
            Name = template.Name.Trim(),
            Description = template.Description,
            LayoutJson = SerializeLayout(template.Layout),
            IsDefault = template.IsDefault,
            CreatedAtUtc = DateTime.UtcNow
        };

        if (entity.IsDefault)
        {
            await ClearDefaultTemplateAsync(tenantId, cancellationToken);
        }

        _dbContext.DashboardTemplates.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return ToTemplateState(entity);
    }

    public async Task<DashboardTemplateState> UpdateTemplateAsync(
        Guid templateId,
        DashboardTemplateState template,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var entity = await _dbContext.DashboardTemplates
            .FirstOrDefaultAsync(t => !t.IsDeleted && t.TenantId == tenantId && t.Id == templateId, cancellationToken);
        if (entity is null)
        {
            throw new InvalidOperationException("Dashboard template not found.");
        }

        entity.Name = template.Name.Trim();
        entity.Description = template.Description;
        entity.LayoutJson = SerializeLayout(template.Layout);
        entity.UpdatedAtUtc = DateTime.UtcNow;

        if (template.IsDefault && !entity.IsDefault)
        {
            await ClearDefaultTemplateAsync(tenantId, cancellationToken);
            entity.IsDefault = true;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return ToTemplateState(entity);
    }

    public async Task<DashboardTemplateState> SetDefaultTemplateAsync(Guid templateId, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var entity = await _dbContext.DashboardTemplates
            .FirstOrDefaultAsync(t => !t.IsDeleted && t.TenantId == tenantId && t.Id == templateId, cancellationToken);
        if (entity is null)
        {
            throw new InvalidOperationException("Dashboard template not found.");
        }

        await ClearDefaultTemplateAsync(tenantId, cancellationToken);
        entity.IsDefault = true;
        entity.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return ToTemplateState(entity);
    }

    private static DashboardLayoutState NormalizePayload(LayoutPayload payload)
    {
        var hidden = payload.HiddenCards?.Where(AllowedIds.Contains).Distinct().ToList() ?? new List<string>();
        var order = NormalizeOrder(payload.CardOrder, hidden);
        var sizes = payload.Sizes?
            .Where(item => AllowedCardIds.Contains(item.Key))
            .ToDictionary(item => item.Key, item => item.Value) ?? new Dictionary<string, string>();
        var dimensions = payload.Dimensions?
            .Where(item => AllowedCardIds.Contains(item.Key))
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
            if (!AllowedCardIds.Contains(id))
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

    private async Task<int> GetUserRoleLevelAsync(Guid userId, CancellationToken cancellationToken)
    {
        var levels = await _dbContext.UserRoles
            .Where(ur => ur.UserId == userId)
            .Select(ur => ur.Role != null ? ur.Role.HierarchyLevel : null)
            .ToListAsync(cancellationToken);

        return levels.Where(level => level.HasValue).Select(level => level!.Value).DefaultIfEmpty(1).Max();
    }

    private async Task<LayoutPayload?> GetDefaultTemplatePayloadAsync(CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var template = await _dbContext.DashboardTemplates
            .AsNoTracking()
            .Where(t => !t.IsDeleted && t.TenantId == tenantId && t.IsDefault)
            .OrderByDescending(t => t.UpdatedAtUtc ?? t.CreatedAtUtc)
            .FirstOrDefaultAsync(cancellationToken);

        if (template is null || string.IsNullOrWhiteSpace(template.LayoutJson))
        {
            return null;
        }

        try
        {
            var payload = JsonSerializer.Deserialize<LayoutPayload>(template.LayoutJson);
            return payload;
        }
        catch (JsonException)
        {
            return null;
        }
    }

    private DashboardTemplateState ToTemplateState(Domain.Entities.DashboardTemplate template)
    {
        var layout = DeserializeLayout(template.LayoutJson);
        return new DashboardTemplateState(
            template.Id,
            template.Name,
            template.Description,
            template.IsDefault,
            layout);
    }

    private DashboardLayoutState DeserializeLayout(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return NormalizePayload(new LayoutPayload(DefaultOrder, null, null, null));
        }

        try
        {
            var payload = JsonSerializer.Deserialize<LayoutPayload>(json);
            if (payload is not null)
            {
                return NormalizePayload(payload);
            }
        }
        catch (JsonException)
        {
            // ignore
        }

        return NormalizePayload(new LayoutPayload(DefaultOrder, null, null, null));
    }

    private string SerializeLayout(DashboardLayoutState layout)
    {
        var normalized = NormalizePayload(new LayoutPayload(layout.CardOrder, layout.Sizes, layout.Dimensions, layout.HiddenCards));
        return JsonSerializer.Serialize(new LayoutPayload(
            normalized.CardOrder,
            normalized.Sizes,
            normalized.Dimensions,
            normalized.HiddenCards));
    }

    private async Task ClearDefaultTemplateAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        var defaults = await _dbContext.DashboardTemplates
            .Where(t => !t.IsDeleted && t.TenantId == tenantId && t.IsDefault)
            .ToListAsync(cancellationToken);

        if (defaults.Count == 0)
        {
            return;
        }

        foreach (var template in defaults)
        {
            template.IsDefault = false;
            template.UpdatedAtUtc = DateTime.UtcNow;
        }
    }

    private async Task<List<RoleDefaultLayout>> LoadTenantDefaultsAsync(CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var tenant = await _dbContext.Tenants.AsNoTracking().FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);
        if (tenant is null || string.IsNullOrWhiteSpace(tenant.DashboardLayoutDefaultsJson))
        {
            return new List<RoleDefaultLayout>();
        }

        try
        {
            var defaults = JsonSerializer.Deserialize<List<RoleDefaultLayout>>(tenant.DashboardLayoutDefaultsJson);
            return defaults ?? new List<RoleDefaultLayout>();
        }
        catch (JsonException)
        {
            return new List<RoleDefaultLayout>();
        }
    }

    private static LayoutPayload? ResolveDefaultLayout(IEnumerable<RoleDefaultLayout> defaults, int roleLevel)
    {
        var ordered = defaults
            .Where(item => item.RoleLevel > 0)
            .OrderBy(item => item.RoleLevel)
            .ToList();
        if (ordered.Count == 0)
        {
            return null;
        }

        var selected = ordered.LastOrDefault(item => item.RoleLevel <= roleLevel) ?? ordered.First();
        return new LayoutPayload(selected.CardOrder, selected.Sizes, selected.Dimensions, selected.HiddenCards);
    }

    private static bool IsLegacyFullDefault(DashboardLayoutState state)
    {
        if (state.HiddenCards.Count > 0)
        {
            return false;
        }

        if (state.Sizes.Count > 0 || state.Dimensions.Count > 0)
        {
            return false;
        }

        if (state.CardOrder.Count != DefaultOrder.Count)
        {
            return false;
        }

        return state.CardOrder.SequenceEqual(DefaultOrder);
    }

    private sealed record LayoutPayload(
        IReadOnlyList<string>? CardOrder,
        IReadOnlyDictionary<string, string>? Sizes,
        IReadOnlyDictionary<string, DashboardCardDimensions>? Dimensions,
        IReadOnlyList<string>? HiddenCards);

    private sealed record RoleDefaultLayout(
        int RoleLevel,
        IReadOnlyList<string> CardOrder,
        IReadOnlyDictionary<string, string>? Sizes,
        IReadOnlyDictionary<string, DashboardCardDimensions>? Dimensions,
        IReadOnlyList<string>? HiddenCards);
}
