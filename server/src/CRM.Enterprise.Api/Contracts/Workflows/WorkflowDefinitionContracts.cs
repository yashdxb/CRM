namespace CRM.Enterprise.Api.Contracts.Workflows;

public sealed record WorkflowDefinitionResponse(
    string Key,
    string Name,
    bool IsActive,
    string DefinitionJson,
    DateTime? UpdatedAtUtc);

public sealed record SaveWorkflowDefinitionRequest(
    string DefinitionJson,
    bool IsActive);

public sealed record WorkflowValidationResponse(
    bool IsValid,
    IReadOnlyList<string> Errors);
