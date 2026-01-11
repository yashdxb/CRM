using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Audit;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AuditView)]
[ApiController]
[Route("api/audit")]
public class AuditController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public AuditController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<AuditLogResponse>> GetAuditLog(
        [FromQuery] string? search,
        [FromQuery] string? entityType,
        [FromQuery] string? action,
        [FromQuery] Guid? userId,
        [FromQuery] DateTime? fromUtc,
        [FromQuery] DateTime? toUtc,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 200);

        var query = _dbContext.AuditEvents.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(entityType))
        {
            query = query.Where(a => a.EntityType == entityType);
        }

        if (!string.IsNullOrWhiteSpace(action))
        {
            query = query.Where(a => a.Action == action);
        }

        if (userId.HasValue)
        {
            query = query.Where(a => a.ChangedByUserId == userId.Value);
        }

        if (fromUtc.HasValue)
        {
            query = query.Where(a => a.CreatedAtUtc >= fromUtc.Value);
        }

        if (toUtc.HasValue)
        {
            query = query.Where(a => a.CreatedAtUtc <= toUtc.Value);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(a =>
                a.EntityType.ToLower().Contains(term) ||
                a.Action.ToLower().Contains(term) ||
                (a.Field ?? string.Empty).ToLower().Contains(term) ||
                (a.OldValue ?? string.Empty).ToLower().Contains(term) ||
                (a.NewValue ?? string.Empty).ToLower().Contains(term) ||
                (a.ChangedByName ?? string.Empty).ToLower().Contains(term));
        }

        var total = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(a => a.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new AuditEventItem(
                a.Id,
                a.EntityType,
                a.EntityId,
                a.Action,
                a.Field,
                a.OldValue,
                a.NewValue,
                a.ChangedByUserId,
                a.ChangedByName,
                a.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return Ok(new AuditLogResponse(items, total));
    }
}
