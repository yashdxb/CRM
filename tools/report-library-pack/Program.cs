using System.Data;
using Telerik.Reporting;
using Telerik.Reporting.Drawing;
using Color = System.Drawing.Color;

var connectionString = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTION");
var outputDir = Environment.GetEnvironmentVariable("REPORT_OUTPUT_DIR") ?? Path.Combine(Directory.GetCurrentDirectory(), "generated");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("AZURE_SQL_CONNECTION is required.");
}

Directory.CreateDirectory(outputDir);

const string ownerLookupSql = @"
SELECT UserId, FullName
FROM (
    SELECT CAST('' AS nvarchar(36)) AS UserId, '(All owners)' AS FullName, 0 AS SortOrder
    UNION ALL
    SELECT CAST(u.Id AS nvarchar(36)) AS UserId, u.FullName, 1 AS SortOrder
    FROM [identity].[Users] u
    WHERE u.IsDeleted = 0 AND u.IsActive = 1
) src
ORDER BY SortOrder, FullName";

const string leadSourceLookupSql = @"
SELECT LeadSource, LeadSourceLabel
FROM (
    SELECT CAST('' AS nvarchar(200)) AS LeadSource, '(All sources)' AS LeadSourceLabel, 0 AS SortOrder
    UNION ALL
    SELECT DISTINCT COALESCE(NULLIF(l.Source, ''), 'Unknown') AS LeadSource,
           COALESCE(NULLIF(l.Source, ''), 'Unknown') AS LeadSourceLabel,
           1 AS SortOrder
    FROM [crm].[Leads] l
    WHERE l.IsDeleted = 0
) src
ORDER BY SortOrder, LeadSourceLabel";

var reports = new[]
{
    CreatePipelineByStageReport(connectionString),
    CreateOpenOpportunitiesByOwnerReport(connectionString),
    CreatePendingDealApprovalReport(connectionString),
    CreateLeadConversionSummaryReport(connectionString),
    CreateSalesActivitiesByOwnerReport(connectionString),
    CreateForecastSummaryReport(connectionString),
    CreatePipelineStageMixVisualReport(connectionString),
    CreateRevenueAndConversionTrendReport(connectionString),
    CreateLeadQualityConversationSignalReport(connectionString),
    CreateCqvsReadinessHeatmapReport(connectionString),
    CreateManagerPipelineHealthVisualReport(connectionString),
    CreateForecastDistributionVisualReport(connectionString),
    CreateRevenueForecastReport(connectionString),
    CreateWinLossAnalysisReport(connectionString),
    CreateSalesCycleDurationReport(connectionString),
    CreateTopDealsReport(connectionString),
    CreateLeadConversionFunnelReport(connectionString),
    CreateLeadSourcePerformanceReport(connectionString),
    CreateLeadAgingReport(connectionString),
    CreateLeadScoreDistributionReport(connectionString),
    CreateActivitySummaryReport(connectionString),
    CreateTeamPerformanceReport(connectionString),
    CreateCustomerGrowthReport(connectionString),
    CreateCustomerRevenueConcentrationReport(connectionString),
    CreateCampaignRoiReport(connectionString),
    CreateEmailEngagementReport(connectionString),
    CreatePipelineHealthScorecardReport(connectionString)
};

var packager = new ReportPackager();
foreach (var report in reports)
{
    var path = Path.Combine(outputDir, $"{report.Name}.trdp");
    await using var stream = File.Create(path);
    packager.Package(report, stream);
    Console.WriteLine(path);
}

return;

static Report CreatePipelineByStageReport(string connectionString)
{
    const string sql = @"
SELECT
    s.Name AS StageName,
    COUNT(*) AS OpportunityCount,
    SUM(o.Amount) AS PipelineValue,
    CASE
        WHEN SUM(SUM(o.Amount)) OVER () = 0 THEN 0
        ELSE CAST((SUM(o.Amount) * 100.0) / SUM(SUM(o.Amount)) OVER () AS decimal(10, 2))
    END AS SharePercent
FROM [crm].[Opportunities] o
INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId AND s.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@Stage IS NULL OR @Stage = '' OR @Stage = 'All' OR s.Name = @Stage)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY s.Name, s.[Order]
ORDER BY s.[Order]";

    var report = CreateBaseReport("PipelineByStage", "Pipeline by Stage", "Open pipeline grouped by sales stage.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("Stage", string.Empty));

    var dataSource = CreateSqlDataSource("PipelineByStageData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Stage", "= Parameters.Stage.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Stage", "Open Deals", "Pipeline Value", "Share %"],
        [3.5, 1.2, 2.0, 1.2],
        [
            ("= Fields.StageName", HorizontalAlign.Left, null),
            ("= Fields.OpportunityCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.PipelineValue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.SharePercent", HorizontalAlign.Right, "{0:N2}%")
        ]);
    return report;
}

static Report CreateOpenOpportunitiesByOwnerReport(string connectionString)
{
    const string sql = @"
SELECT
    CAST(o.Id AS nvarchar(36)) AS OpportunityId,
    o.Name AS OpportunityName,
    COALESCE(a.Name, '') AS AccountName,
    COALESCE(s.Name, '') AS StageName,
    COALESCE(u.FullName, '') AS OwnerName,
    o.Amount,
    o.Currency,
    o.ExpectedCloseDate
FROM [crm].[Opportunities] o
INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId AND s.IsDeleted = 0
LEFT JOIN [crm].[Accounts] a ON a.Id = o.AccountId AND a.IsDeleted = 0
LEFT JOIN [identity].[Users] u ON u.Id = o.OwnerId AND u.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@Stage IS NULL OR @Stage = '' OR @Stage = 'All' OR s.Name = @Stage)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
ORDER BY OwnerName, s.[Order], OpportunityName";

    var report = CreateBaseReport("OpenOpportunitiesByOwner", "Open Opportunities by Owner", "Current open opportunities by owner, stage, and close date.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("Stage", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("OpenOpportunities", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Stage", "= Parameters.Stage.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Opportunity", "Account", "Stage", "Owner", "Amount", "Expected Close"],
        [2.8, 2.0, 1.2, 1.7, 1.1, 1.1],
        [
            ("= Fields.OpportunityName", HorizontalAlign.Left, null),
            ("= Fields.AccountName", HorizontalAlign.Left, null),
            ("= Fields.StageName", HorizontalAlign.Left, null),
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.Amount", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.ExpectedCloseDate", HorizontalAlign.Left, "{0:yyyy-MM-dd}")
        ]);
    return report;
}

static Report CreatePendingDealApprovalReport(string connectionString)
{
    const string sql = @"
SELECT
    o.Name AS DealName,
    COALESCE(a.Name, '') AS AccountName,
    COALESCE(requester.FullName, '') AS RequesterName,
    COALESCE(approver.FullName, '') AS ApproverName,
    oa.RequestedOn,
    DATEDIFF(day, oa.RequestedOn, SYSUTCDATETIME()) AS AgingDays,
    oa.Status AS ApprovalStatus,
    COALESCE(owner.FullName, '') AS DealOwnerName
FROM [crm].[OpportunityApprovals] oa
INNER JOIN [crm].[Opportunities] o ON o.Id = oa.OpportunityId AND o.IsDeleted = 0
LEFT JOIN [crm].[Accounts] a ON a.Id = o.AccountId AND a.IsDeleted = 0
LEFT JOIN [identity].[Users] owner ON owner.Id = o.OwnerId AND owner.IsDeleted = 0
LEFT JOIN [identity].[Users] requester ON requester.Id = oa.RequestedByUserId AND requester.IsDeleted = 0
LEFT JOIN [identity].[Users] approver ON approver.Id = oa.ApproverUserId AND approver.IsDeleted = 0
WHERE oa.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@ApprovalStatus IS NULL OR @ApprovalStatus = '' OR oa.Status = @ApprovalStatus)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(oa.RequestedOn AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(oa.RequestedOn AS date) <= TRY_CONVERT(date, @DateTo))
ORDER BY oa.RequestedOn DESC, DealName";

    var report = CreateBaseReport("PendingDealApproval", "Pending Deal Approval", "Current approval queue with requester, approver, and aging.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("ApprovalStatus", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("PendingDealApprovalData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@ApprovalStatus", "= Parameters.ApprovalStatus.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Deal", "Account", "Requester", "Approver", "Requested On", "Aging", "Status"],
        [2.3, 1.6, 1.5, 1.5, 1.1, 0.8, 1.0],
        [
            ("= Fields.DealName", HorizontalAlign.Left, null),
            ("= Fields.AccountName", HorizontalAlign.Left, null),
            ("= Fields.RequesterName", HorizontalAlign.Left, null),
            ("= Fields.ApproverName", HorizontalAlign.Left, null),
            ("= Fields.RequestedOn", HorizontalAlign.Left, "{0:yyyy-MM-dd}"),
            ("= Fields.AgingDays", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ApprovalStatus", HorizontalAlign.Left, null)
        ]);
    return report;
}

static Report CreateLeadConversionSummaryReport(string connectionString)
{
    const string sql = @"
SELECT
    COALESCE(u.FullName, 'Unassigned') AS OwnerName,
    COALESCE(NULLIF(l.Source, ''), 'Unknown') AS LeadSource,
    COUNT(*) AS LeadsCreated,
    SUM(CASE WHEN l.QualifiedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS QualifiedCount,
    SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL OR l.ConvertedOpportunityId IS NOT NULL THEN 1 ELSE 0 END) AS ConvertedCount,
    CASE
        WHEN COUNT(*) = 0 THEN 0
        ELSE CAST((SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL OR l.ConvertedOpportunityId IS NOT NULL THEN 1 ELSE 0 END) * 100.0) / COUNT(*) AS decimal(10, 2))
    END AS ConversionRate
