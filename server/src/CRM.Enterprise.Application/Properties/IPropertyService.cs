using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Properties;

public interface IPropertyService
{
    Task<PropertySearchResultDto> SearchAsync(PropertySearchRequest request, CancellationToken cancellationToken = default);
    Task<PropertyListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);
    Task<PropertyOperationResult<PropertyListItemDto>> CreateAsync(PropertyUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<PropertyOperationResult<bool>> UpdateAsync(Guid id, PropertyUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<PropertyOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default);
}
