using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Application.Tenants;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Persistence;

public class CrmDbContext : DbContext
{
    private const string CrmSchema = "crm";
    private const string IdentitySchema = "identity";
    private const string SupplyChainSchema = "scm";
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
    public DbSet<LeadCadenceChannel> LeadCadenceChannels => Set<LeadCadenceChannel>();
    public DbSet<Opportunity> Opportunities => Set<Opportunity>();
    public DbSet<OpportunityStage> OpportunityStages => Set<OpportunityStage>();
    public DbSet<OpportunityStageHistory> OpportunityStageHistories => Set<OpportunityStageHistory>();
    public DbSet<OpportunityReviewChecklistItem> OpportunityReviewChecklistItems => Set<OpportunityReviewChecklistItem>();
    public DbSet<OpportunityApproval> OpportunityApprovals => Set<OpportunityApproval>();
    public DbSet<OpportunityApprovalChain> OpportunityApprovalChains => Set<OpportunityApprovalChain>();
    public DbSet<OpportunityTeamMember> OpportunityTeamMembers => Set<OpportunityTeamMember>();
    public DbSet<OpportunityOnboardingItem> OpportunityOnboardingItems => Set<OpportunityOnboardingItem>();
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<Attachment> Attachments => Set<Attachment>();
    public DbSet<ImportJob> ImportJobs => Set<ImportJob>();
    public DbSet<User> Users => Set<User>();
    public DbSet<TimeZoneDefinition> TimeZones => Set<TimeZoneDefinition>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
    public DbSet<PermissionCatalogEntry> PermissionCatalogEntries => Set<PermissionCatalogEntry>();
    public DbSet<CustomFieldDefinition> CustomFieldDefinitions => Set<CustomFieldDefinition>();
    public DbSet<CustomFieldValue> CustomFieldValues => Set<CustomFieldValue>();
    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<DashboardTemplate> DashboardTemplates => Set<DashboardTemplate>();
    public DbSet<SecurityLevelDefinition> SecurityLevelDefinitions => Set<SecurityLevelDefinition>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<SupplierCertification> SupplierCertifications => Set<SupplierCertification>();
    public DbSet<SupplierContact> SupplierContacts => Set<SupplierContact>();
    public DbSet<SupplierAddress> SupplierAddresses => Set<SupplierAddress>();
    public DbSet<SupplierDocument> SupplierDocuments => Set<SupplierDocument>();
    public DbSet<SupplierIssue> SupplierIssues => Set<SupplierIssue>();
    public DbSet<SupplierKpi> SupplierKpis => Set<SupplierKpi>();
    public DbSet<SupplierScorecard> SupplierScorecards => Set<SupplierScorecard>();
    public DbSet<PurchaseOrder> PurchaseOrders => Set<PurchaseOrder>();
    public DbSet<PurchaseOrderLine> PurchaseOrderLines => Set<PurchaseOrderLine>();
    public DbSet<PurchaseOrderApproval> PurchaseOrderApprovals => Set<PurchaseOrderApproval>();
    public DbSet<PurchaseOrderChange> PurchaseOrderChanges => Set<PurchaseOrderChange>();
    public DbSet<Carrier> Carriers => Set<Carrier>();
    public DbSet<Shipment> Shipments => Set<Shipment>();
    public DbSet<ShipmentLine> ShipmentLines => Set<ShipmentLine>();
    public DbSet<GoodsReceipt> GoodsReceipts => Set<GoodsReceipt>();
    public DbSet<GoodsReceiptLine> GoodsReceiptLines => Set<GoodsReceiptLine>();
    public DbSet<Warehouse> Warehouses => Set<Warehouse>();
    public DbSet<InventoryItem> InventoryItems => Set<InventoryItem>();
    public DbSet<ReorderRule> ReorderRules => Set<ReorderRule>();
    public DbSet<Inspection> Inspections => Set<Inspection>();
    public DbSet<NonConformance> NonConformances => Set<NonConformance>();
    public DbSet<CorrectiveAction> CorrectiveActions => Set<CorrectiveAction>();
    public DbSet<SpendAnalyticsSnapshot> SpendAnalyticsSnapshots => Set<SpendAnalyticsSnapshot>();
    public DbSet<SupplierPerformanceSnapshot> SupplierPerformanceSnapshots => Set<SupplierPerformanceSnapshot>();
    public DbSet<SavingsTrackingSnapshot> SavingsTrackingSnapshots => Set<SavingsTrackingSnapshot>();
    public DbSet<Rfq> Rfqs => Set<Rfq>();
    public DbSet<RfqLine> RfqLines => Set<RfqLine>();
    public DbSet<SupplierQuote> SupplierQuotes => Set<SupplierQuote>();
    public DbSet<SupplierQuoteLine> SupplierQuoteLines => Set<SupplierQuoteLine>();
    public DbSet<RfqAward> RfqAwards => Set<RfqAward>();
    public DbSet<ItemMaster> ItemMasters => Set<ItemMaster>();
    public DbSet<PriceList> PriceLists => Set<PriceList>();
    public DbSet<PriceListItem> PriceListItems => Set<PriceListItem>();
    public DbSet<AuditEvent> AuditEvents => Set<AuditEvent>();
    public DbSet<AssistantMessage> AssistantMessages => Set<AssistantMessage>();
    public DbSet<AssistantThread> AssistantThreads => Set<AssistantThread>();

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
        modelBuilder.Entity<LeadStatus>()
            .HasIndex(ls => new { ls.TenantId, ls.Name })
            .IsUnique();
        modelBuilder.Entity<LeadStatusHistory>().ToTable("LeadStatusHistories", CrmSchema);
        modelBuilder.Entity<LeadCadenceChannel>().ToTable("LeadCadenceChannels", CrmSchema);
        modelBuilder.Entity<Lead>()
            .Property(l => l.AiConfidence)
            .HasPrecision(5, 4);
        modelBuilder.Entity<Opportunity>().ToTable("Opportunities", CrmSchema);
        modelBuilder.Entity<OpportunityStage>().ToTable("OpportunityStages", CrmSchema);
        modelBuilder.Entity<OpportunityStageHistory>().ToTable("OpportunityStageHistories", CrmSchema);
        modelBuilder.Entity<OpportunityApproval>().ToTable("OpportunityApprovals", CrmSchema);
        modelBuilder.Entity<OpportunityApprovalChain>().ToTable("OpportunityApprovalChains", CrmSchema);
        modelBuilder.Entity<OpportunityReviewChecklistItem>().ToTable("OpportunityReviewChecklistItems", CrmSchema);
        modelBuilder.Entity<OpportunityTeamMember>().ToTable("OpportunityTeamMembers", CrmSchema);
        modelBuilder.Entity<OpportunityOnboardingItem>().ToTable("OpportunityOnboardingItems", CrmSchema);
        modelBuilder.Entity<OpportunityTeamMember>()
            .HasIndex(member => new { member.OpportunityId, member.UserId })
            .IsUnique();
        modelBuilder.Entity<OpportunityOnboardingItem>()
            .HasIndex(item => new { item.OpportunityId, item.Type, item.Title });
        modelBuilder.Entity<Activity>().ToTable("Activities", CrmSchema);
        modelBuilder.Entity<Attachment>().ToTable("Attachments", CrmSchema);
        modelBuilder.Entity<ImportJob>().ToTable("ImportJobs", CrmSchema);
        // System-wide time zone catalog (not tenant-scoped).
        modelBuilder.Entity<TimeZoneDefinition>().ToTable("TimeZones", CrmSchema);
        modelBuilder.Entity<TimeZoneDefinition>()
            .HasIndex(zone => zone.IanaId)
            .IsUnique();
        modelBuilder.Entity<TimeZoneDefinition>()
            .Property(zone => zone.IanaId)
            .HasMaxLength(80)
            .IsRequired();
        modelBuilder.Entity<TimeZoneDefinition>()
            .Property(zone => zone.Label)
            .HasMaxLength(160)
            .IsRequired();
        modelBuilder.Entity<TimeZoneDefinition>()
            .Property(zone => zone.FlagCode)
            .HasMaxLength(8)
            .IsRequired();
        modelBuilder.Entity<CustomFieldDefinition>().ToTable("CustomFieldDefinitions", CrmSchema);
        modelBuilder.Entity<CustomFieldValue>().ToTable("CustomFieldValues", CrmSchema);
        modelBuilder.Entity<Supplier>().ToTable("Suppliers", SupplyChainSchema);
        modelBuilder.Entity<SupplierCertification>().ToTable("SupplierCertifications", SupplyChainSchema);
        modelBuilder.Entity<SupplierContact>().ToTable("SupplierContacts", SupplyChainSchema);
        modelBuilder.Entity<SupplierAddress>().ToTable("SupplierAddresses", SupplyChainSchema);
        modelBuilder.Entity<SupplierDocument>().ToTable("SupplierDocuments", SupplyChainSchema);
        modelBuilder.Entity<SupplierIssue>().ToTable("SupplierIssues", SupplyChainSchema);
        modelBuilder.Entity<SupplierKpi>().ToTable("SupplierKpis", SupplyChainSchema);
        modelBuilder.Entity<SupplierScorecard>().ToTable("SupplierScorecards", SupplyChainSchema);
        modelBuilder.Entity<PurchaseOrder>().ToTable("PurchaseOrders", SupplyChainSchema);
        modelBuilder.Entity<PurchaseOrderLine>().ToTable("PurchaseOrderLines", SupplyChainSchema);
        modelBuilder.Entity<PurchaseOrderApproval>().ToTable("PurchaseOrderApprovals", SupplyChainSchema);
        modelBuilder.Entity<PurchaseOrderChange>().ToTable("PurchaseOrderChanges", SupplyChainSchema);
        modelBuilder.Entity<Carrier>().ToTable("Carriers", SupplyChainSchema);
        modelBuilder.Entity<Shipment>().ToTable("Shipments", SupplyChainSchema);
        modelBuilder.Entity<ShipmentLine>().ToTable("ShipmentLines", SupplyChainSchema);
        modelBuilder.Entity<GoodsReceipt>().ToTable("GoodsReceipts", SupplyChainSchema);
        modelBuilder.Entity<GoodsReceiptLine>().ToTable("GoodsReceiptLines", SupplyChainSchema);
        modelBuilder.Entity<Warehouse>().ToTable("Warehouses", SupplyChainSchema);
        modelBuilder.Entity<InventoryItem>().ToTable("InventoryItems", SupplyChainSchema);
        modelBuilder.Entity<ReorderRule>().ToTable("ReorderRules", SupplyChainSchema);
        modelBuilder.Entity<Inspection>().ToTable("Inspections", SupplyChainSchema);
        modelBuilder.Entity<NonConformance>().ToTable("NonConformances", SupplyChainSchema);
        modelBuilder.Entity<CorrectiveAction>().ToTable("CorrectiveActions", SupplyChainSchema);
        modelBuilder.Entity<SpendAnalyticsSnapshot>().ToTable("SpendAnalyticsSnapshots", SupplyChainSchema);
        modelBuilder.Entity<SupplierPerformanceSnapshot>().ToTable("SupplierPerformanceSnapshots", SupplyChainSchema);
        modelBuilder.Entity<SavingsTrackingSnapshot>().ToTable("SavingsTrackingSnapshots", SupplyChainSchema);
        modelBuilder.Entity<Rfq>().ToTable("Rfqs", SupplyChainSchema);
        modelBuilder.Entity<RfqLine>().ToTable("RfqLines", SupplyChainSchema);
        modelBuilder.Entity<SupplierQuote>().ToTable("SupplierQuotes", SupplyChainSchema);
        modelBuilder.Entity<SupplierQuoteLine>().ToTable("SupplierQuoteLines", SupplyChainSchema);
        modelBuilder.Entity<RfqAward>().ToTable("RfqAwards", SupplyChainSchema);
        modelBuilder.Entity<ItemMaster>().ToTable("ItemMasters", SupplyChainSchema);
        modelBuilder.Entity<PriceList>().ToTable("PriceLists", SupplyChainSchema);
        modelBuilder.Entity<PriceListItem>().ToTable("PriceListItems", SupplyChainSchema);
        modelBuilder.Entity<AuditEvent>().ToTable("AuditEvents", CrmSchema);
        modelBuilder.Entity<AssistantMessage>().ToTable("AssistantMessages", CrmSchema);
        modelBuilder.Entity<AssistantThread>().ToTable("AssistantThreads", CrmSchema);
        modelBuilder.Entity<AssistantMessage>()
            .HasIndex(message => new { message.TenantId, message.UserId, message.CreatedAtUtc });
        modelBuilder.Entity<AssistantThread>()
            .HasIndex(thread => new { thread.TenantId, thread.UserId })
            .IsUnique();
        modelBuilder.Entity<AuditEvent>()
            .HasIndex(e => new { e.TenantId, e.EntityType, e.EntityId, e.CreatedAtUtc });
        modelBuilder.Entity<AuditEvent>()
            .Property(e => e.EntityType)
            .HasMaxLength(80)
            .IsRequired();
        modelBuilder.Entity<AuditEvent>()
            .Property(e => e.Action)
            .HasMaxLength(80)
            .IsRequired();
        modelBuilder.Entity<AuditEvent>()
            .Property(e => e.Field)
            .HasMaxLength(120);
        modelBuilder.Entity<AuditEvent>()
            .Property(e => e.OldValue)
            .HasMaxLength(2000);
        modelBuilder.Entity<AuditEvent>()
            .Property(e => e.NewValue)
            .HasMaxLength(2000);

