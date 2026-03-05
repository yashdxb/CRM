using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.DirectChat;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.DirectChat;

public sealed class DirectChatService : IDirectChatService
{
    private readonly CrmDbContext _dbContext;
    private readonly ICrmRealtimePublisher _realtimePublisher;

    public DirectChatService(CrmDbContext dbContext, ICrmRealtimePublisher realtimePublisher)
    {
        _dbContext = dbContext;
        _realtimePublisher = realtimePublisher;
    }

    public async Task<IReadOnlyList<DirectChatThreadDto>> ListThreadsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var participantRows = await _dbContext.DirectChatParticipants
            .AsNoTracking()
            .Where(p => p.UserId == userId && !p.IsDeleted)
            .Select(p => new { p.ThreadId, p.IsArchived, p.LastClearedAtUtc })
            .ToListAsync(cancellationToken);

        var threadIds = participantRows.Select(p => p.ThreadId).Distinct().ToList();
        if (threadIds.Count == 0)
        {
            return [];
        }

        var lastMessageByThread = await _dbContext.DirectChatMessages
            .AsNoTracking()
            .Where(m => threadIds.Contains(m.ThreadId) && !m.IsDeleted)
            .GroupBy(m => m.ThreadId)
            .Select(group => new { ThreadId = group.Key, LastMessageAtUtc = group.Max(m => m.CreatedAtUtc) })
            .ToDictionaryAsync(item => item.ThreadId, item => item.LastMessageAtUtc, cancellationToken);

        var usersById = await _dbContext.Users
            .AsNoTracking()
            .Where(u => !u.IsDeleted)
            .Select(u => new { u.Id, u.FullName, u.Email })
            .ToDictionaryAsync(u => u.Id, u => new DirectChatParticipantDto(u.Id, u.FullName, u.Email), cancellationToken);

        var threadParticipants = await _dbContext.DirectChatParticipants
            .AsNoTracking()
            .Where(p => threadIds.Contains(p.ThreadId) && !p.IsDeleted)
            .Select(p => new { p.ThreadId, p.UserId })
            .ToListAsync(cancellationToken);

        var threadMeta = await _dbContext.DirectChatThreads
            .AsNoTracking()
            .Where(t => threadIds.Contains(t.Id) && !t.IsDeleted)
            .Select(t => new { t.Id, t.Title, t.CreatedAtUtc })
            .ToDictionaryAsync(
                t => t.Id,
                t => new
                {
                    t.Title,
                    t.CreatedAtUtc
                },
                cancellationToken);

        var threadParticipantMap = threadParticipants
            .GroupBy(p => p.ThreadId)
            .ToDictionary(
                group => group.Key,
                group => (IReadOnlyList<DirectChatParticipantDto>)group
                    .Select(item => usersById.TryGetValue(item.UserId, out var user)
                        ? user
                        : new DirectChatParticipantDto(item.UserId, "Unknown user", string.Empty))
                    .ToList());

        var results = participantRows
            .Select(row =>
            {
                var fallbackCreatedAtUtc = threadMeta.TryGetValue(row.ThreadId, out var meta)
                    ? meta.CreatedAtUtc
                    : DateTime.UtcNow;
                var lastMessageAtUtc = lastMessageByThread.TryGetValue(row.ThreadId, out var lastAt)
                    ? lastAt
                    : fallbackCreatedAtUtc;
                var participants = threadParticipantMap.TryGetValue(row.ThreadId, out var values)
                    ? values
                    : [];
                var title = threadMeta.TryGetValue(row.ThreadId, out var threadInfo)
                    ? threadInfo.Title
                    : null;

                return new DirectChatThreadDto(
                    row.ThreadId,
                    title,
                    lastMessageAtUtc,
                    row.IsArchived,
                    row.LastClearedAtUtc,
                    participants);
            })
            .OrderBy(item => item.LastMessageAtUtc)
            .ThenBy(item => item.ThreadId)
            .ToList();

