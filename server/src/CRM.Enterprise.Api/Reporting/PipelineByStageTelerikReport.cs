using System.Drawing;
using Telerik.Reporting;
using Telerik.Reporting.Drawing;

namespace CRM.Enterprise.Api.Reporting;

/// <summary>
/// Pipeline By Stage dashboard report.
/// Uses SQL data source joining Opportunities + OpportunityStages,
/// filtered by @TenantId (auto-injected by TenantReportResolver).
/// Renders a horizontal bar chart + summary table matching the CRM dashboard.
/// </summary>
public sealed class PipelineByStageTelerikReport : Report
{
    private const double ContentWidthCm = 17.4;
    // CRM brand palette
    private static readonly Color CyanColor = Color.FromArgb(6, 182, 212);
    private static readonly Color PurpleColor = Color.FromArgb(168, 85, 247);
    private static readonly Color OrangeColor = Color.FromArgb(249, 115, 22);
    private static readonly Color GreenColor = Color.FromArgb(34, 197, 94);
    private static readonly Color PrimaryColor = Color.FromArgb(102, 126, 234);
    private static readonly Color Gray800 = Color.FromArgb(31, 41, 55);
    private static readonly Color Gray500 = Color.FromArgb(107, 114, 128);
    private static readonly Color Gray200 = Color.FromArgb(229, 231, 235);
    private static readonly Color HeaderBg = Color.FromArgb(240, 247, 255);

    private static readonly Color[] StageColors =
    [
        CyanColor,
        PurpleColor,
        OrangeColor,
        GreenColor,
        PrimaryColor,
        Color.FromArgb(236, 72, 153), // pink
        Color.FromArgb(245, 158, 11), // amber
        Color.FromArgb(14, 165, 233)  // sky
    ];

    private const string PipelineSql = """
        SELECT
            s.Name       AS StageName,
            s.[Order]    AS StageOrder,
            COUNT(o.Id)  AS DealCount,
            COALESCE(SUM(o.Amount), 0) AS TotalValue
        FROM [crm].[Opportunities] o
        INNER JOIN [crm].[OpportunityStages] s ON o.StageId = s.Id
        WHERE o.TenantId  = @TenantId
          AND o.IsDeleted  = 0
          AND s.IsDeleted  = 0
          AND o.IsClosed   = 0
          AND (
                @OwnerUserId = '' OR EXISTS (
                    SELECT 1
                    FROM STRING_SPLIT(@OwnerUserId, ',') ownerIds
                    WHERE LTRIM(RTRIM(ownerIds.value)) = CAST(o.OwnerId AS nvarchar(36))
                )
              )
          AND (@Stage = '' OR s.Name = @Stage)
          AND (@DateFrom = '' OR CAST(o.ExpectedCloseDate AS date) >= CAST(@DateFrom AS date))
          AND (@DateTo = '' OR CAST(o.ExpectedCloseDate AS date) <= CAST(@DateTo AS date))
        GROUP BY s.Name, s.[Order]
        ORDER BY s.[Order]
        """;

