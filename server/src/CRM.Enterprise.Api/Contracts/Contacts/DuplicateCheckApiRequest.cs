namespace CRM.Enterprise.Api.Contracts.Contacts;

public class DuplicateCheckApiRequest
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public Guid? ExcludeContactId { get; set; }
}

public record DuplicateContactItem(
    Guid Id,
    string FullName,
    string? Email,
    string? Phone,
    int MatchScore,
    string MatchReason);

public record DuplicateCheckApiResponse(IEnumerable<DuplicateContactItem> Duplicates);
