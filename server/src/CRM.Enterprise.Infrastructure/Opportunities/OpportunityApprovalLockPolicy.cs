using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

internal static class OpportunityApprovalLockPolicy
{
    internal const string LockViolationMessage = "Deal is locked while approval is pending.";

    public static async Task<string?> GetLockViolationAsync(
        CrmDbContext dbContext,
        Guid opportunityId,
        Guid? actorUserId,
        CancellationToken cancellationToken)
    {
        var hasPendingApproval = await dbContext.OpportunityApprovals
            .AsNoTracking()
            .AnyAsync(
                a => !a.IsDeleted
                     && a.OpportunityId == opportunityId
                     && a.Status == "Pending",
                cancellationToken);

        if (hasPendingApproval)
        {
            return LockViolationMessage;
        }

        var hasPendingDecision = await dbContext.DecisionRequests
            .AsNoTracking()
            .AnyAsync(
                d => !d.IsDeleted
                     && d.EntityType == "Opportunity"
                     && d.EntityId == opportunityId
                     && (d.Status == "Pending" || d.Status == "Submitted" || d.Status == "InProgress"),
                cancellationToken);

        return hasPendingDecision ? LockViolationMessage : null;
    }
}
