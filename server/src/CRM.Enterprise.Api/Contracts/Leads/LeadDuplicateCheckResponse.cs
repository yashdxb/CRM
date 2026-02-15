using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Leads;

public sealed record LeadDuplicateCheckCandidate(
    Guid LeadId,
    string Name,
    string CompanyName,
    string? Email,
    string? Phone,
    int LeadScore,
    int MatchScore,
    string MatchLevel,
    IEnumerable<string> MatchedSignals);

public sealed record LeadDuplicateCheckResponse(
    string Decision,
    bool IsBlocked,
    bool HasWarnings,
    IEnumerable<LeadDuplicateCheckCandidate> Matches);
