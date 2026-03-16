using CRM.Enterprise.Application.Lookups;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Lookups;

public class OpportunityStageLookupService : IOpportunityStageLookupService
{
    private readonly CrmDbContext _db;

    public OpportunityStageLookupService(CrmDbContext db) => _db = db;

    public async Task<IReadOnlyList<OpportunityStageDto>> GetAllAsync(CancellationToken ct = default) =>
        await _db.OpportunityStages.AsNoTracking()
            .Where(x => !x.IsDeleted)
            .OrderBy(x => x.Order)
            .Select(x => new OpportunityStageDto(x.Id, x.Name, x.Order, x.IsClosedStage, x.ForecastCategory))
            .ToListAsync(ct);

    public async Task<OpportunityStageDto?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _db.OpportunityStages.AsNoTracking()
            .Where(x => x.Id == id && !x.IsDeleted)
            .Select(x => new OpportunityStageDto(x.Id, x.Name, x.Order, x.IsClosedStage, x.ForecastCategory))
            .FirstOrDefaultAsync(ct);

    public async Task<OpportunityStageDto> CreateAsync(UpsertOpportunityStageRequest request, CancellationToken ct = default)
    {
        var entity = new OpportunityStage
        {
            Name = request.Name,
            Order = request.Order,
            IsClosedStage = request.IsClosedStage,
            ForecastCategory = request.ForecastCategory
        };

        _db.OpportunityStages.Add(entity);
        await _db.SaveChangesAsync(ct);

        return new OpportunityStageDto(entity.Id, entity.Name, entity.Order, entity.IsClosedStage, entity.ForecastCategory);
    }

    public async Task<OpportunityStageDto?> UpdateAsync(Guid id, UpsertOpportunityStageRequest request, CancellationToken ct = default)
    {
        var entity = await _db.OpportunityStages.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);
        if (entity is null) return null;

        entity.Name = request.Name;
        entity.Order = request.Order;
        entity.IsClosedStage = request.IsClosedStage;
        entity.ForecastCategory = request.ForecastCategory;

        await _db.SaveChangesAsync(ct);
        return new OpportunityStageDto(entity.Id, entity.Name, entity.Order, entity.IsClosedStage, entity.ForecastCategory);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.OpportunityStages
            .Include(x => x.Opportunities)
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);
        if (entity is null) return false;

        if (entity.Opportunities.Any(o => !o.IsDeleted))
            return false; // cannot delete a stage that is in use

        entity.IsDeleted = true;
        entity.DeletedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<bool> ReorderAsync(IReadOnlyList<Guid> orderedIds, CancellationToken ct = default)
    {
        var entities = await _db.OpportunityStages.Where(x => !x.IsDeleted).ToListAsync(ct);
        for (var i = 0; i < orderedIds.Count; i++)
        {
            var entity = entities.FirstOrDefault(x => x.Id == orderedIds[i]);
            if (entity is not null) entity.Order = i;
        }
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
