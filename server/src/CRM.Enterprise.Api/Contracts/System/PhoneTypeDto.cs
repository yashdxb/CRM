using System;

namespace CRM.Enterprise.Api.Contracts.System;

public record PhoneTypeDto(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder,
    bool IsDefault);
