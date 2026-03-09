using CRM.Enterprise.Security;
using CRM.Enterprise.Application;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Infrastructure;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Infrastructure.Auth;
using CRM.Enterprise.Api.Middleware;
using CRM.Enterprise.Api.Hubs;
using CRM.Enterprise.Api.Realtime;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Data.SqlClient;
using System.Threading;
using Telerik.Reporting.Cache.File;
using Telerik.Reporting.Services;
using Telerik.Reporting.Services.Engine;
using Telerik.WebReportDesigner.Services;
using CRM.Enterprise.Api.Reporting;

var builder = WebApplication.CreateBuilder(args);

var appPort = Environment.GetEnvironmentVariable("PORT")
    ?? Environment.GetEnvironmentVariable("WEBSITES_PORT");
if (!string.IsNullOrWhiteSpace(appPort) &&
    string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("ASPNETCORE_URLS")))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{appPort}");
}

if (builder.Environment.IsDevelopment())
{
    var sqlConnectionString = builder.Configuration.GetConnectionString("SqlServer")
        ?? throw new InvalidOperationException("Connection string 'SqlServer' was not found.");
    EnsureSqlServerAvailable(sqlConnectionString);
}

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddSingleton<ICrmRealtimePublisher, SignalRCrmRealtimePublisher>();
builder.Services.AddHostedService<ImportJobRealtimeProgressWorker>();
builder.Services.AddHealthChecks()
    .AddDbContextCheck<CrmDbContext>("db");

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddScoped<TenantConnectionStringHandler>();

builder.Services.TryAddSingleton<IReportServiceConfiguration>(sp =>
{
    var reportsPath = ResolveWritableReportsPath(builder.Environment);
    var cachePath = ResolveWritableCachePath(builder.Environment);
    Directory.CreateDirectory(reportsPath);
    Directory.CreateDirectory(cachePath);

    var httpContextAccessor = sp.GetRequiredService<IHttpContextAccessor>();
    var innerResolver = new TypeReportSourceResolver()
        .AddFallbackResolver(new UriReportSourceResolver(reportsPath));

    return new ReportServiceConfiguration
    {
        HostAppId = "CRM.Enterprise.Api",
        Storage = new FileStorage(cachePath),
        ReportSourceResolver = new TenantReportResolver(innerResolver, httpContextAccessor)
    };
});

// Web Report Designer configuration
builder.Services.TryAddSingleton<IReportDesignerServiceConfiguration>(_ =>
{
    var reportsPath = ResolveWritableReportsPath(builder.Environment);
    Directory.CreateDirectory(reportsPath);

    return new ReportDesignerServiceConfiguration
    {
        DefinitionStorage = new FileDefinitionStorage(reportsPath),
        ResourceStorage = new ResourceStorage(Path.Combine(reportsPath, "Resources")),
        SharedDataSourceStorage = new FileSharedDataSourceStorage(Path.Combine(reportsPath, "SharedDataSources")),
        SettingsStorage = new FileSettingsStorage(Path.Combine(reportsPath, "Settings"))
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var signalRConnectionString = builder.Configuration["Azure:SignalR:ConnectionString"];
if (!string.IsNullOrWhiteSpace(signalRConnectionString))
{
    builder.Services.AddSignalR().AddAzureSignalR(signalRConnectionString);
}
else
{
    builder.Services.AddSignalR();
}
var allowedOrigins = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
{
    "http://localhost:4200",
    "https://localhost:4200",
    "http://localhost:4201",
    "https://localhost:4201",
    "http://127.0.0.1:4201",
    "http://localhost:5173",
    "https://localhost:5173",
    "https://jolly-dune-0d9d1fe0f.2.azurestaticapps.net",
    "https://northedgesystem.com",
    "https://www.northedgesystem.com"
};


static string ResolveWritableReportsPath(IHostEnvironment environment)
{
    var home = Environment.GetEnvironmentVariable("HOME");
    if (!string.IsNullOrWhiteSpace(home) && !environment.IsDevelopment())
    {
        return Path.Combine(home, "site", "data", "CRM-Enterprise", "Reports");
    }

    return Path.Combine(environment.ContentRootPath, "Reports");
}

static string ResolveWritableCachePath(IHostEnvironment environment)
{
    var home = Environment.GetEnvironmentVariable("HOME");
    if (!string.IsNullOrWhiteSpace(home) && !environment.IsDevelopment())
    {
        return Path.Combine(home, "site", "data", "CRM-Enterprise", "TelerikReportingCache");
    }

    return Path.Combine(environment.ContentRootPath, "App_Data", "TelerikReportingCache");
}

static bool IsAllowedOrigin(HashSet<string> origins, string? origin)
{
    if (string.IsNullOrWhiteSpace(origin))
    {
        return false;
    }

    if (origins.Contains(origin))
    {
        return true;
    }

    if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri))
    {
        return false;
    }

    return uri.Scheme.Equals("https", StringComparison.OrdinalIgnoreCase) &&
           (uri.Host.Equals("northedgesystem.com", StringComparison.OrdinalIgnoreCase) ||
            uri.Host.EndsWith(".northedgesystem.com", StringComparison.OrdinalIgnoreCase));
}

const string CorsPolicyName = "AppCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
        policy.SetIsOriginAllowed(origin => IsAllowedOrigin(allowedOrigins, origin))
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

JwtOptions jwtOptions;
if (builder.Environment.IsEnvironment("Testing"))
{
    jwtOptions = new JwtOptions
    {
        Key = "test-key-test-key-test-key-test-key",
        Issuer = "test-issuer",
        Audience = "test-audience"
    };
}
else
{
    var jwtSection = builder.Configuration.GetSection(JwtOptions.SectionName);
    jwtOptions = jwtSection.Get<JwtOptions>() ?? throw new InvalidOperationException("Jwt configuration missing.");
}
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Key))
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrWhiteSpace(accessToken) &&
                    (path.StartsWithSegments("/api/hubs/presence") || 
                     path.StartsWithSegments("/api/hubs/crm-events") ||
                     path.StartsWithSegments("/api/telerik-reports") ||
                     path.StartsWithSegments("/api/report-designer")))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

