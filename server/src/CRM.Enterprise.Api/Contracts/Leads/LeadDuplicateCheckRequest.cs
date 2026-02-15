using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public sealed record LeadDuplicateCheckRequest(
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    string? CompanyName,
    Guid? ExcludeLeadId);
