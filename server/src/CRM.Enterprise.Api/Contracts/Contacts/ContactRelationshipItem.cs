namespace CRM.Enterprise.Api.Contracts.Contacts;

public record ContactRelationshipItem(
    Guid Id,
    string FullName,
    string? JobTitle,
    string Relationship);
