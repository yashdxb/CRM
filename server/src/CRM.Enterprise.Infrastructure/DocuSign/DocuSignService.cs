using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using CRM.Enterprise.Application.DocuSign;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CRM.Enterprise.Infrastructure.DocuSign;

public sealed class DocuSignService : IDocuSignService
{
    private readonly HttpClient _httpClient;
    private readonly DocuSignOptions _options;
    private readonly ILogger<DocuSignService> _logger;

    private string? _cachedAccessToken;
    private DateTime _tokenExpiresAtUtc = DateTime.MinValue;

    private static readonly JsonSerializerOptions JsonOpts = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true,
    };

    public DocuSignService(HttpClient httpClient, IOptions<DocuSignOptions> options, ILogger<DocuSignService> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
        _logger = logger;
    }

    // ── Public API ──

    public async Task<DocuSignEnvelopeResult> SendEnvelopeAsync(SendEnvelopeRequest request, CancellationToken ct = default)
    {
        var token = await GetAccessTokenAsync(ct);
        if (token is null)
            return new DocuSignEnvelopeResult(false, null, "Failed to obtain DocuSign access token.");

        var documentBase64 = request.DocumentBase64
            ?? (request.DocumentBytes is not null ? Convert.ToBase64String(request.DocumentBytes) : null);

        // If no document provided, create a minimal placeholder PDF
        documentBase64 ??= CreatePlaceholderPdfBase64(request.DocumentName);

        var recipients = new
        {
            signers = request.Signers.Select((s, i) => new
            {
                email = s.Email,
                name = s.Name,
                recipientId = (i + 1).ToString(),
                routingOrder = (i + 1).ToString(),
                tabs = new
                {
                    signHereTabs = new[]
                    {
                        new
                        {
                            anchorString = "/sig/",
                            anchorUnits = "pixels",
                            anchorXOffset = "0",
                            anchorYOffset = "0",
                            documentId = "1",
                            pageNumber = "1",
                            recipientId = (i + 1).ToString(),
                            xPosition = "100",
                            yPosition = (200 + i * 100).ToString()
                        }
                    }
                }
            }).ToArray()
        };

        var envelope = new
        {
            emailSubject = request.EmailSubject,
            documents = new[]
            {
                new
                {
                    documentBase64,
                    name = request.DocumentName,
                    fileExtension = "pdf",
                    documentId = "1"
                }
            },
            recipients,
            status = "sent"
        };

        var url = $"{_options.BaseUri}/restapi/v2.1/accounts/{_options.ApiAccountId}/envelopes";
        using var httpRequest = new HttpRequestMessage(HttpMethod.Post, url);
        httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        httpRequest.Content = JsonContent.Create(envelope, options: JsonOpts);

        using var response = await _httpClient.SendAsync(httpRequest, ct);
        var body = await response.Content.ReadAsStringAsync(ct);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("DocuSign SendEnvelope failed: {Status} {Body}", response.StatusCode, body);
            return new DocuSignEnvelopeResult(false, null, $"DocuSign API error: {response.StatusCode}");
        }

        using var doc = JsonDocument.Parse(body);
        var envelopeId = doc.RootElement.GetProperty("envelopeId").GetString();
        _logger.LogInformation("DocuSign envelope created: {EnvelopeId}", envelopeId);

        return new DocuSignEnvelopeResult(true, envelopeId, null);
    }

    public async Task<DocuSignEnvelopeStatus> GetEnvelopeStatusAsync(string envelopeId, CancellationToken ct = default)
    {
        var token = await GetAccessTokenAsync(ct);
        var url = $"{_options.BaseUri}/restapi/v2.1/accounts/{_options.ApiAccountId}/envelopes/{envelopeId}?include=recipients";
        using var request = new HttpRequestMessage(HttpMethod.Get, url);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token!);

        using var response = await _httpClient.SendAsync(request, ct);
        var body = await response.Content.ReadAsStringAsync(ct);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("DocuSign GetEnvelopeStatus failed: {Status} {Body}", response.StatusCode, body);
            return new DocuSignEnvelopeStatus(envelopeId, "error", null, null, []);
        }

        using var doc = JsonDocument.Parse(body);
        var root = doc.RootElement;

        var status = root.GetProperty("status").GetString() ?? "unknown";
        var sentAt = TryGetDateTime(root, "sentDateTime");
        var completedAt = TryGetDateTime(root, "completedDateTime");

        var signers = new List<DocuSignSignerStatus>();
        if (root.TryGetProperty("recipients", out var recipientsEl) &&
            recipientsEl.TryGetProperty("signers", out var signersEl))
        {
            foreach (var s in signersEl.EnumerateArray())
            {
                signers.Add(new DocuSignSignerStatus(
                    s.GetProperty("name").GetString() ?? "",
                    s.GetProperty("email").GetString() ?? "",
                    s.GetProperty("status").GetString() ?? "pending",
                    TryGetDateTime(s, "signedDateTime")));
            }
        }

        return new DocuSignEnvelopeStatus(envelopeId, status, sentAt, completedAt, signers);
    }

    public async Task<DocuSignDocumentDownload?> DownloadDocumentAsync(string envelopeId, CancellationToken ct = default)
    {
        var token = await GetAccessTokenAsync(ct);
        // Document "combined" returns all documents merged
        var url = $"{_options.BaseUri}/restapi/v2.1/accounts/{_options.ApiAccountId}/envelopes/{envelopeId}/documents/combined";
        using var request = new HttpRequestMessage(HttpMethod.Get, url);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token!);

        using var response = await _httpClient.SendAsync(request, ct);
        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("DocuSign DownloadDocument failed: {Status}", response.StatusCode);
            return null;
        }

        var content = await response.Content.ReadAsByteArrayAsync(ct);
        var contentType = response.Content.Headers.ContentType?.MediaType ?? "application/pdf";
        var fileName = $"signed_{envelopeId}.pdf";

        return new DocuSignDocumentDownload(content, fileName, contentType);
    }

    public async Task<bool> VoidEnvelopeAsync(string envelopeId, string reason, CancellationToken ct = default)
    {
        var token = await GetAccessTokenAsync(ct);
        var url = $"{_options.BaseUri}/restapi/v2.1/accounts/{_options.ApiAccountId}/envelopes/{envelopeId}";
        using var request = new HttpRequestMessage(HttpMethod.Put, url);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token!);
        request.Content = JsonContent.Create(new { status = "voided", voidedReason = reason }, options: JsonOpts);

        using var response = await _httpClient.SendAsync(request, ct);
        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("DocuSign VoidEnvelope failed: {Status}", response.StatusCode);
        }
        return response.IsSuccessStatusCode;
    }

    // ── JWT Auth ──

    private async Task<string?> GetAccessTokenAsync(CancellationToken ct)
    {
        if (_cachedAccessToken is not null && DateTime.UtcNow < _tokenExpiresAtUtc.AddMinutes(-5))
            return _cachedAccessToken;

        try
        {
            var jwt = CreateJwtAssertion();

            using var tokenRequest = new HttpRequestMessage(HttpMethod.Post, $"https://{_options.OAuthHost}/oauth/token");
            tokenRequest.Content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["grant_type"] = "urn:ietf:params:oauth:grant-type:jwt-bearer",
                ["assertion"] = jwt
            });

            using var response = await _httpClient.SendAsync(tokenRequest, ct);
            var body = await response.Content.ReadAsStringAsync(ct);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("DocuSign JWT token exchange failed: {Status} {Body}", response.StatusCode, body);
                return null;
            }

            using var doc = JsonDocument.Parse(body);
            _cachedAccessToken = doc.RootElement.GetProperty("access_token").GetString();
            var expiresIn = doc.RootElement.GetProperty("expires_in").GetInt32();
            _tokenExpiresAtUtc = DateTime.UtcNow.AddSeconds(expiresIn);

            _logger.LogInformation("DocuSign access token obtained, expires in {ExpiresIn}s", expiresIn);
            return _cachedAccessToken;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to obtain DocuSign access token");
            return null;
        }
    }

    private string CreateJwtAssertion()
    {
        var rsaKey = RSA.Create();
        rsaKey.ImportFromPem(_options.RsaPrivateKey);

        var securityKey = new RsaSecurityKey(rsaKey);
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.RsaSha256);

        var now = DateTime.UtcNow;
        var claims = new[]
        {
            new Claim("sub", _options.UserId),
            new Claim("iat", new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            new Claim("scope", "signature impersonation"),
        };

        var token = new JwtSecurityToken(
            issuer: _options.IntegrationKey,
            audience: _options.OAuthHost,
            claims: claims,
            notBefore: now,
            expires: now.AddHours(1),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // ── Helpers ──

    private static DateTime? TryGetDateTime(JsonElement el, string propertyName)
    {
        if (el.TryGetProperty(propertyName, out var val) && val.ValueKind != JsonValueKind.Null)
        {
            if (DateTime.TryParse(val.GetString(), null, System.Globalization.DateTimeStyles.RoundtripKind, out var dt))
                return dt.ToUniversalTime();
        }
        return null;
    }

    private static string CreatePlaceholderPdfBase64(string title)
    {
        // Minimal valid PDF with document name and signature anchor
        var content = $@"%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
4 0 obj<</Length 120>>
stream
BT /F1 16 Tf 72 700 Td ({title}) Tj ET
BT /F1 12 Tf 72 650 Td (Please sign below:) Tj ET
BT /F1 10 Tf 72 600 Td (/sig/) Tj ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000206 00000 n 
trailer<</Size 6/Root 1 0 R>>
startxref
438
%%EOF";
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(content));
    }
}
