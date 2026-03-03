namespace CRM.Enterprise.Application.Assistant;

public interface IAssistantChatService
{
    Task<IReadOnlyList<AssistantChatMessage>> GetHistoryAsync(Guid userId, CancellationToken cancellationToken, int take = 50);
    Task<AssistantChatResult> SendAsync(Guid userId, string message, CancellationToken cancellationToken);
    
    /// <summary>
    /// Streams assistant response tokens as they are generated.
    /// </summary>
    /// <param name="userId">The user ID</param>
    /// <param name="message">The user message</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Async enumerable of response tokens</returns>
    IAsyncEnumerable<AssistantStreamChunk> SendStreamingAsync(Guid userId, string message, CancellationToken cancellationToken);
    
    Task<AssistantInsightsResult> GetInsightsAsync(Guid userId, CancellationToken cancellationToken);
    Task<AssistantActionExecutionResult> ExecuteActionAsync(Guid userId, AssistantActionExecutionRequest request, CancellationToken cancellationToken);
    Task<AssistantActionExecutionResult> ReviewActionAsync(Guid userId, AssistantActionReviewRequest request, CancellationToken cancellationToken);
    Task<AssistantActionExecutionResult> UndoActionAsync(Guid userId, AssistantActionUndoRequest request, CancellationToken cancellationToken);
}

/// <summary>
/// Represents a streaming chunk from the assistant
/// </summary>
public sealed record AssistantStreamChunk(
    Guid ConversationId,
    Guid MessageId,
    string Token,
    bool IsComplete = false,
    string? FullReply = null);
