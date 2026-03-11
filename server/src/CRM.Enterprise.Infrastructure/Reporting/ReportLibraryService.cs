using CRM.Enterprise.Application.Reporting;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Reporting;

public sealed class ReportLibraryService : IReportLibraryService
{
    private const string CrmCategoryName = "CRM";

    private static readonly IReadOnlyList<ReportTemplateDefinition> Templates =
    [
        new(
            "Pipeline by Stage",
            "Open pipeline grouped by sales stage.",
            10,
            [
                DateRangeFilter("DateFrom", "DateTo", "Date range"),
                OwnerFilter(),
                StageFilter()
            ]),
        new(
            "Open Opportunities by Owner",
            "Current open opportunities by owner, stage, and close date.",
            20,
            [
                OwnerFilter(),
                StageFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Date range")
            ]),
        new(
            "Pending Deal Approval",
            "Current approval queue with requester, approver, and aging.",
            30,
            [
                OwnerFilter(),
                ApprovalStatusFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Requested date")
            ]),
        new(
            "Lead Conversion Summary",
            "Lead creation, qualification, and conversion performance by owner and source.",
            40,
            [
                OwnerFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Lead created date"),
                ReportParameterFilter("LeadSource", "Lead source", "leadSource", "report-parameter")
            ]),
        new(
            "Sales Activities by Owner",
            "Activity volume, overdue follow-up, and completion rate by owner.",
            50,
            [
                OwnerFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Activity date"),
                StatusFilter()
            ]),
        new(
            "Forecast Summary",
            "Weighted pipeline and open value grouped by forecast bucket.",
            60,
            [
                OwnerFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Expected close date"),
                StageFilter()
            ]),
        new(
            "Pipeline Stage Mix",
            "Visual pipeline mix by stage using value, deal count, and share of open pipeline.",
            65,
            [
                DateRangeFilter("DateFrom", "DateTo", "Date range"),
                OwnerFilter(),
                StageFilter()
            ]),
        new(
            "Revenue and Conversion Trend",
            "Monthly revenue and lead conversion trend for sales leadership.",
            75,
            [
                DateRangeFilter("DateFrom", "DateTo", "Period"),
                OwnerFilter()
            ]),
        new(
            "Lead Quality vs Conversation Signal",
            "Scatter view of qualification score versus conversation score to expose outliers and coaching gaps.",
            145,
            [
                OwnerFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Lead created date"),
                ReportParameterFilter("LeadSource", "Lead source", "leadSource", "report-parameter")
            ]),
        new(
            "CQVS Readiness Heatmap",
            "Factor-by-readiness heatmap showing where CQVS evidence is weak across the lead funnel.",
            146,
            [
                OwnerFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Lead created date"),
                ReportParameterFilter("LeadSource", "Lead source", "leadSource", "report-parameter")
            ]),
        new(
            "Manager Pipeline Health",
            "Stage-level pipeline health with stale deal count, average age, and weighted exposure.",
            211,
            [
                OwnerFilter(),
                StageFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Period")
            ]),
        new(
            "Forecast Distribution",
            "Forecast bucket distribution using open value and weighted pipeline share.",
            212,
            [
                OwnerFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Expected close date"),
                StageFilter()
            ]),
        new(
            "Revenue Forecast",
            "Projected and weighted revenue forecast grouped by period.",
            70,
            [
                DateRangeFilter("DateFrom", "DateTo", "Forecast period"),
                OwnerFilter(),
                StageFilter()
            ]),
        new(
            "Win Loss Analysis",
            "Won vs lost opportunities with win rate, deal size, and top reasons.",
            80,
            [
                DateRangeFilter("DateFrom", "DateTo", "Close date"),
                OwnerFilter(),
                StageFilter()
            ]),
        new(
            "Sales Cycle Duration",
            "Average days in each sales stage and by owner.",
            90,
            [
                DateRangeFilter("DateFrom", "DateTo", "Close date"),
                OwnerFilter(),
                StageFilter()
            ]),
        new(
            "Top Deals",
            "Highest-value open opportunities ranked by deal amount.",
            100,
            [
                OwnerFilter(),
                StageFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Expected close date")
            ]),
        new(
            "Lead Conversion Funnel",
            "Lead volume at each funnel stage from new to converted.",
            110,
            [
                DateRangeFilter("DateFrom", "DateTo", "Lead created date"),
                OwnerFilter()
            ]),
        new(
            "Lead Source Performance",
            "Lead count and conversion rate by source channel.",
            120,
            [
                DateRangeFilter("DateFrom", "DateTo", "Lead created date"),
                OwnerFilter(),
                ReportParameterFilter("LeadSource", "Lead source", "leadSource", "report-parameter")
            ]),
        new(
            "Lead Aging",
            "Open leads grouped by age bucket showing stale pipeline risk.",
            130,
            [
                OwnerFilter(),
                ReportParameterFilter("LeadSource", "Lead source", "leadSource", "report-parameter")
            ]),
        new(
            "Lead Score Distribution",
            "Distribution of AI-assigned lead scores across the pipeline.",
            140,
            [
                OwnerFilter(),
                ReportParameterFilter("LeadSource", "Lead source", "leadSource", "report-parameter")
            ]),
        new(
            "Activity Summary",
            "Activity volume by type, owner, and monthly trend.",
            150,
            [
                DateRangeFilter("DateFrom", "DateTo", "Activity date"),
                OwnerFilter(),
                StatusFilter()
            ]),
        new(
            "Team Performance",
            "Team member performance: deals won, revenue, activities, and conversion rate.",
            160,
            [
                DateRangeFilter("DateFrom", "DateTo", "Period"),
                OwnerFilter()
            ]),
        new(
            "Customer Growth",
            "New customer acquisition trend by month and industry breakdown.",
            170,
            [
                DateRangeFilter("DateFrom", "DateTo", "Customer created date")
            ]),
        new(
            "Customer Revenue Concentration",
            "Top customers ranked by revenue contribution and share of total.",
            180,
            [
                DateRangeFilter("DateFrom", "DateTo", "Period"),
                OwnerFilter()
            ]),
        new(
            "Campaign ROI",
            "Campaign spend, revenue, ROI, leads generated, and cost per lead.",
            190,
            [
                DateRangeFilter("DateFrom", "DateTo", "Campaign date")
            ]),
        new(
            "Email Engagement",
            "Email send volume, open rates, click rates, bounces, and unsubscribes.",
            200,
            [
                DateRangeFilter("DateFrom", "DateTo", "Send date")
            ]),
        new(
            "Pipeline Health Scorecard",
            "Pipeline value, weighted forecast, deal aging, stale deals, and coverage ratio by stage.",
            210,
            [
                OwnerFilter(),
                StageFilter(),
                DateRangeFilter("DateFrom", "DateTo", "Period")
            ])
    ];

