namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record CampaignAttributedOpportunityItem(
    Guid OpportunityId,
    string OpportunityName,
    string AccountName,
    string Stage,
    decimal Amount,
    string Currency,
    bool IsClosed,
    bool IsWon,
    DateTime? ExpectedCloseDate,
    DateTime AttributedUtc);
