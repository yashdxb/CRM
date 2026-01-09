using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierPerformanceSnapshotConfiguration : IEntityTypeConfiguration<SupplierPerformanceSnapshot>
{
    public void Configure(EntityTypeBuilder<SupplierPerformanceSnapshot> builder)
    {
        builder.Property(s => s.OnTimeDeliveryRate)
            .HasPrecision(5, 2);

        builder.Property(s => s.DefectRate)
            .HasPrecision(5, 2);

        builder.Property(s => s.FillRate)
            .HasPrecision(5, 2);

        builder.Property(s => s.CostVariance)
            .HasPrecision(6, 2);

        builder.Property(s => s.ResponsivenessScore)
            .HasPrecision(5, 2);

        builder.Property(s => s.OverallScore)
            .HasPrecision(5, 2);

        builder.Property(s => s.Notes)
            .HasMaxLength(2000);

        builder.HasOne(s => s.Supplier)
            .WithMany()
            .HasForeignKey(s => s.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
