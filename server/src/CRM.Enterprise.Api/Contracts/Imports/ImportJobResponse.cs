using CRM.Enterprise.Api.Contracts.Shared;

namespace CRM.Enterprise.Api.Contracts.Imports;

public record ImportJobResponse(Guid Id, string EntityType, string Status);

public record ImportJobStatusResponse(
    Guid Id,
    string EntityType,
    string Status,
    int Total,
    int Imported,
    int Skipped,
    IReadOnlyList<CsvImportError> Errors,
    DateTime CreatedAtUtc,
    DateTime? CompletedAtUtc,
    string? ErrorMessage);
