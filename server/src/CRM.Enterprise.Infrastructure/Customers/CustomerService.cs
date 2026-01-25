using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Customers;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Customers;

public sealed class CustomerService : ICustomerService
{
    private readonly CrmDbContext _dbContext;

    public CustomerService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<CustomerSearchResultDto> SearchAsync(CustomerSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Accounts
            .Include(a => a.Contacts)
            .AsNoTracking()
            .Where(a => !a.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(a =>
                a.Name.ToLower().Contains(term) ||
                (a.Phone ?? string.Empty).ToLower().Contains(term) ||
                a.Contacts.Any(c => (c.Email ?? string.Empty).ToLower().Contains(term)));
        }

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            query = query.Where(a => a.LifecycleStage == request.Status);
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
            return new CustomerListItemDto(i.Id, i.Name, i.Name, i.Email, i.Phone, i.Status, i.OwnerId, ownerName, i.CreatedAtUtc);
        }).ToList();

        return new CustomerSearchResultDto(result, total);
    }

    public async Task<CustomerListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts
            .Include(a => a.Contacts)
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);

        if (account is null)
        {
            return null;
        }

        account.LastViewedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == account.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        return new CustomerListItemDto(
            account.Id,
            account.Name,
            account.Name,
            account.Contacts.Select(c => c.Email).FirstOrDefault(email => !string.IsNullOrEmpty(email)),
            account.Phone,
            account.LifecycleStage ?? "Customer",
            account.OwnerId,
            ownerName,
            account.CreatedAtUtc);
    }

    public async Task<CustomerOperationResult<CustomerListItemDto>> CreateAsync(CustomerUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var ownerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);

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

        var dto = new CustomerListItemDto(
            account.Id,
            account.Name,
            account.Name,
            null,
            account.Phone,
            account.LifecycleStage ?? "Customer",
            account.OwnerId,
            ownerName,
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

        account.Name = request.Name;
        account.AccountNumber = request.AccountNumber;
        account.Industry = request.Industry;
        account.Website = request.Website;
        account.Phone = request.Phone;
        account.LifecycleStage = request.LifecycleStage;
        account.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        account.Territory = request.Territory;
        account.Description = request.Description;
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
}
