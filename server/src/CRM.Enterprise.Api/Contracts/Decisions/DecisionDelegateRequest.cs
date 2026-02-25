namespace CRM.Enterprise.Api.Contracts.Decisions;

public record DecisionDelegateRequest(
    Guid DelegateUserId,
    string? DelegateUserName,
    string? Notes);
