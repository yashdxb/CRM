using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Marketing;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CRM.Enterprise.Infrastructure.Tests.Marketing;

public class MarketingAttributionIntegrationTests
{
    [Fact]
    public async Task RecomputeForOpportunityAsync_UsesEarliestMembership_WhenLeadConvertedToOpportunity()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var (tenant, owner, account, stage, leadStatus) = SeedCoreData(dbContext, tenantProvider);

        var contact = new Contact
        {
            TenantId = tenant.Id,
            FirstName = "Mina",
            LastName = "Cole",
            OwnerId = owner.Id,
            AccountId = account.Id
        };
        dbContext.Contacts.Add(contact);

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Converted deal",
            AccountId = account.Id,
            PrimaryContactId = contact.Id,
            StageId = stage.Id,
            OwnerId = owner.Id,
            Amount = 2500m,
            Currency = "USD",
            Probability = 40,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(30)
        };
        dbContext.Opportunities.Add(opportunity);

        var lead = new Lead
        {
            TenantId = tenant.Id,
            FirstName = "Ari",
            LastName = "Stone",
            LeadStatusId = leadStatus.Id,
            OwnerId = owner.Id,
            ContactId = contact.Id,
            ConvertedOpportunityId = opportunity.Id
        };
        dbContext.Leads.Add(lead);

        var earlyCampaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Early campaign",
            Type = "Webinar",
            Channel = "Email",
            Status = "Active",
            OwnerUserId = owner.Id
        };
        var lateCampaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Late campaign",
            Type = "Ad",
            Channel = "Paid",
            Status = "Active",
            OwnerUserId = owner.Id
        };
        dbContext.Campaigns.AddRange(earlyCampaign, lateCampaign);

        dbContext.CampaignMembers.AddRange(
            new CampaignMember
            {
                TenantId = tenant.Id,
                CampaignId = earlyCampaign.Id,
                EntityType = "Lead",
                EntityId = lead.Id,
                ResponseStatus = "Sent",
                AddedUtc = DateTime.UtcNow.AddDays(-12)
            },
            new CampaignMember
            {
                TenantId = tenant.Id,
                CampaignId = lateCampaign.Id,
                EntityType = "Contact",
                EntityId = contact.Id,
                ResponseStatus = "Responded",
                AddedUtc = DateTime.UtcNow.AddDays(-2)
            });

        await dbContext.SaveChangesAsync();

        var service = new MarketingService(dbContext);
        await service.RecomputeForOpportunityAsync(opportunity.Id);

        var attribution = await dbContext.CampaignAttributions
            .AsNoTracking()
            .SingleAsync(a => a.OpportunityId == opportunity.Id && !a.IsDeleted);

        Assert.Equal(earlyCampaign.Id, attribution.CampaignId);
        Assert.Equal(2500m, attribution.AttributedAmount);
    }

    [Fact]
    public async Task GetAttributionSummaryAsync_LastTouch_SelectsLatestMembershipCampaign()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var (tenant, owner, account, stage, leadStatus) = SeedCoreData(dbContext, tenantProvider);

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Last touch selection",
            AccountId = account.Id,
            StageId = stage.Id,
            OwnerId = owner.Id,
            Amount = 1000m,
            Currency = "USD",
            Probability = 40,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(20)
        };
        dbContext.Opportunities.Add(opportunity);

        var lead = new Lead
        {
            TenantId = tenant.Id,
            FirstName = "Rami",
            LastName = "Nash",
            LeadStatusId = leadStatus.Id,
            OwnerId = owner.Id,
            ConvertedOpportunityId = opportunity.Id
        };
        dbContext.Leads.Add(lead);

        var earlyCampaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Early campaign",
            Type = "Event",
            Channel = "Field",
            Status = "Active",
            OwnerUserId = owner.Id
        };
        var lateCampaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Late campaign",
            Type = "Paid",
            Channel = "Ads",
            Status = "Active",
            OwnerUserId = owner.Id
        };
        dbContext.Campaigns.AddRange(earlyCampaign, lateCampaign);

        dbContext.CampaignMembers.AddRange(
            new CampaignMember
            {
                TenantId = tenant.Id,
                CampaignId = earlyCampaign.Id,
                EntityType = "Lead",
                EntityId = lead.Id,
                ResponseStatus = "Sent",
                AddedUtc = DateTime.UtcNow.AddDays(-10)
            },
            new CampaignMember
            {
                TenantId = tenant.Id,
                CampaignId = lateCampaign.Id,
                EntityType = "Lead",
                EntityId = lead.Id,
                ResponseStatus = "Responded",
                AddedUtc = DateTime.UtcNow.AddDays(-2)
            });

        await dbContext.SaveChangesAsync();

        var service = new MarketingService(dbContext);
        var summary = await service.GetAttributionSummaryAsync("last_touch");

        var earlyRow = summary.Single(x => x.CampaignId == earlyCampaign.Id);
        var lateRow = summary.Single(x => x.CampaignId == lateCampaign.Id);

        Assert.Equal(0, earlyRow.InfluencedOpportunities);
        Assert.Equal(0m, earlyRow.InfluencedPipelineAmount);
        Assert.Equal(1, lateRow.InfluencedOpportunities);
        Assert.Equal(1000m, lateRow.InfluencedPipelineAmount);
    }

    [Fact]
    public async Task GetAttributionSummaryAsync_Linear_SplitsAmountAcrossDistinctCampaigns()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var (tenant, owner, account, stage, leadStatus) = SeedCoreData(dbContext, tenantProvider);

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Linear split",
            AccountId = account.Id,
            StageId = stage.Id,
            OwnerId = owner.Id,
            Amount = 1200m,
            Currency = "USD",
            Probability = 45,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(15)
        };
        dbContext.Opportunities.Add(opportunity);

        var lead = new Lead
        {
            TenantId = tenant.Id,
            FirstName = "Jules",
            LastName = "Park",
            LeadStatusId = leadStatus.Id,
            OwnerId = owner.Id,
            ConvertedOpportunityId = opportunity.Id
        };
        dbContext.Leads.Add(lead);

        var campaignA = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Campaign A",
            Type = "Email",
            Channel = "Email",
            Status = "Active",
            OwnerUserId = owner.Id
        };
        var campaignB = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Campaign B",
            Type = "Webinar",
            Channel = "Web",
            Status = "Active",
            OwnerUserId = owner.Id
        };
        dbContext.Campaigns.AddRange(campaignA, campaignB);

        dbContext.CampaignMembers.AddRange(
            new CampaignMember
            {
                TenantId = tenant.Id,
                CampaignId = campaignA.Id,
                EntityType = "Lead",
                EntityId = lead.Id,
                ResponseStatus = "Sent",
                AddedUtc = DateTime.UtcNow.AddDays(-8)
            },
            new CampaignMember
            {
                TenantId = tenant.Id,
                CampaignId = campaignB.Id,
                EntityType = "Lead",
                EntityId = lead.Id,
                ResponseStatus = "Responded",
                AddedUtc = DateTime.UtcNow.AddDays(-3)
            });

        await dbContext.SaveChangesAsync();

        var service = new MarketingService(dbContext);
        var summary = await service.GetAttributionSummaryAsync("linear");

        var campaignARow = summary.Single(x => x.CampaignId == campaignA.Id);
        var campaignBRow = summary.Single(x => x.CampaignId == campaignB.Id);

        Assert.Equal(1, campaignARow.InfluencedOpportunities);
        Assert.Equal(1, campaignBRow.InfluencedOpportunities);
        Assert.Equal(600m, campaignARow.InfluencedPipelineAmount);
        Assert.Equal(600m, campaignBRow.InfluencedPipelineAmount);
    }

    [Fact]
    public async Task RemoveMemberAsync_ReassignsThenRemovesAttribution_WhenMembershipsAreRemoved()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var (tenant, owner, account, stage, leadStatus) = SeedCoreData(dbContext, tenantProvider);

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Reassign test",
            AccountId = account.Id,
            StageId = stage.Id,
            OwnerId = owner.Id,
            Amount = 1800m,
            Currency = "USD",
            Probability = 25,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(20)
        };
        dbContext.Opportunities.Add(opportunity);

        var lead = new Lead
        {
            TenantId = tenant.Id,
            FirstName = "Noah",
            LastName = "Lane",
            LeadStatusId = leadStatus.Id,
            OwnerId = owner.Id,
            ConvertedOpportunityId = opportunity.Id
        };
        dbContext.Leads.Add(lead);

        var firstCampaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "First campaign",
            Type = "Event",
            Channel = "Field",
            Status = "Active",
            OwnerUserId = owner.Id
        };
        var secondCampaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Second campaign",
            Type = "Web",
            Channel = "Organic",
            Status = "Active",
            OwnerUserId = owner.Id
        };
        dbContext.Campaigns.AddRange(firstCampaign, secondCampaign);

        var firstMember = new CampaignMember
        {
            TenantId = tenant.Id,
            CampaignId = firstCampaign.Id,
            EntityType = "Lead",
            EntityId = lead.Id,
            ResponseStatus = "Sent",
            AddedUtc = DateTime.UtcNow.AddDays(-8)
        };
        var secondMember = new CampaignMember
        {
            TenantId = tenant.Id,
            CampaignId = secondCampaign.Id,
            EntityType = "Lead",
            EntityId = lead.Id,
            ResponseStatus = "Responded",
            AddedUtc = DateTime.UtcNow.AddDays(-3)
        };
        dbContext.CampaignMembers.AddRange(firstMember, secondMember);

        await dbContext.SaveChangesAsync();

        var service = new MarketingService(dbContext);
        await service.RecomputeForOpportunityAsync(opportunity.Id);

        var initialAttribution = await dbContext.CampaignAttributions
            .AsNoTracking()
            .SingleAsync(a => a.OpportunityId == opportunity.Id && !a.IsDeleted);
        Assert.Equal(firstCampaign.Id, initialAttribution.CampaignId);

        var removeFirst = await service.RemoveMemberAsync(firstCampaign.Id, firstMember.Id);
        Assert.True(removeFirst.Success);

        var reassignedAttribution = await dbContext.CampaignAttributions
            .AsNoTracking()
            .SingleAsync(a => a.OpportunityId == opportunity.Id && !a.IsDeleted);
        Assert.Equal(secondCampaign.Id, reassignedAttribution.CampaignId);

        var removeSecond = await service.RemoveMemberAsync(secondCampaign.Id, secondMember.Id);
        Assert.True(removeSecond.Success);

        var activeCount = await dbContext.CampaignAttributions
            .AsNoTracking()
            .CountAsync(a => a.OpportunityId == opportunity.Id && !a.IsDeleted);
        Assert.Equal(0, activeCount);
    }

    [Fact]
    public async Task RecomputeForOpportunityAsync_RefreshesAttributedAmount_WhenOpportunityAmountChanges()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var (tenant, owner, account, stage, leadStatus) = SeedCoreData(dbContext, tenantProvider);

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Amount refresh",
            AccountId = account.Id,
            StageId = stage.Id,
            OwnerId = owner.Id,
            Amount = 900m,
            Currency = "USD",
            Probability = 30,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(14)
        };
        dbContext.Opportunities.Add(opportunity);

        var lead = new Lead
        {
            TenantId = tenant.Id,
            FirstName = "Lina",
            LastName = "Diaz",
            LeadStatusId = leadStatus.Id,
            OwnerId = owner.Id,
            ConvertedOpportunityId = opportunity.Id
        };
        dbContext.Leads.Add(lead);

        var campaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Attribution campaign",
            Type = "Email",
            Channel = "Email",
            Status = "Active",
            OwnerUserId = owner.Id
        };
        dbContext.Campaigns.Add(campaign);

        dbContext.CampaignMembers.Add(new CampaignMember
        {
            TenantId = tenant.Id,
            CampaignId = campaign.Id,
            EntityType = "Lead",
            EntityId = lead.Id,
            ResponseStatus = "Sent",
            AddedUtc = DateTime.UtcNow.AddDays(-5)
        });

        await dbContext.SaveChangesAsync();

        var service = new MarketingService(dbContext);
        await service.RecomputeForOpportunityAsync(opportunity.Id);

        opportunity.Amount = 3200m;
        await dbContext.SaveChangesAsync();

        await service.RecomputeForOpportunityAsync(opportunity.Id);

        var attribution = await dbContext.CampaignAttributions
            .AsNoTracking()
            .SingleAsync(a => a.OpportunityId == opportunity.Id && !a.IsDeleted);

        Assert.Equal(3200m, attribution.AttributedAmount);
    }

    [Fact]
    public async Task GetCampaignHealthScoreAsync_PersistsSnapshot_AndReturnsScore()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var (tenant, owner, _, _, _) = SeedCoreData(dbContext, tenantProvider);

        var campaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Health campaign",
            Type = "Email",
            Channel = "Email",
            Status = "Active",
            OwnerUserId = owner.Id,
            BudgetPlanned = 1000m,
            BudgetActual = 600m
        };
        dbContext.Campaigns.Add(campaign);
        await dbContext.SaveChangesAsync();

        var service = new MarketingService(dbContext);
        var health = await service.GetCampaignHealthScoreAsync(campaign.Id);

        Assert.NotNull(health);
        Assert.Equal(campaign.Id, health!.CampaignId);
        Assert.InRange(health.Score, 0, 100);
        Assert.NotEmpty(health.ReasonChips);

        var snapshotCount = await dbContext.CampaignInsightSnapshots
            .AsNoTracking()
            .CountAsync(x => x.CampaignId == campaign.Id && !x.IsDeleted);
        Assert.Equal(1, snapshotCount);
    }

    [Fact]
    public async Task Recommendations_DecisionFlow_UpdatesStatus_AndWritesDecision()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var (tenant, owner, _, _, _) = SeedCoreData(dbContext, tenantProvider);

        var campaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Recommendation campaign",
            Type = "Webinar",
            Channel = "Paid",
            Status = "Active",
            OwnerUserId = owner.Id,
            BudgetPlanned = 1000m,
            BudgetActual = 1500m
        };
        dbContext.Campaigns.Add(campaign);
        await dbContext.SaveChangesAsync();

        var service = new MarketingService(dbContext);
        var recommendations = await service.GetCampaignRecommendationsAsync(campaign.Id);

        Assert.NotEmpty(recommendations);
        Assert.All(recommendations, row => Assert.NotEmpty(row.Evidence));
        Assert.True(recommendations.Count <= 5);

        var first = recommendations[0];
        var result = await service.ApplyRecommendationDecisionAsync(
            first.Id,
            new CRM.Enterprise.Application.Marketing.RecommendationDecisionRequest("dismiss", "Not needed"),
            owner.Id);

        Assert.True(result.Success);
        Assert.NotNull(result.Value);
        Assert.Equal("dismissed", result.Value!.Status);

        var decisionCount = await dbContext.CampaignRecommendationDecisions
            .AsNoTracking()
            .CountAsync(x => x.RecommendationId == first.Id && !x.IsDeleted);
        Assert.Equal(1, decisionCount);
    }

    [Fact]
    public async Task RecommendationAccept_IsIdempotent_ForFollowUpTaskCreation()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var (tenant, owner, account, stage, _) = SeedCoreData(dbContext, tenantProvider);

        var contact = new Contact
        {
            TenantId = tenant.Id,
            FirstName = "Ada",
            LastName = "Morris",
            OwnerId = owner.Id,
            AccountId = account.Id
        };
        dbContext.Contacts.Add(contact);

        var campaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Idempotent campaign",
            Type = "Web",
            Channel = "Organic",
            Status = "Active",
            OwnerUserId = owner.Id,
            BudgetPlanned = 1000m,
            BudgetActual = 1800m
        };
        dbContext.Campaigns.Add(campaign);

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Open opp",
            AccountId = account.Id,
            PrimaryContactId = contact.Id,
            StageId = stage.Id,
            OwnerId = owner.Id,
            Amount = 5000m,
            Currency = "USD",
            Probability = 20,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(30),
            IsClosed = false
        };
        dbContext.Opportunities.Add(opportunity);

        dbContext.CampaignMembers.Add(new CampaignMember
        {
            TenantId = tenant.Id,
            CampaignId = campaign.Id,
            EntityType = "Contact",
            EntityId = contact.Id,
            ResponseStatus = "Responded",
            AddedUtc = DateTime.UtcNow.AddDays(-10)
        });

        await dbContext.SaveChangesAsync();

        var service = new MarketingService(dbContext);
        await service.RecomputeForOpportunityAsync(opportunity.Id);
        var recommendations = await service.GetCampaignRecommendationsAsync(campaign.Id);
        var recommendation = recommendations.First();

        var accept1 = await service.ApplyRecommendationDecisionAsync(
            recommendation.Id,
            new CRM.Enterprise.Application.Marketing.RecommendationDecisionRequest("accept", "first accept"),
            owner.Id);
        Assert.True(accept1.Success);

        var taskCountAfterFirst = await dbContext.Activities
            .AsNoTracking()
            .CountAsync(a =>
                !a.IsDeleted &&
                a.Type == ActivityType.Task &&
                a.Subject.StartsWith("Marketing recommendation follow-up:"));
        Assert.True(taskCountAfterFirst >= 1);

        var accept2 = await service.ApplyRecommendationDecisionAsync(
            recommendation.Id,
            new CRM.Enterprise.Application.Marketing.RecommendationDecisionRequest("accept", "second accept"),
            owner.Id);
        Assert.True(accept2.Success);

        var taskCountAfterSecond = await dbContext.Activities
            .AsNoTracking()
            .CountAsync(a =>
                !a.IsDeleted &&
                a.Type == ActivityType.Task &&
                a.Subject.StartsWith("Marketing recommendation follow-up:"));

        Assert.Equal(taskCountAfterFirst, taskCountAfterSecond);
    }

    [Fact]
    public async Task PilotMetrics_ReturnsDecisionAndActionCounts()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var (tenant, owner, account, stage, _) = SeedCoreData(dbContext, tenantProvider);

        var campaign = new Campaign
        {
            TenantId = tenant.Id,
            Name = "Metrics campaign",
            Type = "Email",
            Channel = "Email",
            Status = "Active",
            OwnerUserId = owner.Id,
            BudgetPlanned = 900m,
            BudgetActual = 1500m
        };
        dbContext.Campaigns.Add(campaign);

        var contact = new Contact
        {
            TenantId = tenant.Id,
            FirstName = "Pilot",
            LastName = "User",
            OwnerId = owner.Id,
            AccountId = account.Id
        };
        dbContext.Contacts.Add(contact);

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Metrics opp",
            AccountId = account.Id,
            PrimaryContactId = contact.Id,
            StageId = stage.Id,
            OwnerId = owner.Id,
            Amount = 3200m,
            Currency = "USD",
            Probability = 30,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(20)
        };
        dbContext.Opportunities.Add(opportunity);

        dbContext.CampaignMembers.Add(new CampaignMember
        {
            TenantId = tenant.Id,
            CampaignId = campaign.Id,
            EntityType = "Contact",
            EntityId = contact.Id,
            ResponseStatus = "Sent",
            AddedUtc = DateTime.UtcNow.AddDays(-7)
        });

        await dbContext.SaveChangesAsync();

        var service = new MarketingService(dbContext);
        await service.RecomputeForOpportunityAsync(opportunity.Id);
        var recommendation = (await service.GetCampaignRecommendationsAsync(campaign.Id)).First();
        var decision = await service.ApplyRecommendationDecisionAsync(
            recommendation.Id,
            new CRM.Enterprise.Application.Marketing.RecommendationDecisionRequest("accept", "metrics run"),
            owner.Id);
        Assert.True(decision.Success);

        var metrics = await service.GetRecommendationPilotMetricsAsync();
        Assert.True(metrics.AcceptedCount >= 1);
        Assert.True(metrics.ActionTasksCreated >= 1);
        Assert.True(metrics.WindowEndUtc >= metrics.WindowStartUtc);
    }

    private static CrmDbContext CreateDbContext(out TestTenantProvider tenantProvider)
    {
        tenantProvider = new TestTenantProvider(Guid.Empty, "default");
        var options = new DbContextOptionsBuilder<CrmDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new CrmDbContext(options, tenantProvider);
    }

    private static (Tenant Tenant, User Owner, Account Account, OpportunityStage Stage, LeadStatus LeadStatus) SeedCoreData(
        CrmDbContext dbContext,
        TestTenantProvider tenantProvider)
    {
        var tenant = new Tenant
        {
            Key = "default",
            Name = "Default Workspace"
        };
        dbContext.Tenants.Add(tenant);

        tenantProvider.SetTenant(tenant.Id, tenant.Key);

        var owner = new User
        {
            TenantId = tenant.Id,
            FullName = "Owner User",
            Email = "owner@example.com"
        };
        dbContext.Users.Add(owner);

        var account = new Account
        {
            TenantId = tenant.Id,
            Name = "Acme Inc",
            OwnerId = owner.Id
        };
        dbContext.Accounts.Add(account);

        var stage = new OpportunityStage
        {
            TenantId = tenant.Id,
            Name = "Qualification",
            Order = 1
        };
        dbContext.OpportunityStages.Add(stage);

        var leadStatus = new LeadStatus
        {
            TenantId = tenant.Id,
            Name = "Qualified",
            Order = 1,
            IsDefault = true
        };
        dbContext.LeadStatuses.Add(leadStatus);

        return (tenant, owner, account, stage, leadStatus);
    }

    private sealed class TestTenantProvider : ITenantProvider
    {
        public TestTenantProvider(Guid tenantId, string tenantKey)
        {
            TenantId = tenantId;
            TenantKey = tenantKey;
        }

        public Guid TenantId { get; private set; }
        public string TenantKey { get; private set; }

        public void SetTenant(Guid tenantId, string tenantKey)
        {
            TenantId = tenantId;
            TenantKey = tenantKey;
        }
    }
}
