using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class OpportunityQuoteLineConfiguration : IEntityTypeConfiguration<OpportunityQuoteLine>
{
    public void Configure(EntityTypeBuilder<OpportunityQuoteLine> builder)
    {
        builder.Property(l => l.Description)
            .HasMaxLength(1000);

        builder.Property(l => l.Quantity).HasPrecision(18, 3);
        builder.Property(l => l.UnitPrice).HasPrecision(18, 2);
        builder.Property(l => l.DiscountPercent).HasPrecision(5, 2);
        builder.Property(l => l.LineTotal).HasPrecision(18, 2);

        builder.HasIndex(l => new { l.TenantId, l.OpportunityQuoteId, l.ItemMasterId })
            .HasFilter("[IsDeleted] = 0");

        builder.HasOne(l => l.ItemMaster)
            .WithMany()
            .HasForeignKey(l => l.ItemMasterId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