    private readonly IReportServerClient _reportServerClient;
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public ReportLibraryService(IReportServerClient reportServerClient, CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _reportServerClient = reportServerClient;
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    public async Task<IReadOnlyList<ReportLibraryItemDto>> GetLibraryAsync(CancellationToken ct = default)
    {
        var tenantPreset = await _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == _tenantProvider.TenantId)
            .Select(t => t.IndustryPreset)
            .FirstOrDefaultAsync(ct);

        var templates = ResolveTemplatesForPreset(tenantPreset);
        var stageOptions = await BuildStageOptionsAsync(ct);
        var pipelineOptions = BuildPipelineOptions();
        var statusOptions = BuildStatusOptions();
        var approvalStatusOptions = BuildApprovalStatusOptions();

        List<ReportLibraryItemDto> results;

        if (_reportServerClient.IsConfigured)
        {
            var reportCatalog = await _reportServerClient.GetCatalogAsync(ct);
            if (reportCatalog.Count == 0)
                return [];

            var availableByName = reportCatalog
                .Where(item => string.Equals(item.CategoryName?.Trim(), CrmCategoryName, StringComparison.OrdinalIgnoreCase))
                .ToDictionary(item => item.Name.Trim(), item => item, StringComparer.OrdinalIgnoreCase);

            results = new List<ReportLibraryItemDto>();

            foreach (var template in templates)
            {
                if (!availableByName.TryGetValue(template.Name, out var report))
                    continue;

                results.Add(BuildItem(template, report.Id, report.Name,
                    string.IsNullOrWhiteSpace(report.Description) ? template.Description : report.Description,
                    report.CategoryId, report.CategoryName, report.Extension,
                    report.CreatedOn, report.ModifiedOn,
                    stageOptions, pipelineOptions, statusOptions, approvalStatusOptions));
            }
        }
        else
        {
            // Embedded mode: build library items directly from templates
            var now = DateTimeOffset.UtcNow;
            results = templates.Select(template =>
                BuildItem(template,
                    template.Name.ToLowerInvariant().Replace(' ', '-'),
                    template.Name,
                    template.Description,
                    CrmCategoryName.ToLowerInvariant(),
                    CrmCategoryName,
                    ".trdp",
                    now, now,
                    stageOptions, pipelineOptions, statusOptions, approvalStatusOptions))
                .ToList();
        }

        return results
            .OrderBy(item => item.SortOrder)
            .ThenBy(item => item.Name, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static ReportLibraryItemDto BuildItem(
        ReportTemplateDefinition template,
        string id, string name, string description,
        string categoryId, string categoryName, string extension,
        DateTimeOffset createdOn, DateTimeOffset modifiedOn,
        IReadOnlyList<ReportParameterOptionDto> stageOptions,
        IReadOnlyList<ReportParameterOptionDto> pipelineOptions,
        IReadOnlyList<ReportParameterOptionDto> statusOptions,
        IReadOnlyList<ReportParameterOptionDto> approvalStatusOptions)
    {
        return new ReportLibraryItemDto(
            id, name, description,
            categoryId, categoryName, extension,
            createdOn, modifiedOn,
            template.SortOrder,
            template.Filters.Select(filter => filter switch
            {
                { Kind: "stage" } => filter with { Options = stageOptions },
                { Kind: "pipeline" } => filter with { Options = pipelineOptions },
                { Kind: "status" } => filter with { Options = statusOptions },
                { Kind: "approvalStatus" } => filter with { Options = approvalStatusOptions },
                _ => filter
            }).ToList());
    }

    private async Task<IReadOnlyList<ReportParameterOptionDto>> BuildStageOptionsAsync(CancellationToken ct)
    {
        var stageRows = await _dbContext.OpportunityStages
            .AsNoTracking()
            .OrderBy(stage => stage.Order)
            .Select(stage => new { stage.Name, stage.Order })
            .ToListAsync(ct);

        var options = stageRows
            .Where(stage => !string.IsNullOrWhiteSpace(stage.Name))
            .GroupBy(stage => stage.Name.Trim(), StringComparer.OrdinalIgnoreCase)
            .OrderBy(group => group.Min(stage => stage.Order))
            .ThenBy(group => group.Key, StringComparer.OrdinalIgnoreCase)
            .Select(group => new ReportParameterOptionDto(group.Key, group.Key))
            .ToList();

        return [new ReportParameterOptionDto(string.Empty, "All stages"), .. options];
    }

    private static IReadOnlyList<ReportParameterOptionDto> BuildPipelineOptions()
        => [new(string.Empty, "All pipelines"), new("default", "Default pipeline")];

    private static IReadOnlyList<ReportParameterOptionDto> BuildStatusOptions()
        => [new(string.Empty, "All activity states"), new("Open", "Open"), new("Completed", "Completed"), new("Overdue", "Overdue")];

    private static IReadOnlyList<ReportParameterOptionDto> BuildApprovalStatusOptions()
        => [new(string.Empty, "All approval states"), new("Pending", "Pending"), new("Submitted", "Submitted"), new("Approved", "Approved"), new("Rejected", "Rejected"), new("Cancelled", "Cancelled")];

    private static ReportLibraryFilterDto OwnerFilter()
        => ReportParameterFilter("OwnerUserId", "Owner", "owner", "report-parameter");

    private static ReportLibraryFilterDto StageFilter()
        => new(
            "stage",
            "Stage",
            "stage",
            false,
            "Stage",
            null,
            "stage-metadata",
            "Select stage",
            string.Empty,
            null,
            []);

    private static ReportLibraryFilterDto StatusFilter()
        => new(
            "status",
            "Status",
            "status",
            false,
            "Status",
            null,
            "static",
            "Select status",
            string.Empty,
            null,
            []);

    private static ReportLibraryFilterDto ApprovalStatusFilter()
        => new(
            "approvalStatus",
            "Approval status",
            "approvalStatus",
            false,
            "ApprovalStatus",
            null,
            "static",
            "Select approval status",
            string.Empty,
            null,
            []);

    private static ReportLibraryFilterDto DateRangeFilter(string fromParameter, string toParameter, string label)
        => new(
            "dateRange",
            label,
            "dateRange",
            false,
            fromParameter,
            toParameter,
            null,
            null,
            DateOnly.FromDateTime(new DateTime(DateTime.UtcNow.Year, 1, 1)).ToString("yyyy-MM-dd"),
            DateOnly.FromDateTime(DateTime.UtcNow).ToString("yyyy-MM-dd"),
            []);

    private static ReportLibraryFilterDto ReportParameterFilter(
        string parameterName,
        string label,
        string kind,
        string optionSource)
        => new(
            parameterName,
            label,
            kind,
            false,
            parameterName,
            null,
            optionSource,
            $"Select {label.ToLowerInvariant()}",
            string.Empty,
            null,
            []);

    private sealed record ReportTemplateDefinition(
        string Name,
        string Description,
        int SortOrder,
        IReadOnlyList<ReportLibraryFilterDto> Filters);

    private static IReadOnlyList<ReportTemplateDefinition> ResolveTemplatesForPreset(string? presetId)
    {
        if (VerticalPresetIds.Normalize(presetId) != VerticalPresetIds.RealEstateBrokerage)
        {
            return Templates;
        }

        return Templates.Select(template => template.Name switch
        {
            "Pipeline by Stage" => template with { Description = "Open buyer and seller pipeline grouped by transaction stage." },
            "Open Opportunities by Owner" => template with { Description = "Active transactions by agent, stage, and expected close date." },
            "Pending Deal Approval" => template with { Description = "Approvals queue for low-readiness conversions and transaction exceptions." },
            "Lead Conversion Summary" => template with { Description = "Inquiry, qualification, and transaction conversion by agent and source." },
            "Sales Activities by Owner" => template with { Description = "Showings, calls, meetings, and overdue follow-up by agent." },
            "Forecast Summary" => template with { Description = "Expected closings and weighted transaction value by stage and close window." },
            "Pipeline Stage Mix" => template with { Description = "Visual mix of active transactions by stage, value, and share." },
            "Revenue and Conversion Trend" => template with { Description = "Monthly closings revenue and inquiry-to-transaction trend." },
            "Lead Quality vs Conversation Signal" => template with { Description = "Buyer-readiness versus conversation momentum by inquiry." },
            "CQVS Readiness Heatmap" => template with { Description = "CQVS factor heatmap showing weak readiness signals by inquiry." },
            "Manager Pipeline Health" => template with { Description = "Transaction-stage health with stale listings, age, and weighted exposure." },
            "Forecast Distribution" => template with { Description = "Forecast mix across active transactions and expected close windows." },
            _ => template
        }).ToList();
    }
}
