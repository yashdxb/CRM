using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public sealed record LeadAiScoreResponse(int Score, decimal Confidence, string Rationale, DateTime ScoredAtUtc);
