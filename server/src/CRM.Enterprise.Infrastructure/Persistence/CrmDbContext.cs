using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Application.Tenants;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Persistence;

public class CrmDbContext : DbContext
{
    private const string CrmSchema = "crm";
    private const string IdentitySchema = "identity";
    private readonly ITenantProvider _tenantProvider;

    public CrmDbContext(DbContextOptions<CrmDbContext> options, ITenantProvider tenantProvider) : base(options)
    {
        _tenantProvider = tenantProvider;
    }

    public DbSet<Account> Accounts => Set<Account>();
    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<Lead> Leads => Set<Lead>();
    public DbSet<LeadAssignmentRule> LeadAssignmentRules => Set<LeadAssignmentRule>();
    public DbSet<LeadStatus> LeadStatuses => Set<LeadStatus>();
    public DbSet<LeadStatusHistory> LeadStatusHistories => Set<LeadStatusHistory>();
    public DbSet<Opportunity> Opportunities => Set<Opportunity>();
    public DbSet<OpportunityStage> OpportunityStages => Set<OpportunityStage>();
    public DbSet<OpportunityStageHistory> OpportunityStageHistories => Set<OpportunityStageHistory>();
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
    public DbSet<CustomFieldDefinition> CustomFieldDefinitions => Set<CustomFieldDefinition>();
    public DbSet<CustomFieldValue> CustomFieldValues => Set<CustomFieldValue>();
    public DbSet<Tenant> Tenants => Set<Tenant>();

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ApplyAuditInformation();
        return base.SaveChangesAsync(cancellationToken);
    }

    public override int SaveChanges()
    {
        ApplyAuditInformation();
        return base.SaveChanges();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CrmDbContext).Assembly);

        modelBuilder.Entity<Account>().ToTable("Accounts", CrmSchema);
        modelBuilder.Entity<Contact>().ToTable("Contacts", CrmSchema);
        modelBuilder.Entity<Lead>().ToTable("Leads", CrmSchema);
        modelBuilder.Entity<LeadAssignmentRule>().ToTable("LeadAssignmentRules", CrmSchema);
        modelBuilder.Entity<LeadStatus>().ToTable("LeadStatuses", CrmSchema);
        modelBuilder.Entity<LeadStatusHistory>().ToTable("LeadStatusHistories", CrmSchema);
        modelBuilder.Entity<Opportunity>().ToTable("Opportunities", CrmSchema);
        modelBuilder.Entity<OpportunityStage>().ToTable("OpportunityStages", CrmSchema);
        modelBuilder.Entity<OpportunityStageHistory>().ToTable("OpportunityStageHistories", CrmSchema);
        modelBuilder.Entity<Activity>().ToTable("Activities", CrmSchema);
        modelBuilder.Entity<CustomFieldDefinition>().ToTable("CustomFieldDefinitions", CrmSchema);
        modelBuilder.Entity<CustomFieldValue>().ToTable("CustomFieldValues", CrmSchema);

        modelBuilder.Entity<User>().ToTable("Users", IdentitySchema);
        modelBuilder.Entity<Role>().ToTable("Roles", IdentitySchema);
        modelBuilder.Entity<UserRole>().ToTable("UserRoles", IdentitySchema);
        modelBuilder.Entity<RolePermission>().ToTable("RolePermissions", IdentitySchema);
        modelBuilder.Entity<Tenant>().ToTable("Tenants", IdentitySchema);
        modelBuilder.Entity<Tenant>()
            .HasIndex(t => t.Key)
            .IsUnique();
        modelBuilder.Entity<Tenant>()
            .Property(t => t.ApprovalAmountThreshold)
            .HasPrecision(18, 2);
        modelBuilder.Entity<Tenant>()
            .Property(t => t.ApprovalApproverRole)
            .HasMaxLength(200);

        ApplyTenantQueryFilters(modelBuilder);
    }

    private void ApplyAuditInformation()
    {
        var utcNow = DateTime.UtcNow;
        var tenantId = _tenantProvider.TenantId;

        foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAtUtc = utcNow;
                if (entry.Entity.TenantId == Guid.Empty && tenantId != Guid.Empty)
                {
                    entry.Entity.TenantId = tenantId;
                }
            }

            if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAtUtc = utcNow;
            }
        }
    }

    private void ApplyTenantQueryFilters(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ITenantScoped).IsAssignableFrom(entityType.ClrType))
            {
                var method = typeof(CrmDbContext)
                    .GetMethod(nameof(SetTenantFilter), System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
                method?.MakeGenericMethod(entityType.ClrType)
                    .Invoke(this, new object[] { modelBuilder });
            }
        }
    }

    private void SetTenantFilter<TEntity>(ModelBuilder modelBuilder) where TEntity : class, ITenantScoped
    {
        modelBuilder.Entity<TEntity>().HasQueryFilter(entity => entity.TenantId == _tenantProvider.TenantId);
        modelBuilder.Entity<TEntity>().HasIndex(entity => entity.TenantId);
    }
}
