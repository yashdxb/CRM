namespace CRM.Enterprise.Application.Leads;

public sealed record LeadAiScore(int Score, decimal Confidence, string Rationale);
