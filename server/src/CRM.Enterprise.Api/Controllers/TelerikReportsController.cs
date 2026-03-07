using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Telerik.Reporting.Services;
using Telerik.Reporting.Services.AspNetCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.ReportsView)]
[ApiController]
[Route("api/telerik-reports")]
public sealed class TelerikReportsController : ReportsControllerBase
{
    public TelerikReportsController(IReportServiceConfiguration reportServiceConfiguration)
        : base(reportServiceConfiguration)
    {
    }
}
