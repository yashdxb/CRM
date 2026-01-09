using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class GoodsReceiptConfiguration : IEntityTypeConfiguration<GoodsReceipt>
{
    public void Configure(EntityTypeBuilder<GoodsReceipt> builder)
    {
        builder.Property(r => r.ReceiptNumber)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(r => r.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(r => r.ReceivedBy)
            .HasMaxLength(200);

        builder.Property(r => r.Notes)
            .HasMaxLength(2000);

        builder.HasOne(r => r.PurchaseOrder)
            .WithMany()
            .HasForeignKey(r => r.PurchaseOrderId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(r => r.Shipment)
            .WithMany()
            .HasForeignKey(r => r.ShipmentId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(r => r.Lines)
            .WithOne(l => l.GoodsReceipt)
            .HasForeignKey(l => l.GoodsReceiptId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
