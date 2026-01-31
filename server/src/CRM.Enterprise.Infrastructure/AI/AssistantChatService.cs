using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.AI;

public sealed class AssistantChatService : IAssistantChatService
{
    private static readonly TimeSpan MinRequestInterval = TimeSpan.FromSeconds(10);
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly FoundryAgentClient _client;
    private readonly bool _isDevelopment;

    public AssistantChatService(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        FoundryAgentClient client,
        IHostEnvironment hostEnvironment)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _client = client;
        _isDevelopment = hostEnvironment.IsDevelopment();
    }

    public async Task<IReadOnlyList<AssistantChatMessage>> GetHistoryAsync(
        Guid userId,
        CancellationToken cancellationToken,
        int take = 50)
    {
        var tenantId = _tenantProvider.TenantId;
        var messages = await _dbContext.AssistantMessages
            .AsNoTracking()
            .Where(m => m.TenantId == tenantId && m.UserId == userId && !m.IsDeleted)
            .OrderByDescending(m => m.CreatedAtUtc)
            .Take(Math.Clamp(take, 1, 200))
            .Select(m => new AssistantChatMessage(m.Id, m.Role, m.Content, m.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        messages.Reverse();
        return messages;
    }

    public async Task<AssistantChatResult> SendAsync(Guid userId, string message, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var normalized = message.Trim();
        if (string.IsNullOrWhiteSpace(normalized))
        {
            throw new InvalidOperationException("Message cannot be empty.");
        }

        var lastMessageAt = await _dbContext.AssistantMessages
            .AsNoTracking()
            .Where(m => m.TenantId == tenantId && m.UserId == userId && !m.IsDeleted)
            .OrderByDescending(m => m.CreatedAtUtc)
            .Select(m => (DateTime?)m.CreatedAtUtc)
            .FirstOrDefaultAsync(cancellationToken);

        if (lastMessageAt.HasValue)
        {
            var elapsed = DateTime.UtcNow - lastMessageAt.Value;
            if (elapsed < MinRequestInterval)
            {
                var waitSeconds = (int)Math.Ceiling((MinRequestInterval - elapsed).TotalSeconds);
                throw new AssistantRateLimitException(Math.Max(waitSeconds, 1));
            }
        }

        if (!_client.IsConfigured)
        {
            if (!_isDevelopment)
            {
                throw new InvalidOperationException("Foundry agent is not configured.");
            }

            var devReply =
                "Dev mode: the Foundry agent is not configured, so this is a local response. " +
                "Set FoundryAgent settings to enable real replies.";

            var devUserMessage = new AssistantMessage
            {
                TenantId = tenantId,
                UserId = userId,
                Role = "user",
                Content = normalized,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "system"
            };

            var devAssistantMessage = new AssistantMessage
            {
                TenantId = tenantId,
                UserId = userId,
                Role = "assistant",
                Content = devReply,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "system"
            };

            _dbContext.AssistantMessages.AddRange(devUserMessage, devAssistantMessage);
            await _dbContext.SaveChangesAsync(cancellationToken);

            var devHistory = await GetHistoryAsync(userId, cancellationToken, 50);
            return new AssistantChatResult(devReply, devHistory);
        }

        var thread = await _dbContext.AssistantThreads
            .FirstOrDefaultAsync(t => t.TenantId == tenantId && t.UserId == userId && !t.IsDeleted, cancellationToken);

        if (thread is null)
        {
            thread = new AssistantThread
            {
                TenantId = tenantId,
                UserId = userId,
                ThreadId = await _client.CreateThreadAsync(cancellationToken),
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "system"
            };

            _dbContext.AssistantThreads.Add(thread);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        await _client.AddMessageAsync(thread.ThreadId, "user", normalized, cancellationToken);
        string reply;
        try
        {
            reply = await _client.RunAndGetReplyAsync(thread.ThreadId, cancellationToken);
        }
        catch (InvalidOperationException ex) when (TryParseRetryAfter(ex.Message, out var retryAfterSeconds))
        {
            throw new AssistantRateLimitException(retryAfterSeconds);
        }

        var userMessage = new AssistantMessage
        {
            TenantId = tenantId,
            UserId = userId,
            Role = "user",
            Content = normalized,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "system"
        };

        var assistantMessage = new AssistantMessage
        {
            TenantId = tenantId,
            UserId = userId,
            Role = "assistant",
            Content = reply,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "system"
        };

        _dbContext.AssistantMessages.AddRange(userMessage, assistantMessage);
        thread.UpdatedAtUtc = DateTime.UtcNow;
        thread.UpdatedBy = "system";
        await _dbContext.SaveChangesAsync(cancellationToken);

        var history = await GetHistoryAsync(userId, cancellationToken, 50);
        return new AssistantChatResult(reply, history);
    }

    private static bool TryParseRetryAfter(string? message, out int retryAfterSeconds)
    {
        retryAfterSeconds = 0;
        if (string.IsNullOrWhiteSpace(message))
        {
            return false;
        }

        if (!message.Contains("rate_limit", StringComparison.OrdinalIgnoreCase)
            && !message.Contains("rate limit", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        var match = System.Text.RegularExpressions.Regex.Match(
            message,
            @"retry after\s+(\d+)\s+seconds",
            System.Text.RegularExpressions.RegexOptions.IgnoreCase);

        if (match.Success && int.TryParse(match.Groups[1].Value, out var parsed))
        {
            retryAfterSeconds = Math.Max(parsed, 1);
            return true;
        }

        retryAfterSeconds = 10;
        return true;
    }
}
