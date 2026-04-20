using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Customers;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Customers;

public sealed class CustomerService : ICustomerService
{
    private readonly CrmDbContext _dbContext;
    private readonly IVisibilityResolver _visibilityResolver;

    public CustomerService(CrmDbContext dbContext, IVisibilityResolver visibilityResolver)
    {
        _dbContext = dbContext;
        _visibilityResolver = visibilityResolver;
    }

    public async Task<CustomerSearchResultDto> SearchAsync(CustomerSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Accounts
            .AsNoTracking()
            .Where(a => !a.IsDeleted);

        // Visibility filtering: restrict results based on user's role hierarchy
        var visibility = await _visibilityResolver.ResolveAsync(request.CurrentUserId, cancellationToken);
        if (visibility.VisibleUserIds is not null)
        {
            query = query.Where(a => visibility.VisibleUserIds.Contains(a.OwnerId));
        }

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = $"%{request.Search.Trim()}%";
            query = query.Where(a =>
                EF.Functions.Like(a.Name, term) ||
                (!string.IsNullOrEmpty(a.Phone) && EF.Functions.Like(a.Phone, term)) ||
                a.Contacts.Any(c => !string.IsNullOrEmpty(c.Email) && EF.Functions.Like(c.Email, term)));
        }

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            query = query.Where(a => a.LifecycleStage == request.Status);
        }

        if (!string.IsNullOrWhiteSpace(request.Industry))
        {
            query = query.Where(a => a.Industry == request.Industry);
        }

        if (!string.IsNullOrWhiteSpace(request.Territory))
        {
            query = query.Where(a => a.Territory == request.Territory);
        }

        if (request.OwnerId.HasValue)
        {
            query = query.Where(a => a.OwnerId == request.OwnerId.Value);
        }

        if (request.CreatedFrom.HasValue)
        {
            query = query.Where(a => a.CreatedAtUtc >= request.CreatedFrom.Value);
        }

        if (request.CreatedTo.HasValue)
        {
            query = query.Where(a => a.CreatedAtUtc <= request.CreatedTo.Value);
        }

        if (request.MinRevenue.HasValue)
        {
            query = query.Where(a => a.AnnualRevenue >= request.MinRevenue.Value);
        }

        if (request.MaxRevenue.HasValue)
        {
            query = query.Where(a => a.AnnualRevenue <= request.MaxRevenue.Value);
        }

        var total = await query.CountAsync(cancellationToken);

        var sortedQuery = ApplySort(query, request.SortBy, request.SortDirection);

        var items = await sortedQuery
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
                a.ParentAccountId,
                ParentAccountName = a.ParentAccount != null ? a.ParentAccount.Name : null,
                a.CreatedAtUtc,
                a.Industry,
                a.Territory,
                a.ActivityScore,
                a.Website,
                a.AccountNumber,
                a.AnnualRevenue,
                a.NumberOfEmployees,
                a.AccountType,
                a.Rating,
                a.AccountSource
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
            return new CustomerListItemDto(
                i.Id,
                i.Name,
                i.Name,
                i.Email,
                i.Phone,
                i.Status,
                i.OwnerId,
                ownerName,
                i.ParentAccountId,
                i.ParentAccountName,
                i.CreatedAtUtc,
                i.Industry,
                i.Territory,
                i.ActivityScore,
                i.Website,
                i.AccountNumber,
                i.AnnualRevenue,
                i.NumberOfEmployees,
                i.AccountType,
                i.Rating,
                i.AccountSource);
        }).ToList();

        return new CustomerSearchResultDto(result, total);
    }

    public async Task<CustomerListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts
            .AsNoTracking()
            .Where(a => a.Id == id && !a.IsDeleted)
            .Select(a => new
            {
                a.Id,
                a.Name,
                Email = a.Contacts.Select(c => c.Email).FirstOrDefault(email => !string.IsNullOrEmpty(email)),
                a.Phone,
                Status = a.LifecycleStage ?? "Customer",
                a.OwnerId,
                a.ParentAccountId,
                ParentAccountName = a.ParentAccount != null ? a.ParentAccount.Name : null,
                a.CreatedAtUtc,
                a.Industry,
                a.Territory,
                a.ActivityScore,
                a.Website,
                a.AccountNumber,
                a.AnnualRevenue,
                a.NumberOfEmployees,
                a.AccountType,
                a.Rating,
                a.AccountSource
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (account is null)
        {
            return null;
        }

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == account.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        return new CustomerListItemDto(
            account.Id,
            account.Name,
            account.Name,
            account.Email,
            account.Phone,
            account.Status,
            account.OwnerId,
            ownerName,
            account.ParentAccountId,
            account.ParentAccountName,
            account.CreatedAtUtc,
            account.Industry,
            account.Territory,
            account.ActivityScore,
            account.Website,
            account.AccountNumber,
            account.AnnualRevenue,
            account.NumberOfEmployees,
            account.AccountType,
            account.Rating,
            account.AccountSource);
    }

    public async Task<CustomerDetailDto?> GetDetailAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts
            .Include(a => a.ParentAccount)
            .Include(a => a.TeamMembers)
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);

        if (account is null)
        {
            return null;
        }

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == account.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        var contactCount = await _dbContext.Contacts
            .CountAsync(c => c.AccountId == id && !c.IsDeleted, cancellationToken);
        var opportunityCount = await _dbContext.Opportunities
            .CountAsync(o => o.AccountId == id && !o.IsDeleted, cancellationToken);
        var leadCount = await _dbContext.Leads
            .CountAsync(l => l.AccountId == id && !l.IsDeleted, cancellationToken);
        var supportCaseCount = await _dbContext.SupportCases
            .CountAsync(s => s.AccountId == id && !s.IsDeleted, cancellationToken);

        // Related records for tree view
        var relContacts = await _dbContext.Contacts
            .Where(c => c.AccountId == id && !c.IsDeleted)
            .OrderBy(c => c.FirstName).ThenBy(c => c.LastName)
            .Select(c => new RelatedRecordItem(c.Id, c.FirstName + " " + c.LastName, c.JobTitle))
            .ToListAsync(cancellationToken);

        var relOpportunities = await _dbContext.Opportunities
            .Where(o => o.AccountId == id && !o.IsDeleted)
            .OrderByDescending(o => o.CreatedAtUtc)
            .Select(o => new RelatedRecordItem(o.Id, o.Name, o.Stage != null ? o.Stage.Name : null))
            .ToListAsync(cancellationToken);

        var relLeads = await _dbContext.Leads
            .Where(l => l.AccountId == id && !l.IsDeleted)
            .OrderByDescending(l => l.CreatedAtUtc)
            .Select(l => new RelatedRecordItem(l.Id, l.FirstName + " " + l.LastName, l.Status != null ? l.Status.Name : null))
            .ToListAsync(cancellationToken);

        var relCases = await _dbContext.SupportCases
            .Where(s => s.AccountId == id && !s.IsDeleted)
            .OrderByDescending(s => s.CreatedAtUtc)
            .Select(s => new RelatedRecordItem(s.Id, s.CaseNumber + " – " + s.Subject, s.Status))
            .ToListAsync(cancellationToken);

        var relatedRecords = new AccountRelatedRecordsDto(relContacts, relOpportunities, relLeads, relCases);

        // #12 Revenue rollup
        var openPipelineValue = await _dbContext.Opportunities
            .Where(o => o.AccountId == id && !o.IsDeleted && !o.IsClosed)
            .SumAsync(o => o.Amount, cancellationToken);
        var closedWonRevenue = await _dbContext.Opportunities
            .Where(o => o.AccountId == id && !o.IsDeleted && o.IsClosed && o.IsWon)
            .SumAsync(o => o.Amount, cancellationToken);
        var weightedForecast = await _dbContext.Opportunities
            .Where(o => o.AccountId == id && !o.IsDeleted && !o.IsClosed)
            .SumAsync(o => o.Amount * o.Probability / 100m, cancellationToken);

        // #14 Nearest opportunity renewal
        var nearestOpportunityRenewal = await _dbContext.Opportunities
            .Where(o => o.AccountId == id && !o.IsDeleted && !o.IsClosed && o.ContractEndDateUtc != null && o.ContractEndDateUtc > DateTime.UtcNow)
            .OrderBy(o => o.ContractEndDateUtc)
            .Select(o => o.ContractEndDateUtc)
            .FirstOrDefaultAsync(cancellationToken);

        var teamMemberUserIds = account.TeamMembers
            .Where(m => !m.IsDeleted)
            .Select(m => m.UserId)
            .ToList();
        var teamUsers = teamMemberUserIds.Count > 0
            ? await _dbContext.Users
                .Where(u => teamMemberUserIds.Contains(u.Id))
                .Select(u => new { u.Id, u.FullName })
                .ToListAsync(cancellationToken)
            : [];

        var teamDtos = account.TeamMembers
            .Where(m => !m.IsDeleted)
            .Select(m => new AccountTeamMemberDto(
                m.Id,
                m.UserId,
                teamUsers.FirstOrDefault(u => u.Id == m.UserId)?.FullName ?? "Unknown",
                m.Role,
                m.CreatedAtUtc))
            .ToList();

        return new CustomerDetailDto(
            account.Id,
            account.Name,
            account.AccountNumber,
            account.Industry,
            account.Website,
            account.Phone,
            account.LifecycleStage ?? "Customer",
            account.OwnerId,
            ownerName,
            account.ParentAccountId,
            account.ParentAccount?.Name,
            account.Territory,
            account.Description,
            account.ActivityScore,
            account.HealthScore,
            account.LastActivityAtUtc,
            account.LastViewedAtUtc,
            account.CreatedAtUtc,
            account.UpdatedAtUtc,
            account.AnnualRevenue,
            account.NumberOfEmployees,
            account.AccountType,
            account.Rating,
            account.AccountSource,
            account.BillingStreet,
            account.BillingCity,
            account.BillingState,
            account.BillingPostalCode,
            account.BillingCountry,
            account.ShippingStreet,
            account.ShippingCity,
            account.ShippingState,
            account.ShippingPostalCode,
            account.ShippingCountry,
            contactCount,
            opportunityCount,
            leadCount,
            supportCaseCount,
            teamDtos,
            account.RenewalDateUtc,
            account.ContractEndDateUtc,
            nearestOpportunityRenewal,
            openPipelineValue,
            closedWonRevenue,
            weightedForecast,
            relatedRecords);
    }

    public async Task<IReadOnlyList<AccountTeamMemberDto>> GetTeamMembersAsync(Guid accountId, CancellationToken cancellationToken = default)
    {
        var members = await _dbContext.Set<AccountTeamMember>()
            .Where(m => m.AccountId == accountId && !m.IsDeleted)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        if (members.Count == 0) return [];

        var userIds = members.Select(m => m.UserId).Distinct().ToList();
        var users = await _dbContext.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        return members.Select(m => new AccountTeamMemberDto(
            m.Id,
            m.UserId,
            users.FirstOrDefault(u => u.Id == m.UserId)?.FullName ?? "Unknown",
            m.Role,
            m.CreatedAtUtc)).ToList();
    }

    public async Task<CustomerOperationResult<AccountTeamMemberDto>> AddTeamMemberAsync(Guid accountId, Guid userId, string role, CancellationToken cancellationToken = default)
    {
        var accountExists = await _dbContext.Accounts.AnyAsync(a => a.Id == accountId && !a.IsDeleted, cancellationToken);
        if (!accountExists)
            return CustomerOperationResult<AccountTeamMemberDto>.NotFoundResult();

        var userExists = await _dbContext.Users.AnyAsync(u => u.Id == userId && !u.IsDeleted, cancellationToken);
        if (!userExists)
            return CustomerOperationResult<AccountTeamMemberDto>.Fail("User not found.");

        var duplicate = await _dbContext.Set<AccountTeamMember>()
            .AnyAsync(m => m.AccountId == accountId && m.UserId == userId && !m.IsDeleted, cancellationToken);
        if (duplicate)
            return CustomerOperationResult<AccountTeamMemberDto>.Fail("User is already a team member on this account.");

        var member = new AccountTeamMember
        {
            AccountId = accountId,
            UserId = userId,
            Role = role,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Set<AccountTeamMember>().Add(member);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var userName = await _dbContext.Users
            .Where(u => u.Id == userId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unknown";

        return CustomerOperationResult<AccountTeamMemberDto>.Ok(
            new AccountTeamMemberDto(member.Id, member.UserId, userName, member.Role, member.CreatedAtUtc));
    }

    public async Task<CustomerOperationResult<bool>> RemoveTeamMemberAsync(Guid accountId, Guid memberId, CancellationToken cancellationToken = default)
    {
        var member = await _dbContext.Set<AccountTeamMember>()
            .FirstOrDefaultAsync(m => m.Id == memberId && m.AccountId == accountId && !m.IsDeleted, cancellationToken);
        if (member is null)
            return CustomerOperationResult<bool>.NotFoundResult();

        member.IsDeleted = true;
        member.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return CustomerOperationResult<bool>.Ok(true);
    }

    public async Task<CustomerOperationResult<CustomerListItemDto>> CreateAsync(CustomerUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var ownerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        if (!await OwnerExistsAsync(ownerId, cancellationToken))
        {
            return CustomerOperationResult<CustomerListItemDto>.Fail("Owner is required for accounts.");
        }

        var duplicateMatch = await AccountMatching.FindBestMatchAsync(
            _dbContext,
            request.Name,
            request.AccountNumber,
            request.Website,
            request.Phone,
            excludeAccountId: null,
            cancellationToken);
        if (duplicateMatch is not null)
        {
            return CustomerOperationResult<CustomerListItemDto>.Fail(
                $"Duplicate customer detected. Existing account: {duplicateMatch.Name} [{duplicateMatch.Id}].");
        }

        if (request.ParentAccountId.HasValue && request.ParentAccountId.Value != Guid.Empty)
        {
            var parentError = await ValidateParentAccountAsync(null, request.ParentAccountId.Value, cancellationToken);
            if (parentError is not null)
            {
                return CustomerOperationResult<CustomerListItemDto>.Fail(parentError);
            }
        }

        var account = new Account
        {
            Name = request.Name,
            AccountNumber = request.AccountNumber,
            Industry = request.Industry,
            Website = request.Website,
            Phone = request.Phone,
            LifecycleStage = request.LifecycleStage,
            OwnerId = ownerId,
            ParentAccountId = request.ParentAccountId,
            Territory = request.Territory,
            Description = request.Description,
            AnnualRevenue = request.AnnualRevenue,
            NumberOfEmployees = request.NumberOfEmployees,
            AccountType = request.AccountType,
            Rating = request.Rating,
            AccountSource = request.AccountSource,
            BillingStreet = request.BillingStreet,
            BillingCity = request.BillingCity,
            BillingState = request.BillingState,
            BillingPostalCode = request.BillingPostalCode,
            BillingCountry = request.BillingCountry,
            ShippingStreet = request.ShippingStreet,
            ShippingCity = request.ShippingCity,
            ShippingState = request.ShippingState,
            ShippingPostalCode = request.ShippingPostalCode,
            ShippingCountry = request.ShippingCountry,
            RenewalDateUtc = request.RenewalDateUtc,
            ContractEndDateUtc = request.ContractEndDateUtc,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Accounts.Add(account);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == ownerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        var dto = new CustomerListItemDto(
            account.Id,
            account.Name,
            account.Name,
            null,
            account.Phone,
            account.LifecycleStage ?? "Customer",
            account.OwnerId,
            ownerName,
            account.ParentAccountId,
            account.ParentAccountId.HasValue
                ? await _dbContext.Accounts.Where(a => a.Id == account.ParentAccountId.Value).Select(a => a.Name).FirstOrDefaultAsync(cancellationToken)
                : null,
            account.CreatedAtUtc);

        return CustomerOperationResult<CustomerListItemDto>.Ok(dto);
    }

    public async Task<CustomerOperationResult<bool>> UpdateAsync(Guid id, CustomerUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (account is null)
        {
            return CustomerOperationResult<bool>.NotFoundResult();
        }

        var ownerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        if (!await OwnerExistsAsync(ownerId, cancellationToken))
        {
            return CustomerOperationResult<bool>.Fail("Owner is required for accounts.");
        }

        var duplicateMatch = await AccountMatching.FindBestMatchAsync(
            _dbContext,
            request.Name,
            request.AccountNumber,
            request.Website,
            request.Phone,
            excludeAccountId: id,
            cancellationToken);
        if (duplicateMatch is not null)
        {
            return CustomerOperationResult<bool>.Fail(
                $"Duplicate customer detected. Existing account: {duplicateMatch.Name} [{duplicateMatch.Id}].");
        }

        if (request.ParentAccountId.HasValue && request.ParentAccountId.Value != Guid.Empty)
        {
            var parentError = await ValidateParentAccountAsync(id, request.ParentAccountId.Value, cancellationToken);
            if (parentError is not null)
            {
                return CustomerOperationResult<bool>.Fail(parentError);
            }
        }

        account.Name = request.Name;
        account.AccountNumber = request.AccountNumber;
        account.Industry = request.Industry;
        account.Website = request.Website;
        account.Phone = request.Phone;
        account.LifecycleStage = request.LifecycleStage;
        account.OwnerId = ownerId;
        account.ParentAccountId = request.ParentAccountId;
        account.Territory = request.Territory;
        account.Description = request.Description;
        account.AnnualRevenue = request.AnnualRevenue;
        account.NumberOfEmployees = request.NumberOfEmployees;
        account.AccountType = request.AccountType;
        account.Rating = request.Rating;
        account.AccountSource = request.AccountSource;
        account.BillingStreet = request.BillingStreet;
        account.BillingCity = request.BillingCity;
        account.BillingState = request.BillingState;
        account.BillingPostalCode = request.BillingPostalCode;
        account.BillingCountry = request.BillingCountry;
        account.ShippingStreet = request.ShippingStreet;
        account.ShippingCity = request.ShippingCity;
        account.ShippingState = request.ShippingState;
        account.ShippingPostalCode = request.ShippingPostalCode;
        account.ShippingCountry = request.ShippingCountry;
        account.RenewalDateUtc = request.RenewalDateUtc;
        account.ContractEndDateUtc = request.ContractEndDateUtc;
        account.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return CustomerOperationResult<bool>.Ok(true);
    }

    public async Task<CustomerOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (account is null)
        {
            return CustomerOperationResult<bool>.NotFoundResult();
        }

        account.IsDeleted = true;
        account.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return CustomerOperationResult<bool>.Ok(true);
    }

    public async Task<CustomerOperationResult<bool>> UpdateOwnerAsync(Guid id, Guid ownerId, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (account is null)
        {
            return CustomerOperationResult<bool>.NotFoundResult();
        }

        account.OwnerId = await ResolveOwnerIdAsync(ownerId, actor, cancellationToken);
        account.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return CustomerOperationResult<bool>.Ok(true);
    }

    public async Task<CustomerOperationResult<bool>> UpdateLifecycleAsync(Guid id, string lifecycle, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (account is null)
        {
            return CustomerOperationResult<bool>.NotFoundResult();
        }

        account.LifecycleStage = lifecycle;
        account.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return CustomerOperationResult<bool>.Ok(true);
    }

    public async Task<CustomerOperationResult<int>> BulkAssignOwnerAsync(IReadOnlyCollection<Guid> ids, Guid ownerId, CancellationToken cancellationToken = default)
    {
        var ownerExists = await _dbContext.Users
            .AnyAsync(u => u.Id == ownerId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (!ownerExists)
        {
            return CustomerOperationResult<int>.Fail("Owner not found.");
        }

        var accounts = await _dbContext.Accounts
            .Where(a => ids.Contains(a.Id) && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var account in accounts)
        {
            account.OwnerId = ownerId;
            account.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return CustomerOperationResult<int>.Ok(accounts.Count);
    }

    public async Task<CustomerOperationResult<int>> BulkUpdateLifecycleAsync(IReadOnlyCollection<Guid> ids, string lifecycle, CancellationToken cancellationToken = default)
    {
        var accounts = await _dbContext.Accounts
            .Where(a => ids.Contains(a.Id) && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var account in accounts)
        {
            account.LifecycleStage = lifecycle;
            account.UpdatedAtUtc = DateTime.UtcNow;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return CustomerOperationResult<int>.Ok(accounts.Count);
    }

    public async Task<IReadOnlyList<CustomerListItemDto>> GetRelatedAccountsAsync(Guid accountId, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == accountId && !a.IsDeleted, cancellationToken);

        if (account is null)
        {
            return Array.Empty<CustomerListItemDto>();
        }

        var relatedIds = new HashSet<Guid>();

        if (account.ParentAccountId.HasValue)
        {
            relatedIds.Add(account.ParentAccountId.Value);
        }

        var childIds = await _dbContext.Accounts
            .AsNoTracking()
            .Where(a => a.ParentAccountId == accountId && !a.IsDeleted)
            .Select(a => a.Id)
            .ToListAsync(cancellationToken);

        foreach (var id in childIds)
        {
            relatedIds.Add(id);
        }

        if (account.ParentAccountId.HasValue)
        {
            var siblingIds = await _dbContext.Accounts
                .AsNoTracking()
                .Where(a => a.ParentAccountId == account.ParentAccountId && a.Id != accountId && !a.IsDeleted)
                .Select(a => a.Id)
                .ToListAsync(cancellationToken);

            foreach (var id in siblingIds)
            {
                relatedIds.Add(id);
            }
        }

        if (relatedIds.Count == 0)
        {
            return Array.Empty<CustomerListItemDto>();
        }

        var relatedAccounts = await _dbContext.Accounts
            .Include(a => a.Contacts)
            .Include(a => a.ParentAccount)
            .AsNoTracking()
            .Where(a => relatedIds.Contains(a.Id) && !a.IsDeleted)
            .Select(a => new
            {
                a.Id,
                a.Name,
                Email = a.Contacts.Select(c => c.Email).FirstOrDefault(email => !string.IsNullOrEmpty(email)),
                a.Phone,
                Status = a.LifecycleStage ?? "Customer",
                a.OwnerId,
                a.ParentAccountId,
                ParentAccountName = a.ParentAccount != null ? a.ParentAccount.Name : null,
                a.CreatedAtUtc,
                a.Industry,
                a.Territory,
                a.ActivityScore,
                a.Website,
                a.AccountNumber,
                a.AnnualRevenue,
                a.NumberOfEmployees,
                a.AccountType,
                a.Rating,
                a.AccountSource
            })
            .ToListAsync(cancellationToken);

        var ownerIds = relatedAccounts.Select(i => i.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        return relatedAccounts.Select(i =>
        {
            var ownerName = owners.FirstOrDefault(o => o.Id == i.OwnerId)?.FullName ?? "Unassigned";
            return new CustomerListItemDto(
                i.Id,
                i.Name,
                i.Name,
                i.Email,
                i.Phone,
                i.Status,
                i.OwnerId,
                ownerName,
                i.ParentAccountId,
                i.ParentAccountName,
                i.CreatedAtUtc,
                i.Industry,
                i.Territory,
                i.ActivityScore,
                i.Website,
                i.AccountNumber,
                i.AnnualRevenue,
                i.NumberOfEmployees,
                i.AccountType,
                i.Rating,
                i.AccountSource);
        }).ToList();
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, ActorContext actor, CancellationToken cancellationToken)
    {
        if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
        {
            var exists = await _dbContext.Users.AnyAsync(u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted, cancellationToken);
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

    private async Task<bool> OwnerExistsAsync(Guid ownerId, CancellationToken cancellationToken)
    {
        if (ownerId == Guid.Empty)
        {
            return false;
        }

        return await _dbContext.Users.AnyAsync(
            u => u.Id == ownerId && u.IsActive && !u.IsDeleted,
            cancellationToken);
    }

    private async Task<string?> ValidateParentAccountAsync(Guid? accountId, Guid parentAccountId, CancellationToken cancellationToken)
    {
        if (parentAccountId == Guid.Empty)
        {
            return null;
        }

        if (accountId.HasValue && accountId.Value == parentAccountId)
        {
            return "Parent account cannot be the same as the account.";
        }

        var parentExists = await _dbContext.Accounts
            .AnyAsync(a => a.Id == parentAccountId && !a.IsDeleted, cancellationToken);
        if (!parentExists)
        {
            return "Parent account was not found.";
        }

        if (!accountId.HasValue)
        {
            return null;
        }

        var visited = new HashSet<Guid> { accountId.Value };
        var current = parentAccountId;
        while (current != Guid.Empty)
        {
            if (!visited.Add(current))
            {
                return "Parent account selection creates a cycle.";
            }

            var next = await _dbContext.Accounts
                .Where(a => a.Id == current && !a.IsDeleted)
                .Select(a => a.ParentAccountId)
                .FirstOrDefaultAsync(cancellationToken);

            if (!next.HasValue)
            {
                break;
            }

            current = next.Value;
        }

        return null;
    }

    private static IOrderedQueryable<Account> ApplySort(IQueryable<Account> query, string? sortBy, string? sortDirection)
    {
        var descending = string.Equals(sortDirection, "desc", StringComparison.OrdinalIgnoreCase);

        return sortBy?.ToLowerInvariant() switch
        {
            "createdat" or "createdatutc" => descending ? query.OrderByDescending(a => a.CreatedAtUtc) : query.OrderBy(a => a.CreatedAtUtc),
            "industry" => descending ? query.OrderByDescending(a => a.Industry) : query.OrderBy(a => a.Industry),
            "status" or "lifecyclestage" => descending ? query.OrderByDescending(a => a.LifecycleStage) : query.OrderBy(a => a.LifecycleStage),
            "annualrevenue" => descending ? query.OrderByDescending(a => a.AnnualRevenue) : query.OrderBy(a => a.AnnualRevenue),
            "numberofemployees" => descending ? query.OrderByDescending(a => a.NumberOfEmployees) : query.OrderBy(a => a.NumberOfEmployees),
            "rating" => descending ? query.OrderByDescending(a => a.Rating) : query.OrderBy(a => a.Rating),
            "activityscore" => descending ? query.OrderByDescending(a => a.ActivityScore) : query.OrderBy(a => a.ActivityScore),
            "healthscore" => descending ? query.OrderByDescending(a => a.HealthScore) : query.OrderBy(a => a.HealthScore),
            _ => descending ? query.OrderByDescending(a => a.Name) : query.OrderBy(a => a.Name),
        };
    }

    public async Task<DuplicateCheckResult> CheckDuplicateAsync(
        string? name, string? accountNumber, string? website, string? phone,
        Guid? excludeId = null, CancellationToken cancellationToken = default)
    {
        var match = await AccountMatching.FindBestMatchAsync(
            _dbContext, name, accountNumber, website, phone, excludeId, cancellationToken);

        return match is null
            ? new DuplicateCheckResult(false)
            : new DuplicateCheckResult(true, match.Id, match.Name);
    }

    // ════════════════════════════════════════════════════════════════
    // #11 — Account merge
    // ════════════════════════════════════════════════════════════════

    public async Task<IReadOnlyList<DuplicateMatchDto>> FindDuplicatesAsync(Guid accountId, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == accountId && !a.IsDeleted, cancellationToken);

        if (account is null)
            return [];

        var matches = await AccountMatching.FindAllMatchesAsync(
            _dbContext, account.Name, account.AccountNumber, account.Website, account.Phone,
            accountId, cancellationToken);

        return matches.Select(m => new DuplicateMatchDto(m.Id, m.Name, m.AccountNumber, m.Website, m.Phone, m.Score)).ToList();
    }

    public async Task<MergeAccountResult> MergeAccountsAsync(Guid survivorId, Guid duplicateId, CancellationToken cancellationToken = default)
    {
        if (survivorId == duplicateId)
            return new MergeAccountResult(false, survivorId, 0, 0, 0, 0, "Cannot merge an account into itself.");

        var survivor = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == survivorId && !a.IsDeleted, cancellationToken);
        var duplicate = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == duplicateId && !a.IsDeleted, cancellationToken);

        if (survivor is null || duplicate is null)
            return new MergeAccountResult(false, survivorId, 0, 0, 0, 0, "One or both accounts not found.");

        // Move contacts
        var contacts = await _dbContext.Contacts.Where(c => c.AccountId == duplicateId && !c.IsDeleted).ToListAsync(cancellationToken);
        foreach (var c in contacts) c.AccountId = survivorId;

        // Move opportunities
        var opportunities = await _dbContext.Opportunities.Where(o => o.AccountId == duplicateId && !o.IsDeleted).ToListAsync(cancellationToken);
        foreach (var o in opportunities) o.AccountId = survivorId;

        // Move leads
        var leads = await _dbContext.Leads.Where(l => l.AccountId == duplicateId && !l.IsDeleted).ToListAsync(cancellationToken);
        foreach (var l in leads) l.AccountId = survivorId;

        // Move support cases
        var cases = await _dbContext.SupportCases.Where(s => s.AccountId == duplicateId && !s.IsDeleted).ToListAsync(cancellationToken);
        foreach (var s in cases) s.AccountId = survivorId;

        // Move child accounts
        var childAccounts = await _dbContext.Accounts.Where(a => a.ParentAccountId == duplicateId && !a.IsDeleted).ToListAsync(cancellationToken);
        foreach (var child in childAccounts) child.ParentAccountId = survivorId;

        // Move team members (skip if already on survivor)
        var existingSurvivorMembers = await _dbContext.Set<AccountTeamMember>()
            .Where(m => m.AccountId == survivorId && !m.IsDeleted)
            .Select(m => m.UserId)
            .ToListAsync(cancellationToken);
        var duplicateMembers = await _dbContext.Set<AccountTeamMember>()
            .Where(m => m.AccountId == duplicateId && !m.IsDeleted)
            .ToListAsync(cancellationToken);
        foreach (var m in duplicateMembers)
        {
            if (!existingSurvivorMembers.Contains(m.UserId))
                m.AccountId = survivorId;
            else
                m.IsDeleted = true;
        }

        // Fill empty survivor fields from duplicate
        survivor.AccountNumber ??= duplicate.AccountNumber;
        survivor.Industry ??= duplicate.Industry;
        survivor.Website ??= duplicate.Website;
        survivor.Phone ??= duplicate.Phone;
        survivor.Territory ??= duplicate.Territory;
        survivor.Description ??= duplicate.Description;
        survivor.AnnualRevenue ??= duplicate.AnnualRevenue;
        survivor.NumberOfEmployees ??= duplicate.NumberOfEmployees;
        survivor.AccountType ??= duplicate.AccountType;
        survivor.Rating ??= duplicate.Rating;
        survivor.AccountSource ??= duplicate.AccountSource;
        survivor.BillingStreet ??= duplicate.BillingStreet;
        survivor.BillingCity ??= duplicate.BillingCity;
        survivor.BillingState ??= duplicate.BillingState;
        survivor.BillingPostalCode ??= duplicate.BillingPostalCode;
        survivor.BillingCountry ??= duplicate.BillingCountry;
        survivor.ShippingStreet ??= duplicate.ShippingStreet;
        survivor.ShippingCity ??= duplicate.ShippingCity;
        survivor.ShippingState ??= duplicate.ShippingState;
        survivor.ShippingPostalCode ??= duplicate.ShippingPostalCode;
        survivor.ShippingCountry ??= duplicate.ShippingCountry;
        survivor.RenewalDateUtc ??= duplicate.RenewalDateUtc;
        survivor.ContractEndDateUtc ??= duplicate.ContractEndDateUtc;

        // Soft-delete the duplicate
        duplicate.IsDeleted = true;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return new MergeAccountResult(true, survivorId, contacts.Count, opportunities.Count, leads.Count, cases.Count);
    }

    // ════════════════════════════════════════════════════════════════
    // #13 — Account hierarchy
    // ════════════════════════════════════════════════════════════════

    public async Task<AccountHierarchyNodeDto?> GetAccountHierarchyAsync(Guid accountId, CancellationToken cancellationToken = default)
    {
        // Find the root of the hierarchy
        var rootId = await FindHierarchyRootAsync(accountId, cancellationToken);
        if (rootId is null)
            return null;

        // Load all accounts in the hierarchy tree
        var allAccounts = await _dbContext.Accounts
            .AsNoTracking()
            .Where(a => !a.IsDeleted)
            .Select(a => new { a.Id, a.Name, a.Industry, a.LifecycleStage, a.OwnerId, a.ParentAccountId })
            .ToListAsync(cancellationToken);

        var ownerIds = allAccounts.Select(a => a.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);
        var ownerMap = owners.ToDictionary(o => o.Id, o => o.FullName);

        var lookup = allAccounts.ToLookup(a => a.ParentAccountId);

        AccountHierarchyNodeDto BuildNode(Guid id, int depth)
        {
            var acc = allAccounts.First(a => a.Id == id);
            var children = lookup[id]
                .Where(c => c.Id != id)
                .Select(c => BuildNode(c.Id, depth + 1))
                .ToList();
            return new AccountHierarchyNodeDto(
                acc.Id, acc.Name, acc.Industry, acc.LifecycleStage, acc.OwnerId,
                ownerMap.GetValueOrDefault(acc.OwnerId, "Unassigned"),
                depth, children);
        }

        return BuildNode(rootId.Value, 0);
    }

    private async Task<Guid?> FindHierarchyRootAsync(Guid accountId, CancellationToken cancellationToken)
    {
        var currentId = accountId;
        var visited = new HashSet<Guid>();

        while (true)
        {
            if (!visited.Add(currentId))
                return currentId; // cycle guard

            var parentId = await _dbContext.Accounts
                .AsNoTracking()
                .Where(a => a.Id == currentId && !a.IsDeleted)
                .Select(a => a.ParentAccountId)
                .FirstOrDefaultAsync(cancellationToken);

            if (parentId is null)
                return currentId;

            currentId = parentId.Value;
        }
    }

    // ════════════════════════════════════════════════════════════════
    // #15 — Communication history / timeline
    // ════════════════════════════════════════════════════════════════

    public async Task<IReadOnlyList<AccountTimelineEntryDto>> GetAccountTimelineAsync(Guid accountId, int take = 50, CancellationToken cancellationToken = default)
    {
        take = Math.Clamp(take, 1, 200);

        // Activities linked to this account
        var activities = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                && a.RelatedEntityType == Domain.Enums.ActivityRelationType.Account
                && a.RelatedEntityId == accountId)
            .OrderByDescending(a => a.CreatedAtUtc)
            .Take(take)
            .Select(a => new { a.Id, a.Type, a.Subject, a.Description, a.Outcome, a.CreatedAtUtc, a.OwnerId })
            .ToListAsync(cancellationToken);

        // CRM email links to this account
        var emailLinks = await _dbContext.CrmEmailLinks
            .AsNoTracking()
            .Where(e => !e.IsDeleted
                && e.RelatedEntityType == Domain.Enums.ActivityRelationType.Account
                && e.RelatedEntityId == accountId)
            .OrderByDescending(e => e.ReceivedAtUtc)
            .Take(take)
            .Select(e => new { e.Id, e.Subject, e.FromEmail, e.FromName, e.ReceivedAtUtc })
            .ToListAsync(cancellationToken);

        // Outbound emails to this account
        var emailLogs = await _dbContext.EmailLogs
            .AsNoTracking()
            .Where(e => !e.IsDeleted
                && e.RelatedEntityType == Domain.Entities.EmailRelationType.Customer
                && e.RelatedEntityId == accountId)
            .OrderByDescending(e => e.CreatedAtUtc)
            .Take(take)
            .Select(e => new { e.Id, e.Subject, e.ToEmail, e.SentAtUtc, e.CreatedAtUtc, e.SenderId })
            .ToListAsync(cancellationToken);

        // Resolve owner names
        var ownerIds = activities.Select(a => a.OwnerId)
            .Union(emailLogs.Select(e => e.SenderId))
            .Distinct()
            .ToList();
        var owners = ownerIds.Count > 0
            ? await _dbContext.Users
                .Where(u => ownerIds.Contains(u.Id))
                .Select(u => new { u.Id, u.FullName })
                .ToListAsync(cancellationToken)
            : [];
        var ownerMap = owners.ToDictionary(o => o.Id, o => o.FullName);

        var timeline = new List<AccountTimelineEntryDto>();

        foreach (var a in activities)
        {
            timeline.Add(new AccountTimelineEntryDto(
                a.Id,
                a.Type.ToString(),
                a.Subject,
                a.Description,
                a.Outcome,
                a.CreatedAtUtc,
                ownerMap.GetValueOrDefault(a.OwnerId),
                null,
                null));
        }

        foreach (var e in emailLinks)
        {
            timeline.Add(new AccountTimelineEntryDto(
                e.Id,
                "InboundEmail",
                e.Subject,
                null,
                null,
                e.ReceivedAtUtc,
                e.FromName,
                e.FromEmail,
                "Inbound"));
        }

        foreach (var e in emailLogs)
        {
            timeline.Add(new AccountTimelineEntryDto(
                e.Id,
                "OutboundEmail",
                e.Subject,
                null,
                null,
                e.SentAtUtc ?? e.CreatedAtUtc,
                ownerMap.GetValueOrDefault(e.SenderId),
                e.ToEmail,
                "Outbound"));
        }

        return timeline.OrderByDescending(t => t.OccurredAtUtc).Take(take).ToList();
    }

    // ── Related Records (tree view) ──────────────────────────────────

    public async Task<AccountRelatedRecordsDto?> GetRelatedRecordsAsync(
        Guid accountId, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Set<Account>()
            .AsNoTracking()
            .AnyAsync(a => a.Id == accountId && !a.IsDeleted, cancellationToken);

        if (!exists) return null;

        var contacts = await _dbContext.Contacts
            .Where(c => c.AccountId == accountId && !c.IsDeleted)
            .OrderBy(c => c.FirstName).ThenBy(c => c.LastName)
            .Select(c => new RelatedRecordItem(c.Id, c.FirstName + " " + c.LastName, c.JobTitle))
            .ToListAsync(cancellationToken);

        var opportunities = await _dbContext.Opportunities
            .Where(o => o.AccountId == accountId && !o.IsDeleted)
            .Include(o => o.Stage)
            .OrderByDescending(o => o.CreatedAtUtc)
            .Select(o => new RelatedRecordItem(o.Id, o.Name, o.Stage != null ? o.Stage.Name : null))
            .ToListAsync(cancellationToken);

        var leads = await _dbContext.Leads
            .Where(l => l.AccountId == accountId && !l.IsDeleted)
            .Include(l => l.Status)
            .OrderByDescending(l => l.CreatedAtUtc)
            .Select(l => new RelatedRecordItem(l.Id, l.FirstName + " " + l.LastName, l.Status != null ? l.Status.Name : null))
            .ToListAsync(cancellationToken);

        var supportCases = await _dbContext.SupportCases
            .Where(s => s.AccountId == accountId && !s.IsDeleted)
            .OrderByDescending(s => s.CreatedAtUtc)
            .Select(s => new RelatedRecordItem(s.Id, s.CaseNumber + " – " + s.Subject, s.Status))
            .ToListAsync(cancellationToken);

        return new AccountRelatedRecordsDto(contacts, opportunities, leads, supportCases);
    }

    // ── Account Contact Roles ─────────────────────────────────────────

    public async Task<IReadOnlyList<AccountContactRoleDto>?> GetContactRolesAsync(
        Guid accountId, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Set<Account>()
            .AsNoTracking()
            .AnyAsync(a => a.Id == accountId && !a.IsDeleted, cancellationToken);
        if (!exists) return null;

        var roles = await _dbContext.AccountContactRoles
            .AsNoTracking()
            .Where(r => r.AccountId == accountId && !r.IsDeleted)
            .Join(_dbContext.Contacts,
                role => role.ContactId,
                contact => contact.Id,
                (role, contact) => new AccountContactRoleDto(
                    role.Id,
                    role.ContactId,
                    (contact.FirstName + " " + contact.LastName).Trim(),
                    contact.Email,
                    contact.JobTitle,
                    role.Role,
                    role.Notes,
                    role.IsPrimary,
                    role.CreatedAtUtc,
                    role.UpdatedAtUtc))
            .OrderByDescending(r => r.IsPrimary)
            .ThenBy(r => r.ContactName)
            .ToListAsync(cancellationToken);

        return roles;
    }

    public async Task<CustomerOperationResult<AccountContactRoleDto>> AddContactRoleAsync(
        Guid accountId,
        AddAccountContactRoleRequest request,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Set<Account>()
            .FirstOrDefaultAsync(a => a.Id == accountId && !a.IsDeleted, cancellationToken);
        if (account is null)
            return CustomerOperationResult<AccountContactRoleDto>.NotFoundResult();

        if (string.IsNullOrWhiteSpace(request.Role))
            return CustomerOperationResult<AccountContactRoleDto>.Fail("Contact role is required.");

        var contact = await _dbContext.Contacts
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == request.ContactId && !c.IsDeleted, cancellationToken);
        if (contact is null)
            return CustomerOperationResult<AccountContactRoleDto>.Fail("Contact not found.");

        var duplicate = await _dbContext.AccountContactRoles
            .AnyAsync(r => r.AccountId == accountId && r.ContactId == request.ContactId && !r.IsDeleted, cancellationToken);
        if (duplicate)
            return CustomerOperationResult<AccountContactRoleDto>.Fail("This contact is already assigned to this account.");

        var now = DateTime.UtcNow;
        var entity = new AccountContactRole
        {
            AccountId = accountId,
            ContactId = request.ContactId,
            Role = request.Role.Trim(),
            Notes = request.Notes?.Trim(),
            IsPrimary = request.IsPrimary,
            TenantId = account.TenantId,
            CreatedAtUtc = now,
            CreatedBy = actor.UserName
        };

        _dbContext.AccountContactRoles.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = new AccountContactRoleDto(
            entity.Id,
            entity.ContactId,
            (contact.FirstName + " " + contact.LastName).Trim(),
            contact.Email,
            contact.JobTitle,
            entity.Role,
            entity.Notes,
            entity.IsPrimary,
            entity.CreatedAtUtc,
            entity.UpdatedAtUtc);

        return CustomerOperationResult<AccountContactRoleDto>.Ok(dto);
    }

    public async Task<CustomerOperationResult<bool>> RemoveContactRoleAsync(
        Guid accountId,
        Guid contactRoleId,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var accountExists = await _dbContext.Set<Account>()
            .AsNoTracking()
            .AnyAsync(a => a.Id == accountId && !a.IsDeleted, cancellationToken);
        if (!accountExists)
            return CustomerOperationResult<bool>.NotFoundResult();

        var role = await _dbContext.AccountContactRoles
            .FirstOrDefaultAsync(r => r.Id == contactRoleId && r.AccountId == accountId && !r.IsDeleted, cancellationToken);
        if (role is null)
            return CustomerOperationResult<bool>.NotFoundResult();

        role.IsDeleted = true;
        role.DeletedAtUtc = DateTime.UtcNow;
        role.DeletedBy = actor.UserName;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return CustomerOperationResult<bool>.Ok(true);
    }
}
