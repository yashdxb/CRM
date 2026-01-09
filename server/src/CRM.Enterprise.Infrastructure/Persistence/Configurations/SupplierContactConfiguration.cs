using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierContactConfiguration : IEntityTypeConfiguration<SupplierContact>
{
    public void Configure(EntityTypeBuilder<SupplierContact> builder)
    {
        builder.Property(c => c.FullName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(c => c.Title)
            .HasMaxLength(120);

        builder.Property(c => c.Email)
            .HasMaxLength(320);

        builder.Property(c => c.Phone)
            .HasMaxLength(60);

        builder.Property(c => c.Department)
            .HasMaxLength(120);

        builder.Property(c => c.Notes)
            .HasMaxLength(1000);

        builder.HasOne(c => c.Supplier)
            .WithMany()
            .HasForeignKey(c => c.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
