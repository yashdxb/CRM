using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using CRM.Enterprise.Application.Reporting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Reporting;

public sealed class ReportServerClient : IReportServerClient
{
    private readonly HttpClient _http;
    private readonly ReportingOptions _options;
    private readonly ILogger<ReportServerClient> _logger;
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    private string? _cachedToken;
    private DateTimeOffset _tokenExpiry = DateTimeOffset.MinValue;

    public ReportServerClient(
        HttpClient http,
        IOptions<ReportingOptions> options,
        ILogger<ReportServerClient> logger)
    {
        _http = http;
        _options = options.Value;
        _logger = logger;
    }

    public bool IsConfigured => _options.UseReportServer;

    public async Task<ReportServerTokenResult?> AuthenticateAsync(CancellationToken ct = default)
    {
        if (!IsConfigured) return null;

        // Return cached token if still valid (with 60s buffer)
        if (_cachedToken is not null && _tokenExpiry > DateTimeOffset.UtcNow.AddSeconds(60))
        {
            return new ReportServerTokenResult(_cachedToken, "Bearer", (int)(_tokenExpiry - DateTimeOffset.UtcNow).TotalSeconds);
        }

        var baseUrl = _options.ReportServerUrl!.TrimEnd('/');
        var tokenUrl = $"{baseUrl}/Token";

        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["grant_type"] = "password",
            ["username"] = _options.ReportServerUsername ?? string.Empty,
            ["password"] = _options.ReportServerPassword ?? string.Empty
        });

        try
        {
            var response = await _http.PostAsync(tokenUrl, content, ct);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<TokenResponse>(JsonOptions, ct);
            if (result is null) return null;

            _cachedToken = result.AccessToken;
            _tokenExpiry = DateTimeOffset.UtcNow.AddSeconds(result.ExpiresIn);

            return new ReportServerTokenResult(result.AccessToken, result.TokenType ?? "Bearer", result.ExpiresIn);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to authenticate with Report Server at {Url}", tokenUrl);
            _cachedToken = null;
            _tokenExpiry = DateTimeOffset.MinValue;
            return null;
        }
    }

    public async Task<IReadOnlyList<ReportCatalogItem>> GetCatalogAsync(CancellationToken ct = default)
    {
        if (!IsConfigured) return [];

        var token = await AuthenticateAsync(ct);
        if (token is null) return [];

        var categories = await GetCategoriesAsync(ct);
        var categoryById = categories.ToDictionary(c => c.Id, c => c.Name, StringComparer.OrdinalIgnoreCase);

        var baseUrl = _options.ReportServerUrl!.TrimEnd('/');

        using var request = new HttpRequestMessage(HttpMethod.Get, $"{baseUrl}/api/reportserver/v2/reports");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.AccessToken);

        try
        {
            var response = await _http.SendAsync(request, ct);
            response.EnsureSuccessStatusCode();

            var reports = await response.Content.ReadFromJsonAsync<List<CatalogReportResponse>>(JsonOptions, ct);
            if (reports is null) return [];

            return reports
                .Select(r => new ReportCatalogItem(
                    r.Id ?? string.Empty,
                    r.Name ?? string.Empty,
                    r.Description ?? string.Empty,
                    r.CategoryId ?? string.Empty,
                    ResolveCategoryName(r, categoryById),
                    r.Extension ?? ".trdp",
                    r.LastModifiedDateUtc,
                    r.LastModifiedDateUtc))
                .ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch report catalog from Report Server");
            return [];
        }
    }

    public async Task<IReadOnlyList<ReportCategoryDto>> GetCategoriesAsync(CancellationToken ct = default)
    {
        if (!IsConfigured) return [];

        var token = await AuthenticateAsync(ct);
        if (token is null) return [];

        var baseUrl = _options.ReportServerUrl!.TrimEnd('/');

        using var request = new HttpRequestMessage(HttpMethod.Get, $"{baseUrl}/api/reportserver/v2/categories");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.AccessToken);

        try
        {
            var response = await _http.SendAsync(request, ct);
            response.EnsureSuccessStatusCode();

            var categories = await response.Content.ReadFromJsonAsync<List<CategoryResponse>>(JsonOptions, ct);
            if (categories is null) return [];

            return categories
                .Select(c => new ReportCategoryDto(c.Id ?? string.Empty, c.Name ?? string.Empty))
                .ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch report categories from Report Server");
            return [];
        }
    }

    // Internal DTOs for deserialization
    private sealed record TokenResponse(
        [property: JsonPropertyName("accessToken")] string AccessToken,
        [property: JsonPropertyName("tokenType")] string? TokenType,
        [property: JsonPropertyName("expiresIn")] int ExpiresIn);

    private sealed class CatalogReportResponse
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? Extension { get; set; }
        public DateTimeOffset LastModifiedDateUtc { get; set; }
    }

    private sealed class CategoryResponse
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
    }

    private static string ResolveCategoryName(
        CatalogReportResponse report,
        IReadOnlyDictionary<string, string> categoryById)
    {
        if (!string.IsNullOrWhiteSpace(report.CategoryName))
        {
            return report.CategoryName;
        }

        if (!string.IsNullOrWhiteSpace(report.CategoryId) &&
            categoryById.TryGetValue(report.CategoryId, out var categoryName))
        {
            return categoryName;
        }

        return string.Empty;
    }
}
