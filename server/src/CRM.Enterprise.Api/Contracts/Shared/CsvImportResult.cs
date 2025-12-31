namespace CRM.Enterprise.Api.Contracts.Shared;

public record CsvImportError(int RowNumber, string Message);

public record CsvImportResult(int Total, int Imported, int Skipped, IReadOnlyList<CsvImportError> Errors);
