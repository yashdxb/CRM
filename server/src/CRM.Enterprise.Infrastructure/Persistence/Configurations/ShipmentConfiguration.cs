using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class ShipmentConfiguration : IEntityTypeConfiguration<Shipment>
{
    public void Configure(EntityTypeBuilder<Shipment> builder)
    {
        builder.Property(s => s.ShipmentNumber)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(s => s.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(s => s.TrackingNumber)
            .HasMaxLength(100);

        builder.Property(s => s.Mode)
            .HasMaxLength(50);

        builder.Property(s => s.Origin)
            .HasMaxLength(200);

        builder.Property(s => s.Destination)
            .HasMaxLength(200);

        builder.Property(s => s.Notes)
            .HasMaxLength(2000);

        builder.HasOne(s => s.Carrier)
            .WithMany()
            .HasForeignKey(s => s.CarrierId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(s => s.PurchaseOrder)
            .WithMany()
            .HasForeignKey(s => s.PurchaseOrderId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(s => s.Lines)
            .WithOne(l => l.Shipment)
            .HasForeignKey(l => l.ShipmentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
