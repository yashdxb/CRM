using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace CRM.Enterprise.Api.Tests.Auth;

public class AuthControllerTests
{
    [Fact]
    public async Task GetPublicAuthConfig_ReturnsTenantAwareEntraSettings()
    {
        using var factory = new TestWebApplicationFactory().WithWebHostBuilder(builder =>
        {
            builder.ConfigureAppConfiguration((_, config) =>
            {
                config.AddInMemoryCollection(new Dictionary<string, string?>
                {
                    ["EntraId:Enabled"] = "true",
                    ["EntraId:ClientId"] = "entra-client-id",
                    ["EntraId:Authority"] = "https://login.microsoftonline.com/organizations",
                    ["EntraId:LocalLoginEnabled"] = "true"
                });
            });
        });
        var client = factory.CreateClient();
        var context = factory.Services.GetRequiredService<CrmDbContext>();
        var tenant = new Tenant
        {
            Key = "default",
            Name = "Default",
            FeatureFlagsJson = JsonSerializer.Serialize(new Dictionary<string, bool>
            {
                ["auth.entra"] = true
            })
        };
        context.Tenants.Add(tenant);
        await context.SaveChangesAsync();

        client.DefaultRequestHeaders.Add("X-Tenant-Key", "default");
        client.DefaultRequestHeaders.Add("Origin", "https://crm.northedgesystem.com");

        var response = await client.GetAsync("/api/auth/config");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var payload = await response.Content.ReadFromJsonAsync<PublicAuthConfigPayload>();
        Assert.NotNull(payload);
        Assert.True(payload!.LocalLoginEnabled);
        Assert.True(payload.Entra.Enabled);
        Assert.Equal("entra-client-id", payload.Entra.ClientId);
        Assert.Equal("https://crm.northedgesystem.com/login", payload.Entra.RedirectUri);
    }

    private sealed record PublicAuthConfigPayload(bool LocalLoginEnabled, PublicEntraAuthConfigPayload Entra);
    private sealed record PublicEntraAuthConfigPayload(bool Enabled, string ClientId, string Authority, string RedirectUri);
}
