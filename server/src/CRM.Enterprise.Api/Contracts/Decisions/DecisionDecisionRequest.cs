namespace CRM.Enterprise.Api.Contracts.Decisions;

public record DecisionDecisionRequest(
    bool Approved,
    string? Notes);
