namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantChatResult(string Reply, IReadOnlyList<AssistantChatMessage> Messages);
