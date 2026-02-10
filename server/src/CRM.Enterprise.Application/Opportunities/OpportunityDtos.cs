namespace CRM.Enterprise.Application.Opportunities;

public sealed record OpportunityListItemDto(
    Guid Id,
    string Name,
    Guid AccountId,
    string AccountName,
    string Stage,
    decimal Amount,
    decimal Probability,
    string Currency,
    DateTime? ExpectedCloseDate,
    DateTime? ContractStartDateUtc,
    DateTime? ContractEndDateUtc,
    string? ForecastCategory,
    string OpportunityType,
    Guid? RenewalOfOpportunityId,
    Guid? RenewalOpportunityId,
    string? Requirements,
    string? BuyingProcess,
    string? SuccessCriteria,
    decimal? DiscountPercent,
    decimal? DiscountAmount,
    string? PricingNotes,
    string? SecurityReviewStatus,
    string? SecurityNotes,
    string? LegalReviewStatus,
    string? LegalNotes,
    string? ProposalStatus,
    string? ProposalNotes,
    string? ProposalLink,
    DateTime? ProposalGeneratedAtUtc,
    DateTime? ProposalSentAtUtc,
    string? PreSalesScope,
    string? PreSalesApproach,
    Guid? DeliveryOwnerId,
    string? DeliveryHandoffScope,
    string? DeliveryHandoffRisks,
    string? DeliveryHandoffTimeline,
    string? DeliveryStatus,
    DateTime? DeliveryCompletedAtUtc,
    Guid OwnerId,
    string OwnerName,
    string Status,
    string? WinLossReason,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc,
    DateTime? LastActivityAtUtc,
    DateTime? NextStepDueAtUtc,
    bool IsAtRisk);

public sealed record OpportunitySearchResultDto(IReadOnlyList<OpportunityListItemDto> Items, int Total);

public sealed record RenewalAutomationResultDto(int RenewalsCreated, int ReminderTasksCreated);

public sealed record ExpansionSignalDto(
    Guid OpportunityId,
    Guid AccountId,
    string AccountName,
    string OpportunityName,
    DateTime? ContractEndDateUtc,
    DateTime LastSignalAtUtc,
    int SignalCount,
    bool HasExpansionOpportunity);

public sealed record OpportunityReviewThreadItemDto(
    Guid ActivityId,
    string Kind,
    string Outcome,
    string Subject,
    string? Comment,
    Guid OwnerId,
    string OwnerName,
    DateTime CreatedAtUtc,
    DateTime? DueDateUtc,
    DateTime? CompletedDateUtc,
    bool RequiresAcknowledgment);

public sealed record OpportunityTeamMemberDto(
    Guid UserId,
    string UserName,
    string Role,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record OpportunityOnboardingItemDto(
    Guid Id,
    Guid OpportunityId,
    string Type,
    string Title,
    string Status,
    DateTime? DueDateUtc,
    DateTime? CompletedAtUtc,
    string? Notes);

public sealed record OpportunityStageHistoryDto(
    Guid Id,
    string Stage,
    DateTime ChangedAtUtc,
    string? ChangedBy,
    string? Notes);

public sealed record OpportunityAuditEventDto(
    Guid Id,
    string EntityType,
    Guid EntityId,
    string Action,
    string? Field,
    string? OldValue,
    string? NewValue,
    Guid? ChangedByUserId,
    string? ChangedByName,
    DateTime CreatedAtUtc);

public sealed record OpportunityOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static OpportunityOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static OpportunityOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static OpportunityOperationResult<T> NotFoundResult() => new(false, default, null, true);
}

public sealed record OpportunityApprovalDto(
    Guid Id,
    Guid OpportunityId,
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

public sealed record OpportunityApprovalInboxItemDto(
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
