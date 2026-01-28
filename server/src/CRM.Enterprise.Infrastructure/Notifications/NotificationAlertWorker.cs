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

namespace CRM.Enterprise.Infrastructure.Notifications;

public sealed class NotificationAlertWorker : BackgroundService
{
    private const string LeadSlaBreachAction = "LeadSlaBreachAlert";
    private const string IdleDealAction = "IdleDealAlert";
    private const string CoachingEscalationAction = "CoachingEscalation";
    private const string SystemActor = "system";
    private static readonly TimeSpan CheckInterval = TimeSpan.FromMinutes(15);
    private static readonly TimeSpan IdleDealThreshold = TimeSpan.FromDays(30);
    private static readonly TimeSpan IdleAlertCooldown = TimeSpan.FromDays(7);
    private static readonly TimeSpan CoachingEscalationCooldown = TimeSpan.FromDays(7);

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
                var subject = $"Lead SLA breach: {lead.FirstName} {lead.LastName}";
                var body = BuildLeadSlaBody(lead, owner.FullName);
                await SendAlertAsync(emailSender, owner.Email, subject, body, cancellationToken);
            }

            foreach (var manager in managerUsers)
            {
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
        var lastActivities = await dbContext.Activities.AsNoTracking()
            .Where(activity => !activity.IsDeleted
                               && activity.RelatedEntityType == ActivityRelationType.Opportunity
                               && opportunityIds.Contains(activity.RelatedEntityId))
            .GroupBy(activity => activity.RelatedEntityId)
            .Select(group => new { OpportunityId = group.Key, LastAt = group.Max(a => a.CompletedDateUtc ?? a.CreatedAtUtc) })
            .ToDictionaryAsync(entry => entry.OpportunityId, entry => (DateTime?)entry.LastAt, cancellationToken);

        var idleOpportunities = opportunities.Where(opportunity =>
        {
            var lastActivityAtUtc = lastActivities.GetValueOrDefault(opportunity.Id);
            var referenceAtUtc = lastActivityAtUtc ?? opportunity.CreatedAtUtc;
            return now - referenceAtUtc > IdleDealThreshold;
        }).ToList();

        if (idleOpportunities.Count == 0)
        {
            return;
        }

        var idleIds = idleOpportunities.Select(opportunity => opportunity.Id).ToList();
        var alertedIds = await dbContext.AuditEvents.AsNoTracking()
            .Where(audit => audit.EntityType == nameof(Opportunity)
                            && audit.Action == IdleDealAction
                            && idleIds.Contains(audit.EntityId)
                            && audit.CreatedAtUtc >= now.Subtract(IdleAlertCooldown))
            .Select(audit => audit.EntityId)
            .ToListAsync(cancellationToken);

        var managerUsers = await GetSalesManagersAsync(dbContext, cancellationToken);
        var ownerIds = idleOpportunities.Select(opportunity => opportunity.OwnerId).Distinct().ToList();
        var owners = await GetUsersAsync(dbContext, ownerIds, cancellationToken);

        foreach (var opportunity in idleOpportunities.Where(opportunity => !alertedIds.Contains(opportunity.Id)))
        {
            var lastActivityAtUtc = lastActivities.GetValueOrDefault(opportunity.Id);
            if (owners.TryGetValue(opportunity.OwnerId, out var owner))
            {
                var subject = $"Idle deal alert: {opportunity.Name}";
                var body = BuildIdleDealBody(opportunity, lastActivityAtUtc, owner.FullName);
                await SendAlertAsync(emailSender, owner.Email, subject, body, cancellationToken);
            }

            foreach (var manager in managerUsers)
            {
                var subject = $"Idle deal alert: {opportunity.Name}";
                var body = BuildIdleDealManagerBody(opportunity, lastActivityAtUtc, manager.FullName);
                await SendAlertAsync(emailSender, manager.Email, subject, body, cancellationToken);
            }

            await auditEvents.TrackAsync(
                CreateAuditEntry(nameof(Opportunity), opportunity.Id, IdleDealAction, "LastActivityAtUtc", lastActivityAtUtc?.ToString("O")),
                cancellationToken);
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
        var escalatedIds = await dbContext.AuditEvents.AsNoTracking()
            .Where(a => a.EntityType == "Activity"
                        && a.Action == CoachingEscalationAction
                        && taskIds.Contains(a.EntityId)
                        && a.CreatedAtUtc >= now.Subtract(CoachingEscalationCooldown))
            .Select(a => a.EntityId)
            .ToListAsync(cancellationToken);

        var managers = await GetSalesManagersAsync(dbContext, cancellationToken);
        var ownerIds = overdueTasks.Select(t => t.OwnerId).Distinct().ToList();
        var owners = await GetUsersAsync(dbContext, ownerIds, cancellationToken);

        var opportunityIds = overdueTasks.Select(t => t.RelatedEntityId).Distinct().ToList();
        var opportunities = await dbContext.Opportunities.AsNoTracking()
            .Where(o => opportunityIds.Contains(o.Id))
            .Select(o => new { o.Id, o.Name })
            .ToDictionaryAsync(o => o.Id, o => o.Name, cancellationToken);

        foreach (var task in overdueTasks.Where(t => !escalatedIds.Contains(t.Id)))
        {
            var ownerName = owners.TryGetValue(task.OwnerId, out var owner) ? owner.FullName : "Rep";
            var opportunityName = opportunities.TryGetValue(task.RelatedEntityId, out var name) ? name : "Opportunity";
            var dueAt = task.DueDateUtc?.ToString("yyyy-MM-dd HH:mm 'UTC'") ?? "N/A";
            var subject = $"Coaching SLA overdue: {opportunityName}";
            var body = $"<p>Coaching task for <strong>{opportunityName}</strong> assigned to {ownerName} is overdue. Due: {dueAt}.</p>";

            foreach (var manager in managers)
            {
                await SendAlertAsync(emailSender, manager.Email, subject, body, cancellationToken);
            }

            await auditEvents.TrackAsync(
                CreateAuditEntry("Activity", task.Id, CoachingEscalationAction, "CoachingTask", null),
                cancellationToken);
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

    private static string BuildIdleDealBody(Opportunity opportunity, DateTime? lastActivityAtUtc, string recipientName)
    {
        var lastActivity = lastActivityAtUtc?.ToString("yyyy-MM-dd HH:mm 'UTC'") ?? "No activity logged";
        return $"<p>Hi {recipientName},</p><p>The opportunity <strong>{opportunity.Name}</strong> appears idle. Last activity: {lastActivity}.</p>";
    }

    private static string BuildIdleDealManagerBody(Opportunity opportunity, DateTime? lastActivityAtUtc, string recipientName)
    {
        var lastActivity = lastActivityAtUtc?.ToString("yyyy-MM-dd HH:mm 'UTC'") ?? "No activity logged";
        return $"<p>Hi {recipientName},</p><p>Idle deal alert for <strong>{opportunity.Name}</strong>. Owner ID: {opportunity.OwnerId}. Last activity: {lastActivity}.</p>";
    }
}
