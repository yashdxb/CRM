using CRM.Enterprise.Application.Sourcing;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Sourcing;

public sealed class SupplierQuoteReadService : ISupplierQuoteReadService
{
    private readonly CrmDbContext _dbContext;

    public SupplierQuoteReadService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<SupplierQuoteComparisonDto>> GetComparisonAsync(Guid? rfqId, CancellationToken cancellationToken = default)
    {
        var query = _dbContext.SupplierQuotes
            .AsNoTracking()
            .Where(quote => !quote.IsDeleted);

        if (rfqId.HasValue)
        {
            query = query.Where(quote => quote.RfqId == rfqId.Value);
        }

        return await query
            .OrderByDescending(quote => quote.SubmittedDate)
            .Select(quote => new SupplierQuoteComparisonDto(
                quote.Id,
                quote.RfqId,
                quote.QuoteNumber,
                quote.Status,
                quote.SubmittedDate,
                quote.Currency,
                quote.TotalAmount,
                quote.Supplier != null ? quote.Supplier.Name : "Supplier"))
            .ToListAsync(cancellationToken);
    }
}
