using System.Net;
using System.Net.Http.Json;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CRM.Enterprise.Api.Tests.Approvals;

public class OpportunityApprovalsControllerTests
{
    [Fact]
    public async Task RequestApproval_ReturnsPendingApproval()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default", "Sales Manager");
        var opportunity = SeedOpportunity(context, tenant.Id);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);

        var response = await client.PostAsJsonAsync(
            $"/api/opportunities/{opportunity.Id}/approvals",
            new { amount = 1200m, currency = "USD", purpose = "Close" });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var payload = await response.Content.ReadFromJsonAsync<ApprovalItem>();
        Assert.NotNull(payload);
        Assert.Equal("Pending", payload!.Status);
        Assert.Equal("Close", payload.Purpose);
        Assert.Equal(1200m, payload.Amount);
    }

    [Fact]
    public async Task DecideApproval_Approves_WhenUserIsApprover()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default", "Sales Manager");
        var opportunity = SeedOpportunity(context, tenant.Id);
        var approver = SeedUser(context, tenant.Id, "Approver");
        var role = SeedRole(context, tenant.Id, "Sales Manager");
        SeedUserRole(context, tenant.Id, approver.Id, role.Id);

        var approval = new OpportunityApproval
        {
            TenantId = tenant.Id,
            OpportunityId = opportunity.Id,
            ApproverRole = "Sales Manager",
            RequestedByUserId = SeedUser(context, tenant.Id, "Requester").Id,
            Status = "Pending",
            Purpose = "Close",
            Amount = 2000m,
            Currency = "USD",
            RequestedOn = DateTime.UtcNow.AddMinutes(-5)
        };
        context.OpportunityApprovals.Add(approval);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", approver.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", approver.FullName);

        var response = await client.PatchAsJsonAsync(
            $"/api/opportunity-approvals/{approval.Id}",
            new { approved = true, notes = "OK" });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var payload = await response.Content.ReadFromJsonAsync<ApprovalItem>();
        Assert.NotNull(payload);
        Assert.Equal("Approved", payload!.Status);
        Assert.Equal(approver.Id, payload.ApproverUserId);
        Assert.Equal("OK", payload.Notes);
    }

    [Fact]
    public async Task DecideApproval_ReturnsBadRequest_WhenUserIsNotApprover()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default", "Sales Manager");
        var opportunity = SeedOpportunity(context, tenant.Id);
        var approverRole = SeedRole(context, tenant.Id, "Sales Manager");
        var approverUser = SeedUser(context, tenant.Id, "Approver");
        SeedUserRole(context, tenant.Id, approverUser.Id, approverRole.Id);

        var nonApprover = SeedUser(context, tenant.Id, "Non Approver");

        var approval = new OpportunityApproval
        {
            TenantId = tenant.Id,
            OpportunityId = opportunity.Id,
            ApproverRole = "Sales Manager",
            RequestedByUserId = SeedUser(context, tenant.Id, "Requester").Id,
            Status = "Pending",
            Purpose = "Close",
            Amount = 1500m,
            Currency = "USD",
            RequestedOn = DateTime.UtcNow.AddMinutes(-3)
        };
        context.OpportunityApprovals.Add(approval);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", nonApprover.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", nonApprover.FullName);

        var response = await client.PatchAsJsonAsync(
            $"/api/opportunity-approvals/{approval.Id}",
            new { approved = true, notes = "Should fail" });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetApprovals_ReturnsOpportunityApprovals()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default", "Sales Manager");
        var opportunity = SeedOpportunity(context, tenant.Id);
        context.OpportunityApprovals.Add(new OpportunityApproval
        {
            TenantId = tenant.Id,
            OpportunityId = opportunity.Id,
            ApproverRole = "Sales Manager",
            RequestedByUserId = SeedUser(context, tenant.Id, "Requester").Id,
            Status = "Pending",
            Purpose = "Close",
            Amount = 500m,
            Currency = "USD",
            RequestedOn = DateTime.UtcNow
        });
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);

        var response = await client.GetAsync($"/api/opportunities/{opportunity.Id}/approvals");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var payload = await response.Content.ReadFromJsonAsync<List<ApprovalItem>>();
        Assert.NotNull(payload);
        Assert.Single(payload!);
        Assert.Equal("Pending", payload![0].Status);
    }

    private static Tenant SeedTenant(CrmDbContext context, string key, string? approverRole)
    {
        var tenant = new Tenant
        {
            Key = key,
            Name = "Default",
            ApprovalApproverRole = approverRole
        };
        context.Tenants.Add(tenant);
        return tenant;
    }

    private static Opportunity SeedOpportunity(CrmDbContext context, Guid tenantId)
    {
        var opportunity = new Opportunity
        {
            TenantId = tenantId,
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
        context.Opportunities.Add(opportunity);
        return opportunity;
    }

    private static User SeedUser(CrmDbContext context, Guid tenantId, string fullName)
    {
        var user = new User
        {
            TenantId = tenantId,
            FullName = fullName,
            Email = $"{Guid.NewGuid():N}@example.com"
        };
        context.Users.Add(user);
        return user;
    }

    private static Role SeedRole(CrmDbContext context, Guid tenantId, string name)
    {
        var role = new Role
        {
            TenantId = tenantId,
            Name = name
        };
        context.Roles.Add(role);
        return role;
    }

    private static void SeedUserRole(CrmDbContext context, Guid tenantId, Guid userId, Guid roleId)
    {
        context.UserRoles.Add(new UserRole
        {
            TenantId = tenantId,
            UserId = userId,
            RoleId = roleId
        });
    }

    private sealed class ApprovalItem
    {
        public Guid Id { get; set; }
        public Guid OpportunityId { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Purpose { get; set; } = string.Empty;
        public string ApproverRole { get; set; } = string.Empty;
        public Guid? ApproverUserId { get; set; }
        public string? ApproverName { get; set; }
        public Guid? RequestedByUserId { get; set; }
        public string? RequestedByName { get; set; }
        public DateTime RequestedOn { get; set; }
        public DateTime? DecisionOn { get; set; }
        public string? Notes { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
    }
}
