namespace CRM.Enterprise.Api.Contracts.Attachments;

public record AttachmentUploadResponse(
    Guid Id,
    string FileName,
    string ContentType,
    long Size,
    string? UploadedBy,
    DateTime CreatedAtUtc);
