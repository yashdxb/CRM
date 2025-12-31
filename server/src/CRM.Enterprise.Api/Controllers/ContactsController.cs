using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Contacts;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Api.Utilities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Api.Contracts.Imports;
using CRM.Enterprise.Api.Jobs;
using Hangfire;
using Microsoft.AspNetCore.Hosting;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.ContactsView)]
[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IWebHostEnvironment _environment;
    private readonly IBackgroundJobClient _backgroundJobs;

    public ContactsController(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IWebHostEnvironment environment,
        IBackgroundJobClient backgroundJobs)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _environment = environment;
        _backgroundJobs = backgroundJobs;
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
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
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

    [HttpPost("import")]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
    public async Task<ActionResult<CsvImportResult>> Import([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        var rows = await CsvImportHelper.ReadAsync(file, cancellationToken);
        if (rows.Count == 0)
        {
            return Ok(new CsvImportResult(0, 0, 0, Array.Empty<CsvImportError>()));
        }

        var errors = new List<CsvImportError>();
        var imported = 0;

        for (var i = 0; i < rows.Count; i++)
        {
            var row = rows[i];
            var fullName = CsvImportHelper.ReadValue(row, "name", "fullname", "full_name");
            var firstName = CsvImportHelper.ReadValue(row, "firstname", "first_name");
            var lastName = CsvImportHelper.ReadValue(row, "lastname", "last_name");
            if (string.IsNullOrWhiteSpace(firstName) && string.IsNullOrWhiteSpace(lastName) && !string.IsNullOrWhiteSpace(fullName))
            {
                (firstName, lastName) = CsvImportHelper.SplitName(fullName);
            }

            if (string.IsNullOrWhiteSpace(firstName) && string.IsNullOrWhiteSpace(lastName))
            {
                errors.Add(new CsvImportError(i + 2, "Contact name is required."));
                continue;
            }

            var accountName = CsvImportHelper.ReadValue(row, "account", "accountname", "company");
            Guid? accountId = null;
            if (!string.IsNullOrWhiteSpace(accountName))
            {
                accountId = await _dbContext.Accounts
                    .Where(a => a.Name == accountName && !a.IsDeleted)
                    .Select(a => a.Id)
                    .FirstOrDefaultAsync(cancellationToken);
                if (accountId == Guid.Empty)
                {
                    accountId = null;
                }
            }

            var ownerEmail = CsvImportHelper.ReadValue(row, "owner", "owneremail", "owner_email");
            var ownerId = await ResolveOwnerIdFromEmailAsync(ownerEmail, cancellationToken);

            var contact = new Contact
            {
                FirstName = firstName ?? string.Empty,
                LastName = lastName ?? string.Empty,
                Email = CsvImportHelper.ReadValue(row, "email"),
                Phone = CsvImportHelper.ReadValue(row, "phone"),
                Mobile = CsvImportHelper.ReadValue(row, "mobile"),
                JobTitle = CsvImportHelper.ReadValue(row, "jobtitle", "title"),
                AccountId = accountId,
                OwnerId = ownerId,
                LinkedInProfile = CsvImportHelper.ReadValue(row, "linkedin", "linkedinprofile"),
                LifecycleStage = CsvImportHelper.ReadValue(row, "lifecycle", "lifecyclestage", "status"),
                ActivityScore = CsvImportHelper.ReadInt(row, "activityscore") ?? 0,
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.Contacts.Add(contact);
            imported++;
        }

        if (imported > 0)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return Ok(new CsvImportResult(rows.Count, imported, rows.Count - imported, errors));
    }

    [HttpPost("import/queue")]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
    public async Task<ActionResult<ImportJobResponse>> QueueImport([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        var tenantKey = _tenantProvider.TenantKey;
        var storageRoot = Path.Combine(_environment.ContentRootPath, "uploads", "imports", tenantKey.ToLowerInvariant());
        Directory.CreateDirectory(storageRoot);

        var safeName = Path.GetFileName(file.FileName);
        var importJob = new ImportJob
        {
            EntityType = "Contacts",
            FileName = safeName,
            Status = "Queued",
            RequestedById = GetUserId()
        };
        _dbContext.ImportJobs.Add(importJob);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var storedName = $"{importJob.Id:N}_{safeName}";
        var storagePath = Path.Combine(storageRoot, storedName);
        await using (var stream = System.IO.File.Create(storagePath))
        {
            await file.CopyToAsync(stream, cancellationToken);
        }

        importJob.FilePath = storagePath;
        await _dbContext.SaveChangesAsync(cancellationToken);

        _backgroundJobs.Enqueue<CsvImportJobs>(job => job.ProcessContactsAsync(importJob.Id));

        return Accepted(new ImportJobResponse(importJob.Id, importJob.EntityType, importJob.Status));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
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
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
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
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
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
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
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

    private async Task<Guid> ResolveOwnerIdFromEmailAsync(string? ownerEmail, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrWhiteSpace(ownerEmail))
        {
            var ownerId = await _dbContext.Users
                .Where(u => u.Email == ownerEmail && u.IsActive && !u.IsDeleted)
                .Select(u => u.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (ownerId != Guid.Empty)
            {
                return ownerId;
            }
        }

        return await ResolveOwnerIdAsync(null, cancellationToken);
    }

    private Guid GetUserId()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(id, out var parsed) ? parsed : Guid.Empty;
    }
}
