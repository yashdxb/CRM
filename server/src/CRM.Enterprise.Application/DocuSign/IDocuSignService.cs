namespace CRM.Enterprise.Application.DocuSign;

/// <summary>
/// DocuSign API operations for sending envelopes and retrieving signed documents.
/// </summary>
public interface IDocuSignService
{
    /// <summary>Send an envelope via DocuSign for signing.</summary>
    Task<DocuSignEnvelopeResult> SendEnvelopeAsync(SendEnvelopeRequest request, CancellationToken ct = default);

    /// <summary>Get the current status of a DocuSign envelope.</summary>
    Task<DocuSignEnvelopeStatus> GetEnvelopeStatusAsync(string envelopeId, CancellationToken ct = default);

    /// <summary>Download the signed (completed) document bytes.</summary>
    Task<DocuSignDocumentDownload?> DownloadDocumentAsync(string envelopeId, CancellationToken ct = default);

    /// <summary>Void (cancel) a sent envelope.</summary>
    Task<bool> VoidEnvelopeAsync(string envelopeId, string reason, CancellationToken ct = default);
}

// ── Request / Result records ──

public sealed record SendEnvelopeRequest(
    string DocumentName,
    string EmailSubject,
    IReadOnlyList<EnvelopeSignerInput> Signers,
    byte[]? DocumentBytes = null,
    string? DocumentBase64 = null);

public sealed record EnvelopeSignerInput(
    string Name,
    string Email,
    string Role);

public sealed record DocuSignEnvelopeResult(
    bool Success,
    string? EnvelopeId,
    string? Error);

public sealed record DocuSignEnvelopeStatus(
    string EnvelopeId,
    string Status,
    DateTime? SentAtUtc,
    DateTime? CompletedAtUtc,
    IReadOnlyList<DocuSignSignerStatus> Signers);

public sealed record DocuSignSignerStatus(
    string Name,
    string Email,
    string Status,
    DateTime? SignedAtUtc);

public sealed record DocuSignDocumentDownload(
    byte[] Content,
    string FileName,
    string ContentType);
