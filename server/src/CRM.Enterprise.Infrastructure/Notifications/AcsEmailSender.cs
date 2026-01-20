using Azure.Communication.Email;
using CRM.Enterprise.Application.Notifications;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Notifications;

public class AcsEmailSender : IEmailSender
{
    private readonly EmailClient? _client;
    private readonly AcsEmailOptions _options;

    public AcsEmailSender(IOptions<AcsEmailOptions> options)
    {
        _options = options.Value ?? new AcsEmailOptions();

        // Avoid crashing the app when ACS settings are not configured locally.
        if (_options.IsValid())
        {
            _client = new EmailClient(_options.ConnectionString);
        }
    }

    public async Task SendAsync(string toEmail, string subject, string htmlBody, string? textBody = null, CancellationToken cancellationToken = default)
    {
        if (_client is null || !_options.IsValid() || string.IsNullOrWhiteSpace(toEmail))
        {
            return;
        }

        // Build the email payload once for consistent formatting across templates.
        var content = new EmailContent(subject)
        {
            Html = htmlBody,
            PlainText = textBody ?? string.Empty
        };

        var recipients = new EmailRecipients(new List<EmailAddress>
        {
            new(toEmail)
        });

        var message = new EmailMessage(_options.SenderEmail, recipients, content);
        await _client.SendAsync(Azure.WaitUntil.Completed, message, cancellationToken);
    }
}
