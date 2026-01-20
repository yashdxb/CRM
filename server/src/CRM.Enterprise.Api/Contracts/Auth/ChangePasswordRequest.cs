namespace CRM.Enterprise.Api.Contracts.Auth;

public record ChangePasswordRequest(string CurrentPassword, string NewPassword);
