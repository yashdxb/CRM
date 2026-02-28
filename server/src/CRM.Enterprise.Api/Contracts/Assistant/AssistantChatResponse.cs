namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantChatResponse(
    string Reply,
    IReadOnlyList<AssistantChatMessageItem> Messages,
    string? ConversationId = null,
    bool Streamed = false);
