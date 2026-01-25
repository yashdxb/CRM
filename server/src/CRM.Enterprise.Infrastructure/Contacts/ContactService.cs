using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Contacts;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Contacts;

public sealed class ContactService : IContactService
{
    private readonly CrmDbContext _dbContext;

    public ContactService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ContactSearchResultDto> SearchAsync(ContactSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Contacts
            .Include(c => c.Account)
            .AsNoTracking()
            .Where(c => !c.IsDeleted);

        if (request.AccountId.HasValue && request.AccountId.Value != Guid.Empty)
        {
            query = query.Where(c => c.AccountId == request.AccountId.Value);
        }

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(c =>
                (c.FirstName + " " + c.LastName).ToLower().Contains(term) ||
                (c.Email ?? string.Empty).ToLower().Contains(term) ||
                (c.Phone ?? string.Empty).ToLower().Contains(term));
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

        var items = data.Select(c => new ContactListItemDto(
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

        return new ContactSearchResultDto(items, total);
    }

    public async Task<ContactDetailDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var contact = await _dbContext.Contacts
            .Include(c => c.Account)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);

        if (contact is null)
        {
            return null;
        }

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == contact.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken);

        return new ContactDetailDto(
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
    }

    public async Task<ContactOperationResult<ContactDetailDto>> CreateAsync(ContactUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
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
            OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken),
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

        var dto = new ContactDetailDto(
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
            contact.UpdatedAtUtc);

        return ContactOperationResult<ContactDetailDto>.Ok(dto);
    }

    public async Task<ContactOperationResult<bool>> UpdateAsync(Guid id, ContactUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var contact = await _dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (contact is null)
        {
            return ContactOperationResult<bool>.NotFoundResult();
        }

        contact.FirstName = request.FirstName;
        contact.LastName = request.LastName;
        contact.Email = request.Email;
        contact.Phone = request.Phone;
        contact.Mobile = request.Mobile;
        contact.JobTitle = request.JobTitle;
        contact.AccountId = request.AccountId;
        contact.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        contact.LinkedInProfile = request.LinkedInProfile;
        contact.LifecycleStage = request.LifecycleStage;
        contact.ActivityScore = request.ActivityScore;
        contact.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return ContactOperationResult<bool>.Ok(true);
    }

    public async Task<ContactOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var contact = await _dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (contact is null)
        {
            return ContactOperationResult<bool>.NotFoundResult();
        }

        contact.IsDeleted = true;
        contact.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return ContactOperationResult<bool>.Ok(true);
    }

    public async Task<ContactOperationResult<bool>> UpdateOwnerAsync(Guid id, Guid ownerId, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var contact = await _dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (contact is null)
        {
            return ContactOperationResult<bool>.NotFoundResult();
        }

        contact.OwnerId = await ResolveOwnerIdAsync(ownerId, actor, cancellationToken);
        contact.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return ContactOperationResult<bool>.Ok(true);
    }

    public async Task<ContactOperationResult<bool>> UpdateLifecycleAsync(Guid id, string lifecycle, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var contact = await _dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (contact is null)
        {
            return ContactOperationResult<bool>.NotFoundResult();
        }

        contact.LifecycleStage = lifecycle;
        contact.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return ContactOperationResult<bool>.Ok(true);
    }

    public async Task<ContactOperationResult<int>> BulkAssignOwnerAsync(IReadOnlyCollection<Guid> ids, Guid ownerId, CancellationToken cancellationToken = default)
    {
        var ownerExists = await _dbContext.Users
            .AnyAsync(u => u.Id == ownerId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (!ownerExists)
        {
            return ContactOperationResult<int>.Fail("Owner not found.");
        }

        var contacts = await _dbContext.Contacts
            .Where(c => ids.Contains(c.Id) && !c.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var contact in contacts)
        {
            contact.OwnerId = ownerId;
            contact.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return ContactOperationResult<int>.Ok(contacts.Count);
    }

    public async Task<ContactOperationResult<int>> BulkUpdateLifecycleAsync(IReadOnlyCollection<Guid> ids, string lifecycle, CancellationToken cancellationToken = default)
    {
        var contacts = await _dbContext.Contacts
            .Where(c => ids.Contains(c.Id) && !c.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var contact in contacts)
        {
            contact.LifecycleStage = lifecycle;
            contact.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return ContactOperationResult<int>.Ok(contacts.Count);
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
