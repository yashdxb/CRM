using System;

namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record ExpansionSignalItem(
    Guid OpportunityId,
    Guid AccountId,
    string AccountName,
    string OpportunityName,
    DateTime? ContractEndDateUtc,
    DateTime LastSignalAtUtc,
    int SignalCount,
    bool HasExpansionOpportunity);
