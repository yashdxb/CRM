using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Leads;

public sealed record LeadDispositionReportResponse(
    LeadDispositionTotalsItem Totals,
    IEnumerable<LeadDispositionReasonCountItem> DisqualificationReasons,
    IEnumerable<LeadDispositionReasonCountItem> LossReasons,
    IEnumerable<LeadDispositionOwnerRollupItem> OwnerRollups,
    IEnumerable<LeadDispositionSourceRollupItem> SourceRollups,
    IEnumerable<LeadDispositionTrendPointItem> Trend);

public sealed record LeadDispositionTotalsItem(
    int Disqualified,
    int Lost,
    int InNurture,
    int RecycledLast30Days);

public sealed record LeadDispositionReasonCountItem(
    string Reason,
    int Count);

public sealed record LeadDispositionOwnerRollupItem(
    Guid OwnerId,
    string OwnerName,
    int Disqualified,
    int Lost,
    int RecycledToNurture);

public sealed record LeadDispositionSourceRollupItem(
    string Source,
    int Disqualified,
    int Lost,
    int RecycledToNurture);

public sealed record LeadDispositionTrendPointItem(
    DateTime PeriodStartUtc,
    int Disqualified,
    int Lost,
    int RecycledToNurture);
