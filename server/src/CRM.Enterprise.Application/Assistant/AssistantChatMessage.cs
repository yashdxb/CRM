namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantChatMessage(Guid Id, string Role, string Content, DateTime CreatedAtUtc);
