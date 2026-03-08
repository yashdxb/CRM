namespace CRM.Enterprise.Api.Contracts.Workflows;

public sealed record WorkflowDefinitionResponse(
    string Key,
    string Name,
    bool IsActive,
    string DefinitionJson,
    DateTime? UpdatedAtUtc,
    string? PublishedDefinitionJson,
    DateTime? PublishedAtUtc,
    string? PublishedBy);

public sealed record WorkflowScopeOptionResponse(
    string Label,
    string Value);

public sealed record WorkflowScopeMetadataResponse(
    IReadOnlyList<WorkflowScopeOptionResponse> Modules,
    IReadOnlyList<WorkflowScopeOptionResponse> Pipelines,
    IReadOnlyList<WorkflowScopeOptionResponse> Stages,
    IReadOnlyList<WorkflowScopeOptionResponse> Triggers);

public sealed record SaveWorkflowDefinitionRequest(
    string DefinitionJson,
    bool IsActive,
    string? Operation);

public sealed record WorkflowValidationResponse(
    bool IsValid,
    IReadOnlyList<string> Errors);
