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

        var forwardedFor = context.Request.Headers["X-Forwarded-For"].FirstOrDefault();
        if (!string.IsNullOrWhiteSpace(forwardedFor))
        {
            var candidate = forwardedFor.Split(',')
                .Select(value => value.Trim())
                .FirstOrDefault(value => !string.IsNullOrWhiteSpace(value));
            var normalized = NormalizeForwardedIp(candidate);
            if (!string.IsNullOrWhiteSpace(normalized))
            {
                return normalized;
            }
        }

        var realIp = context.Request.Headers["X-Real-IP"].FirstOrDefault();
        if (!string.IsNullOrWhiteSpace(realIp))
        {
            return NormalizeForwardedIp(realIp);
        }

        return context.Connection.RemoteIpAddress?.ToString();
    }

    private static string? NormalizeForwardedIp(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var candidate = value.Trim();
        if (candidate.Contains(':') && candidate.Contains('.'))
        {
            candidate = candidate.Split(':')[0];
        }

        return candidate;
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
