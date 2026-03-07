namespace CRM.Enterprise.Application.Workflows;

public interface IWorkflowExecutionService
{
    Task<WorkflowExecutionStatusDto> GetDealApprovalStatusAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyList<WorkflowExecutionHistoryItemDto>> GetDealApprovalHistoryAsync(int take = 50, CancellationToken cancellationToken = default);
}
