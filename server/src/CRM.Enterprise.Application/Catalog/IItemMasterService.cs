namespace CRM.Enterprise.Application.Catalog;

public interface IItemMasterService
{
    Task<ItemMasterSearchResponse> SearchAsync(ItemMasterSearchRequest request, CancellationToken cancellationToken = default);
    Task<ItemMasterDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ItemMasterDto> CreateAsync(ItemMasterUpsertRequest request, CancellationToken cancellationToken = default);
    Task<ItemMasterDto?> UpdateAsync(Guid id, ItemMasterUpsertRequest request, CancellationToken cancellationToken = default);
    Task<ItemMasterDto?> ToggleActiveAsync(Guid id, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
