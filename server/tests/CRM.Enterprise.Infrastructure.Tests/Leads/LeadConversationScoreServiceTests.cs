using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Leads;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CRM.Enterprise.Infrastructure.Tests.Leads;

public class LeadConversationScoreServiceTests
{
    [Fact]
    public async Task CalculateAsync_ReturnsUnavailable_WhenNoInteractionsExist()
    {
        using var dbContext = CreateDbContext(out var tenantId);
        var lead = SeedLead(dbContext, tenantId, "quiet@example.com");
        await dbContext.SaveChangesAsync();

        var service = new LeadConversationScoreService(dbContext);
        var snapshot = await service.CalculateAsync(lead);

        Assert.False(snapshot.SignalAvailable);
        Assert.Null(snapshot.Score);
        Assert.Contains("No email, call, meeting, or activity evidence", snapshot.Reasons[0], StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task CalculateAsync_ReturnsWeakScore_WhenOnlyOutboundActivityExists()
    {
        using var dbContext = CreateDbContext(out var tenantId);
        var lead = SeedLead(dbContext, tenantId, "outbound@example.com");
        dbContext.Activities.Add(new Activity
        {
            TenantId = tenantId,
            Subject = "Intro call attempt",
            Description = "Left voicemail and shared pricing deck.",
            Outcome = "Awaiting reply",
            Type = ActivityType.Call,
            RelatedEntityType = ActivityRelationType.Lead,
            RelatedEntityId = lead.Id,
            OwnerId = Guid.NewGuid(),
            CompletedDateUtc = DateTime.UtcNow.AddDays(-2),
            CreatedAtUtc = DateTime.UtcNow.AddDays(-2)
        });
        await dbContext.SaveChangesAsync();

        var service = new LeadConversationScoreService(dbContext);
        var snapshot = await service.CalculateAsync(lead);

        Assert.True(snapshot.SignalAvailable);
        Assert.NotNull(snapshot.Score);
        Assert.True(snapshot.Score <= 55);
        Assert.Contains(snapshot.Reasons, reason => reason.Contains("few touches", StringComparison.OrdinalIgnoreCase));
    }

    [Fact]
    public async Task CalculateAsync_ScoresBidirectionalMailboxConversation_HigherThanOutboundOnly()
    {
        using var dbContext = CreateDbContext(out var tenantId);
        var lead = SeedLead(dbContext, tenantId, "reply@example.com");

        dbContext.UserMailMessages.AddRange(
            new UserMailMessage
            {
                TenantId = tenantId,
                ConnectionId = Guid.NewGuid(),
                ExternalId = Guid.NewGuid().ToString("N"),
                Subject = "Re: Budget and timeline",
                BodyPreview = "Our budget is approved and we need to launch next quarter.",
                BodyText = "Budget is approved. We need a Q3 launch and our director is reviewing options.",
                FromEmail = lead.Email!,
                ToRecipientsJson = "[{\"email\":\"rep@example.com\",\"name\":\"Rep\"}]",
                Folder = MailFolder.Inbox,
                ReceivedAtUtc = DateTime.UtcNow.AddDays(-1),
                LastSyncAtUtc = DateTime.UtcNow
            },
            new UserMailMessage
            {
                TenantId = tenantId,
                ConnectionId = Guid.NewGuid(),
                ExternalId = Guid.NewGuid().ToString("N"),
                Subject = "Budget follow-up",
                BodyPreview = "Sharing pricing and next steps",
                BodyText = "Sending pricing and next steps for launch planning.",
                FromEmail = "rep@example.com",
                ToRecipientsJson = $"[{{\"email\":\"{lead.Email}\",\"name\":\"Lead\"}}]",
                Folder = MailFolder.Sent,
                ReceivedAtUtc = DateTime.UtcNow.AddDays(-2),
                SentAtUtc = DateTime.UtcNow.AddDays(-2),
                LastSyncAtUtc = DateTime.UtcNow
            });
        await dbContext.SaveChangesAsync();

        var service = new LeadConversationScoreService(dbContext);
        var snapshot = await service.CalculateAsync(lead);

        Assert.True(snapshot.SignalAvailable);
        Assert.True(snapshot.Score >= 45);
        Assert.Contains(snapshot.Reasons, reason => reason.Contains("Bidirectional engagement", StringComparison.OrdinalIgnoreCase));
        Assert.Contains(snapshot.Reasons, reason => reason.Contains("Buyer signals detected", StringComparison.OrdinalIgnoreCase));
    }

    [Fact]
    public async Task CalculateAsync_FlagsStalledConversation_WhenLastTouchIsOld()
    {
        using var dbContext = CreateDbContext(out var tenantId);
        var lead = SeedLead(dbContext, tenantId, "stalled@example.com");
        dbContext.Activities.Add(new Activity
        {
            TenantId = tenantId,
            Subject = "Old meeting",
            Description = "Discussed pain points and budget.",
            Outcome = "Need to revisit in a future quarter.",
            Type = ActivityType.Meeting,
            RelatedEntityType = ActivityRelationType.Lead,
            RelatedEntityId = lead.Id,
            OwnerId = Guid.NewGuid(),
            CompletedDateUtc = DateTime.UtcNow.AddDays(-45),
            CreatedAtUtc = DateTime.UtcNow.AddDays(-45)
        });
        await dbContext.SaveChangesAsync();

        var service = new LeadConversationScoreService(dbContext);
        var snapshot = await service.CalculateAsync(lead);

        Assert.True(snapshot.SignalAvailable);
        Assert.Contains(snapshot.Reasons, reason => reason.Contains("stalled", StringComparison.OrdinalIgnoreCase));
    }

    private static CrmDbContext CreateDbContext(out Guid tenantId)
    {
        tenantId = Guid.NewGuid();
        var tenantProvider = new TestTenantProvider(tenantId, "default");
        var options = new DbContextOptionsBuilder<CrmDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new CrmDbContext(options, tenantProvider);
    }

    private static Lead SeedLead(CrmDbContext dbContext, Guid tenantId, string email)
    {
        var lead = new Lead
        {
            TenantId = tenantId,
            FirstName = "Lead",
            LastName = "Example",
            Email = email,
            CompanyName = "North Edge",
            CreatedAtUtc = DateTime.UtcNow
        };
        dbContext.Leads.Add(lead);
        return lead;
    }

    private sealed class TestTenantProvider : CRM.Enterprise.Application.Tenants.ITenantProvider
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
