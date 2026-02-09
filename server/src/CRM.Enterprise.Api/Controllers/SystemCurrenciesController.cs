using CRM.Enterprise.Api.Contracts.System;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/system/currencies")]
public class SystemCurrenciesController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public SystemCurrenciesController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CurrencyDto>>> GetCurrencies(CancellationToken cancellationToken)
    {
        var currencies = await _dbContext.Currencies
            .AsNoTracking()
            .Where(currency => currency.IsActive)
            .OrderBy(currency => currency.SortOrder)
            .ThenBy(currency => currency.Code)
            .Select(currency => new CurrencyDto(
                currency.Id,
                currency.Code,
                currency.Name,
                currency.Symbol,
                currency.IsActive,
                currency.SortOrder))
            .ToListAsync(cancellationToken);

        return Ok(currencies);
    }
}
