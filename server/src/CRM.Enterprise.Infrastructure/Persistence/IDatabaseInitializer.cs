using System.Threading;
using System.Threading.Tasks;

namespace CRM.Enterprise.Infrastructure.Persistence;

public interface IDatabaseInitializer
{
    Task InitializeAsync(CancellationToken cancellationToken = default);
}
