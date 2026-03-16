namespace CRM.Enterprise.Api.Contracts.Contacts;

public class MergeContactsApiRequest
{
    public Guid MasterContactId { get; set; }
    public List<Guid> SecondaryContactIds { get; set; } = new();
}

public record MergeContactsApiResponse(Guid MasterId, int MergedCount);
