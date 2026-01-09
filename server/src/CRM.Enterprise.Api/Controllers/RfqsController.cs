using CRM.Enterprise.Api.Contracts.Sourcing;
using CRM.Enterprise.Application.Sourcing;
using ApiUpsertRfqRequest = CRM.Enterprise.Api.Contracts.Sourcing.UpsertRfqRequest;
using AppUpsertRfqRequest = CRM.Enterprise.Application.Sourcing.UpsertRfqRequest;
using AppUpsertRfqLineRequest = CRM.Enterprise.Application.Sourcing.UpsertRfqLineRequest;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/supply-chain/rfqs")]
public sealed class RfqsController : ControllerBase
{
    private readonly IRfqReadService _rfqReadService;
    private readonly IRfqService _rfqService;

    public RfqsController(IRfqReadService rfqReadService, IRfqService rfqService)
    {
        _rfqReadService = rfqReadService;
        _rfqService = rfqService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<RfqListItemResponse>>> GetAll(CancellationToken cancellationToken)
    {
        var rfqs = await _rfqReadService.GetAllAsync(cancellationToken);
        var response = rfqs.Select(rfq => new RfqListItemResponse(
            rfq.Id,
            rfq.RfqNumber,
            rfq.Title,
            rfq.Status,
            rfq.Type,
            rfq.IssueDate,
            rfq.CloseDate,
            rfq.Currency,
            rfq.BuyerName,
            rfq.ResponseCount,
            rfq.SupplierCount)).ToList();

        return Ok(response);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RfqDetailResponse>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var rfq = await _rfqReadService.GetByIdAsync(id, cancellationToken);
        if (rfq is null)
        {
            return NotFound();
        }

        var response = new RfqDetailResponse(
            rfq.Id,
            rfq.RfqNumber,
            rfq.Title,
            rfq.Status,
            rfq.Type,
            rfq.Description,
            rfq.IssueDate,
            rfq.CloseDate,
            rfq.ResponseDeadline,
            rfq.Currency,
            rfq.BuyerName,
            rfq.CreatedBy,
            rfq.CreatedAtUtc,
            rfq.UpdatedAtUtc,
            rfq.ResponseCount,
            rfq.SupplierCount,
            rfq.Lines.Select(line => new RfqLineResponse(
                line.Id,
                line.LineNumber,
                line.ProductName,
                line.Description,
                line.Quantity,
                line.Uom,
                line.TargetPrice)).ToList());

        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<RfqDetailResponse>> Create(
        [FromBody] ApiUpsertRfqRequest request,
        CancellationToken cancellationToken)
    {
        var validationError = ValidateRequest(request);
        if (validationError is not null)
        {
            return BadRequest(new { message = validationError });
        }

        var statusError = ValidateCreateStatus(request.Status);
        if (statusError is not null)
        {
            return BadRequest(new { message = statusError });
        }

        Guid id;
        try
        {
            id = await _rfqService.CreateAsync(
                new AppUpsertRfqRequest(
                    request.RfqNumber,
                    request.Title,
                    request.Description,
                    request.Type,
                    request.Status,
                    request.IssueDate,
                    request.CloseDate,
                    request.ResponseDeadline,
                    request.Currency,
                    request.Lines.Select(line => new AppUpsertRfqLineRequest(
                        line.ProductName,
                        line.Description,
                        line.Quantity,
                        line.Uom,
                        line.TargetPrice)).ToList()),
                cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }

        var rfq = await _rfqReadService.GetByIdAsync(id, cancellationToken);
        if (rfq is null)
        {
            return NotFound();
        }

        var response = new RfqDetailResponse(
            rfq.Id,
            rfq.RfqNumber,
            rfq.Title,
            rfq.Status,
            rfq.Type,
            rfq.Description,
            rfq.IssueDate,
            rfq.CloseDate,
            rfq.ResponseDeadline,
            rfq.Currency,
            rfq.BuyerName,
            rfq.CreatedBy,
            rfq.CreatedAtUtc,
            rfq.UpdatedAtUtc,
            rfq.ResponseCount,
            rfq.SupplierCount,
            rfq.Lines.Select(line => new RfqLineResponse(
                line.Id,
                line.LineNumber,
                line.ProductName,
                line.Description,
                line.Quantity,
                line.Uom,
                line.TargetPrice)).ToList());

        return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] ApiUpsertRfqRequest request,
        CancellationToken cancellationToken)
    {
        var validationError = ValidateRequest(request);
        if (validationError is not null)
        {
            return BadRequest(new { message = validationError });
        }

        bool updated;
        try
        {
            updated = await _rfqService.UpdateAsync(
                id,
                new AppUpsertRfqRequest(
                    request.RfqNumber,
                    request.Title,
                    request.Description,
                    request.Type,
                    request.Status,
                    request.IssueDate,
                    request.CloseDate,
                    request.ResponseDeadline,
                    request.Currency,
                    request.Lines.Select(line => new AppUpsertRfqLineRequest(
                        line.ProductName,
                        line.Description,
                        line.Quantity,
                        line.Uom,
                        line.TargetPrice)).ToList()),
                cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }

        return updated ? NoContent() : NotFound();
    }

    private static string? ValidateRequest(ApiUpsertRfqRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return "RFQ title is required.";
        }

        if (request.Lines is null || request.Lines.Count == 0)
        {
            return "At least one RFQ line is required.";
        }

        if (request.Lines.Any(line => line.Quantity <= 0))
        {
            return "Line item quantities must be greater than zero.";
        }

        if (!request.CloseDate.HasValue && !request.ResponseDeadline.HasValue)
        {
            return "Provide a close date or response deadline.";
        }

        return null;
    }

    private static string? ValidateCreateStatus(string? status)
    {
        if (string.IsNullOrWhiteSpace(status))
        {
            return null;
        }

        var normalized = status.Trim();
        return normalized.Equals("Draft", StringComparison.OrdinalIgnoreCase) ||
               normalized.Equals("Published", StringComparison.OrdinalIgnoreCase)
            ? null
            : "RFQ status must be Draft or Published when creating.";
    }
}
