using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
{
    public void Configure(EntityTypeBuilder<Supplier> builder)
    {
        builder.Property(s => s.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(s => s.Category)
            .HasMaxLength(120);

        builder.Property(s => s.Status)
            .HasMaxLength(60);

        builder.Property(s => s.Country)
            .HasMaxLength(120);

        builder.Property(s => s.Website)
            .HasMaxLength(300);

        builder.Property(s => s.ContactName)
            .HasMaxLength(200);

        builder.Property(s => s.ContactEmail)
            .HasMaxLength(320);

        builder.Property(s => s.ContactPhone)
            .HasMaxLength(60);
    }
}
