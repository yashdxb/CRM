using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CRM.Enterprise.Api.Contracts.Users;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/users/lookup")]
[Authorize]
public class UserLookupController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public UserLookupController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<UserLookupItem>>> Get(
        [FromQuery] string? search,
        [FromQuery] int max = 200,
        CancellationToken cancellationToken = default)
    {
        max = max < 1 ? 1 : max > 500 ? 500 : max;

        var query = _dbContext.Users
            .AsNoTracking()
            .Where(u => u.IsActive && !u.IsDeleted);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(u => u.FullName.Contains(term) || u.Email.Contains(term));
        }

        var items = await query
            .OrderBy(u => u.FullName)
            .Take(max)
            .Select(u => new UserLookupItem(u.Id, u.FullName, u.Email))
            .ToListAsync(cancellationToken);

        return Ok(items);
    }
}
