namespace CRM.Enterprise.Api.Contracts.Decisions;

public record CreateDecisionStepRequest(
    int StepOrder,
    string? StepType,
    string? ApproverRole,
    Guid? AssigneeUserId,
    string? AssigneeName,
    DateTime? DueAtUtc);

public record CreateDecisionRequest(
    string DecisionType,
    string WorkflowType,
    string EntityType,
    Guid EntityId,
    string EntityName,
    string? ParentEntityName,
    string Purpose,
    string? Status,
    string? Priority,
    string? RiskLevel,
    string? SlaStatus,
    DateTime? SlaDueAtUtc,
    string? PolicyReason,
    string? BusinessImpactLabel,
    decimal Amount,
    string? Currency,
    Guid? RequestedByUserId,
    string? RequestedByName,
    Guid? AssigneeUserId,
    string? AssigneeName,
    DateTime? RequestedOn,
    int? CurrentStepOrder,
    int? TotalSteps,
    string? StepRole,
    string? ChainStatus,
    string? PayloadJson,
    string? PolicySnapshotJson,
    IReadOnlyList<CreateDecisionStepRequest>? Steps);
