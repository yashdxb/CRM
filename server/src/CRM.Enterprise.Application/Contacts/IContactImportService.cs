using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Contacts;

public interface IContactImportService
{
    Task<ContactImportResultDto> ImportAsync(Stream stream, ActorContext actor, CancellationToken cancellationToken = default);
    Task<ContactOperationResult<ContactImportQueuedDto>> QueueImportAsync(Stream stream, string fileName, ActorContext actor, CancellationToken cancellationToken = default);
}
