using CRM.Enterprise.Api.Contracts.Workflows;
using CRM.Enterprise.Application.Workflows;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/workflows/definitions")]
public sealed class WorkflowDefinitionsController : ControllerBase
{
    private readonly IWorkflowDefinitionService _service;

    public WorkflowDefinitionsController(IWorkflowDefinitionService service)
    {
        _service = service;
    }

    [HttpGet("{key}")]
    public async Task<ActionResult<WorkflowDefinitionResponse>> Get(string key, CancellationToken cancellationToken)
    {
        var definition = await _service.GetAsync(key, cancellationToken);
        if (definition is null)
        {
            return NotFound();
        }

        return Ok(new WorkflowDefinitionResponse(
            definition.Key,
            definition.Name,
            definition.IsActive,
            definition.DefinitionJson,
            definition.UpdatedAtUtc,
            definition.PublishedDefinitionJson,
            definition.PublishedAtUtc,
            definition.PublishedBy));
    }

    [HttpGet("{key}/metadata")]
    public async Task<ActionResult<WorkflowScopeMetadataResponse>> GetMetadata(string key, CancellationToken cancellationToken)
    {
        var metadata = await _service.GetMetadataAsync(key, cancellationToken);
        if (metadata is null)
        {
            return NotFound();
        }

        return Ok(new WorkflowScopeMetadataResponse(
            metadata.Modules.Select(option => new WorkflowScopeOptionResponse(option.Label, option.Value)).ToArray(),
            metadata.Pipelines.Select(option => new WorkflowScopeOptionResponse(option.Label, option.Value)).ToArray(),
            metadata.Stages.Select(option => new WorkflowScopeOptionResponse(option.Label, option.Value)).ToArray(),
            metadata.Triggers.Select(option => new WorkflowScopeOptionResponse(option.Label, option.Value)).ToArray()));
    }

    [HttpPut("{key}")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<WorkflowDefinitionResponse>> Save(
        string key,
        [FromBody] SaveWorkflowDefinitionRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var definition = await _service.SaveAsync(
                key,
                request.DefinitionJson,
                request.IsActive,
                request.Operation,
                User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name,
                cancellationToken);
            return Ok(new WorkflowDefinitionResponse(
                definition.Key,
                definition.Name,
                definition.IsActive,
                definition.DefinitionJson,
                definition.UpdatedAtUtc,
                definition.PublishedDefinitionJson,
                definition.PublishedAtUtc,
                definition.PublishedBy));
        }
        catch (InvalidOperationException ex)
        {
            var errors = ex.Message
                .Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            return BadRequest(errors.Length == 0 ? new[] { "Unable to save workflow." } : errors);
        }
    }

    [HttpPost("{key}/validate")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<WorkflowValidationResponse>> Validate(
        string key,
        [FromBody] SaveWorkflowDefinitionRequest request,
        CancellationToken cancellationToken)
    {
        var validation = await _service.ValidateAsync(key, request.DefinitionJson, cancellationToken);
        return Ok(new WorkflowValidationResponse(validation.IsValid, validation.Errors));
    }
}