FROM [crm].[Leads] l
LEFT JOIN [identity].[Users] u ON u.Id = l.OwnerId AND u.IsDeleted = 0
WHERE l.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(l.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@LeadSource IS NULL OR @LeadSource = '' OR COALESCE(NULLIF(l.Source, ''), 'Unknown') = @LeadSource)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(l.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(l.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY COALESCE(u.FullName, 'Unassigned'), COALESCE(NULLIF(l.Source, ''), 'Unknown')
ORDER BY ConvertedCount DESC, OwnerName, LeadSource";

    var report = CreateBaseReport("LeadConversionSummary", "Lead Conversion Summary", "Lead creation, qualification, and conversion performance by owner and source.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    var leadSourceLookup = CreateSqlDataSource("LeadSourceLookup", connectionString, leadSourceLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateLookupParameter("LeadSource", "Lead Source", leadSourceLookup, "LeadSource", "LeadSourceLabel"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("LeadConversionData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@LeadSource", "= Parameters.LeadSource.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Owner", "Lead Source", "Leads", "Qualified", "Converted", "Conversion %"],
        [1.8, 2.0, 1.0, 1.1, 1.1, 1.2],
        [
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.LeadSource", HorizontalAlign.Left, null),
            ("= Fields.LeadsCreated", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.QualifiedCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ConvertedCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ConversionRate", HorizontalAlign.Right, "{0:N2}%")
        ]);
    return report;
}

static Report CreateSalesActivitiesByOwnerReport(string connectionString)
{
    const string sql = @"
SELECT
    COALESCE(u.FullName, 'Unassigned') AS OwnerName,
    SUM(CASE WHEN a.Type = 1 THEN 1 ELSE 0 END) AS Calls,
    SUM(CASE WHEN a.Type = 3 THEN 1 ELSE 0 END) AS Meetings,
    SUM(CASE WHEN a.Type = 4 THEN 1 ELSE 0 END) AS Tasks,
    SUM(CASE WHEN a.CompletedDateUtc IS NULL AND a.DueDateUtc IS NOT NULL AND a.DueDateUtc < SYSUTCDATETIME() THEN 1 ELSE 0 END) AS OverdueActivities,
    CASE
        WHEN COUNT(*) = 0 THEN 0
        ELSE CAST((SUM(CASE WHEN a.CompletedDateUtc IS NOT NULL THEN 1 ELSE 0 END) * 100.0) / COUNT(*) AS decimal(10, 2))
    END AS CompletionRate
FROM [crm].[Activities] a
LEFT JOIN [identity].[Users] u ON u.Id = a.OwnerId AND u.IsDeleted = 0
WHERE a.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(a.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (
      @Status IS NULL OR @Status = ''
      OR (@Status = 'Open' AND a.CompletedDateUtc IS NULL)
      OR (@Status = 'Completed' AND a.CompletedDateUtc IS NOT NULL)
      OR (@Status = 'Overdue' AND a.CompletedDateUtc IS NULL AND a.DueDateUtc IS NOT NULL AND a.DueDateUtc < SYSUTCDATETIME())
  )
  AND (
      TRY_CONVERT(date, @DateFrom) IS NULL
      OR CAST(COALESCE(a.CompletedDateUtc, a.DueDateUtc, a.CreatedAtUtc) AS date) >= TRY_CONVERT(date, @DateFrom)
  )
  AND (
      TRY_CONVERT(date, @DateTo) IS NULL
      OR CAST(COALESCE(a.CompletedDateUtc, a.DueDateUtc, a.CreatedAtUtc) AS date) <= TRY_CONVERT(date, @DateTo)
  )
GROUP BY COALESCE(u.FullName, 'Unassigned')
ORDER BY OwnerName";

    var report = CreateBaseReport("SalesActivitiesByOwner", "Sales Activities by Owner", "Activity volume, overdue follow-up, and completion rate by owner.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("Status", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("SalesActivitiesData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Status", "= Parameters.Status.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Owner", "Calls", "Meetings", "Tasks", "Overdue", "Completion %"],
        [2.2, 1.0, 1.1, 1.0, 1.0, 1.2],
        [
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.Calls", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.Meetings", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.Tasks", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.OverdueActivities", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.CompletionRate", HorizontalAlign.Right, "{0:N2}%")
        ]);
    return report;
}

static Report CreateForecastSummaryReport(string connectionString)
{
    const string sql = @"
SELECT
    COALESCE(NULLIF(COALESCE(o.ForecastCategory, s.ForecastCategory), ''), 'Unspecified') AS ForecastBucket,
    COUNT(*) AS OpportunityCount,
    SUM(o.Amount) AS OpenValue,
    CAST(SUM(o.Amount * (ISNULL(o.Probability, 0) / 100.0)) AS decimal(18, 2)) AS WeightedPipeline,
    MIN(o.ExpectedCloseDate) AS ClosestCloseDate,
    MAX(o.ExpectedCloseDate) AS FurthestCloseDate
FROM [crm].[Opportunities] o
INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId AND s.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@Stage IS NULL OR @Stage = '' OR @Stage = 'All' OR s.Name = @Stage)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.ExpectedCloseDate AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.ExpectedCloseDate AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY COALESCE(NULLIF(COALESCE(o.ForecastCategory, s.ForecastCategory), ''), 'Unspecified')
ORDER BY ForecastBucket";

    var report = CreateBaseReport("ForecastSummary", "Forecast Summary", "Weighted pipeline and open value grouped by forecast bucket.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("Stage", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("ForecastSummaryData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Stage", "= Parameters.Stage.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Forecast Bucket", "Open Deals", "Open Value", "Weighted Pipeline", "Closest Close", "Furthest Close"],
        [2.1, 1.0, 1.5, 1.7, 1.1, 1.1],
        [
            ("= Fields.ForecastBucket", HorizontalAlign.Left, null),
            ("= Fields.OpportunityCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.OpenValue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.WeightedPipeline", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.ClosestCloseDate", HorizontalAlign.Left, "{0:yyyy-MM-dd}"),
            ("= Fields.FurthestCloseDate", HorizontalAlign.Left, "{0:yyyy-MM-dd}")
        ]);
    return report;
}

static Report CreatePipelineStageMixVisualReport(string connectionString)
{
    const string sql = @"
SELECT
    s.Name AS StageName,
    s.[Order] AS StageOrder,
    COUNT(*) AS OpportunityCount,
    SUM(o.Amount) AS PipelineValue,
    CASE
        WHEN SUM(SUM(o.Amount)) OVER () = 0 THEN 0
        ELSE CAST((SUM(o.Amount) * 100.0) / SUM(SUM(o.Amount)) OVER () AS decimal(10, 2))
    END AS SharePercent
FROM [crm].[Opportunities] o
INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId AND s.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@Stage IS NULL OR @Stage = '' OR @Stage = 'All' OR s.Name = @Stage)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY s.Name, s.[Order]
ORDER BY s.[Order]";

    var (report, detail) = CreateVisualReportBase("Pipeline Stage Mix", "Pipeline Stage Mix", "Visual mix of open pipeline by stage, value, and share.", 6.1);
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("Stage", string.Empty));

    var dataSource = CreateSqlDataSource("PipelineStageMixData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Stage", "= Parameters.Stage.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    detail.Items.Add(CreateBarChart(
        "Pipeline value by stage",
        dataSource,
        "=Fields.StageName",
        "=Fields.StageOrder",
        "=Fields.PipelineValue",
        0, 0.15, 9.45, 4.05,
        "${0:#,0}"));
    detail.Items.Add(CreateDataTable(
        "PipelineStageMixTable",
        dataSource,
        0, 4.45,
        ["Stage", "Open deals", "Pipeline value", "Share %"],
        [3.6, 1.5, 2.2, 1.4],
        [
            ("= Fields.StageName", HorizontalAlign.Left, null),
            ("= Fields.OpportunityCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.PipelineValue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.SharePercent", HorizontalAlign.Right, "{0:N1}%")
        ]));
    return report;
}

static Report CreateRevenueAndConversionTrendReport(string connectionString)
{
    const string sql = @"
WITH Revenue AS (
    SELECT
        FORMAT(o.UpdatedAtUtc, 'yyyy-MM') AS Period,
        SUM(CASE WHEN o.IsClosed = 1 AND o.IsWon = 1 THEN o.Amount ELSE 0 END) AS WonRevenue
    FROM [crm].[Opportunities] o
    WHERE o.IsDeleted = 0
      AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
      AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.UpdatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
      AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.UpdatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
    GROUP BY FORMAT(o.UpdatedAtUtc, 'yyyy-MM')
),
LeadAgg AS (
    SELECT
        FORMAT(l.CreatedAtUtc, 'yyyy-MM') AS Period,
        COUNT(*) AS LeadsCreated,
        SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL OR l.ConvertedOpportunityId IS NOT NULL THEN 1 ELSE 0 END) AS ConvertedCount
    FROM [crm].[Leads] l
    WHERE l.IsDeleted = 0
      AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(l.OwnerId AS nvarchar(36)) = @OwnerUserId)
      AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(l.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
      AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(l.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
    GROUP BY FORMAT(l.CreatedAtUtc, 'yyyy-MM')
),
Periods AS (
    SELECT Period FROM Revenue
    UNION
    SELECT Period FROM LeadAgg
)
SELECT
    p.Period,
    ISNULL(r.WonRevenue, 0) AS WonRevenue,
    ISNULL(l.LeadsCreated, 0) AS LeadsCreated,
    ISNULL(l.ConvertedCount, 0) AS ConvertedCount,
    CASE
        WHEN ISNULL(l.LeadsCreated, 0) = 0 THEN 0
        ELSE CAST((ISNULL(l.ConvertedCount, 0) * 100.0) / l.LeadsCreated AS decimal(10, 2))
    END AS ConversionRate
FROM Periods p
LEFT JOIN Revenue r ON r.Period = p.Period
LEFT JOIN LeadAgg l ON l.Period = p.Period
ORDER BY p.Period";

    var (report, detail) = CreateVisualReportBase("Revenue and Conversion Trend", "Revenue and Conversion Trend", "Monthly revenue trend with lead conversion rate.", 6.35);
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("RevenueConversionTrendData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    detail.Items.Add(CreateLineChart(
        "Won revenue trend",
        dataSource,
        "=Fields.Period",
        "=Fields.Period",
        "=Fields.WonRevenue",
        0, 0.15, 9.45, 2.35,
        "${0:#,0}"));
    detail.Items.Add(CreateLineChart(
        "Lead conversion rate",
        dataSource,
        "=Fields.Period",
        "=Fields.Period",
        "=Fields.ConversionRate",
        0, 2.8, 9.45, 2.2,
        "{0:N0}%"));
    detail.Items.Add(CreateDataTable(
        "RevenueConversionTrendTable",
        dataSource,
        0, 5.2,
        ["Period", "Won revenue", "Leads", "Converted", "Conversion %"],
        [1.7, 2.4, 1.2, 1.2, 1.4],
        [
            ("= Fields.Period", HorizontalAlign.Left, null),
            ("= Fields.WonRevenue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.LeadsCreated", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ConvertedCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ConversionRate", HorizontalAlign.Right, "{0:N1}%")
        ]));
    return report;
}

