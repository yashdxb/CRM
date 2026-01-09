namespace CRM.Enterprise.Application.Catalog;

public interface IItemMasterService
{
    Task<IReadOnlyList<ItemMasterDto>> GetAllAsync(CancellationToken cancellationToken = default);
}
