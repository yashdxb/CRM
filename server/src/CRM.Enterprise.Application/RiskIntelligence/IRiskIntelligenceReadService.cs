using System;
using System.Threading;
using System.Threading.Tasks;

namespace CRM.Enterprise.Application.RiskIntelligence;

public interface IRiskIntelligenceReadService
{
    Task<RiskIntelligenceWorkspaceDto> GetWorkspaceAsync(Guid userId, CancellationToken cancellationToken);
}
