using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Opportunities;
using CRM.Enterprise.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CRM.Enterprise.Infrastructure.Tests.Opportunities;

public class OpportunityStageNextStepTests
{
    [Fact]
    public async Task UpdateStageAsync_ReturnsError_WhenNextStepMissing()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider);
        var account = SeedAccount(dbContext, tenant.Id);
        var qualificationStage = SeedStage(dbContext, tenant.Id, "Qualification", 2);
        SeedStage(dbContext, tenant.Id, "Prospecting", 1);

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Test Opportunity",
            AccountId = account.Id,
            StageId = qualificationStage.Id,
            OwnerId = Guid.NewGuid(),
            Amount = 1200m,
            Currency = "USD",
            Probability = 35,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(5),
            IsClosed = false,
            IsWon = false
        };
        dbContext.Opportunities.Add(opportunity);
        await dbContext.SaveChangesAsync();

        var service = new OpportunityService(
            dbContext,
            tenantProvider,
            new FakeAuditEventService(),
            new NullMediator(),
            new FakeApprovalService());

        var result = await service.UpdateStageAsync(
            opportunity.Id,
            "Prospecting",
            new ActorContext(Guid.NewGuid(), "Tester"));

        Assert.False(result.Success);
        Assert.Equal("Next step is required before changing stage. Schedule an activity with a due date.", result.Error);
    }

    private static CrmDbContext CreateDbContext(out TestTenantProvider tenantProvider)
    {
        tenantProvider = new TestTenantProvider(Guid.Empty, "default");
        var options = new DbContextOptionsBuilder<CrmDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new CrmDbContext(options, tenantProvider);
    }

    private static Tenant SeedTenant(CrmDbContext dbContext, TestTenantProvider tenantProvider)
    {
        var tenant = new Tenant
        {
            Key = "default",
            Name = "Default"
        };
        dbContext.Tenants.Add(tenant);
        tenantProvider.SetTenant(tenant.Id, tenant.Key);
        return tenant;
    }

    private static Account SeedAccount(CrmDbContext dbContext, Guid tenantId)
    {
        var account = new Account
        {
            TenantId = tenantId,
            Name = "Test Account",
            OwnerId = Guid.NewGuid()
        };
        dbContext.Accounts.Add(account);
        return account;
    }

    private static OpportunityStage SeedStage(CrmDbContext dbContext, Guid tenantId, string name, int order)
    {
        var stage = new OpportunityStage
        {
            TenantId = tenantId,
            Name = name,
            Order = order
        };
        dbContext.OpportunityStages.Add(stage);
        return stage;
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

    private sealed class FakeAuditEventService : IAuditEventService
    {
        public Task TrackAsync(AuditEventEntry entry, CancellationToken cancellationToken = default) => Task.CompletedTask;
        public Task TrackManyAsync(IEnumerable<AuditEventEntry> entries, CancellationToken cancellationToken = default) => Task.CompletedTask;
    }

    private sealed class NullMediator : IMediator
    {
        public Task Publish(object notification, CancellationToken cancellationToken = default) => Task.CompletedTask;
        public Task Publish<TNotification>(TNotification notification, CancellationToken cancellationToken = default) where TNotification : INotification => Task.CompletedTask;
        public Task<TResponse> Send<TResponse>(IRequest<TResponse> request, CancellationToken cancellationToken = default) => Task.FromResult(default(TResponse)!);
        public Task<object?> Send(object request, CancellationToken cancellationToken = default) => Task.FromResult<object?>(null);
        public IAsyncEnumerable<TResponse> CreateStream<TResponse>(IStreamRequest<TResponse> request, CancellationToken cancellationToken = default)
        {
            return AsyncEnumerable.Empty<TResponse>();
        }

        public IAsyncEnumerable<object?> CreateStream(object request, CancellationToken cancellationToken = default)
        {
            return AsyncEnumerable.Empty<object?>();
        }
    }

    private sealed class FakeApprovalService : IOpportunityApprovalService
    {
        public Task<IReadOnlyList<OpportunityApprovalDto>?> GetForOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken = default)
        {
            return Task.FromResult<IReadOnlyList<OpportunityApprovalDto>?>(Array.Empty<OpportunityApprovalDto>());
        }

        public Task<IReadOnlyList<OpportunityApprovalInboxItemDto>> GetInboxAsync(string? status = null, string? purpose = null, CancellationToken cancellationToken = default)
        {
            return Task.FromResult<IReadOnlyList<OpportunityApprovalInboxItemDto>>(Array.Empty<OpportunityApprovalInboxItemDto>());
        }

        public Task<OpportunityOperationResult<OpportunityApprovalDto>> RequestAsync(Guid opportunityId, decimal amount, string currency, string purpose, ActorContext actor, CancellationToken cancellationToken = default)
        {
            return Task.FromResult(OpportunityOperationResult<OpportunityApprovalDto>.Fail("not used"));
        }

        public Task<OpportunityOperationResult<OpportunityApprovalDto>> DecideAsync(Guid approvalId, bool approved, string? notes, ActorContext actor, CancellationToken cancellationToken = default)
        {
            return Task.FromResult(OpportunityOperationResult<OpportunityApprovalDto>.Fail("not used"));
        }
    }
}
