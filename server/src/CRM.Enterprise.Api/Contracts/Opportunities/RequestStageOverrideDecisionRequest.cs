namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record RequestStageOverrideDecisionRequest(
    string RequestedStage,
    string? BlockerReason,
    string? Notes);

public record RequestStageOverrideDecisionResponse(
    Guid DecisionId,
    string Status,
    string RequestedStage,
    string Message);
