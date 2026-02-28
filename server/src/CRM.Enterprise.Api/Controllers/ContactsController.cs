using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Contacts;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Api.Contracts.Imports;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Contacts;
using CRM.Enterprise.Application.Tenants;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ApiUpsertContactRequest = CRM.Enterprise.Api.Contracts.Contacts.UpsertContactRequest;
using AppContactUpsertRequest = CRM.Enterprise.Application.Contacts.ContactUpsertRequest;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.ContactsView)]
[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly IContactImportService _contactImportService;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ITenantProvider _tenantProvider;

    public ContactsController(
        IContactService contactService,
        IContactImportService contactImportService,
        ICrmRealtimePublisher realtimePublisher,
        ITenantProvider tenantProvider)
    {
        _contactService = contactService;
        _contactImportService = contactImportService;
        _realtimePublisher = realtimePublisher;
        _tenantProvider = tenantProvider;
    }

    [HttpGet]
    public async Task<ActionResult<ContactSearchResponse>> GetContacts(
        [FromQuery] string? search,
        [FromQuery] Guid? accountId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var result = await _contactService.SearchAsync(new ContactSearchRequest(search, accountId, page, pageSize), cancellationToken);
        var items = result.Items.Select(ToApiItem);
        return Ok(new ContactSearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ContactDetailResponse>> GetContact(Guid id, CancellationToken cancellationToken)
    {
        var contact = await _contactService.GetAsync(id, cancellationToken);
        if (contact is null) return NotFound();
        return Ok(ToApiDetail(contact));
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
    public async Task<ActionResult<ContactDetailResponse>> CreateContact([FromBody] ApiUpsertContactRequest request, CancellationToken cancellationToken)
    {
        var result = await _contactService.CreateAsync(MapUpsertRequest(request), GetActor(), cancellationToken);
        if (!result.Success)
        {
            return BadRequest(result.Error);
        }

        await PublishContactRealtimeAsync("created", result.Value!.Id, cancellationToken);
        return CreatedAtAction(nameof(GetContact), new { id = result.Value!.Id }, ToApiDetail(result.Value!));
    }

    [HttpPost("import")]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
    public async Task<ActionResult<CsvImportResult>> Import([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        await using var stream = file.OpenReadStream();
        var result = await _contactImportService.ImportAsync(stream, GetActor(), cancellationToken);
        var errors = result.Errors.Select(error => new CsvImportError(error.RowNumber, error.Message)).ToList();
        return Ok(new CsvImportResult(result.Total, result.Imported, result.Failed, errors));
    }

    [HttpPost("import/queue")]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
    public async Task<ActionResult<ImportJobResponse>> QueueImport([FromForm] IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("CSV file is required.");
        }

        await using var stream = file.OpenReadStream();
        var result = await _contactImportService.QueueImportAsync(stream, file.FileName, GetActor(), cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        var value = result.Value!;
        await PublishImportProgressAsync(value.ImportJobId, value.EntityType, value.Status, 0, 0, 0, 0, null, cancellationToken);
        return Accepted(new ImportJobResponse(value.ImportJobId, value.EntityType, value.Status));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
    public async Task<IActionResult> UpdateContact(Guid id, [FromBody] ApiUpsertContactRequest request, CancellationToken cancellationToken)
    {
        var result = await _contactService.UpdateAsync(id, MapUpsertRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishContactRealtimeAsync("updated", id, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
    public async Task<IActionResult> DeleteContact(Guid id, CancellationToken cancellationToken)
    {
        var result = await _contactService.DeleteAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishContactRealtimeAsync("deleted", id, cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id:guid}/owner")]
    public async Task<IActionResult> UpdateOwner(Guid id, [FromBody] UpdateOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var result = await _contactService.UpdateOwnerAsync(id, request.OwnerId, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPatch("{id:guid}/lifecycle")]
    public async Task<IActionResult> UpdateLifecycle(Guid id, [FromBody] UpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Lifecycle status is required.");
        }

        var result = await _contactService.UpdateLifecycleAsync(id, request.Status, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost("bulk-assign-owner")]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
    public async Task<IActionResult> BulkAssignOwner([FromBody] BulkAssignOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No contact ids provided.");
        }

        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var result = await _contactService.BulkAssignOwnerAsync(request.Ids, request.OwnerId, cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    [HttpPost("bulk-update-lifecycle")]
    [Authorize(Policy = Permissions.Policies.ContactsManage)]
    public async Task<IActionResult> BulkUpdateLifecycle([FromBody] BulkUpdateStatusRequest request, CancellationToken cancellationToken)
    {
        if (request.Ids is null || request.Ids.Count == 0)
        {
            return BadRequest("No contact ids provided.");
        }

        if (string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest("Lifecycle status is required.");
        }

        var result = await _contactService.BulkUpdateLifecycleAsync(request.Ids, request.Status, cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    private static ContactListItem ToApiItem(ContactListItemDto dto)
    {
        return new ContactListItem(
            dto.Id,
            dto.FullName,
            dto.Email,
            dto.Phone,
            dto.Mobile,
            dto.JobTitle,
            dto.BuyingRole,
            dto.AccountId,
            dto.AccountName,
            dto.OwnerId,
            dto.OwnerName,
            dto.LifecycleStage,
            dto.ActivityScore,
            dto.CreatedAtUtc);
    }

    private static ContactDetailResponse ToApiDetail(ContactDetailDto dto)
    {
        return new ContactDetailResponse(
            dto.Id,
            dto.FirstName,
            dto.LastName,
            dto.Email,
            dto.Phone,
            dto.Mobile,
            dto.JobTitle,
            dto.BuyingRole,
            dto.AccountId,
            dto.AccountName,
            dto.OwnerId,
            dto.OwnerName,
            dto.LinkedInProfile,
            dto.LifecycleStage,
            dto.ActivityScore,
            dto.CreatedAtUtc,
            dto.UpdatedAtUtc);
    }

    private static AppContactUpsertRequest MapUpsertRequest(ApiUpsertContactRequest request)
    {
        return new AppContactUpsertRequest(
            request.FirstName,
            request.LastName,
            request.Email,
            request.Phone,
            request.Mobile,
            request.JobTitle,
            request.BuyingRole,
            request.AccountId,
            request.OwnerId,
            request.LinkedInProfile,
            request.LifecycleStage,
            request.ActivityScore);
    }

    private ActorContext GetActor()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var name = User.FindFirstValue(ClaimTypes.Name);
        var parsed = Guid.TryParse(id, out var value) ? value : (Guid?)null;
        return new ActorContext(parsed, name);
    }

    private Task PublishContactRealtimeAsync(string action, Guid contactId, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "entity.crud.changed",
            new
            {
                entityType = "Contact",
                entityId = contactId,
                action,
                changedFields = Array.Empty<string>(),
                actorUserId = GetActor().UserId,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);
    }

    private Task PublishImportProgressAsync(
        Guid jobId,
        string entityType,
        string status,
        int processed,
        int total,
        int succeeded,
        int failed,
        string? errorSummary,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "import.job.progress",
            new
            {
                jobId,
                entityType,
                status,
                processed,
                total,
                succeeded,
                failed,
                startedAtUtc = DateTime.UtcNow,
                finishedAtUtc = status is "Completed" or "Failed" ? DateTime.UtcNow : (DateTime?)null,
                errorSummary
            },
            cancellationToken);
    }
}
