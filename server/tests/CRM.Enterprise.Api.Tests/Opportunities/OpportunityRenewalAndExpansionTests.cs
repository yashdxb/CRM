using System.Net;
using System.Net.Http.Json;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CRM.Enterprise.Api.Tests.Opportunities;

public class OpportunityRenewalAndExpansionTests
{
    [Fact]
    public async Task RenewalAutomation_CreatesRenewalOpportunity_AndReminders()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default");
        var owner = SeedUser(context, tenant.Id, "Rep");
        var account = SeedAccount(context, tenant.Id, owner.Id);
        _ = SeedStage(context, tenant.Id, "Prospecting", "Pipeline", 1);
        var closedWon = SeedStage(context, tenant.Id, "Closed Won", "Closed", 2, isClosedStage: true);
        var baseOpportunity = SeedClosedWonOpportunity(context, tenant.Id, account.Id, closedWon.Id, owner.Id);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", owner.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", owner.FullName);
        client.DefaultRequestHeaders.Add("X-Test-Roles", "Sales Manager");

        var response = await client.PostAsync("/api/opportunities/renewal-automation", null);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var renewal = await context.Opportunities
            .IgnoreQueryFilters()
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.RenewalOfOpportunityId == baseOpportunity.Id && !o.IsDeleted);
        Assert.NotNull(renewal);
        Assert.Equal("Renewal", renewal!.OpportunityType);

        var baseReloaded = await context.Opportunities
            .IgnoreQueryFilters()
            .AsNoTracking()
            .FirstAsync(o => o.Id == baseOpportunity.Id);
        Assert.Equal(renewal.Id, baseReloaded.RenewalOpportunityId);
        Assert.NotNull(baseReloaded.Renewal90TaskCreatedAtUtc);

        var reminderTasks = await context.Activities
            .IgnoreQueryFilters()
            .Where(a => a.RelatedEntityType == ActivityRelationType.Opportunity
                        && a.RelatedEntityId == renewal.Id
                        && a.Subject.Contains("Renewal", StringComparison.OrdinalIgnoreCase))
            .ToListAsync();
        Assert.NotEmpty(reminderTasks);
    }

    [Fact]
    public async Task ExpansionSignals_ReturnSignal_AndCreateExpansionOpportunity()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default");
        var owner = SeedUser(context, tenant.Id, "Rep");
        var account = SeedAccount(context, tenant.Id, owner.Id);
        var prospecting = SeedStage(context, tenant.Id, "Prospecting", "Pipeline", 1);
        var closedWon = SeedStage(context, tenant.Id, "Closed Won", "Closed", 2, isClosedStage: true);
        var baseOpportunity = SeedClosedWonOpportunity(context, tenant.Id, account.Id, closedWon.Id, owner.Id);
        SeedExpansionSignalActivity(context, tenant.Id, baseOpportunity.Id, owner.Id);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", owner.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", owner.FullName);
        client.DefaultRequestHeaders.Add("X-Test-Roles", "Sales Rep");

        var signalsResponse = await client.GetAsync("/api/opportunities/expansion-signals");
        Assert.Equal(HttpStatusCode.OK, signalsResponse.StatusCode);
        var signals = await signalsResponse.Content.ReadFromJsonAsync<List<ExpansionSignalPayload>>();
        Assert.NotNull(signals);
        Assert.Contains(signals!, s => s.OpportunityId == baseOpportunity.Id);

        var expansionResponse = await client.PostAsync($"/api/opportunities/{baseOpportunity.Id}/expansion", null);
        Assert.Equal(HttpStatusCode.OK, expansionResponse.StatusCode);

        var expansion = await context.Opportunities
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(o => o.AccountId == account.Id && o.OpportunityType == "Expansion" && !o.IsDeleted);
        Assert.NotNull(expansion);
        Assert.Equal(prospecting.Id, expansion!.StageId);
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
            LifecycleStage = "Customer",
            CreatedAtUtc = DateTime.UtcNow
        };
        context.Accounts.Add(account);
        return account;
    }

    private static OpportunityStage SeedStage(CrmDbContext context, Guid tenantId, string name, string forecastCategory, int order, bool isClosedStage = false)
    {
        var stage = new OpportunityStage
        {
            TenantId = tenantId,
            Name = name,
            ForecastCategory = forecastCategory,
            Order = order,
            IsClosedStage = isClosedStage,
            CreatedAtUtc = DateTime.UtcNow
        };
        context.OpportunityStages.Add(stage);
        return stage;
    }

    private static Opportunity SeedClosedWonOpportunity(CrmDbContext context, Guid tenantId, Guid accountId, Guid stageId, Guid ownerId)
    {
        var contractEnd = DateTime.UtcNow.AddDays(80);
        var contractStart = contractEnd.AddDays(-365);
        var opportunity = new Opportunity
        {
            TenantId = tenantId,
            Name = "Cedar Analytics",
            AccountId = accountId,
            StageId = stageId,
            OwnerId = ownerId,
            Amount = 25000m,
            Currency = "USD",
            Probability = 1m,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(-10),
            ContractStartDateUtc = contractStart,
            ContractEndDateUtc = contractEnd,
            ForecastCategory = "Closed",
            OpportunityType = "New",
            IsClosed = true,
            IsWon = true,
            WinLossReason = "Closed via test",
            CreatedAtUtc = DateTime.UtcNow.AddDays(-40)
        };
        context.Opportunities.Add(opportunity);
        return opportunity;
    }

    private static void SeedExpansionSignalActivity(CrmDbContext context, Guid tenantId, Guid opportunityId, Guid ownerId)
    {
        context.Activities.Add(new Activity
        {
            TenantId = tenantId,
            Subject = "Expansion signal",
            Outcome = "Expansion signal",
            Type = ActivityType.Note,
            RelatedEntityType = ActivityRelationType.Opportunity,
            RelatedEntityId = opportunityId,
            OwnerId = ownerId,
            CreatedAtUtc = DateTime.UtcNow.AddDays(-2)
        });
    }

    private sealed record ExpansionSignalPayload(Guid OpportunityId, Guid AccountId);
}
