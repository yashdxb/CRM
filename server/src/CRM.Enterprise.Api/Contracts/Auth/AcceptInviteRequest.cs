namespace CRM.Enterprise.Api.Contracts.Auth;

public record AcceptInviteRequest(string Token, string NewPassword);