        return results;
    }

    public async Task<DirectChatThreadDto?> OpenThreadAsync(Guid userId, IReadOnlyCollection<Guid> participantUserIds, CancellationToken cancellationToken = default)
    {
        var normalized = participantUserIds
            .Where(id => id != Guid.Empty)
            .Append(userId)
            .Distinct()
            .ToList();

        if (normalized.Count < 2)
        {
            return null;
        }

        var activeUsers = await _dbContext.Users
            .AsNoTracking()
            .Where(u => normalized.Contains(u.Id) && u.IsActive && !u.IsDeleted)
            .Select(u => u.Id)
            .ToListAsync(cancellationToken);

        if (activeUsers.Count != normalized.Count)
        {
            return null;
        }

        var candidates = await _dbContext.DirectChatParticipants
            .AsNoTracking()
            .Where(p => normalized.Contains(p.UserId) && !p.IsDeleted)
            .GroupBy(p => p.ThreadId)
            .Select(group => new
            {
                ThreadId = group.Key,
                Members = group.Select(item => item.UserId).Distinct().ToList()
            })
            .ToListAsync(cancellationToken);

        var matchedThreadId = candidates
            .Where(candidate => candidate.Members.Count == normalized.Count)
            .FirstOrDefault(candidate => candidate.Members.All(member => normalized.Contains(member)))
            ?.ThreadId;

        if (matchedThreadId is Guid threadId && threadId != Guid.Empty)
        {
            var participant = await _dbContext.DirectChatParticipants
                .FirstOrDefaultAsync(p => p.ThreadId == threadId && p.UserId == userId && !p.IsDeleted, cancellationToken);
            if (participant is not null && participant.IsArchived)
            {
                participant.IsArchived = false;
                participant.ArchivedAtUtc = null;
                await _dbContext.SaveChangesAsync(cancellationToken);
            }

            var threads = await ListThreadsAsync(userId, cancellationToken);
            return threads.FirstOrDefault(t => t.ThreadId == threadId);
        }

        var createdThread = new Domain.Entities.DirectChatThread
        {
            Title = null
        };

        _dbContext.DirectChatThreads.Add(createdThread);
        foreach (var participantUserId in normalized)
        {
            _dbContext.DirectChatParticipants.Add(new Domain.Entities.DirectChatParticipant
            {
                ThreadId = createdThread.Id,
                UserId = participantUserId,
                IsArchived = false
            });
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        var created = await ListThreadsAsync(userId, cancellationToken);
        return created.FirstOrDefault(t => t.ThreadId == createdThread.Id);
    }

    public async Task<IReadOnlyList<DirectChatMessageDto>> GetMessagesAsync(Guid userId, Guid threadId, int take = 200, CancellationToken cancellationToken = default)
    {
        if (threadId == Guid.Empty)
        {
            return [];
        }

        take = Math.Clamp(take, 1, 500);

        var participant = await _dbContext.DirectChatParticipants
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.ThreadId == threadId && p.UserId == userId && !p.IsDeleted, cancellationToken);

        if (participant is null)
        {
            return [];
        }

        var userNames = await _dbContext.Users
            .AsNoTracking()
            .Where(u => !u.IsDeleted)
            .Select(u => new { u.Id, u.FullName })
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        var query = _dbContext.DirectChatMessages
            .AsNoTracking()
            .Where(m => m.ThreadId == threadId && !m.IsDeleted);

        if (participant.LastClearedAtUtc.HasValue)
        {
            var threshold = participant.LastClearedAtUtc.Value;
            query = query.Where(m => m.CreatedAtUtc > threshold);
        }

        var rows = await query
            .OrderByDescending(m => m.CreatedAtUtc)
            .Take(take)
            .ToListAsync(cancellationToken);

        var messageIds = rows.Select(m => m.Id).ToList();
        var attachmentsByMessage = messageIds.Count == 0
            ? new Dictionary<Guid, IReadOnlyList<DirectChatAttachmentDto>>()
            : await _dbContext.Attachments
                .AsNoTracking()
                .Where(a =>
                    !a.IsDeleted &&
                    a.RelatedEntityType == ActivityRelationType.DirectChatMessage &&
                    messageIds.Contains(a.RelatedEntityId))
                .OrderBy(a => a.CreatedAtUtc)
                .GroupBy(a => a.RelatedEntityId)
                .ToDictionaryAsync(
                    group => group.Key,
                    group => (IReadOnlyList<DirectChatAttachmentDto>)group
                        .Select(a => new DirectChatAttachmentDto(a.Id, a.FileName, a.ContentType, a.Size))
                        .ToList(),
                    cancellationToken);

        return rows
            .OrderBy(m => m.CreatedAtUtc)
            .Select(m => new DirectChatMessageDto(
                m.Id,
                m.ThreadId,
                m.SenderUserId,
                userNames.TryGetValue(m.SenderUserId, out var displayName) ? displayName : "User",
                m.Content,
                m.CreatedAtUtc,
                attachmentsByMessage.GetValueOrDefault(m.Id, [])))
            .ToList();
    }

    public async Task<DirectChatMessageDto?> SendMessageAsync(
        Guid userId,
        Guid threadId,
        string message,
        IReadOnlyCollection<Guid>? attachmentIds = null,
        CancellationToken cancellationToken = default)
    {
        var trimmedAttachmentIds = attachmentIds?
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList() ?? [];
        var hasMessage = !string.IsNullOrWhiteSpace(message);
        if (threadId == Guid.Empty || (!hasMessage && trimmedAttachmentIds.Count == 0))
        {
            return null;
        }

        var participant = await _dbContext.DirectChatParticipants
            .FirstOrDefaultAsync(p => p.ThreadId == threadId && p.UserId == userId && !p.IsDeleted, cancellationToken);
        if (participant is null)
        {
            return null;
        }

        var sender = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == userId && !u.IsDeleted)
            .Select(u => new { u.Id, u.FullName, u.TenantId })
            .FirstOrDefaultAsync(cancellationToken);

        if (sender is null)
        {
            return null;
        }

        var content = (message ?? string.Empty).Trim();
        if (content.Length > 4000)
        {
            content = content[..4000];
        }

        var entity = new Domain.Entities.DirectChatMessage
        {
            ThreadId = threadId,
            SenderUserId = userId,
            Content = content
        };

        _dbContext.DirectChatMessages.Add(entity);

        var participants = await _dbContext.DirectChatParticipants
            .Where(p => p.ThreadId == threadId && !p.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var threadParticipant in participants)
        {
            if (threadParticipant.UserId == userId)
            {
                threadParticipant.LastReadAtUtc = DateTime.UtcNow;
            }
            if (threadParticipant.IsArchived)
            {
                threadParticipant.IsArchived = false;
                threadParticipant.ArchivedAtUtc = null;
            }
        }

        var attachmentDtos = new List<DirectChatAttachmentDto>();
        if (trimmedAttachmentIds.Count > 0)
        {
            var attachments = await _dbContext.Attachments
                .Where(a =>
                    !a.IsDeleted &&
                    a.UploadedById == userId &&
                    a.RelatedEntityType == ActivityRelationType.DirectChatThread &&
                    a.RelatedEntityId == threadId &&
                    trimmedAttachmentIds.Contains(a.Id))
                .ToListAsync(cancellationToken);

            if (attachments.Count != trimmedAttachmentIds.Count)
            {
                return null;
            }

            foreach (var attachment in attachments)
            {
                attachment.RelatedEntityType = ActivityRelationType.DirectChatMessage;
                attachment.RelatedEntityId = entity.Id;
                attachment.UpdatedAtUtc = DateTime.UtcNow;
                attachmentDtos.Add(new DirectChatAttachmentDto(
                    attachment.Id,
                    attachment.FileName,
                    attachment.ContentType,
                    attachment.Size));
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = new DirectChatMessageDto(
            entity.Id,
            entity.ThreadId,
            userId,
            sender.FullName,
            entity.Content,
            entity.CreatedAtUtc,
            attachmentDtos);

        var recipientIds = participants.Select(p => p.UserId).Distinct().ToList();
        await _realtimePublisher.PublishUsersEventAsync(
            sender.TenantId,
            recipientIds,
            "chat.direct.message",
            new
            {
                messageId = dto.MessageId,
                threadId = dto.ThreadId,
                senderUserId = dto.SenderUserId,
                senderDisplayName = dto.SenderDisplayName,
                content = dto.Content,
                sentAtUtc = dto.SentAtUtc,
                attachments = dto.Attachments.Select(a => new
                {
                    attachmentId = a.AttachmentId,
                    fileName = a.FileName,
                    contentType = a.ContentType,
                    size = a.Size
                }).ToList()
            },
            cancellationToken);

        return dto;
    }

    public async Task<bool> ArchiveThreadAsync(Guid userId, Guid threadId, bool archived, CancellationToken cancellationToken = default)
    {
        var participant = await _dbContext.DirectChatParticipants
            .FirstOrDefaultAsync(p => p.ThreadId == threadId && p.UserId == userId && !p.IsDeleted, cancellationToken);
        if (participant is null)
        {
            return false;
        }

        participant.IsArchived = archived;
        participant.ArchivedAtUtc = archived ? DateTime.UtcNow : null;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> ClearThreadAsync(Guid userId, Guid threadId, CancellationToken cancellationToken = default)
    {
        var participant = await _dbContext.DirectChatParticipants
            .FirstOrDefaultAsync(p => p.ThreadId == threadId && p.UserId == userId && !p.IsDeleted, cancellationToken);
        if (participant is null)
        {
            return false;
        }

        participant.LastClearedAtUtc = DateTime.UtcNow;
        participant.LastReadAtUtc = participant.LastClearedAtUtc;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> AddParticipantAsync(Guid userId, Guid threadId, Guid participantUserId, CancellationToken cancellationToken = default)
    {
        if (threadId == Guid.Empty || participantUserId == Guid.Empty)
        {
            return false;
        }

        var actorMembership = await _dbContext.DirectChatParticipants
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.ThreadId == threadId && p.UserId == userId && !p.IsDeleted, cancellationToken);
        if (actorMembership is null)
        {
            return false;
        }

        var existing = await _dbContext.DirectChatParticipants
            .FirstOrDefaultAsync(p => p.ThreadId == threadId && p.UserId == participantUserId, cancellationToken);
        if (existing is not null)
        {
            if (existing.IsDeleted)
            {
                existing.IsDeleted = false;
                existing.IsArchived = false;
                existing.ArchivedAtUtc = null;
                await _dbContext.SaveChangesAsync(cancellationToken);
                return true;
            }

            return true;
        }

        var userExists = await _dbContext.Users
            .AsNoTracking()
            .AnyAsync(u => u.Id == participantUserId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (!userExists)
        {
            return false;
        }

        _dbContext.DirectChatParticipants.Add(new Domain.Entities.DirectChatParticipant
        {
            ThreadId = threadId,
            UserId = participantUserId,
            IsArchived = false
        });

        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> PublishTypingAsync(Guid userId, Guid threadId, bool isTyping, CancellationToken cancellationToken = default)
    {
        if (threadId == Guid.Empty)
        {
            return false;
        }

        var actorMembership = await _dbContext.DirectChatParticipants
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.ThreadId == threadId && p.UserId == userId && !p.IsDeleted, cancellationToken);
        if (actorMembership is null)
        {
            return false;
        }

        var sender = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == userId && !u.IsDeleted)
            .Select(u => new { u.Id, u.FullName, u.TenantId })
            .FirstOrDefaultAsync(cancellationToken);
        if (sender is null)
        {
            return false;
        }

        var recipientIds = await _dbContext.DirectChatParticipants
            .AsNoTracking()
            .Where(p => p.ThreadId == threadId && !p.IsDeleted && p.UserId != userId)
            .Select(p => p.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);
        if (recipientIds.Count == 0)
        {
            return true;
        }

        await _realtimePublisher.PublishUsersEventAsync(
            sender.TenantId,
            recipientIds,
            "chat.direct.typing",
            new
            {
                threadId,
                senderUserId = sender.Id,
                senderDisplayName = sender.FullName,
                isTyping
            },
            cancellationToken);

        return true;
    }
}
