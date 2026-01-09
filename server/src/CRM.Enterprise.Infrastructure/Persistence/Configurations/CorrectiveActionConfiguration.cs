using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class CorrectiveActionConfiguration : IEntityTypeConfiguration<CorrectiveAction>
{
    public void Configure(EntityTypeBuilder<CorrectiveAction> builder)
    {
        builder.Property(c => c.ActionNumber)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(c => c.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(c => c.ActionType)
            .HasMaxLength(80);

        builder.Property(c => c.Owner)
            .HasMaxLength(200);

        builder.Property(c => c.RootCause)
            .HasMaxLength(2000);

        builder.Property(c => c.ActionPlan)
            .HasMaxLength(2000);

        builder.Property(c => c.VerificationNotes)
            .HasMaxLength(2000);

        builder.HasOne(c => c.NonConformance)
            .WithMany()
            .HasForeignKey(c => c.NonConformanceId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(c => c.Supplier)
            .WithMany()
            .HasForeignKey(c => c.SupplierId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
