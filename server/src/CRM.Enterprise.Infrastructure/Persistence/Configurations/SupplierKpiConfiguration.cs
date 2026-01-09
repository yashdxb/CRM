using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierKpiConfiguration : IEntityTypeConfiguration<SupplierKpi>
{
    public void Configure(EntityTypeBuilder<SupplierKpi> builder)
    {
        builder.Property(k => k.OnTimeDeliveryRate).HasPrecision(6, 2);
        builder.Property(k => k.DefectRate).HasPrecision(6, 2);
        builder.Property(k => k.FillRate).HasPrecision(6, 2);
        builder.Property(k => k.CostVariance).HasPrecision(8, 2);
        builder.Property(k => k.LeadTimeDays).HasPrecision(6, 2);
        builder.Property(k => k.ResponsivenessScore).HasPrecision(6, 2);

        builder.Property(k => k.Notes)
            .HasMaxLength(1000);

        builder.HasOne(k => k.Supplier)
            .WithMany()
            .HasForeignKey(k => k.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
