using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Opportunities;

public interface IOpportunityApprovalService
{
    Task<IReadOnlyList<OpportunityApprovalDto>?> GetForOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<OpportunityApprovalInboxItemDto>> GetInboxAsync(string? status = null, string? purpose = null, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<OpportunityApprovalDto>> RequestAsync(Guid opportunityId, decimal amount, string currency, string purpose, ActorContext actor, CancellationToken cancellationToken = default);
    Task<OpportunityOperationResult<OpportunityApprovalDto>> DecideAsync(Guid approvalId, bool approved, string? notes, ActorContext actor, bool syncDecisionRequest = true, CancellationToken cancellationToken = default);
    Task ProjectLinkedDecisionProgressionAsync(Guid decisionRequestId, int actedStepOrder, bool approved, string? notes, ActorContext actor, CancellationToken cancellationToken = default);
}
