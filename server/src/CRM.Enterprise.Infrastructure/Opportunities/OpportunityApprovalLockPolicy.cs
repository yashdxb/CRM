using CRM.Enterprise.Security;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

internal static class OpportunityApprovalLockPolicy
{
    internal const string LockViolationMessage = "Deal is locked while your approval request is pending.";

    public static async Task<string?> GetLockViolationAsync(
        CrmDbContext dbContext,
        Guid opportunityId,
        Guid? actorUserId,
        CancellationToken cancellationToken)
    {
        if (!actorUserId.HasValue || actorUserId.Value == Guid.Empty)
        {
            return null;
        }

        if (await IsManagerOverrideAsync(dbContext, actorUserId.Value, cancellationToken))
        {
            return null;
        }

        var hasPendingRequesterApproval = await dbContext.OpportunityApprovals
            .AsNoTracking()
            .AnyAsync(
                a => !a.IsDeleted
                     && a.OpportunityId == opportunityId
                     && a.RequestedByUserId == actorUserId.Value
                     && a.Status == "Pending",
                cancellationToken);

        if (hasPendingRequesterApproval)
        {
            return LockViolationMessage;
        }

        var hasPendingRequesterDecision = await dbContext.DecisionRequests
            .AsNoTracking()
            .AnyAsync(
                d => !d.IsDeleted
                     && d.EntityType == "Opportunity"
                     && d.EntityId == opportunityId
                     && d.RequestedByUserId == actorUserId.Value
                     && (d.Status == "Pending" || d.Status == "Submitted" || d.Status == "InProgress"),
                cancellationToken);

        return hasPendingRequesterDecision ? LockViolationMessage : null;
    }

    private static Task<bool> IsManagerOverrideAsync(
        CrmDbContext dbContext,
        Guid userId,
        CancellationToken cancellationToken)
    {
        return dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => ur.UserId == userId && !ur.IsDeleted)
            .Join(
                dbContext.Roles.AsNoTracking().Where(r => !r.IsDeleted),
                userRole => userRole.RoleId,
                role => role.Id,
                (_, role) => role.Name)
            .AnyAsync(
                roleName =>
                    roleName == Permissions.RoleNames.SuperAdmin
                    || roleName == Permissions.RoleNames.Admin
                    || roleName == Permissions.RoleNames.SalesManager
                    || roleName == "System Administrator",
                cancellationToken);
    }
}
