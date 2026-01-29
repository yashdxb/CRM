using CRM.Enterprise.Api.Contracts.Agents;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/agent")]
public class AgentToolsController : ControllerBase
{
    private const string AgentKeyHeader = "X-Agent-Key";
    private const string TenantKeyHeader = "X-Tenant-Key";
    private readonly CrmDbContext _dbContext;
    private readonly IConfiguration _configuration;

    public AgentToolsController(CrmDbContext dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
    }

    [HttpGet("leads")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<AgentLeadItem>>> GetLeads(
        [FromQuery] string? query,
        [FromQuery] int limit = 10,
        CancellationToken cancellationToken = default)
    {
        if (!IsAuthorized())
        {
            return Unauthorized();
        }

        if (!HasTenantHeader())
        {
            return BadRequest(new { message = "X-Tenant-Key header is required." });
        }

        var leadsQuery = _dbContext.Leads
            .AsNoTracking()
            .Where(lead => !lead.IsDeleted);

        if (!string.IsNullOrWhiteSpace(query))
        {
            var term = query.Trim();
            leadsQuery = leadsQuery.Where(lead =>
                lead.FirstName.Contains(term) ||
                lead.LastName.Contains(term) ||
                (lead.Email != null && lead.Email.Contains(term)) ||
                (lead.CompanyName != null && lead.CompanyName.Contains(term)));
        }

        var leads = await leadsQuery
            .OrderByDescending(lead => lead.CreatedAtUtc)
            .Take(Math.Clamp(limit, 1, 50))
            .Select(lead => new
            {
                lead.Id,
                lead.FirstName,
                lead.LastName,
                lead.Email,
                lead.CompanyName,
                lead.FirstTouchDueAtUtc,
                lead.OwnerId,
                StatusName = lead.Status != null ? lead.Status.Name : null
            })
            .ToListAsync(cancellationToken);

        var ownerNames = await GetOwnerNamesAsync(leads.Select(item => item.OwnerId), cancellationToken);

        return Ok(leads.Select(lead => new AgentLeadItem(
            lead.Id,
            $"{lead.FirstName} {lead.LastName}".Trim(),
            lead.Email,
            lead.CompanyName,
            lead.StatusName,
            ownerNames.GetValueOrDefault(lead.OwnerId),
            lead.FirstTouchDueAtUtc)));
    }

    [HttpGet("accounts")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<AgentAccountItem>>> GetAccounts(
        [FromQuery] string? query,
        [FromQuery] int limit = 10,
        CancellationToken cancellationToken = default)
    {
        if (!IsAuthorized())
        {
            return Unauthorized();
        }

        if (!HasTenantHeader())
        {
            return BadRequest(new { message = "X-Tenant-Key header is required." });
        }

        var accountsQuery = _dbContext.Accounts
            .AsNoTracking()
            .Where(account => !account.IsDeleted);

        if (!string.IsNullOrWhiteSpace(query))
        {
            var term = query.Trim();
            accountsQuery = accountsQuery.Where(account =>
                account.Name.Contains(term) ||
                (account.Industry != null && account.Industry.Contains(term)) ||
                (account.Website != null && account.Website.Contains(term)));
        }

        var accounts = await accountsQuery
            .OrderByDescending(account => account.CreatedAtUtc)
            .Take(Math.Clamp(limit, 1, 50))
            .Select(account => new
            {
                account.Id,
                account.Name,
                account.Industry,
                account.LifecycleStage,
                account.Website,
                account.OwnerId
            })
            .ToListAsync(cancellationToken);

        var ownerNames = await GetOwnerNamesAsync(accounts.Select(item => item.OwnerId), cancellationToken);

        return Ok(accounts.Select(account => new AgentAccountItem(
            account.Id,
            account.Name,
            account.Industry,
            account.LifecycleStage,
            ownerNames.GetValueOrDefault(account.OwnerId),
            account.Website)));
    }

    [HttpGet("opportunities")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<AgentOpportunityItem>>> GetOpportunities(
        [FromQuery] string? query,
        [FromQuery] int limit = 10,
        CancellationToken cancellationToken = default)
    {
        if (!IsAuthorized())
        {
            return Unauthorized();
        }

        if (!HasTenantHeader())
        {
            return BadRequest(new { message = "X-Tenant-Key header is required." });
        }

        var opportunitiesQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Include(opportunity => opportunity.Account)
            .Include(opportunity => opportunity.Stage)
            .Where(opportunity => !opportunity.IsDeleted);

        if (!string.IsNullOrWhiteSpace(query))
        {
            var term = query.Trim();
            opportunitiesQuery = opportunitiesQuery.Where(opportunity =>
                opportunity.Name.Contains(term) ||
                (opportunity.Account != null && opportunity.Account.Name.Contains(term)));
        }

        var opportunities = await opportunitiesQuery
            .OrderByDescending(opportunity => opportunity.CreatedAtUtc)
            .Take(Math.Clamp(limit, 1, 50))
            .Select(opportunity => new
            {
                opportunity.Id,
                opportunity.Name,
                AccountName = opportunity.Account != null ? opportunity.Account.Name : null,
                StageName = opportunity.Stage != null ? opportunity.Stage.Name : null,
                opportunity.Amount,
                opportunity.Currency,
                opportunity.ExpectedCloseDate,
                opportunity.ForecastCategory,
                opportunity.OwnerId,
                opportunity.IsClosed,
                opportunity.IsWon
            })
            .ToListAsync(cancellationToken);

        var ownerNames = await GetOwnerNamesAsync(opportunities.Select(item => item.OwnerId), cancellationToken);

        return Ok(opportunities.Select(opportunity => new AgentOpportunityItem(
            opportunity.Id,
            opportunity.Name,
            opportunity.AccountName,
            opportunity.StageName,
            opportunity.Amount,
            opportunity.Currency,
            opportunity.ExpectedCloseDate,
            opportunity.ForecastCategory,
            ownerNames.GetValueOrDefault(opportunity.OwnerId),
            opportunity.IsClosed,
            opportunity.IsWon)));
    }

    [HttpGet("activities")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<AgentActivityItem>>> GetActivities(
        [FromQuery] string? query,
        [FromQuery] int limit = 10,
        CancellationToken cancellationToken = default)
    {
        if (!IsAuthorized())
        {
            return Unauthorized();
        }

        if (!HasTenantHeader())
        {
            return BadRequest(new { message = "X-Tenant-Key header is required." });
        }

        var activitiesQuery = _dbContext.Activities
            .AsNoTracking()
            .Where(activity => !activity.IsDeleted);

        if (!string.IsNullOrWhiteSpace(query))
        {
            var term = query.Trim();
            activitiesQuery = activitiesQuery.Where(activity => activity.Subject.Contains(term));
        }

        var activities = await activitiesQuery
            .OrderByDescending(activity => activity.CreatedAtUtc)
            .Take(Math.Clamp(limit, 1, 50))
            .Select(activity => new
            {
                activity.Id,
                activity.Subject,
                activity.Type,
                activity.DueDateUtc,
                activity.CompletedDateUtc,
                activity.RelatedEntityType,
                activity.RelatedEntityId,
                activity.OwnerId,
                activity.Outcome
            })
            .ToListAsync(cancellationToken);

        var ownerNames = await GetOwnerNamesAsync(activities.Select(item => item.OwnerId), cancellationToken);

        return Ok(activities.Select(activity => new AgentActivityItem(
            activity.Id,
            activity.Subject,
            activity.Type,
            activity.DueDateUtc,
            activity.CompletedDateUtc,
            activity.RelatedEntityType,
            activity.RelatedEntityId,
            ownerNames.GetValueOrDefault(activity.OwnerId),
            activity.Outcome)));
    }

    private bool IsAuthorized()
    {
        var expected = _configuration["Agent:ApiKey"];
        if (string.IsNullOrWhiteSpace(expected))
        {
            return false;
        }

        var provided = Request.Headers[AgentKeyHeader].FirstOrDefault();
        return string.Equals(expected, provided, StringComparison.Ordinal);
    }

    private bool HasTenantHeader() => !string.IsNullOrWhiteSpace(Request.Headers[TenantKeyHeader].FirstOrDefault());

    private async Task<Dictionary<Guid, string>> GetOwnerNamesAsync(IEnumerable<Guid> ownerIds, CancellationToken cancellationToken)
    {
        var ids = ownerIds.Distinct().ToList();
        if (ids.Count == 0)
        {
            return new Dictionary<Guid, string>();
        }

        return await _dbContext.Users.AsNoTracking()
            .Where(user => ids.Contains(user.Id) && !user.IsDeleted)
            .ToDictionaryAsync(user => user.Id, user => user.FullName, cancellationToken);
    }
}
