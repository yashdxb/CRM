namespace CRM.Enterprise.Api.Contracts.Leads;

public sealed record LeadCadenceTouchRequest(
    string Channel,
    string Outcome,
    DateTime? NextStepDueAtUtc);
