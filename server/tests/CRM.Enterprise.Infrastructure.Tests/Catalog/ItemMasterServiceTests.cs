using CRM.Enterprise.Application.Catalog;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Catalog;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CRM.Enterprise.Infrastructure.Tests.Catalog;

public class ItemMasterServiceTests
{
    [Fact]
    public async Task CreateAsync_RejectsDuplicateSku_ForTenant()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider, "default");

        dbContext.ItemMasters.Add(new ItemMaster
        {
            TenantId = tenant.Id,
            Sku = "SKU-001",
            Name = "Existing Item",
            IsActive = true
        });
        await dbContext.SaveChangesAsync();

        var service = new ItemMasterService(dbContext);

        await Assert.ThrowsAsync<InvalidOperationException>(() => service.CreateAsync(
            new ItemMasterUpsertRequest("sku-001", "Duplicate Item", null, null, null, true)));
    }

    [Fact]
    public async Task SearchAsync_ReturnsDerivedDefaultPrice_FromActivePriceList()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider, "default");

        var item = new ItemMaster
        {
            TenantId = tenant.Id,
            Sku = "SKU-PRC",
            Name = "Priced Item",
            IsActive = true
        };
        dbContext.ItemMasters.Add(item);

        var activePriceList = new PriceList
        {
            TenantId = tenant.Id,
            Name = "Standard Active",
            Currency = "USD",
            Status = "Active"
        };
        dbContext.PriceLists.Add(activePriceList);

        dbContext.PriceListItems.Add(new PriceListItem
        {
            TenantId = tenant.Id,
            PriceList = activePriceList,
            ItemMaster = item,
            UnitPrice = 129.99m,
            IsActive = true
        });

        await dbContext.SaveChangesAsync();

        var service = new ItemMasterService(dbContext);
        var result = await service.SearchAsync(new ItemMasterSearchRequest(null, null, true, 1, 25));

        var mapped = Assert.Single(result.Items);
        Assert.Equal(129.99m, mapped.DefaultUnitPrice);
        Assert.Equal("Standard Active", mapped.DefaultPriceListName);
    }

    [Fact]
    public async Task DeleteAsync_SoftDeletes_AndRemovesFromSearch()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenant = SeedTenant(dbContext, tenantProvider, "default");

        var item = new ItemMaster
        {
            TenantId = tenant.Id,
            Sku = "SKU-DEL",
            Name = "To Delete",
            IsActive = true
        };
        dbContext.ItemMasters.Add(item);
        await dbContext.SaveChangesAsync();

        var service = new ItemMasterService(dbContext);
        var deleted = await service.DeleteAsync(item.Id);
        Assert.True(deleted);

        var result = await service.SearchAsync(new ItemMasterSearchRequest(null, null, null, 1, 25));
        Assert.Empty(result.Items);
    }

    [Fact]
    public async Task SearchAsync_RespectsTenantIsolation()
    {
        using var dbContext = CreateDbContext(out var tenantProvider);
        var tenantA = SeedTenant(dbContext, tenantProvider, "default");
        dbContext.ItemMasters.Add(new ItemMaster
        {
            TenantId = tenantA.Id,
            Sku = "SKU-A",
            Name = "Tenant A Item",
            IsActive = true
        });
        await dbContext.SaveChangesAsync();

        var tenantB = new Tenant { Key = "other", Name = "Other" };
        dbContext.Tenants.Add(tenantB);
        await dbContext.SaveChangesAsync();

        tenantProvider.SetTenant(tenantB.Id, tenantB.Key);
        dbContext.ItemMasters.Add(new ItemMaster
        {
            TenantId = tenantB.Id,
            Sku = "SKU-B",
            Name = "Tenant B Item",
            IsActive = true
        });
        await dbContext.SaveChangesAsync();

        tenantProvider.SetTenant(tenantA.Id, tenantA.Key);
        var service = new ItemMasterService(dbContext);
        var result = await service.SearchAsync(new ItemMasterSearchRequest(null, null, null, 1, 25));

        var single = Assert.Single(result.Items);
        Assert.Equal("SKU-A", single.Sku);
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
            Name = $"{key}-tenant"
        };
        dbContext.Tenants.Add(tenant);
        dbContext.SaveChanges();
        tenantProvider.SetTenant(tenant.Id, key);
        return tenant;
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
