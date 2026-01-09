using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class PriceListItemConfiguration : IEntityTypeConfiguration<PriceListItem>
{
    public void Configure(EntityTypeBuilder<PriceListItem> builder)
    {
        builder.Property(i => i.Uom)
            .HasMaxLength(40);

        builder.Property(i => i.UnitPrice)
            .HasPrecision(18, 2);

        builder.HasOne(i => i.ItemMaster)
            .WithMany()
            .HasForeignKey(i => i.ItemMasterId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
