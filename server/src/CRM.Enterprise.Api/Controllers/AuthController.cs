using CRM.Enterprise.Api.Contracts.Auth;
using CRM.Enterprise.Application.Auth;
using CRM.Enterprise.Application.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IEmailSender _emailSender;

    public AuthController(IAuthService authService, IEmailSender emailSender)
    {
        _authService = authService;
        _emailSender = emailSender;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await _authService.SignInAsync(request.Email, request.Password, cancellationToken);
        if (result is null)
        {
            return Unauthorized();
        }

        return Ok(new LoginResponse(result.AccessToken, result.ExpiresAtUtc, result.Email, result.FullName, result.Roles, result.Permissions, result.TenantKey, result.MustChangePassword));
    }

    [HttpPost("logout")]
    [Authorize]
    public IActionResult Logout()
    {
        // Return a JSON payload to avoid Safari hanging on 204 responses for CORS requests.
        return Ok(new { status = "ok" });
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.CurrentPassword) || string.IsNullOrWhiteSpace(request.NewPassword))
        {
            return BadRequest("Current and new passwords are required.");
        }
        if (string.Equals(request.CurrentPassword, request.NewPassword, StringComparison.Ordinal))
        {
            return BadRequest("New password must be different from the current password.");
        }

        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdValue, out var userId))
        {
            return Unauthorized();
        }

        var result = await _authService.ChangePasswordAsync(userId, request.CurrentPassword, request.NewPassword, cancellationToken);
        if (result is null)
        {
            return BadRequest("Unable to change password. Verify your current password.");
        }

        var origin = Request.Headers.Origin.FirstOrDefault();
        var baseUrl = string.IsNullOrWhiteSpace(origin)
            ? $"{Request.Scheme}://{Request.Host}"
            : origin;
        var loginUrl = $"{baseUrl.TrimEnd('/')}/login";

        var subject = "Your CRM Enterprise password was updated";
        // Send a confirmation email so users know their password change succeeded.
        var htmlBody = $@"
            <div style=""font-family: 'Segoe UI', Arial, sans-serif; background:#f5f7fb; padding:24px;"">
              <table role=""presentation"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; box-shadow:0 8px 24px rgba(15,23,42,0.08);"">
                <tr>
                  <td style=""padding:28px 32px 12px;"">
                    <h2 style=""margin:0; font-size:20px; color:#111827;"">Password updated</h2>
                    <p style=""margin:8px 0 0; color:#6b7280; font-size:14px;"">Your CRM Enterprise password has been changed.</p>
                  </td>
                </tr>
                <tr>
                  <td style=""padding:8px 32px 24px;"">
                    <p style=""margin:0 0 12px; color:#111827; font-size:14px;"">Hi {System.Net.WebUtility.HtmlEncode(result.FullName)},</p>
                    <p style=""margin:0 0 16px; color:#4b5563; font-size:14px;"">
                      Your password was updated successfully. If this wasn't you, contact your administrator immediately.
                    </p>
                    <a href=""{loginUrl}"" style=""display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:10px 16px; border-radius:8px; font-size:14px; font-weight:600;"">
                      Sign in
                    </a>
                  </td>
                </tr>
              </table>
            </div>";

        var textBody = $"Hi {result.FullName},\n\nYour password was updated successfully. If this wasn't you, contact your administrator immediately.\n\nSign in: {loginUrl}";

        try
        {
            await _emailSender.SendAsync(result.Email, subject, htmlBody, textBody, cancellationToken);
        }
        catch
        {
            // Avoid blocking the password change flow if email delivery fails.
        }

        // Return a JSON payload to avoid Safari hanging on 204 responses for CORS requests.
        return Ok(new { status = "ok" });
    }

    [HttpPost("accept-invite")]
    [AllowAnonymous]
    public async Task<IActionResult> AcceptInvite([FromBody] AcceptInviteRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Token) || string.IsNullOrWhiteSpace(request.NewPassword))
        {
            return BadRequest("Token and new password are required.");
        }

        var success = await _authService.AcceptInviteAsync(request.Token.Trim(), request.NewPassword.Trim(), cancellationToken);
        if (!success)
        {
            return BadRequest("Invalid or expired invite.");
        }

        return NoContent();
    }

    [HttpGet("invite-status")]
    [AllowAnonymous]
    public async Task<ActionResult<InviteStatusResponse>> InviteStatus([FromQuery] string token, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            return BadRequest("Token is required.");
        }

        var status = await _authService.GetInviteStatusAsync(token, cancellationToken);
        var response = status switch
        {
            InviteTokenStatus.Valid => new InviteStatusResponse("valid", "Invite is valid."),
            InviteTokenStatus.Expired => new InviteStatusResponse("expired", "Invitation expired. Ask your administrator to resend the invite."),
            _ => new InviteStatusResponse("invalid", "Invitation is invalid or already used. Please sign in or request a new invite.")
        };

        return Ok(response);
    }
}
