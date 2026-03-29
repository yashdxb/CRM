namespace CRM.Enterprise.Infrastructure.Reporting;

public sealed class ReportingOptions
{
    public const string SectionName = "Reporting";

    public bool EnableEmbeddedViewer { get; set; }
    public string? DesignerRequiredPermission { get; set; }
    public string? ReportServerUrl { get; set; }
    public string? ReportServerUsername { get; set; }
    public string? ReportServerPassword { get; set; }
    public bool IgnoreInvalidTlsCertificate { get; set; }

    // Embedded mode should win when enabled so local/dev authoring and library flows
    // do not silently fall back to a configured external Report Server.
    public bool UseReportServer => !EnableEmbeddedViewer && !string.IsNullOrWhiteSpace(ReportServerUrl);
}
