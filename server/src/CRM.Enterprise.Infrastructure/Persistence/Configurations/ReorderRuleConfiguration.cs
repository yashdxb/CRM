using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class ReorderRuleConfiguration : IEntityTypeConfiguration<ReorderRule>
{
    public void Configure(EntityTypeBuilder<ReorderRule> builder)
    {
        builder.Property(r => r.ReorderPoint)
            .HasPrecision(18, 2);

        builder.Property(r => r.TargetStock)
            .HasPrecision(18, 2);

        builder.Property(r => r.SafetyStock)
            .HasPrecision(18, 2);

        builder.Property(r => r.Notes)
            .HasMaxLength(2000);

        builder.HasOne(r => r.ItemMaster)
            .WithMany()
            .HasForeignKey(r => r.ItemMasterId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(r => r.Supplier)
            .WithMany()
            .HasForeignKey(r => r.SupplierId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(r => r.Warehouse)
            .WithMany()
            .HasForeignKey(r => r.WarehouseId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
