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

    // ── Timeline ──
    Task<IReadOnlyList<PropertyTimelineEventDto>> GetTimelineAsync(Guid propertyId, CancellationToken ct = default);

    // ── Photos ──
    Task<PropertyOperationResult<PropertyDocumentDto>> RegisterPhotoAsync(Guid propertyId, RegisterPropertyPhotoRequest request, ActorContext actor, CancellationToken ct = default);

    // ── Alerts ──
    Task<IReadOnlyList<PropertyAlertRuleDto>> GetAlertRulesAsync(Guid propertyId, CancellationToken ct = default);
    Task<PropertyOperationResult<PropertyAlertRuleDto>> CreateAlertRuleAsync(Guid propertyId, CreatePropertyAlertRuleRequest request, ActorContext actor, CancellationToken ct = default);
    Task<PropertyOperationResult<PropertyAlertRuleDto>> ToggleAlertRuleAsync(Guid propertyId, Guid ruleId, TogglePropertyAlertRuleRequest request, ActorContext actor, CancellationToken ct = default);
    Task<IReadOnlyList<PropertyAlertNotificationDto>> GetAlertNotificationsAsync(Guid propertyId, CancellationToken ct = default);

    // ── CMA (G3) ──
    Task<CmaReportDto> GetCmaReportAsync(Guid propertyId, CancellationToken ct = default);
    Task<CmaReportDto> GenerateCmaReportAsync(Guid propertyId, GenerateCmaRequest request, ActorContext actor, CancellationToken ct = default);

    // ── E-Signature (G4) ──
    Task<IReadOnlyList<SignatureRequestDto>> GetSignatureRequestsAsync(Guid propertyId, CancellationToken ct = default);
    Task<PropertyOperationResult<SignatureRequestDto>> CreateSignatureRequestAsync(Guid propertyId, CreateSignatureRequestRequest request, ActorContext actor, CancellationToken ct = default);
}
