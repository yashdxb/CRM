namespace CRM.Enterprise.Application.Leads;

public interface ILeadConversationSummarizer
{
    Task<LeadConversationAiSummary> SummarizeAsync(Guid leadId, CancellationToken ct = default);
}

public sealed record LeadConversationAiSummary(
    string Summary,
    string Sentiment,
    string NextAction,
    DateTime GeneratedAtUtc);
