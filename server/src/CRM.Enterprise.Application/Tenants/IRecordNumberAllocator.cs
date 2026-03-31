namespace CRM.Enterprise.Application.Tenants;

public interface IRecordNumberAllocator
{
    Task<string> AllocateAsync(string moduleKey, CancellationToken cancellationToken = default);
}
