using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public record LeadConversionRequest(
    bool CreateAccount,
    string? AccountName,
    bool CreateContact,
    bool CreateOpportunity,
    string? OpportunityName,
    decimal? Amount,
    DateTime? ExpectedCloseDate);
