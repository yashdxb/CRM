using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Application.Auth;

public interface IAuthService
{
    Task<AuthResult?> SignInAsync(string email, string password, CancellationToken cancellationToken = default);
}
