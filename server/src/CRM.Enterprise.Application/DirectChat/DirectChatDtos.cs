namespace CRM.Enterprise.Application.DirectChat;

public sealed record DirectChatThreadDto(
    Guid ThreadId,
    string? Title,
    DateTime LastMessageAtUtc,
    bool IsArchived,
    DateTime? LastClearedAtUtc,
    IReadOnlyList<DirectChatParticipantDto> Participants);

public sealed record DirectChatParticipantDto(
    Guid UserId,
    string DisplayName,
    string Email);

public sealed record DirectChatMessageDto(
    Guid MessageId,
    Guid ThreadId,
    Guid SenderUserId,
    string SenderDisplayName,
    string Content,
    DateTime SentAtUtc);
