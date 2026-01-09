using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierScorecardConfiguration : IEntityTypeConfiguration<SupplierScorecard>
{
    public void Configure(EntityTypeBuilder<SupplierScorecard> builder)
    {
        builder.Property(s => s.QualityScore)
            .HasPrecision(5, 2);

        builder.Property(s => s.DeliveryScore)
            .HasPrecision(5, 2);

        builder.Property(s => s.CostScore)
            .HasPrecision(5, 2);

        builder.Property(s => s.OverallScore)
            .HasPrecision(5, 2);

        builder.Property(s => s.Notes)
            .HasMaxLength(1000);

        builder.HasOne(s => s.Supplier)
            .WithMany()
            .HasForeignKey(s => s.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
