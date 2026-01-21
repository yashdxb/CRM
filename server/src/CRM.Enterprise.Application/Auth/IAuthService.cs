using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Application.Auth;

public interface IAuthService
{
    Task<AuthResult?> SignInAsync(string email, string password, CancellationToken cancellationToken = default);
    Task<PasswordChangeResult?> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword, CancellationToken cancellationToken = default);
    Task<bool> AcceptInviteAsync(string token, string newPassword, CancellationToken cancellationToken = default);
    Task<InviteTokenStatus> GetInviteStatusAsync(string token, CancellationToken cancellationToken = default);
}
