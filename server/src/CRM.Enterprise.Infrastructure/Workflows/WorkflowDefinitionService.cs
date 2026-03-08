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
    private const string SaveDraftOperation = "save-draft";
    private const string PublishOperation = "publish";
    private const string UnpublishOperation = "unpublish";
    private const string RevertDraftOperation = "revert-draft";

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

        var draftDefinition = ResolveDraftDefinition(tenant);
        var publishedDefinition = ResolvePublishedDefinition(tenant);
        var json = JsonSerializer.Serialize(draftDefinition, JsonOptions);

        return new WorkflowDefinitionDto(
            DealApprovalKey,
            "Deal Approval",
            publishedDefinition.Enabled,
            json,
            tenant.UpdatedAtUtc ?? tenant.CreatedAtUtc,
            publishedDefinition.Enabled ? JsonSerializer.Serialize(publishedDefinition, JsonOptions) : null,
            tenant.ApprovalWorkflowPublishedAtUtc,
            tenant.ApprovalWorkflowPublishedBy);
    }

    public async Task<WorkflowDefinitionDto> SaveAsync(
        string key,
        string definitionJson,
        bool isActive,
        string? operation,
        string? actorName = null,
        CancellationToken cancellationToken = default)
    {
        if (!IsSupportedKey(key))
        {
            throw new InvalidOperationException($"Unsupported workflow key '{key}'.");
        }

        var tenant = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, cancellationToken)
            ?? throw new InvalidOperationException("Tenant not found.");

        var parsed = JsonSerializer.Deserialize<DealApprovalWorkflowDefinition>(definitionJson, JsonOptions)
            ?? ResolveDraftDefinition(tenant);
        var normalizedDraft = DealApprovalWorkflowMapper.Normalize(parsed with { Enabled = false });
        var normalizedOperation = NormalizeOperation(operation, isActive);
        var nowUtc = DateTime.UtcNow;
        var actor = string.IsNullOrWhiteSpace(actorName) ? "system" : actorName.Trim();

        switch (normalizedOperation)
        {
            case SaveDraftOperation:
                tenant.ApprovalWorkflowDraftJson = JsonSerializer.Serialize(
                    normalizedDraft with
                    {
                        Enabled = false,
                        Scope = normalizedDraft.Scope with { Status = "draft" }
                    },
                    JsonOptions);
                tenant.UpdatedAtUtc = nowUtc;
                break;

            case PublishOperation:
            {
                var publishedCandidate = PreparePublishedDefinition(tenant, normalizedDraft);
                var validation = await ValidateAsync(
                    key,
                    JsonSerializer.Serialize(publishedCandidate, JsonOptions),
                    cancellationToken);
                if (!validation.IsValid)
                {
                    throw new InvalidOperationException(string.Join("; ", validation.Errors));
                }

                var publishedJson = JsonSerializer.Serialize(publishedCandidate, JsonOptions);
                tenant.ApprovalWorkflowDraftJson = publishedJson;
                tenant.ApprovalWorkflowPublishedJson = publishedJson;
                tenant.ApprovalWorkflowJson = publishedJson; // compatibility fallback for older runtime paths
                tenant.ApprovalWorkflowPublishedAtUtc = nowUtc;
                tenant.ApprovalWorkflowPublishedBy = actor;
                tenant.ApprovalApproverRole = publishedCandidate.Steps.FirstOrDefault()?.ApproverRole ?? tenant.ApprovalApproverRole;
                tenant.ApprovalAmountThreshold = publishedCandidate.Steps.FirstOrDefault()?.AmountThreshold ?? tenant.ApprovalAmountThreshold;
                tenant.UpdatedAtUtc = nowUtc;
                break;
            }

            case UnpublishOperation:
                tenant.ApprovalWorkflowDraftJson = JsonSerializer.Serialize(
                    normalizedDraft with
                    {
                        Enabled = false,
                        Scope = normalizedDraft.Scope with { Status = "draft" }
                    },
                    JsonOptions);
                tenant.ApprovalWorkflowPublishedJson = null;
                tenant.ApprovalWorkflowPublishedAtUtc = null;
                tenant.ApprovalWorkflowPublishedBy = null;
                tenant.UpdatedAtUtc = nowUtc;
                break;

            case RevertDraftOperation:
            {
                var published = ResolvePublishedDefinition(tenant);
                tenant.ApprovalWorkflowDraftJson = JsonSerializer.Serialize(
                    published.Enabled
                        ? published
                        : published with
                        {
                            Enabled = false,
                            Scope = published.Scope with { Status = "draft" }
                        },
                    JsonOptions);
                tenant.UpdatedAtUtc = nowUtc;
                break;
            }

            default:
                throw new InvalidOperationException($"Unsupported workflow operation '{normalizedOperation}'.");
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        var response = await GetAsync(key, cancellationToken)
            ?? throw new InvalidOperationException("Unable to load workflow definition after save.");

        return response;
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

    private static string NormalizeOperation(string? operation, bool isActive)
    {
        var normalized = operation?.Trim().ToLowerInvariant();
        if (string.IsNullOrWhiteSpace(normalized))
        {
            return isActive ? PublishOperation : SaveDraftOperation;
        }

        return normalized;
    }

    private static DealApprovalWorkflowDefinition ResolveDraftDefinition(Domain.Entities.Tenant tenant)
    {
        return DealApprovalWorkflowMapper.FromStoredJson(
            tenant.ApprovalWorkflowDraftJson ?? tenant.ApprovalWorkflowJson ?? tenant.ApprovalWorkflowPublishedJson,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole);
    }

    private static DealApprovalWorkflowDefinition ResolvePublishedDefinition(Domain.Entities.Tenant tenant)
    {
        return DealApprovalWorkflowMapper.FromStoredJson(
            tenant.ApprovalWorkflowPublishedJson ?? tenant.ApprovalWorkflowJson,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole);
    }

    private static DealApprovalWorkflowDefinition PreparePublishedDefinition(
        Domain.Entities.Tenant tenant,
        DealApprovalWorkflowDefinition draft)
    {
        var currentPublished = ResolvePublishedDefinition(tenant);
        var currentPublishedVersion = currentPublished.Enabled ? Math.Max(1, currentPublished.Scope.Version) : 0;
        var requestedVersion = Math.Max(1, draft.Scope.Version);
        var nextVersion = Math.Max(requestedVersion, currentPublishedVersion + 1);

        return DealApprovalWorkflowMapper.Normalize(
            draft with
            {
                Enabled = true,
                Scope = draft.Scope with
                {
                    Status = "published",
                    Version = nextVersion
                }
            });
    }
}
