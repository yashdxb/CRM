using CRM.Enterprise.Application.Reporting;
using CRM.Enterprise.Application.Tenants;
using System.IO.Compression;
using System.Xml.Linq;
using Telerik.Reporting;

namespace CRM.Enterprise.Api.Reporting;

public sealed class EmbeddedReportWorkspaceService
{
    private readonly IHostEnvironment _environment;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public EmbeddedReportWorkspaceService(
        IHostEnvironment environment,
        IConfiguration configuration,
        IHttpContextAccessor httpContextAccessor)
    {
        _environment = environment;
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
    }

    public IReadOnlyList<ReportLibraryItemDto> EnsureWorkspaceReports(IReadOnlyList<ReportLibraryItemDto> sourceItems)
    {
        var reportsRoot = ResolveWritableReportsPath(_environment);
        var crmFolder = Path.Combine(reportsRoot, "CRM");
        Directory.CreateDirectory(crmFolder);
        var sqlConnectionString = _configuration.GetConnectionString("SqlServer");
        var tenantId = _httpContextAccessor.HttpContext?.RequestServices.GetService<ITenantProvider>()?.TenantId;
        var tenantIdValue = tenantId.HasValue && tenantId.Value != Guid.Empty
            ? tenantId.Value.ToString()
            : null;

        var packager = new ReportPackager();
        var results = new List<ReportLibraryItemDto>(sourceItems.Count);

        foreach (var item in sourceItems)
        {
            var fileName = $"{item.Id}.trdp";
            var absolutePath = Path.Combine(crmFolder, fileName);
            var relativePath = $"CRM/{fileName}".Replace('\\', '/');

            // Always regenerate to pick up parameter / SQL definition changes
            {
                using var stream = File.Create(absolutePath);
                packager.Package(CreateReportDocument(item), stream);
            }

            if (!string.IsNullOrWhiteSpace(sqlConnectionString))
            {
                EnsurePackageUsesConcreteConnectionString(absolutePath, sqlConnectionString, tenantIdValue);
            }

            var info = new FileInfo(absolutePath);
            results.Add(item with
            {
                EmbeddedReportSource = relativePath,
                Extension = info.Extension,
                CreatedOn = info.Exists ? new DateTimeOffset(info.CreationTimeUtc) : item.CreatedOn,
                ModifiedOn = info.Exists ? new DateTimeOffset(info.LastWriteTimeUtc) : item.ModifiedOn
            });
        }

        return results;
    }

