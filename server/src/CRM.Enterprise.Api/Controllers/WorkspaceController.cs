using CRM.Enterprise.Api.Contracts.Workspace;
using CRM.Enterprise.Application.Approvals;
using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Application.Decisions;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Qualifications;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/workspace")]
public class WorkspaceController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IIndustryPresetService _industryPresetService;
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private static readonly HashSet<string> SupportedFeatureFlags = new(StringComparer.OrdinalIgnoreCase)
    {
        "properties",
        "auth.entra",
        "marketing.campaigns",
        "helpdesk.cases",
        "helpdesk.emailIntake",
        "helpdesk.realtime",
        "realtime.dashboard",
        "realtime.pipeline",
        "realtime.entityCrud",
        "realtime.importProgress",
        "realtime.recordPresence",
        "realtime.assistantStreaming",
        "ai.knowledgeSearch",
        WorkspaceEmailDeliveryFlags.Master,
        WorkspaceEmailDeliveryFlags.Invites,
        WorkspaceEmailDeliveryFlags.Security,
        WorkspaceEmailDeliveryFlags.Approvals,
        WorkspaceEmailDeliveryFlags.Proposals,
        WorkspaceEmailDeliveryFlags.Marketing,
        WorkspaceEmailDeliveryFlags.Notifications,
        WorkspaceEmailDeliveryFlags.Mailbox,
        WorkspaceEmailDeliveryFlags.StatusNotifications
    };

    public WorkspaceController(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IIndustryPresetService industryPresetService)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _industryPresetService = industryPresetService;
    }

    [HttpGet]
    public async Task<ActionResult<WorkspaceSettingsResponse>> GetSettings(CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);

        if (tenant is null)
        {
            return NotFound();
        }

        return Ok(new WorkspaceSettingsResponse(
            tenant.Id,
            tenant.Key,
            tenant.Name,
            tenant.TimeZone,
            tenant.Currency,
            tenant.IndustryPreset,
            ResolveVerticalPresetConfiguration(tenant),
            tenant.LeadFirstTouchSlaHours,
            tenant.DefaultContractTermMonths,
            tenant.DefaultDeliveryOwnerRoleId,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole,
            ResolveApprovalWorkflowPolicy(tenant),
            ResolveQualificationPolicy(tenant),
            ResolveLeadDispositionPolicy(tenant),
            ResolveAssistantActionScoringPolicy(tenant),
            ResolveDecisionEscalationPolicy(tenant),
            ResolveSupportingDocumentPolicy(tenant),
            ResolveDealHealthScoringPolicy(tenant),
            ResolveRecordNumberingPolicies(tenant),
            ResolveFeatureFlags(tenant),
            tenant.ReportDesignerRequiredPermission));
    }

    [HttpPut]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<WorkspaceSettingsResponse>> UpdateSettings(
        [FromBody] UpdateWorkspaceSettingsRequest request,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var tenant = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);
        if (tenant is null)
        {
            return NotFound();
        }

        tenant.Name = request.Name.Trim();
        tenant.TimeZone = request.TimeZone.Trim();
        tenant.Currency = request.Currency.Trim();
        tenant.IndustryPreset = VerticalPresetIds.Normalize(request.IndustryPreset ?? tenant.IndustryPreset);
        tenant.LeadFirstTouchSlaHours = request.LeadFirstTouchSlaHours;
        tenant.DefaultContractTermMonths = request.DefaultContractTermMonths;
        tenant.DefaultDeliveryOwnerRoleId = request.DefaultDeliveryOwnerRoleId;
        tenant.ApprovalAmountThreshold = request.ApprovalAmountThreshold;
        tenant.ApprovalApproverRole = string.IsNullOrWhiteSpace(request.ApprovalApproverRole)
            ? null
            : request.ApprovalApproverRole.Trim();
        if (request.ApprovalWorkflowPolicy is not null)
        {
            tenant.ApprovalWorkflowJson = JsonSerializer.Serialize(request.ApprovalWorkflowPolicy, JsonOptions);
        }
        if (request.QualificationPolicy is not null)
        {
            tenant.QualificationPolicyJson = JsonSerializer.Serialize(request.QualificationPolicy, JsonOptions);
        }
        if (request.LeadDispositionPolicy is not null)
        {
                tenant.LeadDispositionPolicyJson = JsonSerializer.Serialize(
                    LeadDispositionPolicyCatalog.Normalize(request.LeadDispositionPolicy),
                    JsonOptions);
        }
        if (request.AssistantActionScoringPolicy is not null)
        {
            tenant.AssistantActionScoringPolicyJson = JsonSerializer.Serialize(request.AssistantActionScoringPolicy, JsonOptions);
        }
        if (request.DecisionEscalationPolicy is not null)
        {
            tenant.DecisionEscalationPolicyJson = JsonSerializer.Serialize(
                DecisionEscalationPolicyDefaults.Normalize(request.DecisionEscalationPolicy),
                JsonOptions);
        }
        if (request.SupportingDocumentPolicy is not null)
        {
            tenant.SupportingDocumentPolicyJson = JsonSerializer.Serialize(
                SupportingDocumentPolicyDefaults.Normalize(request.SupportingDocumentPolicy),
                JsonOptions);
        }
        if (request.DealHealthScoringPolicy is not null)
        {
            tenant.DealHealthScoringPolicyJson = JsonSerializer.Serialize(
                DealHealthScoringPolicyDefaults.Normalize(request.DealHealthScoringPolicy),
                JsonOptions);
        }
        if (request.RecordNumberingPolicies is not null)
        {
            tenant.RecordNumberingPolicyJson = JsonSerializer.Serialize(
                RecordNumberingPolicyDefaults.Normalize(request.RecordNumberingPolicies),
                JsonOptions);
        }
        if (request.FeatureFlags is not null)
        {
            tenant.FeatureFlagsJson = JsonSerializer.Serialize(
                NormalizeFeatureFlags(request.FeatureFlags),
                JsonOptions);
        }
        if (request.ReportDesignerRequiredPermission is not null)
        {
            tenant.ReportDesignerRequiredPermission = string.IsNullOrWhiteSpace(request.ReportDesignerRequiredPermission)
                ? null
                : request.ReportDesignerRequiredPermission.Trim();
        }
        tenant.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new WorkspaceSettingsResponse(
            tenant.Id,
            tenant.Key,
            tenant.Name,
            tenant.TimeZone,
            tenant.Currency,
            tenant.IndustryPreset,
            ResolveVerticalPresetConfiguration(tenant),
            tenant.LeadFirstTouchSlaHours,
            tenant.DefaultContractTermMonths,
            tenant.DefaultDeliveryOwnerRoleId,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole,
            ResolveApprovalWorkflowPolicy(tenant),
            ResolveQualificationPolicy(tenant),
            ResolveLeadDispositionPolicy(tenant),
            ResolveAssistantActionScoringPolicy(tenant),
            ResolveDecisionEscalationPolicy(tenant),
            ResolveSupportingDocumentPolicy(tenant),
            ResolveDealHealthScoringPolicy(tenant),
            ResolveRecordNumberingPolicies(tenant),
            ResolveFeatureFlags(tenant),
            tenant.ReportDesignerRequiredPermission));
    }

    [HttpPost("vertical-preset")]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<WorkspaceSettingsResponse>> ApplyVerticalPreset(
        [FromBody] ApplyVerticalPresetRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.PresetId))
        {
            return BadRequest(new { message = "Preset id is required." });
        }

        var tenantId = _tenantProvider.TenantId;
        await _industryPresetService.ApplyPresetAsync(tenantId, request.PresetId, request.ResetExisting, cancellationToken);

        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);

        if (tenant is null)
        {
            return NotFound();
        }

        return Ok(new WorkspaceSettingsResponse(
            tenant.Id,
            tenant.Key,
            tenant.Name,
            tenant.TimeZone,
            tenant.Currency,
            tenant.IndustryPreset,
            ResolveVerticalPresetConfiguration(tenant),
            tenant.LeadFirstTouchSlaHours,
            tenant.DefaultContractTermMonths,
            tenant.DefaultDeliveryOwnerRoleId,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole,
            ResolveApprovalWorkflowPolicy(tenant),
            ResolveQualificationPolicy(tenant),
            ResolveLeadDispositionPolicy(tenant),
            ResolveAssistantActionScoringPolicy(tenant),
            ResolveDecisionEscalationPolicy(tenant),
            ResolveSupportingDocumentPolicy(tenant),
            ResolveDealHealthScoringPolicy(tenant),
            ResolveRecordNumberingPolicies(tenant),
            ResolveFeatureFlags(tenant),
            tenant.ReportDesignerRequiredPermission));
    }

    private static QualificationPolicy ResolveQualificationPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.QualificationPolicyJson))
        {
            return QualificationPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<QualificationPolicy>(tenant.QualificationPolicyJson, JsonOptions);
            return QualificationPolicyDefaults.Normalize(parsed);
        }
        catch (JsonException)
        {
            return QualificationPolicyDefaults.CreateDefault();
        }
    }

    private static ApprovalWorkflowPolicy ResolveApprovalWorkflowPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.ApprovalWorkflowJson))
        {
            return ApprovalWorkflowPolicyDefaults.FromTenantDefaults(
                tenant.ApprovalAmountThreshold,
                tenant.ApprovalApproverRole);
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<ApprovalWorkflowPolicy>(tenant.ApprovalWorkflowJson, JsonOptions);
            return parsed ?? ApprovalWorkflowPolicyDefaults.FromTenantDefaults(
                tenant.ApprovalAmountThreshold,
                tenant.ApprovalApproverRole);
        }
        catch (JsonException)
        {
            return ApprovalWorkflowPolicyDefaults.FromTenantDefaults(
                tenant.ApprovalAmountThreshold,
                tenant.ApprovalApproverRole);
        }
    }

    private static AssistantActionScoringPolicy ResolveAssistantActionScoringPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.AssistantActionScoringPolicyJson))
        {
            return AssistantActionScoringPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<AssistantActionScoringPolicy>(tenant.AssistantActionScoringPolicyJson, JsonOptions);
            return AssistantActionScoringPolicyDefaults.Normalize(parsed);
        }
        catch (JsonException)
        {
            return AssistantActionScoringPolicyDefaults.CreateDefault();
        }
    }

    private static IReadOnlyList<RecordNumberingPolicy> ResolveRecordNumberingPolicies(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.RecordNumberingPolicyJson))
        {
            return RecordNumberingPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<IReadOnlyList<RecordNumberingPolicy>>(tenant.RecordNumberingPolicyJson, JsonOptions);
            return RecordNumberingPolicyDefaults.Normalize(parsed);
        }
        catch (JsonException)
        {
            return RecordNumberingPolicyDefaults.CreateDefault();
        }
    }

    private static LeadDispositionPolicy ResolveLeadDispositionPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.LeadDispositionPolicyJson))
        {
            return LeadDispositionPolicyCatalog.Normalize(null);
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<LeadDispositionPolicy>(tenant.LeadDispositionPolicyJson, JsonOptions);
            return LeadDispositionPolicyCatalog.Normalize(parsed);
        }
        catch (JsonException)
        {
            return LeadDispositionPolicyCatalog.Normalize(null);
        }
    }

    private static VerticalPresetConfiguration ResolveVerticalPresetConfiguration(Tenant tenant)
    {
        if (!string.IsNullOrWhiteSpace(tenant.VerticalPresetConfigJson))
        {
            try
            {
                var parsed = JsonSerializer.Deserialize<VerticalPresetConfiguration>(tenant.VerticalPresetConfigJson, JsonOptions);
                if (parsed is not null)
                {
                    return parsed;
                }
            }
            catch (JsonException)
            {
            }
        }

        return VerticalPresetDefaults.Create(tenant.IndustryPreset);
    }

    private static DecisionEscalationPolicy ResolveDecisionEscalationPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.DecisionEscalationPolicyJson))
        {
            return DecisionEscalationPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<DecisionEscalationPolicy>(tenant.DecisionEscalationPolicyJson, JsonOptions);
            return DecisionEscalationPolicyDefaults.Normalize(parsed);
        }
        catch (JsonException)
        {
            return DecisionEscalationPolicyDefaults.CreateDefault();
        }
    }

    private static SupportingDocumentPolicy ResolveSupportingDocumentPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.SupportingDocumentPolicyJson))
        {
            return SupportingDocumentPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<SupportingDocumentPolicy>(tenant.SupportingDocumentPolicyJson, JsonOptions);
            return SupportingDocumentPolicyDefaults.Normalize(parsed);
        }
        catch (JsonException)
        {
            return SupportingDocumentPolicyDefaults.CreateDefault();
        }
    }

    private static IReadOnlyDictionary<string, bool>? ResolveFeatureFlags(Tenant tenant)
    {
        var defaults = new Dictionary<string, bool>(StringComparer.OrdinalIgnoreCase);
        if (string.Equals(tenant.IndustryPreset, VerticalPresetIds.RealEstateBrokerage, StringComparison.OrdinalIgnoreCase))
        {
            defaults["properties"] = true;
        }

        defaults[WorkspaceEmailDeliveryFlags.Master] = false;
        defaults[WorkspaceEmailDeliveryFlags.Invites] = false;
        defaults[WorkspaceEmailDeliveryFlags.Security] = false;
        defaults[WorkspaceEmailDeliveryFlags.Approvals] = false;
        defaults[WorkspaceEmailDeliveryFlags.Proposals] = false;
        defaults[WorkspaceEmailDeliveryFlags.Marketing] = false;
        defaults[WorkspaceEmailDeliveryFlags.Notifications] = false;
        defaults[WorkspaceEmailDeliveryFlags.Mailbox] = false;
        defaults[WorkspaceEmailDeliveryFlags.StatusNotifications] = false;

        if (string.IsNullOrWhiteSpace(tenant.FeatureFlagsJson))
        {
            return defaults.Count == 0 ? null : defaults;
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<Dictionary<string, bool>>(tenant.FeatureFlagsJson, JsonOptions);
            if (parsed is null || parsed.Count == 0)
            {
                return defaults.Count == 0 ? null : defaults;
            }

            foreach (var (key, value) in defaults)
            {
                if (!parsed.ContainsKey(key))
                {
                    parsed[key] = value;
                }
            }

            return NormalizeFeatureFlags(parsed);
        }
        catch (JsonException)
        {
            return defaults.Count == 0 ? null : defaults;
        }
    }

    private static Dictionary<string, bool> NormalizeFeatureFlags(IReadOnlyDictionary<string, bool> source)
    {
        var result = new Dictionary<string, bool>(StringComparer.OrdinalIgnoreCase);
        foreach (var (key, value) in source)
        {
            if (!SupportedFeatureFlags.Contains(key))
            {
                continue;
            }

            result[key] = value;
        }

        return result;
    }

    private static DealHealthScoringPolicy ResolveDealHealthScoringPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.DealHealthScoringPolicyJson))
        {
            return DealHealthScoringPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<DealHealthScoringPolicy>(tenant.DealHealthScoringPolicyJson, JsonOptions);
            return DealHealthScoringPolicyDefaults.Normalize(parsed);
        }
        catch (JsonException)
        {
            return DealHealthScoringPolicyDefaults.CreateDefault();
        }
    }
}
