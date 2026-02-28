using CRM.Enterprise.Application.Notifications;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace CRM.Enterprise.Infrastructure.Notifications;

public class QueuedEmailSender : IEmailSender
{
    private readonly ServiceBusEmailQueue _queue;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public QueuedEmailSender(ServiceBusEmailQueue queue, IHttpContextAccessor httpContextAccessor)
    {
        _queue = queue;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task SendAsync(string toEmail, string subject, string htmlBody, string? textBody = null, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(toEmail))
        {
            return;
        }

        // Enqueue the email so the API request returns quickly.
        var context = _httpContextAccessor.HttpContext;
        var tenantId = TryResolveTenantId(context);
        var userId = TryResolveUserId(context);
        var payload = new EmailQueueMessage(toEmail, subject, htmlBody, textBody, tenantId, userId);
        await _queue.EnqueueAsync(payload, cancellationToken);
    }

    private static Guid? TryResolveTenantId(HttpContext? context)
    {
        if (context?.Items.TryGetValue("TenantId", out var tenant) == true && tenant is Guid tenantId && tenantId != Guid.Empty)
        {
            return tenantId;
        }

        return null;
    }

    private static Guid? TryResolveUserId(HttpContext? context)
    {
        var subject = context?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (Guid.TryParse(subject, out var userId) && userId != Guid.Empty)
        {
            return userId;
        }

        return null;
    }
}
