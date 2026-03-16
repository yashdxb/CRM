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
