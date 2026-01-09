using CRM.Enterprise.Application.Sourcing;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Sourcing;

public sealed class RfqAwardService : IRfqAwardService
{
    private readonly CrmDbContext _dbContext;

    public RfqAwardService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<RfqAwardListItemDto?> CreateAsync(CreateRfqAwardRequest request, CancellationToken cancellationToken = default)
    {
        var rfq = await _dbContext.Rfqs
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == request.RfqId && !item.IsDeleted, cancellationToken);
        if (rfq is null)
        {
            return null;
        }

        var supplier = await _dbContext.Suppliers
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == request.SupplierId && !item.IsDeleted, cancellationToken);
        if (supplier is null)
        {
            return null;
        }

        var awardNumber = string.IsNullOrWhiteSpace(request.AwardNumber)
            ? $"AWD-{DateTime.UtcNow:yyyyMMdd-HHmm}"
            : request.AwardNumber.Trim();

        var award = new RfqAward
        {
            RfqId = request.RfqId,
            SupplierId = request.SupplierId,
            AwardNumber = awardNumber,
            AwardDate = request.AwardDate ?? DateTime.UtcNow,
            Status = string.IsNullOrWhiteSpace(request.Status) ? "Awarded" : request.Status.Trim(),
            AwardAmount = request.AwardAmount,
            Currency = request.Currency ?? rfq.Currency,
            Notes = request.Notes?.Trim(),
            CreatedBy = "System"
        };

        _dbContext.RfqAwards.Add(award);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new RfqAwardListItemDto(
            award.Id,
            award.AwardNumber,
            award.Status,
            award.AwardDate,
            award.AwardAmount,
            award.Currency,
            supplier.Name,
            rfq.RfqNumber);
    }
}
