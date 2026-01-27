namespace CRM.Enterprise.Api.Contracts.Leads;

public sealed record LeadCadenceTouchItem(
    Guid ActivityId,
    string Channel,
    string Outcome,
    DateTime CompletedAtUtc,
    DateTime? NextStepDueAtUtc,
    string OwnerName);
