using CRM.Enterprise.Api.Contracts.Sourcing;
using CRM.Enterprise.Application.Sourcing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/supply-chain/quotes")]
public sealed class SupplyChainQuotesController : ControllerBase
{
    private readonly ISupplierQuoteReadService _quoteReadService;

    public SupplyChainQuotesController(ISupplierQuoteReadService quoteReadService)
    {
        _quoteReadService = quoteReadService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<SupplierQuoteComparisonResponse>>> GetAll(
        [FromQuery] Guid? rfqId,
        CancellationToken cancellationToken)
    {
        var quotes = await _quoteReadService.GetComparisonAsync(rfqId, cancellationToken);
        var response = quotes.Select(quote => new SupplierQuoteComparisonResponse(
            quote.Id,
            quote.RfqId,
            quote.QuoteNumber,
            quote.Status,
            quote.SubmittedDate,
            quote.Currency,
            quote.TotalAmount,
            quote.SupplierName)).ToList();

        return Ok(response);
    }
}
