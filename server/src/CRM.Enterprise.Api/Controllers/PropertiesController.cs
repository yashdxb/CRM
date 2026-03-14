using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Properties;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Properties;
using CRM.Enterprise.Application.Tenants;
using System.Security.Claims;
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

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.PropertiesView)]
[ApiController]
[Route("api/properties")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ITenantProvider _tenantProvider;

    public PropertiesController(
        IPropertyService propertyService,
        ICrmRealtimePublisher realtimePublisher,
        ITenantProvider tenantProvider)
    {
        _propertyService = propertyService;
        _realtimePublisher = realtimePublisher;
        _tenantProvider = tenantProvider;
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
        return Created($"api/properties/{propertyId}/price-history/{pc.Id}", new PriceChangeListItem(
            pc.Id, pc.PropertyId, pc.PreviousPrice, pc.NewPrice,
            pc.ChangedAtUtc, pc.ChangedBy, pc.Reason));
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
    public IActionResult GetCmaReport(Guid propertyId) =>
        Ok(new { propertyId, generatedAtUtc = DateTime.UtcNow, comparables = Array.Empty<object>(), summary = new { avgListPrice = 0, avgSalePrice = 0, avgPricePerSqFt = 0, avgDaysOnMarket = 0, medianPrice = 0, priceRangeLow = 0, priceRangeHigh = 0, suggestedPrice = 0, marketTrend = "Stable" } });

    [HttpPost("{propertyId:guid}/cma")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public IActionResult GenerateCmaReport(Guid propertyId, [FromBody] object request) =>
        Ok(new { propertyId, generatedAtUtc = DateTime.UtcNow, comparables = Array.Empty<object>(), summary = new { avgListPrice = 0, avgSalePrice = 0, avgPricePerSqFt = 0, avgDaysOnMarket = 0, medianPrice = 0, priceRangeLow = 0, priceRangeHigh = 0, suggestedPrice = 0, marketTrend = "Stable" } });

    [HttpGet("{propertyId:guid}/signatures")]
    public IActionResult GetSignatureRequests(Guid propertyId) => Ok(Array.Empty<object>());

    [HttpPost("{propertyId:guid}/signatures")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public IActionResult CreateSignatureRequest(Guid propertyId, [FromBody] object request) =>
        Created($"api/properties/{propertyId}/signatures/{Guid.NewGuid()}", new { id = Guid.NewGuid(), propertyId, status = "Draft", signers = Array.Empty<object>(), createdAtUtc = DateTime.UtcNow });

    [HttpGet("{propertyId:guid}/alerts")]
    public IActionResult GetAlertRules(Guid propertyId) => Ok(Array.Empty<object>());

    [HttpPost("{propertyId:guid}/alerts")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public IActionResult CreateAlertRule(Guid propertyId, [FromBody] object request) =>
        Created($"api/properties/{propertyId}/alerts/{Guid.NewGuid()}", new { id = Guid.NewGuid(), propertyId, isActive = true, matchCount = 0, createdAtUtc = DateTime.UtcNow });

    [HttpPut("{propertyId:guid}/alerts/{ruleId:guid}")]
    [Authorize(Policy = Permissions.Policies.PropertiesManage)]
    public IActionResult ToggleAlertRule(Guid propertyId, Guid ruleId, [FromBody] object request) =>
        Ok(new { id = ruleId, propertyId, isActive = true, matchCount = 0, createdAtUtc = DateTime.UtcNow });

    [HttpGet("{propertyId:guid}/alert-notifications")]
    public IActionResult GetAlertNotifications(Guid propertyId) => Ok(Array.Empty<object>());

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
                entityType = "Property",
                entityId = propertyId,
                action,
                changedFields = Array.Empty<string>(),
                actorUserId = GetActor().UserId,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);
    }
}
