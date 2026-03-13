using System.Threading;
using System.Threading.Tasks;

namespace CRM.Enterprise.Infrastructure.Persistence;

public interface IDatabaseInitializer
{
    /// <summary>
    /// Apply pending EF migrations only. Safe for production — no data seeding.
    /// </summary>
    Task MigrateOnlyAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Apply migrations AND seed structural + demo data. For local development only.
    /// </summary>
    Task InitializeAsync(CancellationToken cancellationToken = default);
}
