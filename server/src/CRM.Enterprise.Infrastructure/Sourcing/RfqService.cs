using CRM.Enterprise.Application.Sourcing;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Sourcing;

public sealed class RfqService : IRfqService
{
    private readonly CrmDbContext _dbContext;
    private static readonly HashSet<string> AllowedStatuses = new(StringComparer.OrdinalIgnoreCase)
    {
        "Draft",
        "Published",
        "In Progress",
        "Closed",
        "Awarded",
        "Cancelled"
    };

    public RfqService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> CreateAsync(UpsertRfqRequest request, CancellationToken cancellationToken = default)
    {
        var rfqNumber = string.IsNullOrWhiteSpace(request.RfqNumber)
            ? $"RFQ-{DateTime.UtcNow:yyyyMMdd-HHmm}"
            : request.RfqNumber.Trim();

        var status = NormalizeStatus(request.Status) ?? "Draft";
        ValidateStatusValue(status, "create");

        var rfq = new Rfq
        {
            RfqNumber = rfqNumber,
            Title = request.Title.Trim(),
            Description = request.Description?.Trim(),
            Status = status,
            Type = request.Type?.Trim(),
            IssueDate = request.IssueDate ?? DateTime.UtcNow,
            CloseDate = request.CloseDate ?? request.ResponseDeadline,
            Currency = request.Currency?.Trim(),
            CreatedBy = "System"
        };

        rfq.Lines = BuildLines(request.Lines);

        _dbContext.Rfqs.Add(rfq);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return rfq.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpsertRfqRequest request, CancellationToken cancellationToken = default)
    {
        var rfq = await _dbContext.Rfqs
            .Include(r => r.Lines)
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted, cancellationToken);

        if (rfq is null)
        {
            return false;
        }

        if (!string.IsNullOrWhiteSpace(request.RfqNumber))
        {
            rfq.RfqNumber = request.RfqNumber.Trim();
        }

        rfq.Title = request.Title.Trim();
        rfq.Description = request.Description?.Trim();
        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            var nextStatus = NormalizeStatus(request.Status);
            if (nextStatus is not null && !string.Equals(rfq.Status, nextStatus, StringComparison.OrdinalIgnoreCase))
            {
                ValidateStatusTransition(rfq.Status, nextStatus);
                rfq.Status = nextStatus;
            }
        }
        rfq.Type = request.Type?.Trim();
        rfq.IssueDate = request.IssueDate ?? rfq.IssueDate;
        rfq.CloseDate = request.CloseDate ?? request.ResponseDeadline ?? rfq.CloseDate;
        rfq.Currency = request.Currency?.Trim();
        rfq.UpdatedBy = "System";

        if (rfq.Lines.Count > 0)
        {
            _dbContext.RfqLines.RemoveRange(rfq.Lines);
            rfq.Lines.Clear();
        }

        foreach (var line in BuildLines(request.Lines))
        {
            rfq.Lines.Add(line);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static string? NormalizeStatus(string? status)
    {
        return string.IsNullOrWhiteSpace(status) ? null : status.Trim();
    }

    private static void ValidateStatusValue(string status, string action)
    {
        if (!AllowedStatuses.Contains(status))
        {
            throw new InvalidOperationException($"RFQ status '{status}' is not valid for {action}.");
        }
    }

    private static void ValidateStatusTransition(string current, string next)
    {
        ValidateStatusValue(next, "update");

        var normalizedCurrent = current.Trim();
        var allowed = normalizedCurrent switch
        {
            "Draft" => new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "Draft",
                "Published",
                "Cancelled"
            },
            "Published" => new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "Published",
                "In Progress",
                "Closed",
                "Awarded",
                "Cancelled"
            },
            "In Progress" => new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "In Progress",
                "Closed",
                "Awarded",
                "Cancelled"
            },
            "Closed" => new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "Closed"
            },
            "Awarded" => new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "Awarded"
            },
            "Cancelled" => new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "Cancelled"
            },
            _ => new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                normalizedCurrent
            }
        };

        if (!allowed.Contains(next))
        {
            throw new InvalidOperationException(
                $"RFQ status transition from '{normalizedCurrent}' to '{next}' is not allowed.");
        }
    }

    private static List<RfqLine> BuildLines(IReadOnlyList<UpsertRfqLineRequest> lines)
    {
        var results = new List<RfqLine>();
        if (lines is null || lines.Count == 0)
        {
            return results;
        }

        var lineNumber = 1;
        foreach (var line in lines)
        {
            var description = string.IsNullOrWhiteSpace(line.Description)
                ? line.ProductName?.Trim()
                : line.Description.Trim();

            results.Add(new RfqLine
            {
                LineNumber = lineNumber++,
                Description = description,
                Quantity = line.Quantity,
                Uom = line.Uom?.Trim(),
                TargetPrice = line.TargetPrice
            });
        }

        return results;
    }
}
