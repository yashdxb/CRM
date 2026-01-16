using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using CRM.Enterprise.Application.Notifications;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Notifications;

public class GraphEmailSender : IEmailSender
{
    private readonly GraphMailOptions _options;
    private readonly HttpClient _httpClient;
    private readonly object _lock = new();
    private string? _token;
    private DateTimeOffset _tokenExpiresAt = DateTimeOffset.MinValue;

    public GraphEmailSender(IOptions<GraphMailOptions> options, HttpClient httpClient)
    {
        _options = options.Value;
        _httpClient = httpClient;
    }

    public async Task SendAsync(string toEmail, string subject, string htmlBody, string? textBody = null, CancellationToken cancellationToken = default)
    {
        if (!_options.IsValid() || string.IsNullOrWhiteSpace(toEmail))
        {
            return;
        }

        var token = await GetAccessTokenAsync(cancellationToken);
        if (string.IsNullOrWhiteSpace(token))
        {
            return;
        }

        var payload = new
        {
            message = new
            {
                subject,
                body = new
                {
                    contentType = "HTML",
                    content = htmlBody
                },
                toRecipients = new[]
                {
                    new
                    {
                        emailAddress = new
                        {
                            address = toEmail
                        }
                    }
                }
            },
            saveToSentItems = "false"
        };

        var request = new HttpRequestMessage(HttpMethod.Post, $"https://graph.microsoft.com/v1.0/users/{_options.SenderEmail}/sendMail");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

        await _httpClient.SendAsync(request, cancellationToken);
    }

    private async Task<string?> GetAccessTokenAsync(CancellationToken cancellationToken)
    {
        if (!NeedsRefresh())
        {
            return _token;
        }

        lock (_lock)
        {
            if (!NeedsRefresh())
            {
                return _token;
            }
        }

        var tokenEndpoint = $"https://login.microsoftonline.com/{_options.TenantId}/oauth2/v2.0/token";
        var form = new Dictionary<string, string>
        {
            { "client_id", _options.ClientId },
            { "client_secret", _options.ClientSecret },
            { "scope", "https://graph.microsoft.com/.default" },
            { "grant_type", "client_credentials" }
        };

        using var response = await _httpClient.PostAsync(tokenEndpoint, new FormUrlEncodedContent(form), cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        var body = await response.Content.ReadAsStringAsync(cancellationToken);
        using var doc = JsonDocument.Parse(body);
        if (!doc.RootElement.TryGetProperty("access_token", out var accessTokenElement))
        {
            return null;
        }

        var accessToken = accessTokenElement.GetString();
        var expiresIn = doc.RootElement.TryGetProperty("expires_in", out var expiresElement)
            ? expiresElement.GetInt32()
            : 3600;

        lock (_lock)
        {
            _token = accessToken;
            _tokenExpiresAt = DateTimeOffset.UtcNow.AddSeconds(expiresIn - 60);
        }

        return accessToken;
    }

    private bool NeedsRefresh()
    {
        return string.IsNullOrWhiteSpace(_token) || _tokenExpiresAt <= DateTimeOffset.UtcNow;
    }
}
