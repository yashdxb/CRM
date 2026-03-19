using System.Text.Json;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.Notifications;

public sealed class WorkspaceEmailDeliveryPolicy : IWorkspaceEmailDeliveryPolicy
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IConfiguration _configuration;
    private readonly ILogger<WorkspaceEmailDeliveryPolicy> _logger;
    private readonly string _defaultTenantKey;

    public WorkspaceEmailDeliveryPolicy(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IConfiguration configuration,
        ILogger<WorkspaceEmailDeliveryPolicy> logger)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _configuration = configuration;
        _logger = logger;
        _defaultTenantKey = configuration["Tenancy:DefaultTenantKey"]?.Trim() ?? "default";
    }

    public async Task<bool> IsEnabledAsync(WorkspaceEmailDeliveryCategory category, CancellationToken cancellationToken = default)
    {
        var tenantId = await ResolveCurrentTenantIdAsync(cancellationToken);
        if (tenantId == Guid.Empty)
        {
            return false;
        }

        return await IsEnabledAsync(tenantId, category, cancellationToken);
    }

    public async Task<bool> IsEnabledAsync(Guid tenantId, WorkspaceEmailDeliveryCategory category, CancellationToken cancellationToken = default)
    {
        var flags = await ResolveFlagsAsync(tenantId, cancellationToken);
        if (flags is null)
        {
            return false;
        }

        var masterEnabled = ResolveFlag(flags, WorkspaceEmailDeliveryFlags.Master, defaultValue: false);
        var categoryEnabled = ResolveFlag(flags, WorkspaceEmailDeliveryFlags.ForCategory(category), defaultValue: true);
        return masterEnabled && categoryEnabled;
    }

    public async Task<bool> IsStatusNotificationsEnabledAsync(Guid tenantId, CancellationToken cancellationToken = default)
    {
        if (tenantId == Guid.Empty)
        {
            return false;
        }

        var flags = await ResolveFlagsAsync(tenantId, cancellationToken);
        return flags is not null
            && ResolveFlag(flags, WorkspaceEmailDeliveryFlags.StatusNotifications, defaultValue: true);
    }

    private async Task<Guid> ResolveCurrentTenantIdAsync(CancellationToken cancellationToken)
    {
        if (_tenantProvider.TenantId != Guid.Empty)
        {
            return _tenantProvider.TenantId;
        }

        var tenantKey = string.IsNullOrWhiteSpace(_tenantProvider.TenantKey)
            ? _defaultTenantKey
            : _tenantProvider.TenantKey.Trim();

        return await _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Key == tenantKey)
            .Select(t => t.Id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<Dictionary<string, bool>?> ResolveFlagsAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        if (tenantId == Guid.Empty)
        {
            return null;
        }

        var featureFlagsJson = await _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == tenantId)
            .Select(t => t.FeatureFlagsJson)
            .FirstOrDefaultAsync(cancellationToken);

        if (string.IsNullOrWhiteSpace(featureFlagsJson))
        {
            return new Dictionary<string, bool>(StringComparer.OrdinalIgnoreCase);
        }

        try
        {
            return JsonSerializer.Deserialize<Dictionary<string, bool>>(featureFlagsJson, JsonOptions)
                ?? new Dictionary<string, bool>(StringComparer.OrdinalIgnoreCase);
        }
        catch (JsonException ex)
        {
            _logger.LogWarning(ex, "Failed to parse workspace email delivery feature flags for tenant {TenantId}.", tenantId);
            return new Dictionary<string, bool>(StringComparer.OrdinalIgnoreCase);
        }
    }

    private static bool ResolveFlag(IReadOnlyDictionary<string, bool> flags, string key, bool defaultValue)
        => flags.TryGetValue(key, out var enabled) ? enabled : defaultValue;
}
