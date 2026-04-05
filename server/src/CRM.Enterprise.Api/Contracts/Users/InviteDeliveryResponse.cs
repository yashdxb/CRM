using System;

namespace CRM.Enterprise.Api.Contracts.Users;

public record InviteDeliveryResponse(
    bool InviteEmailSent,
    string Message,
    DateTime? LastInviteSentAtUtc);
