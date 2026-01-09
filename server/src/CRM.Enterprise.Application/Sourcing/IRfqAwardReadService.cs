namespace CRM.Enterprise.Application.Sourcing;

public interface IRfqAwardReadService
{
    Task<IReadOnlyList<RfqAwardListItemDto>> GetAllAsync(Guid? rfqId, CancellationToken cancellationToken = default);
    Task<RfqAwardDetailDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
}