// Register Telerik anonymous handler to allow unauthenticated access to discovery endpoints
builder.Services.AddSingleton<IAuthorizationHandler, CRM.Enterprise.Api.Authorization.TelerikAnonymousHandler>();

// Register Report Designer authorization handler for configurable permission
builder.Services.AddSingleton<IAuthorizationHandler, CRM.Enterprise.Api.Authorization.ReportDesignerAuthorizationHandler>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Permissions.Policies.DashboardView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.DashboardView));
    options.AddPolicy(Permissions.Policies.CustomersView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.CustomersView));
    options.AddPolicy(Permissions.Policies.CustomersManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.CustomersManage));
    options.AddPolicy(Permissions.Policies.ContactsView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ContactsView));
    options.AddPolicy(Permissions.Policies.ContactsManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ContactsManage));
    options.AddPolicy(Permissions.Policies.LeadsView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.LeadsView));
    options.AddPolicy(Permissions.Policies.LeadsManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.LeadsManage));
    options.AddPolicy(Permissions.Policies.OpportunitiesView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.OpportunitiesView));
    options.AddPolicy(Permissions.Policies.OpportunitiesManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.OpportunitiesManage));
    options.AddPolicy(Permissions.Policies.OpportunitiesApprovalsRequest, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.OpportunitiesApprovalsRequest));
    options.AddPolicy(Permissions.Policies.OpportunitiesApprovalsApprove, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.OpportunitiesApprovalsApprove));
    options.AddPolicy(Permissions.Policies.OpportunitiesApprovalsOverride, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.OpportunitiesApprovalsOverride));
    options.AddPolicy(Permissions.Policies.ActivitiesView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ActivitiesView));
    options.AddPolicy(Permissions.Policies.ActivitiesManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ActivitiesManage));
    options.AddPolicy(Permissions.Policies.MarketingView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.MarketingView));
    options.AddPolicy(Permissions.Policies.MarketingManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.MarketingManage));
    options.AddPolicy(Permissions.Policies.HelpDeskView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.HelpDeskView));
    options.AddPolicy(Permissions.Policies.HelpDeskManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.HelpDeskManage));
    options.AddPolicy(Permissions.Policies.HelpDeskAdmin, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.HelpDeskAdmin));
    options.AddPolicy(Permissions.Policies.AdministrationView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.AdministrationView));
    options.AddPolicy(Permissions.Policies.AdministrationManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.AdministrationManage));
    options.AddPolicy(Permissions.Policies.AuditView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.AuditView));
    options.AddPolicy(Permissions.Policies.TenantsView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.TenantsView));
    options.AddPolicy(Permissions.Policies.TenantsManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.TenantsManage));
    options.AddPolicy(Permissions.Policies.EmailsView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.EmailsView));
    options.AddPolicy(Permissions.Policies.EmailsManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.EmailsManage));
    options.AddPolicy(Permissions.Policies.ReportsView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ReportsView));
    options.AddPolicy(Permissions.Policies.ReportsManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ReportsManage));
    options.AddPolicy(Permissions.Policies.ReportsDesign, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ReportsDesign));

    // Configurable Report Designer policy - reads required permission from appsettings.json
    options.AddPolicy("ReportDesigner", policy =>
        policy.Requirements.Add(new CRM.Enterprise.Api.Authorization.ReportDesignerRequirement()));

    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enforce HTTPS only for non-local traffic to prevent 307 CORS preflight failures during local dev.