    public PipelineByStageTelerikReport()
    {
        Name = "PipelineByStageTelerikReport";
        Width = Unit.Cm(ContentWidthCm);
        PageSettings.PaperKind = System.Drawing.Printing.PaperKind.Custom;
        PageSettings.PaperSize = new SizeU(Unit.Cm(27.94), Unit.Cm(21.59));
        PageSettings.Margins = new MarginsU(Unit.Cm(1), Unit.Cm(1), Unit.Cm(1), Unit.Cm(1));

        // Hidden TenantId parameter — value injected by TenantReportResolver
        var tenantParam = new ReportParameter
        {
            Name = "TenantId",
            Type = ReportParameterType.String,
            Visible = false,
            AllowBlank = true,
            AllowNull = true,
            Value = string.Empty,
            Text = "Tenant ID"
        };
        ReportParameters.Add(tenantParam);

        ReportParameters.Add(new ReportParameter
        {
            Name = "OwnerUserId",
            Type = ReportParameterType.String,
            Visible = false,
            AllowBlank = true,
            Text = "Owner User Ids"
        });

        ReportParameters.Add(new ReportParameter
        {
            Name = "Stage",
            Type = ReportParameterType.String,
            Visible = false,
            AllowBlank = true,
            Text = "Stage"
        });

        ReportParameters.Add(new ReportParameter
        {
            Name = "DateFrom",
            Type = ReportParameterType.String,
            Visible = false,
            AllowBlank = true,
            Text = "Date From"
        });

        ReportParameters.Add(new ReportParameter
        {
            Name = "DateTo",
            Type = ReportParameterType.String,
            Visible = false,
            AllowBlank = true,
            Text = "Date To"
        });

        // SQL data source — resolve from app configuration directly so nested Telerik items
        // do not depend on resolver-time placeholder patching.
        var sqlDs = new SqlDataSource
        {
            Name = "PipelineData",
            ConnectionString = "=ConnectionStrings.SqlServer",
            SelectCommand = PipelineSql,
            ProviderName = "System.Data.SqlClient"
        };
        sqlDs.Parameters.Add(new SqlDataSourceParameter("@TenantId", System.Data.DbType.String, "=Parameters.TenantId.Value"));
        sqlDs.Parameters.Add(new SqlDataSourceParameter("@OwnerUserId", System.Data.DbType.String, "=Parameters.OwnerUserId.Value"));
        sqlDs.Parameters.Add(new SqlDataSourceParameter("@Stage", System.Data.DbType.String, "=Parameters.Stage.Value"));
        sqlDs.Parameters.Add(new SqlDataSourceParameter("@DateFrom", System.Data.DbType.String, "=Parameters.DateFrom.Value"));
        sqlDs.Parameters.Add(new SqlDataSourceParameter("@DateTo", System.Data.DbType.String, "=Parameters.DateTo.Value"));
        // Keep the report itself unbound. The graph and table bind directly to the shared
        // SQL data source; otherwise the detail section repeats once per returned row.

        // ── Report Header ──────────────────────────────────────
        var header = new ReportHeaderSection { Height = Unit.Cm(3.8) };

        // Badge pill
        var badge = new TextBox
        {
            Value = "SALES PIPELINE",
            Location = new PointU(Unit.Cm(0), Unit.Cm(0)),
            Size = new SizeU(Unit.Cm(4), Unit.Cm(0.5)),
            Style =
            {
                Font = { Size = Unit.Point(8), Bold = true },
                Color = PrimaryColor,
                BackgroundColor = Color.FromArgb(30, PrimaryColor),
                TextAlign = HorizontalAlign.Center,
                VerticalAlign = VerticalAlign.Middle,
                Padding = { Left = Unit.Point(6), Right = Unit.Point(6), Top = Unit.Point(2), Bottom = Unit.Point(2) }
            }
        };
        badge.Style.BorderStyle.Default = BorderType.Solid;
        badge.Style.BorderWidth.Default = Unit.Point(0);

        // Title
        var title = new TextBox
        {
            Value = "Pipeline By Stage",
            Location = new PointU(Unit.Cm(0), Unit.Cm(0.7)),
            Size = new SizeU(Unit.Cm(14), Unit.Cm(1.0)),
            Style =
            {
                Font = { Bold = true, Size = Unit.Point(22) },
                Color = Gray800
            }
        };

        // Subtitle
        var subtitle = new TextBox
        {
            Value = "Open opportunities grouped by sales stage • Total pipeline value & deal distribution",
            Location = new PointU(Unit.Cm(0), Unit.Cm(1.8)),
            Size = new SizeU(Unit.Cm(ContentWidthCm), Unit.Cm(0.6)),
            Style =
            {
                Font = { Size = Unit.Point(10) },
                Color = Gray500
            }
        };

        // Timestamp
        var timestamp = new TextBox
        {
            Value = "= 'Generated: ' + Format('{0:MMMM d, yyyy  h:mm tt}', Now())",
            Location = new PointU(Unit.Cm(0), Unit.Cm(2.6)),
            Size = new SizeU(Unit.Cm(10), Unit.Cm(0.5)),
            Style =
            {
                Font = { Size = Unit.Point(8), Italic = true },
                Color = Gray500
            }
        };

        // Separator line (thin box acting as a horizontal rule)
        var separator = new TextBox
        {
            Value = "",
            Location = new PointU(Unit.Cm(0), Unit.Cm(3.3)),
            Size = new SizeU(Unit.Cm(ContentWidthCm), Unit.Cm(0.03)),
            Style = { BackgroundColor = Gray200 }
        };

        header.Items.AddRange(new ReportItemBase[] { badge, title, subtitle, timestamp, separator });
        Items.Add(header);

        // ── Detail Section (chart + table) ──────────────────────
        var detail = new DetailSection { Height = Unit.Cm(12) };

        // ─── Horizontal Bar Chart ───
        var chart = CreatePipelineChart(sqlDs);
        detail.Items.Add(chart);

        // ─── Summary Table ───
        var table = CreateSummaryTable(sqlDs);
        detail.Items.Add(table);

        Items.Add(detail);

        // ── Report Footer ──────────────────────────────────────
        var footer = new ReportFooterSection { Height = Unit.Cm(1.2) };

        var footerLeft = new TextBox
        {
            Value = "CRM Enterprise — Pipeline Report",
            Location = new PointU(Unit.Cm(0), Unit.Cm(0.3)),
            Size = new SizeU(Unit.Cm(10), Unit.Cm(0.5)),
            Style =
            {
                Font = { Size = Unit.Point(8) },
                Color = Gray500
            }
        };

        var footerRight = new TextBox
        {
            Value = "",
            Location = new PointU(Unit.Cm(18), Unit.Cm(0.3)),
            Size = new SizeU(Unit.Cm(0.4), Unit.Cm(0.5)),
            Style =
            {
                Font = { Size = Unit.Point(8) },
                Color = Gray500,
                TextAlign = HorizontalAlign.Right
            }
        };

        footerRight.Location = new PointU(Unit.Cm(ContentWidthCm - 0.4), Unit.Cm(0.3));

        footer.Items.AddRange(new ReportItemBase[] { footerLeft, footerRight });
        Items.Add(footer);
    }

