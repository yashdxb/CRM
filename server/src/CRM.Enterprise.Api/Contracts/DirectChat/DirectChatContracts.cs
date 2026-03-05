namespace CRM.Enterprise.Api.Contracts.DirectChat;

public sealed record OpenDirectChatThreadRequest(IReadOnlyList<Guid> ParticipantUserIds);

public sealed record SendDirectChatMessageRequest(string Message, IReadOnlyList<Guid>? AttachmentIds);

public sealed record ArchiveDirectChatThreadRequest(bool Archived);

public sealed record AddDirectChatParticipantRequest(Guid UserId);
public sealed record DirectChatTypingRequest(bool IsTyping);

public sealed record DirectChatParticipantItem(Guid UserId, string DisplayName, string Email);

public sealed record DirectChatThreadItem(
    Guid ThreadId,
    string? Title,
    DateTime LastMessageAtUtc,
    bool IsArchived,
    DateTime? LastClearedAtUtc,
    IReadOnlyList<DirectChatParticipantItem> Participants);

public sealed record DirectChatMessageItem(
    Guid MessageId,
    Guid ThreadId,
    Guid SenderUserId,
    string SenderDisplayName,
    string Content,
    DateTime SentAtUtc,
    IReadOnlyList<DirectChatAttachmentItem> Attachments);

public sealed record DirectChatAttachmentItem(
    Guid AttachmentId,
    string FileName,
    string ContentType,
    long Size,
    string DownloadUrl);
