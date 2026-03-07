using System.Text.Json;
using CRM.Enterprise.Application.Workflows;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Workflows;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Workflows;

public sealed class WorkflowDefinitionService : IWorkflowDefinitionService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private const string DealApprovalKey = "deal-approval";

    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public WorkflowDefinitionService(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    public async Task<WorkflowDefinitionDto?> GetAsync(string key, CancellationToken cancellationToken = default)
    {
        if (!IsSupportedKey(key))
        {
            return null;
        }

        var tenant = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, cancellationToken);
        if (tenant is null)
        {
            return null;
        }

        var definition = DealApprovalWorkflowMapper.FromStoredJson(
            tenant.ApprovalWorkflowJson,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole);

        var json = JsonSerializer.Serialize(definition, JsonOptions);

        return new WorkflowDefinitionDto(
            DealApprovalKey,
            "Deal Approval",
            definition.Enabled,
            json,
            tenant.UpdatedAtUtc ?? tenant.CreatedAtUtc);
    }

    public async Task<WorkflowDefinitionDto> SaveAsync(
        string key,
        string definitionJson,
        bool isActive,
        CancellationToken cancellationToken = default)
    {
        if (!IsSupportedKey(key))
        {
            throw new InvalidOperationException($"Unsupported workflow key '{key}'.");
        }

        var validation = await ValidateAsync(key, definitionJson, cancellationToken);
        if (!validation.IsValid)
        {
            throw new InvalidOperationException(string.Join("; ", validation.Errors));
        }

        var tenant = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, cancellationToken)
            ?? throw new InvalidOperationException("Tenant not found.");

        var parsed = JsonSerializer.Deserialize<DealApprovalWorkflowDefinition>(definitionJson, JsonOptions)
            ?? DealApprovalWorkflowDefinition.CreateTemplate(tenant.ApprovalApproverRole ?? string.Empty, tenant.ApprovalAmountThreshold);

        var normalized = DealApprovalWorkflowMapper.Normalize(parsed with { Enabled = isActive });

        tenant.ApprovalWorkflowJson = JsonSerializer.Serialize(normalized, JsonOptions);
        tenant.ApprovalApproverRole = normalized.Steps.FirstOrDefault()?.ApproverRole ?? tenant.ApprovalApproverRole;
        tenant.ApprovalAmountThreshold = normalized.Steps.FirstOrDefault()?.AmountThreshold ?? tenant.ApprovalAmountThreshold;
        tenant.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new WorkflowDefinitionDto(
            DealApprovalKey,
            "Deal Approval",
            normalized.Enabled,
            JsonSerializer.Serialize(normalized, JsonOptions),
            tenant.UpdatedAtUtc);
    }

    public Task<WorkflowValidationResultDto> ValidateAsync(string key, string definitionJson, CancellationToken cancellationToken = default)
    {
        if (!IsSupportedKey(key))
        {
            return Task.FromResult(new WorkflowValidationResultDto(false, new[] { $"Unsupported workflow key '{key}'." }));
        }

        if (string.IsNullOrWhiteSpace(definitionJson))
        {
            return Task.FromResult(new WorkflowValidationResultDto(false, new[] { "Workflow JSON is required." }));
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<DealApprovalWorkflowDefinition>(definitionJson, JsonOptions);
            if (parsed is null)
            {
                return Task.FromResult(new WorkflowValidationResultDto(false, new[] { "Invalid workflow JSON payload." }));
            }

            var errors = DealApprovalWorkflowMapper.ValidateStructure(parsed).ToList();
            var normalized = DealApprovalWorkflowMapper.Normalize(parsed);

            if (normalized.Enabled && normalized.Steps.Count == 0)
            {
                errors.Add("At least one approval step is required when the workflow is enabled.");
            }

            if (normalized.Connections.Count == 0)
            {
                errors.Add("At least one connection is required.");
            }

            return Task.FromResult(new WorkflowValidationResultDto(errors.Count == 0, errors));
        }
        catch (JsonException ex)
        {
            return Task.FromResult(new WorkflowValidationResultDto(false, new[] { $"Invalid workflow JSON: {ex.Message}" }));
        }
    }

    private static bool IsSupportedKey(string key)
    {
        return string.Equals(key?.Trim(), DealApprovalKey, StringComparison.OrdinalIgnoreCase);
    }
}
