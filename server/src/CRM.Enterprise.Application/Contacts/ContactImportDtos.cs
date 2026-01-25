namespace CRM.Enterprise.Application.Contacts;

public sealed record ContactImportError(int RowNumber, string Message);

public sealed record ContactImportResultDto(int Total, int Imported, int Failed, IReadOnlyList<ContactImportError> Errors);

public sealed record ContactImportQueuedDto(Guid ImportJobId, string EntityType, string Status);
