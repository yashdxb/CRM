namespace CRM.Enterprise.Application.HelpDesk;

public interface ISupportQueueService
{
    Task<IReadOnlyList<SupportQueueDto>> ListQueuesAsync(CancellationToken cancellationToken = default);
    Task<HelpDeskValueResult<SupportQueueDto>> CreateQueueAsync(SupportQueueUpsertRequest request, CancellationToken cancellationToken = default);
    Task<HelpDeskOperationResult> UpdateQueueAsync(Guid id, SupportQueueUpsertRequest request, CancellationToken cancellationToken = default);
}
