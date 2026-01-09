using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class InspectionConfiguration : IEntityTypeConfiguration<Inspection>
{
    public void Configure(EntityTypeBuilder<Inspection> builder)
    {
        builder.Property(i => i.InspectionNumber)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(i => i.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(i => i.InspectorName)
            .HasMaxLength(200);

        builder.Property(i => i.Result)
            .HasMaxLength(120);

        builder.Property(i => i.Notes)
            .HasMaxLength(2000);

        builder.HasOne(i => i.Supplier)
            .WithMany()
            .HasForeignKey(i => i.SupplierId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(i => i.ItemMaster)
            .WithMany()
            .HasForeignKey(i => i.ItemMasterId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(i => i.PurchaseOrder)
            .WithMany()
            .HasForeignKey(i => i.PurchaseOrderId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(i => i.GoodsReceipt)
            .WithMany()
            .HasForeignKey(i => i.GoodsReceiptId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
