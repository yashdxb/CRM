namespace CRM.Enterprise.Application.Lookups;

public interface ILeadStatusLookupService
{
    Task<IReadOnlyList<LeadStatusDto>> GetAllAsync(CancellationToken ct = default);
    Task<LeadStatusDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<LeadStatusDto> CreateAsync(UpsertLeadStatusRequest request, CancellationToken ct = default);
    Task<LeadStatusDto?> UpdateAsync(Guid id, UpsertLeadStatusRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
    Task<bool> ReorderAsync(IReadOnlyList<Guid> orderedIds, CancellationToken ct = default);
}

public interface IOpportunityStageLookupService
{
    Task<IReadOnlyList<OpportunityStageDto>> GetAllAsync(CancellationToken ct = default);
    Task<OpportunityStageDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<OpportunityStageDto> CreateAsync(UpsertOpportunityStageRequest request, CancellationToken ct = default);
    Task<OpportunityStageDto?> UpdateAsync(Guid id, UpsertOpportunityStageRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
    Task<bool> ReorderAsync(IReadOnlyList<Guid> orderedIds, CancellationToken ct = default);
}

public interface ICurrencyLookupService
{
    Task<IReadOnlyList<CurrencyLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<CurrencyLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<CurrencyLookupDto> CreateAsync(UpsertCurrencyRequest request, CancellationToken ct = default);
    Task<CurrencyLookupDto?> UpdateAsync(Guid id, UpsertCurrencyRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IPhoneTypeLookupService
{
    Task<IReadOnlyList<PhoneTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<PhoneTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<PhoneTypeLookupDto> CreateAsync(UpsertPhoneTypeRequest request, CancellationToken ct = default);
    Task<PhoneTypeLookupDto?> UpdateAsync(Guid id, UpsertPhoneTypeRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface ICadenceChannelLookupService
{
    Task<IReadOnlyList<CadenceChannelDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<CadenceChannelDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<CadenceChannelDto> CreateAsync(UpsertCadenceChannelRequest request, CancellationToken ct = default);
    Task<CadenceChannelDto?> UpdateAsync(Guid id, UpsertCadenceChannelRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
    Task<bool> ReorderAsync(IReadOnlyList<Guid> orderedIds, CancellationToken ct = default);
}

public interface IAccountTypeLookupService
{
    Task<IReadOnlyList<AccountTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<AccountTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<AccountTypeLookupDto> CreateAsync(UpsertAccountTypeRequest request, CancellationToken ct = default);
    Task<AccountTypeLookupDto?> UpdateAsync(Guid id, UpsertAccountTypeRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IAccountSourceLookupService
{
    Task<IReadOnlyList<AccountSourceLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<AccountSourceLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<AccountSourceLookupDto> CreateAsync(UpsertAccountSourceRequest request, CancellationToken ct = default);
    Task<AccountSourceLookupDto?> UpdateAsync(Guid id, UpsertAccountSourceRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface ICustomerRatingLookupService
{
    Task<IReadOnlyList<CustomerRatingLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<CustomerRatingLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<CustomerRatingLookupDto> CreateAsync(UpsertCustomerRatingRequest request, CancellationToken ct = default);
    Task<CustomerRatingLookupDto?> UpdateAsync(Guid id, UpsertCustomerRatingRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IContactBuyingRoleLookupService
{
    Task<IReadOnlyList<ContactBuyingRoleLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<ContactBuyingRoleLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<ContactBuyingRoleLookupDto> CreateAsync(UpsertContactBuyingRoleRequest request, CancellationToken ct = default);
    Task<ContactBuyingRoleLookupDto?> UpdateAsync(Guid id, UpsertContactBuyingRoleRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IActivityTypeLookupService
{
    Task<IReadOnlyList<ActivityTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<ActivityTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<ActivityTypeLookupDto> CreateAsync(UpsertActivityTypeRequest request, CancellationToken ct = default);
    Task<ActivityTypeLookupDto?> UpdateAsync(Guid id, UpsertActivityTypeRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IActivityPriorityLookupService
{
    Task<IReadOnlyList<ActivityPriorityLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<ActivityPriorityLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<ActivityPriorityLookupDto> CreateAsync(UpsertActivityPriorityRequest request, CancellationToken ct = default);
    Task<ActivityPriorityLookupDto?> UpdateAsync(Guid id, UpsertActivityPriorityRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IHelpdeskCaseStatusLookupService
{
    Task<IReadOnlyList<HelpdeskCaseStatusLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<HelpdeskCaseStatusLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<HelpdeskCaseStatusLookupDto> CreateAsync(UpsertHelpdeskCaseStatusRequest request, CancellationToken ct = default);
    Task<HelpdeskCaseStatusLookupDto?> UpdateAsync(Guid id, UpsertHelpdeskCaseStatusRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IHelpdeskPriorityLookupService
{
    Task<IReadOnlyList<HelpdeskPriorityLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<HelpdeskPriorityLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<HelpdeskPriorityLookupDto> CreateAsync(UpsertHelpdeskPriorityRequest request, CancellationToken ct = default);
    Task<HelpdeskPriorityLookupDto?> UpdateAsync(Guid id, UpsertHelpdeskPriorityRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IHelpdeskSeverityLookupService
{
    Task<IReadOnlyList<HelpdeskSeverityLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<HelpdeskSeverityLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<HelpdeskSeverityLookupDto> CreateAsync(UpsertHelpdeskSeverityRequest request, CancellationToken ct = default);
    Task<HelpdeskSeverityLookupDto?> UpdateAsync(Guid id, UpsertHelpdeskSeverityRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IHelpdeskSourceLookupService
{
    Task<IReadOnlyList<HelpdeskSourceLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<HelpdeskSourceLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<HelpdeskSourceLookupDto> CreateAsync(UpsertHelpdeskSourceRequest request, CancellationToken ct = default);
    Task<HelpdeskSourceLookupDto?> UpdateAsync(Guid id, UpsertHelpdeskSourceRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IPropertyStatusLookupService
{
    Task<IReadOnlyList<PropertyStatusLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<PropertyStatusLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<PropertyStatusLookupDto> CreateAsync(UpsertPropertyStatusRequest request, CancellationToken ct = default);
    Task<PropertyStatusLookupDto?> UpdateAsync(Guid id, UpsertPropertyStatusRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IPropertyTypeLookupService
{
    Task<IReadOnlyList<PropertyTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<PropertyTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<PropertyTypeLookupDto> CreateAsync(UpsertPropertyTypeRequest request, CancellationToken ct = default);
    Task<PropertyTypeLookupDto?> UpdateAsync(Guid id, UpsertPropertyTypeRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IDealTypeLookupService
{
    Task<IReadOnlyList<DealTypeLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<DealTypeLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<DealTypeLookupDto> CreateAsync(UpsertDealTypeRequest request, CancellationToken ct = default);
    Task<DealTypeLookupDto?> UpdateAsync(Guid id, UpsertDealTypeRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IDealSegmentLookupService
{
    Task<IReadOnlyList<DealSegmentLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<DealSegmentLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<DealSegmentLookupDto> CreateAsync(UpsertDealSegmentRequest request, CancellationToken ct = default);
    Task<DealSegmentLookupDto?> UpdateAsync(Guid id, UpsertDealSegmentRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface IDocumentCategoryLookupService
{
    Task<IReadOnlyList<DocumentCategoryLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<DocumentCategoryLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<DocumentCategoryLookupDto> CreateAsync(UpsertDocumentCategoryRequest request, CancellationToken ct = default);
    Task<DocumentCategoryLookupDto?> UpdateAsync(Guid id, UpsertDocumentCategoryRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface ILeadDisqualificationReasonLookupService
{
    Task<IReadOnlyList<LeadDisqualificationReasonLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<LeadDisqualificationReasonLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<LeadDisqualificationReasonLookupDto> CreateAsync(UpsertLeadDisqualificationReasonRequest request, CancellationToken ct = default);
    Task<LeadDisqualificationReasonLookupDto?> UpdateAsync(Guid id, UpsertLeadDisqualificationReasonRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}

public interface ILeadLossReasonLookupService
{
    Task<IReadOnlyList<LeadLossReasonLookupDto>> GetAllAsync(bool includeInactive = false, CancellationToken ct = default);
    Task<LeadLossReasonLookupDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<LeadLossReasonLookupDto> CreateAsync(UpsertLeadLossReasonRequest request, CancellationToken ct = default);
    Task<LeadLossReasonLookupDto?> UpdateAsync(Guid id, UpsertLeadLossReasonRequest request, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}
