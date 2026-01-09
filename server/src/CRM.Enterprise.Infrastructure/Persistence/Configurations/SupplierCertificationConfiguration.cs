using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierCertificationConfiguration : IEntityTypeConfiguration<SupplierCertification>
{
    public void Configure(EntityTypeBuilder<SupplierCertification> builder)
    {
        builder.Property(c => c.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(c => c.Issuer)
            .HasMaxLength(200);

        builder.Property(c => c.Status)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(c => c.Notes)
            .HasMaxLength(1000);

        builder.HasOne(c => c.Supplier)
            .WithMany()
            .HasForeignKey(c => c.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
