using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.IO.Compression;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml.Linq;
using CRM.Enterprise.Application.Reporting;
using Microsoft.Data.SqlClient;
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

    public async Task<IReadOnlyList<ReportParameterOptionDto>> GetParameterOptionsAsync(
        string reportId,
        string parameterName,
        CancellationToken ct = default)
    {
        if (!IsConfigured || string.IsNullOrWhiteSpace(reportId) || string.IsNullOrWhiteSpace(parameterName))
        {
            return [];
        }

        var token = await AuthenticateAsync(ct);
        if (token is null) return [];

        var report = await GetReportDetailsAsync(reportId, token.AccessToken, ct);
        if (report is null || string.IsNullOrWhiteSpace(report.LastRevisionId))
        {
            return [];
        }

        var packageBytes = await DownloadRevisionPackageAsync(reportId, report.LastRevisionId, token.AccessToken, ct);
        if (packageBytes is null || packageBytes.Length == 0)
        {
            return [];
        }

        try
        {
            using var archive = new ZipArchive(new MemoryStream(packageBytes), ZipArchiveMode.Read, leaveOpen: false);
            var definitionEntry = archive.GetEntry("definition.xml");
            if (definitionEntry is null)
            {
                return [];
            }

            using var definitionStream = definitionEntry.Open();
            var document = XDocument.Load(definitionStream);
            var ns = document.Root?.Name.Namespace ?? XNamespace.None;

            var parameter = document
                .Descendants(ns + "ReportParameter")
                .FirstOrDefault(p => string.Equals((string?)p.Attribute("Name"), parameterName, StringComparison.OrdinalIgnoreCase));

            var dataSourceName = parameter?
                .Element(ns + "AvailableValues")?
                .Attribute("DataSourceName")?
                .Value;

            if (string.IsNullOrWhiteSpace(dataSourceName))
            {
                return [];
            }

            var displayMember = ExtractFieldName(parameter
                .Element(ns + "AvailableValues")?
                .Attribute("DisplayMember")?
                .Value);

            var valueMember = ExtractFieldName(parameter
                .Element(ns + "AvailableValues")?
                .Attribute("ValueMember")?
                .Value);

            var dataSource = document
                .Descendants(ns + "SqlDataSource")
                .FirstOrDefault(d => string.Equals((string?)d.Attribute("Name"), dataSourceName, StringComparison.OrdinalIgnoreCase));

            if (dataSource is null)
            {
                return [];
            }

            var connectionString = (string?)dataSource.Attribute("ConnectionString");
            var selectCommand = (string?)dataSource.Attribute("SelectCommand");

            if (string.IsNullOrWhiteSpace(connectionString) || string.IsNullOrWhiteSpace(selectCommand))
            {
                return [];
            }

            return await ExecuteLookupQueryAsync(connectionString, selectCommand, valueMember, displayMember, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to resolve parameter options for report {ReportId} parameter {ParameterName}", reportId, parameterName);
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

    private sealed class ReportDetailsResponse
    {
        public string? Id { get; set; }
        public string? LastRevisionId { get; set; }
    }

    private sealed class ReportRevisionResponse
    {
        public string? Content { get; set; }
    }

    private async Task<ReportDetailsResponse?> GetReportDetailsAsync(
        string reportId,
        string accessToken,
        CancellationToken ct)
    {
        var baseUrl = _options.ReportServerUrl!.TrimEnd('/');

        using var request = new HttpRequestMessage(HttpMethod.Get, $"{baseUrl}/api/reportserver/v2/reports/{reportId}");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await _http.SendAsync(request, ct);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<ReportDetailsResponse>(JsonOptions, ct);
    }

    private async Task<byte[]?> DownloadRevisionPackageAsync(
        string reportId,
        string revisionId,
        string accessToken,
        CancellationToken ct)
    {
        var baseUrl = _options.ReportServerUrl!.TrimEnd('/');

        using var request = new HttpRequestMessage(HttpMethod.Get, $"{baseUrl}/api/reportserver/v2/reports/{reportId}/revisions/{revisionId}");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await _http.SendAsync(request, ct);
        response.EnsureSuccessStatusCode();

        var revision = await response.Content.ReadFromJsonAsync<ReportRevisionResponse>(JsonOptions, ct);
        if (string.IsNullOrWhiteSpace(revision?.Content))
        {
            return null;
        }

        return Convert.FromBase64String(revision.Content);
    }

    private static string? ExtractFieldName(string? expression)
    {
        if (string.IsNullOrWhiteSpace(expression))
        {
            return null;
        }

        const string prefix = "= Fields.";
        return expression.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)
            ? expression[prefix.Length..].Trim()
            : expression.Trim();
    }

    private async Task<IReadOnlyList<ReportParameterOptionDto>> ExecuteLookupQueryAsync(
        string connectionString,
        string selectCommand,
        string? valueMember,
        string? displayMember,
        CancellationToken ct)
    {
        var options = new List<ReportParameterOptionDto>();

        await using var connection = new SqlConnection(connectionString);
        await connection.OpenAsync(ct);

        await using var command = new SqlCommand(selectCommand, connection)
        {
            CommandTimeout = 30
        };

        await using var reader = await command.ExecuteReaderAsync(ct);
        while (await reader.ReadAsync(ct))
        {
            var value = ReadColumn(reader, valueMember);
            var label = ReadColumn(reader, displayMember);

            if (string.IsNullOrWhiteSpace(label) && string.IsNullOrWhiteSpace(value))
            {
                continue;
            }

            options.Add(new ReportParameterOptionDto(value, string.IsNullOrWhiteSpace(label) ? value : label));
        }

        return options;
    }

    private static string ReadColumn(SqlDataReader reader, string? columnName)
    {
        if (string.IsNullOrWhiteSpace(columnName))
        {
            return string.Empty;
        }

        var ordinal = reader.GetOrdinal(columnName);
        return reader.IsDBNull(ordinal) ? string.Empty : Convert.ToString(reader.GetValue(ordinal)) ?? string.Empty;
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
