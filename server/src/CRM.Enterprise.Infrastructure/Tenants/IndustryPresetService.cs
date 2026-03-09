using System.Text.Json;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Qualifications;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Tenants;

public sealed class IndustryPresetService : IIndustryPresetService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly CrmDbContext _dbContext;

    public IndustryPresetService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task ApplyPresetAsync(Guid tenantId, string presetId, bool resetExisting, CancellationToken cancellationToken = default)
    {
        var tenant = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken)
            ?? throw new InvalidOperationException("Tenant not found.");

        var normalizedPresetId = VerticalPresetIds.Normalize(presetId);
        var presetConfig = VerticalPresetDefaults.Create(normalizedPresetId);

        tenant.IndustryPreset = normalizedPresetId;
        tenant.VerticalPresetConfigJson = SerializeMergedPreset(tenant.VerticalPresetConfigJson, presetConfig, resetExisting);

        if (resetExisting || string.IsNullOrWhiteSpace(tenant.LeadDispositionPolicyJson))
        {
            tenant.LeadDispositionPolicyJson = JsonSerializer.Serialize(
                VerticalPresetDefaults.CreateLeadDispositionPolicy(normalizedPresetId),
                JsonOptions);
        }

        if (resetExisting || string.IsNullOrWhiteSpace(tenant.QualificationPolicyJson))
        {
            tenant.QualificationPolicyJson = JsonSerializer.Serialize(
                VerticalPresetDefaults.CreateQualificationPolicy(normalizedPresetId),
                JsonOptions);
        }

        ApplyStagePreset(tenantId, normalizedPresetId, resetExisting);
        tenant.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private void ApplyStagePreset(Guid tenantId, string presetId, bool resetExisting)
    {
        var existing = _dbContext.OpportunityStages
            .Where(stage => stage.TenantId == tenantId && !stage.IsDeleted)
            .OrderBy(stage => stage.Order)
            .ToList();
        var desired = VerticalPresetDefaults.CreateOpportunityStages(presetId).ToList();

        if (existing.Count > 0 && !resetExisting && !LooksLikeCoreDefaults(existing))
        {
            return;
        }

        if (resetExisting && LooksLikeCoreDefaults(existing))
        {
            SyncCoreStagesInPlace(existing, desired, tenantId);
            return;
        }

        var existingByName = existing
            .GroupBy(stage => stage.Name, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.OrderBy(stage => stage.Order).First(), StringComparer.OrdinalIgnoreCase);
        var now = DateTime.UtcNow;

        foreach (var stage in desired)
        {
            if (existingByName.TryGetValue(stage.Name, out var current))
            {
                current.Order = stage.Order;
                current.IsClosedStage = stage.IsClosedStage;
                current.ForecastCategory = stage.ForecastCategory;
                current.IsDeleted = false;
                current.DeletedAtUtc = null;
                current.UpdatedAtUtc = now;
                continue;
            }

            _dbContext.OpportunityStages.Add(new OpportunityStage
            {
                TenantId = tenantId,
                Name = stage.Name,
                Order = stage.Order,
                IsClosedStage = stage.IsClosedStage,
                ForecastCategory = stage.ForecastCategory,
                CreatedAtUtc = now
            });
        }

        if (!resetExisting)
        {
            return;
        }

        var desiredNames = desired
            .Select(stage => stage.Name)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);
        var referencedStageIds = _dbContext.Opportunities
            .Where(opportunity => opportunity.TenantId == tenantId && !opportunity.IsDeleted)
            .Select(opportunity => opportunity.StageId)
            .Concat(
                _dbContext.OpportunityStageHistories
                    .Where(history => history.TenantId == tenantId && !history.IsDeleted)
                    .Select(history => history.OpportunityStageId))
            .ToHashSet();

        foreach (var obsolete in existing.Where(stage => !desiredNames.Contains(stage.Name) || existingByName.GetValueOrDefault(stage.Name) != stage))
        {
            if (referencedStageIds.Contains(obsolete.Id))
            {
                continue;
            }

            obsolete.IsDeleted = true;
            obsolete.DeletedAtUtc = now;
            obsolete.UpdatedAtUtc = now;
        }
    }

    private void SyncCoreStagesInPlace(
        IReadOnlyList<OpportunityStage> existing,
        IReadOnlyList<OpportunityStagePresetDefinition> desired,
        Guid tenantId)
    {
        var now = DateTime.UtcNow;
        var existingOrdered = existing.OrderBy(stage => stage.Order).ToList();
        var sharedCount = Math.Min(existingOrdered.Count, desired.Count);

        for (var index = 0; index < sharedCount; index++)
        {
            var current = existingOrdered[index];
            var target = desired[index];
            current.Name = target.Name;
            current.Order = target.Order;
            current.IsClosedStage = target.IsClosedStage;
            current.ForecastCategory = target.ForecastCategory;
            current.IsDeleted = false;
            current.DeletedAtUtc = null;
            current.UpdatedAtUtc = now;
        }

        foreach (var target in desired.Skip(sharedCount))
        {
            _dbContext.OpportunityStages.Add(new OpportunityStage
            {
                TenantId = tenantId,
                Name = target.Name,
                Order = target.Order,
                IsClosedStage = target.IsClosedStage,
                ForecastCategory = target.ForecastCategory,
                CreatedAtUtc = now
            });
        }
    }

    private static string SerializeMergedPreset(string? existingJson, VerticalPresetConfiguration presetConfig, bool resetExisting)
    {
        if (resetExisting || string.IsNullOrWhiteSpace(existingJson))
        {
            return JsonSerializer.Serialize(presetConfig, JsonOptions);
        }

        try
        {
            var existing = JsonSerializer.Deserialize<VerticalPresetConfiguration>(existingJson, JsonOptions);
            if (existing is null || !string.Equals(existing.PresetId, presetConfig.PresetId, StringComparison.OrdinalIgnoreCase))
            {
                return JsonSerializer.Serialize(presetConfig, JsonOptions);
            }

            var merged = existing with
            {
                Vocabulary = existing.Vocabulary with
                {
                    LeadQualificationLabel = string.IsNullOrWhiteSpace(existing.Vocabulary.LeadQualificationLabel)
                        ? presetConfig.Vocabulary.LeadQualificationLabel
                        : existing.Vocabulary.LeadQualificationLabel,
                    OpportunitySingularLabel = string.IsNullOrWhiteSpace(existing.Vocabulary.OpportunitySingularLabel)
                        ? presetConfig.Vocabulary.OpportunitySingularLabel
                        : existing.Vocabulary.OpportunitySingularLabel,
                    OpportunityPluralLabel = string.IsNullOrWhiteSpace(existing.Vocabulary.OpportunityPluralLabel)
                        ? presetConfig.Vocabulary.OpportunityPluralLabel
                        : existing.Vocabulary.OpportunityPluralLabel,
                    PipelineLabel = string.IsNullOrWhiteSpace(existing.Vocabulary.PipelineLabel)
                        ? presetConfig.Vocabulary.PipelineLabel
                        : existing.Vocabulary.PipelineLabel,
                    QualificationGuidance = string.IsNullOrWhiteSpace(existing.Vocabulary.QualificationGuidance)
                        ? presetConfig.Vocabulary.QualificationGuidance
                        : existing.Vocabulary.QualificationGuidance
                },
                BrokerageLeadProfileCatalog = MergeCatalog(existing.BrokerageLeadProfileCatalog, presetConfig.BrokerageLeadProfileCatalog),
                DashboardPackDefaults = existing.DashboardPackDefaults.Count == 0 ? presetConfig.DashboardPackDefaults : existing.DashboardPackDefaults,
                ReportLibraryHighlights = existing.ReportLibraryHighlights.Count == 0 ? presetConfig.ReportLibraryHighlights : existing.ReportLibraryHighlights,
                WorkflowTemplateHighlights = existing.WorkflowTemplateHighlights.Count == 0 ? presetConfig.WorkflowTemplateHighlights : existing.WorkflowTemplateHighlights
            };

            return JsonSerializer.Serialize(merged, JsonOptions);
        }
        catch (JsonException)
        {
            return JsonSerializer.Serialize(presetConfig, JsonOptions);
        }
    }

    private static BrokerageLeadProfileCatalog MergeCatalog(BrokerageLeadProfileCatalog existing, BrokerageLeadProfileCatalog fallback)
    {
        return new BrokerageLeadProfileCatalog(
            existing.BuyerTypes.Count == 0 ? fallback.BuyerTypes : existing.BuyerTypes,
            existing.MotivationUrgencies.Count == 0 ? fallback.MotivationUrgencies : existing.MotivationUrgencies,
            existing.FinancingReadinessOptions.Count == 0 ? fallback.FinancingReadinessOptions : existing.FinancingReadinessOptions,
            existing.PreApprovalStatuses.Count == 0 ? fallback.PreApprovalStatuses : existing.PreApprovalStatuses,
            existing.PreferredAreas.Count == 0 ? fallback.PreferredAreas : existing.PreferredAreas,
            existing.PropertyTypes.Count == 0 ? fallback.PropertyTypes : existing.PropertyTypes,
            existing.BudgetBands.Count == 0 ? fallback.BudgetBands : existing.BudgetBands);
    }

    private static bool LooksLikeCoreDefaults(IReadOnlyList<OpportunityStage> stages)
    {
        var names = stages.Select(stage => stage.Name).ToArray();
        var core = VerticalPresetDefaults.CreateOpportunityStages(VerticalPresetIds.CoreCrm)
            .Select(stage => stage.Name)
            .ToArray();
        return names.SequenceEqual(core, StringComparer.OrdinalIgnoreCase);
    }
}
