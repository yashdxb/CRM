using CRM.Enterprise.Api.Contracts.Auth;
using CRM.Enterprise.Application.Auth;
using CRM.Enterprise.Application.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Globalization;
using System.Security.Claims;
using System.Text;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private const string DemoRequestEmail = "contact@northedgesystem.com";
    private static readonly TimeZoneInfo TorontoTimeZone = ResolveTorontoTimeZone();
    private readonly IAuthService _authService;
    private readonly IEmailSender _emailSender;
    private readonly ILogger<AuthController> _logger;
    private readonly string _brandLogoUrl;
    private readonly string _brandWebsiteUrl;

    public AuthController(IAuthService authService, IEmailSender emailSender, IConfiguration configuration, ILogger<AuthController> logger)
    {
        _authService = authService;
        _emailSender = emailSender;
        _logger = logger;
        _brandLogoUrl = configuration["Branding:LogoUrl"] ?? string.Empty;
        _brandWebsiteUrl = configuration["Branding:WebsiteUrl"] ?? string.Empty;
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
        var websiteUrl = string.IsNullOrWhiteSpace(_brandWebsiteUrl) ? baseUrl : _brandWebsiteUrl;
        var logoUrl = string.IsNullOrWhiteSpace(_brandLogoUrl) ? null : _brandLogoUrl;
        var encodedWebsiteUrl = System.Net.WebUtility.HtmlEncode(websiteUrl);
        var encodedLogoUrl = logoUrl is null ? null : System.Net.WebUtility.HtmlEncode(logoUrl);
        var logoSection = encodedLogoUrl is null
            ? $@"
                <tr>
                  <td style=""padding:0 0 18px;"">
                    <a href=""{encodedWebsiteUrl}"" style=""display:inline-block; text-decoration:none; color:#0f172a; font-size:18px; font-weight:700;"">
                      North Edge CRM
                    </a>
                  </td>
                </tr>"
            : $@"
                <tr>
                  <td style=""padding:0 0 18px;"">
                    <a href=""{encodedWebsiteUrl}"" style=""display:inline-block; text-decoration:none;"">
                      <img src=""{encodedLogoUrl}"" alt=""North Edge CRM"" style=""height:68px; display:block; border:0;"" />
                    </a>
                  </td>
                </tr>";

        var subject = "Your CRM Enterprise password was updated";
        // Send a confirmation email so users know their password change succeeded.
        var htmlBody = $@"
            <div style=""font-family: 'Segoe UI', Arial, sans-serif; background:radial-gradient(1200px 640px at 15% -20%, #e0eaff 0%, #e6f2ff 38%, #f8fafc 75%); padding:36px 16px;"">
              <table role=""presentation"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""max-width:660px; margin:0 auto;"">
                <tr>
                  <td style=""padding:0 0 14px;"">
                    <div style=""height:8px; width:100%; border-radius:999px; background:linear-gradient(90deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%);""></div>
                  </td>
                </tr>
                <tr>
                  <td style=""background:rgba(255,255,255,0.84); border:1px solid rgba(255,255,255,0.6); border-radius:20px; box-shadow:0 18px 50px rgba(15, 23, 42, 0.16); padding:32px 36px 28px;"">
                    <table role=""presentation"" cellpadding=""0"" cellspacing=""0"" width=""100%"">
                      {logoSection}
                      <tr>
                        <td style=""padding:0 0 8px;"">
                          <div style=""font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:#64748b;"">Security notice</div>
                          <h1 style=""margin:8px 0 0; font-size:24px; color:#0f172a;"">Password updated</h1>
                          <p style=""margin:10px 0 0; color:#475569; font-size:14px;"">
                            Hi {System.Net.WebUtility.HtmlEncode(result.FullName)},<br />
                            Your CRM Enterprise password has been changed successfully. If you did not make this change, contact your administrator immediately.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style=""padding:18px 0 0;"">
                          <div style=""background:linear-gradient(140deg, rgba(59, 130, 246, 0.08), rgba(14, 165, 233, 0.16)); border:1px solid rgba(148, 163, 184, 0.35); border-radius:16px; padding:16px 18px; font-size:14px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.7), 0 10px 24px rgba(15, 23, 42, 0.06);"">
                            <table role=""presentation"" cellpadding=""0"" cellspacing=""0"" width=""100%"" style=""border-collapse:separate; border-spacing:0 10px;"">
                              <tr>
                                <td style=""width:32px;"">
                                  <div style=""width:28px; height:28px; border-radius:8px; background:rgba(37,99,235,0.12); border:1px solid rgba(37,99,235,0.35); text-align:center; line-height:28px; font-weight:700; color:#2563eb;"">
                                    P
                                  </div>
                                </td>
                                <td style=""font-weight:600; color:#0f172a; width:120px;"">Account</td>
                                <td style=""color:#0f172a;"">{System.Net.WebUtility.HtmlEncode(result.Email)}</td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style=""padding:20px 0 0;"">
                          <table role=""presentation"" cellpadding=""0"" cellspacing=""0"">
                            <tr>
                              <td style=""background:#2563eb; border-radius:10px;"">
                                <a href=""{loginUrl}"" style=""display:inline-block; padding:12px 20px; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600;"">Sign in</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style=""padding:18px 0 0;"">
                          <p style=""margin:0; color:#64748b; font-size:12px;"">If you did not request this change, reset your password or contact support.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style=""padding:20px 0 0;"">
                          <p style=""margin:0 0 10px; color:#475569; font-size:13px;"">Need help? Reply to this email or contact your workspace administrator.</p>
                          <p style=""margin:0 0 4px; color:#94a3b8; font-size:12px;"">
                            <a href=""{encodedWebsiteUrl}"" style=""color:#2563eb; text-decoration:none;"">North Edge System</a>
                          </p>
                          <p style=""margin:0 0 4px; color:#94a3b8; font-size:12px;"">Toronto, ON, Canada</p>
                          <p style=""margin:0; color:#94a3b8; font-size:12px;"">
                            <a href=""mailto:contact@northedgesystem.com"" style=""color:#2563eb; text-decoration:none;"">contact@northedgesystem.com</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style=""padding:14px 8px 0; text-align:center; color:#94a3b8; font-size:11px;"">
                    North Edge CRM • Password updated
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

    [HttpPost("book-demo")]
    [AllowAnonymous]
    public async Task<IActionResult> BookDemo([FromBody] BookDemoRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) ||
            string.IsNullOrWhiteSpace(request.WorkEmail) ||
            string.IsNullOrWhiteSpace(request.Company) ||
            string.IsNullOrWhiteSpace(request.RoleTitle) ||
            string.IsNullOrWhiteSpace(request.Phone) ||
            string.IsNullOrWhiteSpace(request.TeamSize) ||
            string.IsNullOrWhiteSpace(request.PreferredDateTimeUtc) ||
            string.IsNullOrWhiteSpace(request.UseCase))
        {
            return BadRequest("Please provide all required fields.");
        }

        if (!IsValidEmail(request.WorkEmail))
        {
            return BadRequest("Please provide a valid work email.");
        }

        var fullName = request.FullName.Trim();
        var workEmail = request.WorkEmail.Trim();
        var company = request.Company.Trim();
        var roleTitle = request.RoleTitle.Trim();
        var phone = request.Phone?.Trim();
        var teamSize = request.TeamSize.Trim();
        if (!DateTimeOffset.TryParse(request.PreferredDateTimeUtc.Trim(), CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out var preferredUtc))
        {
            return BadRequest("Preferred date/time must be a valid UTC timestamp.");
        }
        preferredUtc = preferredUtc.ToUniversalTime();
        if (!IsValidTorontoScheduleWindow(preferredUtc))
        {
            return BadRequest("Schedule must be from the next Toronto day onward and between 9:00 AM and 5:00 PM Toronto time.");
        }
        var useCase = request.UseCase.Trim();
        var landingPageUrl = request.LandingPageUrl?.Trim();
        var preferredToronto = TimeZoneInfo.ConvertTime(preferredUtc, TorontoTimeZone);
        var preferredTorontoDisplay = preferredToronto.ToString("yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);
        var preferredUtcDisplay = preferredUtc.ToString("yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);

        var encodedWebsiteUrl = System.Net.WebUtility.HtmlEncode(string.IsNullOrWhiteSpace(_brandWebsiteUrl)
            ? "https://www.northedgesystem.com"
            : _brandWebsiteUrl);
        var encodedFullName = System.Net.WebUtility.HtmlEncode(fullName);
        var encodedWorkEmail = System.Net.WebUtility.HtmlEncode(workEmail);
        var encodedCompany = System.Net.WebUtility.HtmlEncode(company);
        var encodedRoleTitle = System.Net.WebUtility.HtmlEncode(roleTitle);
        var encodedPhone = System.Net.WebUtility.HtmlEncode(phone ?? "Not provided");
        var encodedTeamSize = System.Net.WebUtility.HtmlEncode(teamSize);
        var encodedPreferredUtc = System.Net.WebUtility.HtmlEncode(preferredUtcDisplay);
        var encodedPreferredToronto = System.Net.WebUtility.HtmlEncode(preferredTorontoDisplay);
        var encodedUseCase = System.Net.WebUtility.HtmlEncode(useCase).Replace("\n", "<br />");
        var safeLandingUrl = string.IsNullOrWhiteSpace(landingPageUrl) ? null : landingPageUrl;
        var encodedLandingText = System.Net.WebUtility.HtmlEncode(safeLandingUrl ?? "Not provided");
        var landingUrlHref = safeLandingUrl is null ? null : System.Net.WebUtility.HtmlEncode(safeLandingUrl);
        var landingUrlCell = landingUrlHref is null
            ? encodedLandingText
            : $@"<a href=""{landingUrlHref}"" style=""color:#60a5fa; text-decoration:none;"">{encodedLandingText}</a>";

        var subject = $"Book Demo request: {company} - {fullName}";
        var htmlBody = $@"
            <div style=""font-family:'Segoe UI',Arial,sans-serif;background:radial-gradient(1200px 680px at 10% -20%, #233d72 0%, #101a39 42%, #0b1229 100%);padding:24px;"">
              <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""max-width:700px;margin:0 auto;border-radius:18px;border:1px solid rgba(147,197,253,0.26);background:rgba(7,12,28,0.86);overflow:hidden;box-shadow:0 24px 60px rgba(2,6,23,0.6);"">
                <tr>
                  <td style=""padding:16px 22px;background:linear-gradient(90deg,#1d4ed8 0%,#2563eb 48%,#38bdf8 100%);color:#e0f2fe;"">
                    <div style=""font-size:12px;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;opacity:0.9;"">North Edge CRM</div>
                    <div style=""margin-top:6px;font-size:21px;line-height:1.25;font-weight:800;color:#ffffff;"">New Demo Scheduling Request</div>
                  </td>
                </tr>
                <tr>
                  <td style=""padding:20px 22px 8px;color:#dbeafe;"">
                    <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""border-collapse:separate;border-spacing:0 10px;"">
                      <tr>
                        <td style=""width:33%;padding:10px 12px;background:rgba(59,130,246,0.14);border:1px solid rgba(96,165,250,0.3);border-radius:12px;"">
                          <div style=""font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#93c5fd;"">Requester</div>
                          <div style=""margin-top:4px;font-size:14px;font-weight:700;color:#eff6ff;"">{encodedFullName}</div>
                        </td>
                        <td style=""width:33%;padding:10px 12px;background:rgba(59,130,246,0.14);border:1px solid rgba(96,165,250,0.3);border-radius:12px;"">
                          <div style=""font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#93c5fd;"">Company</div>
                          <div style=""margin-top:4px;font-size:14px;font-weight:700;color:#eff6ff;"">{encodedCompany}</div>
                        </td>
                        <td style=""width:33%;padding:10px 12px;background:rgba(59,130,246,0.14);border:1px solid rgba(96,165,250,0.3);border-radius:12px;"">
                          <div style=""font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#93c5fd;"">Team size</div>
                          <div style=""margin-top:4px;font-size:14px;font-weight:700;color:#eff6ff;"">{encodedTeamSize}</div>
                        </td>
                      </tr>
                    </table>

                    <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""margin-top:8px;border-collapse:collapse;background:rgba(15,23,42,0.64);border:1px solid rgba(148,163,184,0.24);border-radius:14px;overflow:hidden;"">
                      <tr>
                        <td style=""padding:12px 14px;color:#93c5fd;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;border-bottom:1px solid rgba(148,163,184,0.2);"">Contact Details</td>
                        <td style=""padding:12px 14px;color:#93c5fd;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;border-bottom:1px solid rgba(148,163,184,0.2);"">Scheduling</td>
                      </tr>
                      <tr>
                        <td style=""vertical-align:top;padding:12px 14px;border-right:1px solid rgba(148,163,184,0.18);"">
                          <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""font-size:14px;color:#e2e8f0;line-height:1.6;"">
                            <tr><td style=""padding:2px 0;font-weight:600;color:#cbd5e1;width:110px;"">Email</td><td style=""padding:2px 0;"">{encodedWorkEmail}</td></tr>
                            <tr><td style=""padding:2px 0;font-weight:600;color:#cbd5e1;"">Role/Title</td><td style=""padding:2px 0;"">{encodedRoleTitle}</td></tr>
                            <tr><td style=""padding:2px 0;font-weight:600;color:#cbd5e1;"">Phone</td><td style=""padding:2px 0;"">{encodedPhone}</td></tr>
                            <tr><td style=""padding:2px 0;font-weight:600;color:#cbd5e1;"">Landing page</td><td style=""padding:2px 0;"">{landingUrlCell}</td></tr>
                          </table>
                        </td>
                        <td style=""vertical-align:top;padding:12px 14px;"">
                          <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""font-size:14px;color:#e2e8f0;line-height:1.6;"">
                            <tr><td style=""padding:2px 0;font-weight:600;color:#cbd5e1;width:126px;"">Preferred UTC</td><td style=""padding:2px 0;"">{encodedPreferredUtc} UTC</td></tr>
                            <tr><td style=""padding:2px 0;font-weight:600;color:#cbd5e1;"">Preferred Toronto</td><td style=""padding:2px 0;"">{encodedPreferredToronto} America/Toronto</td></tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""margin-top:10px;border-collapse:collapse;background:rgba(15,23,42,0.64);border:1px solid rgba(148,163,184,0.24);border-radius:14px;overflow:hidden;"">
                      <tr>
                        <td style=""padding:12px 14px;color:#93c5fd;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;border-bottom:1px solid rgba(148,163,184,0.2);"">Use Case</td>
                      </tr>
                      <tr>
                        <td style=""padding:12px 14px;color:#e2e8f0;font-size:14px;line-height:1.6;"">{encodedUseCase}</td>
                      </tr>
                    </table>

                    <p style=""margin:14px 0 6px;color:#94a3b8;font-size:12px;"">
                      Website: <a href=""{encodedWebsiteUrl}"" style=""color:#60a5fa;text-decoration:none;"">{encodedWebsiteUrl}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </div>";

        var textBodyBuilder = new StringBuilder();
        textBodyBuilder.AppendLine("North Edge CRM - Demo Request");
        textBodyBuilder.AppendLine();
        textBodyBuilder.AppendLine($"Full name: {fullName}");
        textBodyBuilder.AppendLine($"Work email: {workEmail}");
        textBodyBuilder.AppendLine($"Company: {company}");
        textBodyBuilder.AppendLine($"Role/Title: {roleTitle}");
        textBodyBuilder.AppendLine($"Phone: {phone ?? "Not provided"}");
        textBodyBuilder.AppendLine($"Team size: {teamSize}");
        textBodyBuilder.AppendLine($"Preferred UTC: {preferredUtcDisplay} UTC");
        textBodyBuilder.AppendLine($"Preferred Toronto: {preferredTorontoDisplay} America/Toronto");
        textBodyBuilder.AppendLine($"Use case: {useCase}");
        textBodyBuilder.AppendLine($"Landing page: {landingPageUrl ?? "Not provided"}");

        try
        {
            await _emailSender.SendAsync(DemoRequestEmail, subject, htmlBody, textBodyBuilder.ToString(), cancellationToken);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to deliver demo request email for {WorkEmail}", workEmail);
            return StatusCode(500, "Unable to process demo request.");
        }
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

    private static bool IsValidEmail(string email)
    {
        try
        {
            _ = new System.Net.Mail.MailAddress(email.Trim());
            return true;
        }
        catch
        {
            return false;
        }
    }

    private static bool IsValidTorontoScheduleWindow(DateTimeOffset preferredUtc)
    {
        var nowToronto = TimeZoneInfo.ConvertTime(DateTimeOffset.UtcNow, TorontoTimeZone);
        var preferredToronto = TimeZoneInfo.ConvertTime(preferredUtc, TorontoTimeZone);
        var minTorontoDate = nowToronto.Date.AddDays(1);
        if (preferredToronto.Date < minTorontoDate)
        {
            return false;
        }

        var time = preferredToronto.TimeOfDay;
        return time >= TimeSpan.FromHours(9) && time < TimeSpan.FromHours(17);
    }

    private static TimeZoneInfo ResolveTorontoTimeZone()
    {
        try
        {
            return TimeZoneInfo.FindSystemTimeZoneById("America/Toronto");
        }
        catch (TimeZoneNotFoundException)
        {
            return TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
        }
    }
}
