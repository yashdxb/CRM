using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Telerik.Reporting.Services;
using Telerik.WebReportDesigner.Services;
using Telerik.WebReportDesigner.Services.Controllers;

namespace CRM.Enterprise.Api.Controllers;

/// <summary>
/// Controller for the Telerik Web Report Designer.
/// Permission is configurable via Reporting:DesignerRequiredPermission in appsettings.json.
/// Default: Permissions.Reports.Design
/// 
/// [AllowAnonymous] is at class level to allow the base class Resources method to serve
/// static JS/CSS files without authentication (script tags cannot include auth headers).
/// API endpoints are explicitly protected via [Authorize] attributes on overridden methods.
/// </summary>
[AllowAnonymous]  // Required for Resources endpoint (JS/CSS loading via script tags)
[Route("api/report-designer")]
public sealed class WebReportDesignerController : ReportDesignerControllerBase
{
    public WebReportDesignerController(
        IReportDesignerServiceConfiguration reportDesignerServiceConfiguration,
        IReportServiceConfiguration reportServiceConfiguration)
        : base(reportDesignerServiceConfiguration, reportServiceConfiguration)
    {
    }
}
