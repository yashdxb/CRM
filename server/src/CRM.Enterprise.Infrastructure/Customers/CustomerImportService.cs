using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Customers;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Customers;

public sealed class CustomerImportService : ICustomerImportService
{
    private readonly CrmDbContext _dbContext;
    private readonly IWebHostEnvironment _environment;
    private readonly ITenantProvider _tenantProvider;

    public CustomerImportService(
        CrmDbContext dbContext,
        IWebHostEnvironment environment,
        ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _environment = environment;
        _tenantProvider = tenantProvider;
    }

    public async Task<CustomerImportResultDto> ImportAsync(Stream stream, ActorContext actor, CancellationToken cancellationToken = default)
    {
        if (stream is null)
        {
            return new CustomerImportResultDto(0, 0, 0, Array.Empty<CustomerImportError>());
        }

        var rows = await CustomerCsvImportHelper.ReadAsync(stream, cancellationToken);
        if (rows.Count == 0)
        {
            return new CustomerImportResultDto(0, 0, 0, Array.Empty<CustomerImportError>());
        }

        var errors = new List<CustomerImportError>();
        var imported = 0;

        for (var i = 0; i < rows.Count; i++)
        {
            var row = rows[i];
            var name = CustomerCsvImportHelper.ReadValue(row, "name", "account", "accountname", "company");
            if (string.IsNullOrWhiteSpace(name))
            {
                errors.Add(new CustomerImportError(i + 2, "Name is required."));
                continue;
            }

            var ownerEmail = CustomerCsvImportHelper.ReadValue(row, "owner", "owneremail", "owner_email");
            var ownerId = await ResolveOwnerIdFromEmailAsync(ownerEmail, actor, cancellationToken);
            var accountNumber = CustomerCsvImportHelper.ReadValue(row, "accountnumber", "account_number");
            var website = CustomerCsvImportHelper.ReadValue(row, "website");
            var phone = CustomerCsvImportHelper.ReadValue(row, "phone");

            var duplicateMatch = await AccountMatching.FindBestMatchAsync(
                _dbContext,
                name,
                accountNumber,
                website,
                phone,
                excludeAccountId: null,
                cancellationToken);
            if (duplicateMatch is not null)
            {
                errors.Add(new CustomerImportError(
                    i + 2,
                    $"Duplicate customer detected. Existing account: {duplicateMatch.Name} [{duplicateMatch.Id}]."));
                continue;
            }

            var account = new Account
            {
                Name = name,
                AccountNumber = accountNumber,
                Industry = CustomerCsvImportHelper.ReadValue(row, "industry"),
                Website = website,
                Phone = phone,
                LifecycleStage = CustomerCsvImportHelper.ReadValue(row, "lifecycle", "lifecyclestage", "status"),
                OwnerId = ownerId,
                Territory = CustomerCsvImportHelper.ReadValue(row, "territory"),
                Description = CustomerCsvImportHelper.ReadValue(row, "description", "notes"),
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.Accounts.Add(account);
            imported++;
        }

        if (imported > 0)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return new CustomerImportResultDto(rows.Count, imported, rows.Count - imported, errors);
    }

    public async Task<CustomerOperationResult<CustomerImportQueuedDto>> QueueImportAsync(Stream stream, string fileName, ActorContext actor, CancellationToken cancellationToken = default)
    {
        if (stream is null)
        {
            return CustomerOperationResult<CustomerImportQueuedDto>.Fail("CSV file is required.");
        }

        if (string.IsNullOrWhiteSpace(fileName))
        {
            return CustomerOperationResult<CustomerImportQueuedDto>.Fail("File name is required.");
        }

        var tenantKey = _tenantProvider.TenantKey;
        var storageRoot = Path.Combine(_environment.ContentRootPath, "uploads", "imports", tenantKey.ToLowerInvariant());
        Directory.CreateDirectory(storageRoot);

        var safeName = Path.GetFileName(fileName);
        var importJob = new ImportJob
        {
            EntityType = "Customers",
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

        return CustomerOperationResult<CustomerImportQueuedDto>.Ok(
            new CustomerImportQueuedDto(importJob.Id, importJob.EntityType, importJob.Status));
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

        var fallbackUserId = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallbackUserId == Guid.Empty ? Guid.NewGuid() : fallbackUserId;
    }
}
