using System.Text.RegularExpressions;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.HelpDesk;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.HelpDesk;

public sealed class HelpDeskService :
    ISupportCaseService,
    ISupportQueueService,
    ISupportSlaService,
    ISupportReportService,
    ISupportEmailIntakeService
{
    private static readonly HashSet<string> OpenStatuses = new(StringComparer.OrdinalIgnoreCase)
    {
        "New",
        "Open",
        "Pending Customer",
        "Pending Internal"
    };

    private static readonly HashSet<string> AllowedStatuses = new(StringComparer.OrdinalIgnoreCase)
    {
        "New",
        "Open",
        "Pending Customer",
        "Pending Internal",
        "Resolved",
        "Closed"
    };

    private static readonly HashSet<string> AllowedPriorities = new(StringComparer.OrdinalIgnoreCase)
    {
        "Low",
        "Medium",
        "High",
        "Urgent"
    };

    private static readonly HashSet<string> AllowedSeverities = new(StringComparer.OrdinalIgnoreCase)
    {
        "S1",
        "S2",
        "S3",
        "S4"
    };

    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly ICrmRealtimePublisher _realtimePublisher;

    public HelpDeskService(CrmDbContext dbContext, ITenantProvider tenantProvider, ICrmRealtimePublisher realtimePublisher)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _realtimePublisher = realtimePublisher;
    }

    public async Task<SupportCaseSearchResultDto> SearchCasesAsync(SupportCaseSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 200);

        var query = _dbContext.SupportCases
            .AsNoTracking()
            .Where(c => c.TenantId == _tenantProvider.TenantId && !c.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim();
            query = query.Where(c => c.Subject.Contains(term) || c.CaseNumber.Contains(term) || c.Description.Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            query = query.Where(c => c.Status == request.Status);
        }

        if (!string.IsNullOrWhiteSpace(request.Priority))
        {
            query = query.Where(c => c.Priority == request.Priority);
        }

        if (!string.IsNullOrWhiteSpace(request.Severity))
        {
            query = query.Where(c => c.Severity == request.Severity);
        }

        if (!string.IsNullOrWhiteSpace(request.Source))
        {
            query = query.Where(c => c.Source == request.Source);
        }

        if (request.QueueId.HasValue)
        {
            query = query.Where(c => c.QueueId == request.QueueId);
        }

        if (request.OwnerUserId.HasValue)
        {
            query = query.Where(c => c.OwnerUserId == request.OwnerUserId);
        }

        var total = await query.CountAsync(cancellationToken);
        var rows = await query
            .OrderByDescending(c => c.UpdatedAtUtc ?? c.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        var mapped = await MapCaseListItemsAsync(rows, cancellationToken);
        return new SupportCaseSearchResultDto(mapped, total);
    }

    public async Task<SupportCaseDetailDto?> GetCaseAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.SupportCases
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.TenantId == _tenantProvider.TenantId && c.Id == id && !c.IsDeleted, cancellationToken);
        if (entity is null)
        {
            return null;
        }

        var comments = await _dbContext.SupportCaseComments
            .AsNoTracking()
            .Where(c => c.TenantId == _tenantProvider.TenantId && c.CaseId == id && !c.IsDeleted)
            .OrderBy(c => c.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        var escalationEvents = await _dbContext.SupportCaseEscalationEvents
            .AsNoTracking()
            .Where(e => e.TenantId == _tenantProvider.TenantId && e.CaseId == id && !e.IsDeleted)
            .OrderByDescending(e => e.OccurredUtc)
            .ToListAsync(cancellationToken);

        var caseItem = (await MapCaseListItemsAsync(new[] { entity }, cancellationToken)).First();
        var userIds = comments.Where(c => c.AuthorUserId.HasValue)
            .Select(c => c.AuthorUserId!.Value)
            .Concat(escalationEvents.Where(e => e.ActorUserId.HasValue).Select(e => e.ActorUserId!.Value))
            .Distinct()
            .ToList();
        var userNames = await _dbContext.Users.AsNoTracking()
            .Where(u => u.TenantId == _tenantProvider.TenantId && userIds.Contains(u.Id) && !u.IsDeleted)
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        return new SupportCaseDetailDto(
            caseItem,
            comments.Select(c => new SupportCaseCommentDto(
                c.Id,
                c.CaseId,
                c.AuthorUserId,
                c.AuthorUserId.HasValue ? userNames.GetValueOrDefault(c.AuthorUserId.Value, "Unknown user") : "System",
                c.Body,
                c.IsInternal,
                c.CreatedAtUtc)).ToList(),
            escalationEvents.Select(e => new SupportCaseEscalationEventDto(
                e.Id,
                e.CaseId,
                e.Type,
                e.OccurredUtc,
                e.ActorUserId,
                e.ActorUserId.HasValue ? userNames.GetValueOrDefault(e.ActorUserId.Value, "Unknown user") : null,
                e.Notes)).ToList());
    }

    public async Task<HelpDeskValueResult<SupportCaseListItemDto>> CreateCaseAsync(SupportCaseCreateRequest request, CancellationToken cancellationToken = default)
    {
        var validation = await ValidateCaseRequestAsync(
            request.Subject,
            request.Priority,
            request.Severity,
            request.AccountId,
            request.ContactId,
            request.QueueId,
            request.OwnerUserId,
            cancellationToken);
        if (validation is not null)
        {
            return new HelpDeskValueResult<SupportCaseListItemDto>(false, null, Error: validation);
        }

        var policy = await ResolveSlaPolicyAsync(request.Priority, request.Severity, cancellationToken);
        if (policy is null)
        {
            return new HelpDeskValueResult<SupportCaseListItemDto>(false, null, Error: "No active SLA policy is available.");
        }

        var now = DateTime.UtcNow;
        var entity = new SupportCase
        {
            TenantId = _tenantProvider.TenantId,
            CaseNumber = await GenerateCaseNumberAsync(cancellationToken),
            Subject = request.Subject.Trim(),
            Description = request.Description.Trim(),
            Status = "New",
            Priority = request.Priority.Trim(),
            Severity = request.Severity.Trim().ToUpperInvariant(),
            Category = string.IsNullOrWhiteSpace(request.Category) ? "General" : request.Category.Trim(),
            Subcategory = string.IsNullOrWhiteSpace(request.Subcategory) ? null : request.Subcategory.Trim(),
            Source = string.IsNullOrWhiteSpace(request.Source) ? "Manual" : request.Source.Trim(),
            AccountId = request.AccountId,
            ContactId = request.ContactId,
            QueueId = request.QueueId,
            OwnerUserId = request.OwnerUserId,
            SlaPolicyId = policy.Id,
            FirstResponseDueUtc = now.AddMinutes(policy.FirstResponseTargetMinutes),
            ResolutionDueUtc = now.AddMinutes(policy.ResolutionTargetMinutes),
            CreatedAtUtc = now
        };

        _dbContext.SupportCases.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var item = (await MapCaseListItemsAsync(new[] { entity }, cancellationToken)).First();
        await PublishCaseChangedAsync(entity.Id, "created", cancellationToken);
        return new HelpDeskValueResult<SupportCaseListItemDto>(true, item);
    }

    public async Task<HelpDeskOperationResult> UpdateCaseAsync(Guid id, SupportCaseUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.SupportCases
            .FirstOrDefaultAsync(c => c.TenantId == _tenantProvider.TenantId && c.Id == id && !c.IsDeleted, cancellationToken);
        if (entity is null)
        {
            return new HelpDeskOperationResult(false, NotFound: true);
        }

        var validation = await ValidateCaseRequestAsync(
            request.Subject,
            request.Priority,
            request.Severity,
            request.AccountId,
            request.ContactId,
            request.QueueId,
            request.OwnerUserId,
            cancellationToken);
        if (validation is not null)
        {
            return new HelpDeskOperationResult(false, Error: validation);
        }

        entity.Subject = request.Subject.Trim();
        entity.Description = request.Description.Trim();
        entity.Priority = request.Priority.Trim();
        entity.Severity = request.Severity.Trim().ToUpperInvariant();
        entity.Category = string.IsNullOrWhiteSpace(request.Category) ? "General" : request.Category.Trim();
        entity.Subcategory = string.IsNullOrWhiteSpace(request.Subcategory) ? null : request.Subcategory.Trim();
        entity.AccountId = request.AccountId;
        entity.ContactId = request.ContactId;
        entity.QueueId = request.QueueId;
        entity.OwnerUserId = request.OwnerUserId;
        entity.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        await PublishCaseChangedAsync(entity.Id, "updated", cancellationToken);
        return new HelpDeskOperationResult(true);
    }

    public async Task<HelpDeskOperationResult> AssignCaseAsync(Guid id, SupportCaseAssignRequest request, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.SupportCases
            .FirstOrDefaultAsync(c => c.TenantId == _tenantProvider.TenantId && c.Id == id && !c.IsDeleted, cancellationToken);
        if (entity is null)
        {
            return new HelpDeskOperationResult(false, NotFound: true);
        }

        if (request.QueueId.HasValue)
        {
            var queueExists = await _dbContext.SupportQueues
                .AnyAsync(q => q.TenantId == _tenantProvider.TenantId && q.Id == request.QueueId && q.IsActive && !q.IsDeleted, cancellationToken);
            if (!queueExists)
            {
                return new HelpDeskOperationResult(false, Error: "Queue was not found.");
            }
        }

        if (request.OwnerUserId.HasValue)
        {
            var ownerExists = await _dbContext.Users
                .AnyAsync(u => u.TenantId == _tenantProvider.TenantId && u.Id == request.OwnerUserId && !u.IsDeleted, cancellationToken);
            if (!ownerExists)
            {
                return new HelpDeskOperationResult(false, Error: "Owner user was not found.");
            }
        }

        entity.QueueId = request.QueueId;
        entity.OwnerUserId = request.OwnerUserId;
        entity.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        await PublishCaseChangedAsync(entity.Id, "assigned", cancellationToken);
        return new HelpDeskOperationResult(true);
    }

    public async Task<HelpDeskOperationResult> ChangeStatusAsync(Guid id, SupportCaseStatusRequest request, CancellationToken cancellationToken = default)
    {
        var nextStatus = request.Status?.Trim() ?? string.Empty;
        if (!AllowedStatuses.Contains(nextStatus))
        {
            return new HelpDeskOperationResult(false, Error: "Unsupported status value.");
        }

        var entity = await _dbContext.SupportCases
            .FirstOrDefaultAsync(c => c.TenantId == _tenantProvider.TenantId && c.Id == id && !c.IsDeleted, cancellationToken);
        if (entity is null)
        {
            return new HelpDeskOperationResult(false, NotFound: true);
        }

        if (!CanTransition(entity.Status, nextStatus))
        {
            return new HelpDeskOperationResult(false, Error: "Invalid status transition.");
        }

        entity.Status = nextStatus;
        var now = DateTime.UtcNow;
        if (nextStatus.Equals("Resolved", StringComparison.OrdinalIgnoreCase))
        {
            entity.ResolvedUtc ??= now;
        }
        else if (nextStatus.Equals("Closed", StringComparison.OrdinalIgnoreCase))
        {
            entity.ClosedUtc ??= now;
        }
        else if (nextStatus.Equals("Open", StringComparison.OrdinalIgnoreCase) && entity.ClosedUtc.HasValue)
        {
            entity.ClosedUtc = null;
        }

        entity.UpdatedAtUtc = now;
        await _dbContext.SaveChangesAsync(cancellationToken);
        await PublishCaseChangedAsync(entity.Id, "status-changed", cancellationToken);
        return new HelpDeskOperationResult(true);
    }

    public async Task<HelpDeskValueResult<SupportCaseCommentDto>> AddCommentAsync(Guid id, SupportCaseCommentCreateRequest request, CancellationToken cancellationToken = default)
    {
        if (request.AuthorUserId == Guid.Empty)
        {
            return new HelpDeskValueResult<SupportCaseCommentDto>(false, null, Error: "Author context is required.");
        }

        if (string.IsNullOrWhiteSpace(request.Body))
        {
            return new HelpDeskValueResult<SupportCaseCommentDto>(false, null, Error: "Comment body is required.");
        }

        var entity = await _dbContext.SupportCases
            .FirstOrDefaultAsync(c => c.TenantId == _tenantProvider.TenantId && c.Id == id && !c.IsDeleted, cancellationToken);
        if (entity is null)
        {
            return new HelpDeskValueResult<SupportCaseCommentDto>(false, null, NotFound: true);
        }

        var now = DateTime.UtcNow;
        var comment = new SupportCaseComment
        {
            TenantId = _tenantProvider.TenantId,
            CaseId = id,
            AuthorUserId = request.AuthorUserId,
            Body = request.Body.Trim(),
            IsInternal = request.IsInternal,
            CreatedAtUtc = now
        };

        if (!entity.FirstRespondedUtc.HasValue)
        {
            entity.FirstRespondedUtc = now;
        }

        entity.UpdatedAtUtc = now;
        _dbContext.SupportCaseComments.Add(comment);
        await _dbContext.SaveChangesAsync(cancellationToken);
        await PublishCaseChangedAsync(entity.Id, "comment-added", cancellationToken);

        return new HelpDeskValueResult<SupportCaseCommentDto>(true, new SupportCaseCommentDto(
            comment.Id,
            id,
            comment.AuthorUserId,
            request.AuthorUserName,
            comment.Body,
            comment.IsInternal,
            comment.CreatedAtUtc));
    }

    public async Task<IReadOnlyList<SupportQueueDto>> ListQueuesAsync(CancellationToken cancellationToken = default)
    {
        var rows = await _dbContext.SupportQueues
            .AsNoTracking()
            .Where(q => q.TenantId == _tenantProvider.TenantId && !q.IsDeleted)
            .OrderBy(q => q.Name)
            .ToListAsync(cancellationToken);

        var queueIds = rows.Select(q => q.Id).ToList();
        var counts = await _dbContext.SupportQueueMembers
            .AsNoTracking()
            .Where(m => m.TenantId == _tenantProvider.TenantId && queueIds.Contains(m.QueueId) && m.IsActive && !m.IsDeleted)
            .GroupBy(m => m.QueueId)
            .Select(g => new { QueueId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(k => k.QueueId, v => v.Count, cancellationToken);

        return rows.Select(q => new SupportQueueDto(
            q.Id,
            q.Name,
            q.Description,
            q.IsActive,
            counts.GetValueOrDefault(q.Id))).ToList();
    }

    public async Task<HelpDeskValueResult<SupportQueueDto>> CreateQueueAsync(SupportQueueUpsertRequest request, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return new HelpDeskValueResult<SupportQueueDto>(false, null, Error: "Queue name is required.");
        }

        var exists = await _dbContext.SupportQueues
            .AnyAsync(q => q.TenantId == _tenantProvider.TenantId && q.Name == request.Name.Trim() && !q.IsDeleted, cancellationToken);
        if (exists)
        {
            return new HelpDeskValueResult<SupportQueueDto>(false, null, Error: "A queue with the same name already exists.");
        }

        var queue = new SupportQueue
        {
            TenantId = _tenantProvider.TenantId,
            Name = request.Name.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.SupportQueues.Add(queue);
        await _dbContext.SaveChangesAsync(cancellationToken);
        await SyncQueueMembersAsync(queue.Id, request.MemberUserIds, cancellationToken);
        await PublishQueueChangedAsync(queue.Id, "created", cancellationToken);

        var activeMemberCount = await _dbContext.SupportQueueMembers
            .CountAsync(m => m.TenantId == _tenantProvider.TenantId && m.QueueId == queue.Id && m.IsActive && !m.IsDeleted, cancellationToken);
        return new HelpDeskValueResult<SupportQueueDto>(true, new SupportQueueDto(queue.Id, queue.Name, queue.Description, queue.IsActive, activeMemberCount));
    }

    public async Task<HelpDeskOperationResult> UpdateQueueAsync(Guid id, SupportQueueUpsertRequest request, CancellationToken cancellationToken = default)
    {
        var queue = await _dbContext.SupportQueues
            .FirstOrDefaultAsync(q => q.TenantId == _tenantProvider.TenantId && q.Id == id && !q.IsDeleted, cancellationToken);
        if (queue is null)
        {
            return new HelpDeskOperationResult(false, NotFound: true);
        }

        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return new HelpDeskOperationResult(false, Error: "Queue name is required.");
        }

        var duplicate = await _dbContext.SupportQueues
            .AnyAsync(q => q.TenantId == _tenantProvider.TenantId && q.Id != id && q.Name == request.Name.Trim() && !q.IsDeleted, cancellationToken);
        if (duplicate)
        {
            return new HelpDeskOperationResult(false, Error: "A queue with the same name already exists.");
        }

        queue.Name = request.Name.Trim();
        queue.Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
        queue.IsActive = request.IsActive;
        queue.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        await SyncQueueMembersAsync(id, request.MemberUserIds, cancellationToken);
        await PublishQueueChangedAsync(id, "updated", cancellationToken);
        return new HelpDeskOperationResult(true);
    }

    public async Task<IReadOnlyList<SupportSlaPolicyDto>> ListPoliciesAsync(CancellationToken cancellationToken = default)
    {
        var rows = await _dbContext.SupportSlaPolicies
            .AsNoTracking()
            .Where(p => p.TenantId == _tenantProvider.TenantId && !p.IsDeleted)
            .OrderBy(p => p.Priority)
            .ThenBy(p => p.Severity)
            .ToListAsync(cancellationToken);

        return rows.Select(p => new SupportSlaPolicyDto(
            p.Id,
            p.Name,
            p.Priority,
            p.Severity,
            p.FirstResponseTargetMinutes,
            p.ResolutionTargetMinutes,
            p.EscalationMinutes,
            p.BusinessHoursJson,
            p.IsActive)).ToList();
    }

    public async Task<HelpDeskOperationResult> UpdatePolicyAsync(Guid id, SupportSlaPolicyUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var policy = await _dbContext.SupportSlaPolicies
            .FirstOrDefaultAsync(p => p.TenantId == _tenantProvider.TenantId && p.Id == id && !p.IsDeleted, cancellationToken);
        if (policy is null)
        {
            return new HelpDeskOperationResult(false, NotFound: true);
        }

        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return new HelpDeskOperationResult(false, Error: "SLA policy name is required.");
        }

        if (!AllowedPriorities.Contains(request.Priority))
        {
            return new HelpDeskOperationResult(false, Error: "Unsupported priority value.");
        }

        if (!AllowedSeverities.Contains(request.Severity))
        {
            return new HelpDeskOperationResult(false, Error: "Unsupported severity value.");
        }

        policy.Name = request.Name.Trim();
        policy.Priority = request.Priority.Trim();
        policy.Severity = request.Severity.Trim().ToUpperInvariant();
        policy.FirstResponseTargetMinutes = request.FirstResponseTargetMinutes;
        policy.ResolutionTargetMinutes = request.ResolutionTargetMinutes;
        policy.EscalationMinutes = request.EscalationMinutes;
        policy.BusinessHoursJson = string.IsNullOrWhiteSpace(request.BusinessHoursJson) ? null : request.BusinessHoursJson.Trim();
        policy.IsActive = request.IsActive;
        policy.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return new HelpDeskOperationResult(true);
    }

    public async Task<HelpDeskReportSummaryDto> GetSummaryAsync(CancellationToken cancellationToken = default)
    {
        var now = DateTime.UtcNow;
        var startOfToday = now.Date;

        var rows = await _dbContext.SupportCases
            .AsNoTracking()
            .Where(c => c.TenantId == _tenantProvider.TenantId && !c.IsDeleted)
            .Select(c => new { c.Status, c.ResolutionDueUtc, c.ResolvedUtc })
            .ToListAsync(cancellationToken);

        var openCount = rows.Count(r => OpenStatuses.Contains(r.Status));
        var breachedCount = rows.Count(r => OpenStatuses.Contains(r.Status) && r.ResolutionDueUtc < now);
        var atRiskCount = rows.Count(r => OpenStatuses.Contains(r.Status) && r.ResolutionDueUtc >= now && r.ResolutionDueUtc <= now.AddHours(1));
        var resolvedToday = rows.Count(r => r.ResolvedUtc.HasValue && r.ResolvedUtc.Value >= startOfToday);

        return new HelpDeskReportSummaryDto(openCount, atRiskCount, breachedCount, resolvedToday);
    }

    public async Task<HelpDeskOperationResult> ProcessInboundAsync(HelpDeskEmailIntakeRequest request, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(request.ThreadKey) || string.IsNullOrWhiteSpace(request.Subject))
        {
            return new HelpDeskOperationResult(false, Error: "threadKey and subject are required.");
        }

        var normalizedThreadKey = request.ThreadKey.Trim();
        var receivedAt = request.ReceivedAtUtc == default ? DateTime.UtcNow : request.ReceivedAtUtc;
        var caseFromSubject = TryExtractCaseNumber(request.Subject);
        SupportCase? supportCase = null;

        if (!string.IsNullOrWhiteSpace(caseFromSubject))
        {
            supportCase = await _dbContext.SupportCases
                .FirstOrDefaultAsync(c => c.TenantId == _tenantProvider.TenantId && c.CaseNumber == caseFromSubject && !c.IsDeleted, cancellationToken);
        }

        if (supportCase is null)
        {
            var binding = await _dbContext.SupportEmailBindings
                .FirstOrDefaultAsync(b => b.TenantId == _tenantProvider.TenantId && b.ExternalThreadKey == normalizedThreadKey && !b.IsDeleted, cancellationToken);
            if (binding is not null)
            {
                if (binding.LastMessageUtc >= receivedAt)
                {
                    return new HelpDeskOperationResult(true);
                }

                supportCase = await _dbContext.SupportCases
                    .FirstOrDefaultAsync(c => c.TenantId == _tenantProvider.TenantId && c.Id == binding.CaseId && !c.IsDeleted, cancellationToken);
                binding.LastMessageUtc = receivedAt;
                binding.UpdatedAtUtc = DateTime.UtcNow;
            }
        }

        if (supportCase is null)
        {
            var policy = await ResolveSlaPolicyAsync("Medium", "S3", cancellationToken);
            if (policy is null)
            {
                return new HelpDeskOperationResult(false, Error: "No active SLA policy is available.");
            }

            var matchedContact = await _dbContext.Contacts
                .AsNoTracking()
                .Where(c => c.TenantId == _tenantProvider.TenantId && c.Email == request.FromEmail && !c.IsDeleted)
                .Select(c => new { c.Id, c.AccountId })
                .FirstOrDefaultAsync(cancellationToken);

            supportCase = new SupportCase
            {
                TenantId = _tenantProvider.TenantId,
                CaseNumber = await GenerateCaseNumberAsync(cancellationToken),
                Subject = request.Subject.Trim(),
                Description = request.Body?.Trim() ?? string.Empty,
                Status = "New",
                Priority = "Medium",
                Severity = "S3",
                Category = "Email",
                Source = "Email",
                ContactId = matchedContact?.Id,
                AccountId = matchedContact?.AccountId,
                SlaPolicyId = policy.Id,
                FirstResponseDueUtc = DateTime.UtcNow.AddMinutes(policy.FirstResponseTargetMinutes),
                ResolutionDueUtc = DateTime.UtcNow.AddMinutes(policy.ResolutionTargetMinutes),
                CreatedAtUtc = DateTime.UtcNow
            };
            _dbContext.SupportCases.Add(supportCase);

            _dbContext.SupportEmailBindings.Add(new SupportEmailBinding
            {
                TenantId = _tenantProvider.TenantId,
                ExternalThreadKey = normalizedThreadKey,
                CaseId = supportCase.Id,
                LastMessageUtc = receivedAt,
                CreatedAtUtc = DateTime.UtcNow
            });
        }

        _dbContext.SupportCaseComments.Add(new SupportCaseComment
        {
            TenantId = _tenantProvider.TenantId,
            CaseId = supportCase.Id,
            AuthorUserId = null,
            Body = request.Body?.Trim() ?? string.Empty,
            IsInternal = true,
            CreatedAtUtc = DateTime.UtcNow
        });

        supportCase.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        await PublishCaseChangedAsync(supportCase.Id, "email-ingested", cancellationToken);
        return new HelpDeskOperationResult(true);
    }

    private async Task<string?> ValidateCaseRequestAsync(
        string subject,
        string priority,
        string severity,
        Guid? accountId,
        Guid? contactId,
        Guid? queueId,
        Guid? ownerUserId,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(subject))
        {
            return "Subject is required.";
        }

        if (!AllowedPriorities.Contains(priority))
        {
            return "Unsupported priority value.";
        }

        if (!AllowedSeverities.Contains(severity))
        {
            return "Unsupported severity value.";
        }

        if (accountId.HasValue)
        {
            var exists = await _dbContext.Accounts.AnyAsync(a => a.TenantId == _tenantProvider.TenantId && a.Id == accountId && !a.IsDeleted, cancellationToken);
            if (!exists)
            {
                return "Account was not found.";
            }
        }

        if (contactId.HasValue)
        {
            var exists = await _dbContext.Contacts.AnyAsync(c => c.TenantId == _tenantProvider.TenantId && c.Id == contactId && !c.IsDeleted, cancellationToken);
            if (!exists)
            {
                return "Contact was not found.";
            }
        }

        if (queueId.HasValue)
        {
            var exists = await _dbContext.SupportQueues.AnyAsync(q => q.TenantId == _tenantProvider.TenantId && q.Id == queueId && q.IsActive && !q.IsDeleted, cancellationToken);
            if (!exists)
            {
                return "Queue was not found.";
            }
        }

        if (ownerUserId.HasValue)
        {
            var exists = await _dbContext.Users.AnyAsync(u => u.TenantId == _tenantProvider.TenantId && u.Id == ownerUserId && !u.IsDeleted, cancellationToken);
            if (!exists)
            {
                return "Owner user was not found.";
            }
        }

        return null;
    }

    private async Task<SupportSlaPolicy?> ResolveSlaPolicyAsync(string priority, string severity, CancellationToken cancellationToken)
    {
        var normalizedSeverity = severity.Trim().ToUpperInvariant();
        var normalizedPriority = priority.Trim();
        var policy = await _dbContext.SupportSlaPolicies
            .Where(p => p.TenantId == _tenantProvider.TenantId && p.IsActive && !p.IsDeleted
                        && p.Priority == normalizedPriority
                        && p.Severity == normalizedSeverity)
            .OrderBy(p => p.Name)
            .FirstOrDefaultAsync(cancellationToken);

        if (policy is not null)
        {
            return policy;
        }

        return await _dbContext.SupportSlaPolicies
            .Where(p => p.TenantId == _tenantProvider.TenantId && p.IsActive && !p.IsDeleted)
            .OrderBy(p => p.Priority)
            .ThenBy(p => p.Severity)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<string> GenerateCaseNumberAsync(CancellationToken cancellationToken)
    {
        var prefix = $"CASE-{DateTime.UtcNow:yyyyMMdd}-";
        var existing = await _dbContext.SupportCases
            .AsNoTracking()
            .Where(c => c.TenantId == _tenantProvider.TenantId && c.CaseNumber.StartsWith(prefix))
            .Select(c => c.CaseNumber)
            .ToListAsync(cancellationToken);

        var max = 0;
        foreach (var value in existing)
        {
            var token = value[prefix.Length..];
            if (int.TryParse(token, out var parsed) && parsed > max)
            {
                max = parsed;
            }
        }

        return $"{prefix}{(max + 1):D4}";
    }

    private static bool CanTransition(string currentStatus, string nextStatus)
    {
        if (currentStatus.Equals(nextStatus, StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }

        return currentStatus switch
        {
            "New" => nextStatus is "Open" or "Pending Internal" or "Pending Customer" or "Resolved",
            "Open" => nextStatus is "Pending Internal" or "Pending Customer" or "Resolved",
            "Pending Internal" => nextStatus is "Open" or "Resolved",
            "Pending Customer" => nextStatus is "Open" or "Resolved",
            "Resolved" => nextStatus is "Closed" or "Open",
            "Closed" => nextStatus is "Open",
            _ => false
        };
    }

    private async Task<IReadOnlyList<SupportCaseListItemDto>> MapCaseListItemsAsync(IEnumerable<SupportCase> rows, CancellationToken cancellationToken)
    {
        var list = rows.ToList();
        var accountIds = list.Where(c => c.AccountId.HasValue).Select(c => c.AccountId!.Value).Distinct().ToList();
        var contactIds = list.Where(c => c.ContactId.HasValue).Select(c => c.ContactId!.Value).Distinct().ToList();
        var ownerIds = list.Where(c => c.OwnerUserId.HasValue).Select(c => c.OwnerUserId!.Value).Distinct().ToList();
        var queueIds = list.Where(c => c.QueueId.HasValue).Select(c => c.QueueId!.Value).Distinct().ToList();

        var accounts = accountIds.Count == 0
            ? new Dictionary<Guid, string>()
            : await _dbContext.Accounts.AsNoTracking()
                .Where(a => a.TenantId == _tenantProvider.TenantId && accountIds.Contains(a.Id) && !a.IsDeleted)
                .ToDictionaryAsync(a => a.Id, a => a.Name, cancellationToken);
        var contacts = contactIds.Count == 0
            ? new Dictionary<Guid, string>()
            : await _dbContext.Contacts.AsNoTracking()
                .Where(c => c.TenantId == _tenantProvider.TenantId && contactIds.Contains(c.Id) && !c.IsDeleted)
                .ToDictionaryAsync(c => c.Id, c => $"{c.FirstName} {c.LastName}".Trim(), cancellationToken);
        var owners = ownerIds.Count == 0
            ? new Dictionary<Guid, string>()
            : await _dbContext.Users.AsNoTracking()
                .Where(u => u.TenantId == _tenantProvider.TenantId && ownerIds.Contains(u.Id) && !u.IsDeleted)
                .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);
        var queues = queueIds.Count == 0
            ? new Dictionary<Guid, string>()
            : await _dbContext.SupportQueues.AsNoTracking()
                .Where(q => q.TenantId == _tenantProvider.TenantId && queueIds.Contains(q.Id) && !q.IsDeleted)
                .ToDictionaryAsync(q => q.Id, q => q.Name, cancellationToken);

        return list.Select(entity => new SupportCaseListItemDto(
            entity.Id,
            entity.CaseNumber,
            entity.Subject,
            entity.Description,
            entity.Status,
            entity.Priority,
            entity.Severity,
            entity.Category,
            entity.Subcategory,
            entity.Source,
            entity.AccountId,
            entity.AccountId.HasValue ? accounts.GetValueOrDefault(entity.AccountId.Value) : null,
            entity.ContactId,
            entity.ContactId.HasValue ? contacts.GetValueOrDefault(entity.ContactId.Value) : null,
            entity.QueueId,
            entity.QueueId.HasValue ? queues.GetValueOrDefault(entity.QueueId.Value) : null,
            entity.OwnerUserId,
            entity.OwnerUserId.HasValue ? owners.GetValueOrDefault(entity.OwnerUserId.Value) : null,
            entity.FirstResponseDueUtc,
            entity.ResolutionDueUtc,
            entity.FirstRespondedUtc,
            entity.ResolvedUtc,
            entity.ClosedUtc,
            entity.CreatedAtUtc,
            entity.UpdatedAtUtc)).ToList();
    }

    private static string? TryExtractCaseNumber(string subject)
    {
        var match = Regex.Match(subject ?? string.Empty, @"CASE-\d{8}-\d{4}", RegexOptions.IgnoreCase);
        return match.Success ? match.Value.ToUpperInvariant() : null;
    }

    private async Task SyncQueueMembersAsync(Guid queueId, IReadOnlyCollection<Guid>? memberUserIds, CancellationToken cancellationToken)
    {
        if (memberUserIds is null)
        {
            return;
        }

        var requested = memberUserIds.Where(id => id != Guid.Empty).Distinct().ToHashSet();
        var current = await _dbContext.SupportQueueMembers
            .Where(m => m.TenantId == _tenantProvider.TenantId && m.QueueId == queueId && !m.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var member in current.Where(m => !requested.Contains(m.UserId)))
        {
            member.IsDeleted = true;
            member.IsActive = false;
            member.DeletedAtUtc = DateTime.UtcNow;
            member.UpdatedAtUtc = DateTime.UtcNow;
        }

        var existingUserIds = current.Where(m => !m.IsDeleted).Select(m => m.UserId).ToHashSet();
        var validUserIds = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.TenantId == _tenantProvider.TenantId && requested.Contains(u.Id) && !u.IsDeleted)
            .Select(u => u.Id)
            .ToListAsync(cancellationToken);

        foreach (var userId in validUserIds.Where(id => !existingUserIds.Contains(id)))
        {
            _dbContext.SupportQueueMembers.Add(new SupportQueueMember
            {
                TenantId = _tenantProvider.TenantId,
                QueueId = queueId,
                UserId = userId,
                IsActive = true,
                CreatedAtUtc = DateTime.UtcNow
            });
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private Task PublishCaseChangedAsync(Guid caseId, string action, CancellationToken cancellationToken)
        => _realtimePublisher.PublishTenantEventAsync(
            _tenantProvider.TenantId,
            "helpdesk.case.changed",
            new
            {
                caseId,
                action,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);

    private Task PublishQueueChangedAsync(Guid queueId, string action, CancellationToken cancellationToken)
        => _realtimePublisher.PublishTenantEventAsync(
            _tenantProvider.TenantId,
            "helpdesk.queue.changed",
            new
            {
                queueId,
                action,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);
}
