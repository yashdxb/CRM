using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityQuoteService : IOpportunityQuoteService
{
    private const string EntityType = "OpportunityQuote";
    private const decimal DiscountPercentApprovalThreshold = 10m;
    private const decimal DiscountAmountApprovalThreshold = 1000m;

    private readonly CrmDbContext _dbContext;
    private readonly IAuditEventService _auditEvents;
    private readonly IOpportunityApprovalService _approvalService;

    public OpportunityQuoteService(
        CrmDbContext dbContext,
        IAuditEventService auditEvents,
        IOpportunityApprovalService approvalService)
    {
        _dbContext = dbContext;
        _auditEvents = auditEvents;
        _approvalService = approvalService;
    }

    public async Task<IReadOnlyList<OpportunityQuoteListItemDto>?> GetByOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Opportunities
            .AsNoTracking()
            .AnyAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (!exists)
        {
            return null;
        }

        var quotes = await _dbContext.OpportunityQuotes
            .AsNoTracking()
            .Where(q => q.OpportunityId == opportunityId && !q.IsDeleted)
            .OrderByDescending(q => q.CreatedAtUtc)
            .Select(q => new OpportunityQuoteListItemDto(
                q.Id,
                q.QuoteNumber,
                q.Name,
                q.Status,
                q.PriceListId,
                q.Currency,
                q.TotalAmount,
                q.CreatedAtUtc,
                q.UpdatedAtUtc))
            .ToListAsync(cancellationToken);

        return quotes;
    }

    public async Task<OpportunityQuoteDetailDto?> GetByIdAsync(Guid opportunityId, Guid quoteId, CancellationToken cancellationToken = default)
    {
        var quote = await _dbContext.OpportunityQuotes
            .AsNoTracking()
            .Include(q => q.Lines.Where(l => !l.IsDeleted))
            .ThenInclude(l => l.ItemMaster)
            .FirstOrDefaultAsync(
                q => q.Id == quoteId && q.OpportunityId == opportunityId && !q.IsDeleted,
                cancellationToken);

        if (quote is null)
        {
            return null;
        }

        var status = await ResolveApprovalDerivedStatusAsync(quote, cancellationToken);
        return MapDetail(quote, status);
    }

    public async Task<OpportunityQuoteDetailDto?> CreateAsync(
        Guid opportunityId,
        OpportunityQuoteCreateRequest request,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .FirstOrDefaultAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            return null;
        }

        var lockViolation = await OpportunityApprovalLockPolicy.GetLockViolationAsync(
            _dbContext,
            opportunityId,
            actor.UserId,
            cancellationToken);
        if (lockViolation is not null)
        {
            throw new InvalidOperationException(lockViolation);
        }

        ValidateRequest(request.Name, request.Currency, request.TaxAmount, request.Lines);

        var quoteCount = await _dbContext.OpportunityQuotes
            .CountAsync(q => q.OpportunityId == opportunityId && !q.IsDeleted, cancellationToken);

        var quote = new OpportunityQuote
        {
            OpportunityId = opportunityId,
            QuoteNumber = $"Q-{DateTime.UtcNow:yyyyMMdd}-{quoteCount + 1:D3}",
            Name = request.Name.Trim(),
            Status = "Draft",
            PriceListId = request.PriceListId,
            Currency = request.Currency.Trim().ToUpperInvariant(),
            TaxAmount = request.TaxAmount,
            Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim()
        };

        await UpsertLinesAsync(quote, request.PriceListId, request.Lines, cancellationToken);
        RecomputeTotals(quote);

        _dbContext.OpportunityQuotes.Add(quote);

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                quote.Id,
                "Created",
                null,
                null,
                quote.Name,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(opportunityId, quote.Id, cancellationToken);
    }

    public async Task<OpportunityQuoteDetailDto?> SubmitForApprovalAsync(
        Guid opportunityId,
        Guid quoteId,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var quote = await _dbContext.OpportunityQuotes
            .FirstOrDefaultAsync(
                q => q.Id == quoteId && q.OpportunityId == opportunityId && !q.IsDeleted,
                cancellationToken);
        if (quote is null)
        {
            return null;
        }

        var lockViolation = await OpportunityApprovalLockPolicy.GetLockViolationAsync(
            _dbContext,
            opportunityId,
            actor.UserId,
            cancellationToken);
        if (lockViolation is not null)
        {
            throw new InvalidOperationException(lockViolation);
        }

        var approvalRequired = IsApprovalRequired(quote);
        if (!approvalRequired)
        {
            quote.Status = "Approved";
            quote.UpdatedAtUtc = DateTime.UtcNow;

            await _auditEvents.TrackAsync(
                new AuditEventEntry(
                    EntityType,
                    quote.Id,
                    "AutoApproved",
                    "Status",
                    null,
                    quote.Status,
                    actor.UserId,
                    actor.UserName),
                cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);
            return await GetByIdAsync(opportunityId, quote.Id, cancellationToken);
        }

        var approvalAmount = quote.DiscountAmount > 0 ? quote.DiscountAmount : quote.TotalAmount;
        var approvalResult = await _approvalService.RequestAsync(
            opportunityId,
            approvalAmount,
            quote.Currency,
            "Discount",
            actor,
            cancellationToken);

        if (!approvalResult.Success)
        {
            throw new InvalidOperationException(approvalResult.Error ?? "Unable to submit quote for approval.");
        }

        quote.Status = "Pending Approval";
        quote.UpdatedAtUtc = DateTime.UtcNow;

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                quote.Id,
                "SubmittedForApproval",
                "Status",
                null,
                quote.Status,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(opportunityId, quote.Id, cancellationToken);
    }

    public async Task<OpportunityQuoteDetailDto?> UpdateAsync(
        Guid opportunityId,
        Guid quoteId,
        OpportunityQuoteUpdateRequest request,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var quote = await _dbContext.OpportunityQuotes
            .Include(q => q.Lines.Where(l => !l.IsDeleted))
            .FirstOrDefaultAsync(
                q => q.Id == quoteId && q.OpportunityId == opportunityId && !q.IsDeleted,
                cancellationToken);

        if (quote is null)
        {
            return null;
        }

        var lockViolation = await OpportunityApprovalLockPolicy.GetLockViolationAsync(
            _dbContext,
            opportunityId,
            actor.UserId,
            cancellationToken);
        if (lockViolation is not null)
        {
            throw new InvalidOperationException(lockViolation);
        }

        ValidateRequest(request.Name, request.Currency, request.TaxAmount, request.Lines);

        quote.Name = request.Name.Trim();
        quote.Status = string.IsNullOrWhiteSpace(request.Status) ? "Draft" : request.Status.Trim();
        quote.PriceListId = request.PriceListId;
        quote.Currency = request.Currency.Trim().ToUpperInvariant();
        quote.TaxAmount = request.TaxAmount;
        quote.Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim();

        foreach (var existing in quote.Lines)
        {
            existing.IsDeleted = true;
            existing.DeletedAtUtc = DateTime.UtcNow;
            existing.DeletedBy = actor.UserName;
        }

        await UpsertLinesAsync(quote, request.PriceListId, request.Lines, cancellationToken);
        RecomputeTotals(quote);

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                quote.Id,
                "Updated",
                null,
                null,
                quote.Status,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(opportunityId, quote.Id, cancellationToken);
    }

    private async Task UpsertLinesAsync(
        OpportunityQuote quote,
        Guid? priceListId,
        IReadOnlyList<OpportunityQuoteLineRequest> lineRequests,
        CancellationToken cancellationToken)
    {
        var itemIds = lineRequests.Select(l => l.ItemMasterId).Distinct().ToList();
        var items = await _dbContext.ItemMasters
            .AsNoTracking()
            .Where(i => itemIds.Contains(i.Id) && i.IsActive && !i.IsDeleted)
            .ToDictionaryAsync(i => i.Id, cancellationToken);

        if (items.Count != itemIds.Count)
        {
            throw new InvalidOperationException("One or more selected quote items are invalid or inactive.");
        }

        Dictionary<Guid, decimal> priceBookPrices = new();
        if (priceListId.HasValue)
        {
            priceBookPrices = await _dbContext.PriceListItems
                .AsNoTracking()
                .Where(i => i.PriceListId == priceListId.Value && i.IsActive && !i.IsDeleted)
                .GroupBy(i => i.ItemMasterId)
                .Select(g => new { g.Key, UnitPrice = g.OrderByDescending(x => x.MinQty ?? 0).Select(x => x.UnitPrice).FirstOrDefault() })
                .ToDictionaryAsync(x => x.Key, x => x.UnitPrice, cancellationToken);
        }

        foreach (var request in lineRequests)
        {
            var quantity = request.Quantity <= 0 ? 1 : request.Quantity;
            var unitPrice = request.UnitPrice;
            if (unitPrice <= 0 && priceBookPrices.TryGetValue(request.ItemMasterId, out var mappedPrice))
            {
                unitPrice = mappedPrice;
            }

            if (unitPrice < 0)
            {
                throw new InvalidOperationException("Unit price cannot be negative.");
            }

            var discountPercent = Math.Clamp(request.DiscountPercent, 0, 100);
            var lineBase = Math.Round(quantity * unitPrice, 2, MidpointRounding.AwayFromZero);
            var lineTotal = Math.Round(lineBase * (1 - (discountPercent / 100m)), 2, MidpointRounding.AwayFromZero);

            quote.Lines.Add(new OpportunityQuoteLine
            {
                ItemMasterId = request.ItemMasterId,
                Description = string.IsNullOrWhiteSpace(request.Description)
                    ? items[request.ItemMasterId].Name
                    : request.Description.Trim(),
                Quantity = quantity,
                UnitPrice = unitPrice,
                DiscountPercent = discountPercent,
                LineTotal = lineTotal
            });
        }
    }

    private static void RecomputeTotals(OpportunityQuote quote)
    {
        var subtotal = quote.Lines
            .Where(l => !l.IsDeleted)
            .Sum(l => Math.Round(l.Quantity * l.UnitPrice, 2, MidpointRounding.AwayFromZero));

        var lineTotal = quote.Lines
            .Where(l => !l.IsDeleted)
            .Sum(l => l.LineTotal);

        quote.Subtotal = Math.Round(subtotal, 2, MidpointRounding.AwayFromZero);
        quote.DiscountAmount = Math.Round(subtotal - lineTotal, 2, MidpointRounding.AwayFromZero);
        quote.TotalAmount = Math.Round(lineTotal + quote.TaxAmount, 2, MidpointRounding.AwayFromZero);
    }

    private static OpportunityQuoteDetailDto MapDetail(OpportunityQuote quote, string? statusOverride = null)
    {
        var lines = quote.Lines
            .Where(l => !l.IsDeleted)
            .OrderBy(l => l.CreatedAtUtc)
            .Select(l => new OpportunityQuoteLineDto(
                l.Id,
                l.ItemMasterId,
                l.ItemMaster?.Name ?? "Item",
                l.ItemMaster?.Sku ?? string.Empty,
                l.Description,
                l.Quantity,
                l.UnitPrice,
                l.DiscountPercent,
                l.LineTotal))
            .ToList();

        return new OpportunityQuoteDetailDto(
            quote.Id,
            quote.OpportunityId,
            quote.QuoteNumber,
            quote.Name,
            statusOverride ?? quote.Status,
            quote.PriceListId,
            quote.Currency,
            quote.Subtotal,
            quote.DiscountAmount,
            quote.TaxAmount,
            quote.TotalAmount,
            quote.Notes,
            quote.CreatedAtUtc,
            quote.UpdatedAtUtc,
            lines);
    }

    private static bool IsApprovalRequired(OpportunityQuote quote)
    {
        if (quote.Subtotal <= 0)
        {
            return false;
        }

        var discountPercent = quote.DiscountAmount <= 0
            ? 0
            : (quote.DiscountAmount / quote.Subtotal) * 100m;

        return discountPercent >= DiscountPercentApprovalThreshold
            || quote.DiscountAmount >= DiscountAmountApprovalThreshold;
    }

    private async Task<string> ResolveApprovalDerivedStatusAsync(OpportunityQuote quote, CancellationToken cancellationToken)
    {
        var approval = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(a =>
                a.OpportunityId == quote.OpportunityId &&
                !a.IsDeleted &&
                a.RequestedOn >= quote.CreatedAtUtc &&
                a.Purpose == "Discount")
            .OrderByDescending(a => a.RequestedOn)
            .FirstOrDefaultAsync(cancellationToken);

        if (approval is null)
        {
            return quote.Status;
        }

        if (approval.Status.Equals("Approved", StringComparison.OrdinalIgnoreCase))
        {
            return "Approved";
        }

        if (approval.Status.Equals("Rejected", StringComparison.OrdinalIgnoreCase))
        {
            return "Rejected";
        }

        if (approval.Status.Equals("Pending", StringComparison.OrdinalIgnoreCase))
        {
            return "Pending Approval";
        }

        return quote.Status;
    }

    private static void ValidateRequest(
        string? name,
        string? currency,
        decimal taxAmount,
        IReadOnlyList<OpportunityQuoteLineRequest>? lines)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new InvalidOperationException("Quote name is required.");
        }

        if (string.IsNullOrWhiteSpace(currency))
        {
            throw new InvalidOperationException("Currency is required.");
        }

        if (taxAmount < 0)
        {
            throw new InvalidOperationException("Tax amount cannot be negative.");
        }

        if (lines is null || lines.Count == 0)
        {
            throw new InvalidOperationException("At least one quote line is required.");
        }
    }
}
