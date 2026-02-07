using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public record LeadConversionRequest(
    bool CreateAccount,
    string? AccountName,
    bool CreateContact,
    bool CreateOpportunity,
    string? OpportunityName,
    decimal? Amount,
    DateTime? ExpectedCloseDate,
    string? DealType,
    string? Segment,
    string? Stage,
    bool? IsCompetitive,
    bool? HasExecutiveChampion,
    bool? IsStrategic,
    string? Velocity,
    bool? ManagerApproved,
    string? OverrideReason);
