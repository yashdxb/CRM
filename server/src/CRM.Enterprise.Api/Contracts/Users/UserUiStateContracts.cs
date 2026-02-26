using System.Text.Json;

namespace CRM.Enterprise.Api.Contracts.Users;

public record UserUiStateResponse(
    string Key,
    JsonElement Value);

public record UpdateUserUiStateRequest(
    JsonElement Value);
