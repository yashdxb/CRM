using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SavingsTrackingSnapshotConfiguration : IEntityTypeConfiguration<SavingsTrackingSnapshot>
{
    public void Configure(EntityTypeBuilder<SavingsTrackingSnapshot> builder)
    {
        builder.Property(s => s.Category)
            .HasMaxLength(160);

        builder.Property(s => s.Currency)
            .HasMaxLength(10)
            .IsRequired();

        builder.Property(s => s.BaselineSpend)
            .HasPrecision(18, 2);

        builder.Property(s => s.ActualSpend)
            .HasPrecision(18, 2);

        builder.Property(s => s.SavingsAmount)
            .HasPrecision(18, 2);

        builder.Property(s => s.SavingsRate)
            .HasPrecision(6, 2);

        builder.Property(s => s.Initiative)
            .HasMaxLength(200);

        builder.Property(s => s.Notes)
            .HasMaxLength(2000);

        builder.HasOne(s => s.Supplier)
            .WithMany()
            .HasForeignKey(s => s.SupplierId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
