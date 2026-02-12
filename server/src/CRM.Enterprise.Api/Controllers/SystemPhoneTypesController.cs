using CRM.Enterprise.Api.Contracts.System;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.LeadsView)]
[ApiController]
[Route("api/system/phone-types")]
public class SystemPhoneTypesController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public SystemPhoneTypesController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PhoneTypeDto>>> GetPhoneTypes(CancellationToken cancellationToken)
    {
        var types = await _dbContext.PhoneTypes
            .AsNoTracking()
            .Where(type => type.IsActive)
            .OrderBy(type => type.SortOrder)
            .ThenBy(type => type.Name)
            .Select(type => new PhoneTypeDto(
                type.Id,
                type.Name,
                type.IsActive,
                type.SortOrder,
                type.IsDefault))
            .ToListAsync(cancellationToken);

        return Ok(types);
    }
}
