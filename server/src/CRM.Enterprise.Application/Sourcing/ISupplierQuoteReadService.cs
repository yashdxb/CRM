namespace CRM.Enterprise.Application.Sourcing;

public interface ISupplierQuoteReadService
{
    Task<IReadOnlyList<SupplierQuoteComparisonDto>> GetComparisonAsync(Guid? rfqId, CancellationToken cancellationToken = default);
}
