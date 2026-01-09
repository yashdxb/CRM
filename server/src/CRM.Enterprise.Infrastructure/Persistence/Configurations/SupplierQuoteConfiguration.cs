using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierQuoteConfiguration : IEntityTypeConfiguration<SupplierQuote>
{
    public void Configure(EntityTypeBuilder<SupplierQuote> builder)
    {
        builder.Property(q => q.QuoteNumber)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(q => q.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(q => q.Currency)
            .HasMaxLength(10);

        builder.Property(q => q.TotalAmount)
            .HasPrecision(18, 2);

        builder.Property(q => q.Notes)
            .HasMaxLength(2000);

        builder.HasOne(q => q.Rfq)
            .WithMany()
            .HasForeignKey(q => q.RfqId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(q => q.Supplier)
            .WithMany()
            .HasForeignKey(q => q.SupplierId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(q => q.Lines)
            .WithOne(l => l.SupplierQuote)
            .HasForeignKey(l => l.SupplierQuoteId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
