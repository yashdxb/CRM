using System.Net;
using System.Net.Http.Json;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CRM.Enterprise.Api.Tests.Opportunities;

public class OpportunityCoachingControllerTests
{
    [Fact]
    public async Task Coach_CreatesTask_ForOpportunityOwner_WhenManager()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default");
        var owner = SeedUser(context, tenant.Id, "Owner");
        var manager = SeedUser(context, tenant.Id, "Manager");
        var account = SeedAccount(context, tenant.Id, owner.Id);
        var stage = SeedStage(context, tenant.Id, "Qualification");
        var opportunity = SeedOpportunity(context, tenant.Id, account.Id, stage.Id, owner.Id);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", manager.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", manager.FullName);
        client.DefaultRequestHeaders.Add("X-Test-Roles", "Sales Manager");

        var dueDateUtc = DateTime.UtcNow.AddDays(3);
        var response = await client.PostAsJsonAsync(
            $"/api/opportunities/{opportunity.Id}/coach",
            new
            {
                comment = "Call the champion and confirm procurement steps.",
                dueDateUtc,
                priority = "High"
            });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var payload = await response.Content.ReadFromJsonAsync<CoachingResponse>();
        Assert.NotNull(payload);

        var activity = await context.Activities
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(a => a.Id == payload!.ActivityId);
        Assert.NotNull(activity);
        Assert.Equal(owner.Id, activity!.OwnerId);
        Assert.Equal(ActivityRelationType.Opportunity, activity.RelatedEntityType);
        Assert.Equal(opportunity.Id, activity.RelatedEntityId);
        Assert.Contains(opportunity.Name, activity.Subject);
    }

    [Fact]
    public async Task Coach_ReturnsForbid_WhenUserIsNotManager()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default");
        var owner = SeedUser(context, tenant.Id, "Owner");
        var rep = SeedUser(context, tenant.Id, "Rep");
        var account = SeedAccount(context, tenant.Id, owner.Id);
        var stage = SeedStage(context, tenant.Id, "Qualification");
        var opportunity = SeedOpportunity(context, tenant.Id, account.Id, stage.Id, owner.Id);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", rep.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", rep.FullName);
        client.DefaultRequestHeaders.Add("X-Test-Roles", "Sales Rep");

        var response = await client.PostAsJsonAsync(
            $"/api/opportunities/{opportunity.Id}/coach",
            new { comment = "Do the next step." });

        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    private static Tenant SeedTenant(CrmDbContext context, string key)
    {
        var tenant = new Tenant
        {
            Key = key,
            Name = "Test Tenant",
            CreatedAtUtc = DateTime.UtcNow
        };
        context.Tenants.Add(tenant);
        return tenant;
    }

    private static User SeedUser(CrmDbContext context, Guid tenantId, string name)
    {
        var user = new User
        {
            TenantId = tenantId,
            FullName = name,
            Email = $"{name.ToLowerInvariant()}@example.com",
            CreatedAtUtc = DateTime.UtcNow
        };
        context.Users.Add(user);
        return user;
    }

    private static Account SeedAccount(CrmDbContext context, Guid tenantId, Guid ownerId)
    {
        var account = new Account
        {
            TenantId = tenantId,
            Name = "Acme Corp",
            OwnerId = ownerId,
            LifecycleStage = "Prospect",
            CreatedAtUtc = DateTime.UtcNow
        };
        context.Accounts.Add(account);
        return account;
    }

    private static OpportunityStage SeedStage(CrmDbContext context, Guid tenantId, string name)
    {
        var stage = new OpportunityStage
        {
            TenantId = tenantId,
            Name = name,
            Order = 1,
            CreatedAtUtc = DateTime.UtcNow
        };
        context.OpportunityStages.Add(stage);
        return stage;
    }

    private static Opportunity SeedOpportunity(CrmDbContext context, Guid tenantId, Guid accountId, Guid stageId, Guid ownerId)
    {
        var opportunity = new Opportunity
        {
            TenantId = tenantId,
            Name = "Expansion Deal",
            AccountId = accountId,
            StageId = stageId,
            OwnerId = ownerId,
            Amount = 25000m,
            Probability = 0.5m,
            Currency = "USD",
            CreatedAtUtc = DateTime.UtcNow
        };
        context.Opportunities.Add(opportunity);
        return opportunity;
    }

    private sealed record CoachingResponse(Guid ActivityId);
}
