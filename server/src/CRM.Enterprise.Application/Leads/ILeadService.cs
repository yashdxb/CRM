namespace CRM.Enterprise.Application.Leads;

public interface ILeadService
{
    Task<LeadSearchResultDto> SearchAsync(LeadSearchRequest request, CancellationToken cancellationToken = default);
    Task<LeadListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<LeadStatusHistoryDto>?> GetStatusHistoryAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<LeadAuditEventDto>?> GetAuditAsync(Guid id, CancellationToken cancellationToken = default);
    Task<LeadAiScoreResultDto?> ScoreAsync(Guid id, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<LeadListItemDto>> CreateAsync(LeadUpsertRequest request, LeadActor actor, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<bool>> UpdateAsync(Guid id, LeadUpsertRequest request, LeadActor actor, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<LeadConversionResultDto>> ConvertAsync(Guid id, LeadConversionRequest request, LeadActor actor, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<bool>> DeleteAsync(Guid id, LeadActor actor, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<bool>> UpdateOwnerAsync(Guid id, Guid ownerId, LeadActor actor, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<bool>> UpdateStatusAsync(Guid id, string status, LeadActor actor, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<int>> BulkAssignOwnerAsync(IReadOnlyCollection<Guid> ids, Guid ownerId, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<int>> BulkUpdateStatusAsync(IReadOnlyCollection<Guid> ids, string status, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<string>> GetEvidenceSourcesAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyList<LeadCadenceTouchDto>?> GetCadenceTouchesAsync(Guid id, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<LeadCadenceTouchDto>> LogCadenceTouchAsync(Guid id, LeadCadenceTouchRequest request, LeadActor actor, CancellationToken cancellationToken = default);
}
