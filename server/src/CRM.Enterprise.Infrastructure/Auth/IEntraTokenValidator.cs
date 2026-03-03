namespace CRM.Enterprise.Infrastructure.Auth;

public interface IEntraTokenValidator
{
    Task<EntraIdentity?> ValidateIdTokenAsync(string idToken, CancellationToken cancellationToken = default);
}
