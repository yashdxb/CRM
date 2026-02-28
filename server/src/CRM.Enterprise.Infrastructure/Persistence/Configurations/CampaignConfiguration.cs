using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
{
    public void Configure(EntityTypeBuilder<Campaign> builder)
    {
        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(180);

        builder.Property(c => c.Type)
            .IsRequired()
            .HasMaxLength(64);

        builder.Property(c => c.Channel)
            .IsRequired()
            .HasMaxLength(64);

        builder.Property(c => c.Status)
            .IsRequired()
            .HasMaxLength(32);

        builder.Property(c => c.BudgetPlanned).HasPrecision(18, 2);
        builder.Property(c => c.BudgetActual).HasPrecision(18, 2);

        builder.Property(c => c.Objective)
            .HasMaxLength(2000);

        builder.HasIndex(c => new { c.TenantId, c.Name })
            .HasFilter("[IsDeleted] = 0");

        builder.HasOne(c => c.OwnerUser)
            .WithMany()
            .HasForeignKey(c => c.OwnerUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(c => c.Members)
            .WithOne(m => m.Campaign)
            .HasForeignKey(m => m.CampaignId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Attributions)
            .WithOne(a => a.Campaign)
            .HasForeignKey(a => a.CampaignId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
