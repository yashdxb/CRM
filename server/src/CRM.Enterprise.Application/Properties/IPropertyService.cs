using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Properties;

public interface IPropertyService
{
    Task<PropertySearchResultDto> SearchAsync(PropertySearchRequest request, CancellationToken cancellationToken = default);
    Task<PropertyListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);
    Task<PropertyOperationResult<PropertyListItemDto>> CreateAsync(PropertyUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<PropertyOperationResult<bool>> UpdateAsync(Guid id, PropertyUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<PropertyOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default);

    // ── Showings ──
    Task<IReadOnlyList<ShowingDto>> GetShowingsAsync(Guid propertyId, CancellationToken ct = default);
    Task<PropertyOperationResult<ShowingDto>> CreateShowingAsync(Guid propertyId, CreateShowingRequest request, ActorContext actor, CancellationToken ct = default);
    Task<PropertyOperationResult<ShowingDto>> UpdateShowingAsync(Guid propertyId, Guid showingId, UpdateShowingRequest request, ActorContext actor, CancellationToken ct = default);

    // ── Documents ──
    Task<IReadOnlyList<PropertyDocumentDto>> GetDocumentsAsync(Guid propertyId, CancellationToken ct = default);
    Task<PropertyOperationResult<PropertyDocumentDto>> CreateDocumentAsync(Guid propertyId, CreateDocumentRequest request, ActorContext actor, CancellationToken ct = default);
    Task<PropertyOperationResult<bool>> DeleteDocumentAsync(Guid propertyId, Guid documentId, ActorContext actor, CancellationToken ct = default);

    // ── Activities ──
    Task<IReadOnlyList<PropertyActivityDto>> GetActivitiesAsync(Guid propertyId, CancellationToken ct = default);
    Task<PropertyOperationResult<PropertyActivityDto>> CreateActivityAsync(Guid propertyId, CreatePropertyActivityRequest request, ActorContext actor, CancellationToken ct = default);
    Task<PropertyOperationResult<PropertyActivityDto>> UpdateActivityAsync(Guid propertyId, Guid activityId, UpdatePropertyActivityRequest request, ActorContext actor, CancellationToken ct = default);

    // ── Price History ──
    Task<IReadOnlyList<PriceChangeDto>> GetPriceHistoryAsync(Guid propertyId, CancellationToken ct = default);
    Task<PropertyOperationResult<PriceChangeDto>> AddPriceChangeAsync(Guid propertyId, AddPriceChangeRequest request, ActorContext actor, CancellationToken ct = default);
}
