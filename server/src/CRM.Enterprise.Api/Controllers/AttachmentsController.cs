using System.Security.Claims;
using CRM.Enterprise.Api.Contracts.Attachments;
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

    public AttachmentsController(CrmDbContext dbContext, IWebHostEnvironment environment)
    {
        _dbContext = dbContext;
        _environment = environment;
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

        var tenantKey = HttpContext.Request.Headers["X-Tenant-Key"].FirstOrDefault() ?? "default";
        var storageRoot = Path.Combine(_environment.ContentRootPath, "uploads", tenantKey.ToLowerInvariant());
        Directory.CreateDirectory(storageRoot);

        var safeName = Path.GetFileName(file.FileName);
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

    private Guid GetUserId()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(id, out var parsed) ? parsed : Guid.Empty;
    }
}
