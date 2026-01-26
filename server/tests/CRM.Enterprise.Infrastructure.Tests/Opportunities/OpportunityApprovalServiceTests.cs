using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Approvals;
using CRM.Enterprise.Infrastructure.Opportunities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Xunit;

namespace CRM.Enterprise.Infrastructure.Tests.Opportunities;

public class OpportunityApprovalServiceTests
{
    [Fact]
    public async Task RequestAsync_CreatesPendingApproval()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        SeedTenant(dbContext, tenantProvider, "Sales Manager");
        var opportunityId = SeedOpportunity(dbContext);
        var requesterId = SeedUser(dbContext, "Requester");
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider);
        var result = await service.RequestAsync(
            opportunityId,
            1500m,
            "USD",
            " ",
            new ActorContext(requesterId, "Requester"));

        Assert.True(result.Success);
        Assert.NotNull(result.Value);
        Assert.Equal("Pending", result.Value!.Status);
        Assert.Equal("Close", result.Value.Purpose);
        Assert.Equal(1500m, result.Value.Amount);
        Assert.Equal("USD", result.Value.Currency);
        Assert.Equal(1, await dbContext.OpportunityApprovals.CountAsync());

        var repeat = await service.RequestAsync(
            opportunityId,
            1500m,
            "USD",
            "Close",
            new ActorContext(requesterId, "Requester"));

        Assert.True(repeat.Success);
        Assert.NotNull(repeat.Value);
        Assert.Equal(result.Value!.Id, repeat.Value!.Id);
        Assert.Equal(1, await dbContext.OpportunityApprovals.CountAsync());
    }

    [Fact]
    public async Task DecideAsync_Approves_WhenActorHasApproverRole()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        SeedTenant(dbContext, tenantProvider, "Sales Manager");
        var opportunityId = SeedOpportunity(dbContext);
        var approverId = SeedUser(dbContext, "Approver");
        var roleId = SeedRole(dbContext, "Sales Manager");
        SeedUserRole(dbContext, approverId, roleId);

        var approval = new OpportunityApproval
        {
            OpportunityId = opportunityId,
            ApproverRole = "Sales Manager",
            RequestedByUserId = SeedUser(dbContext, "Requester"),
            Status = "Pending",
            Purpose = "Close",
            Amount = 2000m,
            Currency = "USD",
            RequestedOn = DateTime.UtcNow.AddMinutes(-10)
        };
        dbContext.OpportunityApprovals.Add(approval);
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider);
        var result = await service.DecideAsync(
            approval.Id,
            true,
            "Approved",
            new ActorContext(approverId, "Approver"));

        Assert.True(result.Success);
        Assert.NotNull(result.Value);
        Assert.Equal("Approved", result.Value!.Status);
        Assert.Equal(approverId, result.Value.ApproverUserId);
        Assert.NotNull(result.Value.DecisionOn);
        Assert.Equal("Approved", result.Value.Notes);
    }

    [Fact]
    public async Task DecideAsync_Rejects_WhenActorHasApproverRole()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        SeedTenant(dbContext, tenantProvider, "Sales Manager");
        var opportunityId = SeedOpportunity(dbContext);
        var approverId = SeedUser(dbContext, "Approver");
        var roleId = SeedRole(dbContext, "Sales Manager");
        SeedUserRole(dbContext, approverId, roleId);

        var approval = new OpportunityApproval
        {
            OpportunityId = opportunityId,
            ApproverRole = "Sales Manager",
            RequestedByUserId = SeedUser(dbContext, "Requester"),
            Status = "Pending",
            Purpose = "Discount",
            Amount = 250m,
            Currency = "USD",
            RequestedOn = DateTime.UtcNow.AddMinutes(-5)
        };
        dbContext.OpportunityApprovals.Add(approval);
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider);
        var result = await service.DecideAsync(
            approval.Id,
            false,
            "Not approved",
            new ActorContext(approverId, "Approver"));

        Assert.True(result.Success);
        Assert.NotNull(result.Value);
        Assert.Equal("Rejected", result.Value!.Status);
        Assert.Equal(approverId, result.Value.ApproverUserId);
        Assert.NotNull(result.Value.DecisionOn);
        Assert.Equal("Not approved", result.Value.Notes);
    }

    [Fact]
    public async Task RequestAsync_ReturnsError_WhenApproverRoleMissing()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        SeedTenant(dbContext, tenantProvider, null);
        var opportunityId = SeedOpportunity(dbContext);
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider);
        var result = await service.RequestAsync(
            opportunityId,
            1000m,
            "USD",
            "Close",
            new ActorContext(Guid.NewGuid(), "Requester"));

        Assert.False(result.Success);
        Assert.Equal("Approval role must be configured before requesting approval.", result.Error);
    }

    private static OpportunityApprovalService CreateService(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        var auditService = new FakeAuditEventService();
        var queueOptions = Options.Create(new ApprovalQueueOptions
        {
            Enabled = false,
            QueueName = "approvals"
        });
        var queue = new ServiceBusApprovalQueue(null, queueOptions);
        return new OpportunityApprovalService(dbContext, tenantProvider, auditService, queue);
    }

    private static CrmDbContext CreateDbContext(out TestTenantProvider tenantProvider)
    {
        tenantProvider = new TestTenantProvider(Guid.Empty, "default");
        var options = new DbContextOptionsBuilder<CrmDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new CrmDbContext(options, tenantProvider);
    }

    private static Guid SeedTenant(CrmDbContext dbContext, TestTenantProvider tenantProvider, string? approverRole)
    {
        var tenant = new Tenant
        {
            Key = "default",
            Name = "Default",
            ApprovalApproverRole = approverRole
        };
        dbContext.Tenants.Add(tenant);
        tenantProvider.SetTenant(tenant.Id, tenant.Key);
        return tenant.Id;
    }

    private static Guid SeedOpportunity(CrmDbContext dbContext)
    {
        var opportunity = new Opportunity
        {
            Name = "Test Opportunity",
            AccountId = Guid.NewGuid(),
            StageId = Guid.NewGuid(),
            OwnerId = Guid.NewGuid(),
            Amount = 1000m,
            Currency = "USD",
            Probability = 0.5m,
            IsClosed = false,
            IsWon = false
        };
        dbContext.Opportunities.Add(opportunity);
        return opportunity.Id;
    }

    private static Guid SeedUser(CrmDbContext dbContext, string fullName)
    {
        var user = new User
        {
            FullName = fullName,
            Email = $"{Guid.NewGuid():N}@example.com"
        };
        dbContext.Users.Add(user);
        return user.Id;
    }

    private static Guid SeedRole(CrmDbContext dbContext, string name)
    {
        var role = new Role
        {
            Name = name
        };
        dbContext.Roles.Add(role);
        return role.Id;
    }

    private static void SeedUserRole(CrmDbContext dbContext, Guid userId, Guid roleId)
    {
        dbContext.UserRoles.Add(new UserRole
        {
            UserId = userId,
            RoleId = roleId
        });
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
        public Task TrackAsync(AuditEventEntry entry, CancellationToken cancellationToken = default)
        {
            return Task.CompletedTask;
        }

        public Task TrackManyAsync(IEnumerable<AuditEventEntry> entries, CancellationToken cancellationToken = default)
        {
            return Task.CompletedTask;
        }
    }
}
