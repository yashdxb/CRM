using CRM.Enterprise.Api.Controllers;
using CRM.Enterprise.Api.Contracts.Workspace;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CRM.Enterprise.Api.Tests.Workspace;

public class WorkspaceControllerTests
{
    [Fact]
    public async Task GetSettings_ReturnsStoredEmailFlags_WithoutOverwritingThemWithDefaults()
    {
        var tenantProvider = new TestTenantProvider();
        var options = new DbContextOptionsBuilder<CrmDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        await using var dbContext = new CrmDbContext(options, tenantProvider);
        var tenant = new Tenant
        {
            Key = "default",
            Name = "Demo Workspace",
            FeatureFlagsJson =
                """
                {
                  "communications.emailDelivery": true,
                  "communications.emailDelivery.invites": false,
                  "communications.emailDelivery.security": false,
                  "communications.emailDelivery.approvals": true
                }
                """
        };
        dbContext.Tenants.Add(tenant);
        await dbContext.SaveChangesAsync();
        tenantProvider.SetTenant(tenant.Id, tenant.Key);

        var controller = new WorkspaceController(dbContext, tenantProvider, new StubIndustryPresetService());

        var action = await controller.GetSettings(CancellationToken.None);
        var ok = Assert.IsType<OkObjectResult>(action.Result);
        var payload = Assert.IsType<WorkspaceSettingsResponse>(ok.Value);

        Assert.NotNull(payload.FeatureFlags);
        Assert.True(payload.FeatureFlags![WorkspaceEmailDeliveryFlags.Master]);
        Assert.False(payload.FeatureFlags[WorkspaceEmailDeliveryFlags.Invites]);
        Assert.False(payload.FeatureFlags[WorkspaceEmailDeliveryFlags.Security]);
        Assert.True(payload.FeatureFlags[WorkspaceEmailDeliveryFlags.Approvals]);
        Assert.False(payload.FeatureFlags[WorkspaceEmailDeliveryFlags.Marketing]);
    }

    private sealed class TestTenantProvider : ITenantProvider
    {
        public Guid TenantId { get; private set; }
        public string TenantKey { get; private set; } = string.Empty;

        public void SetTenant(Guid tenantId, string tenantKey)
        {
            TenantId = tenantId;
            TenantKey = tenantKey;
        }
    }

    private sealed class StubIndustryPresetService : IIndustryPresetService
    {
        public Task ApplyPresetAsync(Guid tenantId, string presetId, bool resetExisting = false, CancellationToken cancellationToken = default)
            => Task.CompletedTask;
    }
}
