using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public sealed record LeadCadenceChannelItem(
    Guid Id,
    string Name,
    int Order,
    bool IsDefault,
    bool IsActive);