        modelBuilder.Entity<User>().ToTable("Users", IdentitySchema);
        modelBuilder.Entity<User>()
            .Property(u => u.EmailNormalized)
            .HasMaxLength(320);
        // Keep the change-password flag explicit for predictable onboarding.
        modelBuilder.Entity<User>()
            .Property(u => u.MustChangePassword)
            .HasDefaultValue(false);
        modelBuilder.Entity<User>()
            .HasIndex(u => new { u.TenantId, u.EmailNormalized })
            .HasFilter("[EmailNormalized] IS NOT NULL AND [IsDeleted] = 0")
            .IsUnique();
        modelBuilder.Entity<Role>().ToTable("Roles", IdentitySchema);
        modelBuilder.Entity<Role>()
            .HasOne<Role>()
            .WithMany()
            .HasForeignKey(r => r.ParentRoleId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Role>()
            .Property(r => r.VisibilityScope)
            .HasDefaultValue(RoleVisibilityScope.Team)
            .HasSentinel(RoleVisibilityScope.Team);
        modelBuilder.Entity<Role>()
            .HasOne(r => r.SecurityLevel)
            .WithMany()
            .HasForeignKey(r => r.SecurityLevelId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Role>()
            .HasIndex(r => new { r.TenantId, r.ParentRoleId })
            .HasFilter("[IsDeleted] = 0");
        modelBuilder.Entity<Role>()
            .HasIndex(r => new { r.TenantId, r.HierarchyPath })
            .HasFilter("[HierarchyPath] IS NOT NULL AND [IsDeleted] = 0");
        modelBuilder.Entity<UserRole>().ToTable("UserRoles", IdentitySchema);
        modelBuilder.Entity<RolePermission>().ToTable("RolePermissions", IdentitySchema);
        modelBuilder.Entity<PermissionCatalogEntry>().ToTable("PermissionCatalog", IdentitySchema);
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

        modelBuilder.Entity<DashboardTemplate>().ToTable("DashboardTemplates");
        modelBuilder.Entity<DashboardTemplate>()
            .Property(t => t.Name)
            .HasMaxLength(160)
            .IsRequired();
        modelBuilder.Entity<DashboardTemplate>()
            .Property(t => t.Description)
            .HasMaxLength(500);
        modelBuilder.Entity<DashboardTemplate>()
            .Property(t => t.LayoutJson)
            .HasColumnType("nvarchar(max)");
        modelBuilder.Entity<DashboardTemplate>()
            .Property(t => t.IsDefault)
            .HasDefaultValue(false);
        modelBuilder.Entity<DashboardTemplate>()
            .HasIndex(t => new { t.TenantId, t.IsDefault })
            .HasFilter("[IsDefault] = 1 AND [IsDeleted] = 0");

        modelBuilder.Entity<SecurityLevelDefinition>().ToTable("SecurityLevelDefinitions");
        modelBuilder.Entity<SecurityLevelDefinition>()
            .Property(s => s.Name)
            .HasMaxLength(120)
            .IsRequired();
        modelBuilder.Entity<SecurityLevelDefinition>()
            .Property(s => s.Description)
            .HasMaxLength(500);
        modelBuilder.Entity<SecurityLevelDefinition>()
            .Property(s => s.IsDefault)
            .HasDefaultValue(false);
        modelBuilder.Entity<SecurityLevelDefinition>()
            .HasIndex(s => new { s.TenantId, s.Name })
            .HasFilter("[IsDeleted] = 0")
            .IsUnique();
        modelBuilder.Entity<SecurityLevelDefinition>()
            .HasIndex(s => new { s.TenantId, s.IsDefault })
            .HasFilter("[IsDefault] = 1 AND [IsDeleted] = 0");

        modelBuilder.Entity<OpportunityApproval>()
            .Property(a => a.Amount)
            .HasPrecision(18, 2);
        modelBuilder.Entity<OpportunityApproval>()
            .Property(a => a.Purpose)
            .HasMaxLength(40);
        modelBuilder.Entity<OpportunityReviewChecklistItem>()
            .Property(i => i.Type)
            .HasMaxLength(40);
        modelBuilder.Entity<OpportunityReviewChecklistItem>()
            .Property(i => i.Title)
            .HasMaxLength(240);
        modelBuilder.Entity<OpportunityReviewChecklistItem>()
            .Property(i => i.Status)
            .HasMaxLength(40);

        modelBuilder.Entity<Opportunity>()
            .Property(o => o.DiscountPercent)
            .HasPrecision(5, 2);
        modelBuilder.Entity<Opportunity>()
            .Property(o => o.DiscountAmount)
            .HasPrecision(18, 2);

        modelBuilder.Entity<PermissionCatalogEntry>()
            .HasIndex(entry => entry.Key)
            .IsUnique();
        modelBuilder.Entity<PermissionCatalogEntry>()
            .Property(entry => entry.Key)
            .HasMaxLength(200)
            .IsRequired();
        modelBuilder.Entity<PermissionCatalogEntry>()
            .Property(entry => entry.Label)
            .HasMaxLength(200)
            .IsRequired();
        modelBuilder.Entity<PermissionCatalogEntry>()
            .Property(entry => entry.Description)
            .HasMaxLength(500)
            .IsRequired();

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
