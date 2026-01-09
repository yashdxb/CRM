using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class NonConformanceConfiguration : IEntityTypeConfiguration<NonConformance>
{
    public void Configure(EntityTypeBuilder<NonConformance> builder)
    {
        builder.Property(n => n.ReferenceNumber)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(n => n.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(n => n.Severity)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(n => n.ReportedBy)
            .HasMaxLength(200);

        builder.Property(n => n.Description)
            .HasMaxLength(2000);

        builder.Property(n => n.Disposition)
            .HasMaxLength(200);

        builder.Property(n => n.Notes)
            .HasMaxLength(2000);

        builder.HasOne(n => n.Supplier)
            .WithMany()
            .HasForeignKey(n => n.SupplierId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(n => n.ItemMaster)
            .WithMany()
            .HasForeignKey(n => n.ItemMasterId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(n => n.Inspection)
            .WithMany()
            .HasForeignKey(n => n.InspectionId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(n => n.PurchaseOrder)
            .WithMany()
            .HasForeignKey(n => n.PurchaseOrderId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(n => n.GoodsReceipt)
            .WithMany()
            .HasForeignKey(n => n.GoodsReceiptId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
