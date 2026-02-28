using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class CampaignInsightSnapshotConfiguration : IEntityTypeConfiguration<CampaignInsightSnapshot>
{
    public void Configure(EntityTypeBuilder<CampaignInsightSnapshot> builder)
    {
        builder.Property(x => x.Trend).IsRequired().HasMaxLength(16);
        builder.Property(x => x.ReasonChipsJson).IsRequired().HasMaxLength(4000);
        builder.Property(x => x.MetricsJson).IsRequired().HasMaxLength(4000);

        builder.HasIndex(x => new { x.TenantId, x.CampaignId, x.ComputedUtc })
            .HasFilter("[IsDeleted] = 0");

        builder.HasOne(x => x.Campaign)
            .WithMany(c => c.InsightSnapshots)
            .HasForeignKey(x => x.CampaignId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
