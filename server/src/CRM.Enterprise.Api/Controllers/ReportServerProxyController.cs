using System.Net.Http.Headers;
using CRM.Enterprise.Application.Reporting;
using CRM.Enterprise.Infrastructure.Reporting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Api.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/report-server/proxy")]
public class ReportServerProxyController : ControllerBase
{
    private static readonly HashSet<string> RequestHeadersToSkip = new(StringComparer.OrdinalIgnoreCase)
    {
        "Host",
        "Authorization",
        "Content-Length"
    };

    private static readonly HashSet<string> ResponseHeadersToSkip = new(StringComparer.OrdinalIgnoreCase)
    {
        "Transfer-Encoding"
    };

    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IReportServerClient _reportServerClient;
    private readonly ReportingOptions _options;

    public ReportServerProxyController(
        IHttpClientFactory httpClientFactory,
        IReportServerClient reportServerClient,
        IOptions<ReportingOptions> options)
    {
        _httpClientFactory = httpClientFactory;
        _reportServerClient = reportServerClient;
        _options = options.Value;
    }

    [Route("{**path}")]
    [AcceptVerbs("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")]
    public async Task Proxy(string? path, CancellationToken ct)
    {
        if (!_options.UseReportServer)
        {
            Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }

        var normalizedPath = (path ?? string.Empty).TrimStart('/');
        var allowAnonymous = IsAnonymousViewerResourceRequest(normalizedPath, Request.Method);

        if (!allowAnonymous && !(User.Identity?.IsAuthenticated ?? false))
        {
            Response.StatusCode = StatusCodes.Status401Unauthorized;
            return;
        }

        var token = await _reportServerClient.AuthenticateAsync(ct);
        if (token is null)
        {
            Response.StatusCode = StatusCodes.Status502BadGateway;
            await Response.WriteAsync("Failed to authenticate with Report Server.", ct);
            return;
        }

        var baseUrl = _options.ReportServerUrl!.TrimEnd('/');
        var targetUrl = $"{baseUrl}/{normalizedPath}{Request.QueryString}";
        using var upstream = new HttpRequestMessage(new HttpMethod(Request.Method), targetUrl);
        upstream.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.AccessToken);

        foreach (var header in Request.Headers)
        {
            if (RequestHeadersToSkip.Contains(header.Key))
            {
                continue;
            }

            if (!upstream.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray()))
            {
                upstream.Content ??= new StreamContent(Request.Body);
                upstream.Content.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
            }
        }

        if (upstream.Content is null && (Request.ContentLength > 0 || Request.Headers.ContainsKey("Content-Type")))
        {
            upstream.Content = new StreamContent(Request.Body);
        }

        var client = _httpClientFactory.CreateClient("ReportServerProxy");
        using var upstreamResponse = await client.SendAsync(upstream, HttpCompletionOption.ResponseHeadersRead, ct);

        Response.StatusCode = (int)upstreamResponse.StatusCode;

        foreach (var header in upstreamResponse.Headers)
        {
            if (!ResponseHeadersToSkip.Contains(header.Key))
            {
                Response.Headers[header.Key] = header.Value.ToArray();
            }
        }

        foreach (var header in upstreamResponse.Content.Headers)
        {
            if (!ResponseHeadersToSkip.Contains(header.Key))
            {
                Response.Headers[header.Key] = header.Value.ToArray();
            }
        }

        await upstreamResponse.Content.CopyToAsync(Response.Body, ct);
    }

    private static bool IsAnonymousViewerResourceRequest(string path, string method)
    {
        if (!HttpMethods.IsGet(method))
        {
            return false;
        }

        return path.Equals("api/reports/configuration", StringComparison.OrdinalIgnoreCase)
            || path.Contains("/resources/", StringComparison.OrdinalIgnoreCase)
            || path.StartsWith("api/reports/resources/", StringComparison.OrdinalIgnoreCase);
    }
}
