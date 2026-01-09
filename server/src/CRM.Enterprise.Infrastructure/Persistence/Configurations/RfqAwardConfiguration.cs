using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class RfqAwardConfiguration : IEntityTypeConfiguration<RfqAward>
{
    public void Configure(EntityTypeBuilder<RfqAward> builder)
    {
        builder.Property(a => a.AwardNumber)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(a => a.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(a => a.AwardAmount)
            .HasPrecision(18, 2);

        builder.Property(a => a.Currency)
            .HasMaxLength(10);

        builder.Property(a => a.Notes)
            .HasMaxLength(2000);

        builder.HasOne(a => a.Rfq)
            .WithMany()
            .HasForeignKey(a => a.RfqId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(a => a.Supplier)
            .WithMany()
            .HasForeignKey(a => a.SupplierId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
