namespace CRM.Enterprise.Application.Sourcing;

public interface IRfqAwardService
{
    Task<RfqAwardListItemDto?> CreateAsync(CreateRfqAwardRequest request, CancellationToken cancellationToken = default);
}
