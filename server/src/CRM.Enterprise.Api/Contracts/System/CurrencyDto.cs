namespace CRM.Enterprise.Api.Contracts.System;

public record CurrencyDto(
    Guid Id,
    string Code,
    string Name,
    string Symbol,
    bool IsActive,
    int SortOrder);
