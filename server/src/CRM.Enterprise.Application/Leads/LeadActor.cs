namespace CRM.Enterprise.Application.Leads;

public readonly record struct LeadActor(Guid UserId, string? UserName)
{
    public static LeadActor System => new(Guid.Empty, "system");
}
