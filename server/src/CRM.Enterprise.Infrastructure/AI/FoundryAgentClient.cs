using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace CRM.Enterprise.Infrastructure.AI;

public sealed class FoundryAgentClient
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly HttpClient _httpClient;
    private readonly FoundryAgentOptions _options;

    public FoundryAgentClient(HttpClient httpClient, FoundryAgentOptions options)
    {
        _httpClient = httpClient;
        _options = options;
    }

    public bool IsConfigured => !string.IsNullOrWhiteSpace(_options.Endpoint)
                                && !string.IsNullOrWhiteSpace(_options.ApiKey)
                                && !string.IsNullOrWhiteSpace(_options.AgentId);

    public async Task<string> CreateThreadAsync(CancellationToken cancellationToken)
    {
        using var request = new HttpRequestMessage(HttpMethod.Post, $"openai/threads?api-version={_options.ApiVersion}");
        request.Headers.Add("api-key", _options.ApiKey);
        request.Content = new StringContent("{}", Encoding.UTF8, "application/json");

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        var payload = await response.Content.ReadAsStringAsync(cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Foundry thread create failed: {response.StatusCode} {payload}");
        }

        using var document = JsonDocument.Parse(payload);
        if (document.RootElement.TryGetProperty("id", out var id))
        {
            return id.GetString() ?? throw new InvalidOperationException("Foundry thread id missing.");
        }

        throw new InvalidOperationException("Foundry thread id missing.");
    }

    public async Task AddMessageAsync(string threadId, string role, string content, CancellationToken cancellationToken)
    {
        var body = new { role, content };
        using var request = new HttpRequestMessage(HttpMethod.Post, $"openai/threads/{threadId}/messages?api-version={_options.ApiVersion}");
        request.Headers.Add("api-key", _options.ApiKey);
        request.Content = new StringContent(JsonSerializer.Serialize(body, JsonOptions), Encoding.UTF8, "application/json");

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        var payload = await response.Content.ReadAsStringAsync(cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Foundry add message failed: {response.StatusCode} {payload}");
        }
    }

    public async Task<string> RunAndGetReplyAsync(string threadId, CancellationToken cancellationToken)
    {
        var runBody = new { assistant_id = _options.AgentId };
        using var runRequest = new HttpRequestMessage(HttpMethod.Post, $"openai/threads/{threadId}/runs?api-version={_options.ApiVersion}");
        runRequest.Headers.Add("api-key", _options.ApiKey);
        runRequest.Content = new StringContent(JsonSerializer.Serialize(runBody, JsonOptions), Encoding.UTF8, "application/json");

        using var runResponse = await _httpClient.SendAsync(runRequest, cancellationToken);
        var runPayload = await runResponse.Content.ReadAsStringAsync(cancellationToken);
        if (!runResponse.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Foundry run failed: {runResponse.StatusCode} {runPayload}");
        }

        using var runDocument = JsonDocument.Parse(runPayload);
        var runId = runDocument.RootElement.GetProperty("id").GetString();
        if (string.IsNullOrWhiteSpace(runId))
        {
            throw new InvalidOperationException("Foundry run id missing.");
        }

        var status = string.Empty;
        for (var attempt = 0; attempt < _options.PollAttempts; attempt++)
        {
            using var statusRequest = new HttpRequestMessage(HttpMethod.Get, $"openai/threads/{threadId}/runs/{runId}?api-version={_options.ApiVersion}");
            statusRequest.Headers.Add("api-key", _options.ApiKey);

            using var statusResponse = await _httpClient.SendAsync(statusRequest, cancellationToken);
            var statusPayload = await statusResponse.Content.ReadAsStringAsync(cancellationToken);
            if (!statusResponse.IsSuccessStatusCode)
            {
                throw new InvalidOperationException($"Foundry run status failed: {statusResponse.StatusCode} {statusPayload}");
            }

            using var statusDoc = JsonDocument.Parse(statusPayload);
            status = statusDoc.RootElement.GetProperty("status").GetString() ?? string.Empty;
            if (string.Equals(status, "completed", StringComparison.OrdinalIgnoreCase))
            {
                return await FetchLatestAssistantReplyAsync(threadId, cancellationToken);
            }

            if (string.Equals(status, "failed", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(status, "cancelled", StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidOperationException($"Foundry run failed with status '{status}'.");
            }

            await Task.Delay(_options.PollDelayMs, cancellationToken);
        }

        throw new InvalidOperationException($"Foundry run did not complete after {_options.PollAttempts} attempts (last status: '{status}').");
    }

    private async Task<string> FetchLatestAssistantReplyAsync(string threadId, CancellationToken cancellationToken)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, $"openai/threads/{threadId}/messages?api-version={_options.ApiVersion}");
        request.Headers.Add("api-key", _options.ApiKey);

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        var payload = await response.Content.ReadAsStringAsync(cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Foundry messages failed: {response.StatusCode} {payload}");
        }

        using var document = JsonDocument.Parse(payload);
        if (!document.RootElement.TryGetProperty("data", out var data) || data.GetArrayLength() == 0)
        {
            throw new InvalidOperationException("Foundry returned no messages.");
        }

        foreach (var message in data.EnumerateArray())
        {
            if (!message.TryGetProperty("role", out var roleProp))
            {
                continue;
            }

            if (!string.Equals(roleProp.GetString(), "assistant", StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            if (message.TryGetProperty("content", out var contentArray) && contentArray.ValueKind == JsonValueKind.Array)
            {
                foreach (var contentItem in contentArray.EnumerateArray())
                {
                    if (contentItem.TryGetProperty("text", out var textProp)
                        && textProp.TryGetProperty("value", out var valueProp))
                    {
                        var text = valueProp.GetString();
                        if (!string.IsNullOrWhiteSpace(text))
                        {
                            return text.Trim();
                        }
                    }
                }
            }
        }

        throw new InvalidOperationException("Foundry did not return an assistant reply.");
    }
}
