namespace CRM.Enterprise.Api.Contracts.Workflows;

public sealed record DealApprovalWorkflowResponse(
    bool Enabled,
    DealApprovalWorkflowScopeResponse Scope,
    IReadOnlyList<DealApprovalWorkflowStepResponse> Steps,
    IReadOnlyList<DealApprovalWorkflowNodeResponse> Nodes,
    IReadOnlyList<DealApprovalWorkflowConnectionResponse> Connections);

public sealed record DealApprovalWorkflowScopeResponse(
    string Name,
    string Purpose,
    string Module,
    string Pipeline,
    string Stage,
    string Trigger,
    string Status,
    int Version);

public sealed record DealApprovalWorkflowStepResponse(
    int Order,
    string ApproverRole,
    decimal? AmountThreshold,
    string? Purpose,
    string? NodeId);

public sealed record DealApprovalWorkflowNodeResponse(
    string Id,
    string Type,
    double X,
    double Y,
    string? Label);

public sealed record DealApprovalWorkflowConnectionResponse(
    string Source,
    string Target);

public sealed record UpdateDealApprovalWorkflowRequest(
    bool Enabled,
    UpdateDealApprovalWorkflowScopeRequest? Scope,
    IReadOnlyList<UpdateDealApprovalWorkflowStepRequest> Steps,
    IReadOnlyList<UpdateDealApprovalWorkflowNodeRequest> Nodes,
    IReadOnlyList<UpdateDealApprovalWorkflowConnectionRequest> Connections);

public sealed record UpdateDealApprovalWorkflowScopeRequest(
    string Name,
    string Purpose,
    string Module,
    string Pipeline,
    string Stage,
    string Trigger,
    string Status,
    int Version);

public sealed record UpdateDealApprovalWorkflowStepRequest(
    int Order,
    string ApproverRole,
    decimal? AmountThreshold,
    string? Purpose,
    string? NodeId);

public sealed record UpdateDealApprovalWorkflowNodeRequest(
    string Id,
    string Type,
    double X,
    double Y,
    string? Label);

public sealed record UpdateDealApprovalWorkflowConnectionRequest(
    string Source,
    string Target);
