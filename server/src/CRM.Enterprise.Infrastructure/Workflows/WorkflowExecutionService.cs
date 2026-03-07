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

        var runningChains = await _dbContext.OpportunityApprovalChains
            .AsNoTracking()
            .Where(chain => !chain.IsDeleted && chain.Status == "Pending")
            .CountAsync(cancellationToken);

        var todayUtc = DateTime.UtcNow.Date;
        var completedToday = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(approval => !approval.IsDeleted
                               && approval.DecisionOn.HasValue
                               && approval.DecisionOn.Value >= todayUtc
                               && (approval.Status == "Approved" || approval.Status == "Rejected"))
            .CountAsync(cancellationToken);

        var latest = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(approval => !approval.IsDeleted)
            .OrderByDescending(approval => approval.DecisionOn ?? approval.RequestedOn)
            .Select(approval => new { approval.ApprovalChainId, approval.DecisionOn, approval.RequestedOn })
            .FirstOrDefaultAsync(cancellationToken);

        return new WorkflowExecutionStatusDto(
            latest?.ApprovalChainId,
            pendingApprovals,
            runningChains,
            completedToday,
            latest?.DecisionOn ?? latest?.RequestedOn);
    }

    public async Task<IReadOnlyList<WorkflowExecutionHistoryItemDto>> GetDealApprovalHistoryAsync(
        int take = 50,
        CancellationToken cancellationToken = default)
    {
        var limit = Math.Clamp(take, 1, 200);

        var rows = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(approval => !approval.IsDeleted)
            .Join(
                _dbContext.Users.AsNoTracking(),
                approval => approval.RequestedByUserId,
                user => user.Id,
                (approval, user) => new
                {
                    approval.Id,
                    approval.ApprovalChainId,
                    approval.Status,
                    approval.Purpose,
                    approval.ApproverRole,
                    approval.RequestedOn,
                    approval.DecisionOn,
                    RequestedBy = user.FullName
                })
            .OrderByDescending(row => row.DecisionOn ?? row.RequestedOn)
            .Take(limit)
            .ToListAsync(cancellationToken);

        return rows.Select(row => new WorkflowExecutionHistoryItemDto(
                row.ApprovalChainId ?? row.Id,
                row.Status,
                row.RequestedBy,
                row.RequestedOn,
                row.DecisionOn,
                $"{row.Purpose} approval routed to {row.ApproverRole}."))
            .ToList();
    }
}
