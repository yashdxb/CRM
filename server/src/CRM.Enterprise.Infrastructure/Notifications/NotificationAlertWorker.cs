using System;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace CRM.Enterprise.Infrastructure.Notifications;

public sealed class NotificationAlertWorker : BackgroundService
{
    private const string LeadSlaBreachAction = "LeadSlaBreachAlert";
    private const string IdleDealAction = "IdleDealAlert";
    private const string CoachingEscalationAction = "CoachingEscalation";
    private const string SystemActor = "system";
    private static readonly TimeSpan CheckInterval = TimeSpan.FromMinutes(15);
    private const int DefaultIdleDealDays = 30;
    private const int DefaultIdleCooldownDays = 7;
    private const int DefaultCoachingCooldownDays = 7;
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<NotificationAlertWorker> _logger;

    public NotificationAlertWorker(IServiceScopeFactory scopeFactory, ILogger<NotificationAlertWorker> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await RunAlertsAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Notification alert worker failed.");
            }

            await Task.Delay(CheckInterval, stoppingToken);
        }
    }

    private async Task RunAlertsAsync(CancellationToken cancellationToken)
    {
        using var scope = _scopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CrmDbContext>();
        var tenantProvider = scope.ServiceProvider.GetRequiredService<ITenantProvider>();
        var emailSender = scope.ServiceProvider.GetRequiredService<IEmailSender>();
        var auditEvents = scope.ServiceProvider.GetRequiredService<IAuditEventService>();

        var tenants = await dbContext.Tenants.AsNoTracking().ToListAsync(cancellationToken);
        foreach (var tenant in tenants)
        {
            tenantProvider.SetTenant(tenant.Id, tenant.Key);
            await ProcessLeadSlaAlertsAsync(dbContext, emailSender, auditEvents, cancellationToken);
            await ProcessIdleDealAlertsAsync(dbContext, emailSender, auditEvents, cancellationToken);
            await ProcessCoachingEscalationsAsync(dbContext, emailSender, auditEvents, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            dbContext.ChangeTracker.Clear();
        }
    }

    private async Task ProcessLeadSlaAlertsAsync(
        CrmDbContext dbContext,
        IEmailSender emailSender,
        IAuditEventService auditEvents,
        CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var overdueLeads = await dbContext.Leads.AsNoTracking()
            .Where(lead => !lead.IsDeleted
                           && lead.FirstTouchDueAtUtc.HasValue
                           && lead.FirstTouchDueAtUtc.Value <= now
                           && !lead.FirstTouchedAtUtc.HasValue)
            .ToListAsync(cancellationToken);

        if (overdueLeads.Count == 0)
        {
            return;
        }

        var leadIds = overdueLeads.Select(lead => lead.Id).ToList();
        var alertedLeadIds = await dbContext.AuditEvents.AsNoTracking()
            .Where(audit => audit.EntityType == nameof(Lead)
                            && audit.Action == LeadSlaBreachAction
                            && leadIds.Contains(audit.EntityId))
            .Select(audit => audit.EntityId)
            .ToListAsync(cancellationToken);

        var managerUsers = await GetSalesManagersAsync(dbContext, cancellationToken);
        var ownerIds = overdueLeads.Select(lead => lead.OwnerId).Distinct().ToList();
        var owners = await GetUsersAsync(dbContext, ownerIds, cancellationToken);

        foreach (var lead in overdueLeads.Where(lead => !alertedLeadIds.Contains(lead.Id)))
        {
            if (owners.TryGetValue(lead.OwnerId, out var owner))
            {
                var settings = ResolveEmailAlertSettings(owner);
                if (settings.AlertsEnabled && settings.LeadSla)
                {
                    var subject = $"Lead SLA breach: {lead.FirstName} {lead.LastName}";
                    var body = BuildLeadSlaBody(lead, owner.FullName);
                    await SendAlertAsync(emailSender, owner.Email, subject, body, cancellationToken);
                }
            }

            foreach (var manager in managerUsers)
            {
                var settings = ResolveEmailAlertSettings(manager);
                if (!settings.AlertsEnabled || !settings.LeadSla)
                {
                    continue;
                }

                var subject = $"SLA breach (Lead): {lead.FirstName} {lead.LastName}";
                var body = BuildLeadManagerBody(lead, manager.FullName);
                await SendAlertAsync(emailSender, manager.Email, subject, body, cancellationToken);
            }

            await auditEvents.TrackAsync(
                CreateAuditEntry(nameof(Lead), lead.Id, LeadSlaBreachAction, "FirstTouchDueAtUtc", lead.FirstTouchDueAtUtc?.ToString("O")),
                cancellationToken);
        }
    }

    private async Task ProcessIdleDealAlertsAsync(
        CrmDbContext dbContext,
        IEmailSender emailSender,
        IAuditEventService auditEvents,
        CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var opportunities = await dbContext.Opportunities.AsNoTracking()
            .Where(opportunity => !opportunity.IsDeleted && !opportunity.IsClosed)
            .ToListAsync(cancellationToken);

        if (opportunities.Count == 0)
        {
            return;
        }

        var opportunityIds = opportunities.Select(opportunity => opportunity.Id).ToList();
        var activitySnapshot = await dbContext.Activities.AsNoTracking()
            .Where(activity => !activity.IsDeleted
                               && activity.RelatedEntityType == ActivityRelationType.Opportunity
                               && opportunityIds.Contains(activity.RelatedEntityId))
            .Select(activity => new
            {
                activity.RelatedEntityId,
                activity.CompletedDateUtc,
                activity.CreatedAtUtc,
                activity.DueDateUtc
            })
            .ToListAsync(cancellationToken);

        var activityLookup = activitySnapshot
            .GroupBy(activity => activity.RelatedEntityId)
            .ToDictionary(
                group => group.Key,
                group =>
                {
                    var lastAt = group.Max(a => (DateTime?)(a.CompletedDateUtc ?? a.CreatedAtUtc));
                    var nextStepDueAtUtc = group
                        .Where(a => !a.CompletedDateUtc.HasValue && a.DueDateUtc.HasValue)
                        .OrderBy(a => a.DueDateUtc)
                        .Select(a => a.DueDateUtc)
                        .FirstOrDefault();
                    return (lastAt, nextStepDueAtUtc);
                });

        var idleOpportunities = opportunities.ToList();

        var managerUsers = await GetSalesManagersAsync(dbContext, cancellationToken);
        var ownerIds = idleOpportunities.Select(opportunity => opportunity.OwnerId).Distinct().ToList();
        var owners = await GetUsersAsync(dbContext, ownerIds, cancellationToken);
        var userSettings = new Dictionary<Guid, EmailAlertSettings>();
        foreach (var owner in owners.Values)
        {
            userSettings[owner.Id] = ResolveEmailAlertSettings(owner);
        }
        foreach (var manager in managerUsers)
        {
            if (!userSettings.ContainsKey(manager.Id))
            {
                userSettings[manager.Id] = ResolveEmailAlertSettings(manager);
            }
        }

        var maxCooldownDays = userSettings.Values
            .Select(s => s.IdleDealCooldownDays)
            .DefaultIfEmpty(DefaultIdleCooldownDays)
            .Max();

        var idleIds = idleOpportunities.Select(opportunity => opportunity.Id).ToList();
        var recentAlerts = await dbContext.AuditEvents.AsNoTracking()
            .Where(audit => audit.EntityType == nameof(Opportunity)
                            && audit.Action == IdleDealAction
                            && idleIds.Contains(audit.EntityId)
                            && audit.CreatedAtUtc >= now.Subtract(TimeSpan.FromDays(maxCooldownDays)))
            .Select(audit => new { audit.EntityId, audit.CreatedAtUtc })
            .ToListAsync(cancellationToken);
        var recentAlertLookup = recentAlerts
            .GroupBy(a => a.EntityId)
            .ToDictionary(g => g.Key, g => g.Max(x => x.CreatedAtUtc));

        foreach (var opportunity in idleOpportunities)
        {
            activityLookup.TryGetValue(opportunity.Id, out var activityInfo);
            var lastActivityAtUtc = activityInfo.lastAt;
            var nextStepDueAtUtc = activityInfo.nextStepDueAtUtc;
            var referenceAtUtc = lastActivityAtUtc ?? opportunity.CreatedAtUtc;
            var sentAny = false;
            if (owners.TryGetValue(opportunity.OwnerId, out var owner))
            {
                if (userSettings.TryGetValue(owner.Id, out var settings)
                    && settings.AlertsEnabled
                    && settings.IdleDeal
                    && (ShouldAlertForNoNextStep(settings, nextStepDueAtUtc)
                        || ShouldAlertForNoActivity(settings, now, referenceAtUtc))
                    && !WasAlertedRecently(recentAlertLookup, opportunity.Id, now, settings.IdleDealCooldownDays))
                {
                    var reason = BuildIdleDealReason(settings, now, referenceAtUtc, nextStepDueAtUtc);
                    var subject = $"Idle deal alert: {opportunity.Name}";
                    var body = BuildIdleDealBody(opportunity, lastActivityAtUtc, owner.FullName, reason);
                    await SendAlertAsync(emailSender, owner.Email, subject, body, cancellationToken);
                    sentAny = true;
                }
            }

            foreach (var manager in managerUsers)
            {
                if (!userSettings.TryGetValue(manager.Id, out var settings)
                    || !settings.AlertsEnabled
                    || !settings.IdleDeal
                    || (!ShouldAlertForNoNextStep(settings, nextStepDueAtUtc)
                        && !ShouldAlertForNoActivity(settings, now, referenceAtUtc))
                    || WasAlertedRecently(recentAlertLookup, opportunity.Id, now, settings.IdleDealCooldownDays))
                {
                    continue;
                }

                var reason = BuildIdleDealReason(settings, now, referenceAtUtc, nextStepDueAtUtc);
                var subject = $"Idle deal alert: {opportunity.Name}";
                var body = BuildIdleDealManagerBody(opportunity, lastActivityAtUtc, manager.FullName, reason);
                await SendAlertAsync(emailSender, manager.Email, subject, body, cancellationToken);
                sentAny = true;
            }

            if (sentAny)
            {
                await auditEvents.TrackAsync(
                    CreateAuditEntry(nameof(Opportunity), opportunity.Id, IdleDealAction, "LastActivityAtUtc", lastActivityAtUtc?.ToString("O")),
                    cancellationToken);
            }
        }
    }

    private async Task ProcessCoachingEscalationsAsync(
        CrmDbContext dbContext,
        IEmailSender emailSender,
        IAuditEventService auditEvents,
        CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var overdueTasks = await dbContext.Activities.AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.Type == ActivityType.Task
                        && a.CompletedDateUtc == null
                        && a.DueDateUtc.HasValue
                        && a.DueDateUtc.Value < now
                        && a.Subject.StartsWith("Coaching:"))
            .Select(a => new
            {
                a.Id,
                a.Subject,
                a.DueDateUtc,
                a.OwnerId,
                a.RelatedEntityId
            })
            .ToListAsync(cancellationToken);

        if (overdueTasks.Count == 0)
        {
            return;
        }

        var taskIds = overdueTasks.Select(t => t.Id).ToList();
        var managers = await GetSalesManagersAsync(dbContext, cancellationToken);
        var managerLookup = managers
            .Select(manager => new { Manager = manager, Settings = ResolveEmailAlertSettings(manager) })
            .Where(x => x.Settings.AlertsEnabled && x.Settings.CoachingEscalation)
            .ToList();
        var maxCooldownDays = managerLookup
            .Select(x => x.Settings.CoachingEscalationCooldownDays)
            .DefaultIfEmpty(DefaultCoachingCooldownDays)
            .Max();
        var escalatedRows = await dbContext.AuditEvents.AsNoTracking()
            .Where(a => a.EntityType == "Activity"
                        && a.Action == CoachingEscalationAction
                        && taskIds.Contains(a.EntityId)
                        && a.CreatedAtUtc >= now.Subtract(TimeSpan.FromDays(maxCooldownDays)))
            .Select(a => new { a.EntityId, a.CreatedAtUtc })
            .ToListAsync(cancellationToken);
        var escalatedLookup = escalatedRows
            .GroupBy(a => a.EntityId)
            .ToDictionary(g => g.Key, g => g.Max(x => x.CreatedAtUtc));
        var ownerIds = overdueTasks.Select(t => t.OwnerId).Distinct().ToList();
        var owners = await GetUsersAsync(dbContext, ownerIds, cancellationToken);

        var opportunityIds = overdueTasks.Select(t => t.RelatedEntityId).Distinct().ToList();
        var opportunities = await dbContext.Opportunities.AsNoTracking()
            .Where(o => opportunityIds.Contains(o.Id))
            .Select(o => new { o.Id, o.Name })
            .ToDictionaryAsync(o => o.Id, o => o.Name, cancellationToken);

        foreach (var task in overdueTasks)
        {
            var ownerName = owners.TryGetValue(task.OwnerId, out var owner) ? owner.FullName : "Rep";
            var opportunityName = opportunities.TryGetValue(task.RelatedEntityId, out var name) ? name : "Opportunity";
            var dueAt = task.DueDateUtc?.ToString("yyyy-MM-dd HH:mm 'UTC'") ?? "N/A";
            var subject = $"Coaching SLA overdue: {opportunityName}";
            var body = $"<p>Coaching task for <strong>{opportunityName}</strong> assigned to {ownerName} is overdue. Due: {dueAt}.</p>";

            var sentAny = false;
            foreach (var manager in managerLookup)
            {
                if (WasAlertedRecently(escalatedLookup, task.Id, now, manager.Settings.CoachingEscalationCooldownDays))
                {
                    continue;
                }

                await SendAlertAsync(emailSender, manager.Manager.Email, subject, body, cancellationToken);
                sentAny = true;
            }

            if (sentAny)
            {
                await auditEvents.TrackAsync(
                    CreateAuditEntry("Activity", task.Id, CoachingEscalationAction, "CoachingTask", null),
                    cancellationToken);
            }
        }
    }

    private static async Task<Dictionary<Guid, User>> GetUsersAsync(
        CrmDbContext dbContext,
        IEnumerable<Guid> userIds,
        CancellationToken cancellationToken)
    {
        return await dbContext.Users.AsNoTracking()
            .Where(user => userIds.Contains(user.Id) && !user.IsDeleted && user.IsActive)
            .ToDictionaryAsync(user => user.Id, cancellationToken);
    }

    private static async Task<List<User>> GetSalesManagersAsync(CrmDbContext dbContext, CancellationToken cancellationToken)
    {
        var role = await dbContext.Roles.AsNoTracking()
            .FirstOrDefaultAsync(r => r.Name == "Sales Manager" && !r.IsDeleted, cancellationToken);

        if (role is null)
        {
            return new List<User>();
        }

        var userIds = await dbContext.UserRoles.AsNoTracking()
            .Where(userRole => userRole.RoleId == role.Id && !userRole.IsDeleted)
            .Select(userRole => userRole.UserId)
            .ToListAsync(cancellationToken);

        if (userIds.Count == 0)
        {
            return new List<User>();
        }

        return await dbContext.Users.AsNoTracking()
            .Where(user => userIds.Contains(user.Id) && !user.IsDeleted && user.IsActive)
            .ToListAsync(cancellationToken);
    }

    private static AuditEventEntry CreateAuditEntry(
        string entityType,
        Guid entityId,
        string action,
        string? field,
        string? value)
    {
        return new AuditEventEntry(entityType, entityId, action, field, null, value, null, SystemActor);
    }

    private static async Task SendAlertAsync(
        IEmailSender emailSender,
        string? toEmail,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(toEmail))
        {
            return;
        }

        await emailSender.SendAsync(toEmail, subject, htmlBody, htmlBody, cancellationToken);
    }

    private sealed record EmailAlertSettings(
        bool AlertsEnabled,
        bool LeadSla,
        bool IdleDeal,
        bool IdleDealNoNextStep,
        bool IdleDealNoActivity,
        bool CoachingEscalation,
        int IdleDealDays,
        int IdleDealCooldownDays,
        int CoachingEscalationCooldownDays);

    private static EmailAlertSettings ResolveEmailAlertSettings(User user)
    {
        if (string.IsNullOrWhiteSpace(user.NotificationPreferencesJson))
        {
            return DefaultEmailAlertSettings();
        }

        try
        {
            using var document = JsonDocument.Parse(user.NotificationPreferencesJson);
            var alertsEnabled = document.RootElement.TryGetProperty("alertsEnabled", out var enabled)
                ? enabled.ValueKind == JsonValueKind.True
                : false;
            if (!document.RootElement.TryGetProperty("emailAlerts", out var emailAlerts))
            {
                return DefaultEmailAlertSettings(alertsEnabled);
            }

            var leadSla = emailAlerts.TryGetProperty("leadSla", out var leadValue) && leadValue.ValueKind == JsonValueKind.True;
            var idleDeal = emailAlerts.TryGetProperty("idleDeal", out var idleValue) && idleValue.ValueKind == JsonValueKind.True;
            var idleDealNoNextStep = emailAlerts.TryGetProperty("idleDealNoNextStep", out var idleNextStepValue)
                                     && idleNextStepValue.ValueKind == JsonValueKind.True;
            var idleDealNoActivity = emailAlerts.TryGetProperty("idleDealNoActivity", out var idleActivityValue)
                                     && idleActivityValue.ValueKind == JsonValueKind.True;
            var coaching = emailAlerts.TryGetProperty("coachingEscalation", out var coachingValue) && coachingValue.ValueKind == JsonValueKind.True;
            var idleDays = emailAlerts.TryGetProperty("idleDealDays", out var idleDaysValue) && idleDaysValue.TryGetInt32(out var idleDaysParsed)
                ? idleDaysParsed
                : DefaultIdleDealDays;
            var idleCooldown = emailAlerts.TryGetProperty("idleDealCooldownDays", out var idleCooldownValue) && idleCooldownValue.TryGetInt32(out var idleCooldownParsed)
                ? idleCooldownParsed
                : DefaultIdleCooldownDays;
            var coachingCooldown = emailAlerts.TryGetProperty("coachingEscalationCooldownDays", out var coachingCooldownValue)
                                   && coachingCooldownValue.TryGetInt32(out var coachingCooldownParsed)
                ? coachingCooldownParsed
                : DefaultCoachingCooldownDays;

            return new EmailAlertSettings(
                alertsEnabled,
                leadSla,
                idleDeal,
                idleDealNoNextStep,
                idleDealNoActivity,
                coaching,
                Math.Max(1, idleDays),
                Math.Max(1, idleCooldown),
                Math.Max(1, coachingCooldown));
        }
        catch
        {
            return DefaultEmailAlertSettings();
        }
    }

    private static EmailAlertSettings DefaultEmailAlertSettings(bool alertsEnabled = false)
    {
        return new EmailAlertSettings(
            alertsEnabled,
            LeadSla: false,
            IdleDeal: false,
            IdleDealNoNextStep: false,
            IdleDealNoActivity: false,
            CoachingEscalation: false,
            IdleDealDays: DefaultIdleDealDays,
            IdleDealCooldownDays: DefaultIdleCooldownDays,
            CoachingEscalationCooldownDays: DefaultCoachingCooldownDays);
    }

    private static bool WasAlertedRecently(
        IReadOnlyDictionary<Guid, DateTime> alerts,
        Guid entityId,
        DateTime now,
        int cooldownDays)
    {
        if (!alerts.TryGetValue(entityId, out var lastAlert))
        {
            return false;
        }

        return now - lastAlert < TimeSpan.FromDays(Math.Max(1, cooldownDays));
    }

    private static string BuildLeadSlaBody(Lead lead, string recipientName)
    {
        var leadName = $"{lead.FirstName} {lead.LastName}".Trim();
        var dueAt = lead.FirstTouchDueAtUtc?.ToString("yyyy-MM-dd HH:mm 'UTC'") ?? "N/A";
        var company = string.IsNullOrWhiteSpace(lead.CompanyName) ? "Unknown company" : lead.CompanyName;
        return $"<p>Hi {recipientName},</p><p>The lead <strong>{leadName}</strong> ({company}) has missed the first-touch SLA. Due: {dueAt}.</p>";
    }

    private static string BuildLeadManagerBody(Lead lead, string recipientName)
    {
        var leadName = $"{lead.FirstName} {lead.LastName}".Trim();
        var dueAt = lead.FirstTouchDueAtUtc?.ToString("yyyy-MM-dd HH:mm 'UTC'") ?? "N/A";
        var company = string.IsNullOrWhiteSpace(lead.CompanyName) ? "Unknown company" : lead.CompanyName;
        return $"<p>Hi {recipientName},</p><p>Lead SLA breach for <strong>{leadName}</strong> ({company}). Owner ID: {lead.OwnerId}. Due: {dueAt}.</p>";
    }

    private static bool ShouldAlertForNoNextStep(EmailAlertSettings settings, DateTime? nextStepDueAtUtc)
    {
        return settings.IdleDealNoNextStep && !nextStepDueAtUtc.HasValue;
    }

    private static bool ShouldAlertForNoActivity(EmailAlertSettings settings, DateTime now, DateTime referenceAtUtc)
    {
        return settings.IdleDealNoActivity && now - referenceAtUtc > TimeSpan.FromDays(settings.IdleDealDays);
    }

    private static string BuildIdleDealReason(EmailAlertSettings settings, DateTime now, DateTime referenceAtUtc, DateTime? nextStepDueAtUtc)
    {
        if (settings.IdleDealNoNextStep && !nextStepDueAtUtc.HasValue)
        {
            return "No next step scheduled.";
        }

        if (settings.IdleDealNoActivity && now - referenceAtUtc > TimeSpan.FromDays(settings.IdleDealDays))
        {
            return $"No activity for {settings.IdleDealDays} days.";
        }

        return "Idle deal alert triggered.";
    }

    private static string BuildIdleDealBody(Opportunity opportunity, DateTime? lastActivityAtUtc, string recipientName, string reason)
    {
        var lastActivity = lastActivityAtUtc?.ToString("yyyy-MM-dd HH:mm 'UTC'") ?? "No activity logged";
        return $"<p>Hi {recipientName},</p><p>The opportunity <strong>{opportunity.Name}</strong> appears idle.</p><p>Reason: {reason}</p><p>Last activity: {lastActivity}.</p>";
    }

    private static string BuildIdleDealManagerBody(Opportunity opportunity, DateTime? lastActivityAtUtc, string recipientName, string reason)
    {
        var lastActivity = lastActivityAtUtc?.ToString("yyyy-MM-dd HH:mm 'UTC'") ?? "No activity logged";
        return $"<p>Hi {recipientName},</p><p>Idle deal alert for <strong>{opportunity.Name}</strong>.</p><p>Reason: {reason}</p><p>Owner ID: {opportunity.OwnerId}. Last activity: {lastActivity}.</p>";
    }
}
