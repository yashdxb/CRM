using System.Security.Claims;
using System.Text.Json;
using CRM.Enterprise.Api.Contracts.Attachments;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/attachments")]
public class AttachmentsController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly IWebHostEnvironment _environment;
    private readonly ITenantProvider _tenantProvider;
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public AttachmentsController(CrmDbContext dbContext, IWebHostEnvironment environment, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _environment = environment;
        _tenantProvider = tenantProvider;
    }

    [HttpGet]
    [Authorize(Policy = Permissions.Policies.ActivitiesView)]
    public async Task<ActionResult<IReadOnlyList<AttachmentListItem>>> GetAttachments(
        [FromQuery] ActivityRelationType relatedEntityType,
        [FromQuery] Guid relatedEntityId,
        CancellationToken cancellationToken)
    {
        if (relatedEntityId == Guid.Empty)
        {
            return BadRequest(new { message = "Related entity id is required." });
        }

        if (!await RelatedEntityExistsAsync(relatedEntityType, relatedEntityId, cancellationToken))
        {
            return NotFound(new { message = "Related record was not found." });
        }

        var attachments = await _dbContext.Attachments
            .AsNoTracking()
            .Where(a => !a.IsDeleted && a.RelatedEntityType == relatedEntityType && a.RelatedEntityId == relatedEntityId)
            .OrderByDescending(a => a.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        var uploaderIds = attachments.Select(a => a.UploadedById).Where(id => id != Guid.Empty).Distinct().ToList();
        var uploaderLookup = await _dbContext.Users
            .Where(u => uploaderIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        var result = attachments.Select(a =>
        {
            uploaderLookup.TryGetValue(a.UploadedById, out var uploader);
            return new AttachmentListItem(a.Id, a.FileName, a.ContentType, a.Size, uploader, a.CreatedAtUtc);
        }).ToList();

        return Ok(result);
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.ActivitiesManage)]
    public async Task<ActionResult<AttachmentUploadResponse>> Upload(
        [FromForm] IFormFile file,
        [FromForm] ActivityRelationType relatedEntityType,
        [FromForm] Guid relatedEntityId,
        CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest(new { message = "File is required." });
        }

        if (relatedEntityId == Guid.Empty)
        {
            return BadRequest(new { message = "Related entity id is required." });
        }

        if (!await RelatedEntityExistsAsync(relatedEntityType, relatedEntityId, cancellationToken))
        {
            return NotFound(new { message = "Related record was not found." });
        }

        var policy = await ResolveSupportingDocumentPolicyAsync(cancellationToken);
        var extension = Path.GetExtension(file.FileName ?? string.Empty)?.Trim().ToLowerInvariant() ?? string.Empty;
        if (string.IsNullOrWhiteSpace(extension) || !policy.AllowedExtensions.Contains(extension, StringComparer.OrdinalIgnoreCase))
        {
            return BadRequest(new
            {
                code = "ATTACHMENT_FILE_TYPE_NOT_ALLOWED",
                message = $"File type '{extension}' is not allowed. Allowed types: {string.Join(", ", policy.AllowedExtensions)}."
            });
        }

        var maxBytes = policy.MaxFileSizeMb * 1024L * 1024L;
        if (file.Length > maxBytes)
        {
            return BadRequest(new
            {
                code = "ATTACHMENT_FILE_TOO_LARGE",
                message = $"File exceeds the workspace limit of {policy.MaxFileSizeMb} MB."
            });
        }

        var attachmentCount = await _dbContext.Attachments
            .Where(a => !a.IsDeleted && a.RelatedEntityType == relatedEntityType && a.RelatedEntityId == relatedEntityId)
            .CountAsync(cancellationToken);
        if (attachmentCount >= policy.MaxDocumentsPerRecord)
        {
            return Conflict(new
            {
                code = "ATTACHMENT_LIMIT_REACHED",
                message = $"Supporting document limit reached ({policy.MaxDocumentsPerRecord} per record)."
            });
        }

        var tenantKey = HttpContext.Request.Headers["X-Tenant-Key"].FirstOrDefault() ?? "default";
        var storageRoot = Path.Combine(_environment.ContentRootPath, "uploads", tenantKey.ToLowerInvariant());
        Directory.CreateDirectory(storageRoot);

        var safeName = Path.GetFileName(file.FileName) ?? "attachment";
        var storedName = $"{Guid.NewGuid():N}_{safeName}";
        var storagePath = Path.Combine(storageRoot, storedName);

        await using (var stream = System.IO.File.Create(storagePath))
        {
            await file.CopyToAsync(stream, cancellationToken);
        }

        var uploaderId = GetUserId();
        var attachment = new Attachment
        {
            FileName = safeName,
            ContentType = file.ContentType ?? "application/octet-stream",
            Size = file.Length,
            StoragePath = Path.Combine("uploads", tenantKey.ToLowerInvariant(), storedName),
            RelatedEntityType = relatedEntityType,
            RelatedEntityId = relatedEntityId,
            UploadedById = uploaderId,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Attachments.Add(attachment);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var uploaderName = uploaderId == Guid.Empty
            ? null
            : await _dbContext.Users.Where(u => u.Id == uploaderId).Select(u => u.FullName).FirstOrDefaultAsync(cancellationToken);

        return Ok(new AttachmentUploadResponse(
            attachment.Id,
            attachment.FileName,
            attachment.ContentType,
            attachment.Size,
            uploaderName,
            attachment.CreatedAtUtc));
    }

    [HttpGet("{id:guid}/download")]
    [Authorize(Policy = Permissions.Policies.ActivitiesView)]
    public async Task<IActionResult> Download(Guid id, CancellationToken cancellationToken)
    {
        var attachment = await _dbContext.Attachments
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (attachment is null)
        {
            return NotFound();
        }

        var absolutePath = Path.Combine(_environment.ContentRootPath, attachment.StoragePath);
        if (!System.IO.File.Exists(absolutePath))
        {
            return NotFound();
        }

        return PhysicalFile(absolutePath, attachment.ContentType, attachment.FileName);
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.ActivitiesManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var attachment = await _dbContext.Attachments
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);

        if (attachment is null)
        {
            return NotFound();
        }

        attachment.IsDeleted = true;
        attachment.DeletedAtUtc = DateTime.UtcNow;
        attachment.UpdatedAtUtc = DateTime.UtcNow;
        attachment.DeletedBy = User.Identity?.Name ?? User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private Guid GetUserId()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(id, out var parsed) ? parsed : Guid.Empty;
    }

    private async Task<bool> RelatedEntityExistsAsync(
        ActivityRelationType relatedEntityType,
        Guid relatedEntityId,
        CancellationToken cancellationToken)
    {
        return relatedEntityType switch
        {
            ActivityRelationType.Lead => await _dbContext.Leads.AnyAsync(x => x.Id == relatedEntityId && !x.IsDeleted, cancellationToken),
            ActivityRelationType.Contact => await _dbContext.Contacts.AnyAsync(x => x.Id == relatedEntityId && !x.IsDeleted, cancellationToken),
            ActivityRelationType.Account => await _dbContext.Accounts.AnyAsync(x => x.Id == relatedEntityId && !x.IsDeleted, cancellationToken),
            ActivityRelationType.Opportunity => await _dbContext.Opportunities.AnyAsync(x => x.Id == relatedEntityId && !x.IsDeleted, cancellationToken),
            _ => false
        };
    }

    private async Task<SupportingDocumentPolicy> ResolveSupportingDocumentPolicyAsync(CancellationToken cancellationToken)
    {
        var rawPolicy = await _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == _tenantProvider.TenantId)
            .Select(t => t.SupportingDocumentPolicyJson)
            .FirstOrDefaultAsync(cancellationToken);

        if (string.IsNullOrWhiteSpace(rawPolicy))
        {
            return SupportingDocumentPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<SupportingDocumentPolicy>(rawPolicy, JsonOptions);
            return SupportingDocumentPolicyDefaults.Normalize(parsed);
        }
        catch (JsonException)
        {
            return SupportingDocumentPolicyDefaults.CreateDefault();
        }
    }
}
