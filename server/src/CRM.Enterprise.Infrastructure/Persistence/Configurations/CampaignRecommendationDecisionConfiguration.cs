using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class CampaignRecommendationDecisionConfiguration : IEntityTypeConfiguration<CampaignRecommendationDecision>
{
    public void Configure(EntityTypeBuilder<CampaignRecommendationDecision> builder)
    {
        builder.Property(x => x.Decision).IsRequired().HasMaxLength(24);
        builder.Property(x => x.Reason).HasMaxLength(1000);

        builder.HasIndex(x => new { x.TenantId, x.RecommendationId, x.DecidedUtc })
            .HasFilter("[IsDeleted] = 0");
    }
}
