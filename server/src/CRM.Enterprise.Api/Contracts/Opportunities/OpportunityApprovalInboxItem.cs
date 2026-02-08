using System;

namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record OpportunityApprovalInboxItem(
    Guid Id,
    Guid OpportunityId,
    string OpportunityName,
    string AccountName,
    string Status,
    string Purpose,
    string ApproverRole,
    Guid? ApprovalChainId,
    int StepOrder,
    int TotalSteps,
    string ChainStatus,
    Guid? ApproverUserId,
    string? ApproverName,
    Guid? RequestedByUserId,
    string? RequestedByName,
    DateTime RequestedOn,
    DateTime? DecisionOn,
    string? Notes,
    decimal Amount,
    string Currency);
