using CRM.Enterprise.Api.Contracts.TenantBranding;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/tenant-branding")]
public class TenantBrandingController : ControllerBase
{
    private readonly ITenantBrandingService _brandingService;

    public TenantBrandingController(ITenantBrandingService brandingService)
    {
        _brandingService = brandingService;
    }

    [HttpGet]
    public async Task<ActionResult<TenantBrandingResponse>> GetBranding(CancellationToken ct)
    {
        var dto = await _brandingService.GetBrandingAsync(ct);
        return Ok(new TenantBrandingResponse(dto.TenantName, dto.LogoUrl));
    }

    [AllowAnonymous]
    [HttpGet("public")]
    public async Task<ActionResult<TenantBrandingResponse>> GetPublicBranding([FromQuery] string tenantKey, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            return BadRequest(new { error = "tenantKey is required." });
        }

        var dto = await _brandingService.GetPublicBrandingAsync(tenantKey, ct);
        return Ok(new TenantBrandingResponse(dto.TenantName, dto.LogoUrl));
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpPost("logo")]
    public async Task<ActionResult<TenantBrandingResponse>> UploadLogo(IFormFile file, CancellationToken ct)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest(new { error = "A file is required." });
        }

        try
        {
            await using var stream = file.OpenReadStream();
            var dto = await _brandingService.UploadLogoAsync(stream, file.FileName, file.ContentType, ct);
            return Ok(new TenantBrandingResponse(dto.TenantName, dto.LogoUrl));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    [HttpDelete("logo")]
    public async Task<ActionResult<TenantBrandingResponse>> RemoveLogo(CancellationToken ct)
    {
        var dto = await _brandingService.RemoveLogoAsync(ct);
        return Ok(new TenantBrandingResponse(dto.TenantName, dto.LogoUrl));
    }
}
