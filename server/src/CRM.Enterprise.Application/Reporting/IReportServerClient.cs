namespace CRM.Enterprise.Application.Reporting;

public interface IReportServerClient
{
    bool IsConfigured { get; }
    Task<ReportServerTokenResult?> AuthenticateAsync(CancellationToken ct = default);
    Task<IReadOnlyList<ReportCatalogItem>> GetCatalogAsync(CancellationToken ct = default);
    Task<IReadOnlyList<ReportCategoryDto>> GetCategoriesAsync(CancellationToken ct = default);
    Task<IReadOnlyList<ReportParameterOptionDto>> GetParameterOptionsAsync(string reportId, string parameterName, CancellationToken ct = default);
}

public interface IReportLibraryService
{
    Task<IReadOnlyList<ReportLibraryItemDto>> GetLibraryAsync(CancellationToken ct = default);
    Task<IReadOnlyList<ReportParameterOptionDto>> GetParameterOptionsAsync(string reportId, string parameterName, CancellationToken ct = default);
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

public sealed record ReportParameterOptionDto(string Value, string Label);

public sealed record ReportLibraryItemDto(
    string Id,
    string Name,
    string Description,
    string CategoryId,
    string CategoryName,
    string Extension,
    DateTimeOffset CreatedOn,
    DateTimeOffset ModifiedOn,
    int SortOrder,
    string? EmbeddedReportSource,
    IReadOnlyList<ReportLibraryFilterDto> Filters);

public sealed record ReportLibraryFilterDto(
    string Key,
    string Label,
    string Kind,
    bool Required,
    string? ParameterName,
    string? ParameterNameTo,
    string? OptionSource,
    string? Placeholder,
    string? DefaultValue,
    string? DefaultValueTo,
    IReadOnlyList<ReportParameterOptionDto> Options);
