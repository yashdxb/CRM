namespace CRM.Enterprise.Application.Leads;

public interface ILeadImportService
{
    Task<LeadImportResultDto> ImportAsync(Stream stream, LeadActor actor, CancellationToken cancellationToken = default);
    Task<LeadOperationResult<LeadImportQueuedDto>> QueueImportAsync(Stream stream, string fileName, LeadActor actor, CancellationToken cancellationToken = default);
}
