using CRM.Enterprise.Application.Tenants;

namespace CRM.Enterprise.Api.Reporting;

/// <summary>
/// Intercepts Telerik Reporting SQL connections to inject the current tenant's ID
/// into SQL Server SESSION_CONTEXT before any report query executes.
/// This ensures raw SQL queries in reports are scoped to the authenticated tenant
/// even though query filters are an EF-only concept.
///
/// Usage in report SQL:
///   WHERE TenantId = CAST(SESSION_CONTEXT(N'TenantId') AS UNIQUEIDENTIFIER)
/// </summary>
public sealed class TenantConnectionStringHandler
{
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TenantConnectionStringHandler(
        IConfiguration configuration,
        IHttpContextAccessor httpContextAccessor)
    {
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
    }

    /// <summary>
    /// Returns the CRM connection string. The report infrastructure should call
    /// <see cref="InitializeTenantContext"/> on the opened connection before executing queries.
    /// </summary>
    public string GetConnectionString()
    {
        return _configuration.GetConnectionString("SqlServer")
            ?? throw new InvalidOperationException("SqlServer connection string is not configured.");
    }

    /// <summary>
    /// Sets SESSION_CONTEXT on an open SqlConnection so that SQL queries
    /// can reference the tenant via:
    ///   CAST(SESSION_CONTEXT(N'TenantId') AS UNIQUEIDENTIFIER)
    /// </summary>
    public void InitializeTenantContext(System.Data.IDbConnection connection)
    {
        var tenantProvider = _httpContextAccessor.HttpContext?.RequestServices
            .GetService<ITenantProvider>();

        if (tenantProvider is null || tenantProvider.TenantId == Guid.Empty)
            return;

        if (connection.State != System.Data.ConnectionState.Open)
            connection.Open();

        using var cmd = connection.CreateCommand();
        cmd.CommandText = "EXEC sp_set_session_context @key = N'TenantId', @value = @TenantId, @read_only = 1;";
        var param = cmd.CreateParameter();
        param.ParameterName = "@TenantId";
        param.Value = tenantProvider.TenantId.ToString();
        param.DbType = System.Data.DbType.String;
        cmd.Parameters.Add(param);
        cmd.ExecuteNonQuery();
    }

    /// <summary>
    /// Returns the current tenant ID for use in report parameters.
    /// </summary>
    public Guid GetCurrentTenantId()
    {
        var tenantProvider = _httpContextAccessor.HttpContext?.RequestServices
            .GetService<ITenantProvider>();
        return tenantProvider?.TenantId ?? Guid.Empty;
    }
}
