using System.Security.Claims;
using CRM.Enterprise.Api.Contracts.Drafts;
using CRM.Enterprise.Application.Drafts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/drafts")]
public sealed class DraftsController : ControllerBase
{
    private readonly IFormDraftService _formDraftService;

    public DraftsController(IFormDraftService formDraftService)
    {
        _formDraftService = formDraftService;
    }

    [HttpGet]
    public async Task<ActionResult<FormDraftListResponse>> GetDrafts(
        [FromQuery] string entityType,
        [FromQuery] int limit = 5,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var result = await _formDraftService.GetListAsync(userId.Value, entityType, limit, page, pageSize, cancellationToken);
        return Ok(new FormDraftListResponse(
            result.Items.Select(item => new FormDraftSummaryItem(
                item.Id,
                item.EntityType,
                item.Title,
                item.Subtitle,
                item.CreatedAtUtc,
                item.UpdatedAtUtc)).ToList(),
            result.Total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<FormDraftDetailResponse>> GetDraft(Guid id, CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var draft = await _formDraftService.GetAsync(id, userId.Value, cancellationToken);
        if (draft is null)
        {
            return NotFound();
        }

        return Ok(ToDetailResponse(draft));
    }

    [HttpPost]
    public async Task<ActionResult<FormDraftDetailResponse>> SaveDraft([FromBody] SaveFormDraftRequest request, CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        if (string.IsNullOrWhiteSpace(request.EntityType))
        {
            return BadRequest("Entity type is required.");
        }

        var draft = await _formDraftService.SaveAsync(
            new FormDraftSaveRequest(
                request.Id,
                request.EntityType,
                request.Title ?? string.Empty,
                request.Subtitle,
                request.PayloadJson ?? "{}"),
            userId.Value,
            GetCurrentUserName(),
            cancellationToken);

        return Ok(ToDetailResponse(draft));
    }

    [HttpPost("{id:guid}/complete")]
    public async Task<IActionResult> CompleteDraft(Guid id, CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var completed = await _formDraftService.CompleteAsync(id, userId.Value, GetCurrentUserName(), cancellationToken);
        return completed ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DiscardDraft(Guid id, CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var discarded = await _formDraftService.DiscardAsync(id, userId.Value, GetCurrentUserName(), cancellationToken);
        return discarded ? NoContent() : NotFound();
    }

    private Guid? GetCurrentUserId()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        return Guid.TryParse(id, out var parsed) ? parsed : null;
    }

    private string? GetCurrentUserName()
    {
        return User.Identity?.Name
            ?? User.FindFirstValue(ClaimTypes.Name)
            ?? User.FindFirstValue(ClaimTypes.Email)
            ?? User.FindFirstValue("name");
    }

    private static FormDraftDetailResponse ToDetailResponse(FormDraftDetailDto draft)
    {
        return new FormDraftDetailResponse(
            draft.Id,
            draft.EntityType,
            draft.Title,
            draft.Subtitle,
            draft.PayloadJson,
            draft.Status,
            draft.CreatedAtUtc,
            draft.UpdatedAtUtc);
    }
}
