using CRM.Enterprise.Security;
using CRM.Enterprise.Application;
using CRM.Enterprise.Infrastructure;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Infrastructure.Auth;
using CRM.Enterprise.Api.Middleware;
using CRM.Enterprise.Api.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Data.SqlClient;
using System.Threading;

var builder = WebApplication.CreateBuilder(args);

var sqlConnectionString = builder.Configuration.GetConnectionString("SqlServer")
    ?? throw new InvalidOperationException("Connection string 'SqlServer' was not found.");
EnsureSqlServerAvailable(sqlConnectionString);

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddHealthChecks()
    .AddDbContextCheck<CrmDbContext>("db");

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
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
var allowedOrigins = new[]
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

const string CorsPolicyName = "AppCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

var jwtSection = builder.Configuration.GetSection(JwtOptions.SectionName);
var jwtOptions = jwtSection.Get<JwtOptions>() ?? throw new InvalidOperationException("Jwt configuration missing.");
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
                if (!string.IsNullOrWhiteSpace(accessToken) && path.StartsWithSegments("/api/hubs/presence"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });
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
    options.AddPolicy(Permissions.Policies.ActivitiesView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ActivitiesView));
    options.AddPolicy(Permissions.Policies.ActivitiesManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ActivitiesManage));
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

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(CorsPolicyName);
app.UseMiddleware<TenantResolutionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<PresenceHub>("/api/hubs/presence").RequireCors(CorsPolicyName);
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

using (var scope = app.Services.CreateScope())
{
    var initializer = scope.ServiceProvider.GetRequiredService<IDatabaseInitializer>();
    await initializer.InitializeAsync();
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
                "SQL Server is not reachable. Start Docker Desktop and run `docker compose up -d sqlserver`, " +
                "or update ConnectionStrings:SqlServer to a reachable instance.",
                ex);
        }
    }
}
