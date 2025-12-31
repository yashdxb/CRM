using System.Text.Json;
using CRM.Enterprise.Api.Contracts.Leads;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Api.Utilities;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Api.Jobs;

public class CsvImportJobs
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly ILogger<CsvImportJobs> _logger;

    public CsvImportJobs(CrmDbContext dbContext, ITenantProvider tenantProvider, ILogger<CsvImportJobs> logger)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _logger = logger;
    }

    public async Task ProcessCustomersAsync(Guid jobId)
    {
        await ProcessAsync(jobId, "Customers", ImportCustomersAsync);
    }

    public async Task ProcessContactsAsync(Guid jobId)
    {
        await ProcessAsync(jobId, "Contacts", ImportContactsAsync);
    }

    public async Task ProcessLeadsAsync(Guid jobId)
    {
        await ProcessAsync(jobId, "Leads", ImportLeadsAsync);
    }

    private async Task ProcessAsync(
        Guid jobId,
        string entityType,
        Func<IReadOnlyList<Dictionary<string, string>>, CancellationToken, Task<CsvImportResult>> handler)
    {
        var job = await _dbContext.ImportJobs
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(j => j.Id == jobId);
        if (job is null)
        {
            _logger.LogWarning("Import job {JobId} not found.", jobId);
            return;
        }

        if (!string.Equals(job.EntityType, entityType, StringComparison.OrdinalIgnoreCase))
        {
            _logger.LogWarning("Import job {JobId} entity type mismatch ({Type}).", jobId, job.EntityType);
            return;
        }

        var tenant = await _dbContext.Tenants.AsNoTracking().FirstOrDefaultAsync(t => t.Id == job.TenantId);
        if (tenant is null)
        {
            job.Status = "Failed";
            job.ErrorMessage = "Tenant not found.";
            job.CompletedAtUtc = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync(CancellationToken.None);
            return;
        }

        var originalTenantId = _tenantProvider.TenantId;
        var originalTenantKey = _tenantProvider.TenantKey;
        try
        {
            _tenantProvider.SetTenant(tenant.Id, tenant.Key);
            job.Status = "Processing";
            await _dbContext.SaveChangesAsync(CancellationToken.None);

            var rows = await CsvImportHelper.ReadAsync(job.FilePath, CancellationToken.None);
            var result = await handler(rows, CancellationToken.None);

            job.TotalRows = result.Total;
            job.Imported = result.Imported;
            job.Skipped = result.Skipped;
            job.ErrorsJson = JsonSerializer.Serialize(result.Errors);
            job.Status = "Completed";
            job.CompletedAtUtc = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync(CancellationToken.None);
        }
        catch (Exception ex)
        {
            job.Status = "Failed";
            job.ErrorMessage = ex.Message;
            job.CompletedAtUtc = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync(CancellationToken.None);
            _logger.LogError(ex, "Import job {JobId} failed.", jobId);
        }
        finally
        {
            _tenantProvider.SetTenant(originalTenantId, originalTenantKey);
        }
    }

    private async Task<CsvImportResult> ImportCustomersAsync(
        IReadOnlyList<Dictionary<string, string>> rows,
        CancellationToken cancellationToken)
    {
        if (rows.Count == 0)
        {
            return new CsvImportResult(0, 0, 0, Array.Empty<CsvImportError>());
        }

        var errors = new List<CsvImportError>();
        var imported = 0;

        for (var i = 0; i < rows.Count; i++)
        {
            var row = rows[i];
            var name = CsvImportHelper.ReadValue(row, "name", "account", "accountname", "company");
            if (string.IsNullOrWhiteSpace(name))
            {
                errors.Add(new CsvImportError(i + 2, "Name is required."));
                continue;
            }

            var ownerEmail = CsvImportHelper.ReadValue(row, "owner", "owneremail", "owner_email");
            var ownerId = await ResolveOwnerIdFromEmailAsync(ownerEmail, cancellationToken);

            var account = new Account
            {
                Name = name,
                AccountNumber = CsvImportHelper.ReadValue(row, "accountnumber", "account_number"),
                Industry = CsvImportHelper.ReadValue(row, "industry"),
                Website = CsvImportHelper.ReadValue(row, "website"),
                Phone = CsvImportHelper.ReadValue(row, "phone"),
                LifecycleStage = CsvImportHelper.ReadValue(row, "lifecycle", "lifecyclestage", "status"),
                OwnerId = ownerId,
                Territory = CsvImportHelper.ReadValue(row, "territory"),
                Description = CsvImportHelper.ReadValue(row, "description", "notes"),
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.Accounts.Add(account);
            imported++;
        }

        if (imported > 0)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return new CsvImportResult(rows.Count, imported, rows.Count - imported, errors);
    }

    private async Task<CsvImportResult> ImportContactsAsync(
        IReadOnlyList<Dictionary<string, string>> rows,
        CancellationToken cancellationToken)
    {
        if (rows.Count == 0)
        {
            return new CsvImportResult(0, 0, 0, Array.Empty<CsvImportError>());
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
            var accountId = await ResolveAccountIdAsync(accountName, cancellationToken);

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
                OwnerId = ownerId,
                AccountId = accountId,
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

        return new CsvImportResult(rows.Count, imported, rows.Count - imported, errors);
    }

    private async Task<CsvImportResult> ImportLeadsAsync(
        IReadOnlyList<Dictionary<string, string>> rows,
        CancellationToken cancellationToken)
    {
        if (rows.Count == 0)
        {
            return new CsvImportResult(0, 0, 0, Array.Empty<CsvImportError>());
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
                errors.Add(new CsvImportError(i + 2, "Lead name is required."));
                continue;
            }

            var ownerEmail = CsvImportHelper.ReadValue(row, "owner", "owneremail", "owner_email");
            var ownerId = await ResolveOwnerIdFromEmailAsync(ownerEmail, cancellationToken);
            var assignmentStrategy = CsvImportHelper.ReadValue(row, "assignment", "assignmentstrategy");
            var territory = CsvImportHelper.ReadValue(row, "territory");

            var statusName = CsvImportHelper.ReadValue(row, "status");
            var statusId = await ResolveLeadStatusIdAsync(statusName, cancellationToken);

            var request = new UpsertLeadRequest
            {
                FirstName = firstName ?? string.Empty,
                LastName = lastName ?? string.Empty,
                Email = CsvImportHelper.ReadValue(row, "email"),
                Phone = CsvImportHelper.ReadValue(row, "phone"),
                CompanyName = CsvImportHelper.ReadValue(row, "company", "companyname"),
                JobTitle = CsvImportHelper.ReadValue(row, "jobtitle", "title"),
                Status = statusName,
                OwnerId = ownerId,
                AssignmentStrategy = assignmentStrategy,
                Source = CsvImportHelper.ReadValue(row, "source"),
                Territory = territory,
                AutoScore = CsvImportHelper.ReadBool(row, "autoscore"),
                Score = CsvImportHelper.ReadInt(row, "score") ?? 0
            };

            var resolvedOwnerId = await ResolveOwnerIdAsync(ownerId, territory, assignmentStrategy, cancellationToken);
            var score = ResolveLeadScore(request);

            var lead = new Lead
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Phone = request.Phone,
                CompanyName = request.CompanyName,
                JobTitle = request.JobTitle,
                LeadStatusId = statusId,
                OwnerId = resolvedOwnerId,
                Source = request.Source,
                Territory = territory,
                Score = score,
                CreatedAtUtc = DateTime.UtcNow
            };

            _dbContext.Leads.Add(lead);
            var resolvedStatusName = await ResolveLeadStatusNameAsync(statusId, cancellationToken);
            ApplyStatusSideEffects(lead, resolvedStatusName);
            AddStatusHistory(lead, statusId, "Imported lead");
            imported++;
        }

        if (imported > 0)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return new CsvImportResult(rows.Count, imported, rows.Count - imported, errors);
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

    private async Task<Guid?> ResolveAccountIdAsync(string? accountName, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(accountName))
        {
            return null;
        }

        var accountId = await _dbContext.Accounts
            .Where(a => a.Name == accountName && !a.IsDeleted)
            .Select(a => a.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return accountId == Guid.Empty ? null : accountId;
    }

    private async Task<Guid> ResolveLeadStatusIdAsync(string? statusName, CancellationToken cancellationToken)
    {
        var name = string.IsNullOrWhiteSpace(statusName) ? "New" : statusName;
        var status = await _dbContext.LeadStatuses.FirstOrDefaultAsync(s => s.Name == name, cancellationToken)
                     ?? await _dbContext.LeadStatuses.OrderBy(s => s.Order).FirstOrDefaultAsync(cancellationToken);
        return status?.Id ?? Guid.NewGuid();
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, string? territory, string? assignmentStrategy, CancellationToken cancellationToken)
    {
        var strategy = string.IsNullOrWhiteSpace(assignmentStrategy) ? string.Empty : assignmentStrategy.Trim();

        if (string.Equals(strategy, "Manual", StringComparison.OrdinalIgnoreCase) || string.IsNullOrWhiteSpace(strategy))
        {
            if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
            {
                var exists = await _dbContext.Users.AnyAsync(u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted, cancellationToken);
                if (exists) return requestedOwnerId.Value;
            }
        }

        if (string.Equals(strategy, "Territory", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrWhiteSpace(territory))
        {
            var territoryRule = await _dbContext.LeadAssignmentRules
                .FirstOrDefaultAsync(r => r.IsActive && r.Type == "Territory" && r.Territory == territory, cancellationToken);

            if (territoryRule?.AssignedUserId is Guid territoryOwner && territoryOwner != Guid.Empty)
            {
                var exists = await _dbContext.Users.AnyAsync(u => u.Id == territoryOwner && u.IsActive && !u.IsDeleted, cancellationToken);
                if (exists) return territoryOwner;
            }
        }

        if (string.Equals(strategy, "RoundRobin", StringComparison.OrdinalIgnoreCase)
            || string.Equals(strategy, "Territory", StringComparison.OrdinalIgnoreCase)
            || string.IsNullOrWhiteSpace(strategy))
        {
            var rule = await _dbContext.LeadAssignmentRules
                .FirstOrDefaultAsync(r => r.IsActive && r.Type == "RoundRobin", cancellationToken);

            var activeUsers = await _dbContext.Users
                .Where(u => u.IsActive && !u.IsDeleted)
                .OrderBy(u => u.CreatedAtUtc)
                .Select(u => u.Id)
                .ToListAsync(cancellationToken);

            if (activeUsers.Count > 0)
            {
                var nextOwner = activeUsers[0];
                if (rule?.LastAssignedUserId is Guid lastAssigned && activeUsers.Contains(lastAssigned))
                {
                    var index = activeUsers.IndexOf(lastAssigned);
                    nextOwner = activeUsers[(index + 1) % activeUsers.Count];
                }

                if (rule is not null)
                {
                    rule.LastAssignedUserId = nextOwner;
                }

                return nextOwner;
            }
        }

        var fallbackUserId = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallbackUserId == Guid.Empty ? Guid.NewGuid() : fallbackUserId;
    }

    private async Task<string?> ResolveLeadStatusNameAsync(Guid statusId, CancellationToken cancellationToken)
    {
        var status = await _dbContext.LeadStatuses
            .Where(s => s.Id == statusId)
            .Select(s => s.Name)
            .FirstOrDefaultAsync(cancellationToken);
        return status;
    }

    private void ApplyStatusSideEffects(Lead lead, string? statusName)
    {
        if (string.Equals(statusName, "Qualified", StringComparison.OrdinalIgnoreCase))
        {
            lead.QualifiedAtUtc = DateTime.UtcNow;
        }

        if (string.Equals(statusName, "Converted", StringComparison.OrdinalIgnoreCase))
        {
            lead.ConvertedAtUtc = DateTime.UtcNow;
        }
    }

    private void AddStatusHistory(Lead lead, Guid statusId, string? notes)
    {
        _dbContext.LeadStatusHistories.Add(new LeadStatusHistory
        {
            LeadId = lead.Id,
            LeadStatusId = statusId,
            ChangedAtUtc = DateTime.UtcNow,
            ChangedBy = "system",
            Notes = notes
        });
    }

    private static int ResolveLeadScore(UpsertLeadRequest request, int? currentScore = null)
    {
        var autoScore = request.AutoScore ?? true;
        if (!autoScore)
        {
            return Math.Clamp(request.Score, 0, 100);
        }

        var score = 20;
        if (!string.IsNullOrWhiteSpace(request.Email)) score += 20;
        if (!string.IsNullOrWhiteSpace(request.Phone)) score += 15;
        if (!string.IsNullOrWhiteSpace(request.CompanyName)) score += 10;
        if (!string.IsNullOrWhiteSpace(request.JobTitle)) score += 10;
        if (!string.IsNullOrWhiteSpace(request.Source)) score += 10;
        if (!string.IsNullOrWhiteSpace(request.Territory)) score += 5;
        if (request.AccountId.HasValue) score += 5;
        if (request.ContactId.HasValue) score += 5;

        if (score == 20 && currentScore.HasValue && currentScore.Value > 0)
        {
            return currentScore.Value;
        }

        return Math.Clamp(score, 0, 100);
    }
}
