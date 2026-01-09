namespace CRM.Enterprise.Application.Sourcing;

public interface IRfqReadService
{
    Task<IReadOnlyList<RfqListItemDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<RfqDetailDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
}
