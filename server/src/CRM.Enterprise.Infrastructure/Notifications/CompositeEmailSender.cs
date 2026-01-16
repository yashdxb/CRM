using CRM.Enterprise.Application.Notifications;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Notifications;

public class CompositeEmailSender : IEmailSender
{
    private readonly GraphEmailSender _graphSender;
    private readonly SendGridEmailSender _sendGridSender;
    private readonly GraphMailOptions _graphOptions;

    public CompositeEmailSender(
        GraphEmailSender graphSender,
        SendGridEmailSender sendGridSender,
        IOptions<GraphMailOptions> graphOptions)
    {
        _graphSender = graphSender;
        _sendGridSender = sendGridSender;
        _graphOptions = graphOptions.Value;
    }

    public async Task SendAsync(string toEmail, string subject, string htmlBody, string? textBody = null, CancellationToken cancellationToken = default)
    {
        if (_graphOptions.IsValid())
        {
            await _graphSender.SendAsync(toEmail, subject, htmlBody, textBody, cancellationToken);
            return;
        }

        await _sendGridSender.SendAsync(toEmail, subject, htmlBody, textBody, cancellationToken);
    }
}
