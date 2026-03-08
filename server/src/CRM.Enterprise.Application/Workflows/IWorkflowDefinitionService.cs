namespace CRM.Enterprise.Application.Workflows;

public interface IWorkflowDefinitionService
{
    Task<WorkflowDefinitionDto?> GetAsync(string key, CancellationToken cancellationToken = default);
    Task<WorkflowScopeMetadataDto?> GetMetadataAsync(string key, CancellationToken cancellationToken = default);
    Task<WorkflowDefinitionDto> SaveAsync(string key, string definitionJson, bool isActive, string? operation, string? actorName = null, CancellationToken cancellationToken = default);
    Task<WorkflowValidationResultDto> ValidateAsync(string key, string definitionJson, CancellationToken cancellationToken = default);
}
