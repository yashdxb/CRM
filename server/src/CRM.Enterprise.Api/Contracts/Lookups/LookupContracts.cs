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

// ── Account Type ─────────────────────────────────────────

public record AccountTypeItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertAccountTypeBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Account Source ───────────────────────────────────────

public record AccountSourceItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertAccountSourceBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Customer Rating ─────────────────────────────────────

public record CustomerRatingItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertCustomerRatingBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Contact Buying Role ─────────────────────────────────

public record ContactBuyingRoleItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertContactBuyingRoleBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Activity Type ───────────────────────────────────────

public record ActivityTypeItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertActivityTypeBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Activity Priority ───────────────────────────────────

public record ActivityPriorityItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertActivityPriorityBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Helpdesk Case Status ────────────────────────────────

public record HelpdeskCaseStatusItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertHelpdeskCaseStatusBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Helpdesk Priority ───────────────────────────────────

public record HelpdeskPriorityItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertHelpdeskPriorityBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Helpdesk Severity ───────────────────────────────────

public record HelpdeskSeverityItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertHelpdeskSeverityBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Helpdesk Source ─────────────────────────────────────

public record HelpdeskSourceItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertHelpdeskSourceBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Property Status ─────────────────────────────────────

public record PropertyStatusItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertPropertyStatusBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Property Type ───────────────────────────────────────

public record PropertyTypeItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertPropertyTypeBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Deal Type ───────────────────────────────────────────

public record DealTypeItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertDealTypeBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Deal Segment ────────────────────────────────────────

public record DealSegmentItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertDealSegmentBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Document Category ───────────────────────────────────

public record DocumentCategoryItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertDocumentCategoryBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Lead Disqualification Reason ────────────────────────

public record LeadDisqualificationReasonItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertLeadDisqualificationReasonBody(
    string Name,
    bool IsActive,
    int SortOrder);

// ── Lead Loss Reason ────────────────────────────────────

public record LeadLossReasonItem(
    Guid Id,
    string Name,
    bool IsActive,
    int SortOrder);

public record UpsertLeadLossReasonBody(
    string Name,
    bool IsActive,
    int SortOrder);
