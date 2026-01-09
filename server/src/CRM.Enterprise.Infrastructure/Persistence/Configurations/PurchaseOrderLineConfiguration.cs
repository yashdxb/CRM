using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class PurchaseOrderLineConfiguration : IEntityTypeConfiguration<PurchaseOrderLine>
{
    public void Configure(EntityTypeBuilder<PurchaseOrderLine> builder)
    {
        builder.Property(l => l.Description)
            .HasMaxLength(500);

        builder.Property(l => l.Uom)
            .HasMaxLength(40);

        builder.Property(l => l.UnitPrice)
            .HasPrecision(18, 2);

        builder.Property(l => l.LineTotal)
            .HasPrecision(18, 2);

        builder.HasOne(l => l.ItemMaster)
            .WithMany()
            .HasForeignKey(l => l.ItemMasterId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
