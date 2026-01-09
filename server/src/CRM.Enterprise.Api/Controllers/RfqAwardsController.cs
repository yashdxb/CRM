using CRM.Enterprise.Api.Contracts.Sourcing;
using CRM.Enterprise.Application.Sourcing;
using ApiCreateRfqAwardRequest = CRM.Enterprise.Api.Contracts.Sourcing.CreateRfqAwardRequest;
using AppCreateRfqAwardRequest = CRM.Enterprise.Application.Sourcing.CreateRfqAwardRequest;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/supply-chain/awards")]
public sealed class RfqAwardsController : ControllerBase
{
    private readonly IRfqAwardReadService _awardReadService;
    private readonly IRfqAwardService _awardService;

    public RfqAwardsController(IRfqAwardReadService awardReadService, IRfqAwardService awardService)
    {
        _awardReadService = awardReadService;
        _awardService = awardService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<RfqAwardListItemResponse>>> GetAll(
        [FromQuery] Guid? rfqId,
        CancellationToken cancellationToken)
    {
        var awards = await _awardReadService.GetAllAsync(rfqId, cancellationToken);
        var response = awards.Select(award => new RfqAwardListItemResponse(
            award.Id,
            award.AwardNumber,
            award.Status,
            award.AwardDate,
            award.AwardAmount,
            award.Currency,
            award.SupplierName,
            award.RfqNumber)).ToList();

        return Ok(response);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RfqAwardDetailResponse>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var award = await _awardReadService.GetByIdAsync(id, cancellationToken);
        if (award is null)
        {
            return NotFound();
        }

        var response = new RfqAwardDetailResponse(
            award.Id,
            award.AwardNumber,
            award.Status,
            award.AwardDate,
            award.AwardAmount,
            award.Currency,
            award.Notes,
            award.RfqId,
            award.RfqNumber,
            award.RfqTitle,
            award.SupplierId,
            award.SupplierName,
            award.Lines.Select(line => new RfqAwardLineResponse(
                line.Id,
                line.LineNumber,
                line.ItemName,
                line.Uom,
                line.Quantity,
                line.TargetPrice,
                line.LineTotal)).ToList());

        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<RfqAwardListItemResponse>> Create(
        [FromBody] ApiCreateRfqAwardRequest request,
        CancellationToken cancellationToken)
    {
        if (request.RfqId == Guid.Empty || request.SupplierId == Guid.Empty)
        {
            return BadRequest(new { message = "RFQ and Supplier are required." });
        }

        if (request.AwardAmount <= 0)
        {
            return BadRequest(new { message = "Award amount must be greater than zero." });
        }

        var award = await _awardService.CreateAsync(
            new AppCreateRfqAwardRequest(
                request.RfqId,
                request.SupplierId,
                request.AwardNumber,
                request.AwardDate,
                request.Status,
                request.AwardAmount,
                request.Currency,
                request.Notes),
            cancellationToken);

        if (award is null)
        {
            return NotFound();
        }

        var response = new RfqAwardListItemResponse(
            award.Id,
            award.AwardNumber,
            award.Status,
            award.AwardDate,
            award.AwardAmount,
            award.Currency,
            award.SupplierName,
            award.RfqNumber);

        return Ok(response);
    }
}
