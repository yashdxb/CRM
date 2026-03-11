namespace CRM.Enterprise.Application.Leads;

public interface ILeadInteractionSummaryService
{
    Task<LeadInteractionSummary> GetSummaryAsync(Guid leadId, Guid tenantId, CancellationToken ct = default);
}

public sealed record LeadInteractionSummary(
    int TotalEmails,
    int InboundEmails,
    int OutboundEmails,
    DateTime? LastEmailAtUtc,
    decimal OpenRate,
    decimal ClickRate,
    IReadOnlyList<string> DetectedSignals);
