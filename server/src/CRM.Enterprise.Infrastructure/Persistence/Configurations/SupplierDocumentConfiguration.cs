using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierDocumentConfiguration : IEntityTypeConfiguration<SupplierDocument>
{
    public void Configure(EntityTypeBuilder<SupplierDocument> builder)
    {
        builder.Property(d => d.DocumentType)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(d => d.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(d => d.FileName)
            .HasMaxLength(260);

        builder.Property(d => d.StoragePath)
            .HasMaxLength(500);

        builder.Property(d => d.Status)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(d => d.Notes)
            .HasMaxLength(1000);

        builder.HasOne(d => d.Supplier)
            .WithMany()
            .HasForeignKey(d => d.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
