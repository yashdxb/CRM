namespace CRM.Enterprise.Application.Storage;

public interface IBlobStorageService
{
    Task<string> UploadAsync(string containerName, string blobName, Stream content, string contentType, CancellationToken ct = default);
    Task<bool> DeleteAsync(string containerName, string blobName, CancellationToken ct = default);
}
