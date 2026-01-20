using CRM.Enterprise.Application.Notifications;

namespace CRM.Enterprise.Infrastructure.Notifications;

public class QueuedEmailSender : IEmailSender
{
    private readonly ServiceBusEmailQueue _queue;

    public QueuedEmailSender(ServiceBusEmailQueue queue)
    {
        _queue = queue;
    }

    public async Task SendAsync(string toEmail, string subject, string htmlBody, string? textBody = null, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(toEmail))
        {
            return;
        }

        // Enqueue the email so the API request returns quickly.
        var payload = new EmailQueueMessage(toEmail, subject, htmlBody, textBody);
        await _queue.EnqueueAsync(payload, cancellationToken);
    }
}
