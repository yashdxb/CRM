using CRM.Enterprise.Application.Workflows;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Workflows;

public sealed class WorkflowExecutionService : IWorkflowExecutionService
{
    private readonly CrmDbContext _dbContext;

    public WorkflowExecutionService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<WorkflowExecutionStatusDto> GetDealApprovalStatusAsync(CancellationToken cancellationToken = default)
    {
        var pendingApprovals = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(approval => !approval.IsDeleted && approval.Status == "Pending")
            .CountAsync(cancellationToken);

        var runningExecutions = await _dbContext.OpportunityApprovalChains
            .AsNoTracking()
            .Where(chain => !chain.IsDeleted && chain.Status == "Pending")
            .CountAsync(cancellationToken);

        var todayUtc = DateTime.UtcNow.Date;
        var completedToday = await _dbContext.OpportunityApprovalChains
            .AsNoTracking()
            .Where(chain => !chain.IsDeleted
                            && chain.CompletedOn.HasValue
                            && chain.CompletedOn.Value >= todayUtc
                            && (chain.Status == "Approved"
                                || chain.Status == "Rejected"
                                || chain.Status == "Cancelled"
                                || chain.Status == "Expired"))
            .CountAsync(cancellationToken);

        var current = await (
                from chain in _dbContext.OpportunityApprovalChains.AsNoTracking()
                join opportunity in _dbContext.Opportunities.AsNoTracking() on chain.OpportunityId equals opportunity.Id
                join decision in _dbContext.DecisionRequests.AsNoTracking() on chain.DecisionRequestId equals decision.Id into decisionJoin
                from decision in decisionJoin.DefaultIfEmpty()
                where !chain.IsDeleted
                      && !opportunity.IsDeleted
                      && chain.Status == "Pending"
                orderby chain.RequestedOn descending
                select new
                {
                    chain.Id,
                    chain.OpportunityId,
                    OpportunityName = opportunity.Name,
                    chain.Purpose,
                    chain.CurrentStep,
                    chain.TotalSteps,
                    chain.UpdatedAtUtc,
                    chain.RequestedOn,
                    CurrentDecisionRequestId = decision != null ? decision.Id : (Guid?)null,
                    CurrentDecisionStatus = decision != null ? decision.Status : null
                })
            .FirstOrDefaultAsync(cancellationToken);

        string? pendingApproverRole = null;
        string? pendingApproverName = null;

        if (current is not null)
        {
            var pendingStep = await (
                    from approval in _dbContext.OpportunityApprovals.AsNoTracking()
                    join approver in _dbContext.Users.AsNoTracking() on approval.ApproverUserId equals approver.Id into approverJoin
                    from approver in approverJoin.DefaultIfEmpty()
                    where !approval.IsDeleted
                          && approval.ApprovalChainId == current.Id
                          && approval.Status == "Pending"
                    orderby approval.StepOrder, approval.RequestedOn descending
                    select new
                    {
                        approval.ApproverRole,
                        ApproverName = approver != null ? approver.FullName : null
                    })
                .FirstOrDefaultAsync(cancellationToken);

            pendingApproverRole = pendingStep?.ApproverRole;
            pendingApproverName = pendingStep?.ApproverName;
        }

        return new WorkflowExecutionStatusDto(
            current?.Id,
            pendingApprovals,
            runningExecutions,
            completedToday,
            current?.UpdatedAtUtc ?? current?.RequestedOn,
            current?.OpportunityId,
            current?.OpportunityName,
            current?.Purpose,
            current?.CurrentStep,
            current?.TotalSteps,
            pendingApproverRole,
            pendingApproverName,
            current?.CurrentDecisionRequestId,
            current?.CurrentDecisionStatus);
    }

