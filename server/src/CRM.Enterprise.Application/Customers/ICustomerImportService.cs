using CRM.Enterprise.Application.Common;

namespace CRM.Enterprise.Application.Customers;

public interface ICustomerImportService
{
    Task<CustomerImportResultDto> ImportAsync(Stream stream, ActorContext actor, CancellationToken cancellationToken = default);
    Task<CustomerOperationResult<CustomerImportQueuedDto>> QueueImportAsync(Stream stream, string fileName, ActorContext actor, CancellationToken cancellationToken = default);
}
