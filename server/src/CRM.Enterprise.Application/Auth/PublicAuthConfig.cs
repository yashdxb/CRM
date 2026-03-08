namespace CRM.Enterprise.Application.Auth;

public sealed record PublicAuthConfig(
    bool LocalLoginEnabled,
    PublicEntraAuthConfig Entra);

public sealed record PublicEntraAuthConfig(
    bool Enabled,
    string ClientId,
    string Authority,
    string RedirectUri);
