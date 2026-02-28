using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class CampaignAttributionConfiguration : IEntityTypeConfiguration<CampaignAttribution>
{
    public void Configure(EntityTypeBuilder<CampaignAttribution> builder)
    {
        builder.Property(a => a.Model)
            .IsRequired()
            .HasMaxLength(40);

        builder.Property(a => a.AttributedAmount).HasPrecision(18, 2);

        builder.HasIndex(a => new { a.TenantId, a.OpportunityId, a.Model })
            .IsUnique()
            .HasFilter("[IsDeleted] = 0");

        builder.HasOne(a => a.Opportunity)
            .WithMany()
            .HasForeignKey(a => a.OpportunityId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
