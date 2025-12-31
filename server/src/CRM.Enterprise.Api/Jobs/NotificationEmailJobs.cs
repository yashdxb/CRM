using System.Text.Json;
using CRM.Enterprise.Api.Contracts.Notifications;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Hangfire;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Jobs;

[AutomaticRetry(Attempts = 3, DelaysInSeconds = new[] { 10, 30, 60 })]
public class NotificationEmailJobs
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly CrmDbContext _dbContext;
    private readonly IEmailSender _emailSender;

    public NotificationEmailJobs(CrmDbContext dbContext, IEmailSender emailSender)
    {
        _dbContext = dbContext;
        _emailSender = emailSender;
    }

    public async Task SendTaskAssignedAsync(Guid activityId, CancellationToken cancellationToken = default)
    {
        var activity = await _dbContext.Activities
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == activityId && !a.IsDeleted, cancellationToken);
        if (activity is null || activity.OwnerId == Guid.Empty)
        {
            return;
        }

        var owner = await _dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == activity.OwnerId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (owner is null || string.IsNullOrWhiteSpace(owner.Email))
        {
            return;
        }

        if (!IsEmailEnabled(owner, NotificationType.Info))
        {
            return;
        }

        var subject = $"Task assigned: {activity.Subject}";
        var html = $"""
            <h2>New task assigned</h2>
            <p><strong>Subject:</strong> {activity.Subject}</p>
            <p><strong>Due:</strong> {(activity.DueDateUtc?.ToString("yyyy-MM-dd") ?? "No due date")}</p>
            """;

        await _emailSender.SendAsync(owner.Email, subject, html, cancellationToken: cancellationToken);
    }

    public async Task SendOpportunityClosedAsync(Guid opportunityId, bool isWon, CancellationToken cancellationToken = default)
    {
        var opp = await _dbContext.Opportunities
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (opp is null || opp.OwnerId == Guid.Empty)
        {
            return;
        }

        var owner = await _dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == opp.OwnerId && u.IsActive && !u.IsDeleted, cancellationToken);
        if (owner is null || string.IsNullOrWhiteSpace(owner.Email))
        {
            return;
        }

        var type = isWon ? NotificationType.Success : NotificationType.Warning;
        if (!IsEmailEnabled(owner, type))
        {
            return;
        }

        var status = isWon ? "Closed Won" : "Closed Lost";
        var subject = $"Opportunity {status}: {opp.Name}";
        var html = $"""
            <h2>{status}</h2>
            <p><strong>Opportunity:</strong> {opp.Name}</p>
            <p><strong>Amount:</strong> {opp.Amount} {opp.Currency}</p>
            <p><strong>Reason:</strong> {opp.WinLossReason ?? "n/a"}</p>
            """;

        await _emailSender.SendAsync(owner.Email, subject, html, cancellationToken: cancellationToken);
    }

    private static bool IsEmailEnabled(User user, NotificationType type)
    {
        var prefs = ReadPreferences(user);
        return type switch
        {
            NotificationType.Success => prefs.Email.Success,
            NotificationType.Error => prefs.Email.Error,
            NotificationType.Warning => prefs.Email.Warning,
            NotificationType.Info => prefs.Email.Info,
            _ => false
        };
    }

    private static NotificationPreferencesResponse ReadPreferences(User user)
    {
        if (string.IsNullOrWhiteSpace(user.NotificationPreferencesJson))
        {
            return DefaultPreferences();
        }

        try
        {
            var prefs = JsonSerializer.Deserialize<NotificationPreferencesResponse>(
                user.NotificationPreferencesJson,
                JsonOptions);
            return prefs ?? DefaultPreferences();
        }
        catch
        {
            return DefaultPreferences();
        }
    }

    private static NotificationPreferencesResponse DefaultPreferences()
    {
        var defaults = new NotificationChannelPreferences(true, true, true, true);
        var email = new NotificationChannelPreferences(false, false, false, false);
        return new NotificationPreferencesResponse(defaults, email);
    }
}
