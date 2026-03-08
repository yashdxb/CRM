namespace CRM.Enterprise.Infrastructure.Auth;

public class EntraIdOptions
{
    public const string SectionName = "EntraId";

    public bool Enabled { get; set; }
    public string ClientId { get; set; } = string.Empty;
    public string TenantId { get; set; } = "organizations";
    public string? Authority { get; set; }
    public bool LocalLoginEnabled { get; set; } = true;
    public string[] AllowedTenantIds { get; set; } = [];
}
