using CRM.Enterprise.Application.Reporting;
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
            ])
    ];

    private readonly IReportServerClient _reportServerClient;
    private readonly CrmDbContext _dbContext;

    public ReportLibraryService(IReportServerClient reportServerClient, CrmDbContext dbContext)
    {
        _reportServerClient = reportServerClient;
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<ReportLibraryItemDto>> GetLibraryAsync(CancellationToken ct = default)
    {
        if (!_reportServerClient.IsConfigured)
        {
            return [];
        }

        var reportCatalog = await _reportServerClient.GetCatalogAsync(ct);
        if (reportCatalog.Count == 0)
        {
            return [];
        }

        var stageOptions = await BuildStageOptionsAsync(ct);
        var pipelineOptions = BuildPipelineOptions();
        var statusOptions = BuildStatusOptions();
        var approvalStatusOptions = BuildApprovalStatusOptions();

        var availableByName = reportCatalog
            .Where(item => string.Equals(item.CategoryName?.Trim(), CrmCategoryName, StringComparison.OrdinalIgnoreCase))
            .ToDictionary(item => item.Name.Trim(), item => item, StringComparer.OrdinalIgnoreCase);

        var results = new List<ReportLibraryItemDto>();

        foreach (var template in Templates)
        {
            if (!availableByName.TryGetValue(template.Name, out var report))
            {
                continue;
            }

            results.Add(new ReportLibraryItemDto(
                report.Id,
                report.Name,
                string.IsNullOrWhiteSpace(report.Description) ? template.Description : report.Description,
                report.CategoryId,
                report.CategoryName,
                report.Extension,
                report.CreatedOn,
                report.ModifiedOn,
                template.SortOrder,
                template.Filters.Select(filter => filter switch
                {
                    { Kind: "stage" } => filter with { Options = stageOptions },
                    { Kind: "pipeline" } => filter with { Options = pipelineOptions },
                    { Kind: "status" } => filter with { Options = statusOptions },
                    { Kind: "approvalStatus" } => filter with { Options = approvalStatusOptions },
                    _ => filter
                }).ToList()));
        }

        return results
            .OrderBy(item => item.SortOrder)
            .ThenBy(item => item.Name, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private async Task<IReadOnlyList<ReportParameterOptionDto>> BuildStageOptionsAsync(CancellationToken ct)
    {
        var options = await _dbContext.OpportunityStages
            .AsNoTracking()
            .OrderBy(stage => stage.Order)
            .Select(stage => new ReportParameterOptionDto(stage.Name, stage.Name))
            .ToListAsync(ct);

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
}
