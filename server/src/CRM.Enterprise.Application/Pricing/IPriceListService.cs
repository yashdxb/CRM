namespace CRM.Enterprise.Application.Pricing;

public interface IPriceListService
{
    Task<PriceListSearchResponse> SearchAsync(PriceListSearchRequest request, CancellationToken cancellationToken = default);
    Task<PriceListDetailDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<PriceListDetailDto> CreateAsync(CreatePriceListRequest request, CancellationToken cancellationToken = default);
    Task<PriceListDetailDto?> UpdateAsync(Guid id, UpdatePriceListRequest request, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
