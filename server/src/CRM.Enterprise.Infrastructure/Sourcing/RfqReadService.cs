using CRM.Enterprise.Application.Sourcing;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Sourcing;

public sealed class RfqReadService : IRfqReadService
{
    private readonly CrmDbContext _dbContext;

    public RfqReadService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<RfqListItemDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.Rfqs
            .AsNoTracking()
            .Where(rfq => !rfq.IsDeleted)
            .OrderByDescending(rfq => rfq.IssueDate)
            .Select(rfq => new RfqListItemDto(
                rfq.Id,
                rfq.RfqNumber,
                rfq.Title,
                rfq.Status,
                rfq.Type,
                rfq.IssueDate,
                rfq.CloseDate,
                rfq.Currency,
                rfq.CreatedBy ?? "Buyer",
                _dbContext.SupplierQuotes.Count(q => q.RfqId == rfq.Id && !q.IsDeleted),
                _dbContext.SupplierQuotes
                    .Where(q => q.RfqId == rfq.Id && !q.IsDeleted)
                    .Select(q => q.SupplierId)
                    .Distinct()
                    .Count()))
            .ToListAsync(cancellationToken);
    }

    public async Task<RfqDetailDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Rfqs
            .AsNoTracking()
            .Where(rfq => rfq.Id == id && !rfq.IsDeleted)
            .Select(rfq => new RfqDetailDto(
                rfq.Id,
                rfq.RfqNumber,
                rfq.Title,
                rfq.Status,
                rfq.Type,
                rfq.Description,
                rfq.IssueDate,
                rfq.CloseDate,
                rfq.CloseDate ?? rfq.IssueDate,
                rfq.Currency,
                rfq.CreatedBy ?? "Buyer",
                rfq.CreatedBy ?? "System",
                rfq.CreatedAtUtc,
                rfq.UpdatedAtUtc,
                _dbContext.SupplierQuotes.Count(q => q.RfqId == rfq.Id && !q.IsDeleted),
                _dbContext.SupplierQuotes
                    .Where(q => q.RfqId == rfq.Id && !q.IsDeleted)
                    .Select(q => q.SupplierId)
                    .Distinct()
                    .Count(),
                rfq.Lines
                    .Where(line => !line.IsDeleted)
                    .OrderBy(line => line.LineNumber)
                    .Select(line => new RfqLineDto(
                        line.Id,
                        line.LineNumber,
                        line.ItemMaster != null ? line.ItemMaster.Name : null,
                        line.Description,
                        line.Quantity,
                        line.Uom,
                        line.TargetPrice))
                    .ToList()))
            .FirstOrDefaultAsync(cancellationToken);
    }
}
