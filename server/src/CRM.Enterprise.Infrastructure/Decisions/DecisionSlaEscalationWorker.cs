using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Application.Decisions;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.Decisions;

public sealed class DecisionSlaEscalationWorker : BackgroundService
{
    private static readonly TimeSpan PollInterval = TimeSpan.FromMinutes(2);
    private const string EscalationAction = "ApprovalSlaEscalated";
    private const string SalesManagerRoleName = "Sales Manager";

    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<DecisionSlaEscalationWorker> _logger;

    public DecisionSlaEscalationWorker(
        IServiceScopeFactory scopeFactory,
        ILogger<DecisionSlaEscalationWorker> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Delay slightly to avoid competing with startup migrations and seed routines.
        await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await RunPassAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Decision SLA escalation worker pass failed.");
            }

            await Task.Delay(PollInterval, stoppingToken);
        }
    }

    private async Task RunPassAsync(CancellationToken cancellationToken)
    {
        using var scope = _scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
        var tenantProvider = scope.ServiceProvider.GetRequiredService<ITenantProvider>();
        var emailSender = scope.ServiceProvider.GetRequiredService<IEmailSender>();

        var tenants = await db.Tenants.AsNoTracking().ToListAsync(cancellationToken);
        foreach (var tenant in tenants)
        {
            tenantProvider.SetTenant(tenant.Id, tenant.Key);
            var escalationPolicy = ResolveDecisionEscalationPolicy(tenant);
            var escalatedCount = await RunTenantPassAsync(db, emailSender, escalationPolicy, cancellationToken);
            if (escalatedCount > 0)
            {
                _logger.LogInformation(
                    "Decision SLA escalation worker escalated {Count} decision(s) for tenant {TenantKey}.",
                    escalatedCount,
                    tenant.Key);
            }
            db.ChangeTracker.Clear();
        }
    }

    private static bool IsClosedStatus(string? status)
    {
        return string.Equals(status, "Approved", StringComparison.OrdinalIgnoreCase)
               || string.Equals(status, "Rejected", StringComparison.OrdinalIgnoreCase)
               || string.Equals(status, "Cancelled", StringComparison.OrdinalIgnoreCase)
               || string.Equals(status, "Expired", StringComparison.OrdinalIgnoreCase);
    }

    private async Task<int> RunTenantPassAsync(
        CrmDbContext db,
        IEmailSender emailSender,
        DecisionEscalationPolicy escalationPolicy,
        CancellationToken cancellationToken)
    {
        if (!escalationPolicy.Enabled)
        {
            return 0;
        }

        var nowUtc = DateTime.UtcNow;
        var overdueIds = await db.DecisionRequests
            .AsNoTracking()
            .Where(r => !r.IsDeleted && r.DueAtUtc.HasValue && r.DueAtUtc < nowUtc && !IsClosedStatus(r.Status))
            .Select(r => r.Id)
            .ToListAsync(cancellationToken);

        if (overdueIds.Count == 0)
        {
            return 0;
        }

        var alreadyEscalated = await db.DecisionActionLogs
            .AsNoTracking()
            .Where(a => !a.IsDeleted && a.Action == EscalationAction && overdueIds.Contains(a.DecisionRequestId))
            .Select(a => a.DecisionRequestId)
            .Distinct()
            .ToListAsync(cancellationToken);

        var missingIds = overdueIds.Except(alreadyEscalated).ToList();
        if (missingIds.Count == 0)
        {
            return 0;
        }

        var decisions = await db.DecisionRequests
            .Include(r => r.Steps)
            .Where(r => missingIds.Contains(r.Id) && !r.IsDeleted)
            .ToListAsync(cancellationToken);

        var assigneeIds = decisions
            .SelectMany(d => d.Steps.Where(s => !s.IsDeleted))
            .Where(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase))
            .Select(s => s.AssigneeUserId)
            .Where(id => id.HasValue)
            .Select(id => id!.Value)
            .Distinct()
            .ToList();

        var approverRoles = decisions
            .SelectMany(d => d.Steps.Where(s => !s.IsDeleted))
            .Where(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase))
            .Select(s => s.ApproverRole)
            .Where(role => !string.IsNullOrWhiteSpace(role))
            .Select(role => role!.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var fallbackRoleName = string.IsNullOrWhiteSpace(escalationPolicy.FallbackRoleName)
            ? SalesManagerRoleName
            : escalationPolicy.FallbackRoleName.Trim();

        var fallbackRoles = approverRoles
            .Concat(new[] { fallbackRoleName })
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var userLookup = assigneeIds.Count == 0
            ? new Dictionary<Guid, (string Name, string Email)>()
            : await db.Users
                .AsNoTracking()
                .Where(u => !u.IsDeleted && u.IsActive && assigneeIds.Contains(u.Id) && !string.IsNullOrWhiteSpace(u.Email))
                .Select(u => new { u.Id, u.FullName, u.Email })
                .ToDictionaryAsync(u => u.Id, u => (Name: u.FullName, Email: u.Email), cancellationToken);

        Dictionary<string, List<(Guid UserId, string Name, string Email)>> roleRecipientLookup;
        if (fallbackRoles.Count == 0)
        {
            roleRecipientLookup = new Dictionary<string, List<(Guid UserId, string Name, string Email)>>(StringComparer.OrdinalIgnoreCase);
        }
        else
        {
            var roleRows = await (
                from ur in db.UserRoles.AsNoTracking()
                join role in db.Roles.AsNoTracking() on ur.RoleId equals role.Id
                join user in db.Users.AsNoTracking() on ur.UserId equals user.Id
                where !ur.IsDeleted &&
                      !role.IsDeleted &&
                      !user.IsDeleted &&
                      user.IsActive &&
                      !string.IsNullOrWhiteSpace(user.Email) &&
                      fallbackRoles.Contains(role.Name)
                select new { RoleName = role.Name, user.Id, user.FullName, user.Email })
                .ToListAsync(cancellationToken);

            roleRecipientLookup = roleRows
                .GroupBy(x => x.RoleName, StringComparer.OrdinalIgnoreCase)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => (UserId: x.Id, Name: x.FullName, Email: x.Email))
                          .Distinct()
                          .ToList(),
                    StringComparer.OrdinalIgnoreCase);
        }

        var logs = new List<DecisionActionLog>(decisions.Count);
        foreach (var decision in decisions)
        {
            decision.Priority = string.Equals(decision.Priority, "critical", StringComparison.OrdinalIgnoreCase)
                ? decision.Priority
                : "critical";
            decision.UpdatedAtUtc = nowUtc;
            decision.UpdatedBy = "system";

            var pendingStep = decision.Steps
                .Where(s => !s.IsDeleted)
                .OrderBy(s => s.StepOrder)
                .FirstOrDefault(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase));

            var notifiedEmails = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var recipients = new List<(string Name, string Email, string Reason)>();

            if (escalationPolicy.NotifyCurrentAssignee &&
                pendingStep?.AssigneeUserId is Guid assigneeId &&
                userLookup.TryGetValue(assigneeId, out var assigneeUser))
            {
                recipients.Add((assigneeUser.Name, assigneeUser.Email, "current assignee"));
                notifiedEmails.Add(assigneeUser.Email);
            }

            if (escalationPolicy.NotifyPendingStepRole &&
                pendingStep is not null &&
                !string.IsNullOrWhiteSpace(pendingStep.ApproverRole) &&
                roleRecipientLookup.TryGetValue(pendingStep.ApproverRole.Trim(), out var approverRoleUsers))
            {
                foreach (var candidate in approverRoleUsers)
                {
                    if (notifiedEmails.Add(candidate.Email))
                    {
                        recipients.Add((candidate.Name, candidate.Email, $"approver role ({pendingStep.ApproverRole})"));
                    }
                }
            }

            if (recipients.Count == 0 &&
                roleRecipientLookup.TryGetValue(fallbackRoleName, out var salesManagers))
            {
                foreach (var manager in salesManagers)
                {
                    if (notifiedEmails.Add(manager.Email))
                    {
                        recipients.Add((manager.Name, manager.Email, $"fallback role ({fallbackRoleName})"));
                    }
                }
            }

            if (escalationPolicy.SendEmailNotifications)
            {
                foreach (var recipient in recipients)
                {
                    var subject = $"Decision escalated: {decision.Type} for {decision.EntityType}";
                    var htmlBody =
                        $"<p>Hello {System.Net.WebUtility.HtmlEncode(recipient.Name)},</p>" +
                        $"<p>A pending decision has been escalated because its SLA is overdue.</p>" +
                        $"<ul>" +
                        $"<li><strong>Decision type:</strong> {System.Net.WebUtility.HtmlEncode(decision.Type)}</li>" +
                        $"<li><strong>Entity:</strong> {System.Net.WebUtility.HtmlEncode(decision.EntityType)} ({decision.EntityId})</li>" +
                        $"<li><strong>Due at (UTC):</strong> {decision.DueAtUtc:O}</li>" +
                        $"<li><strong>Policy reason:</strong> {System.Net.WebUtility.HtmlEncode(decision.PolicyReason ?? "Decision review required.")}</li>" +
                        $"<li><strong>Escalation recipient reason:</strong> {System.Net.WebUtility.HtmlEncode(recipient.Reason)}</li>" +
                        $"</ul>" +
                        "<p>Please review the item in Decision Inbox immediately.</p>";
                    var textBody =
                        $"Decision escalated: {decision.Type} for {decision.EntityType} ({decision.EntityId}). " +
                        $"Due at UTC: {decision.DueAtUtc:O}. " +
                        $"Policy reason: {decision.PolicyReason ?? "Decision review required."}. " +
                        $"Recipient reason: {recipient.Reason}.";

                    await emailSender.SendAsync(recipient.Email, subject, htmlBody, textBody, cancellationToken);
                }
            }

            logs.Add(new DecisionActionLog
            {
                DecisionRequestId = decision.Id,
                Action = EscalationAction,
                ActorUserId = null,
                ActorName = "system",
                Notes = "SLA overdue. Decision escalated automatically by worker.",
                Field = "SlaStatus",
                OldValue = "overdue",
                NewValue = "escalated",
                ActionAtUtc = nowUtc,
                CreatedAtUtc = nowUtc,
                CreatedBy = "system"
            });
        }

        if (logs.Count == 0)
        {
            return 0;
        }

        db.DecisionActionLogs.AddRange(logs);
        await db.SaveChangesAsync(cancellationToken);
        return logs.Count;
    }

    private static DecisionEscalationPolicy ResolveDecisionEscalationPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.DecisionEscalationPolicyJson))
        {
            return DecisionEscalationPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = System.Text.Json.JsonSerializer.Deserialize<DecisionEscalationPolicy>(tenant.DecisionEscalationPolicyJson);
            return DecisionEscalationPolicyDefaults.Normalize(parsed);
        }
        catch (System.Text.Json.JsonException)
        {
            return DecisionEscalationPolicyDefaults.CreateDefault();
        }
    }
}
