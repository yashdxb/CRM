using CRM.Enterprise.Application.Tenants;
using System.Collections;
using System.Reflection;
using Telerik.Reporting;
using Telerik.Reporting.Services;

namespace CRM.Enterprise.Api.Reporting;

/// <summary>
/// Automatically injects @TenantId parameter and patches SqlDataSource connection strings
/// into every report at render time.
/// </summary>
public sealed class TenantReportResolver : IReportSourceResolver
{
    private readonly IReportSourceResolver _inner;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TenantReportResolver(IReportSourceResolver inner, IHttpContextAccessor httpContextAccessor)
    {
        _inner = inner;
        _httpContextAccessor = httpContextAccessor;
    }

    public ReportSource Resolve(string report, OperationOrigin operationOrigin, IDictionary<string, object>? currentParameterValues)
    {
        var resolved = _inner.Resolve(report, operationOrigin, currentParameterValues);

        if (resolved is null)
            return resolved!;

        var services = _httpContextAccessor.HttpContext?.RequestServices;

        // Inject TenantId parameter
        var tenantProvider = services?.GetService<ITenantProvider>();
        if (tenantProvider is not null && tenantProvider.TenantId != Guid.Empty)
        {
            resolved.Parameters.Add(new Parameter("TenantId", tenantProvider.TenantId.ToString()));
        }

        // Patch SqlDataSource connection strings on the report instance
        var configuration = services?.GetService<IConfiguration>();
        var connectionString = configuration?.GetConnectionString("SqlServer");
        if (!string.IsNullOrEmpty(connectionString) && resolved is InstanceReportSource instanceSource)
        {
            PatchDataSources(instanceSource.ReportDocument, connectionString);
        }
        else if (!string.IsNullOrEmpty(connectionString) && resolved is TypeReportSource typeSource)
        {
            // TypeReportSource — resolve the type and patch
            var typeName = typeSource.TypeName;
            var type = Type.GetType(typeName);
            if (type is not null && typeof(Report).IsAssignableFrom(type))
            {
                var reportInstance = (Report)Activator.CreateInstance(type)!;
                PatchDataSources(reportInstance, connectionString);
                var newSource = new InstanceReportSource { ReportDocument = reportInstance };
                foreach (var p in resolved.Parameters)
                    newSource.Parameters.Add(p);
                return newSource;
            }
        }

        return resolved;
    }

    private static void PatchDataSources(IReportDocument? doc, string connectionString)
    {
        if (doc is null) return;

        var visited = new HashSet<object>(ReferenceEqualityComparer.Instance);
        PatchObjectGraph(doc, connectionString, visited);
    }

    private static void PatchObjectGraph(object? node, string connectionString, HashSet<object> visited)
    {
        if (node is null || !visited.Add(node))
            return;

        var type = node.GetType();

        var dataSourceProperty = type.GetProperty("DataSource", BindingFlags.Public | BindingFlags.Instance);
        if (dataSourceProperty?.CanRead == true && dataSourceProperty.GetValue(node) is SqlDataSource sqlDataSource)
        {
            sqlDataSource.ConnectionString = connectionString;
        }

        var itemsProperty = type.GetProperty("Items", BindingFlags.Public | BindingFlags.Instance);
        if (itemsProperty?.CanRead == true && itemsProperty.GetValue(node) is IEnumerable items)
        {
            foreach (var item in items)
            {
                PatchObjectGraph(item, connectionString, visited);
            }
        }
    }
}
