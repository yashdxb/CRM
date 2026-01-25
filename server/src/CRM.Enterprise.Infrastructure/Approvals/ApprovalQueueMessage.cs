namespace CRM.Enterprise.Infrastructure.Approvals;

public record ApprovalQueueMessage(
    Guid OpportunityId,
    Guid? RequestedByUserId,
    decimal Amount,
    string Currency,
    DateTime RequestedOn,
    string ApproverRole);
