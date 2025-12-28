using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Contacts;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.ContactsManage)]
[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly CrmDbContext _dbContext;

    public ContactsController(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<ContactSearchResponse>> GetContacts(
        [FromQuery] string? search,
        [FromQuery] Guid? accountId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _dbContext.Contacts
            .Include(c => c.Account)
            .AsNoTracking()
            .Where(c => !c.IsDeleted);

        if (accountId.HasValue && accountId.Value != Guid.Empty)
        {
            query = query.Where(c => c.AccountId == accountId.Value);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(c =>
                (c.FirstName + " " + c.LastName).ToLower().Contains(term) ||
                (c.Email ?? "").ToLower().Contains(term) ||
                (c.Phone ?? "").ToLower().Contains(term));
        }

        var total = await query.CountAsync(cancellationToken);

        var data = await query
            .OrderBy(c => c.LastName)
            .ThenBy(c => c.FirstName)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new
            {
                c.Id,
                FullName = ($"{c.FirstName} {c.LastName}").Trim(),
                c.Email,
                c.Phone,
                c.Mobile,
                c.JobTitle,
                c.AccountId,
                AccountName = c.Account != null ? c.Account.Name : null,
                c.OwnerId,
                c.LifecycleStage,
                c.ActivityScore,
                c.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var ownerIds = data.Select(c => c.OwnerId).Distinct().ToList();
        var ownerLookup = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .AsNoTracking()
            .Select(u => new { u.Id, u.FullName })
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        var items = data.Select(c => new ContactListItem(
            c.Id,
            c.FullName,
            c.Email,
            c.Phone,
            c.Mobile,
            c.JobTitle,
            c.AccountId,
            c.AccountName,
            c.OwnerId,
            ownerLookup.TryGetValue(c.OwnerId, out var ownerName) ? ownerName : "Unassigned",
            c.LifecycleStage ?? "Customer",
            c.ActivityScore,
            c.CreatedAtUtc)).ToList();

        return Ok(new ContactSearchResponse(items, total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ContactDetailResponse>> GetContact(Guid id, CancellationToken cancellationToken)
    {
        var contact = await _dbContext.Contacts
            .Include(c => c.Account)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);

        if (contact is null) return NotFound();

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == contact.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken);

        var response = new ContactDetailResponse(
            contact.Id,
            contact.FirstName,
            contact.LastName,
            contact.Email,
            contact.Phone,
            contact.Mobile,
            contact.JobTitle,
            contact.AccountId,
            contact.Account?.Name,
            contact.OwnerId,
            ownerName,
            contact.LinkedInProfile,
            contact.LifecycleStage,
            contact.ActivityScore,
            contact.CreatedAtUtc,
            contact.UpdatedAtUtc);

        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<ContactDetailResponse>> CreateContact([FromBody] UpsertContactRequest request, CancellationToken cancellationToken)
    {
        var contact = new Contact
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Phone = request.Phone,
            Mobile = request.Mobile,
            JobTitle = request.JobTitle,
            AccountId = request.AccountId,
            OwnerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken),
            LinkedInProfile = request.LinkedInProfile,
            LifecycleStage = request.LifecycleStage,
            ActivityScore = request.ActivityScore,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Contacts.Add(contact);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == contact.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken);

        var accountName = contact.AccountId.HasValue
            ? await _dbContext.Accounts.Where(a => a.Id == contact.AccountId.Value).Select(a => a.Name).FirstOrDefaultAsync(cancellationToken)
            : null;

        return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, new ContactDetailResponse(
            contact.Id,
            contact.FirstName,
            contact.LastName,
            contact.Email,
            contact.Phone,
            contact.Mobile,
            contact.JobTitle,
            contact.AccountId,
            accountName,
            contact.OwnerId,
            ownerName,
            contact.LinkedInProfile,
            contact.LifecycleStage,
            contact.ActivityScore,
            contact.CreatedAtUtc,
            contact.UpdatedAtUtc));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateContact(Guid id, [FromBody] UpsertContactRequest request, CancellationToken cancellationToken)
    {
        var contact = await _dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (contact is null) return NotFound();

        contact.FirstName = request.FirstName;
        contact.LastName = request.LastName;
        contact.Email = request.Email;
        contact.Phone = request.Phone;
        contact.Mobile = request.Mobile;
        contact.JobTitle = request.JobTitle;
        contact.AccountId = request.AccountId;
        contact.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken);
        contact.LinkedInProfile = request.LinkedInProfile;
        contact.LifecycleStage = request.LifecycleStage;
        contact.ActivityScore = request.ActivityScore;
        contact.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteContact(Guid id, CancellationToken cancellationToken)
    {
        var contact = await _dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (contact is null) return NotFound();

        contact.IsDeleted = true;
        contact.DeletedAtUtc = DateTime.UtcNow;

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

        var contact = await _dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (contact is null) return NotFound();

        contact.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken);
        contact.UpdatedAtUtc = DateTime.UtcNow;

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

        var contact = await _dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (contact is null) return NotFound();

        contact.LifecycleStage = request.Status;
        contact.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPost("bulk-assign-owner")]
    public async Task<IActionResult> BulkAssignOwner([FromBody] BulkAssignOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No contact ids provided.");
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

        var contacts = await _dbContext.Contacts
            .Where(c => request.Ids.Contains(c.Id) && !c.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var contact in contacts)
        {
            contact.OwnerId = request.OwnerId;
            contact.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPost("bulk-update-lifecycle")]
    public async Task<IActionResult> BulkUpdateLifecycle([FromBody] BulkUpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No contact ids provided.");
        }

        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Lifecycle status is required.");
        }

        var contacts = await _dbContext.Contacts
            .Where(c => request.Ids.Contains(c.Id) && !c.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var contact in contacts)
        {
            contact.LifecycleStage = request.Status;
            contact.UpdatedAtUtc = DateTime.UtcNow;
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

        var fallback = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallback == Guid.Empty ? Guid.NewGuid() : fallback;
    }
}
