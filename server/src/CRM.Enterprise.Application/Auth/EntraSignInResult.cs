namespace CRM.Enterprise.Application.Auth;

public sealed record EntraSignInResult(
    AuthResult? AuthResult,
    string? FailureCode,
    string? Message)
{
    public static EntraSignInResult Success(AuthResult authResult) => new(authResult, null, null);

    public static EntraSignInResult Failure(string failureCode, string message) => new(null, failureCode, message);
}
