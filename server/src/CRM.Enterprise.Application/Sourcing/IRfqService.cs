namespace CRM.Enterprise.Application.Sourcing;

public interface IRfqService
{
    Task<Guid> CreateAsync(UpsertRfqRequest request, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(Guid id, UpsertRfqRequest request, CancellationToken cancellationToken = default);
}
