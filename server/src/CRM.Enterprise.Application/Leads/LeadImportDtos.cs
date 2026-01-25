namespace CRM.Enterprise.Application.Leads;

public sealed record LeadImportError(int RowNumber, string Message);

public sealed record LeadImportResultDto(int Total, int Imported, int Failed, IReadOnlyList<LeadImportError> Errors);

public sealed record LeadImportQueuedDto(Guid ImportJobId, string EntityType, string Status);
