using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class InventoryItemConfiguration : IEntityTypeConfiguration<InventoryItem>
{
    public void Configure(EntityTypeBuilder<InventoryItem> builder)
    {
        builder.Property(i => i.OnHandQty)
            .HasPrecision(18, 2);

        builder.Property(i => i.AvailableQty)
            .HasPrecision(18, 2);

        builder.Property(i => i.ReservedQty)
            .HasPrecision(18, 2);

        builder.Property(i => i.ReorderPoint)
            .HasPrecision(18, 2);

        builder.Property(i => i.SafetyStock)
            .HasPrecision(18, 2);

        builder.HasOne(i => i.Warehouse)
            .WithMany()
            .HasForeignKey(i => i.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(i => i.ItemMaster)
            .WithMany()
            .HasForeignKey(i => i.ItemMasterId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
