using System;

namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record OpportunityApprovalItem(
    Guid Id,
    Guid OpportunityId,
    string Status,
    string Purpose,
    string ApproverRole,
    Guid? ApproverUserId,
    string? ApproverName,
    Guid? RequestedByUserId,
    string? RequestedByName,
    DateTime RequestedOn,
    DateTime? DecisionOn,
    string? Notes,
    decimal Amount,
    string Currency);
