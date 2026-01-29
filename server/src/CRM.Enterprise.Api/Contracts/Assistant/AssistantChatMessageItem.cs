namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantChatMessageItem(
    Guid Id,
    string Role,
    string Content,
    DateTime CreatedAtUtc);