static Report CreateLeadQualityConversationSignalReport(string connectionString)
{
    const string sql = @"
SELECT TOP 100
    CONCAT(l.FirstName, ' ', l.LastName) AS LeadName,
    COALESCE(u.FullName, 'Unassigned') AS OwnerName,
    ISNULL(l.Score, 0) AS QualificationScore,
    ISNULL(l.ConversationScore, 0) AS ConversationScore,
    CASE
        WHEN l.Score >= 80 AND ISNULL(l.ConversationScore, 0) >= 75 THEN 'Ready'
        WHEN l.Score >= 65 AND ISNULL(l.ConversationScore, 0) >= 55 THEN 'Monitor'
        WHEN l.Score >= 50 OR ISNULL(l.ConversationScore, 0) >= 50 THEN 'Coach'
        ELSE 'At Risk'
    END AS ReadinessBand,
    COALESCE(NULLIF(l.Source, ''), 'Unknown') AS LeadSource
FROM [crm].[Leads] l
LEFT JOIN [identity].[Users] u ON u.Id = l.OwnerId AND u.IsDeleted = 0
WHERE l.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(l.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@LeadSource IS NULL OR @LeadSource = '' OR COALESCE(NULLIF(l.Source, ''), 'Unknown') = @LeadSource)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(l.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(l.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
ORDER BY QualificationScore DESC, ConversationScore DESC, LeadName";

    var (report, detail) = CreateVisualReportBase("Lead Quality vs Conversation Signal", "Lead Quality vs Conversation Signal", "Scatter view of qualification strength versus conversation momentum.", 6.15);
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    var leadSourceLookup = CreateSqlDataSource("LeadSourceLookup", connectionString, leadSourceLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateLookupParameter("LeadSource", "Lead Source", leadSourceLookup, "LeadSource", "LeadSourceLabel"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("LeadQualityConversationSignalData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@LeadSource", "= Parameters.LeadSource.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    detail.Items.Add(CreateScatterChart(
        "Qualification vs conversation score",
        dataSource,
        "=Fields.LeadName",
        "=Fields.QualificationScore",
        "=Fields.ConversationScore",
        0, 0.15, 9.45, 4.1));
    detail.Items.Add(CreateDataTable(
        "LeadQualityConversationSignalTable",
        dataSource,
        0, 4.55,
        ["Lead", "Owner", "Qualification", "Conversation", "Readiness"],
        [2.6, 2.0, 1.4, 1.4, 1.5],
        [
            ("= Fields.LeadName", HorizontalAlign.Left, null),
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.QualificationScore", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ConversationScore", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ReadinessBand", HorizontalAlign.Left, null)
        ]));
    return report;
}

static Report CreateCqvsReadinessHeatmapReport(string connectionString)
{
    const string sql = @"
WITH LeadBands AS (
    SELECT
        CASE
            WHEN ISNULL(l.Score, 0) >= 80 AND ISNULL(l.ConversationScore, 0) >= 75 THEN 'Ready'
            WHEN ISNULL(l.Score, 0) >= 65 AND ISNULL(l.ConversationScore, 0) >= 55 THEN 'Monitor'
            WHEN ISNULL(l.Score, 0) >= 50 OR ISNULL(l.ConversationScore, 0) >= 50 THEN 'Coach'
            ELSE 'At Risk'
        END AS ReadinessBand,
        l.BudgetAvailability,
        l.ReadinessToSpend,
        l.BuyingTimeline,
        l.ProblemSeverity,
        l.EconomicBuyer,
        l.IcpFit
    FROM [crm].[Leads] l
    WHERE l.IsDeleted = 0
      AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(l.OwnerId AS nvarchar(36)) = @OwnerUserId)
      AND (@LeadSource IS NULL OR @LeadSource = '' OR COALESCE(NULLIF(l.Source, ''), 'Unknown') = @LeadSource)
      AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(l.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
      AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(l.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
),
FactorRows AS (
    SELECT ReadinessBand, 'Budget availability' AS FactorName, BudgetAvailability AS FactorValue FROM LeadBands
    UNION ALL SELECT ReadinessBand, 'Readiness to spend', ReadinessToSpend FROM LeadBands
    UNION ALL SELECT ReadinessBand, 'Buying timeline', BuyingTimeline FROM LeadBands
    UNION ALL SELECT ReadinessBand, 'Problem severity', ProblemSeverity FROM LeadBands
    UNION ALL SELECT ReadinessBand, 'Economic buyer', EconomicBuyer FROM LeadBands
    UNION ALL SELECT ReadinessBand, 'ICP fit', IcpFit FROM LeadBands
)
SELECT
    FactorName,
    SUM(CASE WHEN ReadinessBand = 'Ready' AND (
            FactorValue IS NULL OR FactorValue = '' OR
            FactorValue LIKE 'Unknown%' OR
            FactorValue LIKE '%not discussed%' OR
            FactorValue LIKE '%unclear%' OR
            FactorValue LIKE '%not identified%' OR
            FactorValue LIKE '%not assessed%' OR
            FactorValue LIKE '%No defined%' OR
            FactorValue LIKE '%unavailable%' OR
            FactorValue LIKE '%deprioritized%' OR
            FactorValue LIKE '%not involved%' OR
            FactorValue LIKE 'Partial ICP fit' OR
            FactorValue LIKE 'Out-of-profile%'
        ) THEN 1 ELSE 0 END) AS ReadyCount,
    SUM(CASE WHEN ReadinessBand = 'Monitor' AND (
            FactorValue IS NULL OR FactorValue = '' OR
            FactorValue LIKE 'Unknown%' OR
            FactorValue LIKE '%not discussed%' OR
            FactorValue LIKE '%unclear%' OR
            FactorValue LIKE '%not identified%' OR
            FactorValue LIKE '%not assessed%' OR
            FactorValue LIKE '%No defined%' OR
            FactorValue LIKE '%unavailable%' OR
            FactorValue LIKE '%deprioritized%' OR
            FactorValue LIKE '%not involved%' OR
            FactorValue LIKE 'Partial ICP fit' OR
            FactorValue LIKE 'Out-of-profile%'
        ) THEN 1 ELSE 0 END) AS MonitorCount,
    SUM(CASE WHEN ReadinessBand = 'Coach' AND (
            FactorValue IS NULL OR FactorValue = '' OR
            FactorValue LIKE 'Unknown%' OR
            FactorValue LIKE '%not discussed%' OR
            FactorValue LIKE '%unclear%' OR
            FactorValue LIKE '%not identified%' OR
            FactorValue LIKE '%not assessed%' OR
            FactorValue LIKE '%No defined%' OR
            FactorValue LIKE '%unavailable%' OR
            FactorValue LIKE '%deprioritized%' OR
            FactorValue LIKE '%not involved%' OR
            FactorValue LIKE 'Partial ICP fit' OR
            FactorValue LIKE 'Out-of-profile%'
        ) THEN 1 ELSE 0 END) AS CoachCount,
    SUM(CASE WHEN ReadinessBand = 'At Risk' AND (
            FactorValue IS NULL OR FactorValue = '' OR
            FactorValue LIKE 'Unknown%' OR
            FactorValue LIKE '%not discussed%' OR
            FactorValue LIKE '%unclear%' OR
            FactorValue LIKE '%not identified%' OR
            FactorValue LIKE '%not assessed%' OR
            FactorValue LIKE '%No defined%' OR
            FactorValue LIKE '%unavailable%' OR
            FactorValue LIKE '%deprioritized%' OR
            FactorValue LIKE '%not involved%' OR
            FactorValue LIKE 'Partial ICP fit' OR
            FactorValue LIKE 'Out-of-profile%'
        ) THEN 1 ELSE 0 END) AS AtRiskCount
FROM FactorRows
GROUP BY FactorName
ORDER BY CASE FactorName
    WHEN 'Budget availability' THEN 1
    WHEN 'Readiness to spend' THEN 2
    WHEN 'Buying timeline' THEN 3
    WHEN 'Problem severity' THEN 4
    WHEN 'Economic buyer' THEN 5
    ELSE 6
END";

    var (report, detail) = CreateVisualReportBase("CQVS Readiness Heatmap", "CQVS Readiness Heatmap", "Matrix of weak CQVS factors across readiness bands.", 5.4);
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    var leadSourceLookup = CreateSqlDataSource("LeadSourceLookup", connectionString, leadSourceLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateLookupParameter("LeadSource", "Lead Source", leadSourceLookup, "LeadSource", "LeadSourceLabel"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("CqvsReadinessHeatmapData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@LeadSource", "= Parameters.LeadSource.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    detail.Items.Add(CreateHeatmapTable(
        "CqvsReadinessHeatmapTable",
        dataSource,
        0, 0.15));
    return report;
}

static Report CreateManagerPipelineHealthVisualReport(string connectionString)
{
    const string sql = @"
SELECT
    s.Name AS StageName,
    s.[Order] AS StageOrder,
    COUNT(*) AS OpenDeals,
    SUM(o.Amount) AS PipelineValue,
    CAST(AVG(DATEDIFF(day, o.CreatedAtUtc, SYSUTCDATETIME())) AS decimal(10, 1)) AS AvgAgeDays,
    SUM(CASE WHEN DATEDIFF(day, o.UpdatedAtUtc, SYSUTCDATETIME()) >= 14 THEN 1 ELSE 0 END) AS StaleDeals,
    CAST(SUM(o.Amount * (ISNULL(o.Probability, 0) / 100.0)) AS decimal(18, 2)) AS WeightedExposure
FROM [crm].[Opportunities] o
INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId AND s.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@Stage IS NULL OR @Stage = '' OR @Stage = 'All' OR s.Name = @Stage)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY s.Name, s.[Order]
ORDER BY s.[Order]";

    var (report, detail) = CreateVisualReportBase("Manager Pipeline Health", "Manager Pipeline Health", "Stage-level view of stale deals, age, and weighted exposure.", 6.15);
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("Stage", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("ManagerPipelineHealthData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Stage", "= Parameters.Stage.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    detail.Items.Add(CreateBarChart(
        "Stale deals by stage",
        dataSource,
        "=Fields.StageName",
        "=Fields.StageOrder",
        "=Fields.StaleDeals",
        0, 0.15, 9.45, 3.3,
        "{0:N0}"));
    detail.Items.Add(CreateDataTable(
        "ManagerPipelineHealthTable",
        dataSource,
        0, 3.7,
        ["Stage", "Open deals", "Avg age", "Stale", "Weighted exposure"],
        [2.8, 1.2, 1.2, 1.0, 2.0],
        [
            ("= Fields.StageName", HorizontalAlign.Left, null),
            ("= Fields.OpenDeals", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.AvgAgeDays", HorizontalAlign.Right, "{0:N1}d"),
            ("= Fields.StaleDeals", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.WeightedExposure", HorizontalAlign.Right, "{0:C0}")
        ]));
    return report;
}

static Report CreateForecastDistributionVisualReport(string connectionString)
{
    const string sql = @"
SELECT
    COALESCE(NULLIF(COALESCE(o.ForecastCategory, s.ForecastCategory), ''), 'Unspecified') AS ForecastBucket,
    COUNT(*) AS OpportunityCount,
    SUM(o.Amount) AS OpenValue,
    CAST(SUM(o.Amount * (ISNULL(o.Probability, 0) / 100.0)) AS decimal(18, 2)) AS WeightedPipeline
FROM [crm].[Opportunities] o
INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId AND s.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@Stage IS NULL OR @Stage = '' OR @Stage = 'All' OR s.Name = @Stage)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.ExpectedCloseDate AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.ExpectedCloseDate AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY COALESCE(NULLIF(COALESCE(o.ForecastCategory, s.ForecastCategory), ''), 'Unspecified')
ORDER BY ForecastBucket";

    var (report, detail) = CreateVisualReportBase("Forecast Distribution", "Forecast Distribution", "Forecast bucket mix across open value and weighted pipeline.", 6.0);
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("Stage", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("ForecastDistributionData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Stage", "= Parameters.Stage.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    detail.Items.Add(CreateDonutChart(
        "Forecast open value distribution",
        dataSource,
        "=Fields.ForecastBucket",
        "=Fields.ForecastBucket",
        "=Fields.OpenValue",
        0, 0.15, 5.0, 3.9));
    detail.Items.Add(CreateDataTable(
        "ForecastDistributionTable",
        dataSource,
        5.2, 0.35,
        ["Bucket", "Open value", "Weighted", "Open deals"],
        [2.0, 1.6, 1.7, 1.0],
        [
            ("= Fields.ForecastBucket", HorizontalAlign.Left, null),
            ("= Fields.OpenValue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.WeightedPipeline", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.OpportunityCount", HorizontalAlign.Right, "{0:N0}")
        ]));
    return report;
}

static (Report Report, DetailSection Detail) CreateVisualReportBase(string reportName, string title, string subtitle, double detailHeight)
{
    var report = CreateBaseReport(reportName, title, subtitle);
    var detail = new DetailSection
    {
        Name = "detail",
        Height = Unit.Inch(detailHeight)
    };
    report.Items.Add(detail);
    return (report, detail);
}

static Report CreateBaseReport(string reportName, string title, string subtitle)
{
    var report = new Report
    {
        Name = reportName,
        Width = Unit.Inch(10.2)
    };

    report.PageSettings.PaperKind = System.Drawing.Printing.PaperKind.Letter;
    report.PageSettings.Landscape = true;
    report.PageSettings.Margins = new MarginsU(Unit.Inch(0.35), Unit.Inch(0.35), Unit.Inch(0.35), Unit.Inch(0.35));

    var reportHeader = new ReportHeaderSection { Height = Unit.Inch(0.95), Name = "reportHeader" };
    reportHeader.Items.AddRange(
    [
        CreateTextBox(title, 0, 0, 7.2, 0.38, 20, true, Color.FromArgb(31, 41, 55)),
        CreateTextBox(subtitle, 0, 0.4, 8.8, 0.22, 10, false, Color.FromArgb(107, 114, 128)),
        CreateTextBox("= 'Generated: ' + Format('{0:MMMM d, yyyy h:mm tt}', Now())", 0, 0.67, 3.4, 0.18, 8, false, Color.FromArgb(107, 114, 128), italic: true)
    ]);
    report.Items.Add(reportHeader);

    return report;
}

static Graph CreateBarChart(
    string title,
    SqlDataSource dataSource,
    string categoryExpression,
    string sortExpression,
    string valueExpression,
    double left,
    double top,
    double width,
    double height,
    string valueLabelFormat)
{
    var graph = new Graph
    {
        DataSource = dataSource,
        Location = new PointU(Unit.Inch(left), Unit.Inch(top)),
        Size = new SizeU(Unit.Inch(width), Unit.Inch(height)),
        Style = { BackgroundColor = Color.Transparent }
    };
    graph.Legend.Style.Visible = false;

    var categoryGroup = new GraphGroup { Name = "CategoryGroup" };
    categoryGroup.Groupings.Add(new Grouping(categoryExpression));
    categoryGroup.Sortings.Add(new Sorting(sortExpression, SortDirection.Asc));
    graph.CategoryGroups.Add(categoryGroup);

    var seriesGroup = new GraphGroup { Name = "SeriesGroup" };
    graph.SeriesGroups.Add(seriesGroup);

    var categoryAxis = new GraphAxis { Name = "CategoryAxis", Scale = new CategoryScale() };
    categoryAxis.Style.Font.Size = Unit.Point(8);
    categoryAxis.Style.LineColor = Color.Transparent;

    var valueAxis = new GraphAxis
    {
        Name = "ValueAxis",
        Scale = new NumericalScale(),
        LabelFormat = valueLabelFormat
    };
    valueAxis.Style.Font.Size = Unit.Point(8);
    valueAxis.Style.LineColor = Color.Transparent;

    var coordinateSystem = new CartesianCoordinateSystem
    {
        Name = "cs",
        XAxis = categoryAxis,
        YAxis = valueAxis
    };
    graph.CoordinateSystems.Add(coordinateSystem);

    var series = new BarSeries
    {
        CategoryGroup = categoryGroup,
        SeriesGroup = seriesGroup,
        CoordinateSystem = coordinateSystem,
        Y = valueExpression,
        ArrangeMode = GraphSeriesArrangeMode.Clustered
    };
    series.DataPointStyle.BackgroundColor = Color.FromArgb(37, 99, 235);
    series.DataPointStyle.LineWidth = Unit.Point(0);
    graph.Series.Add(series);
    graph.Titles.Add(CreateGraphTitle(title));
    return graph;
}

static Graph CreateLineChart(
    string title,
    SqlDataSource dataSource,
    string categoryExpression,
    string sortExpression,
    string valueExpression,
    double left,
    double top,
    double width,
    double height,
    string valueLabelFormat)
{
    var graph = new Graph
    {
        DataSource = dataSource,
        Location = new PointU(Unit.Inch(left), Unit.Inch(top)),
        Size = new SizeU(Unit.Inch(width), Unit.Inch(height)),
        Style = { BackgroundColor = Color.Transparent }
    };
    graph.Legend.Style.Visible = false;

    var categoryGroup = new GraphGroup { Name = "CategoryGroup" };
    categoryGroup.Groupings.Add(new Grouping(categoryExpression));
    categoryGroup.Sortings.Add(new Sorting(sortExpression, SortDirection.Asc));
    graph.CategoryGroups.Add(categoryGroup);

    var seriesGroup = new GraphGroup { Name = "SeriesGroup" };
    graph.SeriesGroups.Add(seriesGroup);

    var categoryAxis = new GraphAxis { Name = "CategoryAxis", Scale = new CategoryScale() };
    categoryAxis.Style.Font.Size = Unit.Point(8);
    categoryAxis.Style.LineColor = Color.Transparent;

    var valueAxis = new GraphAxis
    {
        Name = "ValueAxis",
        Scale = new NumericalScale(),
        LabelFormat = valueLabelFormat
    };
    valueAxis.Style.Font.Size = Unit.Point(8);
    valueAxis.Style.LineColor = Color.Transparent;

    var coordinateSystem = new CartesianCoordinateSystem
    {
        Name = "cs",
        XAxis = categoryAxis,
        YAxis = valueAxis
    };
    graph.CoordinateSystems.Add(coordinateSystem);

    var series = new LineSeries
    {
        CategoryGroup = categoryGroup,
        SeriesGroup = seriesGroup,
        CoordinateSystem = coordinateSystem,
        Y = valueExpression,
        MarkerType = DataPointMarkerType.Circle
    };
    series.LineStyle.LineWidth = Unit.Point(2);
    series.LineStyle.Color = Color.FromArgb(14, 165, 233);
    series.DataPointStyle.BackgroundColor = Color.FromArgb(14, 165, 233);
    graph.Series.Add(series);
    graph.Titles.Add(CreateGraphTitle(title));
    return graph;
}

static Graph CreateScatterChart(
    string title,
    SqlDataSource dataSource,
    string categoryExpression,
    string xExpression,
    string yExpression,
    double left,
    double top,
    double width,
    double height)
{
    var graph = new Graph
    {
        DataSource = dataSource,
        Location = new PointU(Unit.Inch(left), Unit.Inch(top)),
        Size = new SizeU(Unit.Inch(width), Unit.Inch(height)),
        Style = { BackgroundColor = Color.Transparent }
    };
    graph.Legend.Style.Visible = false;

    var categoryGroup = new GraphGroup { Name = "CategoryGroup" };
    categoryGroup.Groupings.Add(new Grouping(categoryExpression));
    categoryGroup.Sortings.Add(new Sorting(xExpression, SortDirection.Asc));
    graph.CategoryGroups.Add(categoryGroup);

    var seriesGroup = new GraphGroup { Name = "SeriesGroup" };
    graph.SeriesGroups.Add(seriesGroup);

    var xAxis = new GraphAxis
    {
        Name = "XAxis",
        Scale = new NumericalScale(),
        LabelFormat = "{0:N0}"
    };
    xAxis.Style.Font.Size = Unit.Point(8);
    xAxis.Style.LineColor = Color.Transparent;

    var yAxis = new GraphAxis
    {
        Name = "YAxis",
        Scale = new NumericalScale(),
        LabelFormat = "{0:N0}"
    };
    yAxis.Style.Font.Size = Unit.Point(8);
    yAxis.Style.LineColor = Color.Transparent;

    var coordinateSystem = new CartesianCoordinateSystem
    {
        Name = "cs",
        XAxis = xAxis,
        YAxis = yAxis
    };
    graph.CoordinateSystems.Add(coordinateSystem);

    var series = new LineSeries
    {
        CategoryGroup = categoryGroup,
        SeriesGroup = seriesGroup,
        CoordinateSystem = coordinateSystem,
        X = xExpression,
        Y = yExpression,
        MarkerType = DataPointMarkerType.Circle
    };
    series.LineStyle.LineWidth = Unit.Point(0);
    series.DataPointStyle.BackgroundColor = Color.FromArgb(124, 58, 237);
    graph.Series.Add(series);
    graph.Titles.Add(CreateGraphTitle(title));
    return graph;
}

static Graph CreateDonutChart(
    string title,
    SqlDataSource dataSource,
    string categoryExpression,
    string sortExpression,
    string valueExpression,
    double left,
    double top,
    double width,
    double height)
{
    var graph = new Graph
    {
        DataSource = dataSource,
        Location = new PointU(Unit.Inch(left), Unit.Inch(top)),
        Size = new SizeU(Unit.Inch(width), Unit.Inch(height)),
        Style = { BackgroundColor = Color.Transparent }
    };
    graph.Legend.Style.Visible = true;
    graph.Legend.Position = GraphItemPosition.RightCenter;
    graph.Legend.Style.Font.Size = Unit.Point(8);

    var categoryGroup = new GraphGroup { Name = "CategoryGroup" };
    categoryGroup.Groupings.Add(new Grouping(categoryExpression));
    categoryGroup.Sortings.Add(new Sorting(sortExpression, SortDirection.Asc));
    graph.CategoryGroups.Add(categoryGroup);

    var seriesGroup = new GraphGroup { Name = "SeriesGroup" };
    graph.SeriesGroups.Add(seriesGroup);

    var angularAxis = new GraphAxis { Name = "AngularAxis", Scale = new CategoryScale() };
    angularAxis.Style.LineColor = Color.Transparent;

    var radialAxis = new GraphAxis
    {
        Name = "RadialAxis",
        Scale = new NumericalScale(),
        LabelFormat = "{0:C0}"
    };
    radialAxis.Style.Visible = false;
    radialAxis.Style.LineColor = Color.Transparent;

    var coordinateSystem = new PolarCoordinateSystem
    {
        Name = "pcs",
        AngularAxis = angularAxis,
        RadialAxis = radialAxis,
        InnerRadiusRatio = 0.55
    };
    graph.CoordinateSystems.Add(coordinateSystem);

    var series = new BarSeries
    {
        CategoryGroup = categoryGroup,
        SeriesGroup = seriesGroup,
        CoordinateSystem = coordinateSystem,
        Y = valueExpression,
        ArrangeMode = GraphSeriesArrangeMode.Stacked
    };
    series.DataPointStyle.LineWidth = Unit.Point(0);
    graph.Series.Add(series);
    graph.Titles.Add(CreateGraphTitle(title));
    return graph;
}

static GraphTitle CreateGraphTitle(string text)
{
    var title = new GraphTitle { Text = text };
    title.Style.Font.Size = Unit.Point(11);
    title.Style.Font.Bold = true;
    title.Style.Color = Color.FromArgb(31, 41, 55);
    return title;
}

static Table CreateDataTable(
    string name,
    SqlDataSource dataSource,
    double left,
    double top,
    string[] headers,
    double[] widths,
    (string Expression, HorizontalAlign Align, string? Format)[] fields)
{
    var totalWidth = widths.Sum();
    var table = new Table
    {
        Name = name,
        DataSource = dataSource,
        Location = new PointU(Unit.Inch(left), Unit.Inch(top)),
        Size = new SizeU(Unit.Inch(totalWidth), Unit.Inch(0.7))
    };

    foreach (var width in widths)
    {
        table.Body.Columns.Add(new TableBodyColumn(Unit.Inch(width)));
    }

    var detailGroup = new TableGroup { Name = $"{name}DetailGroup" };
    detailGroup.Groupings.Add(new Grouping());
    table.RowGroups.Add(detailGroup);

    for (var i = 0; i < headers.Length; i++)
    {
        var header = new TextBox
        {
            Value = headers[i],
            Style =
            {
                BackgroundColor = Color.FromArgb(240, 247, 255),
                Color = Color.FromArgb(37, 99, 235),
                Font = { Name = "Segoe UI", Size = Unit.Point(8), Bold = true },
                TextAlign = fields[i].Align,
                VerticalAlign = VerticalAlign.Middle,
                Padding = { Left = Unit.Point(4), Right = Unit.Point(4), Top = Unit.Point(4), Bottom = Unit.Point(4) }
            }
        };
        header.Style.BorderStyle.Bottom = BorderType.Solid;
        header.Style.BorderColor.Bottom = Color.FromArgb(191, 219, 254);
        table.ColumnGroups.Add(new TableGroup { Name = $"{name}Column{i}", ReportItem = header });
    }

    table.Body.Rows.Add(new TableBodyRow(Unit.Inch(0.32)));

    for (var i = 0; i < fields.Length; i++)
    {
        var box = new TextBox
        {
            Value = fields[i].Expression,
            Style =
            {
                Color = Color.FromArgb(31, 41, 55),
                Font = { Name = "Segoe UI", Size = Unit.Point(8.5) },
                TextAlign = fields[i].Align,
                VerticalAlign = VerticalAlign.Middle,
                Padding = { Left = Unit.Point(4), Right = Unit.Point(4), Top = Unit.Point(3), Bottom = Unit.Point(3) }
            }
        };
        box.Style.BorderStyle.Bottom = BorderType.Solid;
        box.Style.BorderColor.Bottom = Color.FromArgb(229, 231, 235);
        if (!string.IsNullOrWhiteSpace(fields[i].Format))
        {
            box.Format = fields[i].Format;
        }
        table.Body.SetCellContent(0, i, box);
    }

    return table;
}

static Table CreateHeatmapTable(string name, SqlDataSource dataSource, double left, double top)
{
    var table = new Table
    {
        Name = name,
        DataSource = dataSource,
        Location = new PointU(Unit.Inch(left), Unit.Inch(top)),
        Size = new SizeU(Unit.Inch(9.2), Unit.Inch(3.7))
    };

    var headers = new[] { "CQVS factor", "Ready", "Monitor", "Coach", "At Risk" };
    var widths = new[] { 3.2, 1.3, 1.3, 1.3, 1.4 };
    foreach (var width in widths)
    {
        table.Body.Columns.Add(new TableBodyColumn(Unit.Inch(width)));
    }

    var detailGroup = new TableGroup { Name = $"{name}DetailGroup" };
    detailGroup.Groupings.Add(new Grouping());
    table.RowGroups.Add(detailGroup);

    for (var i = 0; i < headers.Length; i++)
    {
        var header = new TextBox
        {
            Value = headers[i],
            Style =
            {
                BackgroundColor = Color.FromArgb(240, 247, 255),
                Color = Color.FromArgb(37, 99, 235),
                Font = { Name = "Segoe UI", Size = Unit.Point(9), Bold = true },
                TextAlign = i == 0 ? HorizontalAlign.Left : HorizontalAlign.Center,
                VerticalAlign = VerticalAlign.Middle,
                Padding = { Left = Unit.Point(6), Right = Unit.Point(6), Top = Unit.Point(5), Bottom = Unit.Point(5) }
            }
        };
        header.Style.BorderStyle.Bottom = BorderType.Solid;
        header.Style.BorderColor.Bottom = Color.FromArgb(191, 219, 254);
        table.ColumnGroups.Add(new TableGroup { Name = $"{name}Column{i}", ReportItem = header });
    }

    table.Body.Rows.Add(new TableBodyRow(Unit.Inch(0.38)));

    var factorCell = new TextBox
    {
        Value = "= Fields.FactorName",
        Style =
        {
            Color = Color.FromArgb(31, 41, 55),
            Font = { Name = "Segoe UI", Size = Unit.Point(8.5), Bold = true },
            TextAlign = HorizontalAlign.Left,
            VerticalAlign = VerticalAlign.Middle,
            Padding = { Left = Unit.Point(6), Right = Unit.Point(6), Top = Unit.Point(4), Bottom = Unit.Point(4) }
        }
    };
    factorCell.Style.BorderStyle.Bottom = BorderType.Solid;
    factorCell.Style.BorderColor.Bottom = Color.FromArgb(229, 231, 235);
    table.Body.SetCellContent(0, 0, factorCell);

    table.Body.SetCellContent(0, 1, CreateHeatCell("= Fields.ReadyCount"));
    table.Body.SetCellContent(0, 2, CreateHeatCell("= Fields.MonitorCount"));
    table.Body.SetCellContent(0, 3, CreateHeatCell("= Fields.CoachCount"));
    table.Body.SetCellContent(0, 4, CreateHeatCell("= Fields.AtRiskCount"));

    return table;
}

static TextBox CreateHeatCell(string expression)
{
    var box = new TextBox
    {
        Value = expression,
        Style =
        {
            Font = { Name = "Segoe UI", Size = Unit.Point(9), Bold = true },
            TextAlign = HorizontalAlign.Center,
            VerticalAlign = VerticalAlign.Middle,
            BackgroundColor = Color.FromArgb(243, 244, 246),
            Padding = { Top = Unit.Point(4), Bottom = Unit.Point(4) }
        }
    };
    box.Style.BorderStyle.Bottom = BorderType.Solid;
    box.Style.BorderColor.Bottom = Color.FromArgb(229, 231, 235);
    box.ConditionalFormatting.Add(CreateHeatRule(expression, ">= 8", Color.FromArgb(29, 78, 216), Color.White));
    box.ConditionalFormatting.Add(CreateHeatRule(expression, ">= 4", Color.FromArgb(147, 197, 253), Color.FromArgb(30, 41, 59)));
    box.ConditionalFormatting.Add(CreateHeatRule(expression, "> 0", Color.FromArgb(219, 234, 254), Color.FromArgb(30, 41, 59)));
    return box;
}

static FormattingRule CreateHeatRule(string expression, string value, Color background, Color foreground)
{
    var rule = new FormattingRule();
    rule.Filters.Add(new Filter(expression, FilterOperator.GreaterOrEqual, value switch
    {
        ">= 8" => "= 8",
        ">= 4" => "= 4",
        _ => "= 1"
    }));
    rule.Style.BackgroundColor = background;
    rule.Style.Color = foreground;
    return rule;
}

static void AddTableSections(Report report, string[] headers, double[] widths, (string Expression, HorizontalAlign Align, string? Format)[] fields)
{
    var pageHeader = new PageHeaderSection { Height = Unit.Inch(0.35), Name = "pageHeader" };
    var detail = new DetailSection { Height = Unit.Inch(0.32), Name = "detail" };

    double left = 0;
    for (var i = 0; i < headers.Length; i++)
    {
        pageHeader.Items.Add(CreateHeaderBox(headers[i], left, widths[i], fields[i].Align));
        detail.Items.Add(CreateDetailBox(fields[i].Expression, left, widths[i], fields[i].Align, fields[i].Format));
        left += widths[i];
    }

    report.Items.Add(pageHeader);
    report.Items.Add(detail);
}

static TextBox CreateHeaderBox(string text, double left, double width, HorizontalAlign align)
    => new()
    {
        Value = text,
        Location = new PointU(Unit.Inch(left), Unit.Inch(0)),
        Size = new SizeU(Unit.Inch(width), Unit.Inch(0.35)),
        Style =
        {
            BackgroundColor = Color.FromArgb(240, 247, 255),
            Color = Color.FromArgb(37, 99, 235),
            TextAlign = align,
            VerticalAlign = VerticalAlign.Middle,
            Font = { Name = "Segoe UI", Size = Unit.Point(9), Bold = true },
            BorderStyle = { Bottom = BorderType.Solid },
            BorderColor = { Bottom = Color.FromArgb(191, 219, 254) },
            Padding = { Left = Unit.Point(4), Right = Unit.Point(4) }
        }
    };

static TextBox CreateDetailBox(string expression, double left, double width, HorizontalAlign align, string? format)
{
    var box = new TextBox
    {
        Value = expression,
        Location = new PointU(Unit.Inch(left), Unit.Inch(0)),
        Size = new SizeU(Unit.Inch(width), Unit.Inch(0.32)),
        CanGrow = true,
        Style =
        {
            Color = Color.FromArgb(31, 41, 55),
            TextAlign = align,
            VerticalAlign = VerticalAlign.Middle,
            Font = { Name = "Segoe UI", Size = Unit.Point(9) },
            BorderStyle = { Bottom = BorderType.Solid },
            BorderColor = { Bottom = Color.FromArgb(229, 231, 235) },
            Padding = { Left = Unit.Point(4), Right = Unit.Point(4) }
        }
    };

    if (!string.IsNullOrWhiteSpace(format))
    {
        box.Format = format;
    }

    return box;
}

static TextBox CreateTextBox(string value, double left, double top, double width, double height, double fontSize, bool bold, Color color, bool italic = false)
    => new()
    {
        Value = value,
        Location = new PointU(Unit.Inch(left), Unit.Inch(top)),
        Size = new SizeU(Unit.Inch(width), Unit.Inch(height)),
        Style =
        {
            Color = color,
            Font = { Name = "Segoe UI", Size = Unit.Point(fontSize), Bold = bold, Italic = italic }
        }
    };

static SqlDataSource CreateSqlDataSource(string name, string connectionString, string sql, params (string Name, string Expression)[] parameters)
{
    var dataSource = new SqlDataSource
    {
        Name = name,
        ConnectionString = connectionString,
        ProviderName = "System.Data.SqlClient",
        SelectCommand = sql
    };

    foreach (var parameter in parameters)
    {
        dataSource.Parameters.Add(new SqlDataSourceParameter(parameter.Name, DbType.String, parameter.Expression));
    }

    return dataSource;
}

static ReportParameter CreateLookupParameter(string name, string text, SqlDataSource dataSource, string valueMember, string displayMember)
{
    var parameter = CreateHiddenStringParameter(name, string.Empty);
    parameter.Text = text;
    parameter.AvailableValues.DataSource = dataSource;
    parameter.AvailableValues.ValueMember = $"= Fields.{valueMember}";
    parameter.AvailableValues.DisplayMember = $"= Fields.{displayMember}";
    return parameter;
}

static ReportParameter CreateHiddenStringParameter(string name, string value)
    => new()
    {
        Name = name,
        Text = name,
        Type = ReportParameterType.String,
        AllowBlank = true,
        AllowNull = true,
        Visible = false,
        Value = value
    };

// ── New reports (15) ──────────────────────────────────────────────────

static Report CreateRevenueForecastReport(string connectionString)
{
    const string sql = @"
SELECT
    FORMAT(o.ExpectedCloseDate, 'yyyy-MM') AS Period,
    COUNT(*) AS DealCount,
    SUM(o.Amount) AS ProjectedRevenue,
    CAST(SUM(o.Amount * (ISNULL(o.Probability, 0) / 100.0)) AS decimal(18, 2)) AS WeightedRevenue
FROM [crm].[Opportunities] o
INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId AND s.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 0
  AND o.ExpectedCloseDate IS NOT NULL
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.ExpectedCloseDate AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.ExpectedCloseDate AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY FORMAT(o.ExpectedCloseDate, 'yyyy-MM')
ORDER BY Period";

    var report = CreateBaseReport("Revenue Forecast", "Revenue Forecast", "Projected and weighted revenue forecast grouped by period.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("RevenueForecastData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Period", "Deal Count", "Projected Revenue", "Weighted Revenue"],
        [2.0, 1.2, 2.5, 2.5],
        [
            ("= Fields.Period", HorizontalAlign.Left, null),
            ("= Fields.DealCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ProjectedRevenue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.WeightedRevenue", HorizontalAlign.Right, "{0:C0}")
        ]);
    return report;
}

static Report CreateWinLossAnalysisReport(string connectionString)
{
    const string sql = @"
SELECT
    COALESCE(u.FullName, 'Unassigned') AS OwnerName,
    SUM(CASE WHEN o.IsWon = 1 THEN 1 ELSE 0 END) AS WonCount,
    SUM(CASE WHEN o.IsWon = 0 THEN 1 ELSE 0 END) AS LostCount,
    CASE WHEN COUNT(*) = 0 THEN 0
         ELSE CAST((SUM(CASE WHEN o.IsWon = 1 THEN 1 ELSE 0 END) * 100.0) / COUNT(*) AS decimal(10, 2))
    END AS WinRate,
    CAST(AVG(CASE WHEN o.IsWon = 1 THEN o.Amount END) AS decimal(18, 2)) AS AvgWonDealSize,
    CAST(AVG(CASE WHEN o.IsWon = 0 THEN o.Amount END) AS decimal(18, 2)) AS AvgLostDealSize,
    SUM(CASE WHEN o.IsWon = 1 THEN o.Amount ELSE 0 END) AS TotalWonRevenue
FROM [crm].[Opportunities] o
LEFT JOIN [identity].[Users] u ON u.Id = o.OwnerId AND u.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 1
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.UpdatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.UpdatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY COALESCE(u.FullName, 'Unassigned')
ORDER BY TotalWonRevenue DESC, OwnerName";

    var report = CreateBaseReport("Win Loss Analysis", "Win Loss Analysis", "Won vs lost deals with win rate, deal size, and revenue by owner.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("WinLossData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Owner", "Won", "Lost", "Win %", "Avg Won Size", "Avg Lost Size", "Won Revenue"],
        [1.8, 0.7, 0.7, 0.8, 1.3, 1.3, 1.5],
        [
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.WonCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.LostCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.WinRate", HorizontalAlign.Right, "{0:N1}%"),
            ("= Fields.AvgWonDealSize", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.AvgLostDealSize", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.TotalWonRevenue", HorizontalAlign.Right, "{0:C0}")
        ]);
    return report;
}

static Report CreateSalesCycleDurationReport(string connectionString)
{
    const string sql = @"
SELECT
    s.Name AS StageName,
    s.[Order] AS StageOrder,
    COUNT(DISTINCT h.OpportunityId) AS OpportunityCount,
    AVG(DATEDIFF(day, h.ChangedAtUtc,
        COALESCE(
            (SELECT TOP 1 h2.ChangedAtUtc FROM [crm].[OpportunityStageHistories] h2
             WHERE h2.OpportunityId = h.OpportunityId AND h2.IsDeleted = 0
               AND h2.ChangedAtUtc > h.ChangedAtUtc
             ORDER BY h2.ChangedAtUtc), SYSUTCDATETIME()
        ))) AS AvgDaysInStage,
    MIN(DATEDIFF(day, h.ChangedAtUtc,
        COALESCE(
            (SELECT TOP 1 h2.ChangedAtUtc FROM [crm].[OpportunityStageHistories] h2
             WHERE h2.OpportunityId = h.OpportunityId AND h2.IsDeleted = 0
               AND h2.ChangedAtUtc > h.ChangedAtUtc
             ORDER BY h2.ChangedAtUtc), SYSUTCDATETIME()
        ))) AS MinDays,
    MAX(DATEDIFF(day, h.ChangedAtUtc,
        COALESCE(
            (SELECT TOP 1 h2.ChangedAtUtc FROM [crm].[OpportunityStageHistories] h2
             WHERE h2.OpportunityId = h.OpportunityId AND h2.IsDeleted = 0
               AND h2.ChangedAtUtc > h.ChangedAtUtc
             ORDER BY h2.ChangedAtUtc), SYSUTCDATETIME()
        ))) AS MaxDays
FROM [crm].[OpportunityStageHistories] h
INNER JOIN [crm].[OpportunityStages] s ON s.Id = h.OpportunityStageId AND s.IsDeleted = 0
INNER JOIN [crm].[Opportunities] o ON o.Id = h.OpportunityId AND o.IsDeleted = 0
WHERE h.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@Stage IS NULL OR @Stage = '' OR @Stage = 'All' OR s.Name = @Stage)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(h.ChangedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(h.ChangedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY s.Name, s.[Order]
ORDER BY s.[Order]";

    var report = CreateBaseReport("Sales Cycle Duration", "Sales Cycle Duration", "Average days in each sales stage with min/max range.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("Stage", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("SalesCycleDurationData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Stage", "= Parameters.Stage.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Stage", "Opportunities", "Avg Days", "Min Days", "Max Days"],
        [2.5, 1.3, 1.3, 1.3, 1.3],
        [
            ("= Fields.StageName", HorizontalAlign.Left, null),
            ("= Fields.OpportunityCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.AvgDaysInStage", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.MinDays", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.MaxDays", HorizontalAlign.Right, "{0:N0}")
        ]);
    return report;
}

static Report CreateTopDealsReport(string connectionString)
{
    const string sql = @"
SELECT TOP 25
    o.Name AS DealName,
    COALESCE(a.Name, '') AS AccountName,
    COALESCE(s.Name, '') AS StageName,
    COALESCE(u.FullName, '') AS OwnerName,
    o.Amount,
    o.Probability,
    CAST(o.Amount * (ISNULL(o.Probability, 0) / 100.0) AS decimal(18, 2)) AS WeightedAmount,
    o.ExpectedCloseDate
FROM [crm].[Opportunities] o
INNER JOIN [crm].[OpportunityStages] s ON s.Id = o.StageId AND s.IsDeleted = 0
LEFT JOIN [crm].[Accounts] a ON a.Id = o.AccountId AND a.IsDeleted = 0
LEFT JOIN [identity].[Users] u ON u.Id = o.OwnerId AND u.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@Stage IS NULL OR @Stage = '' OR @Stage = 'All' OR s.Name = @Stage)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
ORDER BY o.Amount DESC";

    var report = CreateBaseReport("Top Deals", "Top Deals", "Highest-value open opportunities ranked by deal amount.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("Stage", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("TopDealsData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Stage", "= Parameters.Stage.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Deal", "Account", "Stage", "Owner", "Amount", "Prob %", "Weighted", "Close Date"],
        [2.2, 1.5, 1.0, 1.3, 1.1, 0.7, 1.1, 1.0],
        [
            ("= Fields.DealName", HorizontalAlign.Left, null),
            ("= Fields.AccountName", HorizontalAlign.Left, null),
            ("= Fields.StageName", HorizontalAlign.Left, null),
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.Amount", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.Probability", HorizontalAlign.Right, "{0:N0}%"),
            ("= Fields.WeightedAmount", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.ExpectedCloseDate", HorizontalAlign.Left, "{0:yyyy-MM-dd}")
        ]);
    return report;
}

static Report CreateLeadConversionFunnelReport(string connectionString)
{
    const string sql = @"
SELECT
    ls.Name AS StatusName,
    COUNT(*) AS LeadCount,
    CASE WHEN SUM(COUNT(*)) OVER () = 0 THEN 0
         ELSE CAST((COUNT(*) * 100.0) / SUM(COUNT(*)) OVER () AS decimal(10, 2))
    END AS SharePercent
FROM [crm].[Leads] l
INNER JOIN [crm].[LeadStatuses] ls ON ls.Id = l.LeadStatusId AND ls.IsDeleted = 0
WHERE l.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(l.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@LeadSource IS NULL OR @LeadSource = '' OR COALESCE(NULLIF(l.Source, ''), 'Unknown') = @LeadSource)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(l.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(l.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY ls.Name, ls.[Order]
ORDER BY ls.[Order]";

    var report = CreateBaseReport("Lead Conversion Funnel", "Lead Conversion Funnel", "Lead volume at each funnel stage from new to converted.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    var leadSourceLookup = CreateSqlDataSource("LeadSourceLookup", connectionString, leadSourceLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateLookupParameter("LeadSource", "Lead Source", leadSourceLookup, "LeadSource", "LeadSourceLabel"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("LeadConversionFunnelData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@LeadSource", "= Parameters.LeadSource.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Status", "Lead Count", "Share %"],
        [3.5, 2.0, 2.0],
        [
            ("= Fields.StatusName", HorizontalAlign.Left, null),
            ("= Fields.LeadCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.SharePercent", HorizontalAlign.Right, "{0:N2}%")
        ]);
    return report;
}

static Report CreateLeadSourcePerformanceReport(string connectionString)
{
    const string sql = @"
SELECT
    COALESCE(NULLIF(l.Source, ''), 'Unknown') AS LeadSource,
    COUNT(*) AS TotalLeads,
    SUM(CASE WHEN l.QualifiedAtUtc IS NOT NULL THEN 1 ELSE 0 END) AS QualifiedCount,
    SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL OR l.ConvertedOpportunityId IS NOT NULL THEN 1 ELSE 0 END) AS ConvertedCount,
    CASE WHEN COUNT(*) = 0 THEN 0
         ELSE CAST((SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL OR l.ConvertedOpportunityId IS NOT NULL THEN 1 ELSE 0 END) * 100.0) / COUNT(*) AS decimal(10, 2))
    END AS ConversionRate,
    AVG(l.Score) AS AvgScore
FROM [crm].[Leads] l
WHERE l.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(l.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(l.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(l.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY COALESCE(NULLIF(l.Source, ''), 'Unknown')
ORDER BY TotalLeads DESC";

    var report = CreateBaseReport("Lead Source Performance", "Lead Source Performance", "Lead count and conversion rate by source channel.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("LeadSourcePerformanceData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Lead Source", "Total Leads", "Qualified", "Converted", "Conversion %", "Avg Score"],
        [2.0, 1.2, 1.2, 1.2, 1.3, 1.2],
        [
            ("= Fields.LeadSource", HorizontalAlign.Left, null),
            ("= Fields.TotalLeads", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.QualifiedCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ConvertedCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ConversionRate", HorizontalAlign.Right, "{0:N2}%"),
            ("= Fields.AvgScore", HorizontalAlign.Right, "{0:N0}")
        ]);
    return report;
}

static Report CreateLeadAgingReport(string connectionString)
{
    const string sql = @"
SELECT
    AgeBucket,
    COUNT(*) AS LeadCount,
    AVG(l.Score) AS AvgScore,
    CASE WHEN SUM(COUNT(*)) OVER () = 0 THEN 0
         ELSE CAST((COUNT(*) * 100.0) / SUM(COUNT(*)) OVER () AS decimal(10, 2))
    END AS SharePercent
FROM (
    SELECT l.*,
        CASE
            WHEN DATEDIFF(day, l.CreatedAtUtc, SYSUTCDATETIME()) <= 7  THEN '0-7 days'
            WHEN DATEDIFF(day, l.CreatedAtUtc, SYSUTCDATETIME()) <= 14 THEN '8-14 days'
            WHEN DATEDIFF(day, l.CreatedAtUtc, SYSUTCDATETIME()) <= 30 THEN '15-30 days'
            WHEN DATEDIFF(day, l.CreatedAtUtc, SYSUTCDATETIME()) <= 60 THEN '31-60 days'
            ELSE '60+ days'
        END AS AgeBucket,
        CASE
            WHEN DATEDIFF(day, l.CreatedAtUtc, SYSUTCDATETIME()) <= 7  THEN 1
            WHEN DATEDIFF(day, l.CreatedAtUtc, SYSUTCDATETIME()) <= 14 THEN 2
            WHEN DATEDIFF(day, l.CreatedAtUtc, SYSUTCDATETIME()) <= 30 THEN 3
            WHEN DATEDIFF(day, l.CreatedAtUtc, SYSUTCDATETIME()) <= 60 THEN 4
            ELSE 5
        END AS BucketOrder
    FROM [crm].[Leads] l
    WHERE l.IsDeleted = 0
      AND l.ConvertedAtUtc IS NULL
      AND l.ConvertedOpportunityId IS NULL
) l
WHERE (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(l.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@LeadSource IS NULL OR @LeadSource = '' OR COALESCE(NULLIF(l.Source, ''), 'Unknown') = @LeadSource)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(l.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(l.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY AgeBucket, BucketOrder
ORDER BY BucketOrder";

    var report = CreateBaseReport("Lead Aging", "Lead Aging", "Open leads grouped by age bucket with average score.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    var leadSourceLookup = CreateSqlDataSource("LeadSourceLookup", connectionString, leadSourceLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateLookupParameter("LeadSource", "Lead Source", leadSourceLookup, "LeadSource", "LeadSourceLabel"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("LeadAgingData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@LeadSource", "= Parameters.LeadSource.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Age Bucket", "Lead Count", "Avg Score", "Share %"],
        [2.5, 1.5, 1.5, 1.5],
        [
            ("= Fields.AgeBucket", HorizontalAlign.Left, null),
            ("= Fields.LeadCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.AvgScore", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.SharePercent", HorizontalAlign.Right, "{0:N2}%")
        ]);
    return report;
}

static Report CreateLeadScoreDistributionReport(string connectionString)
{
    const string sql = @"
SELECT
    ScoreBand,
    COUNT(*) AS LeadCount,
    SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL OR l.ConvertedOpportunityId IS NOT NULL THEN 1 ELSE 0 END) AS ConvertedCount,
    CASE WHEN COUNT(*) = 0 THEN 0
         ELSE CAST((SUM(CASE WHEN l.ConvertedAtUtc IS NOT NULL OR l.ConvertedOpportunityId IS NOT NULL THEN 1 ELSE 0 END) * 100.0) / COUNT(*) AS decimal(10, 2))
    END AS ConversionRate
FROM (
    SELECT l.*,
        CASE
            WHEN COALESCE(l.AiScore, l.Score) <= 20  THEN '0-20 (Cold)'
            WHEN COALESCE(l.AiScore, l.Score) <= 40  THEN '21-40 (Cool)'
            WHEN COALESCE(l.AiScore, l.Score) <= 60  THEN '41-60 (Warm)'
            WHEN COALESCE(l.AiScore, l.Score) <= 80  THEN '61-80 (Hot)'
            ELSE '81-100 (Very Hot)'
        END AS ScoreBand,
        CASE
            WHEN COALESCE(l.AiScore, l.Score) <= 20  THEN 1
            WHEN COALESCE(l.AiScore, l.Score) <= 40  THEN 2
            WHEN COALESCE(l.AiScore, l.Score) <= 60  THEN 3
            WHEN COALESCE(l.AiScore, l.Score) <= 80  THEN 4
            ELSE 5
        END AS BandOrder
    FROM [crm].[Leads] l
    WHERE l.IsDeleted = 0
) l
WHERE (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(l.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@LeadSource IS NULL OR @LeadSource = '' OR COALESCE(NULLIF(l.Source, ''), 'Unknown') = @LeadSource)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(l.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(l.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY ScoreBand, BandOrder
ORDER BY BandOrder";

    var report = CreateBaseReport("Lead Score Distribution", "Lead Score Distribution", "Distribution of AI-assigned lead scores with conversion correlation.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    var leadSourceLookup = CreateSqlDataSource("LeadSourceLookup", connectionString, leadSourceLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateLookupParameter("LeadSource", "Lead Source", leadSourceLookup, "LeadSource", "LeadSourceLabel"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("LeadScoreDistData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@LeadSource", "= Parameters.LeadSource.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Score Band", "Lead Count", "Converted", "Conversion %"],
        [2.5, 1.5, 1.5, 1.5],
        [
            ("= Fields.ScoreBand", HorizontalAlign.Left, null),
            ("= Fields.LeadCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ConvertedCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ConversionRate", HorizontalAlign.Right, "{0:N2}%")
        ]);
    return report;
}

static Report CreateActivitySummaryReport(string connectionString)
{
    const string sql = @"
SELECT
    COALESCE(u.FullName, 'Unassigned') AS OwnerName,
    COUNT(*) AS TotalActivities,
    SUM(CASE WHEN a.Type = 1 THEN 1 ELSE 0 END) AS Calls,
    SUM(CASE WHEN a.Type = 2 THEN 1 ELSE 0 END) AS Emails,
    SUM(CASE WHEN a.Type = 3 THEN 1 ELSE 0 END) AS Meetings,
    SUM(CASE WHEN a.Type = 4 THEN 1 ELSE 0 END) AS Tasks,
    SUM(CASE WHEN a.Type = 5 THEN 1 ELSE 0 END) AS Notes,
    SUM(CASE WHEN a.CompletedDateUtc IS NOT NULL THEN 1 ELSE 0 END) AS CompletedCount,
    FORMAT(a.CreatedAtUtc, 'yyyy-MM') AS ActivityMonth
FROM [crm].[Activities] a
LEFT JOIN [identity].[Users] u ON u.Id = a.OwnerId AND u.IsDeleted = 0
WHERE a.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(a.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(a.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(a.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY COALESCE(u.FullName, 'Unassigned'), FORMAT(a.CreatedAtUtc, 'yyyy-MM')
ORDER BY ActivityMonth DESC, OwnerName";

    var report = CreateBaseReport("Activity Summary", "Activity Summary", "Activity volume by type, owner, and monthly trend.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("ActivitySummaryData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Month", "Owner", "Total", "Calls", "Emails", "Meetings", "Tasks", "Notes", "Done"],
        [0.9, 1.5, 0.7, 0.7, 0.7, 0.9, 0.7, 0.7, 0.7],
        [
            ("= Fields.ActivityMonth", HorizontalAlign.Left, null),
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.TotalActivities", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.Calls", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.Emails", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.Meetings", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.Tasks", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.Notes", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.CompletedCount", HorizontalAlign.Right, "{0:N0}")
        ]);
    return report;
}

static Report CreateTeamPerformanceReport(string connectionString)
{
    const string sql = @"
SELECT
    COALESCE(u.FullName, 'Unassigned') AS OwnerName,
    SUM(CASE WHEN o.IsClosed = 1 AND o.IsWon = 1 THEN 1 ELSE 0 END) AS DealsWon,
    SUM(CASE WHEN o.IsClosed = 1 AND o.IsWon = 1 THEN o.Amount ELSE 0 END) AS WonRevenue,
    SUM(CASE WHEN o.IsClosed = 0 THEN 1 ELSE 0 END) AS OpenDeals,
    SUM(CASE WHEN o.IsClosed = 0 THEN o.Amount ELSE 0 END) AS OpenPipeline,
    (SELECT COUNT(*) FROM [crm].[Activities] act
     WHERE act.IsDeleted = 0 AND act.OwnerId = u.Id
       AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(act.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
       AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(act.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
    ) AS ActivityCount,
    CASE WHEN SUM(CASE WHEN o.IsClosed = 1 THEN 1 ELSE 0 END) = 0 THEN 0
         ELSE CAST((SUM(CASE WHEN o.IsClosed = 1 AND o.IsWon = 1 THEN 1 ELSE 0 END) * 100.0) /
              SUM(CASE WHEN o.IsClosed = 1 THEN 1 ELSE 0 END) AS decimal(10, 2))
    END AS WinRate
FROM [crm].[Opportunities] o
LEFT JOIN [identity].[Users] u ON u.Id = o.OwnerId AND u.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY COALESCE(u.FullName, 'Unassigned'), u.Id
ORDER BY WonRevenue DESC, OwnerName";

    var report = CreateBaseReport("Team Performance", "Team Performance", "Deals won, revenue, activities, and conversion rate per team member.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("TeamPerformanceData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Owner", "Won", "Won Revenue", "Open", "Pipeline", "Activities", "Win %"],
        [1.8, 0.7, 1.5, 0.7, 1.5, 0.9, 0.8],
        [
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.DealsWon", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.WonRevenue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.OpenDeals", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.OpenPipeline", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.ActivityCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.WinRate", HorizontalAlign.Right, "{0:N1}%")
        ]);
    return report;
}

static Report CreateCustomerGrowthReport(string connectionString)
{
    const string sql = @"
SELECT
    FORMAT(a.CreatedAtUtc, 'yyyy-MM') AS Period,
    COUNT(*) AS NewCustomers,
    SUM(COUNT(*)) OVER (ORDER BY FORMAT(a.CreatedAtUtc, 'yyyy-MM')
        ROWS UNBOUNDED PRECEDING) AS CumulativeTotal
FROM [crm].[Accounts] a
WHERE a.IsDeleted = 0
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(a.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(a.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY FORMAT(a.CreatedAtUtc, 'yyyy-MM')
ORDER BY Period";

    var report = CreateBaseReport("Customer Growth", "Customer Growth", "New customer acquisition trend by month.");
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("CustomerGrowthData", connectionString, sql,
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Period", "New Customers", "Cumulative Total"],
        [3.0, 2.0, 2.5],
        [
            ("= Fields.Period", HorizontalAlign.Left, null),
            ("= Fields.NewCustomers", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.CumulativeTotal", HorizontalAlign.Right, "{0:N0}")
        ]);
    return report;
}

static Report CreateCustomerRevenueConcentrationReport(string connectionString)
{
    const string sql = @"
SELECT TOP 25
    a.Name AS AccountName,
    COALESCE(u.FullName, 'Unassigned') AS OwnerName,
    COUNT(o.Id) AS DealCount,
    SUM(o.Amount) AS TotalRevenue,
    CASE WHEN SUM(SUM(o.Amount)) OVER () = 0 THEN 0
         ELSE CAST((SUM(o.Amount) * 100.0) / SUM(SUM(o.Amount)) OVER () AS decimal(10, 2))
    END AS RevenueShare,
    SUM(SUM(o.Amount)) OVER (ORDER BY SUM(o.Amount) DESC
        ROWS UNBOUNDED PRECEDING) /
        NULLIF(SUM(SUM(o.Amount)) OVER (), 0) * 100.0 AS CumulativeSharePercent
FROM [crm].[Opportunities] o
INNER JOIN [crm].[Accounts] a ON a.Id = o.AccountId AND a.IsDeleted = 0
LEFT JOIN [identity].[Users] u ON u.Id = a.OwnerId AND u.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 1 AND o.IsWon = 1
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(a.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.UpdatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.UpdatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY a.Name, COALESCE(u.FullName, 'Unassigned')
ORDER BY TotalRevenue DESC";

    var report = CreateBaseReport("Customer Revenue Concentration", "Customer Revenue Concentration", "Top customers ranked by revenue contribution and cumulative share.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("CustomerRevenueData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Account", "Owner", "Deals", "Revenue", "Share %", "Cumulative %"],
        [2.2, 1.5, 0.8, 1.5, 1.1, 1.2],
        [
            ("= Fields.AccountName", HorizontalAlign.Left, null),
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.DealCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.TotalRevenue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.RevenueShare", HorizontalAlign.Right, "{0:N2}%"),
            ("= Fields.CumulativeSharePercent", HorizontalAlign.Right, "{0:N1}%")
        ]);
    return report;
}

static Report CreateCampaignRoiReport(string connectionString)
{
    const string sql = @"
SELECT
    c.Name AS CampaignName,
    c.Type AS CampaignType,
    c.Channel,
    c.Status,
    c.BudgetPlanned,
    c.BudgetActual AS ActualSpend,
    (SELECT COUNT(*) FROM [crm].[CampaignMembers] cm
     WHERE cm.CampaignId = c.Id AND cm.IsDeleted = 0) AS MemberCount,
    COALESCE(attr.AttributedRevenue, 0) AS AttributedRevenue,
    CASE WHEN c.BudgetActual = 0 THEN 0
         ELSE CAST((COALESCE(attr.AttributedRevenue, 0) - c.BudgetActual) * 100.0 / c.BudgetActual AS decimal(10, 2))
    END AS RoiPercent
FROM [crm].[Campaigns] c
LEFT JOIN (
    SELECT ca.CampaignId, SUM(ca.AttributedAmount) AS AttributedRevenue
    FROM [crm].[CampaignAttributions] ca
    WHERE ca.IsDeleted = 0
    GROUP BY ca.CampaignId
) attr ON attr.CampaignId = c.Id
LEFT JOIN [identity].[Users] u ON u.Id = c.OwnerUserId AND u.IsDeleted = 0
WHERE c.IsDeleted = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(c.OwnerUserId AS nvarchar(36)) = @OwnerUserId)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(c.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(c.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
ORDER BY AttributedRevenue DESC, CampaignName";

    var report = CreateBaseReport("Campaign ROI", "Campaign ROI", "Campaign spend, attributed revenue, ROI, and members.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("CampaignRoiData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Campaign", "Type", "Channel", "Spend", "Revenue", "Members", "ROI %"],
        [2.0, 1.0, 0.9, 1.2, 1.2, 0.8, 0.9],
        [
            ("= Fields.CampaignName", HorizontalAlign.Left, null),
            ("= Fields.CampaignType", HorizontalAlign.Left, null),
            ("= Fields.Channel", HorizontalAlign.Left, null),
            ("= Fields.ActualSpend", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.AttributedRevenue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.MemberCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.RoiPercent", HorizontalAlign.Right, "{0:N1}%")
        ]);
    return report;
}

static Report CreateEmailEngagementReport(string connectionString)
{
    const string sql = @"
SELECT
    c.Name AS CampaignName,
    (SELECT COUNT(*) FROM [crm].[CampaignMembers] cm
     WHERE cm.CampaignId = c.Id AND cm.IsDeleted = 0
       AND cm.ResponseStatus IN ('Sent', 'Opened', 'Clicked', 'Bounced', 'Unsubscribed')) AS SendCount,
    (SELECT COUNT(*) FROM [crm].[CampaignMembers] cm
     WHERE cm.CampaignId = c.Id AND cm.IsDeleted = 0
       AND cm.ResponseStatus IN ('Opened', 'Clicked')) AS OpenCount,
    (SELECT COUNT(*) FROM [crm].[CampaignMembers] cm
     WHERE cm.CampaignId = c.Id AND cm.IsDeleted = 0
       AND cm.ResponseStatus = 'Clicked') AS ClickCount,
    (SELECT COUNT(*) FROM [crm].[CampaignMembers] cm
     WHERE cm.CampaignId = c.Id AND cm.IsDeleted = 0
       AND cm.ResponseStatus = 'Bounced') AS BounceCount,
    CASE WHEN (SELECT COUNT(*) FROM [crm].[CampaignMembers] cm2
              WHERE cm2.CampaignId = c.Id AND cm2.IsDeleted = 0
                AND cm2.ResponseStatus IN ('Sent', 'Opened', 'Clicked', 'Bounced', 'Unsubscribed')) = 0 THEN 0
         ELSE CAST((SELECT COUNT(*) FROM [crm].[CampaignMembers] cm3
                    WHERE cm3.CampaignId = c.Id AND cm3.IsDeleted = 0
                      AND cm3.ResponseStatus IN ('Opened', 'Clicked')) * 100.0
              / (SELECT COUNT(*) FROM [crm].[CampaignMembers] cm4
                 WHERE cm4.CampaignId = c.Id AND cm4.IsDeleted = 0
                   AND cm4.ResponseStatus IN ('Sent', 'Opened', 'Clicked', 'Bounced', 'Unsubscribed'))
              AS decimal(10, 2))
    END AS OpenRate
FROM [crm].[Campaigns] c
WHERE c.IsDeleted = 0
  AND c.Channel IN ('Email', 'Mixed')
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(c.OwnerUserId AS nvarchar(36)) = @OwnerUserId)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(c.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(c.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
ORDER BY SendCount DESC, CampaignName";

    var report = CreateBaseReport("Email Engagement", "Email Engagement", "Send volume, open rates, click rates, and bounces by campaign.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("EmailEngagementData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Campaign", "Sent", "Opened", "Clicked", "Bounced", "Open %"],
        [2.5, 1.0, 1.0, 1.0, 1.0, 1.0],
        [
            ("= Fields.CampaignName", HorizontalAlign.Left, null),
            ("= Fields.SendCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.OpenCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ClickCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.BounceCount", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.OpenRate", HorizontalAlign.Right, "{0:N1}%")
        ]);
    return report;
}

static Report CreatePipelineHealthScorecardReport(string connectionString)
{
    const string sql = @"
SELECT
    COALESCE(u.FullName, 'Unassigned') AS OwnerName,
    COUNT(*) AS OpenDeals,
    SUM(o.Amount) AS PipelineValue,
    CAST(SUM(o.Amount * (ISNULL(o.Probability, 0) / 100.0)) AS decimal(18, 2)) AS WeightedForecast,
    AVG(DATEDIFF(day, o.CreatedAtUtc, SYSUTCDATETIME())) AS AvgAgingDays,
    SUM(CASE WHEN o.ExpectedCloseDate < SYSUTCDATETIME() THEN 1 ELSE 0 END) AS PastDueDeals,
    SUM(CASE WHEN o.ExpectedCloseDate IS NOT NULL
              AND o.ExpectedCloseDate BETWEEN SYSUTCDATETIME() AND DATEADD(day, 30, SYSUTCDATETIME())
         THEN 1 ELSE 0 END) AS ClosingNext30
FROM [crm].[Opportunities] o
LEFT JOIN [identity].[Users] u ON u.Id = o.OwnerId AND u.IsDeleted = 0
WHERE o.IsDeleted = 0
  AND o.IsClosed = 0
  AND (@OwnerUserId IS NULL OR @OwnerUserId = '' OR CAST(o.OwnerId AS nvarchar(36)) = @OwnerUserId)
  AND (@Stage IS NULL OR @Stage = '' OR @Stage = 'All'
       OR (SELECT s.Name FROM [crm].[OpportunityStages] s WHERE s.Id = o.StageId AND s.IsDeleted = 0) = @Stage)
  AND (TRY_CONVERT(date, @DateFrom) IS NULL OR CAST(o.CreatedAtUtc AS date) >= TRY_CONVERT(date, @DateFrom))
  AND (TRY_CONVERT(date, @DateTo) IS NULL OR CAST(o.CreatedAtUtc AS date) <= TRY_CONVERT(date, @DateTo))
GROUP BY COALESCE(u.FullName, 'Unassigned')
ORDER BY PipelineValue DESC, OwnerName";

    var report = CreateBaseReport("Pipeline Health Scorecard", "Pipeline Health Scorecard", "Pipeline value, weighted forecast, deal aging, and coverage ratio.");
    var ownerLookup = CreateSqlDataSource("OwnerLookup", connectionString, ownerLookupSql);
    report.ReportParameters.Add(CreateLookupParameter("OwnerUserId", "Owner", ownerLookup, "UserId", "FullName"));
    report.ReportParameters.Add(CreateHiddenStringParameter("Stage", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateFrom", string.Empty));
    report.ReportParameters.Add(CreateHiddenStringParameter("DateTo", string.Empty));

    var dataSource = CreateSqlDataSource("PipelineHealthData", connectionString, sql,
        ("@OwnerUserId", "= Parameters.OwnerUserId.Value"),
        ("@Stage", "= Parameters.Stage.Value"),
        ("@DateFrom", "= Parameters.DateFrom.Value"),
        ("@DateTo", "= Parameters.DateTo.Value"));

    report.DataSource = dataSource;
    AddTableSections(report,
        ["Owner", "Open", "Pipeline", "Weighted", "Avg Age", "Past Due", "Close 30d"],
        [1.7, 0.6, 1.4, 1.4, 0.8, 0.9, 0.9],
        [
            ("= Fields.OwnerName", HorizontalAlign.Left, null),
            ("= Fields.OpenDeals", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.PipelineValue", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.WeightedForecast", HorizontalAlign.Right, "{0:C0}"),
            ("= Fields.AvgAgingDays", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.PastDueDeals", HorizontalAlign.Right, "{0:N0}"),
            ("= Fields.ClosingNext30", HorizontalAlign.Right, "{0:N0}")
        ]);
    return report;
}
