using CRM.Enterprise.Api.Contracts.System;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/system/timezones")]
public class SystemTimeZonesController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public SystemTimeZonesController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TimeZoneDto>>> GetTimeZones(CancellationToken cancellationToken)
    {
        // Return the standardized list for UI selectors in a consistent order.
        var timeZones = await _dbContext.TimeZones
            .AsNoTracking()
            .Where(zone => zone.IsActive)
            .OrderBy(zone => zone.SortOrder)
            .ThenBy(zone => zone.Label)
            .Select(zone => new TimeZoneDto(
                zone.Id,
                zone.IanaId,
                zone.Label,
                zone.UtcOffsetMinutes,
                zone.FlagCode,
                zone.IsActive,
                zone.SortOrder))
            .ToListAsync(cancellationToken);

        return Ok(timeZones);
    }
}
