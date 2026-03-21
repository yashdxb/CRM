using System.Collections.Generic;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Auth;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Auth;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Xunit;

namespace CRM.Enterprise.Infrastructure.Tests.Auth;

public class AuthServiceTests
{
    [Fact]
    public async Task SignInWithEntraIdTokenAsync_SignsInBoundUser()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider, "default");
        var user = SeedUser(dbContext, tenant.Id, "bound@example.com");
        user.EntraObjectId = "entra-oid-1";
        user.EntraTenantId = "entra-tid-1";
        user.EntraUpn = "bound@example.com";
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider, new FakeEntraTokenValidator(
            new EntraIdentity("entra-oid-1", "entra-tid-1", "bound@example.com", "Bound User", "bound@example.com", [])));

        var result = await service.SignInWithEntraIdTokenAsync("valid-id-token");

        Assert.NotNull(result.AuthResult);
        Assert.Null(result.FailureCode);
        Assert.Equal("bound@example.com", result.AuthResult!.Email);
        Assert.Equal("entra-oid-1", user.EntraObjectId);
    }

    [Fact]
    public async Task SignInWithEntraIdTokenAsync_BindsSingleEmailMatchOnFirstLogin()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider, "default");
        var user = SeedUser(dbContext, tenant.Id, "firstbind@example.com");
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider, new FakeEntraTokenValidator(
            new EntraIdentity("entra-oid-2", "entra-tid-2", "firstbind@example.com", "First Bind", "firstbind@example.com", [])));

        var result = await service.SignInWithEntraIdTokenAsync("valid-id-token");

        Assert.NotNull(result.AuthResult);
        Assert.Equal("entra-oid-2", user.EntraObjectId);
        Assert.Equal("entra-tid-2", user.EntraTenantId);
        Assert.Equal("firstbind@example.com", user.EntraUpn);
    }

    [Fact]
    public async Task SignInWithEntraIdTokenAsync_RejectsDuplicateEmailMatches()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider, "default");
        SeedUser(dbContext, tenant.Id, "duplicate@example.com");
        SeedUser(dbContext, tenant.Id, "duplicate@example.com");
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider, new FakeEntraTokenValidator(
            new EntraIdentity("entra-oid-3", "entra-tid-3", "duplicate@example.com", "Duplicate", "duplicate@example.com", [])));

        var result = await service.SignInWithEntraIdTokenAsync("valid-id-token");

        Assert.Null(result.AuthResult);
        Assert.Equal("email_conflict", result.FailureCode);
    }

    [Fact]
    public async Task SignInWithEntraIdTokenAsync_RejectsWhenTenantDoesNotMatchBoundUser()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenantA = SeedTenant(dbContext, tenantProvider, "default");
        var tenantB = new Tenant { Key = "other", Name = "Other" };
        dbContext.Tenants.Add(tenantB);
        var user = SeedUser(dbContext, tenantA.Id, "tenantmismatch@example.com");
        user.EntraObjectId = "entra-oid-4";
        user.EntraTenantId = "entra-tid-4";
        tenantProvider.SetTenant(tenantB.Id, tenantB.Key);
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider, new FakeEntraTokenValidator(
            new EntraIdentity("entra-oid-4", "entra-tid-4", "tenantmismatch@example.com", "Mismatch", "tenantmismatch@example.com", [])));

        var result = await service.SignInWithEntraIdTokenAsync("valid-id-token");

        Assert.Null(result.AuthResult);
        Assert.Equal("tenant_mismatch", result.FailureCode);
    }

    [Fact]
    public async Task SignInWithEntraIdTokenAsync_RejectsExternalAudience()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider, "default");
        var user = SeedUser(dbContext, tenant.Id, "external@example.com");
        user.Audience = UserAudience.External;
        await dbContext.SaveChangesAsync();

        var service = CreateService(dbContext, tenantProvider, new FakeEntraTokenValidator(
            new EntraIdentity("entra-oid-5", "entra-tid-5", "external@example.com", "External", "external@example.com", [])));

        var result = await service.SignInWithEntraIdTokenAsync("valid-id-token");

        Assert.Null(result.AuthResult);
        Assert.Equal("external_audience_blocked", result.FailureCode);
    }

    [Fact]
    public async Task SignInAsync_StillWorksAfterEntraBinding()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var passwordHasher = new PasswordHasher<User>();
        var tenant = SeedTenant(dbContext, tenantProvider, "default");
        var user = SeedUser(dbContext, tenant.Id, "fallback@example.com");
        user.PasswordHash = passwordHasher.HashPassword(user, "Fallback123!");
        user.EntraObjectId = "entra-oid-6";
        user.EntraTenantId = "entra-tid-6";
        await dbContext.SaveChangesAsync();

        var service = CreateService(
            dbContext,
            tenantProvider,
            new FakeEntraTokenValidator(null),
            passwordHasher);

        var result = await service.SignInAsync("fallback@example.com", "Fallback123!");

        Assert.NotNull(result);
        Assert.Equal("fallback@example.com", result!.Email);
    }

    private static AuthService CreateService(
        CrmDbContext dbContext,
        TestTenantProvider tenantProvider,
        IEntraTokenValidator entraTokenValidator,
        IPasswordHasher<User>? passwordHasher = null)
    {
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Tenant:DefaultKey"] = "default",
                ["Jwt:Key"] = "test-key-test-key-test-key-test-key",
                ["Jwt:Issuer"] = "test-issuer",
                ["Jwt:Audience"] = "test-audience",
                ["Jwt:ExpiresMinutes"] = "60",
                ["EntraId:Enabled"] = "true",
                ["EntraId:ClientId"] = "client-id",
                ["EntraId:TenantId"] = "organizations",
                ["EntraId:LocalLoginEnabled"] = "true"
            })
            .Build();

        var loginLocationService = new LoginLocationService(
            new HttpContextAccessor(),
            new HttpClient(),
            NullLogger<LoginLocationService>.Instance);

        return new AuthService(
            dbContext,
            passwordHasher ?? new PasswordHasher<User>(),
            Options.Create(new JwtOptions
            {
                Key = "test-key-test-key-test-key-test-key",
                Issuer = "test-issuer",
                Audience = "test-audience",
                ExpiresMinutes = 60
            }),
            tenantProvider,
            configuration,
            loginLocationService,
            entraTokenValidator,
            new FakeAuditEventService(),
            new ServiceCollection().BuildServiceProvider().GetRequiredService<IServiceScopeFactory>(),
            NullLogger<AuthService>.Instance);
    }

    private static CrmDbContext CreateDbContext(out TestTenantProvider tenantProvider)
    {
        tenantProvider = new TestTenantProvider(Guid.Empty, "default");
        var options = new DbContextOptionsBuilder<CrmDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new CrmDbContext(options, tenantProvider);
    }

    private static Tenant SeedTenant(CrmDbContext dbContext, TestTenantProvider tenantProvider, string key)
    {
        var tenant = new Tenant
        {
            Key = key,
            Name = key
        };
        dbContext.Tenants.Add(tenant);
        tenantProvider.SetTenant(tenant.Id, tenant.Key);
        return tenant;
    }

    private static User SeedUser(CrmDbContext dbContext, Guid tenantId, string email)
    {
        var user = new User
        {
            TenantId = tenantId,
            FullName = email,
            Email = email,
            EmailNormalized = email.ToLowerInvariant(),
            PasswordHash = "placeholder",
            MustChangePassword = false
        };
        dbContext.Users.Add(user);
        return user;
    }

    private sealed class FakeEntraTokenValidator : IEntraTokenValidator
    {
        private readonly EntraIdentity? _identity;

        public FakeEntraTokenValidator(EntraIdentity? identity)
        {
            _identity = identity;
        }

        public Task<EntraIdentity?> ValidateIdTokenAsync(string idToken, CancellationToken cancellationToken = default)
        {
            return Task.FromResult(_identity);
        }
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
}
