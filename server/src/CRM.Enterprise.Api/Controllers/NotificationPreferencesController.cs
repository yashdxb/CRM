using System.Security.Claims;
using System.Text.Json;
using CRM.Enterprise.Api.Contracts.Notifications;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/notifications/preferences")]
public class NotificationPreferencesController : ControllerBase
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly CrmDbContext _dbContext;

    public NotificationPreferencesController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<NotificationPreferencesResponse>> Get(CancellationToken cancellationToken)
    {
        var user = await GetCurrentUserAsync(cancellationToken);
        if (user is null)
        {
            return Unauthorized();
        }

        return Ok(ReadPreferences(user));
    }

    [HttpPut]
    [Authorize]
    public async Task<ActionResult<NotificationPreferencesResponse>> Update(
        [FromBody] UpdateNotificationPreferencesRequest request,
        CancellationToken cancellationToken)
    {
        var user = await GetCurrentUserAsync(cancellationToken);
        if (user is null)
        {
            return Unauthorized();
        }

        var payload = new NotificationPreferencesResponse(request.InApp, request.Email, request.AlertsEnabled);
        user.NotificationPreferencesJson = JsonSerializer.Serialize(payload, JsonOptions);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return Ok(payload);
    }

    private async Task<Domain.Entities.User?> GetCurrentUserAsync(CancellationToken cancellationToken)
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(subject, out var userId))
        {
            return null;
        }

        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted, cancellationToken);
    }

    private static NotificationPreferencesResponse ReadPreferences(Domain.Entities.User user)
    {
        if (string.IsNullOrWhiteSpace(user.NotificationPreferencesJson))
        {
            return DefaultPreferences();
        }

        try
        {
            using var document = JsonDocument.Parse(user.NotificationPreferencesJson);
            if (document.RootElement.TryGetProperty("alertsEnabled", out _))
            {
                var prefs = JsonSerializer.Deserialize<NotificationPreferencesResponse>(
                    user.NotificationPreferencesJson,
                    JsonOptions);
                return prefs ?? DefaultPreferences();
            }

            var legacy = JsonSerializer.Deserialize<LegacyNotificationPreferencesResponse>(
                user.NotificationPreferencesJson,
                JsonOptions);
            return legacy is null
                ? DefaultPreferences()
                : new NotificationPreferencesResponse(legacy.InApp, legacy.Email, true);
        }
        catch
        {
            return DefaultPreferences();
        }
    }

    private static NotificationPreferencesResponse DefaultPreferences()
    {
        var defaults = new NotificationChannelPreferences(true, true, true, true);
        var email = new NotificationChannelPreferences(false, false, false, false);
        return new NotificationPreferencesResponse(defaults, email, true);
    }

    private record LegacyNotificationPreferencesResponse(
        NotificationChannelPreferences InApp,
        NotificationChannelPreferences Email);
}
