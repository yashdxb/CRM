namespace CRM.Enterprise.Api.Contracts.System;

public record TimeZoneDto(
    Guid Id,
    string IanaId,
    string Label,
    int UtcOffsetMinutes,
    string FlagCode,
    bool IsActive,
    int SortOrder);
