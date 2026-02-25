namespace CRM.Enterprise.Application.Decisions;

public sealed record DecisionStepDto(
    int StepOrder,
    string StepType,
    string Status,
    string? ApproverRole,
    Guid? AssigneeUserId,
    string? AssigneeName,
    DateTime? DueAtUtc,
    DateTime? CompletedAtUtc);

public sealed record DecisionInboxItemDto(
    Guid Id,
    string DecisionType,
    string WorkflowType,
    string EntityType,
    Guid EntityId,
    string EntityName,
    string? ParentEntityName,
    string Status,
    string Purpose,
    string Priority,
    string RiskLevel,
    string SlaStatus,
    DateTime? SlaDueAtUtc,
    bool IsEscalated,
    double RequestedAgeHours,
    string PolicyReason,
    string BusinessImpactLabel,
    decimal Amount,
    string Currency,
    Guid? RequestedByUserId,
    string? RequestedByName,
    Guid? AssigneeUserId,
    string? AssigneeName,
    DateTime RequestedOn,
    DateTime? DecisionOn,
    string? Notes,
    int CurrentStepOrder,
    int TotalSteps,
    string? StepRole,
    string? ChainStatus,
    IReadOnlyList<DecisionStepDto> Steps);

public sealed record DecisionCreateStepRequestDto(
    int StepOrder,
    string StepType,
    string? ApproverRole,
    Guid? AssigneeUserId,
    string? AssigneeName,
    DateTime? DueAtUtc);

public sealed record DecisionCreateRequestDto(
    string DecisionType,
    string WorkflowType,
    string EntityType,
    Guid EntityId,
    string EntityName,
    string? ParentEntityName,
    string Purpose,
    string Status,
    string Priority,
    string RiskLevel,
    string SlaStatus,
    DateTime? SlaDueAtUtc,
    string PolicyReason,
    string BusinessImpactLabel,
    decimal Amount,
    string Currency,
    Guid? RequestedByUserId,
    string? RequestedByName,
    Guid? AssigneeUserId,
    string? AssigneeName,
    DateTime RequestedOn,
    int CurrentStepOrder,
    int TotalSteps,
    string? StepRole,
    string? ChainStatus,
    string? PayloadJson,
    string? PolicySnapshotJson,
    IReadOnlyList<DecisionCreateStepRequestDto> Steps);

public sealed record DecisionAssistDraftDto(
    Guid DecisionId,
    string Summary,
    string RecommendedAction,
    string ApprovalDraftNote,
    string RejectDraftNote,
    string RequestInfoDraftNote,
    IReadOnlyList<string> MissingEvidence,
    string Disclaimer);

public sealed record DecisionDecisionRequestDto(
    bool Approved,
    string? Notes,
    Guid? ActorUserId,
    string? ActorName);

public sealed record DecisionRequestInfoDto(
    string? Notes,
    Guid? ActorUserId,
    string? ActorName);

public sealed record DecisionDelegateRequestDto(
    Guid DelegateUserId,
    string? DelegateUserName,
    string? Notes,
    Guid? ActorUserId,
    string? ActorName);

public sealed record DecisionHistoryItemDto(
    Guid ActionLogId,
    Guid DecisionId,
    string Action,
    DateTime ActionAtUtc,
    string? ActorName,
    Guid? ActorUserId,
    string DecisionType,
    string WorkflowType,
    string EntityType,
    Guid EntityId,
    string EntityName,
    string Status,
    string? Priority,
    string? RiskLevel,
    string? Notes,
    string? PolicyReason,
    bool IsEscalated);
