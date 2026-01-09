using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class PurchaseOrderChangeConfiguration : IEntityTypeConfiguration<PurchaseOrderChange>
{
    public void Configure(EntityTypeBuilder<PurchaseOrderChange> builder)
    {
        builder.Property(c => c.ChangeType)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(c => c.Reason)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(c => c.PreviousTotal)
            .HasPrecision(18, 2);

        builder.Property(c => c.NewTotal)
            .HasPrecision(18, 2);

        builder.Property(c => c.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(c => c.ApprovedBy)
            .HasMaxLength(200);

        builder.Property(c => c.Notes)
            .HasMaxLength(1000);

        builder.HasOne(c => c.PurchaseOrder)
            .WithMany()
            .HasForeignKey(c => c.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
