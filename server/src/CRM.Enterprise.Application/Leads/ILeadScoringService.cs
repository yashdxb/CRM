using System.Threading;
using System.Threading.Tasks;
using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Application.Leads;

public interface ILeadScoringService
{
    Task<LeadAiScore> ScoreAsync(Lead lead, CancellationToken cancellationToken);
}
