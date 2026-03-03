namespace CRM.Enterprise.Application.HelpDesk;

public interface ISupportSlaService
{
    Task<IReadOnlyList<SupportSlaPolicyDto>> ListPoliciesAsync(CancellationToken cancellationToken = default);
    Task<HelpDeskOperationResult> UpdatePolicyAsync(Guid id, SupportSlaPolicyUpdateRequest request, CancellationToken cancellationToken = default);
}
