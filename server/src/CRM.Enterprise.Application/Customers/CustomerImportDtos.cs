namespace CRM.Enterprise.Application.Customers;

public sealed record CustomerImportError(int RowNumber, string Message);

public sealed record CustomerImportResultDto(int Total, int Imported, int Failed, IReadOnlyList<CustomerImportError> Errors);

public sealed record CustomerImportQueuedDto(Guid ImportJobId, string EntityType, string Status);
