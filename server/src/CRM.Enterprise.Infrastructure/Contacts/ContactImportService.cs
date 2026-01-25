using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Contacts;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Contacts;

public sealed class ContactImportService : IContactImportService
{
    private readonly CrmDbContext _dbContext;
    private readonly IWebHostEnvironment _environment;
    private readonly ITenantProvider _tenantProvider;

    public ContactImportService(
        CrmDbContext dbContext,
        IWebHostEnvironment environment,
        ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _environment = environment;
        _tenantProvider = tenantProvider;
    }

    public async Task<ContactImportResultDto> ImportAsync(Stream stream, ActorContext actor, CancellationToken cancellationToken = default)
    {
        if (stream is null)
        {
            return new ContactImportResultDto(0, 0, 0, Array.Empty<ContactImportError>());
        }

        var rows = await ContactCsvImportHelper.ReadAsync(stream, cancellationToken);
        if (rows.Count == 0)
        {
            return new ContactImportResultDto(0, 0, 0, Array.Empty<ContactImportError>());
        }

        var errors = new List<ContactImportError>();
        var imported = 0;

        for (var i = 0; i < rows.Count; i++)
        {
            var row = rows[i];
            var fullName = ContactCsvImportHelper.ReadValue(row, "name", "fullname", "full_name");
            var firstName = ContactCsvImportHelper.ReadValue(row, "firstname", "first_name");
            var lastName = ContactCsvImportHelper.ReadValue(row, "lastname", "last_name");
            if (string.IsNullOrWhiteSpace(firstName) && string.IsNullOrWhiteSpace(lastName) && !string.IsNullOrWhiteSpace(fullName))
            {
                (firstName, lastName) = ContactCsvImportHelper.SplitName(fullName);
            }

            if (string.IsNullOrWhiteSpace(firstName) && string.IsNullOrWhiteSpace(lastName))
            {
                errors.Add(new ContactImportError(i + 2, "Contact name is required."));
                continue;
            }

            var accountName = ContactCsvImportHelper.ReadValue(row, "account", "accountname", "company");
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

            var ownerEmail = ContactCsvImportHelper.ReadValue(row, "owner", "owneremail", "owner_email");
            var ownerId = await ResolveOwnerIdFromEmailAsync(ownerEmail, actor, cancellationToken);

            var contact = new Contact
            {
                FirstName = firstName ?? string.Empty,
                LastName = lastName ?? string.Empty,
                Email = ContactCsvImportHelper.ReadValue(row, "email"),
                Phone = ContactCsvImportHelper.ReadValue(row, "phone"),
                Mobile = ContactCsvImportHelper.ReadValue(row, "mobile"),
                JobTitle = ContactCsvImportHelper.ReadValue(row, "jobtitle", "title"),
                AccountId = accountId,
                OwnerId = ownerId,
                LinkedInProfile = ContactCsvImportHelper.ReadValue(row, "linkedin", "linkedinprofile"),
                LifecycleStage = ContactCsvImportHelper.ReadValue(row, "lifecycle", "lifecyclestage", "status"),
                ActivityScore = ContactCsvImportHelper.ReadInt(row, "activityscore") ?? 0,
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.Contacts.Add(contact);
            imported++;
        }

        if (imported > 0)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return new ContactImportResultDto(rows.Count, imported, rows.Count - imported, errors);
    }

    public async Task<ContactOperationResult<ContactImportQueuedDto>> QueueImportAsync(Stream stream, string fileName, ActorContext actor, CancellationToken cancellationToken = default)
    {
        if (stream is null)
        {
            return ContactOperationResult<ContactImportQueuedDto>.Fail("CSV file is required.");
        }

        if (string.IsNullOrWhiteSpace(fileName))
        {
            return ContactOperationResult<ContactImportQueuedDto>.Fail("File name is required.");
        }

        var tenantKey = _tenantProvider.TenantKey;
        var storageRoot = Path.Combine(_environment.ContentRootPath, "uploads", "imports", tenantKey.ToLowerInvariant());
        Directory.CreateDirectory(storageRoot);

        var safeName = Path.GetFileName(fileName);
        var importJob = new ImportJob
        {
            EntityType = "Contacts",
            FileName = safeName,
            Status = "Queued",
            RequestedById = actor.UserId
        };

        _dbContext.ImportJobs.Add(importJob);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var storedName = $"{importJob.Id:N}_{safeName}";
        var storagePath = Path.Combine(storageRoot, storedName);
        await using (var streamWriter = System.IO.File.Create(storagePath))
        {
            await stream.CopyToAsync(streamWriter, cancellationToken);
        }

        importJob.FilePath = storagePath;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return ContactOperationResult<ContactImportQueuedDto>.Ok(
            new ContactImportQueuedDto(importJob.Id, importJob.EntityType, importJob.Status));
    }

    private async Task<Guid> ResolveOwnerIdFromEmailAsync(string? ownerEmail, ActorContext actor, CancellationToken cancellationToken)
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

        return await ResolveOwnerIdAsync(null, actor, cancellationToken);
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, ActorContext actor, CancellationToken cancellationToken)
    {
        if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
        {
            var exists = await _dbContext.Users
                .AnyAsync(u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted, cancellationToken);
            if (exists)
            {
                return requestedOwnerId.Value;
            }
        }

        if (actor.UserId.HasValue && actor.UserId.Value != Guid.Empty)
        {
            return actor.UserId.Value;
        }

        var fallback = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallback == Guid.Empty ? Guid.NewGuid() : fallback;
    }
}
