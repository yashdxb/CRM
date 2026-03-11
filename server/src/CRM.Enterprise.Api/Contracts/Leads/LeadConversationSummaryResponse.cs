namespace CRM.Enterprise.Api.Contracts.Leads;

public sealed record LeadConversationSummaryResponse(
    string Summary,
    string Sentiment,
    string NextAction,
    DateTime GeneratedAtUtc);