    private static void EnsurePackageUsesConcreteConnectionString(string absolutePath, string sqlConnectionString, string? tenantIdValue)
    {
        using var package = ZipFile.Open(absolutePath, ZipArchiveMode.Update);
        var definitionEntry = package.GetEntry("definition.xml");
        if (definitionEntry is null)
        {
            return;
        }

        XDocument document;
        using (var input = definitionEntry.Open())
        {
            document = XDocument.Load(input);
        }

        var ns = document.Root?.Name.Namespace ?? XNamespace.None;
        var changed = false;
        foreach (var dataSource in document.Descendants(ns + "SqlDataSource"))
        {
            var attribute = dataSource.Attribute("ConnectionString");
            if (attribute is null)
            {
                continue;
            }

            if (string.Equals(attribute.Value, sqlConnectionString, StringComparison.Ordinal))
            {
                continue;
            }

            attribute.Value = sqlConnectionString;
            changed = true;
        }

        if (!string.IsNullOrWhiteSpace(tenantIdValue))
        {
            foreach (var parameter in document.Descendants(ns + "ReportParameter"))
            {
                if (!string.Equals((string?)parameter.Attribute("Name"), "TenantId", StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                var valueElement = parameter.Element(ns + "Value");
                if (valueElement is null)
                {
                    valueElement = new XElement(ns + "Value");
                    parameter.Add(valueElement);
                }

                var stringElement = valueElement.Element(ns + "String");
                if (stringElement is null)
                {
                    stringElement = new XElement(ns + "String");
                    valueElement.Add(stringElement);
                }

                if (!string.Equals(stringElement.Value, tenantIdValue, StringComparison.OrdinalIgnoreCase))
                {
                    stringElement.Value = tenantIdValue;
                    changed = true;
                }
            }
        }

        if (!changed)
        {
            return;
        }

        definitionEntry.Delete();
        var newEntry = package.CreateEntry("definition.xml");
        using var output = newEntry.Open();
        document.Save(output);
    }

    private static string ResolveWritableReportsPath(IHostEnvironment environment)
    {
        var home = Environment.GetEnvironmentVariable("HOME");
        if (!string.IsNullOrWhiteSpace(home) && !environment.IsDevelopment())
        {
            return Path.Combine(home, "site", "data", "CRM-Enterprise", "Reports");
        }

        return Path.Combine(environment.ContentRootPath, "Reports");
    }

    private static Report CreateReportDocument(ReportLibraryItemDto item)
    {
        if (string.Equals(item.Id, "pipeline-by-stage", StringComparison.OrdinalIgnoreCase))
        {
            return new PipelineByStageTelerikReport();
        }

        var report = new EmbeddedLibraryTelerikReport();
        SetParameter(report, "ReportKey", item.Id);
        SetParameter(report, "ReportTitle", item.Name);
        SetParameter(report, "ReportDescription", item.Description);

        var headers = ResolveHeaders(item.Id);
        SetParameter(report, "Header1", headers[0]);
        SetParameter(report, "Header2", headers[1]);
        SetParameter(report, "Header3", headers[2]);
        SetParameter(report, "Header4", headers[3]);

        return report;
    }

    private static void SetParameter(Report report, string name, string value)
    {
        foreach (var parameter in report.ReportParameters)
        {
            if (!string.Equals(parameter.Name, name, StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            parameter.Value = value;
            return;
        }
    }

    private static string[] ResolveHeaders(string reportId)
        => reportId switch
        {
            "open-opportunities-by-owner" => ["Owner", "Stage", "Open Deals", "Pipeline"],
            "pending-deal-approval" => ["Deal", "Workflow", "Status", "Due"],
            "lead-conversion-summary" => ["Lead Source", "Created", "Qualified", "Converted"],
            "sales-activities-by-owner" => ["Owner", "Activities", "Completed", "Overdue"],
            "forecast-summary" or "forecast-distribution" or "revenue-forecast" => ["Forecast Bucket", "Deals", "Open Value", "Weighted"],
            "pipeline-stage-mix" => ["Stage", "Deals", "Value", "Share"],
            "revenue-and-conversion-trend" => ["Period", "Revenue", "Leads", "Converted"],
            "win-loss-analysis" => ["Outcome", "Deals", "Value", "Avg Deal"],
            "sales-cycle-duration" => ["Stage", "Deals", "Avg Age", "Avg Value"],
            "top-deals" => ["Deal", "Account", "Stage", "Amount"],
            "lead-conversion-funnel" => ["Funnel Step", "Count", "", ""],
            "lead-source-performance" => ["Source", "Leads", "Converted", "Conv Rate"],
            "lead-aging" => ["Age Bucket", "Lead Count", "", ""],
            "lead-score-distribution" => ["Score Band", "Leads", "Avg Score", "Avg Confidence"],
            "lead-quality-vs-conversation-signal" => ["Lead", "Owner", "Qualification", "Conversation"],
            "cqvs-readiness-heatmap" => ["Factor", "Unknown", "Assumed", "Verified"],
            "activity-summary" => ["Activity Type", "Volume", "Completed", "Overdue"],
            "team-performance" => ["Owner", "Won Deals", "Revenue", "Conversion"],
            "customer-growth" => ["Month", "Customers", "Industry", "Trend"],
            "customer-revenue-concentration" => ["Customer", "Revenue", "Share", "Tier"],
            "campaign-roi" => ["Campaign", "Spend", "Revenue", "ROI"],
            "email-engagement" => ["Email", "Sent", "Opened", "Clicked"],
            "pipeline-health-scorecard" => ["Stage", "Pipeline", "Weighted", "Aging"],
            "manager-pipeline-health" => ["Stage", "Deals", "Avg Age", "Exposure"],
            _ => ["Column 1", "Column 2", "Column 3", "Column 4"]
        };
}
