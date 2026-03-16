namespace CRM.Enterprise.Application.Lookups;

// --- Lead Statuses ---
public record LeadStatusDto(Guid Id, string Name, int Order, bool IsDefault, bool IsClosed);

public record UpsertLeadStatusRequest(string Name, int Order, bool IsDefault, bool IsClosed);

// --- Opportunity Stages ---
public record OpportunityStageDto(Guid Id, string Name, int Order, bool IsClosedStage, string? ForecastCategory);

public record UpsertOpportunityStageRequest(string Name, int Order, bool IsClosedStage, string? ForecastCategory);

// --- Currencies ---
public record CurrencyLookupDto(Guid Id, string Code, string Name, string Symbol, bool IsActive, int SortOrder);

public record UpsertCurrencyRequest(string Code, string Name, string Symbol, bool IsActive, int SortOrder);

// --- Phone Types ---
public record PhoneTypeLookupDto(Guid Id, string Name, bool IsActive, int SortOrder, bool IsDefault);

public record UpsertPhoneTypeRequest(string Name, bool IsActive, int SortOrder, bool IsDefault);

// --- Cadence Channels ---
public record CadenceChannelDto(Guid Id, string Name, int Order, bool IsActive, bool IsDefault);

public record UpsertCadenceChannelRequest(string Name, int Order, bool IsActive, bool IsDefault);

// --- Account Types ---
public record AccountTypeLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertAccountTypeRequest(string Name, bool IsActive, int SortOrder);

// --- Account Sources ---
public record AccountSourceLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertAccountSourceRequest(string Name, bool IsActive, int SortOrder);

// --- Customer Ratings ---
public record CustomerRatingLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertCustomerRatingRequest(string Name, bool IsActive, int SortOrder);

// --- Contact Buying Roles ---
public record ContactBuyingRoleLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertContactBuyingRoleRequest(string Name, bool IsActive, int SortOrder);

// --- Activity Types ---
public record ActivityTypeLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertActivityTypeRequest(string Name, bool IsActive, int SortOrder);

// --- Activity Priorities ---
public record ActivityPriorityLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertActivityPriorityRequest(string Name, bool IsActive, int SortOrder);

// --- Helpdesk Case Statuses ---
public record HelpdeskCaseStatusLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertHelpdeskCaseStatusRequest(string Name, bool IsActive, int SortOrder);

// --- Helpdesk Priorities ---
public record HelpdeskPriorityLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertHelpdeskPriorityRequest(string Name, bool IsActive, int SortOrder);

// --- Helpdesk Severities ---
public record HelpdeskSeverityLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertHelpdeskSeverityRequest(string Name, bool IsActive, int SortOrder);

// --- Helpdesk Sources ---
public record HelpdeskSourceLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertHelpdeskSourceRequest(string Name, bool IsActive, int SortOrder);

// --- Property Statuses ---
public record PropertyStatusLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertPropertyStatusRequest(string Name, bool IsActive, int SortOrder);

// --- Property Types ---
public record PropertyTypeLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertPropertyTypeRequest(string Name, bool IsActive, int SortOrder);

// --- Deal Types ---
public record DealTypeLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertDealTypeRequest(string Name, bool IsActive, int SortOrder);

// --- Deal Segments ---
public record DealSegmentLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertDealSegmentRequest(string Name, bool IsActive, int SortOrder);

// --- Document Categories ---
public record DocumentCategoryLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertDocumentCategoryRequest(string Name, bool IsActive, int SortOrder);

// --- Lead Disqualification Reasons ---
public record LeadDisqualificationReasonLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertLeadDisqualificationReasonRequest(string Name, bool IsActive, int SortOrder);

// --- Lead Loss Reasons ---
public record LeadLossReasonLookupDto(Guid Id, string Name, bool IsActive, int SortOrder);

public record UpsertLeadLossReasonRequest(string Name, bool IsActive, int SortOrder);