    private static Graph CreatePipelineChart(SqlDataSource sqlDs)
    {
        var graph = new Graph
        {
            Location = new PointU(Unit.Cm(0), Unit.Cm(0.5)),
            Size = new SizeU(Unit.Cm(ContentWidthCm), Unit.Cm(6.4)),
            DataSource = sqlDs,
            Style =
            {
                BackgroundColor = Color.Transparent
            }
        };
        graph.Legend.Style.Visible = false;

        // Category axis (bottom — stage names)
        var categoryGroup = new GraphGroup { Name = "categoryGroup" };
        categoryGroup.Groupings.Add(new Grouping("=Fields.StageName"));
        categoryGroup.Sortings.Add(new Sorting("=Fields.StageOrder", SortDirection.Asc));
        graph.CategoryGroups.Add(categoryGroup);

        // Series group (single series)
        var seriesGroup = new GraphGroup { Name = "seriesGroup" };
        graph.SeriesGroups.Add(seriesGroup);

        // Category axis (bottom — stage names)
        var categoryAxis = new GraphAxis
        {
            Name = "CategoryAxis",
            Scale = new CategoryScale()
        };
        categoryAxis.Style.Font.Size = Unit.Point(9);
        categoryAxis.Style.Color = Gray800;
        categoryAxis.Style.LineColor = Color.Transparent;

        // Value axis (left — dollar amounts)
        var valueAxis = new GraphAxis
        {
            Name = "ValueAxis",
            Scale = new NumericalScale(),
            LabelFormat = "${0:#,0}"
        };
        valueAxis.Style.Font.Size = Unit.Point(8);
        valueAxis.Style.Color = Gray500;
        valueAxis.Style.LineColor = Color.Transparent;

        graph.CoordinateSystems.Add(new CartesianCoordinateSystem
        {
            Name = "cs",
            XAxis = categoryAxis,
            YAxis = valueAxis
        });

        // Category-on-X, value-on-Y layout using the available BarSeries type
        var barSeries = new BarSeries
        {
            CategoryGroup = categoryGroup,
            SeriesGroup = seriesGroup,
            CoordinateSystem = graph.CoordinateSystems[0],
            Y = "= Sum(Fields.TotalValue)",
            ArrangeMode = GraphSeriesArrangeMode.Clustered
        };
        barSeries.DataPointStyle.LineWidth = Unit.Point(0);

        // Apply conditional colors per data point
        barSeries.DataPointConditionalFormatting.Add(CreateColorRule(0, StageColors[0]));
        barSeries.DataPointConditionalFormatting.Add(CreateColorRule(1, StageColors[1]));
        barSeries.DataPointConditionalFormatting.Add(CreateColorRule(2, StageColors[2]));
        barSeries.DataPointConditionalFormatting.Add(CreateColorRule(3, StageColors[3]));
        barSeries.DataPointConditionalFormatting.Add(CreateColorRule(4, StageColors[4]));
        barSeries.DataPointConditionalFormatting.Add(CreateColorRule(5, StageColors[5]));
        barSeries.DataPointConditionalFormatting.Add(CreateColorRule(6, StageColors[6]));
        barSeries.DataPointConditionalFormatting.Add(CreateColorRule(7, StageColors[7]));

        graph.Series.Add(barSeries);

        // Chart title
        var chartTitle = new GraphTitle
        {
            Text = "Pipeline Value by Stage"
        };
        chartTitle.Style.Font.Size = Unit.Point(12);
        chartTitle.Style.Font.Bold = true;
        chartTitle.Style.Color = Gray800;
        graph.Titles.Add(chartTitle);

        return graph;
    }

