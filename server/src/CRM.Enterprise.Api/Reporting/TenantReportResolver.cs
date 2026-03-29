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
        var tenantId = tenantProvider?.TenantId ?? Guid.Empty;
        var tenantIdValue = tenantId == Guid.Empty ? null : tenantId.ToString();
        if (tenantProvider is not null && tenantProvider.TenantId != Guid.Empty)
        {
            UpsertReportSourceParameter(resolved, "TenantId", tenantIdValue!);
        }

        // Patch SqlDataSource connection strings on the report instance
        var configuration = services?.GetService<IConfiguration>();
        var connectionString = configuration?.GetConnectionString("SqlServer");
        if (!string.IsNullOrEmpty(connectionString) && resolved is InstanceReportSource instanceSource)
        {
            PatchDataSources(instanceSource.ReportDocument, connectionString);
            ApplyHiddenParameterValue(instanceSource.ReportDocument, "TenantId", tenantIdValue);
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
                ApplyHiddenParameterValue(reportInstance, "TenantId", tenantIdValue);
                var newSource = new InstanceReportSource { ReportDocument = reportInstance };
                foreach (var p in resolved.Parameters)
                    newSource.Parameters.Add(p);
                return newSource;
            }
        }

        return resolved;
    }

    private static void UpsertReportSourceParameter(ReportSource reportSource, string name, object value)
    {
        for (var index = reportSource.Parameters.Count - 1; index >= 0; index--)
        {
            if (string.Equals(reportSource.Parameters[index].Name, name, StringComparison.OrdinalIgnoreCase))
            {
                reportSource.Parameters.RemoveAt(index);
            }
        }

        reportSource.Parameters.Add(new Parameter(name, value));
    }

    private static void ApplyHiddenParameterValue(IReportDocument? document, string name, string? value)
    {
        if (document is not Report report)
        {
            return;
        }

        foreach (var parameter in report.ReportParameters)
        {
            if (!string.Equals(parameter.Name, name, StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            parameter.AllowBlank = true;
            parameter.AllowNull = true;
            parameter.Visible = false;
            parameter.Value = value ?? string.Empty;
            break;
        }
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
