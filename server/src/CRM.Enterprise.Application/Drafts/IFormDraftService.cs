namespace CRM.Enterprise.Application.Drafts;

public interface IFormDraftService
{
    Task<FormDraftListResultDto> GetListAsync(Guid ownerUserId, string entityType, int limit, int page, int pageSize, CancellationToken cancellationToken = default);
    Task<FormDraftDetailDto?> GetAsync(Guid id, Guid ownerUserId, CancellationToken cancellationToken = default);
    Task<FormDraftDetailDto> SaveAsync(FormDraftSaveRequest request, Guid ownerUserId, string? ownerUserName, CancellationToken cancellationToken = default);
    Task<bool> CompleteAsync(Guid id, Guid ownerUserId, string? ownerUserName, CancellationToken cancellationToken = default);
    Task<bool> DiscardAsync(Guid id, Guid ownerUserId, string? ownerUserName, CancellationToken cancellationToken = default);
}
