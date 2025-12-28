using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Customers;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.CustomersManage)]
[ApiController]
[Route("api/customers")]
public class CustomersController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public CustomersController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<CustomerSearchResponse>> GetCustomers(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _dbContext.Accounts
            .Include(a => a.Contacts)
            .AsNoTracking()
            .Where(a => !a.IsDeleted);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(a =>
                a.Name.ToLower().Contains(term) ||
                (a.Phone ?? string.Empty).ToLower().Contains(term) ||
                a.Contacts.Any(c => (c.Email ?? string.Empty).ToLower().Contains(term)));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(a => a.LifecycleStage == status);
        }

        var total = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderBy(a => a.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new
            {
                a.Id,
                a.Name,
                Email = a.Contacts.Select(c => c.Email).FirstOrDefault(email => !string.IsNullOrEmpty(email)),
                a.Phone,
                Status = a.LifecycleStage ?? "Customer",
                a.OwnerId,
                a.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var ownerIds = items.Select(i => i.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var result = items.Select(i =>
        {
            var ownerName = owners.FirstOrDefault(o => o.Id == i.OwnerId)?.FullName ?? "Unassigned";
            return new CustomerListItem(i.Id, i.Name, i.Name, i.Email, i.Phone, i.Status, i.OwnerId, ownerName, i.CreatedAtUtc);
        });

        return Ok(new CustomerSearchResponse(result, total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CustomerListItem>> GetCustomer(Guid id, CancellationToken cancellationToken)
    {
        var account = await _dbContext.Accounts
            .Include(a => a.Contacts)
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);

        if (account is null) return NotFound();

        account.LastViewedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == account.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        var dto = new CustomerListItem(
            account.Id,
            account.Name,
            account.Name,
            account.Contacts.Select(c => c.Email).FirstOrDefault(email => !string.IsNullOrEmpty(email)),
            account.Phone,
            account.LifecycleStage ?? "Customer",
            account.OwnerId,
            ownerName,
            account.CreatedAtUtc);

        return Ok(dto);
    }

    [HttpPost]
    public async Task<ActionResult<CustomerListItem>> Create([FromBody] UpsertCustomerRequest request, CancellationToken cancellationToken)
    {
        var ownerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken);

        var account = new Account
        {
            Name = request.Name,
            AccountNumber = request.AccountNumber,
            Industry = request.Industry,
            Website = request.Website,
            Phone = request.Phone,
            LifecycleStage = request.LifecycleStage,
            OwnerId = ownerId,
            Territory = request.Territory,
            Description = request.Description,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Accounts.Add(account);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == ownerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        var dto = new CustomerListItem(
            account.Id,
            account.Name,
            account.Name,
            null,
            account.Phone,
            account.LifecycleStage ?? "Customer",
            account.OwnerId,
            ownerName,
            account.CreatedAtUtc);
        return CreatedAtAction(nameof(GetCustomer), new { id = account.Id }, dto);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertCustomerRequest request, CancellationToken cancellationToken)
    {
        var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (account is null) return NotFound();

        account.Name = request.Name;
        account.AccountNumber = request.AccountNumber;
        account.Industry = request.Industry;
        account.Website = request.Website;
        account.Phone = request.Phone;
        account.LifecycleStage = request.LifecycleStage;
        account.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken);
        account.Territory = request.Territory;
        account.Description = request.Description;
        account.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (account is null) return NotFound();

        account.IsDeleted = true;
        account.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id:guid}/owner")]
    public async Task<IActionResult> UpdateOwner(Guid id, [FromBody] UpdateOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (account is null) return NotFound();

        account.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken);
        account.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id:guid}/lifecycle")]
    public async Task<IActionResult> UpdateLifecycle(Guid id, [FromBody] UpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Lifecycle status is required.");
        }

        var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (account is null) return NotFound();

        account.LifecycleStage = request.Status;
        account.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPost("bulk-assign-owner")]
    public async Task<IActionResult> BulkAssignOwner([FromBody] BulkAssignOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No customer ids provided.");
        }

        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var ownerExists = await _dbContext.Users
            .AnyAsync(u => u.Id == request.OwnerId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (!ownerExists)
        {
            return BadRequest("Owner not found.");
        }

        var accounts = await _dbContext.Accounts
            .Where(a => request.Ids.Contains(a.Id) && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var account in accounts)
        {
            account.OwnerId = request.OwnerId;
            account.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPost("bulk-update-lifecycle")]
    public async Task<IActionResult> BulkUpdateLifecycle([FromBody] BulkUpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No customer ids provided.");
        }

        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Lifecycle status is required.");
        }

        var accounts = await _dbContext.Accounts
            .Where(a => request.Ids.Contains(a.Id) && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var account in accounts)
        {
            account.LifecycleStage = request.Status;
            account.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, CancellationToken cancellationToken)
    {
        if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
        {
            var exists = await _dbContext.Users.AnyAsync(u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted, cancellationToken);
            if (exists)
            {
                return requestedOwnerId.Value;
            }
        }

        var fallbackUserId = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallbackUserId == Guid.Empty ? Guid.NewGuid() : fallbackUserId;
    }
}
