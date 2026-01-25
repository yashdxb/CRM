namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record OpportunityApprovalDecisionRequest(bool Approved, string? Notes);
