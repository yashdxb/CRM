namespace CRM.Enterprise.Application.DirectChat;

public interface IDirectChatService
{
    Task<IReadOnlyList<DirectChatThreadDto>> ListThreadsAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<DirectChatThreadDto?> OpenThreadAsync(Guid userId, IReadOnlyCollection<Guid> participantUserIds, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<DirectChatMessageDto>> GetMessagesAsync(Guid userId, Guid threadId, int take = 200, CancellationToken cancellationToken = default);
    Task<DirectChatMessageDto?> SendMessageAsync(
        Guid userId,
        Guid threadId,
        string message,
        IReadOnlyCollection<Guid>? attachmentIds = null,
        CancellationToken cancellationToken = default);
    Task<bool> ArchiveThreadAsync(Guid userId, Guid threadId, bool archived, CancellationToken cancellationToken = default);
    Task<bool> ClearThreadAsync(Guid userId, Guid threadId, CancellationToken cancellationToken = default);
    Task<bool> AddParticipantAsync(Guid userId, Guid threadId, Guid participantUserId, CancellationToken cancellationToken = default);
    Task<bool> PublishTypingAsync(Guid userId, Guid threadId, bool isTyping, CancellationToken cancellationToken = default);
}