app.UseWhen(
    context =>
        !app.Environment.IsDevelopment() &&
        !string.Equals(context.Request.Host.Host, "localhost", StringComparison.OrdinalIgnoreCase) &&
        !string.Equals(context.Request.Host.Host, "127.0.0.1", StringComparison.OrdinalIgnoreCase) &&
        !string.Equals(context.Request.Host.Host, "::1", StringComparison.OrdinalIgnoreCase),
    branch => branch.UseHttpsRedirection());
app.UseRouting();
app.UseCors(CorsPolicyName);
app.UseMiddleware<TenantResolutionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<PresenceHub>("/api/hubs/presence").RequireCors(CorsPolicyName);
app.MapHub<CrmEventsHub>("/api/hubs/crm-events").RequireCors(CorsPolicyName);
app.MapGet("/health", () => Results.Ok(new
{
    Status = "ok",
    TimestampUtc = DateTime.UtcNow
})).AllowAnonymous();
app.MapHealthChecks("/healthz", new HealthCheckOptions
{
    ResponseWriter = async (context, report) =>
    {
        context.Response.ContentType = "application/json";
        var payload = new
        {
            status = report.Status.ToString(),
            totalDuration = report.TotalDuration.TotalMilliseconds,
            checks = report.Entries.Select(entry => new
            {
                name = entry.Key,
                status = entry.Value.Status.ToString(),
                duration = entry.Value.Duration.TotalMilliseconds,
                description = entry.Value.Description
            })
        };
        await context.Response.WriteAsync(JsonSerializer.Serialize(payload));
    }
}).AllowAnonymous();

var runStartupInitialization = app.Environment.IsDevelopment() ||
    builder.Configuration.GetValue<bool>("StartupInitialization:Enabled");

if (runStartupInitialization)
{
    app.Lifetime.ApplicationStarted.Register(() =>
    {
        _ = Task.Run(async () =>
        {
            try
            {
                using var scope = app.Services.CreateScope();
                var initializer = scope.ServiceProvider.GetRequiredService<IDatabaseInitializer>();
                await initializer.InitializeAsync();
                app.Logger.LogInformation("Database initialization completed.");
            }
            catch (Exception ex)
            {
                app.Logger.LogError(ex, "Database initialization failed after application startup.");
            }
        });
    });
}
else
{
    app.Logger.LogInformation("Startup database initialization is disabled for this environment.");
}

await app.RunAsync();

static void EnsureSqlServerAvailable(string connectionString)
{
    const int maxAttempts = 30;
    var delay = TimeSpan.FromSeconds(2);

    for (var attempt = 1; attempt <= maxAttempts; attempt++)
    {
        try
        {
            var builder = new SqlConnectionStringBuilder(connectionString)
            {
                ConnectTimeout = 5
            };
            using var connection = new SqlConnection(builder.ConnectionString);
            connection.Open();
            return;
        }
        catch (Exception) when (attempt < maxAttempts)
        {
            Thread.Sleep(delay);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException(
                "yooo, Habeebi SQL Server is not reachable. Start Docker Desktop and run `docker compose up -d sqlserver`, " +
                "or update ConnectionStrings:SqlServer to a reachable instance.",
                ex);
        }
    }
}
