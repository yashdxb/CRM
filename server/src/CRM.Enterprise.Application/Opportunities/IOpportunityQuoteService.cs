using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Opportunities;

public interface IOpportunityQuoteService
{
    Task<IReadOnlyList<OpportunityQuoteListItemDto>?> GetByOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken = default);
    Task<OpportunityQuoteDetailDto?> GetByIdAsync(Guid opportunityId, Guid quoteId, CancellationToken cancellationToken = default);
    Task<OpportunityQuoteDetailDto?> CreateAsync(Guid opportunityId, OpportunityQuoteCreateRequest request, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityQuoteDetailDto?> UpdateAsync(Guid opportunityId, Guid quoteId, OpportunityQuoteUpdateRequest request, ActorContext actor, CancellationToken cancellationToken = default);
}
