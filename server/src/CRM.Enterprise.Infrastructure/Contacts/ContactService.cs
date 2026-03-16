using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Contacts;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Contacts;

public sealed class ContactService : IContactService
{
    private static readonly HashSet<string> AllowedBuyingRoles = new(StringComparer.OrdinalIgnoreCase)
    {
        "Decision Maker",
        "Champion",
        "Influencer",
        "Procurement",
        "Technical Evaluator"
    };
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
            .Include(c => c.Tags.Where(t => !t.IsDeleted))
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

        if (!string.IsNullOrWhiteSpace(request.Tag))
        {
            var tagLower = request.Tag.ToLower();
            query = query.Where(c => c.Tags.Any(t => !t.IsDeleted && t.Tag.ToLower() == tagLower));
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
                c.BuyingRole,
                c.AccountId,
                AccountName = c.Account != null ? c.Account.Name : null,
                c.OwnerId,
                c.LifecycleStage,
                c.ActivityScore,
                c.CreatedAtUtc,
                c.City,
                c.Country,
                Tags = c.Tags.Where(t => !t.IsDeleted).Select(t => t.Tag).ToList()
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
            c.BuyingRole,
            c.AccountId,
            c.AccountName,
            c.OwnerId,
            ownerLookup.TryGetValue(c.OwnerId, out var ownerName) ? ownerName : "Unassigned",
            c.LifecycleStage ?? "Customer",
            c.ActivityScore,
            c.CreatedAtUtc,
            c.City,
            c.Country,
            c.Tags)).ToList();

        return new ContactSearchResultDto(items, total);
    }

    public async Task<ContactDetailDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var contact = await _dbContext.Contacts
            .Include(c => c.Account)
            .Include(c => c.Tags.Where(t => !t.IsDeleted))
            .Include(c => c.ReportsTo)
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

        var tags = contact.Tags.Select(t => t.Tag).ToList();
        var reportsToName = contact.ReportsTo is not null
            ? $"{contact.ReportsTo.FirstName} {contact.ReportsTo.LastName}".Trim()
            : null;

        return new ContactDetailDto(
            contact.Id,
            contact.FirstName,
            contact.LastName,
            contact.Email,
            contact.Phone,
            contact.Mobile,
            contact.JobTitle,
            contact.BuyingRole,
            contact.AccountId,
            contact.Account?.Name,
            contact.OwnerId,
            ownerName,
            contact.LinkedInProfile,
            contact.LifecycleStage,
            contact.ActivityScore,
            contact.CreatedAtUtc,
            contact.UpdatedAtUtc,
            contact.Street,
            contact.City,
            contact.State,
            contact.PostalCode,
            contact.Country,
            tags,
            contact.ReportsToId,
            reportsToName);
    }

    public async Task<ContactOperationResult<ContactDetailDto>> CreateAsync(ContactUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var roleError = ValidateBuyingRole(request.BuyingRole);
        if (roleError is not null)
        {
            return ContactOperationResult<ContactDetailDto>.Fail(roleError);
        }

        var contact = new Contact
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Phone = request.Phone,
            Mobile = request.Mobile,
            JobTitle = request.JobTitle,
            BuyingRole = NormalizeBuyingRole(request.BuyingRole),
            AccountId = request.AccountId,
            OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken),
            LinkedInProfile = request.LinkedInProfile,
            LifecycleStage = request.LifecycleStage,
            ActivityScore = request.ActivityScore,
            Street = request.Street,
            City = request.City,
            State = request.State,
            PostalCode = request.PostalCode,
            Country = request.Country,
            ReportsToId = request.ReportsToId,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Contacts.Add(contact);

        if (request.Tags is { Count: > 0 })
        {
            foreach (var tag in request.Tags.Distinct(StringComparer.OrdinalIgnoreCase))
            {
                _dbContext.Set<ContactTag>().Add(new ContactTag
                {
                    ContactId = contact.Id,
                    Tag = tag.Trim(),
                    CreatedAtUtc = DateTime.UtcNow
                });
            }
        }

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
            contact.BuyingRole,
            contact.AccountId,
            accountName,
            contact.OwnerId,
            ownerName,
            contact.LinkedInProfile,
            contact.LifecycleStage,
            contact.ActivityScore,
            contact.CreatedAtUtc,
            contact.UpdatedAtUtc,
            contact.Street,
            contact.City,
            contact.State,
            contact.PostalCode,
            contact.Country,
            request.Tags?.ToList(),
            contact.ReportsToId);

        return ContactOperationResult<ContactDetailDto>.Ok(dto);
    }

    public async Task<ContactOperationResult<bool>> UpdateAsync(Guid id, ContactUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var contact = await _dbContext.Contacts
            .Include(c => c.Tags.Where(t => !t.IsDeleted))
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (contact is null)
        {
            return ContactOperationResult<bool>.NotFoundResult();
        }

        var roleError = ValidateBuyingRole(request.BuyingRole);
        if (roleError is not null)
        {
            return ContactOperationResult<bool>.Fail(roleError);
        }

        contact.FirstName = request.FirstName;
        contact.LastName = request.LastName;
        contact.Email = request.Email;
        contact.Phone = request.Phone;
        contact.Mobile = request.Mobile;
        contact.JobTitle = request.JobTitle;
        contact.BuyingRole = NormalizeBuyingRole(request.BuyingRole);
        contact.AccountId = request.AccountId;
        contact.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        contact.LinkedInProfile = request.LinkedInProfile;
        contact.LifecycleStage = request.LifecycleStage;
        contact.ActivityScore = request.ActivityScore;
        contact.Street = request.Street;
        contact.City = request.City;
        contact.State = request.State;
        contact.PostalCode = request.PostalCode;
        contact.Country = request.Country;
        contact.ReportsToId = request.ReportsToId;
        contact.UpdatedAtUtc = DateTime.UtcNow;

        // Sync tags
        if (request.Tags is not null)
        {
            var existingTags = contact.Tags.Select(t => t.Tag).ToHashSet(StringComparer.OrdinalIgnoreCase);
            var requestedTags = request.Tags.Select(t => t.Trim()).Distinct(StringComparer.OrdinalIgnoreCase).ToList();

            // Remove tags no longer present
            foreach (var tag in contact.Tags.Where(t => !requestedTags.Contains(t.Tag, StringComparer.OrdinalIgnoreCase)).ToList())
            {
                tag.IsDeleted = true;
                tag.DeletedAtUtc = DateTime.UtcNow;
            }

            // Add new tags
            foreach (var tag in requestedTags.Where(t => !existingTags.Contains(t)))
            {
                _dbContext.Set<ContactTag>().Add(new ContactTag
                {
                    ContactId = contact.Id,
                    Tag = tag,
                    CreatedAtUtc = DateTime.UtcNow
                });
            }
        }

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

    // C15: Duplicate detection
    public async Task<DuplicateCheckResultDto> CheckDuplicatesAsync(DuplicateCheckRequest request, CancellationToken cancellationToken = default)
    {
        var duplicates = new List<DuplicateContactDto>();

        var query = _dbContext.Contacts.AsNoTracking().Where(c => !c.IsDeleted);
        if (request.ExcludeContactId.HasValue)
        {
            query = query.Where(c => c.Id != request.ExcludeContactId.Value);
        }

        // Check exact email match
        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            var emailLower = request.Email.ToLower();
            var emailMatches = await query
                .Where(c => c.Email != null && c.Email.ToLower() == emailLower)
                .Select(c => new { c.Id, FullName = (c.FirstName + " " + c.LastName).Trim(), c.Email, c.Phone })
                .Take(5)
                .ToListAsync(cancellationToken);

            foreach (var m in emailMatches)
            {
                duplicates.Add(new DuplicateContactDto(m.Id, m.FullName, m.Email, m.Phone, 95, "Exact email match"));
            }
        }

        // Check name match
        if (!string.IsNullOrWhiteSpace(request.FirstName) && !string.IsNullOrWhiteSpace(request.LastName))
        {
            var firstLower = request.FirstName.ToLower();
            var lastLower = request.LastName.ToLower();
            var nameMatches = await query
                .Where(c => c.FirstName.ToLower() == firstLower && c.LastName.ToLower() == lastLower)
                .Select(c => new { c.Id, FullName = (c.FirstName + " " + c.LastName).Trim(), c.Email, c.Phone })
                .Take(5)
                .ToListAsync(cancellationToken);

            foreach (var m in nameMatches.Where(nm => duplicates.All(d => d.Id != nm.Id)))
            {
                duplicates.Add(new DuplicateContactDto(m.Id, m.FullName, m.Email, m.Phone, 75, "Exact name match"));
            }
        }

        // Check phone match
        if (!string.IsNullOrWhiteSpace(request.Phone))
        {
            var phoneDigits = new string(request.Phone.Where(char.IsDigit).ToArray());
            if (phoneDigits.Length >= 7)
            {
                var phoneMatches = await query
                    .Where(c => c.Phone != null && c.Phone.Contains(phoneDigits.Substring(phoneDigits.Length - 7)))
                    .Select(c => new { c.Id, FullName = (c.FirstName + " " + c.LastName).Trim(), c.Email, c.Phone })
                    .Take(5)
                    .ToListAsync(cancellationToken);

                foreach (var m in phoneMatches.Where(pm => duplicates.All(d => d.Id != pm.Id)))
                {
                    duplicates.Add(new DuplicateContactDto(m.Id, m.FullName, m.Email, m.Phone, 60, "Similar phone number"));
                }
            }
        }

        return new DuplicateCheckResultDto(duplicates);
    }

    // C16: Contact merge
    public async Task<ContactOperationResult<ContactMergeResultDto>> MergeAsync(ContactMergeRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var master = await _dbContext.Contacts.FirstOrDefaultAsync(c => c.Id == request.MasterContactId && !c.IsDeleted, cancellationToken);
        if (master is null)
        {
            return ContactOperationResult<ContactMergeResultDto>.Fail("Master contact not found.");
        }

        var secondaries = await _dbContext.Contacts
            .Where(c => request.SecondaryContactIds.Contains(c.Id) && !c.IsDeleted)
            .ToListAsync(cancellationToken);

        if (secondaries.Count == 0)
        {
            return ContactOperationResult<ContactMergeResultDto>.Fail("No secondary contacts found.");
        }

        var secondaryIds = secondaries.Select(s => s.Id).ToList();

        // Move activities to master
        var activities = await _dbContext.Activities
            .Where(a => a.RelatedEntityType == ActivityRelationType.Contact && secondaryIds.Contains(a.RelatedEntityId) && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var activity in activities)
        {
            activity.RelatedEntityId = master.Id;
            activity.UpdatedAtUtc = DateTime.UtcNow;
        }

        // Move opportunities where secondary is primary contact
        var opportunities = await _dbContext.Opportunities
            .Where(o => o.PrimaryContactId.HasValue && secondaryIds.Contains(o.PrimaryContactId.Value) && !o.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var opp in opportunities)
        {
            opp.PrimaryContactId = master.Id;
            opp.UpdatedAtUtc = DateTime.UtcNow;
        }

        // Update contacts reporting to secondaries
        var reportingContacts = await _dbContext.Contacts
            .Where(c => c.ReportsToId.HasValue && secondaryIds.Contains(c.ReportsToId.Value) && !c.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var rc in reportingContacts)
        {
            rc.ReportsToId = master.Id;
            rc.UpdatedAtUtc = DateTime.UtcNow;
        }

        // Merge tags
        var masterTags = await _dbContext.Set<ContactTag>()
            .Where(t => t.ContactId == master.Id && !t.IsDeleted)
            .Select(t => t.Tag)
            .ToListAsync(cancellationToken);

        var existingTagSet = new HashSet<string>(masterTags, StringComparer.OrdinalIgnoreCase);

        var secondaryTags = await _dbContext.Set<ContactTag>()
            .Where(t => secondaryIds.Contains(t.ContactId) && !t.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var st in secondaryTags)
        {
            if (!existingTagSet.Contains(st.Tag))
            {
                _dbContext.Set<ContactTag>().Add(new ContactTag
                {
                    ContactId = master.Id,
                    Tag = st.Tag,
                    CreatedAtUtc = DateTime.UtcNow
                });
                existingTagSet.Add(st.Tag);
            }
            st.IsDeleted = true;
            st.DeletedAtUtc = DateTime.UtcNow;
        }

        // Soft delete secondaries
        foreach (var secondary in secondaries)
        {
            secondary.IsDeleted = true;
            secondary.DeletedAtUtc = DateTime.UtcNow;
        }

        master.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return ContactOperationResult<ContactMergeResultDto>.Ok(new ContactMergeResultDto(master.Id, secondaries.Count));
    }

    // C17: Tags
    public async Task<IReadOnlyList<string>> GetAllTagsAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.Set<ContactTag>()
            .AsNoTracking()
            .Where(t => !t.IsDeleted)
            .Select(t => t.Tag)
            .Distinct()
            .OrderBy(t => t)
            .ToListAsync(cancellationToken);
    }

    public async Task<ContactOperationResult<bool>> UpdateTagsAsync(Guid contactId, IReadOnlyList<string> tags, CancellationToken cancellationToken = default)
    {
        var contact = await _dbContext.Contacts
            .Include(c => c.Tags.Where(t => !t.IsDeleted))
            .FirstOrDefaultAsync(c => c.Id == contactId && !c.IsDeleted, cancellationToken);

        if (contact is null)
        {
            return ContactOperationResult<bool>.NotFoundResult();
        }

        var existingTags = contact.Tags.Select(t => t.Tag).ToHashSet(StringComparer.OrdinalIgnoreCase);
        var requestedTags = tags.Select(t => t.Trim()).Distinct(StringComparer.OrdinalIgnoreCase).ToList();

        foreach (var tag in contact.Tags.Where(t => !requestedTags.Contains(t.Tag, StringComparer.OrdinalIgnoreCase)).ToList())
        {
            tag.IsDeleted = true;
            tag.DeletedAtUtc = DateTime.UtcNow;
        }

        foreach (var tag in requestedTags.Where(t => !existingTags.Contains(t)))
        {
            _dbContext.Set<ContactTag>().Add(new ContactTag
            {
                ContactId = contact.Id,
                Tag = tag,
                CreatedAtUtc = DateTime.UtcNow
            });
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return ContactOperationResult<bool>.Ok(true);
    }

    // C19: Relationships
    public async Task<IReadOnlyList<ContactRelationshipDto>> GetRelationshipsAsync(Guid contactId, CancellationToken cancellationToken = default)
    {
        var relationships = new List<ContactRelationshipDto>();

        // Manager (reports to)
        var contact = await _dbContext.Contacts
            .Include(c => c.ReportsTo)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == contactId && !c.IsDeleted, cancellationToken);

        if (contact?.ReportsTo is not null && !contact.ReportsTo.IsDeleted)
        {
            relationships.Add(new ContactRelationshipDto(
                contact.ReportsTo.Id,
                $"{contact.ReportsTo.FirstName} {contact.ReportsTo.LastName}".Trim(),
                contact.ReportsTo.JobTitle,
                "Reports To"));
        }

        // Direct reports
        var directReports = await _dbContext.Contacts
            .AsNoTracking()
            .Where(c => c.ReportsToId == contactId && !c.IsDeleted)
            .Select(c => new { c.Id, FullName = (c.FirstName + " " + c.LastName).Trim(), c.JobTitle })
            .ToListAsync(cancellationToken);

        foreach (var dr in directReports)
        {
            relationships.Add(new ContactRelationshipDto(dr.Id, dr.FullName, dr.JobTitle, "Direct Report"));
        }

        // Same account contacts
        if (contact?.AccountId.HasValue == true)
        {
            var sameAccount = await _dbContext.Contacts
                .AsNoTracking()
                .Where(c => c.AccountId == contact.AccountId && c.Id != contactId && !c.IsDeleted)
                .Select(c => new { c.Id, FullName = (c.FirstName + " " + c.LastName).Trim(), c.JobTitle })
                .Take(10)
                .ToListAsync(cancellationToken);

            foreach (var sa in sameAccount.Where(s => relationships.All(r => r.Id != s.Id)))
            {
                relationships.Add(new ContactRelationshipDto(sa.Id, sa.FullName, sa.JobTitle, "Same Account"));
            }
        }

        return relationships;
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

    private static string? NormalizeBuyingRole(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return AllowedBuyingRoles.FirstOrDefault(role => role.Equals(value.Trim(), StringComparison.OrdinalIgnoreCase));
    }

    private static string? ValidateBuyingRole(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return AllowedBuyingRoles.Any(role => role.Equals(value.Trim(), StringComparison.OrdinalIgnoreCase))
            ? null
            : "Buying role is invalid.";
    }
}
