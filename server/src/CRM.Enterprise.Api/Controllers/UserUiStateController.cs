using System.Security.Claims;
using System.Text.Json;
using CRM.Enterprise.Api.Contracts.Users;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/users/me/ui-state")]
[Authorize]
public class UserUiStateController : ControllerBase
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly CrmDbContext _dbContext;

    public UserUiStateController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("{key}")]
    public async Task<ActionResult<UserUiStateResponse>> GetByKey(string key, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(key))
        {
            return BadRequest(new { message = "UI state key is required." });
        }

        var user = await GetCurrentUserAsync(cancellationToken);
        if (user is null)
        {
            return Unauthorized();
        }

        var state = ReadUiStateMap(user.UiPreferencesJson);
        if (!state.TryGetValue(key, out var value))
        {
            return NotFound();
        }

        return Ok(new UserUiStateResponse(key, value));
    }

    [HttpPut("{key}")]
    public async Task<ActionResult<UserUiStateResponse>> PutByKey(
        string key,
        [FromBody] UpdateUserUiStateRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(key))
        {
            return BadRequest(new { message = "UI state key is required." });
        }

        var user = await GetCurrentUserAsync(cancellationToken);
        if (user is null)
        {
            return Unauthorized();
        }

        var state = ReadUiStateMap(user.UiPreferencesJson);
        state[key] = request.Value.Clone();
        user.UiPreferencesJson = JsonSerializer.Serialize(state, JsonOptions);
        user.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new UserUiStateResponse(key, state[key]));
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

    private static Dictionary<string, JsonElement> ReadUiStateMap(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return new Dictionary<string, JsonElement>(StringComparer.OrdinalIgnoreCase);
        }

        try
        {
            using var doc = JsonDocument.Parse(json);
            if (doc.RootElement.ValueKind != JsonValueKind.Object)
            {
                return new Dictionary<string, JsonElement>(StringComparer.OrdinalIgnoreCase);
            }

            var result = new Dictionary<string, JsonElement>(StringComparer.OrdinalIgnoreCase);
            foreach (var property in doc.RootElement.EnumerateObject())
            {
                result[property.Name] = property.Value.Clone();
            }

            return result;
        }
        catch
        {
            return new Dictionary<string, JsonElement>(StringComparer.OrdinalIgnoreCase);
        }
    }
}
