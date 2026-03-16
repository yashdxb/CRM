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
