using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class CampaignMemberConfiguration : IEntityTypeConfiguration<CampaignMember>
{
    public void Configure(EntityTypeBuilder<CampaignMember> builder)
    {
        builder.Property(m => m.EntityType)
            .IsRequired()
            .HasMaxLength(24);

        builder.Property(m => m.ResponseStatus)
            .IsRequired()
            .HasMaxLength(32);

        builder.HasIndex(m => new { m.TenantId, m.CampaignId, m.EntityType, m.EntityId })
            .IsUnique()
            .HasFilter("[IsDeleted] = 0");

        builder.HasIndex(m => new { m.TenantId, m.EntityType, m.EntityId })
            .HasFilter("[IsDeleted] = 0");
    }
}
