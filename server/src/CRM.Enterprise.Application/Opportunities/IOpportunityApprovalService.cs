using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Opportunities;

public interface IOpportunityApprovalService
{
    Task<IReadOnlyList<OpportunityApprovalDto>?> GetForOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<OpportunityApprovalDto>> RequestAsync(Guid opportunityId, decimal amount, string currency, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<OpportunityApprovalDto>> DecideAsync(Guid approvalId, bool approved, string? notes, ActorContext actor, CancellationToken cancellationToken = default);
}