    private static FormattingRule CreateColorRule(int index, Color color)
    {
        var rule = new FormattingRule();
        rule.Filters.Add(new Filter("=RowNumber()", FilterOperator.Equal, $"={index + 1}"));
        rule.Style.BackgroundColor = color;
        return rule;
    }

    private static Table CreateSummaryTable(SqlDataSource sqlDs)
    {
        var table = new Table
        {
            Location = new PointU(Unit.Cm(0), Unit.Cm(7.8)),
            Size = new SizeU(Unit.Cm(ContentWidthCm), Unit.Cm(3.0)),
            DataSource = sqlDs
        };

        // ── Columns: Stage | Deals | Value | Bar Proportion ──
        table.Body.Columns.Add(new TableBodyColumn(Unit.Cm(5.2))); // Stage
        table.Body.Columns.Add(new TableBodyColumn(Unit.Cm(2.7))); // Deals
        table.Body.Columns.Add(new TableBodyColumn(Unit.Cm(3.9))); // Value
        table.Body.Columns.Add(new TableBodyColumn(Unit.Cm(5.6))); // Visual bar

        // ── Row group (detail row per stage) ──
        var detailGroup = new TableGroup { Name = "detailGroup" };
        detailGroup.Groupings.Add(new Grouping());
        table.RowGroups.Add(detailGroup);

        // ── Column groups (one per body column) ──
        table.ColumnGroups.Add(CreateColumnGroup("stageCol", "Stage"));
        table.ColumnGroups.Add(CreateColumnGroup("dealCol", "Deals"));
        table.ColumnGroups.Add(CreateColumnGroup("valueCol", "Value"));
        table.ColumnGroups.Add(CreateColumnGroup("shareCol", "Share"));

        // ── Data row ──
        var dataRow = new TableBodyRow(Unit.Cm(0.9));
        table.Body.Rows.Add(dataRow);

        // Stage name
        var stageCell = new TextBox
        {
            Value = "=Fields.StageName",
            Style =
            {
                Font = { Size = Unit.Point(10), Bold = true },
                Color = Gray800,
                VerticalAlign = VerticalAlign.Middle,
                Padding = { Left = Unit.Point(8), Right = Unit.Point(8), Top = Unit.Point(6), Bottom = Unit.Point(6) }
            }
        };
        stageCell.Style.BorderStyle.Bottom = BorderType.Solid;
        stageCell.Style.BorderColor.Bottom = Color.FromArgb(20, 0, 0, 0);
        stageCell.Style.BorderWidth.Bottom = Unit.Point(1);
        table.Body.SetCellContent(0, 0, stageCell);

        // Deal count
        var dealCell = new TextBox
        {
            Value = "= Format('{0} deal{1}', Fields.DealCount, IIf(Fields.DealCount = 1, '', 's'))",
            Style =
            {
                Font = { Size = Unit.Point(10) },
                Color = Gray500,
                TextAlign = HorizontalAlign.Center,
                VerticalAlign = VerticalAlign.Middle,
                Padding = { Top = Unit.Point(6), Bottom = Unit.Point(6) }
            }
        };
        dealCell.Style.BorderStyle.Bottom = BorderType.Solid;
        dealCell.Style.BorderColor.Bottom = Color.FromArgb(20, 0, 0, 0);
        dealCell.Style.BorderWidth.Bottom = Unit.Point(1);
        table.Body.SetCellContent(0, 1, dealCell);

        // Value
        var valueCell = new TextBox
        {
            Value = "= Format('${0:#,0}', Fields.TotalValue)",
            Style =
            {
                Font = { Size = Unit.Point(10), Bold = true },
                Color = Gray800,
                TextAlign = HorizontalAlign.Center,
                VerticalAlign = VerticalAlign.Middle,
                Padding = { Top = Unit.Point(6), Bottom = Unit.Point(6) }
            }
        };
        valueCell.Style.BorderStyle.Bottom = BorderType.Solid;
        valueCell.Style.BorderColor.Bottom = Color.FromArgb(20, 0, 0, 0);
        valueCell.Style.BorderWidth.Bottom = Unit.Point(1);
        table.Body.SetCellContent(0, 2, valueCell);

        // Visual proportion bar (uses percentage expression)
        var barCell = new TextBox
        {
            Value = "= Format('{0:P0}', Fields.TotalValue / Max(Fields.TotalValue))",
            Style =
            {
                Font = { Size = Unit.Point(9) },
                Color = PrimaryColor,
                TextAlign = HorizontalAlign.Center,
                VerticalAlign = VerticalAlign.Middle,
                BackgroundColor = Color.FromArgb(20, PrimaryColor),
                Padding = { Top = Unit.Point(6), Bottom = Unit.Point(6) }
            }
        };
        barCell.Style.BorderStyle.Bottom = BorderType.Solid;
        barCell.Style.BorderColor.Bottom = Color.FromArgb(20, 0, 0, 0);
        barCell.Style.BorderWidth.Bottom = Unit.Point(1);
        table.Body.SetCellContent(0, 3, barCell);

        return table;
    }

    private static TableGroup CreateColumnGroup(string name, string title)
    {
        var header = new TextBox
        {
            Value = title,
            Style =
            {
                Font = { Size = Unit.Point(9), Bold = true },
                Color = Gray800,
                BackgroundColor = HeaderBg,
                VerticalAlign = VerticalAlign.Middle,
                TextAlign = HorizontalAlign.Center,
                Padding = { Top = Unit.Point(5), Bottom = Unit.Point(5), Left = Unit.Point(6), Right = Unit.Point(6) }
            }
        };
        header.Style.BorderStyle.Bottom = BorderType.Solid;
        header.Style.BorderWidth.Bottom = Unit.Point(1);
        header.Style.BorderColor.Bottom = Color.FromArgb(50, 0, 0, 0);

        return new TableGroup
        {
            Name = name,
            ReportItem = header
        };
    }
}
