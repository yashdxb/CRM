using System.Security.Claims;
using CRM.Enterprise.Api.Contracts.Opportunities;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.OpportunitiesView)]
[ApiController]
public sealed class OpportunityQuotesController : ControllerBase
{
    private readonly IOpportunityQuoteService _service;

    public OpportunityQuotesController(IOpportunityQuoteService service)
    {
        _service = service;
    }

    [HttpGet("api/opportunities/{opportunityId:guid}/quotes")]
    public async Task<ActionResult<IReadOnlyList<OpportunityQuoteListItem>>> GetQuotes(Guid opportunityId, CancellationToken cancellationToken)
    {
        var items = await _service.GetByOpportunityAsync(opportunityId, cancellationToken);
        if (items is null)
        {
            return NotFound();
        }

        return Ok(items.Select(MapListItem).ToList());
    }

    [HttpGet("api/opportunities/{opportunityId:guid}/quotes/{quoteId:guid}")]
    public async Task<ActionResult<OpportunityQuoteDetail>> GetQuote(Guid opportunityId, Guid quoteId, CancellationToken cancellationToken)
    {
        var item = await _service.GetByIdAsync(opportunityId, quoteId, cancellationToken);
        if (item is null)
        {
            return NotFound();
        }

        return Ok(MapDetail(item));
    }

    [HttpPost("api/opportunities/{opportunityId:guid}/quotes")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityQuoteDetail>> CreateQuote(
        Guid opportunityId,
        [FromBody] CreateOpportunityQuoteRequest request,
        CancellationToken cancellationToken)
    {
        OpportunityQuoteDetailDto? result;
        try
        {
            result = await _service.CreateAsync(
                opportunityId,
                new CRM.Enterprise.Application.Opportunities.OpportunityQuoteCreateRequest(
                    request.Name,
                    request.PriceListId,
                    request.Currency,
                    request.TaxAmount,
                    request.Notes,
                    request.Lines.Select(MapLineRequest).ToList()),
                GetActor(),
                cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }

        if (result is null)
        {
            return NotFound();
        }

        return CreatedAtAction(nameof(GetQuote), new { opportunityId, quoteId = result.Id }, MapDetail(result));
    }

    [HttpPut("api/opportunities/{opportunityId:guid}/quotes/{quoteId:guid}")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityQuoteDetail>> UpdateQuote(
        Guid opportunityId,
        Guid quoteId,
        [FromBody] UpdateOpportunityQuoteRequest request,
        CancellationToken cancellationToken)
    {
        OpportunityQuoteDetailDto? result;
        try
        {
            result = await _service.UpdateAsync(
                opportunityId,
                quoteId,
                new CRM.Enterprise.Application.Opportunities.OpportunityQuoteUpdateRequest(
                    request.Name,
                    request.Status,
                    request.PriceListId,
                    request.Currency,
                    request.TaxAmount,
                    request.Notes,
                    request.Lines.Select(MapLineRequest).ToList()),
                GetActor(),
                cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }

        if (result is null)
        {
            return NotFound();
        }

        return Ok(MapDetail(result));
    }

    [HttpPost("api/opportunities/{opportunityId:guid}/quotes/{quoteId:guid}/submit-approval")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesApprovalsRequest)]
    public async Task<ActionResult<OpportunityQuoteDetail>> SubmitForApproval(
        Guid opportunityId,
        Guid quoteId,
        CancellationToken cancellationToken)
    {
        OpportunityQuoteDetailDto? result;
        try
        {
            result = await _service.SubmitForApprovalAsync(opportunityId, quoteId, GetActor(), cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }

        if (result is null)
        {
            return NotFound();
        }

        return Ok(MapDetail(result));
    }

    private static CRM.Enterprise.Application.Opportunities.OpportunityQuoteLineRequest MapLineRequest(
        CRM.Enterprise.Api.Contracts.Opportunities.OpportunityQuoteLineRequest request)
        => new(request.ItemMasterId, request.Description, request.Quantity, request.UnitPrice, request.DiscountPercent);

    private static OpportunityQuoteListItem MapListItem(OpportunityQuoteListItemDto item)
        => new(item.Id, item.QuoteNumber, item.Name, item.Status, item.PriceListId, item.Currency, item.TotalAmount, item.CreatedAtUtc, item.UpdatedAtUtc);

    private static OpportunityQuoteDetail MapDetail(OpportunityQuoteDetailDto item)
        => new(
            item.Id,
            item.OpportunityId,
            item.QuoteNumber,
            item.Name,
            item.Status,
            item.PriceListId,
            item.Currency,
            item.Subtotal,
            item.DiscountAmount,
            item.TaxAmount,
            item.TotalAmount,
            item.Notes,
            item.CreatedAtUtc,
            item.UpdatedAtUtc,
            item.Lines.Select(l => new OpportunityQuoteLine(
                l.Id,
                l.ItemMasterId,
                l.ItemName,
                l.ItemSku,
                l.Description,
                l.Quantity,
                l.UnitPrice,
                l.DiscountPercent,
                l.LineTotal)).ToList());

    private ActorContext GetActor()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(subject, out var parsed) ? parsed : (Guid?)null;
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new ActorContext(userId, name);
    }
}
