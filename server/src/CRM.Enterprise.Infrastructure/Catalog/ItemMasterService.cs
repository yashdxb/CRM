using CRM.Enterprise.Application.Catalog;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Catalog;

public sealed class ItemMasterService : IItemMasterService
{
    private readonly CrmDbContext _dbContext;

    public ItemMasterService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<ItemMasterDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.ItemMasters
            .AsNoTracking()
            .Where(item => !item.IsDeleted)
            .OrderBy(item => item.Name)
            .Select(item => new ItemMasterDto(
                item.Id,
                item.Sku,
                item.Name,
                item.Description,
                item.CategoryName,
                item.DefaultUom,
                item.IsActive))
            .ToListAsync(cancellationToken);
    }
}
