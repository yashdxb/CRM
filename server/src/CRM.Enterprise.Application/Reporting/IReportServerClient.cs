namespace CRM.Enterprise.Application.Reporting;

public interface IReportServerClient
{
    bool IsConfigured { get; }
    Task<ReportServerTokenResult?> AuthenticateAsync(CancellationToken ct = default);
    Task<IReadOnlyList<ReportCatalogItem>> GetCatalogAsync(CancellationToken ct = default);
    Task<IReadOnlyList<ReportCategoryDto>> GetCategoriesAsync(CancellationToken ct = default);
}

public sealed record ReportServerTokenResult(string AccessToken, string TokenType, int ExpiresIn);

public sealed record ReportCatalogItem(
    string Id,
    string Name,
    string Description,
    string CategoryId,
    string CategoryName,
    string Extension,
    DateTimeOffset CreatedOn,
    DateTimeOffset ModifiedOn);

public sealed record ReportCategoryDto(string Id, string Name);
