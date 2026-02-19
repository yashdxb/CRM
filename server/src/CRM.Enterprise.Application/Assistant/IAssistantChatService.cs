namespace CRM.Enterprise.Application.Assistant;

public interface IAssistantChatService
{
    Task<IReadOnlyList<AssistantChatMessage>> GetHistoryAsync(Guid userId, CancellationToken cancellationToken, int take = 50);
    Task<AssistantChatResult> SendAsync(Guid userId, string message, CancellationToken cancellationToken);
    Task<AssistantInsightsResult> GetInsightsAsync(Guid userId, CancellationToken cancellationToken);
    Task<AssistantActionExecutionResult> ExecuteActionAsync(Guid userId, AssistantActionExecutionRequest request, CancellationToken cancellationToken);
    Task<AssistantActionExecutionResult> ReviewActionAsync(Guid userId, AssistantActionReviewRequest request, CancellationToken cancellationToken);
    Task<AssistantActionExecutionResult> UndoActionAsync(Guid userId, AssistantActionUndoRequest request, CancellationToken cancellationToken);
}
