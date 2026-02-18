using System.Text;
using System.Text.Json;

namespace CRM.Enterprise.Infrastructure.AI;

public sealed class AzureSearchKnowledgeClient
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly HttpClient _httpClient;
    private readonly AzureSearchKnowledgeOptions _options;

    public AzureSearchKnowledgeClient(HttpClient httpClient, AzureSearchKnowledgeOptions options)
    {
        _httpClient = httpClient;
        _options = options;
    }

    public bool IsConfigured =>
        !string.IsNullOrWhiteSpace(_options.Endpoint) &&
        !string.IsNullOrWhiteSpace(_options.ApiKey) &&
        !string.IsNullOrWhiteSpace(_options.IndexName);

    public async Task<IReadOnlyList<KnowledgeSearchDocument>> SearchAsync(string query, CancellationToken cancellationToken)
    {
        if (!IsConfigured || string.IsNullOrWhiteSpace(query))
        {
            return Array.Empty<KnowledgeSearchDocument>();
        }

        var requestBody = new
        {
            search = query,
            top = Math.Clamp(_options.Top, 1, 20),
            select = "path,title,module,version,status,content",
            filter = _options.ApprovedOnly ? "status eq 'approved'" : null
        };

        var path = $"indexes/{_options.IndexName}/docs/search?api-version={_options.ApiVersion}";
        using var request = new HttpRequestMessage(HttpMethod.Post, path);
        request.Headers.Add("api-key", _options.ApiKey);
        request.Content = new StringContent(JsonSerializer.Serialize(requestBody, JsonOptions), Encoding.UTF8, "application/json");

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        var payload = await response.Content.ReadAsStringAsync(cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Knowledge search failed: {response.StatusCode} {payload}");
        }

        using var document = JsonDocument.Parse(payload);
        if (!document.RootElement.TryGetProperty("value", out var value) || value.ValueKind != JsonValueKind.Array)
        {
            return Array.Empty<KnowledgeSearchDocument>();
        }

        var rows = new List<KnowledgeSearchDocument>();
        foreach (var item in value.EnumerateArray())
        {
            var content = item.TryGetProperty("content", out var contentProp) ? contentProp.GetString() ?? string.Empty : string.Empty;
            var maxChars = Math.Max(200, _options.MaxContentCharsPerDoc);
            if (content.Length > maxChars)
            {
                content = content[..maxChars];
            }

            rows.Add(new KnowledgeSearchDocument(
                Path: item.TryGetProperty("path", out var pathProp) ? pathProp.GetString() ?? string.Empty : string.Empty,
                Title: item.TryGetProperty("title", out var titleProp) ? titleProp.GetString() ?? string.Empty : string.Empty,
                Module: item.TryGetProperty("module", out var moduleProp) ? moduleProp.GetString() ?? string.Empty : string.Empty,
                Version: item.TryGetProperty("version", out var versionProp) ? versionProp.GetString() ?? string.Empty : string.Empty,
                Status: item.TryGetProperty("status", out var statusProp) ? statusProp.GetString() ?? string.Empty : string.Empty,
                Content: content));
        }

        return rows;
    }
}

public sealed record KnowledgeSearchDocument(
    string Path,
    string Title,
    string Module,
    string Version,
    string Status,
    string Content);
