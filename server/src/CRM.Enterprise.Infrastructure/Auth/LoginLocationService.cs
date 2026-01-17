using System.Collections.Generic;
using System.Net;
using System.Net.Http.Json;
using System.Net.Sockets;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.Auth;

public sealed class LoginLocationService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly HttpClient _httpClient;
    private readonly ILogger<LoginLocationService> _logger;

    public LoginLocationService(
        IHttpContextAccessor httpContextAccessor,
        HttpClient httpClient,
        ILogger<LoginLocationService> logger)
    {
        _httpContextAccessor = httpContextAccessor;
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<(string? Ip, string? Location)> ResolveAsync(CancellationToken cancellationToken)
    {
        var ip = GetClientIp();
        if (string.IsNullOrWhiteSpace(ip) || IsPrivateIp(ip))
        {
            return (ip, null);
        }

        try
        {
            var response = await _httpClient.GetFromJsonAsync<IpWhoIsResponse>(
                $"https://ipwho.is/{ip}?fields=success,city,region,country",
                cancellationToken);

            var location = BuildLocation(response?.City, response?.Region, response?.Country);
            if (response is not null && response.Success && !string.IsNullOrWhiteSpace(location))
            {
                return (ip, location);
            }
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "Primary geo lookup failed for IP {Ip}", ip);
        }

        try
        {
            var response = await _httpClient.GetFromJsonAsync<IpApiResponse>(
                $"https://ipapi.co/{ip}/json/",
                cancellationToken);

            var location = BuildLocation(response?.City, response?.Region, response?.CountryName);
            return (ip, location);
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "Fallback geo lookup failed for IP {Ip}", ip);
            return (ip, null);
        }
    }

    private string? GetClientIp()
    {
        var context = _httpContextAccessor.HttpContext;
        if (context is null)
        {
            return null;
        }

        var headers = context.Request.Headers;
        var forwardedFor = headers["X-Forwarded-For"].FirstOrDefault();
        var forwarded = headers["Forwarded"].FirstOrDefault();
        var candidates = new[]
        {
            forwardedFor,
            headers["X-Azure-ClientIP"].FirstOrDefault(),
            headers["X-Client-IP"].FirstOrDefault(),
            headers["True-Client-IP"].FirstOrDefault(),
            headers["CF-Connecting-IP"].FirstOrDefault(),
            headers["X-Original-For"].FirstOrDefault(),
            headers["X-Real-IP"].FirstOrDefault(),
            ParseForwardedFor(forwarded)
        };

        foreach (var candidate in candidates)
        {
            var normalized = NormalizeForwardedIp(candidate);
            if (!string.IsNullOrWhiteSpace(normalized))
            {
                return normalized;
            }
        }

        var remoteIp = context.Connection.RemoteIpAddress;
        if (remoteIp is null)
        {
            return null;
        }

        if (remoteIp.IsIPv4MappedToIPv6)
        {
            remoteIp = remoteIp.MapToIPv4();
        }

        return remoteIp.ToString();
    }

    private static string? NormalizeForwardedIp(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var candidate = value.Trim();
        if (candidate.Contains(','))
        {
            candidate = candidate.Split(',')
                .Select(item => item.Trim())
                .FirstOrDefault(item => !string.IsNullOrWhiteSpace(item)) ?? candidate;
        }

        if (candidate.StartsWith('[') && candidate.Contains(']'))
        {
            candidate = candidate.TrimStart('[');
            candidate = candidate[..candidate.IndexOf(']')];
        }
        else if (candidate.Contains(':') && candidate.Contains('.'))
        {
            candidate = candidate.Split(':')[0];
        }

        if (IPAddress.TryParse(candidate, out var address) && address.IsIPv4MappedToIPv6)
        {
            candidate = address.MapToIPv4().ToString();
        }

        return candidate;
    }

    private static string? ParseForwardedFor(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var segments = value.Split(',', StringSplitOptions.RemoveEmptyEntries);
        foreach (var segment in segments)
        {
            var part = segment.Trim();
            var forIndex = part.IndexOf("for=", StringComparison.OrdinalIgnoreCase);
            if (forIndex < 0)
            {
                continue;
            }

            var forValue = part[(forIndex + 4)..].Trim();
            if (forValue.StartsWith('"') && forValue.EndsWith('"'))
            {
                forValue = forValue.Trim('"');
            }

            return forValue;
        }

        return null;
    }

    private static bool IsPrivateIp(string ip)
    {
        if (!IPAddress.TryParse(ip, out var address))
        {
            return true;
        }

        if (IPAddress.IsLoopback(address))
        {
            return true;
        }

        if (address.AddressFamily == AddressFamily.InterNetwork)
        {
            var bytes = address.GetAddressBytes();
            return bytes[0] switch
            {
                10 => true,
                127 => true,
                169 when bytes[1] == 254 => true,
                172 when bytes[1] >= 16 && bytes[1] <= 31 => true,
                192 when bytes[1] == 168 => true,
                _ => false
            };
        }

        if (address.AddressFamily == AddressFamily.InterNetworkV6)
        {
            return address.IsIPv6LinkLocal || address.IsIPv6SiteLocal || address.IsIPv6Multicast;
        }

        return false;
    }

    private sealed class IpWhoIsResponse
    {
        public bool Success { get; init; }
        public string? City { get; init; }
        public string? Region { get; init; }
        public string? Country { get; init; }
    }

    private sealed class IpApiResponse
    {
        public string? City { get; init; }
        public string? Region { get; init; }
        public string? CountryName { get; init; }
    }

    private static string? BuildLocation(string? city, string? region, string? country)
    {
        var parts = new List<string>();
        if (!string.IsNullOrWhiteSpace(city))
        {
            parts.Add(city);
        }
        if (!string.IsNullOrWhiteSpace(region))
        {
            parts.Add(region);
        }
        if (!string.IsNullOrWhiteSpace(country))
        {
            parts.Add(country);
        }

        return parts.Count > 0 ? string.Join(", ", parts) : null;
    }
}
