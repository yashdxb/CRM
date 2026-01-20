using CRM.Enterprise.Api.Contracts.Notifications;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/notifications")]
[Authorize(Policy = Permissions.Policies.AdministrationManage)]
public class NotificationsController : ControllerBase
{
    private readonly IEmailSender _emailSender;

    public NotificationsController(IEmailSender emailSender)
    {
        _emailSender = emailSender;
    }

    [HttpPost("test-email")]
    public async Task<IActionResult> SendTestEmail([FromBody] TestEmailRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.ToEmail))
        {
            return BadRequest("ToEmail is required.");
        }

        // Keep a predictable subject/body for quick smoke tests in prod.
        var subject = string.IsNullOrWhiteSpace(request.Subject)
            ? "CRM Enterprise Test Email"
            : request.Subject.Trim();
        var htmlBody = string.IsNullOrWhiteSpace(request.HtmlBody)
            ? "<p>Test email sent from CRM Enterprise.</p>"
            : request.HtmlBody;
        var textBody = string.IsNullOrWhiteSpace(request.TextBody)
            ? "Test email sent from CRM Enterprise."
            : request.TextBody;

        await _emailSender.SendAsync(request.ToEmail.Trim(), subject, htmlBody, textBody, cancellationToken);
        return Accepted();
    }
}
