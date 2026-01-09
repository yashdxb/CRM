using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierAddressConfiguration : IEntityTypeConfiguration<SupplierAddress>
{
    public void Configure(EntityTypeBuilder<SupplierAddress> builder)
    {
        builder.Property(a => a.Label)
            .HasMaxLength(120)
            .IsRequired();

        builder.Property(a => a.Line1)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(a => a.Line2)
            .HasMaxLength(200);

        builder.Property(a => a.City)
            .HasMaxLength(120);

        builder.Property(a => a.State)
            .HasMaxLength(120);

        builder.Property(a => a.PostalCode)
            .HasMaxLength(30);

        builder.Property(a => a.Country)
            .HasMaxLength(120);

        builder.Property(a => a.Notes)
            .HasMaxLength(1000);

        builder.HasOne(a => a.Supplier)
            .WithMany()
            .HasForeignKey(a => a.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
