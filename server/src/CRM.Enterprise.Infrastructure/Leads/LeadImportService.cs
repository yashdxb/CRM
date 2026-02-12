using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class LeadImportService : ILeadImportService
{
    private readonly CrmDbContext _dbContext;
    private readonly IWebHostEnvironment _environment;
    private readonly ITenantProvider _tenantProvider;

    public LeadImportService(
        CrmDbContext dbContext,
        IWebHostEnvironment environment,
        ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _environment = environment;
        _tenantProvider = tenantProvider;
    }

    public async Task<LeadImportResultDto> ImportAsync(Stream stream, LeadActor actor, CancellationToken cancellationToken = default)
    {
        if (stream is null)
        {
            return new LeadImportResultDto(0, 0, 0, Array.Empty<LeadImportError>());
        }

        var rows = await LeadCsvImportHelper.ReadAsync(stream, cancellationToken);
        if (rows.Count == 0)
        {
            return new LeadImportResultDto(0, 0, 0, Array.Empty<LeadImportError>());
        }

        var errors = new List<LeadImportError>();
        var imported = 0;

        for (var i = 0; i < rows.Count; i++)
        {
            var row = rows[i];
            var fullName = LeadCsvImportHelper.ReadValue(row, "name", "fullname", "full_name");
            var firstName = LeadCsvImportHelper.ReadValue(row, "firstname", "first_name");
            var lastName = LeadCsvImportHelper.ReadValue(row, "lastname", "last_name");
            if (string.IsNullOrWhiteSpace(firstName) && string.IsNullOrWhiteSpace(lastName) && !string.IsNullOrWhiteSpace(fullName))
            {
                (firstName, lastName) = LeadCsvImportHelper.SplitName(fullName);
            }

            if (string.IsNullOrWhiteSpace(firstName) && string.IsNullOrWhiteSpace(lastName))
            {
                errors.Add(new LeadImportError(i + 2, "Lead name is required."));
                continue;
            }

            var ownerEmail = LeadCsvImportHelper.ReadValue(row, "owner", "owneremail", "owner_email");
            var ownerId = await ResolveOwnerIdFromEmailAsync(ownerEmail, cancellationToken);
            var assignmentStrategy = LeadCsvImportHelper.ReadValue(row, "assignment", "assignmentstrategy");
            var territory = LeadCsvImportHelper.ReadValue(row, "territory");

            var statusName = LeadCsvImportHelper.ReadValue(row, "status");
            var status = await ResolveLeadStatusAsync(statusName, cancellationToken);

            var request = new LeadUpsertRequest(
                firstName ?? string.Empty,
                lastName ?? string.Empty,
                LeadCsvImportHelper.ReadValue(row, "email"),
                LeadCsvImportHelper.ReadValue(row, "phone"),
                null,
                LeadCsvImportHelper.ReadValue(row, "company", "companyname"),
                LeadCsvImportHelper.ReadValue(row, "jobtitle", "title"),
                statusName,
                ownerId,
                assignmentStrategy,
                LeadCsvImportHelper.ReadValue(row, "source"),
                territory,
                LeadCsvImportHelper.ReadBool(row, "autoscore"),
                LeadCsvImportHelper.ReadInt(row, "score") ?? 0,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

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
                LeadStatusId = status.Id,
                OwnerId = resolvedOwnerId,
                Source = request.Source,
                Territory = territory,
                Score = score,
                CreatedAtUtc = DateTime.UtcNow
            };

            lead.Status = status;

            _dbContext.Leads.Add(lead);
            var resolvedStatusName = await ResolveLeadStatusNameAsync(status.Id, cancellationToken);
            ApplyStatusSideEffects(lead, resolvedStatusName);
            AddStatusHistory(lead, status.Id, "Imported lead", actor);
            imported++;
        }

        if (imported > 0)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return new LeadImportResultDto(rows.Count, imported, rows.Count - imported, errors);
    }

    public async Task<LeadOperationResult<LeadImportQueuedDto>> QueueImportAsync(Stream inputStream, string fileName, LeadActor actor, CancellationToken cancellationToken = default)
    {
        if (inputStream is null)
        {
            return LeadOperationResult<LeadImportQueuedDto>.Fail("CSV file is required.");
        }

        if (string.IsNullOrWhiteSpace(fileName))
        {
            return LeadOperationResult<LeadImportQueuedDto>.Fail("File name is required.");
        }

        var tenantKey = _tenantProvider.TenantKey;
        var storageRoot = Path.Combine(_environment.ContentRootPath, "uploads", "imports", tenantKey.ToLowerInvariant());
        Directory.CreateDirectory(storageRoot);

        var safeName = Path.GetFileName(fileName);
        var importJob = new ImportJob
        {
            EntityType = "Leads",
            FileName = safeName,
            Status = "Queued",
            RequestedById = actor.UserId
        };
        _dbContext.ImportJobs.Add(importJob);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var storedName = $"{importJob.Id:N}_{safeName}";
        var storagePath = Path.Combine(storageRoot, storedName);
        await using (var stream = System.IO.File.Create(storagePath))
        {
            await inputStream.CopyToAsync(stream, cancellationToken);
        }

        importJob.FilePath = storagePath;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return LeadOperationResult<LeadImportQueuedDto>.Ok(
            new LeadImportQueuedDto(importJob.Id, importJob.EntityType, importJob.Status));
    }

    private async Task<LeadStatus> ResolveLeadStatusAsync(string? statusName, CancellationToken cancellationToken)
    {
        var name = string.IsNullOrWhiteSpace(statusName) ? "New" : statusName;
        var status = await _dbContext.LeadStatuses.FirstOrDefaultAsync(s => s.Name == name, cancellationToken);
        if (status is not null)
        {
            return status;
        }

        if (!string.IsNullOrWhiteSpace(statusName))
        {
            var maxOrder = await _dbContext.LeadStatuses.MaxAsync(s => (int?)s.Order, cancellationToken) ?? 0;
            status = new LeadStatus
            {
                Name = name,
                Order = maxOrder + 1,
                IsDefault = false,
                IsClosed = string.Equals(name, "Lost", StringComparison.OrdinalIgnoreCase)
                           || string.Equals(name, "Disqualified", StringComparison.OrdinalIgnoreCase)
                           || string.Equals(name, "Converted", StringComparison.OrdinalIgnoreCase)
            };
            _dbContext.LeadStatuses.Add(status);
            return status;
        }

        status = await _dbContext.LeadStatuses.OrderBy(s => s.Order).FirstOrDefaultAsync(cancellationToken);
        if (status is not null)
        {
            return status;
        }

        status = new LeadStatus
        {
            Name = "New",
            Order = 1,
            IsDefault = true,
            IsClosed = false
        };
        _dbContext.LeadStatuses.Add(status);
        return status;
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

    private async Task<Guid?> ResolveOwnerIdFromEmailAsync(string? ownerEmail, CancellationToken cancellationToken)
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

        return null;
    }

    private async Task<string?> ResolveLeadStatusNameAsync(Guid statusId, CancellationToken cancellationToken)
    {
        var status = await _dbContext.LeadStatuses
            .Where(s => s.Id == statusId)
            .Select(s => s.Name)
            .FirstOrDefaultAsync(cancellationToken);
        return status;
    }

    private void AddStatusHistory(Lead lead, Guid statusId, string? notes, LeadActor actor)
    {
        _dbContext.LeadStatusHistories.Add(new LeadStatusHistory
        {
            LeadId = lead.Id,
            LeadStatusId = statusId,
            ChangedAtUtc = DateTime.UtcNow,
            ChangedBy = string.IsNullOrWhiteSpace(actor.UserName) ? "system" : actor.UserName,
            Notes = notes
        });
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

    private static int ResolveLeadScore(LeadUpsertRequest request, int? currentScore = null)
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
