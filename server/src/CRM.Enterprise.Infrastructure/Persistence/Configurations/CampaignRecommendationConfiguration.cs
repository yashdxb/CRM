using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class CampaignRecommendationConfiguration : IEntityTypeConfiguration<CampaignRecommendation>
{
    public void Configure(EntityTypeBuilder<CampaignRecommendation> builder)
    {
        builder.Property(x => x.Type).IsRequired().HasMaxLength(120);
        builder.Property(x => x.Severity).IsRequired().HasMaxLength(16);
        builder.Property(x => x.Title).IsRequired().HasMaxLength(240);
        builder.Property(x => x.Description).IsRequired().HasMaxLength(2000);
        builder.Property(x => x.ImpactEstimate).HasPrecision(18, 2);
        builder.Property(x => x.Confidence).HasPrecision(4, 3);
        builder.Property(x => x.EvidenceJson).IsRequired().HasMaxLength(4000);
        builder.Property(x => x.Status).IsRequired().HasMaxLength(24);
        builder.Property(x => x.DecisionReason).HasMaxLength(1000);

        builder.HasIndex(x => new { x.TenantId, x.CampaignId, x.Status, x.GeneratedUtc })
            .HasFilter("[IsDeleted] = 0");

        builder.HasOne(x => x.Campaign)
            .WithMany(c => c.Recommendations)
            .HasForeignKey(x => x.CampaignId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Decisions)
            .WithOne(x => x.Recommendation)
            .HasForeignKey(x => x.RecommendationId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
