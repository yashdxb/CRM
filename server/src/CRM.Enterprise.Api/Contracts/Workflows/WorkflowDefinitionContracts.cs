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

public sealed record SaveWorkflowDefinitionRequest(
    string DefinitionJson,
    bool IsActive,
    string? Operation);

public sealed record WorkflowValidationResponse(
    bool IsValid,
    IReadOnlyList<string> Errors);
