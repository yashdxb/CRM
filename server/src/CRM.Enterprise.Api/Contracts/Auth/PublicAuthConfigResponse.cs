namespace CRM.Enterprise.Api.Contracts.Auth;

public record PublicAuthConfigResponse(
    bool LocalLoginEnabled,
    PublicEntraAuthConfigResponse Entra);

public record PublicEntraAuthConfigResponse(
    bool Enabled,
    string ClientId,
    string Authority,
    string RedirectUri);
