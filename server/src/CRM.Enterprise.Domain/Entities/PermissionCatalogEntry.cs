namespace CRM.Enterprise.Domain.Entities;

public class PermissionCatalogEntry
{
    public Guid Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