    public async Task<IReadOnlyList<WorkflowExecutionHistoryItemDto>> GetDealApprovalHistoryAsync(
        int take = 50,
        CancellationToken cancellationToken = default)
    {
        var limit = Math.Clamp(take, 1, 200);

        var rows = await (
                from chain in _dbContext.OpportunityApprovalChains.AsNoTracking()
                join opportunity in _dbContext.Opportunities.AsNoTracking() on chain.OpportunityId equals opportunity.Id
                join requester in _dbContext.Users.AsNoTracking() on chain.RequestedByUserId equals requester.Id into requesterJoin
                from requester in requesterJoin.DefaultIfEmpty()
                join decision in _dbContext.DecisionRequests.AsNoTracking() on chain.DecisionRequestId equals decision.Id into decisionJoin
                from decision in decisionJoin.DefaultIfEmpty()
                where !chain.IsDeleted && !opportunity.IsDeleted
                orderby (chain.CompletedOn ?? chain.RequestedOn) descending
                select new
                {
                    chain.Id,
                    chain.OpportunityId,
                    OpportunityName = opportunity.Name,
                    chain.WorkflowName,
                    chain.WorkflowVersion,
                    chain.Purpose,
                    chain.Status,
                    TriggeredBy = requester != null ? requester.FullName : "System",
                    chain.CurrentStep,
                    chain.TotalSteps,
                    chain.DecisionRequestId,
                    DecisionStatus = decision != null ? decision.Status : null,
                    chain.RequestedOn,
                    chain.CompletedOn
                })
            .Take(limit)
            .ToListAsync(cancellationToken);

        var chainIds = rows.Select(row => row.Id).ToList();
        var pendingApprovals = chainIds.Count == 0
            ? new Dictionary<Guid, PendingApprovalProjection>()
            : await (
                    from approval in _dbContext.OpportunityApprovals.AsNoTracking()
                    join approver in _dbContext.Users.AsNoTracking() on approval.ApproverUserId equals approver.Id into approverJoin
                    from approver in approverJoin.DefaultIfEmpty()
                    where !approval.IsDeleted
                          && approval.ApprovalChainId.HasValue
                          && chainIds.Contains(approval.ApprovalChainId.Value)
                          && approval.Status == "Pending"
                    orderby approval.StepOrder, approval.RequestedOn descending
                    select new
                    {
                        ChainId = approval.ApprovalChainId!.Value,
                        approval.ApproverRole,
                        ApproverName = approver != null ? approver.FullName : null
                    })
                .GroupBy(item => item.ChainId)
                .Select(group => group.First())
                .ToDictionaryAsync(
                    item => item.ChainId,
                    item => new PendingApprovalProjection(item.ApproverRole, item.ApproverName),
                    cancellationToken);

        return rows.Select(row =>
        {
            pendingApprovals.TryGetValue(row.Id, out var pending);
            var summary = BuildSummary(
                row.Status,
                row.Purpose,
                row.OpportunityName,
                row.CurrentStep,
                row.TotalSteps,
                pending?.ApproverRole);

            return new WorkflowExecutionHistoryItemDto(
                row.Id,
                row.OpportunityId,
                row.OpportunityName,
                string.IsNullOrWhiteSpace(row.WorkflowName) ? "Deal Approval" : row.WorkflowName,
                row.WorkflowVersion <= 0 ? 1 : row.WorkflowVersion,
                row.Purpose,
                row.Status,
                row.TriggeredBy,
                row.CurrentStep,
                row.TotalSteps,
                pending?.ApproverRole,
                pending?.ApproverName,
                row.DecisionRequestId,
                row.DecisionStatus,
                row.RequestedOn,
                row.CompletedOn,
                summary);
        }).ToList();
    }

    private static string BuildSummary(
        string status,
        string purpose,
        string opportunityName,
        int currentStep,
        int totalSteps,
        string? pendingApproverRole)
    {
        var stepLabel = $"Step {Math.Max(1, currentStep)} of {Math.Max(1, totalSteps)}";
        if (string.Equals(status, "Pending", StringComparison.OrdinalIgnoreCase))
        {
            var approver = string.IsNullOrWhiteSpace(pendingApproverRole) ? "pending approver" : pendingApproverRole;
            return $"{purpose} approval for {opportunityName} is at {stepLabel}, waiting on {approver}.";
        }

        return $"{purpose} approval for {opportunityName} completed with status {status} at {stepLabel}.";
    }

    private sealed record PendingApprovalProjection(string ApproverRole, string? ApproverName);
}
