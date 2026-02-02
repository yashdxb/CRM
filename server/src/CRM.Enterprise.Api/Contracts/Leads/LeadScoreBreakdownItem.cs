namespace CRM.Enterprise.Api.Contracts.Leads;

public sealed record LeadScoreBreakdownItem(
    string Factor,
    int Score,
    int MaxScore);
