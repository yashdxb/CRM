using CRM.Enterprise.Application.Sourcing;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Sourcing;

public sealed class RfqAwardReadService : IRfqAwardReadService
{
    private readonly CrmDbContext _dbContext;

    public RfqAwardReadService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<RfqAwardListItemDto>> GetAllAsync(Guid? rfqId, CancellationToken cancellationToken = default)
    {
        var query = _dbContext.RfqAwards
            .AsNoTracking()
            .Where(award => !award.IsDeleted);

        if (rfqId.HasValue)
        {
            query = query.Where(award => award.RfqId == rfqId.Value);
        }

        return await query
            .OrderByDescending(award => award.AwardDate)
            .Select(award => new RfqAwardListItemDto(
                award.Id,
                award.AwardNumber,
                award.Status,
                award.AwardDate,
                award.AwardAmount,
                award.Currency,
                award.Supplier != null ? award.Supplier.Name : "Supplier",
                award.Rfq != null ? award.Rfq.RfqNumber : string.Empty))
            .ToListAsync(cancellationToken);
    }

    public async Task<RfqAwardDetailDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var award = await _dbContext.RfqAwards
            .AsNoTracking()
            .Include(a => a.Supplier)
            .Include(a => a.Rfq)
            .ThenInclude(r => r!.Lines)
            .ThenInclude(line => line.ItemMaster)
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);

        if (award is null || award.Rfq is null || award.Supplier is null)
        {
            return null;
        }

        var lines = award.Rfq.Lines
            .OrderBy(line => line.LineNumber)
            .Select(line => new RfqAwardLineDto(
                line.Id,
                line.LineNumber,
                line.ItemMaster != null ? line.ItemMaster.Name : (line.Description ?? "Item"),
                line.Uom,
                line.Quantity,
                line.TargetPrice,
                line.TargetPrice.HasValue ? line.TargetPrice.Value * line.Quantity : null))
            .ToList();

        return new RfqAwardDetailDto(
            award.Id,
            award.AwardNumber,
            award.Status,
            award.AwardDate,
            award.AwardAmount,
            award.Currency,
            award.Notes,
            award.RfqId,
            award.Rfq!.RfqNumber,
            award.Rfq!.Title,
            award.SupplierId,
            award.Supplier!.Name,
            lines);
    }
}
