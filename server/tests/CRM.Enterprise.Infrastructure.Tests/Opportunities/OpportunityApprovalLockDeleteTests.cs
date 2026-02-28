using CRM.Enterprise.Application.Activities;
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

public class OpportunityApprovalLockDeleteTests
{
    [Fact]
    public async Task DeleteAsync_ReturnsError_WhenRequesterHasPendingApproval()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider);
        var account = SeedAccount(dbContext, tenant.Id);
        var stage = SeedStage(dbContext, tenant.Id, "Prospecting", 1);
        var requesterId = Guid.NewGuid();

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Delete lock test",
            AccountId = account.Id,
            StageId = stage.Id,
            OwnerId = requesterId,
            Amount = 5000m,
            Currency = "USD",
            Probability = 25,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(30),
            IsClosed = false,
            IsWon = false
        };
        dbContext.Opportunities.Add(opportunity);
        dbContext.OpportunityApprovals.Add(new OpportunityApproval
        {
            TenantId = tenant.Id,
            OpportunityId = opportunity.Id,
            RequestedByUserId = requesterId,
            Status = "Pending",
            Purpose = "Discount",
            ApproverRole = "Sales Manager",
            Amount = 900,
            Currency = "USD",
            RequestedOn = DateTime.UtcNow
        });
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider);

        var result = await service.DeleteAsync(opportunity.Id, new ActorContext(requesterId, "Leo Martin"));

        Assert.False(result.Success);
        Assert.Equal("Deal is locked while approval is pending.", result.Error);
        var persisted = await dbContext.Opportunities.AsNoTracking().SingleAsync(o => o.Id == opportunity.Id);
        Assert.False(persisted.IsDeleted);
    }

    [Fact]
    public async Task DeleteAsync_ReturnsError_ForManager_WhenAnyPendingApprovalExists()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider);
        var account = SeedAccount(dbContext, tenant.Id);
        var stage = SeedStage(dbContext, tenant.Id, "Prospecting", 1);
        var managerId = Guid.NewGuid();

        var opportunity = new Opportunity
        {
            TenantId = tenant.Id,
            Name = "Manager bypass test",
            AccountId = account.Id,
            StageId = stage.Id,
            OwnerId = managerId,
            Amount = 7000m,
            Currency = "USD",
            Probability = 30,
            ExpectedCloseDate = DateTime.UtcNow.AddDays(45),
            IsClosed = false,
            IsWon = false
        };
        dbContext.Opportunities.Add(opportunity);
        dbContext.OpportunityApprovals.Add(new OpportunityApproval
        {
            TenantId = tenant.Id,
            OpportunityId = opportunity.Id,
            RequestedByUserId = managerId,
            Status = "Pending",
            Purpose = "Close",
            ApproverRole = "Sales Manager",
            Amount = 7000m,
            Currency = "USD",
            RequestedOn = DateTime.UtcNow
        });

        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider);

        var result = await service.DeleteAsync(opportunity.Id, new ActorContext(managerId, "Ava Chen"));

        Assert.False(result.Success);
        Assert.Equal("Deal is locked while approval is pending.", result.Error);
        var persisted = await dbContext.Opportunities.AsNoTracking().SingleAsync(o => o.Id == opportunity.Id);
        Assert.False(persisted.IsDeleted);
    }

    private static OpportunityService CreateService(CrmDbContext dbContext, TestTenantProvider tenantProvider)
    {
        return new OpportunityService(
            dbContext,
            tenantProvider,
            new FakeAuditEventService(),
            new NullMediator(),
            new FakeApprovalService(),
            new FakeActivityService(),
            new FakeRealtimePublisher());
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
            => AsyncEnumerable.Empty<TResponse>();
        public IAsyncEnumerable<object?> CreateStream(object request, CancellationToken cancellationToken = default)
            => AsyncEnumerable.Empty<object?>();
    }

    private sealed class FakeApprovalService : IOpportunityApprovalService
    {
        public Task<IReadOnlyList<OpportunityApprovalDto>?> GetForOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken = default)
            => Task.FromResult<IReadOnlyList<OpportunityApprovalDto>?>(Array.Empty<OpportunityApprovalDto>());

        public Task<IReadOnlyList<OpportunityApprovalInboxItemDto>> GetInboxAsync(string? status = null, string? purpose = null, CancellationToken cancellationToken = default)
            => Task.FromResult<IReadOnlyList<OpportunityApprovalInboxItemDto>>(Array.Empty<OpportunityApprovalInboxItemDto>());

        public Task<OpportunityOperationResult<OpportunityApprovalDto>> RequestAsync(Guid opportunityId, decimal amount, string currency, string purpose, ActorContext actor, CancellationToken cancellationToken = default)
            => Task.FromResult(OpportunityOperationResult<OpportunityApprovalDto>.Fail("not used"));

        public Task<OpportunityOperationResult<OpportunityApprovalDto>> DecideAsync(Guid approvalId, bool approved, string? notes, ActorContext actor, bool syncDecisionRequest = true, CancellationToken cancellationToken = default)
            => Task.FromResult(OpportunityOperationResult<OpportunityApprovalDto>.Fail("not used"));

        public Task ProjectLinkedDecisionProgressionAsync(Guid decisionRequestId, int actedStepOrder, bool approved, string? notes, ActorContext actor, CancellationToken cancellationToken = default)
            => Task.CompletedTask;
    }

    private sealed class FakeActivityService : IActivityService
    {
        public Task<ActivitySearchResultDto> SearchAsync(ActivitySearchRequest request, CancellationToken cancellationToken = default)
            => Task.FromResult(new ActivitySearchResultDto(Array.Empty<ActivityListItemDto>(), 0));

        public Task<ActivityListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
            => Task.FromResult<ActivityListItemDto?>(null);

        public Task<IReadOnlyList<ActivityAuditEventDto>?> GetAuditAsync(Guid id, CancellationToken cancellationToken = default)
            => Task.FromResult<IReadOnlyList<ActivityAuditEventDto>?>(Array.Empty<ActivityAuditEventDto>());

        public Task<ActivityOperationResult<ActivityListItemDto>> CreateAsync(ActivityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
            => Task.FromResult(ActivityOperationResult<ActivityListItemDto>.Fail("not used"));

        public Task<ActivityOperationResult<bool>> UpdateAsync(Guid id, ActivityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
            => Task.FromResult(ActivityOperationResult<bool>.Fail("not used"));

        public Task<ActivityOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
            => Task.FromResult(ActivityOperationResult<bool>.Fail("not used"));
    }

    private sealed class FakeRealtimePublisher : ICrmRealtimePublisher
    {
        public Task PublishTenantEventAsync(Guid tenantId, string eventType, object payload, CancellationToken cancellationToken = default)
            => Task.CompletedTask;

        public Task PublishUserEventAsync(Guid tenantId, Guid userId, string eventType, object payload, CancellationToken cancellationToken = default)
            => Task.CompletedTask;

        public Task PublishUsersEventAsync(Guid tenantId, IEnumerable<Guid> userIds, string eventType, object payload, CancellationToken cancellationToken = default)
            => Task.CompletedTask;
    }
}
