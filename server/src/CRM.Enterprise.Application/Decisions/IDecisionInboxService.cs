namespace CRM.Enterprise.Application.Decisions;

public interface IDecisionInboxService
{
    Task<IReadOnlyList<DecisionInboxItemDto>> GetInboxAsync(
        string? status = null,
        string? purpose = null,
        CancellationToken cancellationToken = default);

    Task<DecisionInboxItemDto> CreateAsync(
        DecisionCreateRequestDto request,
        CancellationToken cancellationToken = default);

    Task<DecisionAssistDraftDto> GenerateAssistDraftAsync(
        Guid decisionId,
        CancellationToken cancellationToken = default);

    Task<DecisionInboxItemDto> DecideAsync(
        Guid decisionId,
        DecisionDecisionRequestDto request,
        CancellationToken cancellationToken = default);

    Task<DecisionInboxItemDto> RequestInfoAsync(
        Guid decisionId,
        DecisionRequestInfoDto request,
        CancellationToken cancellationToken = default);

    Task<DecisionInboxItemDto> DelegateAsync(
        Guid decisionId,
        DecisionDelegateRequestDto request,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<DecisionHistoryItemDto>> GetHistoryAsync(
        string? action = null,
        string? status = null,
        string? decisionType = null,
        string? search = null,
        int take = 200,
        CancellationToken cancellationToken = default);
}
