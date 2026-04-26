using CRM.Enterprise.Api.Contracts.Tenants;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Security;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/tenant-context")]
public class TenantContextController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IConfiguration _configuration;
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private static readonly HashSet<string> SupportedFeatureFlags = new(StringComparer.OrdinalIgnoreCase)
    {
        "properties",
        "auth.entra",
        "marketing.campaigns",
        "mailbox.enabled",
        "helpdesk.enabled",
        "helpdesk.cases",
        "helpdesk.emailIntake",
        "helpdesk.realtime",
        "realtime.dashboard",
        "realtime.pipeline",
        "realtime.entityCrud",
        "realtime.importProgress",
        "realtime.recordPresence",
        "realtime.assistantStreaming",
        WorkspaceEmailDeliveryFlags.Master,
        WorkspaceEmailDeliveryFlags.Invites,
        WorkspaceEmailDeliveryFlags.Security,
        WorkspaceEmailDeliveryFlags.Approvals,
        WorkspaceEmailDeliveryFlags.Proposals,
        WorkspaceEmailDeliveryFlags.Marketing,
        WorkspaceEmailDeliveryFlags.Notifications,
        WorkspaceEmailDeliveryFlags.Mailbox,
        WorkspaceEmailDeliveryFlags.StatusNotifications
    };

    public TenantContextController(CrmDbContext dbContext, ITenantProvider tenantProvider, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<ActionResult<TenantContextResponse>> GetTenantContext(CancellationToken cancellationToken)
    {
        if (_tenantProvider.TenantId == Guid.Empty)
        {
            return Unauthorized(new { message = "Tenant context is not available." });
        }

        var tenant = await _dbContext.Tenants
            .FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, cancellationToken);

        if (tenant is null)
        {
            return NotFound(new { message = "Tenant not found." });
        }

        var verticalPresetConfiguration = await EnsureVerticalPresetConfigurationPersistedAsync(tenant, cancellationToken);

        var modules = tenant.IndustryModules == null
            ? Array.Empty<string>()
            : tenant.IndustryModules.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        var marketingDefaultEnabled = _configuration.GetValue<bool?>("Features:Marketing:Campaigns:EnabledByDefault") ?? false;
        var marketingEnabledTenants = _configuration
            .GetSection("Features:Marketing:Campaigns:EnabledTenants")
            .Get<string[]>() ?? Array.Empty<string>();
        var marketingEnabled = marketingDefaultEnabled
            || marketingEnabledTenants.Contains(tenant.Key, StringComparer.OrdinalIgnoreCase);
        var helpDeskDefaultEnabled = _configuration.GetValue<bool?>("Features:HelpDesk:Cases:EnabledByDefault") ?? false;
        var helpDeskEnabledTenants = _configuration
            .GetSection("Features:HelpDesk:Cases:EnabledTenants")
            .Get<string[]>() ?? Array.Empty<string>();
        var helpDeskEnabled = helpDeskDefaultEnabled
            || helpDeskEnabledTenants.Contains(tenant.Key, StringComparer.OrdinalIgnoreCase)
            || string.Equals(tenant.Key, "default", StringComparison.OrdinalIgnoreCase);

        var featureFlags = new Dictionary<string, bool>(StringComparer.OrdinalIgnoreCase)
        {
            ["properties"] = string.Equals(tenant.IndustryPreset, VerticalPresetIds.RealEstateBrokerage, StringComparison.OrdinalIgnoreCase),
            ["marketing.campaigns"] = marketingEnabled,
            ["mailbox.enabled"] = false,
            ["helpdesk.enabled"] = helpDeskEnabled,
            ["helpdesk.cases"] = helpDeskEnabled,
            ["helpdesk.emailIntake"] = helpDeskEnabled,
            ["helpdesk.realtime"] = helpDeskEnabled,
            [WorkspaceEmailDeliveryFlags.Master] = false,
            [WorkspaceEmailDeliveryFlags.Invites] = true,
            [WorkspaceEmailDeliveryFlags.Security] = true,
            [WorkspaceEmailDeliveryFlags.Approvals] = true,
            [WorkspaceEmailDeliveryFlags.Proposals] = true,
            [WorkspaceEmailDeliveryFlags.Marketing] = true,
            [WorkspaceEmailDeliveryFlags.Notifications] = true,
            [WorkspaceEmailDeliveryFlags.Mailbox] = true,
            [WorkspaceEmailDeliveryFlags.StatusNotifications] = true
        };

        var realtimeDefaultEnabled = _configuration.GetValue<bool?>("Features:Realtime:EnabledByDefault") ?? false;
        var realtimeEnabledTenants = _configuration
            .GetSection("Features:Realtime:EnabledTenants")
            .Get<string[]>() ?? Array.Empty<string>();
        var realtimeTenantEnabled = realtimeDefaultEnabled
            || realtimeEnabledTenants.Contains(tenant.Key, StringComparer.OrdinalIgnoreCase);

        featureFlags["realtime.dashboard"] = IsRealtimeFlagEnabled("realtime.dashboard", tenant.Key, realtimeTenantEnabled);
        featureFlags["realtime.pipeline"] = IsRealtimeFlagEnabled("realtime.pipeline", tenant.Key, realtimeTenantEnabled);
        featureFlags["realtime.entityCrud"] = IsRealtimeFlagEnabled("realtime.entityCrud", tenant.Key, realtimeTenantEnabled);
        featureFlags["realtime.importProgress"] = IsRealtimeFlagEnabled("realtime.importProgress", tenant.Key, realtimeTenantEnabled);
        featureFlags["realtime.recordPresence"] = IsRealtimeFlagEnabled("realtime.recordPresence", tenant.Key, realtimeTenantEnabled);
        featureFlags["realtime.assistantStreaming"] = IsRealtimeFlagEnabled("realtime.assistantStreaming", tenant.Key, realtimeTenantEnabled);
        ApplyTenantFeatureOverrides(featureFlags, tenant.FeatureFlagsJson);

        return Ok(new TenantContextResponse(
            tenant.Id,
            tenant.Key,
            tenant.Name,
            tenant.IndustryPreset,
            verticalPresetConfiguration,
            modules,
            featureFlags,
            tenant.LogoUrl));
    }

    private bool IsRealtimeFlagEnabled(string flagName, string tenantKey, bool realtimeTenantEnabled)
    {
        if (!realtimeTenantEnabled)
        {
            return false;
        }

        var normalized = flagName.Replace("realtime.", string.Empty, StringComparison.OrdinalIgnoreCase);
        var defaultEnabled = _configuration.GetValue<bool?>($"Features:Realtime:Flags:{normalized}:EnabledByDefault") ?? false;
        if (defaultEnabled)
        {
            return true;
        }

        var enabledTenants = _configuration
            .GetSection($"Features:Realtime:Flags:{normalized}:EnabledTenants")
            .Get<string[]>() ?? Array.Empty<string>();

        if (enabledTenants.Length > 0)
        {
            return enabledTenants.Contains(tenantKey, StringComparer.OrdinalIgnoreCase);
        }

        // Default pilot behavior in absence of explicit config.
        return string.Equals(tenantKey, "default", StringComparison.OrdinalIgnoreCase);
    }

    private void ApplyTenantFeatureOverrides(IDictionary<string, bool> featureFlags, string? featureFlagsJson)
    {
        if (string.IsNullOrWhiteSpace(featureFlagsJson))
        {
            return;
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<Dictionary<string, bool>>(featureFlagsJson, JsonOptions);
            if (parsed is null || parsed.Count == 0)
            {
                return;
            }

            foreach (var (key, value) in parsed)
            {
                if (!SupportedFeatureFlags.Contains(key))
                {
                    continue;
                }

                featureFlags[key] = value;
            }
        }
        catch (JsonException)
        {
            // Ignore malformed overrides and continue with configuration defaults.
        }
    }

    private static VerticalPresetConfiguration ResolveVerticalPresetConfiguration(Tenant tenant)
    {
        if (!string.IsNullOrWhiteSpace(tenant.VerticalPresetConfigJson))
        {
            try
            {
                var parsed = JsonSerializer.Deserialize<VerticalPresetConfiguration>(tenant.VerticalPresetConfigJson, JsonOptions);
                if (parsed is not null)
                {
                    return VerticalPresetDefaults.Normalize(parsed);
                }
            }
            catch (JsonException)
            {
            }
        }

        return VerticalPresetDefaults.Create(tenant.IndustryPreset);
    }

    private async Task<VerticalPresetConfiguration> EnsureVerticalPresetConfigurationPersistedAsync(Tenant tenant, CancellationToken cancellationToken)
    {
        var resolved = ResolveVerticalPresetConfiguration(tenant);
        var normalizedJson = JsonSerializer.Serialize(resolved, JsonOptions);

        if (string.Equals(tenant.VerticalPresetConfigJson, normalizedJson, StringComparison.Ordinal))
        {
            return resolved;
        }

        if (_dbContext.Entry(tenant).State == EntityState.Detached)
        {
            _dbContext.Attach(tenant);
        }

        tenant.VerticalPresetConfigJson = normalizedJson;
        tenant.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return resolved;
    }
}
