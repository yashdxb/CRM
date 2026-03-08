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
    CreateForecastSummaryReport(connectionString)
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
