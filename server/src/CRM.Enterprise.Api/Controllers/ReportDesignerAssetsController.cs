using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Telerik.WebReportDesigner.Services.Controllers;

namespace CRM.Enterprise.Api.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/report-designer-assets")]
public sealed class ReportDesignerAssetsController : ControllerBase
{
    private static readonly IReadOnlyDictionary<string, (string ResourceName, string ContentType)> ResourceMap =
        new Dictionary<string, (string ResourceName, string ContentType)>(StringComparer.OrdinalIgnoreCase)
        {
            ["webReportDesigner-20.0.26.304.min.css"] = (
                "Telerik.WebReportDesigner.Services.Resources.styles.webReportDesigner-20.0.26.304.min.css",
                "text/css"),
            ["webReportDesignerTheme-20.0.26.304.min.css"] = (
                "Telerik.WebReportDesigner.Services.Resources.ext_styles.webReportDesignerTheme-20.0.26.304.min.css",
                "text/css"),
            ["jquery.ui-1.14.1.min.css"] = (
                "Telerik.WebReportDesigner.Services.Resources.ext_styles.jquery.ui-1.14.1.min.css",
                "text/css"),
            ["webReportDesigner-20.0.26.304.min.js"] = (
                "Telerik.WebReportDesigner.Services.Resources.js.webReportDesigner-20.0.26.304.min.js",
                "application/javascript"),
            ["jquery.ui-1.14.1.min.js"] = (
                "Telerik.WebReportDesigner.Services.Resources.ext_js.jquery.ui-1.14.1.min.js",
                "application/javascript"),
            ["clipboard.polyfill-2.8.1.min.js"] = (
                "Telerik.WebReportDesigner.Services.Resources.ext_js.clipboard.polyfill-2.8.1.min.js",
                "application/javascript"),
            ["clipboard-polyfill.min.js"] = (
                "Telerik.WebReportDesigner.Services.Resources.ext_js.clipboard.polyfill-2.8.1.min.js",
                "application/javascript"),
            ["clipboard.polyfill.min.js"] = (
                "Telerik.WebReportDesigner.Services.Resources.ext_js.clipboard.polyfill-2.8.1.min.js",
                "application/javascript")
        };

    private static readonly Assembly TelerikDesignerAssembly = typeof(ReportDesignerControllerBase).Assembly;

    [HttpGet("{fileName}")]
    public IActionResult Get(string fileName)
    {
        if (!ResourceMap.TryGetValue(fileName, out var descriptor))
        {
            return NotFound();
        }

        using var stream = TelerikDesignerAssembly.GetManifestResourceStream(descriptor.ResourceName);
        if (stream is null)
        {
            return NotFound();
        }

        using var memory = new MemoryStream();
        stream.CopyTo(memory);
        var bytes = memory.ToArray();

        Response.Headers.CacheControl = "public,max-age=3600";
        return File(bytes, descriptor.ContentType);
    }
}
