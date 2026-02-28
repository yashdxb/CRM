using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Activities;
using ApiActivityUpsertRequest = CRM.Enterprise.Api.Contracts.Activities.UpsertActivityRequest;
using AppActivityUpsertRequest = CRM.Enterprise.Application.Activities.ActivityUpsertRequest;
using CRM.Enterprise.Api.Contracts.Audit;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Application.Activities;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Tenants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.ActivitiesView)]
[ApiController]
[Route("api/activities")]
public class ActivitiesController : ControllerBase
{
    private readonly IActivityService _activityService;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ITenantProvider _tenantProvider;

    public ActivitiesController(
        IActivityService activityService,
        ICrmRealtimePublisher realtimePublisher,
        ITenantProvider tenantProvider)
    {
        _activityService = activityService;
        _realtimePublisher = realtimePublisher;
        _tenantProvider = tenantProvider;
    }

    [HttpGet]
    public async Task<ActionResult<ActivitySearchResponse>> GetActivities(
        [FromQuery] string? status,
        [FromQuery] string? search,
        [FromQuery] Guid? ownerId,
        [FromQuery] ActivityType? type,
        [FromQuery] ActivityRelationType? relatedEntityType,
        [FromQuery] Guid? relatedEntityId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var result = await _activityService.SearchAsync(
            new ActivitySearchRequest(status, search, ownerId, type, relatedEntityType, relatedEntityId, page, pageSize),
            cancellationToken);
        var items = result.Items.Select(ToApiItem);
        return Ok(new ActivitySearchResponse(items, result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ActivityListItem>> GetById(Guid id, CancellationToken cancellationToken = default)
    {
        var activity = await _activityService.GetAsync(id, cancellationToken);
        if (activity is null) return NotFound();
        return Ok(ToApiItem(activity));
    }

    [HttpGet("{id:guid}/audit")]
    public async Task<ActionResult<IEnumerable<AuditEventItem>>> GetAudit(Guid id, CancellationToken cancellationToken)
    {
        var audit = await _activityService.GetAuditAsync(id, cancellationToken);
        if (audit is null) return NotFound();
        var items = audit.Select(a => new AuditEventItem(
            a.Id,
            a.EntityType,
            a.EntityId,
            a.Action,
            a.Field,
            a.OldValue,
            a.NewValue,
            a.ChangedByUserId,
            a.ChangedByName,
            a.CreatedAtUtc));
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.ActivitiesManage)]
    public async Task<ActionResult<ActivityListItem>> Create([FromBody] ApiActivityUpsertRequest request, CancellationToken cancellationToken)
    {
        var result = await _activityService.CreateAsync(MapUpsertRequest(request), GetActor(), cancellationToken);
        if (!result.Success) return BadRequest(result.Error);
        await PublishActivityRealtimeAsync("created", result.Value!.Id, cancellationToken);
        return CreatedAtAction(nameof(GetActivities), new { id = result.Value!.Id }, ToApiItem(result.Value!));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.ActivitiesManage)]
    public async Task<IActionResult> Update(Guid id, [FromBody] ApiActivityUpsertRequest request, CancellationToken cancellationToken)
    {
        var result = await _activityService.UpdateAsync(id, MapUpsertRequest(request), GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishActivityRealtimeAsync("updated", id, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.ActivitiesManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var result = await _activityService.DeleteAsync(id, GetActor(), cancellationToken);
        if (result.NotFound) return NotFound();
        if (!result.Success) return BadRequest(result.Error);
        await PublishActivityRealtimeAsync("deleted", id, cancellationToken);
        return NoContent();
    }

    private static ActivityListItem ToApiItem(ActivityListItemDto dto)
    {
        return new ActivityListItem(
            dto.Id,
            dto.Subject,
            dto.Type,
            dto.Description,
            dto.Outcome,
            dto.NextStepSubject,
            dto.NextStepDueDateUtc,
            dto.TemplateKey,
            dto.Priority,
            dto.RelatedEntityId,
            dto.RelatedEntityName,
            dto.RelatedEntityType,
            dto.DueDateUtc,
            dto.CompletedDateUtc,
            dto.Status,
            dto.OwnerId,
            dto.OwnerName,
            dto.CreatedAtUtc);
    }

    private static AppActivityUpsertRequest MapUpsertRequest(ApiActivityUpsertRequest request)
    {
        return new ActivityUpsertRequest(
            request.Subject,
            request.Description,
            request.Outcome,
            request.TemplateKey,
            request.Type,
            request.Priority,
            request.DueDateUtc,
            request.CompletedDateUtc,
            request.NextStepSubject,
            request.NextStepDueDateUtc,
            request.RelatedEntityType,
            request.RelatedEntityId,
            request.OwnerId);
    }

    private ActorContext GetActor()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(id, out var parsed) ? parsed : (Guid?)null;
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new ActorContext(userId, name);
    }

    private async Task PublishActivityRealtimeAsync(string action, Guid activityId, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return;
        }

        await _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "entity.crud.changed",
            new
            {
                entityType = "Activity",
                entityId = activityId,
                action,
                changedFields = Array.Empty<string>(),
                actorUserId = GetActor().UserId,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);

        await _realtimePublisher.PublishTenantEventAsync(
            tenantId,
            "dashboard.metrics.delta",
            new
            {
                source = "activity",
                activityId,
                action,
                occurredAtUtc = DateTime.UtcNow
            },
            cancellationToken);
    }
}
