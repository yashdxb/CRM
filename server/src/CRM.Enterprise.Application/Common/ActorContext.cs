namespace CRM.Enterprise.Application.Common;

public readonly record struct ActorContext(Guid? UserId, string? UserName)
{
    public static ActorContext System => new(null, "system");
}
