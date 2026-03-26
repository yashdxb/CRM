using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.Caching;

public sealed class ReadModelCache : IReadModelCache
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly IDistributedCache _cache;
    private readonly ILogger<ReadModelCache> _logger;

    public ReadModelCache(IDistributedCache cache, ILogger<ReadModelCache> logger)
    {
        _cache = cache;
        _logger = logger;
    }

    public async Task<T> GetOrCreateAsync<T>(
        string key,
        TimeSpan ttl,
        Func<CancellationToken, Task<T>> factory,
        CancellationToken cancellationToken)
    {
        try
        {
            var cached = await _cache.GetStringAsync(key, cancellationToken);
            if (!string.IsNullOrWhiteSpace(cached))
            {
                var value = JsonSerializer.Deserialize<T>(cached, JsonOptions);
                if (value is not null)
                {
                    return value;
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Read-model cache get failed for key {CacheKey}. Falling back to source.", key);
        }

        var fresh = await factory(cancellationToken);

        try
        {
            var payload = JsonSerializer.Serialize(fresh, JsonOptions);
            await _cache.SetStringAsync(
                key,
                payload,
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = ttl
                },
                cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Read-model cache set failed for key {CacheKey}. Returning fresh value.", key);
        }

        return fresh;
    }
}
