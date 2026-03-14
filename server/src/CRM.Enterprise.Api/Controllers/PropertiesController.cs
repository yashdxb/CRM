using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Properties;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Properties;
using CRM.Enterprise.Application.Tenants;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ApiUpsertPropertyRequest = CRM.Enterprise.Api.Contracts.Properties.UpsertPropertyRequest;
using AppPropertyUpsertRequest = CRM.Enterprise.Application.Properties.PropertyUpsertRequest;
using ApiCreateShowingRequest = CRM.Enterprise.Api.Contracts.Properties.CreateShowingRequest;
using AppCreateShowingRequest = CRM.Enterprise.Application.Properties.CreateShowingRequest;
using ApiUpdateShowingRequest = CRM.Enterprise.Api.Contracts.Properties.UpdateShowingRequest;
using AppUpdateShowingRequest = CRM.Enterprise.Application.Properties.UpdateShowingRequest;
using ApiCreateDocumentRequest = CRM.Enterprise.Api.Contracts.Properties.CreateDocumentRequest;
using AppCreateDocumentRequest = CRM.Enterprise.Application.Properties.CreateDocumentRequest;
using ApiCreateActivityRequest = CRM.Enterprise.Api.Contracts.Properties.CreateActivityRequest;
using AppCreateActivityRequest = CRM.Enterprise.Application.Properties.CreatePropertyActivityRequest;
using ApiUpdateActivityRequest = CRM.Enterprise.Api.Contracts.Properties.UpdateActivityRequest;
using AppUpdateActivityRequest = CRM.Enterprise.Application.Properties.UpdatePropertyActivityRequest;
using ApiAddPriceChangeRequest = CRM.Enterprise.Api.Contracts.Properties.AddPriceChangeRequest;
using AppAddPriceChangeRequest = CRM.Enterprise.Application.Properties.AddPriceChangeRequest;
using ApiCreateAlertRuleRequest = CRM.Enterprise.Api.Contracts.Properties.CreateAlertRuleRequest;
using AppCreateAlertRuleRequest = CRM.Enterprise.Application.Properties.CreatePropertyAlertRuleRequest;
using AppAlertCriteriaRequest = CRM.Enterprise.Application.Properties.PropertyAlertCriteriaRequest;
using ApiToggleAlertRuleRequest = CRM.Enterprise.Api.Contracts.Properties.ToggleAlertRuleRequest;
using AppToggleAlertRuleRequest = CRM.Enterprise.Application.Properties.TogglePropertyAlertRuleRequest;
using AppRegisterPropertyPhotoRequest = CRM.Enterprise.Application.Properties.RegisterPropertyPhotoRequest;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.PropertiesView)]
[ApiController]
[Route("api/properties")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ITenantProvider _tenantProvider;
    private readonly IWebHostEnvironment _environment;

    public PropertiesController(
        IPropertyService propertyService,
        ICrmRealtimePublisher realtimePublisher,
        ITenantProvider tenantProvider,
        IWebHostEnvironment environment)
    {
        _propertyService = propertyService;
        _realtimePublisher = realtimePublisher;
        _tenantProvider = tenantProvider;
        _environment = environment;
    }

    [HttpGet]
    public async Task<ActionResult<PropertySearchResponse>> GetProperties(
        [FromQuery] string? search,
        [FromQuery] string? status,
        [FromQuery] string? propertyType,
        [FromQuery] string? city,
        [FromQuery] string? sortBy,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var result = await _propertyService.SearchAsync(
            new PropertySearchRequest(search, status, propertyType, city, sortBy, page, pageSize),
            cancellationToken);
        var items = result.Items.Select(ToApiItem);
        return Ok(new PropertySearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PropertyListItem>> GetProperty(Guid id, CancellationToken cancellationToken)
    {
        var property = await _propertyService.GetAsync(id, cancellationToken);
        if (property is null) return NotFound();
        return Ok(ToApiItem(property));
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<PropertyListItem>> Create([FromBody] ApiUpsertPropertyRequest request, CancellationToken cancellationToken)
    {
        var result = await _propertyService.CreateAsync(MapUpsertRequest(request), GetActor(), cancellationToken);
        if (!result.Success)
        {
            return BadRequest(result.Error);
        }

        await PublishPropertyRealtimeAsync("created", result.Value!.Id, cancellationToken);
        return CreatedAtAction(nameof(GetProperty), new { id = result.Value!.Id }, ToApiItem(result.Value!));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<IActionResult> Update(Guid id, [FromBody] ApiUpsertPropertyRequest request, CancellationToken cancellationToken)
    {
        var result = await _propertyService.UpdateAsync(id, MapUpsertRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishPropertyRealtimeAsync("updated", id, cancellationToken);
        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            await PublishTenantEventAsync(
                "property.status.changed",
                new
                {
                    entityId = id,
                    newStatus = request.Status,
                    occurredAtUtc = DateTime.UtcNow
                },
                cancellationToken);
        }
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var result = await _propertyService.DeleteAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishPropertyRealtimeAsync("deleted", id, cancellationToken);
        return NoContent();
    }

    // ── Showings ──

    [HttpGet("{propertyId:guid}/showings")]
    public async Task<ActionResult<IEnumerable<ShowingListItem>>> GetShowings(Guid propertyId, CancellationToken ct)
    {
        var items = await _propertyService.GetShowingsAsync(propertyId, ct);
        return Ok(items.Select(s => new ShowingListItem(
            s.Id, s.PropertyId, s.AgentId, s.AgentName,
            s.VisitorName, s.VisitorEmail, s.VisitorPhone,
            s.ScheduledAtUtc, s.DurationMinutes, s.Feedback, s.Rating,
            s.Status, s.CreatedAtUtc)));
    }

    [HttpPost("{propertyId:guid}/showings")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<ShowingListItem>> CreateShowing(Guid propertyId, [FromBody] ApiCreateShowingRequest request, CancellationToken ct)
    {
        var result = await _propertyService.CreateShowingAsync(propertyId, new AppCreateShowingRequest(
            request.AgentId, request.AgentName, request.VisitorName,
            request.VisitorEmail, request.VisitorPhone, request.ScheduledAtUtc,
            request.DurationMinutes, request.Status), GetActor(), ct);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var s = result.Value!;
        await PublishTenantEventAsync(
            "property.showing.scheduled",
            new
            {
                entityId = propertyId,
                visitorName = s.VisitorName,
                scheduledAtUtc = s.ScheduledAtUtc
            },
            ct);
        return Created($"api/properties/{propertyId}/showings/{s.Id}", new ShowingListItem(
            s.Id, s.PropertyId, s.AgentId, s.AgentName,
            s.VisitorName, s.VisitorEmail, s.VisitorPhone,
            s.ScheduledAtUtc, s.DurationMinutes, s.Feedback, s.Rating,
            s.Status, s.CreatedAtUtc));
    }

    [HttpPut("{propertyId:guid}/showings/{showingId:guid}")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<ShowingListItem>> UpdateShowing(Guid propertyId, Guid showingId, [FromBody] ApiUpdateShowingRequest request, CancellationToken ct)
    {
        var result = await _propertyService.UpdateShowingAsync(propertyId, showingId, new AppUpdateShowingRequest(
            request.AgentId, request.AgentName, request.VisitorName,
            request.VisitorEmail, request.VisitorPhone, request.ScheduledAtUtc,
            request.DurationMinutes, request.Feedback, request.Rating, request.Status), GetActor(), ct);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var s = result.Value!;
        return Ok(new ShowingListItem(
            s.Id, s.PropertyId, s.AgentId, s.AgentName,
            s.VisitorName, s.VisitorEmail, s.VisitorPhone,
            s.ScheduledAtUtc, s.DurationMinutes, s.Feedback, s.Rating,
            s.Status, s.CreatedAtUtc));
    }

    // ── Documents ──

    [HttpGet("{propertyId:guid}/documents")]
    public async Task<ActionResult<IEnumerable<DocumentListItem>>> GetDocuments(Guid propertyId, CancellationToken ct)
    {
        var items = await _propertyService.GetDocumentsAsync(propertyId, ct);
        return Ok(items.Select(d => new DocumentListItem(
            d.Id, d.PropertyId, d.FileName, d.FileUrl,
            d.FileSize, d.MimeType, d.Category, d.UploadedBy, d.UploadedAtUtc)));
    }

    [HttpPost("{propertyId:guid}/documents")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<DocumentListItem>> CreateDocument(Guid propertyId, [FromBody] ApiCreateDocumentRequest request, CancellationToken ct)
    {
        var result = await _propertyService.CreateDocumentAsync(propertyId, new AppCreateDocumentRequest(
            request.FileName, request.FileUrl, request.FileSize, request.MimeType, request.Category), GetActor(), ct);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var d = result.Value!;
        await PublishTenantEventAsync(
            "property.document.uploaded",
            new
            {
                entityId = propertyId,
                fileName = d.FileName,
                category = d.Category,
                occurredAtUtc = d.UploadedAtUtc
            },
            ct);
        return Created($"api/properties/{propertyId}/documents/{d.Id}", new DocumentListItem(
            d.Id, d.PropertyId, d.FileName, d.FileUrl,
            d.FileSize, d.MimeType, d.Category, d.UploadedBy, d.UploadedAtUtc));
    }

    [HttpDelete("{propertyId:guid}/documents/{documentId:guid}")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<IActionResult> DeleteDocument(Guid propertyId, Guid documentId, CancellationToken ct)
    {
        var result = await _propertyService.DeleteDocumentAsync(propertyId, documentId, GetActor(), ct);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return NoContent();
    }

    // ── Activities ──

    [HttpGet("{propertyId:guid}/activities")]
    public async Task<ActionResult<IEnumerable<ActivityListItem>>> GetActivities(Guid propertyId, CancellationToken ct)
    {
        var items = await _propertyService.GetActivitiesAsync(propertyId, ct);
        return Ok(items.Select(a => new ActivityListItem(
            a.Id, a.PropertyId, a.Type, a.Subject, a.Description,
            a.DueDate, a.CompletedDate, a.Status, a.Priority,
            a.AssignedToId, a.AssignedToName, a.CreatedByName, a.CreatedAtUtc)));
    }

    [HttpPost("{propertyId:guid}/activities")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<ActivityListItem>> CreateActivity(Guid propertyId, [FromBody] ApiCreateActivityRequest request, CancellationToken ct)
    {
        var result = await _propertyService.CreateActivityAsync(propertyId, new AppCreateActivityRequest(
            request.Type, request.Subject, request.Description, request.DueDate,
            request.Status, request.Priority, request.AssignedToId, request.AssignedToName), GetActor(), ct);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var a = result.Value!;
        await PublishTenantEventAsync(
            "property.activity.created",
            new
            {
                entityId = propertyId,
                subject = a.Subject,
                occurredAtUtc = a.CreatedAtUtc
            },
            ct);
        return Created($"api/properties/{propertyId}/activities/{a.Id}", new ActivityListItem(
            a.Id, a.PropertyId, a.Type, a.Subject, a.Description,
            a.DueDate, a.CompletedDate, a.Status, a.Priority,
            a.AssignedToId, a.AssignedToName, a.CreatedByName, a.CreatedAtUtc));
    }

    [HttpPut("{propertyId:guid}/activities/{activityId:guid}")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<ActivityListItem>> UpdateActivity(Guid propertyId, Guid activityId, [FromBody] ApiUpdateActivityRequest request, CancellationToken ct)
    {
        var result = await _propertyService.UpdateActivityAsync(propertyId, activityId, new AppUpdateActivityRequest(
            request.Type, request.Subject, request.Description, request.DueDate,
            request.CompletedDate, request.Status, request.Priority,
            request.AssignedToId, request.AssignedToName), GetActor(), ct);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var a = result.Value!;
        return Ok(new ActivityListItem(
            a.Id, a.PropertyId, a.Type, a.Subject, a.Description,
            a.DueDate, a.CompletedDate, a.Status, a.Priority,
            a.AssignedToId, a.AssignedToName, a.CreatedByName, a.CreatedAtUtc));
    }

    // ── Price History ──

    [HttpGet("{propertyId:guid}/price-history")]
    public async Task<ActionResult<IEnumerable<PriceChangeListItem>>> GetPriceHistory(Guid propertyId, CancellationToken ct)
    {
        var items = await _propertyService.GetPriceHistoryAsync(propertyId, ct);
        return Ok(items.Select(pc => new PriceChangeListItem(
            pc.Id, pc.PropertyId, pc.PreviousPrice, pc.NewPrice,
            pc.ChangedAtUtc, pc.ChangedBy, pc.Reason)));
    }

    [HttpPost("{propertyId:guid}/price-history")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<PriceChangeListItem>> AddPriceChange(Guid propertyId, [FromBody] ApiAddPriceChangeRequest request, CancellationToken ct)
    {
        var result = await _propertyService.AddPriceChangeAsync(propertyId, new AppAddPriceChangeRequest(
            request.PreviousPrice, request.NewPrice, request.ChangedBy, request.Reason), GetActor(), ct);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        var pc = result.Value!;
        await PublishTenantEventAsync(
            "property.price.changed",
            new
            {
                entityId = propertyId,
                newPrice = pc.NewPrice,
                previousPrice = pc.PreviousPrice,
                occurredAtUtc = pc.ChangedAtUtc
            },
            ct);
        return Created($"api/properties/{propertyId}/price-history/{pc.Id}", new PriceChangeListItem(
            pc.Id, pc.PropertyId, pc.PreviousPrice, pc.NewPrice,
            pc.ChangedAtUtc, pc.ChangedBy, pc.Reason));
    }

    [HttpGet("{propertyId:guid}/timeline")]
    public async Task<ActionResult<IEnumerable<TimelineEventListItem>>> GetTimeline(Guid propertyId, CancellationToken ct)
    {
        var items = await _propertyService.GetTimelineAsync(propertyId, ct);
        return Ok(items.Select(i => new TimelineEventListItem(
            i.Id, i.PropertyId, i.EventType, i.Label, i.Description, i.Icon, i.Variant, i.OccurredAtUtc)));
    }

    [HttpPost("{propertyId:guid}/photos")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    [RequestSizeLimit(10 * 1024 * 1024)]
    public async Task<ActionResult<DocumentListItem>> UploadPhoto(Guid propertyId, [FromForm] IFormFile file, CancellationToken ct)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("Photo file is required.");
        }

        var mimeType = file.ContentType?.Trim().ToLowerInvariant() ?? string.Empty;
        var allowed = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif"
        };
        if (!allowed.Contains(mimeType))
        {
            return BadRequest("Unsupported image type.");
        }

        var tenantKey = _tenantProvider.TenantKey
            ?? Request.Headers["X-Tenant-Key"].FirstOrDefault()
            ?? "default";
        var storageRoot = Path.Combine(_environment.ContentRootPath, "uploads", tenantKey.ToLowerInvariant(), "properties", propertyId.ToString("N"));
        Directory.CreateDirectory(storageRoot);

        var extension = Path.GetExtension(file.FileName ?? string.Empty);
        var safeStem = Regex.Replace(Path.GetFileNameWithoutExtension(file.FileName ?? "photo"), "[^A-Za-z0-9_-]+", "-").Trim('-');
        if (string.IsNullOrWhiteSpace(safeStem))
        {
            safeStem = "photo";
        }

        var storedName = $"{Guid.NewGuid():N}_{safeStem}{extension}";
        var absolutePath = Path.Combine(storageRoot, storedName);
        await using (var stream = System.IO.File.Create(absolutePath))
        {
            await file.CopyToAsync(stream, ct);
        }

        var relativeUrl = $"/api/properties/{propertyId}/photos/{storedName}";
        var result = await _propertyService.RegisterPhotoAsync(
            propertyId,
            new AppRegisterPropertyPhotoRequest(
                Path.GetFileName(file.FileName) ?? "photo",
                relativeUrl,
                file.Length,
                file.ContentType ?? "application/octet-stream"),
            GetActor(),
            ct);

        if (result.NotFound)
        {
            return NotFound();
        }
        if (!result.Success)
        {
            return BadRequest(result.Error);
        }

        var doc = result.Value!;
        await PublishTenantEventAsync(
            "property.document.uploaded",
            new
            {
                entityId = propertyId,
                fileName = doc.FileName,
                category = doc.Category,
                occurredAtUtc = doc.UploadedAtUtc
            },
            ct);

        return Created(doc.FileUrl, new DocumentListItem(
            doc.Id, doc.PropertyId, doc.FileName, doc.FileUrl, doc.FileSize, doc.MimeType, doc.Category, doc.UploadedBy, doc.UploadedAtUtc));
    }

    [AllowAnonymous]
    [HttpGet("{propertyId:guid}/photos/{storedName}")]
    public IActionResult DownloadPhoto(Guid propertyId, string storedName)
    {
        var tenantKey = _tenantProvider.TenantKey
            ?? Request.Headers["X-Tenant-Key"].FirstOrDefault()
            ?? "default";
        var absolutePath = Path.Combine(_environment.ContentRootPath, "uploads", tenantKey.ToLowerInvariant(), "properties", propertyId.ToString("N"), storedName);
        if (!System.IO.File.Exists(absolutePath))
        {
            return NotFound();
        }

        var contentType = Path.GetExtension(storedName).ToLowerInvariant() switch
        {
            ".png" => "image/png",
            ".webp" => "image/webp",
            ".gif" => "image/gif",
            _ => "image/jpeg"
        };

        return PhysicalFile(absolutePath, contentType);
    }

    // ── Integration Stubs (MLS, CMA, Signatures, Alerts) ──

    [HttpGet("mls-feeds")]
    public IActionResult GetMlsFeeds() => Ok(Array.Empty<object>());

    [HttpPost("mls-feeds")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public IActionResult CreateMlsFeed([FromBody] object request) =>
        Created("api/properties/mls-feeds", new { id = Guid.NewGuid(), status = "Active", totalImported = 0, createdAtUtc = DateTime.UtcNow });

    [HttpPost("mls-feeds/{feedId:guid}/import")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public IActionResult TriggerMlsImport(Guid feedId) =>
        Ok(new { id = Guid.NewGuid(), feedId, status = "Completed", totalRecords = 0, imported = 0, updated = 0, skipped = 0, errors = 0, startedAtUtc = DateTime.UtcNow, completedAtUtc = DateTime.UtcNow });

    [HttpGet("mls-imports")]
    public IActionResult GetMlsImportHistory() => Ok(Array.Empty<object>());

    [HttpGet("{propertyId:guid}/cma")]
    public async Task<ActionResult<CmaReportResponse>> GetCmaReport(Guid propertyId, CancellationToken ct)
    {
        var report = await _propertyService.GetCmaReportAsync(propertyId, ct);
        return Ok(ToCmaResponse(report));
    }

    [HttpPost("{propertyId:guid}/cma")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<CmaReportResponse>> GenerateCmaReport(Guid propertyId, [FromBody] GenerateCmaReportApiRequest request, CancellationToken ct)
    {
        var actor = GetActor();
        var appRequest = new Application.Properties.GenerateCmaRequest(request.RadiusMiles ?? 2);
        var report = await _propertyService.GenerateCmaReportAsync(propertyId, appRequest, actor, ct);
        return Ok(ToCmaResponse(report));
    }

    [HttpGet("{propertyId:guid}/signatures")]
    public async Task<ActionResult<IEnumerable<SignatureRequestListItem>>> GetSignatureRequests(Guid propertyId, CancellationToken ct)
    {
        var items = await _propertyService.GetSignatureRequestsAsync(propertyId, ct);
        return Ok(items.Select(ToApiSignatureRequest));
    }

    [HttpPost("{propertyId:guid}/signatures")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<SignatureRequestListItem>> CreateSignatureRequest(Guid propertyId, [FromBody] CreateSignatureApiRequest request, CancellationToken ct)
    {
        var actor = GetActor();
        var appSigners = request.Signers?.Select(s =>
            new Application.Properties.SignatureRequestSignerInput(s.Name, s.Email, s.Role)).ToList();
        var appRequest = new Application.Properties.CreateSignatureRequestRequest(
            request.DocumentName,
            request.DocumentType,
            request.Provider,
            appSigners);
        var result = await _propertyService.CreateSignatureRequestAsync(propertyId, appRequest, actor, ct);

        if (!result.Success) return result.NotFound ? NotFound() : BadRequest(result.Error);

        await PublishTenantEventAsync($"property.{propertyId}.signature.created", new { propertyId, signatureId = result.Value!.Id }, ct);
        return Created($"api/properties/{propertyId}/signatures/{result.Value.Id}", ToApiSignatureRequest(result.Value));
    }

    [HttpGet("{propertyId:guid}/alerts")]
    public async Task<ActionResult<IEnumerable<PropertyAlertRuleListItem>>> GetAlertRules(Guid propertyId, CancellationToken ct)
    {
        var items = await _propertyService.GetAlertRulesAsync(propertyId, ct);
        return Ok(items.Select(ToApiAlertRule));
    }

    [HttpPost("{propertyId:guid}/alerts")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<PropertyAlertRuleListItem>> CreateAlertRule(Guid propertyId, [FromBody] ApiCreateAlertRuleRequest request, CancellationToken ct)
    {
        var result = await _propertyService.CreateAlertRuleAsync(propertyId, new AppCreateAlertRuleRequest(
            request.ClientName,
            request.ClientEmail,
            new AppAlertCriteriaRequest(
                request.Criteria.MinPrice,
                request.Criteria.MaxPrice,
                request.Criteria.PropertyTypes,
                request.Criteria.MinBedrooms,
                request.Criteria.Cities,
                request.Criteria.Neighborhoods),
            request.Frequency), GetActor(), ct);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);

        var rule = result.Value!;
        await PublishTenantEventAsync(
            "property.alert.rule.created",
            new
            {
                entityId = propertyId,
                ruleId = rule.Id,
                clientName = rule.ClientName,
                occurredAtUtc = rule.CreatedAtUtc
            },
            ct);
        return Created($"api/properties/{propertyId}/alerts/{rule.Id}", ToApiAlertRule(rule));
    }

    [HttpPut("{propertyId:guid}/alerts/{ruleId:guid}")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public async Task<ActionResult<PropertyAlertRuleListItem>> ToggleAlertRule(Guid propertyId, Guid ruleId, [FromBody] ApiToggleAlertRuleRequest request, CancellationToken ct)
    {
        var result = await _propertyService.ToggleAlertRuleAsync(propertyId, ruleId, new AppToggleAlertRuleRequest(request.IsActive), GetActor(), ct);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        return Ok(ToApiAlertRule(result.Value!));
    }

    [HttpGet("{propertyId:guid}/alert-notifications")]
    public async Task<ActionResult<IEnumerable<PropertyAlertNotificationListItem>>> GetAlertNotifications(Guid propertyId, CancellationToken ct)
    {
        var items = await _propertyService.GetAlertNotificationsAsync(propertyId, ct);
        return Ok(items.Select(n => new PropertyAlertNotificationListItem(
            n.Id,
            n.PropertyId,
            n.RuleId,
            n.ClientName,
            n.ClientEmail,
            n.MatchedProperties,
            n.SentAtUtc,
            n.Status,
            n.TriggeredBy)));
    }

    private static PropertyListItem ToApiItem(PropertyListItemDto dto)
    {
        return new PropertyListItem(
            dto.Id,
            dto.MlsNumber,
            dto.Address,
            dto.City,
            dto.Province,
            dto.PostalCode,
            dto.Country,
            dto.ListPrice,
            dto.SalePrice,
            dto.Currency,
            dto.ListingDateUtc,
            dto.SoldDateUtc,
            dto.Status,
            dto.PropertyType,
            dto.Bedrooms,
            dto.Bathrooms,
            dto.SquareFeet,
            dto.LotSizeSqFt,
            dto.YearBuilt,
            dto.GarageSpaces,
            dto.Description,
            dto.Features,
            dto.PhotoUrls,
            dto.VirtualTourUrl,
            dto.CommissionRate,
            dto.BuyerAgentCommission,
            dto.SellerAgentCommission,
            dto.CoListingAgentId,
            dto.CoListingAgentName,
            dto.OwnerId,
            dto.OwnerName,
            dto.AccountId,
            dto.AccountName,
            dto.PrimaryContactId,
            dto.PrimaryContactName,
            dto.OpportunityId,
            dto.Neighborhood,
            dto.CreatedAtUtc);
    }

    private static AppPropertyUpsertRequest MapUpsertRequest(ApiUpsertPropertyRequest request)
    {
        return new AppPropertyUpsertRequest(
            request.MlsNumber,
            request.Address,
            request.City,
            request.Province,
            request.PostalCode,
            request.Country,
            request.ListPrice,
            request.SalePrice,
            request.Currency,
            request.ListingDateUtc,
            request.SoldDateUtc,
            request.Status,
            request.PropertyType,
            request.Bedrooms,
            request.Bathrooms,
            request.SquareFeet,
            request.LotSizeSqFt,
            request.YearBuilt,
            request.GarageSpaces,
            request.Description,
            request.Features,
            request.PhotoUrls,
            request.VirtualTourUrl,
            request.CommissionRate,
            request.BuyerAgentCommission,
            request.SellerAgentCommission,
            request.CoListingAgentId,
            request.OwnerId,
            request.AccountId,
            request.PrimaryContactId,
            request.OpportunityId,
            request.Neighborhood);
    }

    private ActorContext GetActor()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var name = User.FindFirstValue(ClaimTypes.Name);
        var parsed = Guid.TryParse(id, out var value) ? value : (Guid?)null;
        return new ActorContext(parsed, name);
    }

    private Task PublishPropertyRealtimeAsync(string action, Guid propertyId, CancellationToken cancellationToken)
    {
        return PublishTenantEventAsync(
            "entity.crud.changed",
            new
            {
                entityType = "Property",
                entityId = propertyId,
                action,
                changedFields = Array.Empty<string>(),
                actorUserId = GetActor().UserId,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);
    }

    private Task PublishTenantEventAsync(string eventType, object payload, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return _realtimePublisher.PublishTenantEventAsync(tenantId, eventType, payload, cancellationToken);
    }

    private static PropertyAlertRuleListItem ToApiAlertRule(PropertyAlertRuleDto dto)
        => new(
            dto.Id,
            dto.PropertyId,
            dto.ClientName,
            dto.ClientEmail,
            new PropertyAlertCriteria(
                dto.Criteria.MinPrice,
                dto.Criteria.MaxPrice,
                dto.Criteria.PropertyTypes,
                dto.Criteria.MinBedrooms,
                dto.Criteria.Cities,
                dto.Criteria.Neighborhoods),
            dto.Frequency,
            dto.IsActive,
            dto.MatchCount,
            dto.LastNotifiedAtUtc,
            dto.CreatedAtUtc);

    private static CmaReportResponse ToCmaResponse(CmaReportDto dto)
        => new(
            dto.PropertyId,
            dto.GeneratedAtUtc,
            dto.Comparables.Select(c => new ComparablePropertyItem(
                c.Id, c.Address, c.City, c.Neighborhood, c.PropertyType,
                c.ListPrice, c.SalePrice, c.SquareFeet, c.Bedrooms, c.Bathrooms, c.YearBuilt,
                c.Status, c.SoldDateUtc, c.DaysOnMarket, c.PricePerSqFt, c.DistanceMiles, c.Source)).ToList(),
            new CmaSummaryItem(
                dto.Summary.AvgListPrice, dto.Summary.AvgSalePrice, dto.Summary.AvgPricePerSqFt,
                dto.Summary.AvgDaysOnMarket, dto.Summary.MedianPrice, dto.Summary.PriceRangeLow,
                dto.Summary.PriceRangeHigh, dto.Summary.SuggestedPrice, dto.Summary.MarketTrend));

    private static SignatureRequestListItem ToApiSignatureRequest(SignatureRequestDto dto)
        => new(
            dto.Id, dto.PropertyId, dto.DocumentName, dto.DocumentType, dto.Provider, dto.Status,
            dto.Signers.Select(s => new SignerItem(s.Name, s.Email, s.Role, s.Status, s.SignedAtUtc)).ToList(),
            dto.SentAtUtc, dto.CompletedAtUtc, dto.ExpiresAtUtc, dto.CreatedByName, dto.CreatedAtUtc);
}
