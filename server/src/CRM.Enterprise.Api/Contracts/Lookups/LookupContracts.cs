namespace CRM.Enterprise.Api.Contracts.Lookups;

// ── Lead Status ──────────────────────────────────────────

public record LeadStatusItem(
    Guid Id,
    string Name,
    int Order,
    bool IsDefault,
    bool IsClosed);

public record UpsertLeadStatusBody(
    string Name,
    int Order,
    bool IsDefault,
    bool IsClosed);

public record ReorderBody(IReadOnlyList<Guid> OrderedIds);

// ── Opportunity Stage ────────────────────────────────────

public record OpportunityStageItem(
    Guid Id,
    string Name,
    int Order,
    bool IsClosedStage,
    string? ForecastCategory);

public record UpsertOpportunityStageBody(
    string Name,
    int Order,
    bool IsClosedStage,
    string? ForecastCategory);

// ── Currency ─────────────────────────────────────────────

public record CurrencyItem(
    Guid Id,
    string Code,
    string Name,
    string Symbol,
    bool IsActive,
    int SortOrder);

public record UpsertCurrencyBody(
    string Code,
    string Name,
    string Symbol,
    bool IsActive,
    int SortOrder);

// ── Phone Type ───────────────────────────────────────────

public record PhoneTypeItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder,
    bool IsDefault);

public record UpsertPhoneTypeBody(
    string Name,
    bool IsActive,
    int SortOrder,
    bool IsDefault);

// ── Cadence Channel ──────────────────────────────────────

public record CadenceChannelItem(
    Guid Id,
    string Name,
    int Order,
    bool IsActive,
    bool IsDefault);

public record UpsertCadenceChannelBody(
    string Name,
    int Order,
    bool IsActive,
    bool IsDefault);
