namespace CRM.Enterprise.Api.Contracts.Reports;

public sealed record ReportServerConfigResponse(
    bool Enabled,
    string? ReportServerUrl,
    string? ReportServiceUrl,
    string? DesignerUrl);

public sealed record ReportServerTokenResponse(
    string AccessToken,
    string TokenType,
    int ExpiresIn);

public sealed record ReportCatalogItemResponse(
    string Id,
    string Name,
    string Description,
    string CategoryId,
    string CategoryName,
    string Extension,
    DateTimeOffset CreatedOn,
    DateTimeOffset ModifiedOn);

public sealed record ReportCategoryResponse(string Id, string Name);

public sealed record ReportParameterOptionResponse(string Value, string Label);
