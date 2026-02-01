using System;

namespace CRM.Enterprise.Api.Contracts.Users;

public record UserLookupItem(
    Guid Id,
    string FullName,
    string Email);
