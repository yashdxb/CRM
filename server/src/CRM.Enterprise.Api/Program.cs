using CRM.Enterprise.Security;
using CRM.Enterprise.Application;
using CRM.Enterprise.Infrastructure;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Infrastructure.Auth;
using CRM.Enterprise.Api.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(
                "http://localhost:4200",
                "https://localhost:4200",
                "http://localhost:4201",
                "https://localhost:4201",
                "http://127.0.0.1:4201",
                "http://localhost:5173",
                "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
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
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Permissions.Policies.DashboardView, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.DashboardView));
    options.AddPolicy(Permissions.Policies.CustomersManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.CustomersManage));
    options.AddPolicy(Permissions.Policies.ContactsManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ContactsManage));
    options.AddPolicy(Permissions.Policies.LeadsManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.LeadsManage));
    options.AddPolicy(Permissions.Policies.OpportunitiesManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.OpportunitiesManage));
    options.AddPolicy(Permissions.Policies.ActivitiesManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.ActivitiesManage));
    options.AddPolicy(Permissions.Policies.AdministrationManage, policy =>
        policy.RequireClaim(Permissions.ClaimType, Permissions.Policies.AdministrationManage));
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

app.UseCors();
app.UseHttpsRedirection();
app.UseMiddleware<TenantResolutionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/health", () => Results.Ok(new
{
    Status = "ok",
    TimestampUtc = DateTime.UtcNow
})).AllowAnonymous();

using (var scope = app.Services.CreateScope())
{
    var initializer = scope.ServiceProvider.GetRequiredService<IDatabaseInitializer>();
    await initializer.InitializeAsync();
}

await app.RunAsync();
