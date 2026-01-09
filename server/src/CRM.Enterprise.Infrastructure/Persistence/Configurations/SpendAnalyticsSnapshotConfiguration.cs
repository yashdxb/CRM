using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SpendAnalyticsSnapshotConfiguration : IEntityTypeConfiguration<SpendAnalyticsSnapshot>
{
    public void Configure(EntityTypeBuilder<SpendAnalyticsSnapshot> builder)
    {
        builder.Property(s => s.Category)
            .HasMaxLength(160);

        builder.Property(s => s.Currency)
            .HasMaxLength(10)
            .IsRequired();

        builder.Property(s => s.TotalSpend)
            .HasPrecision(18, 2);

        builder.Property(s => s.Savings)
            .HasPrecision(18, 2);

        builder.Property(s => s.AvgLeadTimeDays)
            .HasPrecision(6, 2);

        builder.Property(s => s.Notes)
            .HasMaxLength(2000);

        builder.HasOne(s => s.Supplier)
            .WithMany()
            .HasForeignKey(s => s.SupplierId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
