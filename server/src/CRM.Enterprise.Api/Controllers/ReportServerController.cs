using CRM.Enterprise.Api.Contracts.Reports;
using CRM.Enterprise.Application.Reporting;
using CRM.Enterprise.Infrastructure.Reporting;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.ReportsView)]
[ApiController]
[Route("api/report-server")]
public class ReportServerController : ControllerBase
{
    private readonly IReportServerClient _client;
    private readonly ReportingOptions _options;

    public ReportServerController(
        IReportServerClient client,
        IOptions<ReportingOptions> options)
    {
        _client = client;
        _options = options.Value;
    }

    /// <summary>
    /// Returns Report Server configuration for the frontend.
    /// </summary>
    [HttpGet("config")]
    public ActionResult<ReportServerConfigResponse> GetConfig()
    {
        if (!_options.UseReportServer)
        {
            return Ok(new ReportServerConfigResponse(
                Enabled: false,
                ReportServerUrl: null,
                ReportServiceUrl: null,
                DesignerUrl: null));
        }

        var baseUrl = _options.ReportServerUrl!.TrimEnd('/');

        return Ok(new ReportServerConfigResponse(
            Enabled: true,
            ReportServerUrl: baseUrl,
            ReportServiceUrl: "/api/report-server/proxy/api/reports",
            DesignerUrl: baseUrl));
    }

    /// <summary>
    /// Authenticates with Report Server and returns a token for the report viewer.
    /// </summary>
    [HttpPost("token")]
    public async Task<ActionResult<ReportServerTokenResponse>> GetToken(CancellationToken ct)
    {
        if (!_client.IsConfigured)
            return BadRequest("Report Server is not configured.");

        var result = await _client.AuthenticateAsync(ct);
        if (result is null)
            return StatusCode(502, "Failed to authenticate with Report Server.");

        return Ok(new ReportServerTokenResponse(result.AccessToken, result.TokenType, result.ExpiresIn));
    }

    /// <summary>
    /// Returns the report catalog from Report Server.
    /// </summary>
    [HttpGet("catalog")]
    public async Task<ActionResult<IReadOnlyList<ReportCatalogItemResponse>>> GetCatalog(CancellationToken ct)
    {
        if (!_client.IsConfigured)
            return Ok(Array.Empty<ReportCatalogItemResponse>());

        var items = await _client.GetCatalogAsync(ct);

        return Ok(items.Select(i => new ReportCatalogItemResponse(
            i.Id, i.Name, i.Description,
            i.CategoryId, i.CategoryName, i.Extension,
            i.CreatedOn, i.ModifiedOn)).ToList());
    }

    /// <summary>
    /// Returns report categories from Report Server.
    /// </summary>
    [HttpGet("categories")]
    public async Task<ActionResult<IReadOnlyList<ReportCategoryResponse>>> GetCategories(CancellationToken ct)
    {
        if (!_client.IsConfigured)
            return Ok(Array.Empty<ReportCategoryResponse>());

        var categories = await _client.GetCategoriesAsync(ct);
        return Ok(categories.Select(c => new ReportCategoryResponse(c.Id, c.Name)).ToList());
    }

    [HttpGet("reports/{reportId}/parameters/{parameterName}/options")]
    public async Task<ActionResult<IReadOnlyList<ReportParameterOptionResponse>>> GetParameterOptions(
        string reportId,
        string parameterName,
        CancellationToken ct)
    {
        if (!_client.IsConfigured)
            return Ok(Array.Empty<ReportParameterOptionResponse>());

        var options = await _client.GetParameterOptionsAsync(reportId, parameterName, ct);
        return Ok(options.Select(o => new ReportParameterOptionResponse(o.Value, o.Label)).ToList());
    }
}
