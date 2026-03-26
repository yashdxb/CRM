namespace CRM.Enterprise.Infrastructure.Caching;

public interface IReadModelCache
{
    Task<T> GetOrCreateAsync<T>(
        string key,
        TimeSpan ttl,
        Func<CancellationToken, Task<T>> factory,
        CancellationToken cancellationToken);
}
