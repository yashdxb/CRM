namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantChatRequest(
    string Message,
    bool Stream = false,
    string? ConversationId = null);
