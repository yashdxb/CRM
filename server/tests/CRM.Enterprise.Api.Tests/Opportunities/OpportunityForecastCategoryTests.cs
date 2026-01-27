using System.Net;
using System.Net.Http.Json;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CRM.Enterprise.Api.Tests.Opportunities;

public class OpportunityForecastCategoryTests
{
    [Fact]
    public async Task Update_ToCommit_Fails_WhenForecastCategoryIsNotCommit()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default");
        var owner = SeedUser(context, tenant.Id, "Rep");
        var account = SeedAccount(context, tenant.Id, owner.Id);
        SeedContact(context, tenant.Id, account.Id, owner.Id, "Decision Maker");
        var negotiationStage = SeedStage(context, tenant.Id, "Negotiation", "Best Case", 1);
        var commitStage = SeedStage(context, tenant.Id, "Commit", "Commit", 2);
        var opportunity = SeedOpportunity(context, tenant.Id, account.Id, negotiationStage.Id, owner.Id);
        opportunity.SecurityReviewStatus = "Approved";
        opportunity.LegalReviewStatus = "Approved";
        SeedNextStep(context, tenant.Id, opportunity.Id, owner.Id);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", owner.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", owner.FullName);
        client.DefaultRequestHeaders.Add("X-Test-Roles", "Sales Rep");

        var response = await client.PutAsJsonAsync(
            $"/api/opportunities/{opportunity.Id}",
            new
            {
                opportunity.Name,
                accountId = opportunity.AccountId,
                stageName = commitStage.Name,
                opportunity.Amount,
                opportunity.Currency,
                opportunity.Probability,
                expectedCloseDate = opportunity.ExpectedCloseDate,
                forecastCategory = "Best Case",
                opportunity.SecurityReviewStatus,
                opportunity.LegalReviewStatus,
                isClosed = false,
                isWon = false
            });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var message = await response.Content.ReadAsStringAsync();
        Assert.Contains("Forecast category must be Commit", message);
    }

    [Fact]
    public async Task CloseWon_Fails_WhenForecastCategoryMissing()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default");
        var owner = SeedUser(context, tenant.Id, "Rep");
        var account = SeedAccount(context, tenant.Id, owner.Id);
        var openStage = SeedStage(context, tenant.Id, "Negotiation", "Best Case", 1);
        var closedWonStage = SeedStage(context, tenant.Id, "Closed Won", "Closed", 2, isClosedStage: true);
        var opportunity = SeedOpportunity(context, tenant.Id, account.Id, openStage.Id, owner.Id);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", owner.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", owner.FullName);
        client.DefaultRequestHeaders.Add("X-Test-Roles", "Sales Rep");

        var response = await client.PutAsJsonAsync(
            $"/api/opportunities/{opportunity.Id}",
            new
            {
                opportunity.Name,
                accountId = opportunity.AccountId,
                stageName = closedWonStage.Name,
                opportunity.Amount,
                opportunity.Currency,
                opportunity.Probability,
                expectedCloseDate = opportunity.ExpectedCloseDate,
                forecastCategory = (string?)null,
                isClosed = true,
                isWon = true,
                winLossReason = "Closed via test"
            });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var message = await response.Content.ReadAsStringAsync();
        Assert.Contains("Forecast category is required", message);
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

    private static Contact SeedContact(CrmDbContext context, Guid tenantId, Guid accountId, Guid ownerId, string buyingRole)
    {
        var contact = new Contact
        {
            TenantId = tenantId,
            AccountId = accountId,
            OwnerId = ownerId,
            FirstName = "Buyer",
            LastName = "One",
            Email = "buyer@example.com",
            BuyingRole = buyingRole,
            CreatedAtUtc = DateTime.UtcNow
        };
        context.Contacts.Add(contact);
        return contact;
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

    private static Opportunity SeedOpportunity(CrmDbContext context, Guid tenantId, Guid accountId, Guid stageId, Guid ownerId)
    {
        var opportunity = new Opportunity
        {
            TenantId = tenantId,
            Name = "Test Opportunity",
            AccountId = accountId,
            StageId = stageId,
            OwnerId = ownerId,
            Amount = 10000m,
            Currency = "USD",
            Probability = 0.5m,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(30),
            CreatedAtUtc = DateTime.UtcNow
        };
        context.Opportunities.Add(opportunity);
        return opportunity;
    }

    private static void SeedNextStep(CrmDbContext context, Guid tenantId, Guid opportunityId, Guid ownerId)
    {
        context.Activities.Add(new Activity
        {
            TenantId = tenantId,
            Subject = "Next step",
            Type = ActivityType.Task,
            RelatedEntityType = ActivityRelationType.Opportunity,
            RelatedEntityId = opportunityId,
            OwnerId = ownerId,
            DueDateUtc = DateTime.UtcNow.AddDays(2),
            CreatedAtUtc = DateTime.UtcNow
        });
    }
}
