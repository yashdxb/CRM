using System.ComponentModel.DataAnnotations;

namespace CRM.Enterprise.Api.Contracts.Suppliers;

public sealed class UpsertSupplierRequest
{
    [Required]
    public string Name { get; init; } = string.Empty;
    public string? Category { get; init; }
    public string? Status { get; init; }
    public string? Country { get; init; }
    public string? Website { get; init; }
    public string? ContactName { get; init; }
    public string? ContactEmail { get; init; }
    public string? ContactPhone { get; init; }
    public string? Notes { get; init; }
}
