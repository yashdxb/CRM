using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class AttributionExplainabilityEventConfiguration : IEntityTypeConfiguration<AttributionExplainabilityEvent>
{
    public void Configure(EntityTypeBuilder<AttributionExplainabilityEvent> builder)
    {
        builder.Property(x => x.Model).IsRequired().HasMaxLength(40);
        builder.Property(x => x.SourceEntityType).IsRequired().HasMaxLength(24);
        builder.Property(x => x.RuleVersion).IsRequired().HasMaxLength(64);
        builder.Property(x => x.EvidenceJson).IsRequired().HasMaxLength(4000);

        builder.HasIndex(x => new { x.TenantId, x.OpportunityId, x.Model, x.AttributedUtc })
            .HasFilter("[IsDeleted] = 0");

        builder.HasOne(x => x.Campaign)
            .WithMany()
            .HasForeignKey(x => x.CampaignId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Opportunity)
            .WithMany()
            .HasForeignKey(x => x.OpportunityId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
