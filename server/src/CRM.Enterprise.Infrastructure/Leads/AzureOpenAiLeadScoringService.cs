using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Domain.Entities;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class AzureOpenAiLeadScoringService : ILeadScoringService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly HttpClient _httpClient;
    private readonly AzureOpenAiOptions _options;

    public AzureOpenAiLeadScoringService(HttpClient httpClient, IOptions<AzureOpenAiOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
    }

    public async Task<LeadAiScore> ScoreAsync(Lead lead, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(_options.ApiKey))
        {
            throw new InvalidOperationException("Azure OpenAI API key is not configured.");
        }

        if (string.IsNullOrWhiteSpace(_options.Deployment))
        {
            throw new InvalidOperationException("Azure OpenAI deployment is not configured.");
        }

        if (string.IsNullOrWhiteSpace(_options.ApiVersion))
        {
            throw new InvalidOperationException("Azure OpenAI API version is not configured.");
        }

        var request = new
        {
            temperature = _options.Temperature,
            max_tokens = _options.MaxTokens,
            response_format = new { type = "json_object" },
            messages = new[]
            {
                new
                {
                    role = "system",
                    content = "You are a CRM lead scoring engine. Return JSON with fields: score (0-100 int), confidence (0-1 number), rationale (<=240 chars)."
                },
                new
                {
                    role = "user",
                    content = BuildLeadPrompt(lead)
                }
            }
        };

        var requestUri = $"openai/deployments/{_options.Deployment}/chat/completions?api-version={_options.ApiVersion}";
        using var message = new HttpRequestMessage(HttpMethod.Post, requestUri);
        message.Headers.Add("api-key", _options.ApiKey);
        message.Content = JsonContent.Create(request, options: JsonOptions);

        using var response = await _httpClient.SendAsync(message, cancellationToken);
        var responseText = await response.Content.ReadAsStringAsync(cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Azure OpenAI error: {response.StatusCode} {responseText}");
        }

        var payload = JsonSerializer.Deserialize<OpenAiChatResponse>(responseText, JsonOptions);
        var content = payload?.Choices?.FirstOrDefault()?.Message?.Content;
        if (string.IsNullOrWhiteSpace(content))
        {
            throw new InvalidOperationException("Azure OpenAI returned an empty response.");
        }

        return ParseScore(content);
    }

    private static string BuildLeadPrompt(Lead lead)
    {
        return $"Lead profile:\n" +
               $"Name: {lead.FirstName} {lead.LastName}\n" +
               $"Company: {lead.CompanyName ?? "N/A"}\n" +
               $"Job title: {lead.JobTitle ?? "N/A"}\n" +
               $"Email: {lead.Email ?? "N/A"}\n" +
               $"Phone: {lead.Phone ?? "N/A"}\n" +
               $"Source: {lead.Source ?? "N/A"}\n" +
               $"Territory: {lead.Territory ?? "N/A"}\n" +
               $"Linked Account: {(lead.AccountId.HasValue ? "Yes" : "No")}\n" +
               $"Linked Contact: {(lead.ContactId.HasValue ? "Yes" : "No")}\n" +
               $"Status: {(lead.Status?.Name ?? "Unknown")}";
    }

    private static LeadAiScore ParseScore(string jsonContent)
    {
        using var document = JsonDocument.Parse(jsonContent);
        var root = document.RootElement;

        var score = root.TryGetProperty("score", out var scoreElement) && scoreElement.TryGetInt32(out var scoreValue)
            ? Math.Clamp(scoreValue, 0, 100)
            : 0;

        var confidence = root.TryGetProperty("confidence", out var confidenceElement) && confidenceElement.TryGetDecimal(out var confidenceValue)
            ? Math.Clamp(confidenceValue, 0m, 1m)
            : 0.5m;

        var rationale = root.TryGetProperty("rationale", out var rationaleElement)
            ? (rationaleElement.GetString() ?? string.Empty).Trim()
            : string.Empty;

        if (rationale.Length > 240)
        {
            rationale = rationale[..240];
        }

        return new LeadAiScore(score, confidence, rationale);
    }

    private sealed class OpenAiChatResponse
    {
        public OpenAiChoice[]? Choices { get; set; }
    }

    private sealed class OpenAiChoice
    {
        public OpenAiMessage? Message { get; set; }
    }

    private sealed class OpenAiMessage
    {
        public string? Content { get; set; }
    }
}
