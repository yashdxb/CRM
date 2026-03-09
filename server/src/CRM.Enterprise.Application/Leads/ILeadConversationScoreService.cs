using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Application.Leads;

public interface ILeadConversationScoreService
{
    Task<LeadConversationScoreSnapshot> CalculateAsync(Lead lead, CancellationToken cancellationToken = default);
    Task<LeadConversationScoreSnapshot?> RefreshAsync(Guid leadId, CancellationToken cancellationToken = default);
}

public sealed record LeadConversationScoreSnapshot(
    int? Score,
    string? Label,
    IReadOnlyList<string> Reasons,
    DateTime? UpdatedAtUtc,
    bool SignalAvailable);
