using CRM.Enterprise.Application.Notifications;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace CRM.Enterprise.Infrastructure.Notifications;

public class SendGridOptions
{
    public const string SectionName = "SendGrid";
    public string ApiKey { get; set; } = string.Empty;
    public string FromEmail { get; set; } = string.Empty;
    public string FromName { get; set; } = "CRM Enterprise";
}

public class SendGridEmailSender : IEmailSender
{
    private readonly SendGridOptions _options;

    public SendGridEmailSender(IOptions<SendGridOptions> options)
    {
        _options = options.Value ?? new SendGridOptions();
        _options.ApiKey ??= string.Empty;
        _options.FromEmail ??= string.Empty;
        _options.FromName ??= "CRM Enterprise";
    }

    public async Task SendAsync(string toEmail, string subject, string htmlBody, string? textBody = null, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_options.ApiKey) ||
            string.IsNullOrWhiteSpace(_options.FromEmail) ||
            string.IsNullOrWhiteSpace(toEmail))
        {
            return;
        }

        var client = new SendGridClient(_options.ApiKey);
        var from = new EmailAddress(_options.FromEmail, _options.FromName);
        var to = new EmailAddress(toEmail);
        var message = MailHelper.CreateSingleEmail(from, to, subject, textBody ?? string.Empty, htmlBody);
        await client.SendEmailAsync(message, cancellationToken);
    }
}
