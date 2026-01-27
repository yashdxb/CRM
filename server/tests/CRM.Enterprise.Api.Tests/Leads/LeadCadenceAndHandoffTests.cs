using System.Net;
using System.Net.Http.Json;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CRM.Enterprise.Api.Tests.Leads;

public class LeadCadenceAndHandoffTests
{
    [Fact]
    public async Task UpdateLead_ToQualified_Fails_WhenNoMeetingLogged()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default");
        var owner = SeedUser(context, tenant.Id, "Owner");
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", owner.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", owner.FullName);

        var created = await client.PostAsJsonAsync("/api/leads", new
        {
            firstName = "Sam",
            lastName = "Rep",
            companyName = "Acme",
            status = "New",
            ownerId = owner.Id,
            assignmentStrategy = "Manual",
            score = 10
        });
        created.EnsureSuccessStatusCode();
        var lead = await created.Content.ReadFromJsonAsync<LeadItem>();
        Assert.NotNull(lead);

        var response = await client.PutAsJsonAsync($"/api/leads/{lead!.Id}", new
        {
            firstName = "Sam",
            lastName = "Rep",
            companyName = "Acme",
            status = "Qualified",
            ownerId = owner.Id,
            assignmentStrategy = "Manual",
            score = 10,
            qualifiedNotes = "Good fit and budget confirmed."
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var message = await response.Content.ReadAsStringAsync();
        Assert.Contains("discovery meeting", message, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task LogCadenceTouch_CreatesTouchAndNextStepTask()
    {
        using var factory = new TestWebApplicationFactory();
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();

        var tenant = SeedTenant(context, "default");
        var owner = SeedUser(context, tenant.Id, "Owner");
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", tenant.Key);
        client.DefaultRequestHeaders.Add("X-Test-UserId", owner.Id.ToString());
        client.DefaultRequestHeaders.Add("X-Test-UserName", owner.FullName);

        var created = await client.PostAsJsonAsync("/api/leads", new
        {
            firstName = "Taylor",
            lastName = "SDR",
            companyName = "Northwind",
            status = "Contacted",
            ownerId = owner.Id,
            assignmentStrategy = "Manual",
            score = 20
        });
        created.EnsureSuccessStatusCode();
        var lead = await created.Content.ReadFromJsonAsync<LeadItem>();
        Assert.NotNull(lead);

        var nextStepDueAtUtc = DateTime.UtcNow.AddDays(2);
        var touchResponse = await client.PostAsJsonAsync($"/api/leads/{lead!.Id}/cadence-touch", new
        {
            channel = "Call",
            outcome = "Connected and booked discovery",
            nextStepDueAtUtc
        });

        Assert.Equal(HttpStatusCode.OK, touchResponse.StatusCode);

        var activities = await context.Activities
            .IgnoreQueryFilters()
            .Where(a => a.RelatedEntityType == ActivityRelationType.Lead && a.RelatedEntityId == lead.Id)
            .OrderByDescending(a => a.CreatedAtUtc)
            .ToListAsync();

        Assert.Contains(activities, a => a.Subject.StartsWith("Cadence Call", StringComparison.OrdinalIgnoreCase));
        Assert.Contains(activities, a => a.Subject.StartsWith("Follow-up", StringComparison.OrdinalIgnoreCase));
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

    private sealed record LeadItem(Guid Id, string Name);
}

