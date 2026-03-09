namespace CRM.Enterprise.Application.Tenants;

public interface IIndustryPresetService
{
    Task ApplyPresetAsync(Guid tenantId, string presetId, bool resetExisting, CancellationToken cancellationToken = default);
}
