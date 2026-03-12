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
    public DbSet<Campaign> Campaigns => Set<Campaign>();
    public DbSet<CampaignMember> CampaignMembers => Set<CampaignMember>();
    public DbSet<CampaignAttribution> CampaignAttributions => Set<CampaignAttribution>();
    public DbSet<CampaignInsightSnapshot> CampaignInsightSnapshots => Set<CampaignInsightSnapshot>();
    public DbSet<CampaignRecommendation> CampaignRecommendations => Set<CampaignRecommendation>();
    public DbSet<CampaignRecommendationDecision> CampaignRecommendationDecisions => Set<CampaignRecommendationDecision>();
    public DbSet<AttributionExplainabilityEvent> AttributionExplainabilityEvents => Set<AttributionExplainabilityEvent>();
    public DbSet<Opportunity> Opportunities => Set<Opportunity>();
    public DbSet<OpportunityQuote> OpportunityQuotes => Set<OpportunityQuote>();
    public DbSet<OpportunityQuoteLine> OpportunityQuoteLines => Set<OpportunityQuoteLine>();
    public DbSet<OpportunityStage> OpportunityStages => Set<OpportunityStage>();
    public DbSet<OpportunityStageHistory> OpportunityStageHistories => Set<OpportunityStageHistory>();
    public DbSet<OpportunityReviewChecklistItem> OpportunityReviewChecklistItems => Set<OpportunityReviewChecklistItem>();
    public DbSet<OpportunityApproval> OpportunityApprovals => Set<OpportunityApproval>();
    public DbSet<OpportunityApprovalChain> OpportunityApprovalChains => Set<OpportunityApprovalChain>();
    public DbSet<DecisionRequest> DecisionRequests => Set<DecisionRequest>();
    public DbSet<DecisionStep> DecisionSteps => Set<DecisionStep>();
    public DbSet<DecisionActionLog> DecisionActionLogs => Set<DecisionActionLog>();
    public DbSet<OpportunityTeamMember> OpportunityTeamMembers => Set<OpportunityTeamMember>();
    public DbSet<OpportunityContactRole> OpportunityContactRoles => Set<OpportunityContactRole>();
    public DbSet<OpportunityOnboardingItem> OpportunityOnboardingItems => Set<OpportunityOnboardingItem>();
    public DbSet<OpportunityStageAutomationRule> OpportunityStageAutomationRules => Set<OpportunityStageAutomationRule>();
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<Attachment> Attachments => Set<Attachment>();
    public DbSet<ImportJob> ImportJobs => Set<ImportJob>();
    public DbSet<User> Users => Set<User>();
    public DbSet<TimeZoneDefinition> TimeZones => Set<TimeZoneDefinition>();
    public DbSet<CurrencyDefinition> Currencies => Set<CurrencyDefinition>();
    public DbSet<PhoneTypeDefinition> PhoneTypes => Set<PhoneTypeDefinition>();
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
    public DbSet<EmailLog> EmailLogs => Set<EmailLog>();
    public DbSet<EmailTemplate> EmailTemplates => Set<EmailTemplate>();
    public DbSet<EmailPreference> EmailPreferences => Set<EmailPreference>();
    public DbSet<CampaignEmail> CampaignEmails => Set<CampaignEmail>();
    public DbSet<CampaignEmailRecipient> CampaignEmailRecipients => Set<CampaignEmailRecipient>();
    public DbSet<UserEmailConnection> UserEmailConnections => Set<UserEmailConnection>();
    public DbSet<UserMailMessage> UserMailMessages => Set<UserMailMessage>();
    public DbSet<DirectChatThread> DirectChatThreads => Set<DirectChatThread>();
    public DbSet<DirectChatParticipant> DirectChatParticipants => Set<DirectChatParticipant>();
    public DbSet<DirectChatMessage> DirectChatMessages => Set<DirectChatMessage>();
    public DbSet<SupportCase> SupportCases => Set<SupportCase>();
    public DbSet<SupportCaseComment> SupportCaseComments => Set<SupportCaseComment>();
    public DbSet<SupportQueue> SupportQueues => Set<SupportQueue>();
    public DbSet<SupportQueueMember> SupportQueueMembers => Set<SupportQueueMember>();
    public DbSet<SupportSlaPolicy> SupportSlaPolicies => Set<SupportSlaPolicy>();
    public DbSet<SupportCaseEscalationEvent> SupportCaseEscalationEvents => Set<SupportCaseEscalationEvent>();
    public DbSet<SupportEmailBinding> SupportEmailBindings => Set<SupportEmailBinding>();
    public DbSet<Property> Properties => Set<Property>();

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
        modelBuilder.Entity<Campaign>().ToTable("Campaigns", CrmSchema);
        modelBuilder.Entity<CampaignMember>().ToTable("CampaignMembers", CrmSchema);
        modelBuilder.Entity<CampaignAttribution>().ToTable("CampaignAttributions", CrmSchema);
        modelBuilder.Entity<CampaignInsightSnapshot>().ToTable("CampaignInsightSnapshots", CrmSchema);
        modelBuilder.Entity<CampaignRecommendation>().ToTable("CampaignRecommendations", CrmSchema);
        modelBuilder.Entity<CampaignRecommendationDecision>().ToTable("CampaignRecommendationDecisions", CrmSchema);
        modelBuilder.Entity<AttributionExplainabilityEvent>().ToTable("AttributionExplainabilityEvents", CrmSchema);
        modelBuilder.Entity<EmailLog>().ToTable("EmailLogs", CrmSchema);
        modelBuilder.Entity<EmailTemplate>().ToTable("EmailTemplates", CrmSchema);
        modelBuilder.Entity<EmailPreference>().ToTable("EmailPreferences", CrmSchema);
        modelBuilder.Entity<EmailPreference>()
            .HasIndex(p => new { p.TenantId, p.Email })
            .IsUnique();
        modelBuilder.Entity<CampaignEmail>().ToTable("CampaignEmails", CrmSchema);
        modelBuilder.Entity<CampaignEmailRecipient>().ToTable("CampaignEmailRecipients", CrmSchema);
        modelBuilder.Entity<Lead>()
            .Property(l => l.AiConfidence)
            .HasPrecision(5, 4);
        modelBuilder.Entity<Lead>()
            .Property(l => l.ConversationScoreLabel)
            .HasMaxLength(32);
        modelBuilder.Entity<Opportunity>().ToTable("Opportunities", CrmSchema);
        modelBuilder.Entity<OpportunityQuote>().ToTable("OpportunityQuotes", CrmSchema);
        modelBuilder.Entity<OpportunityQuoteLine>().ToTable("OpportunityQuoteLines", CrmSchema);
        modelBuilder.Entity<OpportunityStage>().ToTable("OpportunityStages", CrmSchema);
        modelBuilder.Entity<OpportunityStageHistory>().ToTable("OpportunityStageHistories", CrmSchema);
        modelBuilder.Entity<OpportunityStageAutomationRule>().ToTable("OpportunityStageAutomationRules", CrmSchema);
        modelBuilder.Entity<OpportunityStageAutomationRule>()
            .HasIndex(r => new { r.TenantId, r.StageName, r.Name });
        modelBuilder.Entity<OpportunityApproval>().ToTable("OpportunityApprovals", CrmSchema);
        modelBuilder.Entity<OpportunityApprovalChain>().ToTable("OpportunityApprovalChains", CrmSchema);
        modelBuilder.Entity<OpportunityApprovalChain>()
            .HasIndex(chain => new { chain.TenantId, chain.OpportunityId, chain.Status, chain.RequestedOn });
        modelBuilder.Entity<OpportunityApprovalChain>()
            .HasIndex(chain => new { chain.TenantId, chain.DecisionRequestId })
            .HasFilter("[DecisionRequestId] IS NOT NULL AND [IsDeleted] = 0");
        modelBuilder.Entity<OpportunityApprovalChain>()
            .Property(chain => chain.Purpose).HasMaxLength(80).IsRequired();
        modelBuilder.Entity<OpportunityApprovalChain>()
            .Property(chain => chain.Status).HasMaxLength(40).IsRequired();
        modelBuilder.Entity<OpportunityApprovalChain>()
            .Property(chain => chain.WorkflowKey).HasMaxLength(80).IsRequired();
        modelBuilder.Entity<OpportunityApprovalChain>()
            .Property(chain => chain.WorkflowName).HasMaxLength(160).IsRequired();
        modelBuilder.Entity<DecisionRequest>().ToTable("DecisionRequests", CrmSchema);
        modelBuilder.Entity<DecisionStep>().ToTable("DecisionSteps", CrmSchema);
        modelBuilder.Entity<DecisionActionLog>().ToTable("DecisionActionLogs", CrmSchema);
        modelBuilder.Entity<OpportunityReviewChecklistItem>().ToTable("OpportunityReviewChecklistItems", CrmSchema);
        modelBuilder.Entity<OpportunityTeamMember>().ToTable("OpportunityTeamMembers", CrmSchema);
        modelBuilder.Entity<OpportunityContactRole>().ToTable("OpportunityContactRoles", CrmSchema);
        modelBuilder.Entity<OpportunityOnboardingItem>().ToTable("OpportunityOnboardingItems", CrmSchema);
        modelBuilder.Entity<OpportunityTeamMember>()
            .HasIndex(member => new { member.OpportunityId, member.UserId })
            .IsUnique();
        modelBuilder.Entity<OpportunityContactRole>()
            .HasIndex(role => new { role.OpportunityId, role.ContactId })
            .IsUnique()
            .HasFilter("[IsDeleted] = 0");
        modelBuilder.Entity<OpportunityOnboardingItem>()
            .HasIndex(item => new { item.OpportunityId, item.Type, item.Title });
        modelBuilder.Entity<DecisionRequest>()
            .HasIndex(d => new { d.TenantId, d.Status, d.CreatedAtUtc });
        modelBuilder.Entity<DecisionRequest>()
            .HasIndex(d => new { d.TenantId, d.EntityType, d.EntityId });
        modelBuilder.Entity<DecisionRequest>()
            .HasIndex(d => new { d.TenantId, d.LegacyApprovalId })
            .HasFilter("[LegacyApprovalId] IS NOT NULL AND [IsDeleted] = 0");
        modelBuilder.Entity<DecisionRequest>()
            .HasIndex(d => new { d.TenantId, d.WorkflowExecutionId })
            .HasFilter("[WorkflowExecutionId] IS NOT NULL AND [IsDeleted] = 0");
        modelBuilder.Entity<DecisionRequest>()
            .Property(d => d.Type).HasMaxLength(80).IsRequired();
        modelBuilder.Entity<DecisionRequest>()
            .Property(d => d.EntityType).HasMaxLength(80).IsRequired();
        modelBuilder.Entity<DecisionRequest>()
            .Property(d => d.Status).HasMaxLength(40).IsRequired();
        modelBuilder.Entity<DecisionRequest>()
            .Property(d => d.WorkflowStepNodeId).HasMaxLength(120);
        modelBuilder.Entity<DecisionRequest>()
            .Property(d => d.WorkflowName).HasMaxLength(160);
        modelBuilder.Entity<DecisionRequest>()
            .Property(d => d.WorkflowDealName).HasMaxLength(240);
        modelBuilder.Entity<DecisionRequest>()
            .Property(d => d.Priority).HasMaxLength(32);
        modelBuilder.Entity<DecisionRequest>()
            .Property(d => d.RiskLevel).HasMaxLength(32);
        modelBuilder.Entity<DecisionRequest>()
            .Property(d => d.PolicyReason).HasMaxLength(2000);
        modelBuilder.Entity<DecisionStep>()
            .HasIndex(s => new { s.TenantId, s.DecisionRequestId, s.StepOrder })
            .IsUnique();
        modelBuilder.Entity<DecisionStep>()
            .Property(s => s.StepType).HasMaxLength(40).IsRequired();
        modelBuilder.Entity<DecisionStep>()
            .Property(s => s.Status).HasMaxLength(40).IsRequired();
        modelBuilder.Entity<DecisionStep>()
            .Property(s => s.ApproverRole).HasMaxLength(120);
        modelBuilder.Entity<DecisionStep>()
            .Property(s => s.AssigneeNameSnapshot).HasMaxLength(200);
        modelBuilder.Entity<DecisionActionLog>()
            .HasIndex(a => new { a.TenantId, a.DecisionRequestId, a.ActionAtUtc });
        modelBuilder.Entity<DecisionActionLog>()
            .Property(a => a.Action).HasMaxLength(64).IsRequired();
        modelBuilder.Entity<DecisionActionLog>()
            .Property(a => a.ActorName).HasMaxLength(200);
        modelBuilder.Entity<DecisionActionLog>()
            .Property(a => a.Field).HasMaxLength(120);
        modelBuilder.Entity<DecisionActionLog>()
            .Property(a => a.OldValue).HasMaxLength(2000);
        modelBuilder.Entity<DecisionActionLog>()
            .Property(a => a.NewValue).HasMaxLength(2000);
        modelBuilder.Entity<DecisionRequest>()
            .HasMany(d => d.Steps)
            .WithOne(s => s.DecisionRequest)
            .HasForeignKey(s => s.DecisionRequestId)
            .OnDelete(DeleteBehavior.Cascade);
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
        // System-wide currency catalog (not tenant-scoped).
        modelBuilder.Entity<CurrencyDefinition>().ToTable("Currencies", CrmSchema);
        modelBuilder.Entity<CurrencyDefinition>()
            .HasIndex(currency => currency.Code)
            .IsUnique();
        modelBuilder.Entity<CurrencyDefinition>()
            .Property(currency => currency.Code)
            .HasMaxLength(8)
            .IsRequired();
        modelBuilder.Entity<CurrencyDefinition>()
            .Property(currency => currency.Name)
            .HasMaxLength(120)
            .IsRequired();
        modelBuilder.Entity<CurrencyDefinition>()
            .Property(currency => currency.Symbol)
            .HasMaxLength(16)
            .IsRequired();
        // System-wide phone type catalog (not tenant-scoped).
        modelBuilder.Entity<PhoneTypeDefinition>().ToTable("PhoneTypes", CrmSchema);
        modelBuilder.Entity<PhoneTypeDefinition>()
            .HasIndex(type => type.Name)
            .IsUnique();
        modelBuilder.Entity<PhoneTypeDefinition>()
            .Property(type => type.Name)
            .HasMaxLength(80)
            .IsRequired();
        modelBuilder.Entity<CustomFieldDefinition>().ToTable("CustomFieldDefinitions", CrmSchema);
        modelBuilder.Entity<CustomFieldValue>().ToTable("CustomFieldValues", CrmSchema);
        modelBuilder.Entity<Property>().ToTable("Properties", CrmSchema);
        modelBuilder.Entity<Property>()
            .Property(p => p.ListPrice)
            .HasPrecision(18, 2);
        modelBuilder.Entity<Property>()
            .Property(p => p.SalePrice)
            .HasPrecision(18, 2);
        modelBuilder.Entity<Property>()
            .HasIndex(p => new { p.TenantId, p.MlsNumber })
            .HasFilter("[MlsNumber] IS NOT NULL AND [IsDeleted] = 0");
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
        modelBuilder.Entity<User>()
            .Property(u => u.EntraObjectId)
            .HasMaxLength(128);
        modelBuilder.Entity<User>()
            .Property(u => u.EntraTenantId)
            .HasMaxLength(128);
        modelBuilder.Entity<User>()
            .Property(u => u.EntraUpn)
            .HasMaxLength(320);
        modelBuilder.Entity<User>()
            .Property(u => u.LastLoginDeviceType)
            .HasMaxLength(32);
        modelBuilder.Entity<User>()
            .Property(u => u.LastLoginPlatform)
            .HasMaxLength(64);
        // Keep the change-password flag explicit for predictable onboarding.
        modelBuilder.Entity<User>()
            .Property(u => u.MustChangePassword)
            .HasDefaultValue(false);
        modelBuilder.Entity<User>()
            .Property(u => u.MonthlyQuota)
            .HasPrecision(18, 2);
        modelBuilder.Entity<User>()
            .Property(u => u.Audience)
            .HasDefaultValue(UserAudience.Internal)
            .HasSentinel(UserAudience.Internal);
        modelBuilder.Entity<User>()
            .HasIndex(u => new { u.TenantId, u.EmailNormalized })
            .HasFilter("[EmailNormalized] IS NOT NULL AND [IsDeleted] = 0")
            .IsUnique();
        modelBuilder.Entity<User>()
            .HasIndex(u => new { u.TenantId, u.EntraTenantId, u.EntraObjectId })
            .HasFilter("[EntraTenantId] IS NOT NULL AND [EntraObjectId] IS NOT NULL AND [IsDeleted] = 0")
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
        modelBuilder.Entity<OpportunityApproval>()
            .Property(a => a.ApproverRole)
            .HasMaxLength(120);
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
        modelBuilder.Entity<Opportunity>()
            .Property(o => o.ProposalStatus)
            .HasMaxLength(40);
        modelBuilder.Entity<Opportunity>()
            .Property(o => o.ProposalLink)
            .HasMaxLength(1024);
        modelBuilder.Entity<Opportunity>()
            .Property(o => o.ListingSidePercent)
            .HasPrecision(5, 2);
        modelBuilder.Entity<Opportunity>()
            .Property(o => o.BuyerSidePercent)
            .HasPrecision(5, 2);
        modelBuilder.Entity<Opportunity>()
            .Property(o => o.BrokerageSplitPercent)
            .HasPrecision(5, 2);
        modelBuilder.Entity<Opportunity>()
            .Property(o => o.DeskFee)
            .HasPrecision(18, 2);
        modelBuilder.Entity<Opportunity>()
            .Property(o => o.FranchiseFee)
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

        modelBuilder.Entity<DirectChatThread>().ToTable("DirectChatThreads", CrmSchema);
        modelBuilder.Entity<DirectChatParticipant>().ToTable("DirectChatParticipants", CrmSchema);
        modelBuilder.Entity<DirectChatMessage>().ToTable("DirectChatMessages", CrmSchema);
        modelBuilder.Entity<SupportCase>().ToTable("SupportCases", CrmSchema);
        modelBuilder.Entity<SupportCaseComment>().ToTable("SupportCaseComments", CrmSchema);
        modelBuilder.Entity<SupportQueue>().ToTable("SupportQueues", CrmSchema);
        modelBuilder.Entity<SupportQueueMember>().ToTable("SupportQueueMembers", CrmSchema);
        modelBuilder.Entity<SupportSlaPolicy>().ToTable("SupportSlaPolicies", CrmSchema);
        modelBuilder.Entity<SupportCaseEscalationEvent>().ToTable("SupportCaseEscalationEvents", CrmSchema);
        modelBuilder.Entity<SupportEmailBinding>().ToTable("SupportEmailBindings", CrmSchema);
        modelBuilder.Entity<SupportCase>()
            .HasIndex(c => new { c.TenantId, c.CaseNumber })
            .IsUnique();
        modelBuilder.Entity<SupportCase>()
            .HasIndex(c => new { c.TenantId, c.Status, c.Priority, c.QueueId, c.OwnerUserId, c.UpdatedAtUtc });
        modelBuilder.Entity<SupportQueue>()
            .HasIndex(q => new { q.TenantId, q.Name })
            .IsUnique();
        modelBuilder.Entity<SupportQueueMember>()
            .HasIndex(m => new { m.TenantId, m.QueueId, m.UserId })
            .IsUnique();
        modelBuilder.Entity<SupportSlaPolicy>()
            .HasIndex(p => new { p.TenantId, p.Priority, p.Severity, p.IsActive });
        modelBuilder.Entity<SupportEmailBinding>()
            .HasIndex(e => new { e.TenantId, e.ExternalThreadKey })
            .IsUnique();
        modelBuilder.Entity<SupportCaseComment>()
            .HasIndex(c => new { c.TenantId, c.CaseId, c.CreatedAtUtc });
        modelBuilder.Entity<SupportCaseEscalationEvent>()
            .HasIndex(e => new { e.TenantId, e.CaseId, e.OccurredUtc });
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.CaseNumber).HasMaxLength(40).IsRequired();
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.Subject).HasMaxLength(240).IsRequired();
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.Status).HasMaxLength(40).IsRequired();
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.Priority).HasMaxLength(32).IsRequired();
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.Severity).HasMaxLength(16).IsRequired();
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.Category).HasMaxLength(80).IsRequired();
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.Subcategory).HasMaxLength(120);
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.Source).HasMaxLength(32).IsRequired();
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.ClosureReason).HasMaxLength(120);
        modelBuilder.Entity<SupportCase>()
            .Property(c => c.CsatFeedback).HasMaxLength(2000);
        modelBuilder.Entity<SupportQueue>()
            .Property(q => q.Name).HasMaxLength(120).IsRequired();
        modelBuilder.Entity<SupportSlaPolicy>()
            .Property(p => p.Name).HasMaxLength(120).IsRequired();
        modelBuilder.Entity<SupportSlaPolicy>()
            .Property(p => p.Priority).HasMaxLength(32).IsRequired();
        modelBuilder.Entity<SupportSlaPolicy>()
            .Property(p => p.Severity).HasMaxLength(16).IsRequired();
        modelBuilder.Entity<SupportCaseEscalationEvent>()
            .Property(e => e.Type).HasMaxLength(32).IsRequired();
        modelBuilder.Entity<SupportEmailBinding>()
            .Property(e => e.ExternalThreadKey).HasMaxLength(200).IsRequired();
        modelBuilder.Entity<SupportCase>()
            .HasOne(c => c.Account)
            .WithMany()
            .HasForeignKey(c => c.AccountId)
            .OnDelete(DeleteBehavior.SetNull);
        modelBuilder.Entity<SupportCase>()
            .HasOne(c => c.Contact)
            .WithMany()
            .HasForeignKey(c => c.ContactId)
            .OnDelete(DeleteBehavior.SetNull);
        modelBuilder.Entity<SupportCase>()
            .HasOne(c => c.Queue)
            .WithMany(q => q.Cases)
            .HasForeignKey(c => c.QueueId)
            .OnDelete(DeleteBehavior.SetNull);
        modelBuilder.Entity<SupportCase>()
            .HasOne(c => c.OwnerUser)
            .WithMany()
            .HasForeignKey(c => c.OwnerUserId)
            .OnDelete(DeleteBehavior.SetNull);
        modelBuilder.Entity<SupportCase>()
            .HasOne(c => c.SlaPolicy)
            .WithMany(p => p.Cases)
            .HasForeignKey(c => c.SlaPolicyId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<SupportCaseComment>()
            .HasOne(c => c.Case)
            .WithMany(x => x.Comments)
            .HasForeignKey(c => c.CaseId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<SupportCaseComment>()
            .HasOne(c => c.AuthorUser)
            .WithMany()
            .HasForeignKey(c => c.AuthorUserId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<SupportQueueMember>()
            .HasOne(m => m.Queue)
            .WithMany(q => q.Members)
            .HasForeignKey(m => m.QueueId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<SupportQueueMember>()
            .HasOne(m => m.User)
            .WithMany()
            .HasForeignKey(m => m.UserId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<SupportCaseEscalationEvent>()
            .HasOne(e => e.Case)
            .WithMany(c => c.EscalationEvents)
            .HasForeignKey(e => e.CaseId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<SupportCaseEscalationEvent>()
            .HasOne(e => e.ActorUser)
            .WithMany()
            .HasForeignKey(e => e.ActorUserId)
            .OnDelete(DeleteBehavior.SetNull);
        modelBuilder.Entity<SupportEmailBinding>()
            .HasOne(e => e.Case)
            .WithMany(c => c.EmailBindings)
            .HasForeignKey(e => e.CaseId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<DirectChatThread>()
            .HasMany(thread => thread.Participants)
            .WithOne(participant => participant.Thread)
            .HasForeignKey(participant => participant.ThreadId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<DirectChatThread>()
            .HasMany(thread => thread.Messages)
            .WithOne(message => message.Thread)
            .HasForeignKey(message => message.ThreadId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<DirectChatParticipant>()
            .HasIndex(participant => new { participant.ThreadId, participant.UserId })
            .IsUnique();
        modelBuilder.Entity<DirectChatParticipant>()
            .HasIndex(participant => new { participant.UserId, participant.IsArchived });
        modelBuilder.Entity<DirectChatMessage>()
            .HasIndex(message => new { message.ThreadId, message.CreatedAtUtc });
        modelBuilder.Entity<DirectChatMessage>()
            .Property(message => message.Content)
            .HasMaxLength(4000)
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
